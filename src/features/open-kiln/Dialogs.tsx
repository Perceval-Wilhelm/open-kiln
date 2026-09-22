import { ArrowUpRight, Check, CircleCheck, FileText, Info, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import type {
  DemoFormValues,
  DemoRequest,
  EvidenceResource,
  ModalView,
  TreatmentRecord,
} from "@/features/open-kiln/types";

import { records } from "@/features/open-kiln/data";
import { formatDate, formatTimestamp, validateDemoRequest } from "@/features/open-kiln/logic";
import { Action, SampleLabel, StatusBadges, Timeline } from "@/features/open-kiln/Primitives";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

function RecordDetail({ record }: { record: TreatmentRecord }) {
  return (
    <>
      <DialogHeader>
        <SampleLabel />
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

export function DemoRequestForm({ request, onClose }: { request: DemoRequest; onClose: () => void }) {
  const [complete, setComplete] = useState(false);
  const form = useForm<DemoFormValues>({
    defaultValues: { name: "", organisation: "", email: "", message: "", date: "" },
  });
  const fields: Array<{ name: keyof DemoFormValues; label: string; type?: string; placeholder?: string }> =
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
        <span className="ok-status">Demo form · Nothing is sent</span>
        <DialogTitle className="ok-dialog-title">{request.title}</DialogTitle>
        <DialogDescription>{request.context}</DialogDescription>
      </DialogHeader>
      {complete ? (
        <div className="ok-form-success" role="status">
          <span>
            <CircleCheck size={34} />
          </span>
          <h3>Demo complete. No request was sent.</h3>
          <p>This is a preview of the proposed experience. No booking, subscription or follow-up has been created.</p>
          <Action onClick={onClose}>
            Close preview <Check size={17} />
          </Action>
        </div>
      ) : (
        <Form {...form}>
          <form
            noValidate
            className="ok-demo-form"
            onSubmit={form.handleSubmit((values) => {
              const errors = validateDemoRequest(request.kind, values);
              const entries = Object.entries(errors) as Array<[keyof DemoFormValues, string]>;
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
              className="ok-fill-sample"
              onClick={() =>
                form.reset({
                  name: "Alex Example",
                  organisation: "Demo Manufacturing A",
                  email: "alex@example.com",
                  date: "2026-10-20",
                  message: "I would like to explore the sample evidence journey and its monitoring scope.",
                })
              }
            >
              Fill sample details <ArrowUpRight size={15} />
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
              Use the sample details to explore. Entries stay in this page’s memory and are discarded when the form
              closes.
            </p>
            <Action type="submit">
              Preview {request.kind === "updates" ? "subscription" : "request"} <ArrowUpRight size={17} />
            </Action>
          </form>
        </Form>
      )}
    </>
  );
}

function EhsOverview() {
  return (
    <>
      <DialogHeader>
        <SampleLabel />
        <DialogTitle className="ok-dialog-title">Your sample evidence overview</DialogTitle>
        <DialogDescription>
          A summary of the four fictional EHS records, separate from the park governance dataset.
        </DialogDescription>
      </DialogHeader>
      <div className="ok-kpis">
        <div>
          <span>Sample records</span>
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
          </div>
        ))}
      </div>
      <div className="ok-info-note">
        <ShieldCheck size={18} />
        <p>
          This overview describes sample record availability. It does not measure environmental impact or certify
          compliance.
        </p>
      </div>
    </>
  );
}

export function EvidenceContent({ view, onClose }: { view: ModalView; onClose: () => void }) {
  if (view.kind === "record") return <RecordDetail key={view.record.id} record={view.record} />;
  if (view.kind === "resource") return <ResourceDetail key={view.resource.id} resource={view.resource} />;
  if (view.kind === "request") {
    return (
      <DemoRequestForm key={`${view.request.kind}-${view.request.title}`} request={view.request} onClose={onClose} />
    );
  }
  return <EhsOverview />;
}
