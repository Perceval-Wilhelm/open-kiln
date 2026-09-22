# Open Kiln experience and review guide

Updated 23 September 2026. The English-language campaign experience combines attributed public research with an illustrative operational register. See [data provenance](data-provenance.md) for exact boundaries and [delivery](deployment.md) for deployment status.

## Run locally

Use Node.js 24.21.0 (supported 24.x minimum 24.19.0), Corepack and the pinned Yarn version. No secrets, API or backend are needed.

```sh
corepack yarn install --immutable
corepack yarn dev --hostname 127.0.0.1 --port 3000
```

Production preview:

```sh
corepack yarn build
corepack yarn start --hostname 127.0.0.1 --port 3000
```

Use an unoccupied port; preserve unrelated servers. See the README for NVM/Homebrew runtime setup. Next.js output is `.next/`.

## Review checklist

1. Inspect the hero and use Receive / Co-process / Document with mouse and arrow keys. The featured record opens directly; Explore the register focuses the search field and resets it to all records.
2. Browse all 24 records across four pages. Change treatment/evidence filters and sort. Processing + complete evidence should give an honest empty result; Browse all records restores the list.
3. Exercise exact ID lookup, generator substring lookup, date lookup, blank validation and unknown IDs:

   | Input                        | Expected                                                 |
   | ---------------------------- | -------------------------------------------------------- |
   | `ok-2026-0142`               | One completed record with complete illustrative evidence |
   | `OK-2026-0143`               | Processing; no completion date                           |
   | `OK-2026-0144`               | Completed, partial evidence, monitoring unavailable      |
   | `OK-2026-0145`               | Two publication revisions                                |
   | Generator `MEKONG precision` | Four records                                             |
   | Treatment date `2026-09-18`  | Two records                                              |
   | Partial ID `OK-2026`         | No match; IDs require an exact match                     |
   | Blank                        | Validation and input focus                               |

4. Read Overview, Evidence and History. Compare receipt and treatment dates; check methodology, monitoring scope and limitations. Open related guidance and the Transparency shortcut. That shortcut closes the dialog and focuses the statement.
5. Select all four evidence categories. The matching Library filter opens with stale text cleared, without changing the register search.
6. Read the public research strip. Its historical SINTEF figures are separate from the constructed records. Open original publisher links and confirm their scope.
7. Follow EHS handover → process → Evidence Hub → customer verification. Check all five support actions.
8. Switch to Boards. Q1/Q2 must update participation, quantities, monthly bars, evidence rates and issue counts together:

   | Quarter | Tenants | Tonnes | Evidence complete | Issue counts   | Months     |
   | ------- | ------- | ------ | ----------------- | -------------- | ---------- |
   | Q1      | 10/18   | 100    | 78/90 (86.7%)     | 6 + 4 + 2 = 12 | 30, 32, 38 |
   | Q2      | 12/18   | 120    | 86/100 (86%)      | 7 + 3 + 4 = 14 | 36, 38, 46 |

9. Confirm the 0.7 percentage-point rise in the evidence-gap rate and the visible denominators. Each issue opens a follow-up request with the right quarter, title and count. Verify the data and executive journeys, including annual review.
10. Open the Library dashboard and data-request service cards. The dashboard lists all 24 records and opens their details. Search/filter the 16 resources by category, publisher type or text; Show more resources reveals the remaining documents. `EPA:` identifies the EPA reference, and `SINTEF` returns two publications.
11. Try visit, both roundtables, evidence, updates and follow-up forms. Check blank/invalid-email validation, Use example details, and Review request/subscription. The summary includes the entered details and context, supports Edit draft, and states **No request has been sent**. Closing/reopening clears inputs. External official-contact links contain no form data.
12. Test Tab/Shift+Tab, focus trap, Escape, returning focus, mobile menu, skip link and anchor offsets. Check form accessible descriptions with and without validation errors.
13. Verify 375, 768 and 1440px layouts, native browser zoom 200%, reduced motion and no horizontal overflow. Inspect dialogs independently of the page. Check initial content with JavaScript disabled.
14. Fault-inject the lazy dialog download: the page must remain usable, the error dialog must close, and Reload page after connection recovery must restore the content.

## Code map

| Area                                      | Files in `src/features/open-kiln/`                                |
| ----------------------------------------- | ----------------------------------------------------------------- |
| Server-rendered page and research         | `OpenKilnPage.tsx`, `PublishedEvidence.tsx`                       |
| Server drawing / client stage interaction | `KilnIllustration.tsx`, `ProcessExplorer.tsx`                     |
| Shared state, dialog navigation and focus | `Experience.tsx`, `EvidenceOverlay.tsx`, `ExperienceSections.tsx` |
| Register, audience previews and library   | `Records.tsx`, `Pathways.tsx`, `Library.tsx`                      |
| Dialog content and private request review | `Dialogs.tsx`                                                     |
| Data and provenance                       | `treatment-records.ts`, `data.ts`, `references.ts`                |
| Contracts / pure logic                    | `types.ts`, `logic.ts`                                            |
| Visual system                             | `open-kiln.css`, `experience.css`, `Primitives.tsx`               |

## Verification commands

`corepack yarn check:all` runs formatting, zero-warning lint, route types, TypeScript, application tests, lint regression tests and the production build. `corepack yarn test:e2e` starts an isolated production server after a build and exercises desktop, tablet and mobile Chromium. Use `PLAYWRIGHT_PORT` if the default 4320 is occupied. `corepack yarn verify` runs both suites.

Tests use fictional input and assert no form write requests. The download-failure scenario intentionally fails a script request; normal-flow console warnings/errors are failures. See the [dated verification record](verification-2026-09-23.md) for executed checks and their scope. Artifacts belong in ignored `output/playwright/`, `test-results/` and `playwright-report/` directories.

The original investigation brief is retained as historical requirements context. The realistic register, source material and presentation changes supersede its four-record fixture and repeated demo-label choices. Integrated exports, authenticated customer data and real message delivery remain outside this frontend scope.
