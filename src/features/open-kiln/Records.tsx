import type { RefObject } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, FileSearch, Search, SlidersHorizontal } from "lucide-react";
import { useRef, useState } from "react";
import type { SearchKind, TreatmentRecord } from "@/features/open-kiln/types";
import { featuredRecord, records } from "@/features/open-kiln/data";
import { formatDate, searchRecords } from "@/features/open-kiln/logic";
import { Action, SectionHeading, StatusBadges } from "@/features/open-kiln/Primitives";
import { Input } from "@/components/ui/input";

const pageSize = 6;

export function RecordSearch({
  inputRef,
  browseSignal,
  onRecord,
}: {
  inputRef: RefObject<HTMLInputElement | null>;
  browseSignal: number;
  onRecord: (record: TreatmentRecord) => void;
}) {
  const [kind, setKind] = useState<SearchKind>("manifest");
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState<{ kind: SearchKind; query: string } | null>(null);
  const [error, setError] = useState("");
  const [lastBrowse, setLastBrowse] = useState(browseSignal);
  const [status, setStatus] = useState("All");
  const [evidence, setEvidence] = useState("All");
  const [sort, setSort] = useState("recent");
  const [page, setPage] = useState(1);
  const resultsRef = useRef<HTMLDivElement>(null);
  function changePage(nextPage: number) {
    setPage(nextPage);
    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
      resultsRef.current?.focus({ preventScroll: true });
    });
  }
  function resetFilters() {
    setStatus("All");
    setEvidence("All");
    setPage(1);
  }
  function fillRecordId() {
    setKind("manifest");
    setQuery(featuredRecord.id);
    setSubmitted({ kind: "manifest", query: featuredRecord.id });
    setError("");
    resetFilters();
    inputRef.current?.focus();
  }
  // A repeated hero action restores the full register without remounting its input.
  if (browseSignal !== lastBrowse) {
    setLastBrowse(browseSignal);
    setQuery("");
    setSubmitted(null);
    setError("");
    resetFilters();
  }
  const source = submitted ? searchRecords(records, submitted.kind, submitted.query) : records;
  const matches = source
    .filter(
      (record) =>
        (status === "All" || record.status === status) && (evidence === "All" || record.evidenceStatus === evidence),
    )
    .sort((a, b) =>
      sort === "quantity"
        ? b.quantity - a.quantity
        : b.publishedAt.localeCompare(a.publishedAt) || a.id.localeCompare(b.id),
    );
  const pageCount = Math.max(1, Math.ceil(matches.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visible = matches.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const label = kind === "manifest" ? "Manifest ID" : kind === "generator" ? "Generator name" : "Treatment date";
  function browseAll() {
    setSubmitted(null);
    setQuery("");
    setError("");
    resetFilters();
  }
  return (
    <section id="verify" className="ok-section ok-verify" tabIndex={-1}>
      <div className="ok-container">
        <div className="ok-heading-row">
          <SectionHeading number="01" eyebrow="SEARCH & VERIFY" title="Every record. A clearer picture.">
            Trace a shipment from receipt to treatment. See the documents, the dates and the gaps.
          </SectionHeading>
          <div className="ok-register-total">
            <strong>{records.length}</strong>
            <span>records in the register</span>
          </div>
        </div>
        <div className="ok-search-box">
          <form
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              if (!query.trim()) {
                setError(`Enter a ${label.toLowerCase()} to continue.`);
                inputRef.current?.focus();
                return;
              }
              setError("");
              setSubmitted({ kind, query: query.trim() });
              resetFilters();
            }}
          >
            <div className="ok-search-kind">
              <label htmlFor="record-kind">Search by</label>
              <select
                id="record-kind"
                value={kind}
                onChange={(event) => {
                  setKind(event.target.value as SearchKind);
                  setQuery("");
                  setError("");
                  setSubmitted(null);
                  resetFilters();
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
                  onChange={(event) => setQuery(event.target.value)}
                  type={kind === "date" ? "date" : "text"}
                  placeholder={kind === "manifest" ? `e.g. ${featuredRecord.id}` : "e.g. Mekong Precision"}
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
            <span id="record-search-help">
              Illustrative operational records. Public research is attributed separately.
            </span>
            <button onClick={fillRecordId}>
              Use a record ID <ArrowUpRight size={15} aria-hidden="true" />
            </button>
          </div>
          {error && (
            <p className="ok-error" id="record-error" role="alert">
              {error}
            </p>
          )}
        </div>
        <div className="ok-register-toolbar">
          <div className="ok-register-filters">
            <SlidersHorizontal size={17} aria-hidden="true" />
            <label>
              <span className="ok-sr-only">Treatment status filter</span>
              <select
                aria-label="Treatment status filter"
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value);
                  setPage(1);
                }}
              >
                <option value="All">All treatment statuses</option>
                <option value="Completed">Completed</option>
                <option value="Processing">Processing</option>
              </select>
            </label>
            <label>
              <span className="ok-sr-only">Evidence availability filter</span>
              <select
                aria-label="Evidence availability filter"
                value={evidence}
                onChange={(event) => {
                  setEvidence(event.target.value);
                  setPage(1);
                }}
              >
                <option value="All">All evidence</option>
                <option value="Complete">Complete evidence</option>
                <option value="Partial">Partial evidence</option>
              </select>
            </label>
          </div>
          <label className="ok-register-sort">
            <span>Sort</span>
            <select
              aria-label="Sort records"
              value={sort}
              onChange={(event) => {
                setSort(event.target.value);
                setPage(1);
              }}
            >
              <option value="recent">Latest publication</option>
              <option value="quantity">Quantity: high to low</option>
            </select>
          </label>
        </div>
        <div className="ok-register-results-head" ref={resultsRef} tabIndex={-1}>
          <p aria-live="polite" aria-atomic="true" className="ok-results-summary">
            {submitted
              ? `${matches.length} ${matches.length === 1 ? "record" : "records"} found for “${submitted.query}”`
              : `${matches.length} records · September 2026`}
          </p>
          {(submitted || status !== "All" || evidence !== "All") && (
            <button className="ok-text-action" onClick={browseAll}>
              Browse all records <ArrowRight size={16} />
            </button>
          )}
        </div>
        <div className="ok-register-grid">
          {visible.map((record) => (
            <article className="ok-register-card" key={record.id}>
              <div className="ok-register-card-head">
                <span className="ok-mono">{record.id}</span>
                <span>v{record.version}</span>
              </div>
              <h3>{record.generator}</h3>
              <p className="ok-register-sector">{record.sector}</p>
              <StatusBadges record={record} />
              <p className="ok-register-waste">{record.wasteType}</p>
              <dl>
                <div>
                  <dt>Quantity received</dt>
                  <dd>
                    {record.quantity.toLocaleString("en-GB")} <span>tonnes</span>
                  </dd>
                </div>
                <div>
                  <dt>{record.treatmentDate ? "Treatment date" : "Received"}</dt>
                  <dd>{formatDate(record.treatmentDate ?? record.receiptDate)}</dd>
                </div>
              </dl>
              <button className="ok-register-open" onClick={() => onRecord(record)}>
                View evidence <ArrowUpRight size={18} />
                <span className="ok-sr-only"> for {record.id}</span>
              </button>
            </article>
          ))}
        </div>
        {!matches.length && (
          <div className="ok-empty">
            <FileSearch size={30} />
            <h3>No matching records</h3>
            <p>Try another name, date or status. The full register is always available below.</p>
            <Action secondary onClick={browseAll}>
              Browse all records <ArrowRight size={16} />
            </Action>
          </div>
        )}
        {!!matches.length && (
          <div className="ok-register-pagination">
            <span>
              Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, matches.length)} of{" "}
              {matches.length}
            </span>
            <div>
              <button
                disabled={currentPage === 1}
                onClick={() => changePage(currentPage - 1)}
                aria-label="Previous records page"
              >
                <ArrowLeft size={17} />
              </button>
              <span aria-live="polite">
                {currentPage} / {pageCount}
              </span>
              <button
                disabled={currentPage === pageCount}
                onClick={() => changePage(currentPage + 1)}
                aria-label="Next records page"
              >
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
