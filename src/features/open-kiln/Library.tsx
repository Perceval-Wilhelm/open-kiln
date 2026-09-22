import {
  ArrowUpRight,
  BookOpen,
  ChartNoAxesCombined,
  ClipboardList,
  FileClock,
  FileText,
  FlaskConical,
  Search,
} from "lucide-react";
import { useState } from "react";

import type { RequestContext, EvidenceCategory, EvidenceResource } from "@/features/open-kiln/types";

import { categories, resources } from "@/features/open-kiln/data";
import { filterResources, formatDate } from "@/features/open-kiln/logic";
import { SectionHeading } from "@/features/open-kiln/Primitives";
import { Input } from "@/components/ui/input";

export function EvidenceLibrary({
  category,
  onCategory,
  onResource,
  onOverview,
  onRequest,
}: {
  category: EvidenceCategory | "All";
  onCategory: (category: EvidenceCategory | "All") => void;
  onResource: (resource: EvidenceResource) => void;
  onOverview: () => void;
  onRequest: (request: RequestContext) => void;
}) {
  const [query, setQuery] = useState("");
  const [sourceKind, setSourceKind] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const filtered = filterResources(resources, category, query).filter(
    (resource) =>
      sourceKind === "All" ||
      (sourceKind === "Public" ? resource.kind === "External reference" : resource.kind !== "External reference"),
  );
  return (
    <section className="ok-section ok-library" id="library" tabIndex={-1}>
      <div className="ok-container">
        <div className="ok-heading-row">
          <SectionHeading number="04" eyebrow="THE EVIDENCE LIBRARY" title="Explore what sits behind the record.">
            Methods, supporting documents and useful references. With the source always in view.
          </SectionHeading>
          <div className="ok-library-search">
            <label htmlFor="library-query" className="ok-sr-only">
              Search the evidence library
            </label>
            <Search size={18} aria-hidden="true" />
            <Input
              id="library-query"
              placeholder="Find a resource…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisibleCount(6);
              }}
            />
          </div>
        </div>
        <div className="ok-library-services">
          <button onClick={onOverview}>
            <span className="ok-service-icon">
              <ChartNoAxesCombined size={25} />
            </span>
            <span>
              <small>EXPLORE THE REGISTER</small>
              <strong>ESG Dashboard</strong>
              <span>Record coverage, treatment status and evidence availability.</span>
            </span>
            <ArrowUpRight size={22} />
          </button>
          <button
            onClick={() =>
              onRequest({
                kind: "evidence",
                title: "Request supporting evidence",
                context: "ESG Data Request Portal · Prepare a request for the documents you need to review.",
              })
            }
          >
            <span className="ok-service-icon">
              <ClipboardList size={25} />
            </span>
            <span>
              <small>TAKE THE NEXT STEP</small>
              <strong>ESG Data Request Portal</strong>
              <span>Identify a missing document and prepare your questions.</span>
            </span>
            <ArrowUpRight size={22} />
          </button>
        </div>
        <div className="ok-library-filters" role="group" aria-label="Filter evidence resources">
          {(["All", ...categories] as const).map((item) => (
            <button
              key={item}
              aria-pressed={category === item}
              onClick={() => {
                onCategory(item);
                setVisibleCount(6);
              }}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="ok-library-source-filter">
          <label htmlFor="resource-source">Source</label>
          <select
            id="resource-source"
            value={sourceKind}
            onChange={(event) => {
              setSourceKind(event.target.value);
              setVisibleCount(6);
            }}
          >
            <option value="All">All publishers</option>
            <option value="Public">Public references</option>
            <option value="Editorial">Open Kiln guides</option>
          </select>
        </div>
        <p className="ok-resource-count" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "resource" : "resources"}
          {category !== "All" ? ` · ${category}` : " · Sources and scope included"}
        </p>
        <div className="ok-resource-grid">
          {filtered.slice(0, visibleCount).map((resource) => {
            const Icon =
              resource.category === "Methodology & Monitoring"
                ? FlaskConical
                : resource.category === "History"
                  ? FileClock
                  : resource.category === "Governance"
                    ? BookOpen
                    : FileText;
            return (
              <button
                className={`ok-resource-card ${resource.kind === "External reference" ? "ok-resource-external" : ""}`}
                key={resource.id}
                onClick={() => onResource(resource)}
              >
                <div className="ok-resource-cover">
                  <Icon size={32} strokeWidth={1.3} />
                  <span>{resource.category}</span>
                  <span className="ok-resource-cover-lines" aria-hidden="true" />
                  <small>{resource.kind}</small>
                  <ArrowUpRight size={20} />
                </div>
                <div className="ok-resource-copy">
                  <h3>{resource.title}</h3>
                  <p>{resource.summary}</p>
                  <div>
                    <span>{resource.publisher}</span>
                    <span>{resource.kind === "External reference" ? resource.version : formatDate(resource.date)}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        {filtered.length > visibleCount && (
          <button className="ok-show-resources" onClick={() => setVisibleCount((value) => value + 6)}>
            Show more resources <span>{filtered.length - visibleCount} remaining</span>
            <ArrowUpRight size={17} />
          </button>
        )}
        {!filtered.length && (
          <div className="ok-empty">
            <BookOpen size={28} />
            <h3>No resources match this search.</h3>
            <p>Try another phrase or reset the filters.</p>
            <button
              className="ok-text-action"
              onClick={() => {
                setQuery("");
                setSourceKind("All");
                setVisibleCount(6);
                onCategory("All");
              }}
            >
              Reset library filters <ArrowUpRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
