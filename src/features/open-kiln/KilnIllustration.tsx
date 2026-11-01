import { ProcessExplorer } from "@/features/open-kiln/ProcessExplorer";

// A process schematic, not a depiction of a named facility or its operating conditions.
// Flows follow a dry-process kiln: material moves downhill towards the burner while gases rise through the preheater.
export function KilnIllustration() {
  return (
    <ProcessExplorer>
      <svg
        className="ok-process-drawing"
        viewBox="0 0 640 300"
        role="img"
        aria-label="Co-processing schematic: received waste is stored and fed as fuel through the main burner of a rotary kiln; raw meal descends through a cyclone preheater while kiln gases rise through it; clinker leaves through a cooler; the exhaust is filtered and monitored at the stack, and the results are documented"
      >
        <defs>
          <pattern id="kiln-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="#c8df96" strokeOpacity=".07" strokeWidth=".6" />
          </pattern>
          <radialGradient id="kiln-fade-gradient" cx=".5" cy=".55" r=".6">
            <stop stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="kiln-fade">
            <rect width="640" height="300" fill="url(#kiln-fade-gradient)" />
          </mask>
          <linearGradient id="kiln-floor" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#c8df96" stopOpacity=".08" />
            <stop offset="1" stopColor="#c8df96" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="kiln-shell" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#3f735a" />
            <stop offset=".22" stopColor="#93c4a5" />
            <stop offset=".5" stopColor="#3b6b55" />
            <stop offset="1" stopColor="#0f2219" />
          </linearGradient>
          <linearGradient id="kiln-hot" x1="0" x2="1">
            <stop stopColor="#ff6a1a" stopOpacity=".7" />
            <stop offset=".3" stopColor="#ff7a1f" stopOpacity=".28" />
            <stop offset=".6" stopColor="#ff7a1f" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="kiln-heat" x1="0" x2="1">
            <stop stopColor="#ff5a14" />
            <stop offset=".45" stopColor="#ffc46b" />
            <stop offset="1" stopColor="#ffe3b0" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="kiln-steel" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#3d6c57" />
            <stop offset=".5" stopColor="#24483a" />
            <stop offset="1" stopColor="#152f23" />
          </linearGradient>
          <linearGradient id="kiln-tower" x1="0" x2="1">
            <stop stopColor="#1f3d30" />
            <stop offset=".42" stopColor="#5a8d72" />
            <stop offset="1" stopColor="#1a3529" />
          </linearGradient>
          <radialGradient id="kiln-glow">
            <stop stopColor="#ff6a1a" stopOpacity=".5" />
            <stop offset="1" stopColor="#ff6a1a" stopOpacity="0" />
          </radialGradient>
          <filter id="kiln-haze" x="-50%" y="-20%" width="200%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.09 0.02" numOctaves="2" seed="3" />
            <feDisplacementMap in="SourceGraphic" scale="5" />
          </filter>
          <filter id="kiln-shadow" x="-20%" y="-200%" width="140%" height="500%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        <rect width="640" height="258" fill="url(#kiln-grid)" mask="url(#kiln-fade)" />
        <rect y="258" width="640" height="42" fill="url(#kiln-floor)" />
        <ellipse cx="330" cy="259" rx="300" ry="6" fill="#000" opacity=".5" filter="url(#kiln-shadow)" />
        <g className="ok-drawing-treat">
          <ellipse className="ok-kiln-glow" cx="262" cy="208" rx="170" ry="70" fill="url(#kiln-glow)" />
        </g>

        <g stroke="#6f9e85" strokeWidth="1" strokeLinejoin="round">
          <g className="ok-drawing-receive">
            {[8, 26].map((x) => (
              <g key={x}>
                <rect x={x} y="228" width="14" height="30" rx="2.5" fill="url(#kiln-steel)" />
                <path d={`M${x} 235h14M${x} 251h14`} fill="none" strokeOpacity=".7" />
                <rect x={x + 3} y="240" width="8" height="6" rx="1" fill="#e0b44c" stroke="none" opacity=".85" />
              </g>
            ))}
            <path d="M54 184v74m38-74v74M54 230l38-20M54 210l38 20" fill="none" strokeWidth="1.6" />
            <path d="M48 156h50v28l-16 22H64l-16-22Z" fill="url(#kiln-tower)" />
            <rect x="44" y="148" width="58" height="8" rx="2" fill="#2f5545" />
            <rect x="68" y="162" width="10" height="20" rx="2" fill="#0a1912" />
            <rect x="69.5" y="171" width="7" height="9.5" rx="1" fill="#c8df96" stroke="none" />
            <path d="M66 206h14v10H66Z" fill="#24483a" />
            <rect x="62" y="216" width="22" height="12" rx="2" fill="url(#kiln-steel)" />
            <path d="M84 222h28v-10h44" fill="none" stroke="#5f8f76" strokeWidth="4" />
            <path d="M84 222h28v-10h44" fill="none" stroke="#a9d4b8" strokeOpacity=".4" />
            <circle cx="100" cy="222" r="4.5" fill="#24483a" />
            <path
              className="ok-kiln-conveyor"
              d="M86 222h26v-10h42"
              fill="none"
              stroke="#e0b44c"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="0.1 8"
            />
          </g>

          <g className="ok-drawing-treat">
            <path d="M100 258c3-9 9-13 13-13s10 4 13 13Z" fill="#33463c" />
            <rect x="124" y="240" width="80" height="18" rx="2" fill="url(#kiln-steel)" />
            <path d="M128 246h72m-72 5h72" strokeOpacity=".5" strokeDasharray="3 2" />
            <path
              className="ok-kiln-conveyor"
              d="M134 251h-24"
              fill="none"
              stroke="#b7cbb9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="0.1 8"
            />
            <path d="M228 258 234 240h16l6 18ZM348 258l6-30h16l6 30Z" fill="#203f31" />
            <circle cx="242" cy="240" r="4" fill="#2f5545" />
            <circle cx="362" cy="228" r="4" fill="#2f5545" />
            <rect x="284" y="244" width="24" height="14" rx="2" fill="url(#kiln-steel)" />
            <path d="M298 244v-10" strokeWidth="2" />

            <g transform="rotate(-6 300 205)">
              <rect x="196" y="182" width="226" height="46" rx="6" fill="url(#kiln-shell)" />
              <rect
                className="ok-kiln-hot"
                x="196"
                y="182"
                width="226"
                height="46"
                rx="6"
                fill="url(#kiln-hot)"
                stroke="none"
              />
              <path
                d="M224 183v44m28-44v44m28-44v44m56-44v44m28-44v44m28-44v44"
                stroke="#07130d"
                strokeOpacity=".45"
                strokeWidth=".8"
              />
              <rect
                x="206"
                y="196"
                width="150"
                height="18"
                rx="9"
                fill="#06110b"
                stroke="#c8df96"
                strokeOpacity=".35"
              />
              <path d="M210 211c30 3 70 3 120 0l20 1v2H210Z" fill="#b4521d" stroke="none" opacity=".75" />
              <path
                className="ok-kiln-flame"
                d="M208 205c30-11 90-9 144 0-54 9-114 11-144 0Z"
                fill="url(#kiln-heat)"
                stroke="none"
              />
              <path className="ok-kiln-core" d="M208 205c18-5 52-5 80 0-28 5-62 5-80 0Z" fill="#fff1c4" stroke="none" />
              <g className="ok-kiln-sparks" fill="#ffb066" stroke="none">
                <circle cx="232" cy="202" r="1.1" />
                <circle cx="254" cy="208" r="1" />
                <circle cx="276" cy="201" r="1.2" />
                <circle cx="300" cy="207" r="1" />
                <circle cx="322" cy="203" r="1.1" />
              </g>
              <path
                className="ok-kiln-flow"
                d="M346 212H216"
                fill="none"
                stroke="#ff8a3d"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeDasharray="0.1 10"
                strokeOpacity=".8"
              />
              <rect x="232" y="177" width="14" height="56" rx="3" fill="url(#kiln-steel)" />
              <rect x="352" y="177" width="14" height="56" rx="3" fill="url(#kiln-steel)" />
              <path d="M235 179v52m120-52v52" stroke="#a9d4b8" strokeOpacity=".45" />
              <rect x="296" y="175" width="9" height="60" rx="2" fill="#24483a" />
              <path
                className="ok-kiln-gear"
                d="M296 177v56m9-56v56"
                stroke="#a9d4b8"
                strokeWidth="1.6"
                strokeDasharray="1.5 1.5"
              />
            </g>

            <rect x="166" y="174" width="38" height="68" rx="3" fill="url(#kiln-steel)" />
            <path d="M170 180h30M170 236h30" strokeOpacity=".6" />
            <rect
              className="ok-kiln-ember"
              x="176"
              y="196"
              width="10"
              height="16"
              rx="2"
              fill="#ff7a1f"
              stroke="none"
            />
            <rect x="156" y="205" width="10" height="14" rx="2" fill="url(#kiln-steel)" />

            <path d="M400 26v232m92-232v232" fill="none" strokeWidth="2.2" />
            <path d="M400 72l92 42m0-42-92 42m0 4 92 42m0-42-92 42" fill="none" strokeOpacity=".15" />
            <path d="M398 26v-8m24 8v-8m24 8v-8m24 8v-8m24 8v-8M396 18h100" fill="none" strokeOpacity=".7" />
            <path d="M394 26h104v4H394Zm0 42h104v4H394Zm0 46h104v4H394Zm0 46h104v4H394Z" fill="#2c5242" />
            <path
              d="M419 166v-36h35m15-6V84h-35m-15-6V40h35"
              fill="none"
              stroke="#2b4b3c"
              strokeWidth="8"
              strokeLinejoin="round"
            />
            <path
              d="M419 166v-36h35m15-6V84h-35m-15-6V40h35"
              fill="none"
              stroke="#1b3328"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <path d="M380 56h39m50 8v20m-50 24v22m50 24v18h-29" fill="none" stroke="#5f8f76" strokeWidth="3" />
            <path
              className="ok-kiln-flow"
              d="M419 164v-34h33m17-8V84h-33m-17-8V40h33"
              fill="none"
              stroke="#ff8a3d"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="0.1 10"
              strokeOpacity=".8"
            />
            <path
              className="ok-kiln-conveyor"
              d="M382 56h35m52 10v16m-50 28v18m50 28v16h-27"
              fill="none"
              stroke="#e8efd9"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="0.1 8"
            />
            <path d="M454 34h30v14l-11 16h-8l-11-16Z" fill="url(#kiln-tower)" />
            <path d="M404 78h30v14l-11 16h-8l-11-16Z" fill="url(#kiln-tower)" />
            <path d="M454 124h30v14l-11 16h-8l-11-16Z" fill="url(#kiln-tower)" />
            <path d="M465 30h8v4h-8Zm-50 44h8v4h-8Zm50 46h8v4h-8Z" fill="#24483a" />
            <rect x="404" y="166" width="36" height="58" rx="3" fill="url(#kiln-steel)" />
            <path d="M410 172h24" strokeOpacity=".6" />
            <g className="ok-kiln-notes" stroke="none" fontFamily="monospace" fontSize="7.5" letterSpacing="1">
              <text x="376" y="59" textAnchor="end">
                RAW MEAL
              </text>
              <text x="113" y="237" textAnchor="middle">
                CLINKER
              </text>
            </g>
          </g>

          <g className="ok-drawing-document">
            <path d="M469 34V12h61v100" fill="none" stroke="#2b4b3c" strokeWidth="10" strokeLinejoin="round" />
            <path d="M469 34V12h61v100" fill="none" stroke="#1b3328" strokeWidth="6" strokeLinejoin="round" />
            <path
              className="ok-kiln-flow"
              d="M469 32V12h61v98"
              fill="none"
              stroke="#ff8a3d"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeDasharray="0.1 10"
              strokeOpacity=".55"
            />
            <path d="M552 146h20v52m8 8h20" fill="none" stroke="#2b4b3c" strokeWidth="7" />
            <path
              className="ok-kiln-flow"
              d="M554 146h18v50m10 10h16"
              fill="none"
              stroke="#b7cbb9"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeDasharray="0.1 10"
              strokeOpacity=".7"
            />
            <path d="M508 182v76m42-76v76" fill="none" strokeWidth="1.6" />
            <path d="M504 112h48v70h-48Z" fill="url(#kiln-tower)" />
            <path d="M512 120v56m8-56v56m8-56v56m8-56v56m8-56v56" strokeDasharray="2 2" strokeOpacity=".6" />
            <path d="M504 182h48l-14 22h-20Z" fill="#24483a" />
            <path
              className="ok-kiln-data"
              d="M596 106v126h-6M560 240h-26"
              fill="none"
              stroke="#c8df96"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeDasharray="0.1 5"
            />
            <path d="M600 258 603 30h8l3 228Z" fill="url(#kiln-tower)" />
            <path d="M602 60h10M601 150h12" strokeOpacity=".6" />
            <path d="M590 102h30v4h-30Zm2 0v-7m26 7v-7m-26 0h26" fill="#2c5242" />
            <g className="ok-kiln-fan">
              <circle cx="572" cy="206" r="8" fill="#24483a" />
              <path d="M572 199v14m-7-7h14m-12-5 10 10m0-10-10 10" stroke="#a9d4b8" strokeOpacity=".7" />
            </g>
            <rect x="560" y="224" width="30" height="34" rx="3" fill="url(#kiln-steel)" />
            <rect x="564" y="229" width="22" height="13" rx="1.5" fill="#06110b" />
            <path
              className="ok-kiln-signal"
              d="M566 236h3l2-4 3 7 3-5 2 2h3"
              fill="none"
              stroke="#c8df96"
              strokeWidth=".9"
            />
            <path d="M565 248h8m3 0h9m-20 4h20" strokeOpacity=".6" />
            <path d="M518 230h12l4 4v20h-16Z" fill="#e8efd9" stroke="none" />
            <path d="M521 238h10m-10 4h10m-10 4h7" stroke="#2b4b3c" />
            <g className="ok-kiln-smoke" fill="none" stroke="#b7cbb9" strokeWidth="1.5" strokeLinecap="round">
              <path d="M607 24c-4-5 4-9 0-14" />
              <path d="M601 22c-4-5 4-9 0-14" />
              <path d="M613 22c-4-5 4-9 0-14" />
            </g>
          </g>
        </g>

        <g className="ok-drawing-treat">
          <g className="ok-kiln-haze" fill="none" stroke="#ffb066" strokeWidth="1" strokeLinecap="round" opacity=".28">
            <path d="M236 176c-3-5 3-9 0-14s3-9 0-14" />
            <path d="M262 172c-3-5 3-9 0-14s3-9 0-14" />
            <path d="M288 168c-3-5 3-9 0-14s3-9 0-14" />
          </g>
        </g>
        <path d="M12 258h616" stroke="#6f9e85" strokeOpacity=".6" />

        <g className="ok-kiln-labels" fontFamily="monospace" fontSize="11" letterSpacing="1.2">
          <text data-stage="receive" x="50" y="283">
            01 RECEIVE
          </text>
          <text data-stage="treat" x="250" y="283">
            02 CO-PROCESS
          </text>
          <text data-stage="document" x="510" y="283">
            03 DOCUMENT
          </text>
        </g>
        <g className="ok-kiln-pings" fill="none" stroke="#c8df96" strokeWidth="1.2">
          <circle data-stage="receive" cx="40" cy="279" r="4.5" />
          <circle data-stage="treat" cx="240" cy="279" r="4.5" />
          <circle data-stage="document" cx="500" cy="279" r="4.5" />
        </g>
        <g className="ok-kiln-nodes" fill="#132b20" stroke="#c8df96" strokeWidth="1.4">
          <circle data-stage="receive" cx="40" cy="279" r="4.5" />
          <circle data-stage="treat" cx="240" cy="279" r="4.5" />
          <circle data-stage="document" cx="500" cy="279" r="4.5" />
        </g>
      </svg>
    </ProcessExplorer>
  );
}
