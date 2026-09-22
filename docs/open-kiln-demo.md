# Open Kiln demo handoff

Implemented from the approved plan on 23 September 2026. The application is an English-language, frontend-only assessment demo for the campaign concept “Open Kiln: verify, not just trust.”

## Run locally

Requirements: Node.js 22.14 or newer and Corepack. The repository pins Yarn 4.9.2 and uses the existing `node-modules` linker. No environment variables, backend or credentials are required.

```sh
corepack yarn install
corepack yarn dev --host 127.0.0.1 --port 5173
```

For the production preview:

```sh
corepack yarn build
corepack yarn preview --host 127.0.0.1 --port 4173
```

The delivery-session preview is running at [http://127.0.0.1:4173/](http://127.0.0.1:4173/). Use another available port if needed; do not stop unrelated processes. Build output is in `dist/`, which is ignored by Git.

In the restricted implementation environment, installation used a temporary npm cache and `HUSKY=0` to avoid writing Git hooks. Dependency installation succeeded with peer-dependency warnings; the warnings did not prevent type-check, lint, tests or build.

## Review the experience

1. Open the homepage and choose **Explore a sample**. The search input receives focus and returns `OK-DEMO-001`.
2. Open **View evidence**. Review Overview, Evidence and History. Treatment milestones and publication history are separate; monitoring scope and limitations are explicit.
3. Search with these examples:

   | Search type | Value | Expected result |
   | --- | --- | --- |
   | Manifest ID | ` ok-demo-001 ` | One completed record, complete sample evidence |
   | Manifest ID | `OK-DEMO-002` | Processing, no completion date |
   | Manifest ID | `OK-DEMO-003` | Completed, partial evidence, monitoring unavailable |
   | Manifest ID | `OK-DEMO-004` | Completed, complete evidence, two publication revisions |
   | Generator name | `manufacturing a` | Two records |
   | Treatment date | `2026-09-18` | Two records; processing record excluded |
   | Manifest ID | `UNKNOWN` | Helpful empty result with a sample shortcut |
   | Any type | Blank | Required-input feedback and input focus |

4. Select a **What can you verify?** card. It opens the library at the matching category and clears stale library text. Library queries and record queries remain independent.
5. Explore **EHS & Plant Managers**: process journey, sample record, evidence modules, ESG overview, PCB/OPTOCE material, evidence request and monthly updates.
6. Select **Industrial Park Boards**. Switch Q2 to Q1. Verify participation, treatment totals, chart months and evidence denominators together:

   | Period | Participation | Treated waste | Complete evidence | Monthly tonnes |
   | --- | --- | --- | --- | --- |
   | Q1 2026 | 10 / 18 tenants | 100 tonnes | 78 / 90 records, rounded to 87% | Jan 30, Feb 32, Mar 38 |
   | Q2 2026 | 12 / 18 tenants | 120 tonnes | 86 / 100 records, 86% | Apr 36, May 38, Jun 46 |

7. Read the sample governance brief, policy pack and toolkits. Both governance journeys include their annual review/oversight steps.
8. Open visit, roundtable, evidence-request, update or follow-up forms. Submit blank or invalid email values to see errors. Choose **Fill sample details**, then submit to see **“Demo complete. No request was sent.”** Close and reopen: entered values are discarded.
9. Explore all 12 library resources. Ten are sample documents; two are external references. Search `EPA:` to locate the EPA title specifically. Library search is a substring match across title, summary and publisher.
10. Use Tab, Shift+Tab and Escape in dialogs and the mobile menu. Dialog focus stays inside until closed, then returns to the opener. The skip link and navigation anchors have focusable destinations.

## Sample-data boundaries

- The four records use fictional organisations. A completed treatment and complete evidence are separate states. Viewing a record never creates certification, compliance approval or a verification-history event.
- The park dashboard is a separate synthetic dataset. Its figures describe participating tenants only, with no tenant-level drill-down. Evidence readiness is not a legal compliance conclusion.
- Forms use local React state and React Hook Form. They do not call an API, send email, create bookings or subscriptions, or write form entries to browser storage. Values are discarded on close/reload.
- The wordmark, kiln illustration, resource covers and charts are rendered by code. The attached proposal and reference images are preserved as source material.
- Urbanist loads from the project's existing Google Fonts declaration with system-font fallbacks. The application also links to external publisher PDFs when explicitly opened. No form data is attached to those links.
- Reporting/export integration remains a proposed Year 2 capability. This delivery has no public hosting or live services.

## Sources

- [US EPA: e-Manifest PCB waste handlers fact sheet](https://www.epa.gov/system/files/documents/2024-09/e-manifest_pcb_waste_handlers_factsheet.pdf). Its displayed edition is August 2026. The linked PDF returned HTTP 200 in the delivery check.
- [GIZ / LafargeHolcim: Guidelines on Pre- and Co-processing of Waste in Cement Production](https://www.giz.de/en/downloads/giz-2020_en_guidelines-pre-coprocessing.pdf), 2020 edition. HTTP HEAD returned 200 with PDF content type. A full GET returned 200 headers but exceeded the 20-second download check; the external document is approximately 6.3 MB.

These sources provide technical context, not proof for the fictional records. The original investigation is preserved in `docs/open-kiln-landing-page-brief.md`; its dated baseline statements describe the repository before implementation.

## Code map

| Area | Location |
| --- | --- |
| Public route | `src/routes/_public/index.tsx` |
| View wrapper | `src/views/_public/OpenKilnView.tsx` |
| Page composition, anchors and dialog state | `src/modules/open-kiln/OpenKilnPage.tsx` |
| Search, pathways and library | `Records.tsx`, `Pathways.tsx`, `Library.tsx` in the same module |
| Record, resource, overview and form dialogs | `src/modules/open-kiln/Dialogs.tsx` |
| Fixtures and internal contracts | `src/modules/open-kiln/data.ts`, `types.ts` |
| Search, filtering, dates and form validation | `src/modules/open-kiln/logic.ts` |
| Original illustration and composed controls | `KilnIllustration.tsx`, `Primitives.tsx` |
| Visual styles and theme | `src/modules/open-kiln/open-kiln.css`, `src/styles/global.css` |
| Unit/integration tests | `src/modules/open-kiln/*.test.ts*`, `vitest.config.ts`, `src/test/setup.ts` |

The module composes the existing Button, Dialog, Tabs, Form, Input and Textarea components. Shared generated UI components were not edited. The route imports a view wrapper; TanStack Router regenerates its route tree through Vite. The unused private homepage route and public playground stub were replaced by the single public demo route. Debug overlays are not rendered.

The Vite configuration now lists the route generator before React and scopes tsconfig-path discovery to this repository. Yarn's mirror cache is disabled in addition to its existing local-cache configuration; `yarn.lock` is now retained for reproducible installs.

## Verification performed

| Command | Result |
| --- | --- |
| `corepack yarn type-check` | Passed |
| `corepack yarn lint` | Passed |
| `corepack yarn exec vitest run` | Passed: 15 tests across two files |
| `corepack yarn build` | Passed; production assets emitted to `dist/` |
| `git diff --check` | Passed |

The initial template also passed type-check, lint and build after dependency setup. During implementation, tests exposed incorrect test expectations for substring search/category labels; those assertions were corrected against the specified behaviour. The table above reports the final results.

Production-preview checks used Chromium through Playwright:

- Both audiences at widths 375, 768 and 1440 px, with no document horizontal overflow.
- A 720 × 500 CSS-pixel viewport to check reflow equivalent to a 1440 × 1000 desktop at 200% browser zoom. Native browser zoom and screen-reader behaviour were not separately tested.
- Search states, missing monitoring, processing records, revisions, repeated sample shortcuts, independent library filtering and category-entry resets.
- Q1/Q2 reconciliation, all supporting-resource CTAs, all 12 document dialogs and every form context.
- Mobile navigation, anchor focus, a 12-Tab focus-trap check, Escape and focus restoration. Mobile record dialog bounds were 355 × 876 px inside a 375 × 900 viewport, with independent scrolling.
- Reduced-motion emulation disabled smooth scrolling and reduced transition durations. Text contrast was checked against computed solid backgrounds; decorative SVG artwork was excluded. Visible interactive controls were checked against a 44 × 44 px minimum on mobile and desktop.
- No application console errors, failed application requests, or non-read network requests were observed in the final production smoke test. External PDF checks are described separately above.

These are focused implementation checks, not a full cross-browser or WCAG certification audit. Safari, Firefox and assistive-technology testing are not claimed.

## Visual evidence

The screenshots are in `output/playwright/`:

- `desktop.png`: 1440 px hero and navigation.
- `desktop-full.png`: complete desktop page with the EHS pathway selected.
- `mobile.png`: 375 px homepage.
- `governance.png`: Industrial Park Boards pathway and Q2 dashboard.
- `mobile-record.png`: mobile evidence dialog.
