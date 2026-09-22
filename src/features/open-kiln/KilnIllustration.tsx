import { SampleRecordButton } from "@/features/open-kiln/Experience";
import { ArrowUpRight, Check, FileText, ScanLine } from "lucide-react";

import { SampleLabel } from "@/features/open-kiln/Primitives";

export function KilnIllustration() {
  return (
    <div className="ok-hero-art">
      <div className="ok-art-top">
        <span>
          <ScanLine size={15} /> THE OPEN KILN VIEW
        </span>
        <span>PROCESS VIEW</span>
      </div>
      <svg
        className="ok-kiln-svg"
        viewBox="0 0 600 400"
        role="img"
        aria-label="Illustrated kiln with a traceable journey from waste handover to published evidence"
      >
        <defs>
          <pattern id="kiln-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M30 0H0V30" fill="none" stroke="#176341" strokeOpacity=".07" />
          </pattern>
          <linearGradient id="kiln-body" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#f4f7e5" />
            <stop offset="1" stopColor="#adc6a9" />
          </linearGradient>
        </defs>
        <rect width="600" height="400" fill="url(#kiln-grid)" />
        <circle cx="322" cy="171" r="132" fill="#dce8b9" opacity=".52" />
        <circle cx="322" cy="171" r="109" fill="none" stroke="#176341" strokeOpacity=".15" strokeDasharray="4 7" />
        <path d="M48 310L337 379L566 292L280 223Z" fill="#c7d8bd" stroke="#7c9d7b" />
        <path d="M48 310v13l289 69v-13M337 379l229-87v13l-229 87" fill="#aec4a5" stroke="#7c9d7b" />
        <g stroke="#3e6d51" strokeWidth="1.5" strokeLinejoin="round">
          <path d="M359 116l37-14 38 10-38 15Z" fill="#f3f6e8" />
          <path d="M359 116v131l37 11V127Z" fill="#aec7ae" />
          <path d="M396 127l38-15v132l-38 14Z" fill="#739975" />
          <path d="M369 108V58l16-6 13 4v51l-13 5Z" fill="#e3ead6" />
          <path d="M385 57v55l13-5V56Z" fill="#9bb99c" />
          <path d="M379 163l55-18M379 196l55-18M379 227l55-18" fill="none" />
          <path d="M448 221l36-13 35 10-36 13Z" fill="#f3f6e8" />
          <path d="M448 221v50l35 10v-50Z" fill="#abc5ab" />
          <path d="M483 231l36-13v50l-36 13Z" fill="#739975" />
          <path d="M116 259l42-18 48 13-42 19Z" fill="#f7f9ee" />
          <path d="M116 259v47l48 12v-45Z" fill="#bdcfb5" />
          <path d="M164 273l42-19v46l-42 18Z" fill="#82a17e" />
          <path d="M182 244L360 181q17-3 25 18t-4 30L200 295q-18 1-26-20t8-31Z" fill="url(#kiln-body)" />
          <ellipse cx="188" cy="270" rx="17" ry="28" transform="rotate(-22 188 270)" fill="#789a76" />
          <ellipse cx="188" cy="270" rx="9" ry="17" transform="rotate(-22 188 270)" fill="#315b43" />
          <path d="M234 225q25 19 21 50M310 199q25 19 21 49" fill="none" strokeWidth="7" stroke="#668965" />
          <path d="M240 279v30l19 5v-32M316 253v32l19 5v-34" fill="#6a8d68" />
          <path d="M405 273l22-9 24 7-22 9Z" fill="#edf2e2" />
          <path d="M405 273v20l24 7v-20Z" fill="#afc6a6" />
          <path d="M429 280l22-9v20l-22 9Z" fill="#7f9f79" />
        </g>
        <g fill="none" stroke="#176341" strokeWidth="1.5" strokeDasharray="4 5">
          <path d="M139 253V200H56" />
          <path d="M292 210V128H205" />
          <path d="M450 192h83v-44" />
        </g>
        <g fill="#176341">
          <circle cx="139" cy="253" r="4" />
          <circle cx="292" cy="210" r="4" />
          <circle cx="450" cy="192" r="4" />
        </g>
        <g fill="#315b43" fontFamily="monospace" fontSize="10">
          <text x="36" y="190">
            01 HANDOVER
          </text>
          <text x="148" y="117">
            02 TREATMENT
          </text>
          <text x="458" y="136">
            03 EVIDENCE
          </text>
        </g>
      </svg>
      <SampleRecordButton>
        <span className="ok-document-icon">
          <FileText size={21} />
        </span>
        <span className="ok-floating-copy">
          <span className="ok-mono">OK-DEMO-001</span>
          <strong>Every record has a story.</strong>
          <span>
            <Check size={13} /> Treatment completed · Evidence available
          </span>
        </span>
        <ArrowUpRight size={21} />
      </SampleRecordButton>
      <div className="ok-art-bottom">
        <SampleLabel />
        <span>Illustration of the proposed process</span>
      </div>
    </div>
  );
}
