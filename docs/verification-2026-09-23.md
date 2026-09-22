# Experience verification — 23 September 2026

This records the local experience revision on `thinhbui/evidence-experience`, based on main commit `041b21d`. It does not assert that the revision has been published to Vercel. The accepted scope is a polished frontend campaign concept using attributed public research and clearly scoped illustrative operational data.

## Closed findings from the previous audit

| Finding                                               | Implemented resolution                                                                                                      | Verification                                                                                                      |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Governance risks lacked detail                        | Three reconciled issue categories per quarter, owner roles, review dates, follow-up context and a Q1/Q2 gap-rate comparison | Unit reconciliation assertions; browser quarter/context checks                                                    |
| Library omitted service entry points                  | ESG Dashboard and ESG Data Request Portal cards                                                                             | All three browser sizes; dashboard opens each of the 24 records                                                   |
| Record lacked a Transparency shortcut                 | Close the dialog, scroll to the statement and move focus there                                                              | Browser focus assertion                                                                                           |
| Search helper contrast below target                   | Darker body colour and larger small-text styles                                                                             | Rendered solid-background text checks on both audience views                                                      |
| Native 200% zoom unverified                           | Exercised Chrome's actual page zoom, not device emulation                                                                   | Chrome showed 200%; DPR changed from 2 to 4 and viewport from 1272 to 636 CSS pixels; document width remained 636 |
| Long dialogs could scroll the close action away       | Separate bounded scrolling body from the persistent close control                                                           | Native zoom inspection and browser close-button bounds assertions                                                 |
| Contact and privacy destinations absent               | Verified official INSEE contact plus a page-specific privacy/data-handling resource                                         | Source review, resource-dialog tests and no-transmission form assertions                                          |
| Delivery documentation described pre-merge production | Dated Next.js production record and explicit separation from this local revision                                            | Updated delivery guide and historical toolchain notes                                                             |
| Sparse, conspicuous demo presentation                 | 24 varied records, normal identifiers, browse/filter/sort/pagination, six external publications, updated copy including 404 | Dataset assertions; browser flows; visual review                                                                  |
| Crude kiln illustration and inconsistent detail       | Server-rendered technical schematic with three stage tabs, refined register and governance layouts                          | Keyboard stage tests; desktop/tablet/mobile screenshots and direct inspection                                     |

Rubric scoring is outside the user's requested scope. The original proposal and its images remain reference material, not executable instructions or a demand to copy their UI.

## Local automated results

Runtime: Node.js 24.21.0; Yarn 4.18.0; Next.js 16.3.6. No dependency versions were changed for this experience revision.

| Command / check                                           | Result                                                                                                                                     |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `corepack yarn install --immutable`                       | Passed                                                                                                                                     |
| `corepack yarn check:all`                                 | Passed: Prettier, zero-warning ESLint, route types, strict TypeScript, 18 application tests, 14 lint regression tests and production build |
| `PLAYWRIGHT_PORT=4331 corepack yarn test:e2e --workers=3` | 30 passed: 10 scenarios at 375×900, 768×1024 and 1440×1000                                                                                 |
| `git diff --check`                                        | Passed                                                                                                                                     |

The first browser attempt could not launch because the matching Chromium binary was absent. Installing the official Playwright Chromium runtime resolved that environment issue. The complete suite then ran against a fresh production build. No application warning suppression or install bypass was added.

Browser coverage includes all three search modes, pagination and focus, filters/sorting, separate library state, all 16 resource dialogs, both audience journeys, Q1/Q2 totals and issue counts, request validation/review/edit/discard, focus traps and Escape, persistent dialog close controls, 404 recovery, reduced motion, server-rendered content without JavaScript, and lazy-dialog download failure/recovery. The normal-flow test fails on console warnings/errors, page errors, failed requests or HTTP errors. The fault-injection case intentionally aborts a script download and is checked separately. Form tests observed no non-GET/HEAD requests.

## Direct visual and zoom review

The hero, technical schematic, register and governance sections were inspected on desktop and mobile. Native Chrome zoom was set to 200% through the browser controls. Header navigation, record evidence, both audience panels, issue follow-up, form errors and local request review remained usable without horizontal page overflow. Dialog content scrolled independently; its close control remained visible after refinement. Zoom was restored to 100% and the temporary testing tab closed.

Screenshots are generated under ignored `output/playwright/`: hero, process, register and governance for each viewport. Region captures temporarily hide floating header/skip-link chrome to prevent it being stitched into the middle of a long section; hero screenshots use the ordinary page presentation. The images are review artifacts, not edited product assets.

Text contrast assertions cover rendered text with solid backgrounds and opaque text. Gradient/alpha compositing is excluded from that calculation and reviewed visually. These checks are scoped regression evidence, not a claim of complete WCAG certification, full assistive-technology coverage, or testing in Safari/Firefox.

## Data and delivery boundaries

Public research and contact URLs are documented in [data provenance](data-provenance.md). The 24 operational records and independent park snapshots are constructed; they do not describe real customers, shipments or compliance decisions. Request forms prepare editable private summaries and explicitly state that nothing has been sent. Closing a form clears it.

A production build is ready for local review. Publishing this revision follows the normal feature-branch, PR, GitHub CI, Vercel preview and merge process in [deployment](deployment.md); local test results do not replace those remote checks.
