import { ArrowUpRight, Check, CircleCheck, FileText, Info, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import type {
  RequestFormValues,
  RequestContext,
  EvidenceResource,
  ModalView,
  TreatmentRecord,
} from "@/features/open-kiln/types";

import { records, resources } from "@/features/open-kiln/data";
import { formatDate, formatTimestamp, validateRequest } from "@/features/open-kiln/logic";
import { officialContact } from "@/features/open-kiln/references";
import { Action, DataLabel, StatusBadges, Timeline } from "@/features/open-kiln/Primitives";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

function RecordDetail({
  record,
  onNavigate,
  onTransparency,
}: {
  record: TreatmentRecord;
  onNavigate: (view: ModalView) => void;
  onTransparency: () => void;
}) {
  return (
    <>
      <DialogHeader>
        <DataLabel />
        <span className="ok-mono">{record.id}</span>
        <DialogTitle className="ok-dialog-title">{record.generator}</DialogTitle>
        <DialogDescription>
          Inspect the treatment record, supporting evidence and publication history.
        </DialogDescription>
      </DialogHeader>
      <StatusBadges record={record} />
      <Tabs defaultValue="overview" className="ok-detail-tabs">
        <TabsList aria-label="Treatment record details">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="evidence">Evidence</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <dl className="ok-record-fields">
            {[
              ["Waste identity", record.wasteId],
              ["Industry", record.sector],
              ["Receiving location", record.facility],
              ["Waste type", record.wasteType],
              ["Quantity received", `${record.quantity} ${record.unit}`],
              ["Receipt date", formatDate(record.receiptDate)],
              ["Treatment date", formatDate(record.treatmentDate)],
              ["Evidence version", `Version ${record.version}`],
            ].map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <div className="ok-info-note">
            <Info size={18} />
            <p>
              These are fictional organisations and treatment records. Evidence completeness describes the example
              documents available, not a compliance verdict.
            </p>
          </div>
          <p className="ok-publication">Published {formatTimestamp(record.publishedAt)}</p>
          <button className="ok-text-action" onClick={onTransparency}>
            Read our transparency statement <ArrowUpRight size={17} />
          </button>
        </TabsContent>
        <TabsContent value="evidence">
          <div className="ok-reading">
            <section>
              <h3>
                <FileText size={19} />
                Manifest & completion
              </h3>
              <p>
                {record.status === "Completed"
                  ? `A completion milestone is recorded on ${formatDate(record.treatmentDate)} for ${record.quantity} tonnes. Compare it with the receipt and history.`
                  : "Receipt is documented. Treatment is still processing; there is no published completion date."}
              </p>
            </section>
            <section>
              <h3>Methodology</h3>
              <p>{record.methodology}</p>
            </section>
            <section>
              <h3>
                Monitoring summary{" "}
                <span className={`ok-status ${!record.monitoring ? "ok-status-amber" : ""}`}>
                  {record.monitoring ? "Available" : "Not available"}
                </span>
              </h3>
              <p>
                {record.monitoring ??
                  "The monitoring summary has not been published. This evidence gap remains visible even if a treatment completion milestone is present."}
              </p>
            </section>
            <section>
              <h3>Related reading</h3>
              <div className="ok-dialog-resource-links">
                {["methodology", "monitoring", "giz"].map((id) => {
                  const resource = resources.find((item) => item.id === id)!;
                  return (
                    <button
                      className="ok-text-action"
                      key={id}
                      onClick={() => onNavigate({ kind: "resource", resource })}
                    >
                      {resource.title}
                      <ArrowUpRight size={16} />
                    </button>
                  );
                })}
              </div>
            </section>
            <section className="ok-reading-limitations">
              <h3>Scope & limitations</h3>
              <p>{record.limitations}</p>
            </section>
          </div>
        </TabsContent>
        <TabsContent value="history">
          <div className="ok-history-columns">
            <section>
              <h3>Treatment milestones</h3>
              <Timeline items={record.milestones} />
            </section>
            <section>
              <h3>Publication history</h3>
              <Timeline items={record.publications} />
            </section>
          </div>
          <p className="ok-small-note">
            Viewing this record does not create a certification or a customer-review event.
          </p>
        </TabsContent>
      </Tabs>
    </>
  );
}

function ResourceDetail({ resource }: { resource: EvidenceResource }) {
  return (
    <>
      <DialogHeader>
        <span className="ok-status">{resource.kind}</span>
        <DialogTitle className="ok-dialog-title">{resource.title}</DialogTitle>
        <DialogDescription>{resource.summary}</DialogDescription>
      </DialogHeader>
      <div className="ok-resource-meta">
        <span>{resource.publisher}</span>
        <span>
          {resource.kind === "External reference"
            ? resource.version
            : `${formatDate(resource.date)} · Version ${resource.version}`}
        </span>
      </div>
      <div className="ok-reading">
        {resource.sections.map((section) => (
          <section key={section.title}>
            <h3>{section.title}</h3>
            <p>{section.body}</p>
          </section>
        ))}
      </div>
      {resource.url && (
        <a className="ok-button ok-external-button" href={resource.url} target="_blank" rel="noopener noreferrer">
          Read the publisher’s document <ArrowUpRight size={18} />
          <span className="ok-sr-only"> (opens in a new tab)</span>
        </a>
      )}
    </>
  );
}

export function RequestForm({ request, onClose }: { request: RequestContext; onClose: () => void }) {
  const [complete, setComplete] = useState(false);
  const form = useForm<RequestFormValues>({
    defaultValues: { name: "", organisation: "", email: "", message: "", date: "" },
  });
  const fields: Array<{ name: keyof RequestFormValues; label: string; type?: string; placeholder?: string }> =
    request.kind === "updates"
      ? [{ name: "email", label: "Email address", type: "email", placeholder: "you@example.com" }]
      : [
          { name: "name", label: "Your name" },
          { name: "organisation", label: "Organisation" },
          { name: "email", label: "Email address", type: "email", placeholder: "you@example.com" },
          ...(request.kind === "visit" ? [{ name: "date" as const, label: "Preferred date", type: "date" }] : []),
          {
            name: "message",
            label: "What would you like to explore?",
            placeholder: "Tell us about the evidence or conversation you have in mind.",
          },
        ];
  return (
    <>
      <DialogHeader>
        <span className="ok-status">Private request draft</span>
        <DialogTitle className="ok-dialog-title">{request.title}</DialogTitle>
        <DialogDescription>{request.context}</DialogDescription>
      </DialogHeader>
      {complete ? (
        <div className="ok-form-success" role="status">
          <span>
            <CircleCheck size={34} />
          </span>
          <h3>Your request summary is ready.</h3>
          <p>
            No request has been sent. Your details remain in this page until you close it. Contact INSEE through its
            official website to arrange a visit or discuss a service.
          </p>
          <dl className="ok-request-summary">
            <div>
              <dt>Topic</dt>
              <dd>{request.title}</dd>
            </div>
            <div>
              <dt>Context</dt>
              <dd>{request.context}</dd>
            </div>
            {request.kind !== "updates" && (
              <div>
                <dt>Name</dt>
                <dd>{form.getValues("name")}</dd>
              </div>
            )}
            <div>
              <dt>Email</dt>
              <dd>{form.getValues("email")}</dd>
            </div>
            {request.kind !== "updates" && (
              <div>
                <dt>Organisation</dt>
                <dd>{form.getValues("organisation")}</dd>
              </div>
            )}
            {request.kind === "visit" && (
              <div>
                <dt>Preferred date</dt>
                <dd>{formatDate(form.getValues("date"))}</dd>
              </div>
            )}
            {request.kind !== "updates" && form.getValues("message") && (
              <div>
                <dt>Your questions</dt>
                <dd>{form.getValues("message")}</dd>
              </div>
            )}
          </dl>
          <a className="ok-button ok-external-button" href={officialContact} target="_blank" rel="noopener noreferrer">
            Official INSEE contact <ArrowUpRight size={17} />
            <span className="ok-sr-only"> (opens in a new tab)</span>
          </a>
          <Action secondary onClick={onClose}>
            Close summary <Check size={17} />
          </Action>
          <button className="ok-text-action" onClick={() => setComplete(false)}>
            Edit draft
          </button>
        </div>
      ) : (
        <Form {...form}>
          <form
            noValidate
            className="ok-request-form"
            onSubmit={form.handleSubmit((values) => {
              const errors = validateRequest(request.kind, values);
              const entries = Object.entries(errors) as Array<[keyof RequestFormValues, string]>;
              if (entries.length) {
                entries.forEach(([name, message]) => form.setError(name, { type: "manual", message }));
                form.setFocus(entries[0][0]);
                return;
              }
              setComplete(true);
            })}
          >
            <button
              type="button"
              className="ok-fill-example"
              onClick={() =>
                form.reset({
                  name: "Alex Nguyen",
                  organisation: "Mekong Precision Works",
                  email: "alex@example.com",
                  date: "2026-10-20",
                  message: "I would like to explore the treatment evidence journey and its monitoring scope.",
                })
              }
            >
              Use example details <ArrowUpRight size={15} />
            </button>
            {fields.map(({ name, label, type, placeholder }) => (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      {name === "message" ? (
                        <Textarea {...field} placeholder={placeholder} />
                      ) : (
                        <Input {...field} type={type ?? "text"} placeholder={placeholder} autoComplete="off" />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <p className="ok-small-note">
              This form prepares a private summary; it does not send a request. Entries are discarded when the form
              closes.
            </p>
            <Action type="submit">
              Review {request.kind === "updates" ? "subscription" : "request"} <ArrowUpRight size={17} />
            </Action>
          </form>
        </Form>
      )}
    </>
  );
}

function EhsOverview({ onNavigate }: { onNavigate: (view: ModalView) => void }) {
  return (
    <>
      <DialogHeader>
        <DataLabel />
        <DialogTitle className="ok-dialog-title">Your evidence overview</DialogTitle>
        <DialogDescription>
          A snapshot of the illustrative operational register. Park reporting uses a separate aggregate dataset.
        </DialogDescription>
      </DialogHeader>
      <div className="ok-kpis">
        <div>
          <span>Treatment records</span>
          <strong>{records.length}</strong>
        </div>
        <div>
          <span>Treatment completed</span>
          <strong>{records.filter((record) => record.status === "Completed").length}</strong>
        </div>
        <div>
          <span>Complete evidence</span>
          <strong>{records.filter((record) => record.evidenceStatus === "Complete").length}</strong>
        </div>
      </div>
      <div className="ok-overview-records">
        {records.map((record) => (
          <div key={record.id}>
            <span className="ok-mono">{record.id}</span>
            <p>{record.generator}</p>
            <StatusBadges record={record} />
            <button className="ok-text-action" onClick={() => onNavigate({ kind: "record", record })}>
              Open record <ArrowUpRight size={16} />
              <span className="ok-sr-only"> {record.id}</span>
            </button>
          </div>
        ))}
      </div>
      <div className="ok-info-note">
        <ShieldCheck size={18} />
        <p>
          This overview describes illustrative record availability. It does not measure environmental impact or certify
          compliance.
        </p>
      </div>
    </>
  );
}

export function EvidenceContent({
  view,
  onClose,
  onNavigate,
  onTransparency,
}: {
  view: ModalView;
  onClose: () => void;
  onNavigate: (view: ModalView) => void;
  onTransparency: () => void;
}) {
  if (view.kind === "record")
    return (
      <RecordDetail key={view.record.id} record={view.record} onNavigate={onNavigate} onTransparency={onTransparency} />
    );
  if (view.kind === "resource") return <ResourceDetail key={view.resource.id} resource={view.resource} />;
  if (view.kind === "request") {
    return <RequestForm key={`${view.request.kind}-${view.request.title}`} request={view.request} onClose={onClose} />;
  }
  return <EhsOverview onNavigate={onNavigate} />;
}
