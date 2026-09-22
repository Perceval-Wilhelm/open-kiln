import type { ReactNode } from "react";

import { ArrowUpRight, CircleCheck, Clock3 } from "lucide-react";

import type { Milestone, TreatmentRecord } from "~/modules/open-kiln/types";

import { formatDate } from "~/modules/open-kiln/logic";
import { Button } from "~/shared/components/ui/button";

export function Action({
  children,
  onClick,
  secondary = false,
  className = "",
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  className?: string;
  type?: "button" | "submit";
}) {
  return (
    <Button
      type={type}
      onClick={onClick}
      variant={secondary ? "outline" : "default"}
      className={`ok-button ${secondary ? "ok-button-secondary" : ""} ${className}`}
    >
      {children}
    </Button>
  );
}

export function TextAction({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button className="ok-text-action" onClick={onClick}>
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </button>
  );
}

export function SampleLabel({ light = false }: { light?: boolean }) {
  return (
    <span className={`ok-sample ${light ? "ok-sample-light" : ""}`}>
      <span aria-hidden="true" />
      Sample data
    </span>
  );
}

export function SectionHeading({
  number,
  eyebrow,
  title,
  children,
}: {
  number: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="ok-section-heading">
      <div className="ok-eyebrow">
        <span>{number}</span>
        {eyebrow}
      </div>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

export function StatusBadges({ record }: { record: TreatmentRecord }) {
  return (
    <div className="ok-badges">
      <span className={`ok-status ${record.status === "Processing" ? "ok-status-amber" : ""}`}>
        {record.status === "Completed" ? <CircleCheck size={14} /> : <Clock3 size={14} />}
        {record.status}
      </span>
      <span className={`ok-status ok-evidence-status ${record.evidenceStatus === "Partial" ? "ok-status-amber" : ""}`}>
        Evidence {record.evidenceStatus.toLowerCase()}
      </span>
    </div>
  );
}

export function Timeline({ items }: { items: Array<Milestone> }) {
  return (
    <ol className="ok-timeline">
      {items.map((item, index) => (
        <li key={`${item.date}-${index}`}>
          <span className="ok-timeline-dot" aria-hidden="true" />
          <div>
            <time dateTime={item.date}>{formatDate(item.date)}</time>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Journey({ steps, label }: { steps: Array<string>; label: string }) {
  return (
    <ol className="ok-journey" aria-label={label}>
      {steps.map((step, i) => (
        <li key={step}>
          <span>{String(i + 1).padStart(2, "0")}</span>
          <p>{step}</p>
        </li>
      ))}
    </ol>
  );
}
