import { ProcessExplorer } from "@/features/open-kiln/ProcessExplorer";

// A process schematic, not a depiction of a named facility or its operating conditions.
export function KilnIllustration() {
  return (
    <ProcessExplorer>
      <svg
        className="ok-process-drawing"
        viewBox="0 0 640 300"
        role="img"
        aria-label="Co-processing schematic showing receiving equipment, a rotary kiln, a preheater tower and monitoring equipment"
      >
        <defs>
          <linearGradient id="kiln-steel" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#375a4a" />
            <stop offset=".28" stopColor="#568c73" />
            <stop offset=".58" stopColor="#2d493c" />
            <stop offset="1" stopColor="#132b20" />
          </linearGradient>
          <linearGradient id="kiln-tower" x1="0" x2="1">
            <stop stopColor="#263d32" />
            <stop offset=".48" stopColor="#416a57" />
            <stop offset="1" stopColor="#23382e" />
          </linearGradient>
          <linearGradient id="kiln-heat" x1="0" x2="1">
            <stop stopColor="#ff5a14" />
            <stop offset=".45" stopColor="#ffc46b" />
            <stop offset="1" stopColor="#ffe3b0" stopOpacity=".1" />
          </linearGradient>
          <pattern id="kiln-hatch" width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M0 6L6 0" stroke="#3f6754" strokeWidth=".6" />
          </pattern>
          <radialGradient id="kiln-glow">
            <stop stopColor="#ff6a1a" stopOpacity=".5" />
            <stop offset="1" stopColor="#ff6a1a" stopOpacity="0" />
          </radialGradient>
          <filter id="kiln-haze" x="-10%" y="-40%" width="120%" height="180%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.09" numOctaves="2" seed="3">
              <animate
                attributeName="baseFrequency"
                dur="5s"
                values="0.02 0.09;0.026 0.13;0.02 0.09"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="7" />
          </filter>
          <filter id="kiln-shadow" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <ellipse cx="332" cy="261" rx="258" ry="10" fill="#000" opacity=".55" filter="url(#kiln-shadow)" />
        <ellipse className="ok-kiln-glow" cx="262" cy="200" rx="190" ry="78" fill="url(#kiln-glow)" />
        <path d="M32 254H608M46 270H594" stroke="#2f4d3f" strokeWidth="1" />
        <g stroke="#5f9c80" strokeWidth="1.3" strokeLinejoin="round">
          <g className="ok-drawing-receive">
            <path d="M51 146h55v35l-16 21H68l-17-21Z" fill="url(#kiln-tower)" />
            <path d="M47 146h63v9H47Z" fill="#355647" />
            <path d="M62 202v48m34-48v48M59 240h40M78 203v16h48" fill="none" strokeWidth="3" />
            <rect x="39" y="248" width="74" height="6" rx="2" fill="#2d4a3c" />
            <path d="M99 228l64-34 5 9-64 34Z" fill="#385b4b" />
            <path
              className="ok-kiln-conveyor"
              d="M102 232.5L165 199"
              fill="none"
              stroke="#e8efd9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="0.1 8"
            />
            <path d="M113 231v19m29-35v35" fill="none" />
            <path d="M63 138v-11h22v11" fill="none" />
            <path d="M56 164h44m-40 7h36m-30 8h24" fill="none" opacity=".5" />
          </g>
          <g className="ok-drawing-treat">
            <path d="M368 53h84v194h-84Z" fill="url(#kiln-hatch)" opacity=".35" />
            <path
              d="M369 51v201m80-201v201M367 84h86m-86 41h86m-86 42h86m-86 43h86M369 84l80 41m-80 0 80 42m-80 0 80 43"
              fill="none"
              stroke="#4a7963"
            />
            <path
              d="M357 47h105v6H357Zm0 36h105v5H357Zm0 41h105v5H357Zm0 41h105v5H357Zm0 41h105v5H357Z"
              fill="#355647"
            />
            <path
              d="M378 57h22v19l-11 16-11-16Zm42 0h22v19l-11 16-11-16ZM389 103h34v27l-17 21-17-21Zm0 61h34v23l-17 26-17-26Z"
              fill="url(#kiln-tower)"
            />
            <path d="M389 92v10m42-10v10h-25m0 48v14m0 49v13h-23" fill="none" strokeWidth="7" />
            <path
              d="M363 59h-12v174h12m-12-162h12m-12 12h12m-12 12h12m-12 12h12m-12 12h12m-12 12h12m-12 12h12m-12 12h12m-12 12h12m-12 12h12m-12 12h12m-12 12h12"
              fill="none"
              strokeWidth=".8"
            />
            <path d="M368 43v-9h84v9" fill="none" />
            <g transform="rotate(-7 250 209)">
              <rect x="142" y="180" width="241" height="54" rx="7" fill="url(#kiln-steel)" />
              <ellipse cx="145" cy="207" rx="12" ry="27" fill="#294337" />
              <ellipse cx="145" cy="207" rx="7" ry="19" fill="#1a0d07" />
              <ellipse className="ok-kiln-ember" cx="145" cy="207" rx="4.5" ry="13" fill="#ff7a1f" stroke="none" />
              <path
                className="ok-kiln-flame"
                d="M145 202c27-14 62-10 96 1-28 12-60 14-96 12Z"
                fill="url(#kiln-heat)"
                stroke="none"
              />
              <path
                className="ok-kiln-flow"
                d="M368 225H160"
                fill="none"
                stroke="#ff8a3d"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeDasharray="0.1 10"
                strokeOpacity=".6"
              />
              <rect x="191" y="176" width="12" height="62" rx="3" fill="#3e6653" />
              <rect x="299" y="176" width="12" height="62" rx="3" fill="#3e6653" />
              <path
                d="M160 186h216m-216 5h216M215 181v52m25-52v52m25-52v52m25-52v52m39-52v52m25-52v52"
                fill="none"
                stroke="#b9cab6"
                strokeOpacity=".27"
                strokeWidth=".7"
              />
              <path d="M372 180v54" strokeWidth="3" />
            </g>
            <path d="M192 235v17m22-17v17m88-31v31m22-31v31" fill="none" strokeWidth="6" />
            <rect x="181" y="248" width="47" height="6" rx="2" fill="#304f40" />
            <rect x="292" y="248" width="46" height="6" rx="2" fill="#304f40" />
            <circle cx="197" cy="237" r="7" fill="#4a7963" />
            <circle cx="306" cy="224" r="7" fill="#4a7963" />
            <path d="M117 233h22v16h-22Z" fill="#304f40" />
            <path d="M112 232h31v4h-31Z" fill="#4a7963" />
          </g>
          <g className="ok-drawing-document">
            <path d="M443 62h40v95h13" fill="none" stroke="#385b4b" strokeWidth="8" />
            <path d="M493 147h53v66l-11 19h-31l-11-19Z" fill="url(#kiln-tower)" />
            <path d="M490 145h59v8h-59Z" fill="#355647" />
            <path d="M502 158v54m9-54v54m9-54v54m9-54v54m9-54v54" fill="none" strokeWidth=".8" />
            <path d="M501 230v22m36-22v22m9-81h30v-90" fill="none" strokeWidth="5" />
            <rect x="569" y="65" width="14" height="11" fill="#355647" />
            <path d="M572 82h9v168" fill="none" strokeWidth="1" />
            <rect x="560" y="249" width="34" height="5" rx="2" fill="#304f40" />
            <rect x="466" y="224" width="22" height="28" rx="2" fill="#23392f" />
            <rect x="470" y="229" width="14" height="8" rx="1" fill="#0e1f17" />
            <path
              className="ok-kiln-signal"
              d="M471 233.5h2.5l1.5-2.5 2 4.5 2-3.5 1.5 1.5h2"
              fill="none"
              stroke="#c8df96"
              strokeWidth=".8"
            />
            <path d="M470 242h6m3 0h5m-14 4h14" strokeWidth=".8" />
          </g>
        </g>
        <g fill="none" stroke="#4f8069" strokeWidth=".8">
          <path d="M45 117v-14h83m0 0-4-3m4 3-4 3M167 155h129m0 0-4-3m4 3-4 3M499 111h78m0 0-4-3m4 3-4 3" />
          <path d="M27 281h586m-586-4v8m586-8v8" />
        </g>
        <g className="ok-kiln-haze" fill="none" stroke="#ff9a55" strokeWidth="1.2" strokeLinecap="round" opacity=".35">
          <path d="M196 166c8-5 16 5 24 0s16 5 24 0 16 5 24 0" />
          <path d="M232 152c8-5 16 5 24 0s16 5 24 0 16 5 24 0" />
          <path d="M380 22c8-5 16 5 24 0s16 5 24 0" />
        </g>
        <g className="ok-kiln-smoke" fill="none" stroke="#67a286" strokeWidth="1.5" strokeLinecap="round">
          <path d="M396 29c-4-5 4-9 0-14" />
          <path d="M424 29c-4-5 4-9 0-14" />
          <path d="M576 61c-4-5 4-9 0-14" />
        </g>
        <g className="ok-kiln-pings" fill="none" stroke="#c8df96" strokeWidth="1.2">
          <circle data-stage="receive" cx="80" cy="118" r="5" />
          <circle data-stage="treat" cx="271" cy="154" r="5" />
          <circle data-stage="document" cx="577" cy="112" r="5" />
        </g>
        <g className="ok-kiln-nodes" fill="#132b20" stroke="#c8df96" strokeWidth="1.4">
          <circle data-stage="receive" cx="80" cy="118" r="5" />
          <circle data-stage="treat" cx="271" cy="154" r="5" />
          <circle data-stage="document" cx="577" cy="112" r="5" />
        </g>
      </svg>
    </ProcessExplorer>
  );
}
