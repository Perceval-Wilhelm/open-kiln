# Open Kiln demo handoff

Implemented from the approved plan on 23 September 2026. The application is an English-language, frontend-only assessment demo for the campaign concept “Open Kiln: verify, not just trust.”

## Run locally

Use Node.js 24.21.0 (or a newer 24.x release), Corepack and the pinned Yarn 4.18.0. Dependencies use the `node-modules` linker. No environment variables, backend or credentials are required.

```sh
nvm install
nvm use
corepack yarn install --immutable
corepack yarn dev --hostname 127.0.0.1 --port 3000
```

For a production preview:

```sh
corepack yarn build
corepack yarn start --hostname 127.0.0.1 --port 3000
```

Open [localhost:3000](http://localhost:3000). Use another free port when needed; do not stop unrelated processes. Next.js emits production output to `.next/`. See the [README](../README.md) for the Homebrew runtime alternative and Vercel setup.

## Review the experience

1. Open the homepage and choose **Explore a sample**. The search input receives focus and returns `OK-DEMO-001`.
2. Open **View evidence**. Review Overview, Evidence and History. Treatment milestones and publication history are separate; monitoring scope and limitations are explicit.
3. Search with these examples:

   | Search type    | Value             | Expected result                                         |
   | -------------- | ----------------- | ------------------------------------------------------- |
   | Manifest ID    | `ok-demo-001`     | One completed record, complete sample evidence          |
   | Manifest ID    | `OK-DEMO-002`     | Processing, no completion date                          |
   | Manifest ID    | `OK-DEMO-003`     | Completed, partial evidence, monitoring unavailable     |
   | Manifest ID    | `OK-DEMO-004`     | Completed, complete evidence, two publication revisions |
   | Generator name | `manufacturing a` | Two records                                             |
   | Treatment date | `2026-09-18`      | Two records; processing record excluded                 |
   | Manifest ID    | `UNKNOWN`         | Helpful empty result with a sample shortcut             |
   | Any type       | Blank             | Required-input feedback and input focus                 |

4. Select a **What can you verify?** card. It opens the library at the matching category and clears stale library text. Library queries and record queries remain independent.
5. Explore **EHS & Plant Managers**: process journey, sample record, evidence modules, ESG overview, PCB/OPTOCE material, evidence request and monthly updates.
6. Select **Industrial Park Boards**. Switch Q2 to Q1. Verify participation, treatment totals, chart months and evidence denominators together:

   | Period  | Participation   | Treated waste | Complete evidence               | Monthly tonnes         |
   | ------- | --------------- | ------------- | ------------------------------- | ---------------------- |
   | Q1 2026 | 10 / 18 tenants | 100 tonnes    | 78 / 90 records, rounded to 87% | Jan 30, Feb 32, Mar 38 |
   | Q2 2026 | 12 / 18 tenants | 120 tonnes    | 86 / 100 records, 86%           | Apr 36, May 38, Jun 46 |

7. Read the sample governance brief, policy pack and toolkits. Both governance journeys include their annual review/oversight steps.
8. Open visit, roundtable, evidence-request, update or follow-up forms. Submit blank or invalid email values to see errors. Choose **Fill sample details**, then submit to see **“Demo complete. No request was sent.”** Close and reopen: entered values are discarded.
9. Explore all 12 library resources. Ten are sample documents; two are external references. Search `EPA:` to locate the EPA title specifically. Library search is a substring match across title, summary and publisher.
10. Use Tab, Shift+Tab and Escape in dialogs and the mobile menu. Dialog focus stays inside until closed, then returns to the opener. The skip link and navigation anchors have focusable destinations.

11. With browser developer tools, block the on-demand dialog script before opening the first dialog. The error panel offers **Close preview** and **Reload page**. Closing restores focus and leaves the page usable; restoring the connection and reloading makes the preview work again. The automated browser suite performs this fault injection on desktop and mobile.
12. In request forms, check accessible descriptions before and after invalid submission. Inputs must reference existing error text only, with no dangling description IDs.

## Sample-data boundaries

- The four records use fictional organisations. A completed treatment and complete evidence are separate states. Viewing a record never creates certification, compliance approval or a verification-history event.
- The park dashboard is a separate synthetic dataset. Its figures describe participating tenants only, with no tenant-level drill-down. Evidence readiness is not a legal compliance conclusion.
- Forms use local React state and React Hook Form. They do not call an API, send email, create bookings or subscriptions, or write form entries to browser storage. Values are discarded on close/reload.
- The wordmark, kiln illustration, resource covers and charts are rendered by code. The attached proposal and reference images are preserved as source material.
- Urbanist is served locally through `next/font/local`, with system-font fallbacks. The application also links to external publisher PDFs when explicitly opened. No form data is attached to those links.
- Reporting/export integration remains a proposed Year 2 capability. This upgrade does not deploy the repository or introduce live services.

## Sources

- [US EPA: e-Manifest PCB waste handlers fact sheet](https://www.epa.gov/system/files/documents/2024-09/e-manifest_pcb_waste_handlers_factsheet.pdf).
- [GIZ / LafargeHolcim: Guidelines on Pre- and Co-processing of Waste in Cement Production](https://www.giz.de/en/downloads/giz-2020_en_guidelines-pre-coprocessing.pdf).

These external sources provide technical context, not proof for fictional records. Their contents and availability are controlled by the publishers. The [original investigation](open-kiln-landing-page-brief.md) is historical requirements context; its original stack and baseline statements do not describe the current Next.js implementation.

## Code map

| Area                                        | Location                                                                     |
| ------------------------------------------- | ---------------------------------------------------------------------------- |
| Homepage, layout, metadata and 404          | `src/app/`                                                                   |
| Server-rendered campaign sections           | `src/features/open-kiln/OpenKilnPage.tsx`                                    |
| Client state, focus and lazy dialogs        | `Experience.tsx`, `ExperienceSections.tsx`, `EvidenceOverlay.tsx`            |
| Search, pathways and library                | `Records.tsx`, `Pathways.tsx`, `Library.tsx`                                 |
| Record, resource, overview and form dialogs | `Dialogs.tsx`                                                                |
| Fixtures, contracts and pure functions      | `data.ts`, `types.ts`, `logic.ts`                                            |
| Illustration and composed controls          | `KilnIllustration.tsx`, `Primitives.tsx`                                     |
| Visual styles and theme                     | `open-kiln.css`, `src/styles/global.css`                                     |
| Application tests                           | `src/features/open-kiln/*.test.ts*`, `vitest.config.ts`, `src/test/setup.ts` |
| Runtime and lint verification               | `scripts/check-runtime.mjs`, `scripts/lint.test.mjs`                         |

Feature paths without a directory prefix above are relative to `src/features/open-kiln/`. Shared controls live in `src/components/ui/`. React 19 context access uses `use` and provider shorthand. Next.js owns application routing and production bundling; Vite is used only by the test runner.

## Verification

Run `corepack yarn check:all` for formatting, lint, route types, TypeScript, 16 application tests, 14 lint regression tests and the production build. Tests cover search and evidence boundaries, independent library filters, governance aggregates, local form validation and mobile Escape/focus behavior.

Install Chromium with `corepack yarn exec playwright install chromium`, then run `corepack yarn test:e2e` after building, or `corepack yarn verify` to include the build and all earlier checks. Playwright runs four scenarios at 1440 px and 375 px (eight tests): both journeys, local form/accessibility behavior, keyboard/responsive behavior and failed-dialog-download recovery. It starts an isolated production server and never submits form data. The fault-injection case deliberately creates a failed script request; normal-flow console warnings and errors fail the journey check.

Use the review steps above against the production server after changing UI code. Inspect widths 375, 768 and 1440 px, browser errors, keyboard navigation, dialog focus/scrolling and reduced motion. For rendering changes, also check with JavaScript disabled. Automated tests alone do not establish screen-reader usability, browser compatibility or WCAG conformance.

See [the dated toolchain verification report](toolchain.md) for the current compatibility decisions and checks actually performed. CI and public deployment results must be verified separately.
