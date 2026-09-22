import type { RefObject } from "react";

import { ArrowRight, ArrowUpRight, FileSearch, Search } from "lucide-react";
import { useState } from "react";

import type { SearchKind, TreatmentRecord } from "@/features/open-kiln/types";

import { records } from "@/features/open-kiln/data";
import { formatDate, searchRecords } from "@/features/open-kiln/logic";
import { Action, SampleLabel, SectionHeading, StatusBadges } from "@/features/open-kiln/Primitives";
import { Input } from "@/components/ui/input";

export function RecordSearch({
  inputRef,
  sampleSignal,
  onRecord,
}: {
  inputRef: RefObject<HTMLInputElement | null>;
  sampleSignal: number;
  onRecord: (record: TreatmentRecord) => void;
}) {
  const [kind, setKind] = useState<SearchKind>("manifest");
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState<{ kind: SearchKind; query: string } | null>(null);
  const [error, setError] = useState("");
  const [lastSample, setLastSample] = useState(sampleSignal);
  // A hero CTA can request the same sample repeatedly without remounting the form or losing focus.
  if (sampleSignal !== lastSample) {
    setLastSample(sampleSignal);
    setKind("manifest");
    setQuery("OK-DEMO-001");
    setSubmitted({ kind: "manifest", query: "OK-DEMO-001" });
    setError("");
  }
  const matches = submitted ? searchRecords(records, submitted.kind, submitted.query) : [];
  function trySample() {
    setKind("manifest");
    setQuery("OK-DEMO-001");
    setSubmitted({ kind: "manifest", query: "OK-DEMO-001" });
    setError("");
  }
  const label = kind === "manifest" ? "Manifest ID" : kind === "generator" ? "Generator name" : "Treatment date";
  return (
    <section id="verify" className="ok-section ok-verify" tabIndex={-1}>
      <div className="ok-container">
        <div className="ok-heading-row">
          <SectionHeading number="01" eyebrow="SEARCH & VERIFY" title="Start with the evidence.">
            A treatment record is the beginning. Explore the details behind it.
          </SectionHeading>
          <SampleLabel />
        </div>
        <div className="ok-search-box">
          <form
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              if (!query.trim()) {
                setError(`Enter a ${label.toLowerCase()} to continue.`);
                setSubmitted(null);
                inputRef.current?.focus();
                return;
              }
              setError("");
              setSubmitted({ kind, query });
            }}
          >
            <div className="ok-search-kind">
              <label htmlFor="record-kind">Search by</label>
              <select
                id="record-kind"
                value={kind}
                onChange={(e) => {
                  setKind(e.target.value as SearchKind);
                  setQuery("");
                  setError("");
                  setSubmitted(null);
                }}
              >
                <option value="manifest">Manifest ID</option>
                <option value="generator">Generator name</option>
                <option value="date">Treatment date</option>
              </select>
            </div>
            <div className="ok-search-input">
              <label htmlFor="record-query">{label}</label>
              <div>
                <Search size={19} aria-hidden="true" />
                <Input
                  ref={inputRef}
                  id="record-query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type={kind === "date" ? "date" : "text"}
                  placeholder={kind === "manifest" ? "e.g. OK-DEMO-001" : "e.g. Demo Manufacturing A"}
                  aria-invalid={!!error}
                  aria-describedby={error ? "record-error" : "record-search-help"}
                />
              </div>
            </div>
            <Action type="submit">
              Verify record <ArrowRight size={17} />
            </Action>
          </form>
          <div className="ok-search-help">
            <span id="record-search-help">Explore fictional records. No customer information is used.</span>
            <button onClick={trySample}>
              Try a sample <ArrowUpRight size={14} aria-hidden="true" />
            </button>
          </div>
          {error && (
            <p className="ok-error" id="record-error" role="alert">
              {error}
            </p>
          )}
        </div>
        <div aria-live="polite" aria-atomic="true" className="ok-results-summary">
          {submitted &&
            `${matches.length} ${matches.length === 1 ? "record" : "records"} found for “${submitted.query}”`}
        </div>
        {submitted ? (
          <div className="ok-record-results">
            {matches.length ? (
              matches.map((record) => (
                <div className="ok-record-row" key={record.id}>
                  <div>
                    <span className="ok-mono">{record.id}</span>
                    <h3>{record.generator}</h3>
                    <p>
                      {record.quantity} {record.unit} · {formatDate(record.treatmentDate)}
                    </p>
                  </div>
                  <StatusBadges record={record} />
                  <Action secondary onClick={() => onRecord(record)}>
                    View evidence <ArrowRight size={16} />
                  </Action>
                </div>
              ))
            ) : (
              <div className="ok-empty">
                <FileSearch size={28} />
                <h3>No matching sample records</h3>
                <p>Try “Demo Manufacturing A”, 18 September 2026, or open our sample record.</p>
                <Action secondary onClick={trySample}>
                  Try a sample
                </Action>
              </div>
            )}
          </div>
        ) : (
          <div className="ok-search-initial">
            <FileSearch size={17} />
            <span>Your evidence trail starts here. Search one of four sample records.</span>
          </div>
        )}
      </div>
    </section>
  );
}
