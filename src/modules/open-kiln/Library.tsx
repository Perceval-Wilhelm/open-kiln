import { ArrowUpRight, BookOpen, FileClock, FileText, FlaskConical, Search } from "lucide-react";
import { useState } from "react";

import type { EvidenceCategory, EvidenceResource } from "~/modules/open-kiln/types";

import { categories, resources } from "~/modules/open-kiln/data";
import { filterResources, formatDate } from "~/modules/open-kiln/logic";
import { SectionHeading } from "~/modules/open-kiln/Primitives";
import { Input } from "~/shared/components/ui/input";

export function EvidenceLibrary({
  category,
  onCategory,
  onResource,
}: {
  category: EvidenceCategory | "All";
  onCategory: (category: EvidenceCategory | "All") => void;
  onResource: (resource: EvidenceResource) => void;
}) {
  const [query, setQuery] = useState("");
  const filtered = filterResources(resources, category, query);
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
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="ok-library-filters" role="group" aria-label="Filter evidence resources">
          {(["All", ...categories] as const).map((item) => (
            <button key={item} aria-pressed={category === item} onClick={() => onCategory(item)}>
              {item}
            </button>
          ))}
        </div>
        <p className="ok-resource-count" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "resource" : "resources"}
          {category !== "All" ? ` · ${category}` : " · Sources and scope included"}
        </p>
        <div className="ok-resource-grid">
          {filtered.map((resource) => {
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
        {!filtered.length && (
          <div className="ok-empty">
            <BookOpen size={28} />
            <h3>No resources match this search.</h3>
            <p>Try another phrase or reset the filters.</p>
            <button
              className="ok-text-action"
              onClick={() => {
                setQuery("");
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
