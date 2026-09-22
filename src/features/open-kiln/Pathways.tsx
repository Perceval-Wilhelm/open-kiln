import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  ChartNoAxesCombined,
  ClipboardCheck,
  FileText,
  FlaskConical,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

import type { RequestContext, TreatmentRecord } from "@/features/open-kiln/types";

import { featuredRecord, governance, records } from "@/features/open-kiln/data";
import { Action, Journey, DataLabel, SectionHeading, StatusBadges, TextAction } from "@/features/open-kiln/Primitives";
import { formatDate } from "@/features/open-kiln/logic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function GovernanceDashboard({ onRequest }: { onRequest: (request: RequestContext) => void }) {
  const [quarter, setQuarter] = useState("Q2");
  const snapshot = governance.find((item) => item.quarter === quarter)!;
  const tonnes = snapshot.months.reduce((total, month) => total + month.tonnes, 0);
  const percentage = ((snapshot.completeRecords / snapshot.totalRecords) * 100).toFixed(1).replace(/\.0$/, "");
  const incomplete = snapshot.totalRecords - snapshot.completeRecords;
  const gapRate = (incomplete / snapshot.totalRecords) * 100;
  const previous = governance[0];
  const previousGapRate = ((previous.totalRecords - previous.completeRecords) / previous.totalRecords) * 100;
  const change = gapRate - previousGapRate;
  return (
    <div className="ok-dashboard" aria-label="Park governance dashboard">
      <div className="ok-dashboard-head">
        <div>
          <span className="ok-eyebrow">GOVERNANCE PORTAL</span>
          <h3>One park. A clearer picture.</h3>
          <p>
            Southern industrial cluster <span>·</span> <DataLabel />
          </p>
        </div>
        <div>
          <label className="ok-small-label" htmlFor="quarter">
            Reporting period
          </label>
          <select id="quarter" value={quarter} onChange={(e) => setQuarter(e.target.value)}>
            <option value="Q1">Q1 2026</option>
            <option value="Q2">Q2 2026</option>
          </select>
        </div>
      </div>
      <div className="ok-kpis" aria-live="polite">
        <div>
          <span>Participating tenants</span>
          <strong>
            {snapshot.participants}
            <small> / {snapshot.totalTenants}</small>
          </strong>
          <p>Consent-based participation</p>
        </div>
        <div>
          <span>Treated waste</span>
          <strong>
            {tonnes}
            <small> tonnes</small>
          </strong>
          <p>Across participating tenants</p>
        </div>
        <div>
          <span>Complete evidence</span>
          <strong>
            {percentage}
            <small>%</small>
          </strong>
          <p>
            {snapshot.completeRecords} of {snapshot.totalRecords} records
          </p>
        </div>
      </div>
      <div className="ok-chart-grid">
        <div className="ok-chart">
          <div className="ok-chart-title">
            <h4>Treatment activity</h4>
            <span>Tonnes / month</span>
          </div>
          <div className="ok-bars" aria-hidden="true">
            {snapshot.months.map((month) => (
              <div key={month.label}>
                <span>{month.tonnes}</span>
                <div style={{ height: `${month.tonnes * 2.3}px` }} />
                <small>{month.label}</small>
              </div>
            ))}
          </div>
          <table className="ok-sr-only">
            <caption>{quarter} 2026 treated waste in tonnes</caption>
            <thead>
              <tr>
                <th scope="col">Month</th>
                <th scope="col">Tonnes</th>
              </tr>
            </thead>
            <tbody>
              {snapshot.months.map((month) => (
                <tr key={month.label}>
                  <th scope="row">{month.label}</th>
                  <td>{month.tonnes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="ok-risk-note">
          <span className="ok-small-label">EVIDENCE READINESS</span>
          <h4>{snapshot.totalRecords - snapshot.completeRecords} records need a closer look.</h4>
          <p>
            {quarter === "Q2"
              ? `Evidence gaps affect ${gapRate.toFixed(1)}% of records, up ${change.toFixed(1)} percentage points from Q1.`
              : `Evidence gaps affect ${gapRate.toFixed(1)}% of records. This is the baseline period for comparison.`}
          </p>
          <div className="ok-gap-comparison" aria-label="Evidence gap rate by quarter">
            {governance.slice(0, quarter === "Q1" ? 1 : 2).map((item) => {
              const count = item.totalRecords - item.completeRecords;
              const rate = (count / item.totalRecords) * 100;
              return (
                <div key={item.quarter}>
                  <span>{item.quarter}</span>
                  <span className="ok-gap-track">
                    <i style={{ width: `${(rate / 20) * 100}%` }} />
                  </span>
                  <strong>{rate.toFixed(1)}%</strong>
                  <small>
                    {count}/{item.totalRecords}
                  </small>
                </div>
              );
            })}
          </div>
          <div>
            <ShieldCheck size={16} />
            <span>Aggregated view. No tenant-level access.</span>
          </div>
        </div>
      </div>
      <div className="ok-issues-header">
        <div>
          <span className="ok-small-label">REVIEW QUEUE</span>
          <h4>Where the evidence needs attention.</h4>
        </div>
        <span className="ok-issue-total">{incomplete} open items</span>
      </div>
      <div className="ok-issue-list">
        {snapshot.issues.map((issue, index) => (
          <article className="ok-issue-item" key={issue.id}>
            <span className="ok-issue-index">0{index + 1}</span>
            <div>
              <h5>{issue.title}</h5>
              <p>{issue.action}</p>
              <span>
                {issue.owner} · Review by {formatDate(issue.dueDate)}
              </span>
            </div>
            <strong>
              {issue.count}
              <small>records</small>
            </strong>
            <button
              className="ok-text-action"
              onClick={() =>
                onRequest({
                  kind: "evidence",
                  title: "Follow up on evidence",
                  context: `${snapshot.quarter} 2026 · ${issue.title} · ${issue.count} records. ${issue.action}`,
                })
              }
            >
              Follow up <ArrowUpRight size={16} />
              <span className="ok-sr-only"> on {issue.title}</span>
            </button>
          </article>
        ))}
      </div>
      <p className="ok-issues-note">
        One primary issue per incomplete record; categories do not overlap. Review dates belong to the historical
        quarter-end snapshot.
      </p>
      <p className="ok-dashboard-note">
        Illustrative quarter-end dataset, separate from the operational register. Evidence readiness describes document
        availability, not a regulatory compliance assessment.
      </p>
    </div>
  );
}

export function Pathways({
  onRecord,
  onResource,
  onRequest,
  onOverview,
}: {
  onRecord: (record: TreatmentRecord) => void;
  onResource: (id: string) => void;
  onRequest: (request: RequestContext) => void;
  onOverview: () => void;
}) {
  return (
    <section className="ok-section ok-pathways" id="pathways" tabIndex={-1}>
      <div className="ok-container">
        <SectionHeading
          number="03"
          eyebrow="TWO PATHWAYS. ONE COMMITMENT."
          title="Your role. Your view of the evidence."
        >
          From a single treatment record to a park-wide perspective, start with what matters to you.
        </SectionHeading>
        <Tabs defaultValue="ehs" className="ok-audience-tabs">
          <TabsList className="ok-audience-list" aria-label="Choose your verification pathway">
            <TabsTrigger className="ok-audience-choice" value="ehs">
              <ClipboardCheck size={26} />
              <span>
                <strong>EHS & Plant Managers</strong>
                <small>Follow your own treatment records.</small>
              </span>
              <ArrowUpRight size={19} />
            </TabsTrigger>
            <TabsTrigger className="ok-audience-choice" value="boards">
              <Building2 size={26} />
              <span>
                <strong>Industrial Park Boards</strong>
                <small>See the bigger environmental picture.</small>
              </span>
              <ArrowUpRight size={19} />
            </TabsTrigger>
          </TabsList>
          <TabsContent value="ehs">
            <div className="ok-pathway-content">
              <div className="ok-pathway-intro">
                <div>
                  <span className="ok-eyebrow">THE VERIFICATION HUB</span>
                  <h3>
                    From handover
                    <br />
                    to a checkable record.
                  </h3>
                  <p>Understand what happened to your waste, how it was documented, and where the evidence ends.</p>
                </div>
                <div className="ok-mini-record">
                  <div>
                    <FileText size={20} />
                    <DataLabel />
                  </div>
                  <span className="ok-mono">{featuredRecord.id}</span>
                  <h4>{featuredRecord.generator}</h4>
                  <StatusBadges record={records[0]} />
                  <TextAction onClick={() => onRecord(records[0])}>Explore this record</TextAction>
                </div>
              </div>
              <Journey
                label="EHS treatment journey"
                steps={["Waste handover", "Treatment process", "Evidence Hub", "Customer verification"]}
              />
              <div className="ok-feature-grid">
                {[
                  {
                    title: "The complete story",
                    body: "Waste identity, quantity, receipt and treatment milestones.",
                    icon: ClipboardCheck,
                  },
                  {
                    title: "Methods, made clear",
                    body: "How evidence is produced, including its limitations.",
                    icon: FlaskConical,
                  },
                  {
                    title: "Monitoring in context",
                    body: "Operational checkpoints, coverage and visible evidence gaps.",
                    icon: ChartNoAxesCombined,
                  },
                ].map(({ title, body, icon: Icon }) => (
                  <div key={title}>
                    <Icon size={22} />
                    <h4>{title}</h4>
                    <p>{body}</p>
                  </div>
                ))}
              </div>
              <div className="ok-support">
                <span className="ok-small-label">GO A LITTLE DEEPER</span>
                <div>
                  <TextAction onClick={onOverview}>ESG Dashboard</TextAction>
                  <TextAction onClick={() => onResource("pcb")}>PCB Fact Sheet</TextAction>
                  <TextAction onClick={() => onResource("optoce")}>OPTOCE Fact Sheet</TextAction>
                  <TextAction
                    onClick={() =>
                      onRequest({
                        kind: "evidence",
                        title: "Request supporting evidence",
                        context: "ESG Data Request Portal",
                      })
                    }
                  >
                    ESG Data Request Portal
                  </TextAction>
                  <TextAction
                    onClick={() =>
                      onRequest({
                        kind: "updates",
                        title: "Monthly email updates",
                        context: "Prepare your interest in monthly evidence and publication updates.",
                      })
                    }
                  >
                    Monthly Email Updates
                  </TextAction>
                </div>
              </div>
              <div className="ok-pathway-next">
                <p>
                  <strong>Take the next step.</strong> See the process on a guided visit, then discuss the evidence at
                  an executive roundtable.
                </p>
                <Action
                  secondary
                  onClick={() =>
                    onRequest({
                      kind: "visit",
                      title: "Book a verification visit",
                      context: "A guided verification visit for EHS teams and industrial park representatives.",
                    })
                  }
                >
                  Explore a plant visit <ArrowRight size={16} />
                </Action>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="boards">
            <div className="ok-pathway-content">
              <div className="ok-board-intro">
                <span className="ok-eyebrow">FOR INDUSTRIAL PARK DEVELOPERS & MANAGEMENT BOARDS</span>
                <h3>A shared view. Responsible oversight.</h3>
                <p>
                  Explore consent-based environmental intelligence across participating tenants, with clear reporting
                  boundaries.
                </p>
              </div>
              <Journey
                label="Governance data journey"
                steps={["Tenant records", "Consent aggregation", "Governance portal", "Board oversight"]}
              />
              <GovernanceDashboard onRequest={onRequest} />
              <div className="ok-support">
                <span className="ok-small-label">YOUR GOVERNANCE RESOURCES</span>
                <div>
                  <TextAction onClick={() => onResource("governance")}>Quarterly Governance Brief · Q2</TextAction>
                  <TextAction onClick={() => onResource("esg-toolkit")}>ESG Toolkit</TextAction>
                  <TextAction onClick={() => onResource("compliance-toolkit")}>Compliance Toolkit</TextAction>
                  <TextAction onClick={() => onResource("policy")}>Policy Update Briefs</TextAction>
                  <TextAction
                    onClick={() =>
                      onRequest({
                        kind: "followup",
                        title: "Arrange a follow-up meeting",
                        context: "Discuss evidence gaps and next steps from your park governance review.",
                      })
                    }
                  >
                    Follow-up Meetings
                  </TextAction>
                </div>
              </div>
              <h4 className="ok-governance-heading">Turn the conversation into action.</h4>
              <Journey
                label="Executive governance journey"
                steps={["Park review", "Risk dialogue", "Action planning", "Annual governance review"]}
              />
              <div className="ok-pathway-next">
                <p>Review park performance, discuss evidence gaps and agree shared governance priorities.</p>
                <Action
                  secondary
                  onClick={() =>
                    onRequest({
                      kind: "roundtable",
                      title: "Join a governance roundtable",
                      context: "Park performance review, governance risk dialogue and collaborative action planning.",
                    })
                  }
                >
                  Explore a roundtable <ArrowRight size={16} />
                </Action>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
