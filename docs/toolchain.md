# Toolchain verification

Verified on **23 September 2026** against npm package metadata, official documentation and local execution; dependency versions updated on **1 November 2026** (see [security update](#security-update--1-november-2026) and [runtime update](#runtime-update--1-november-2026)). This is a dated snapshot, not a promise that package versions will remain the newest.

## Version policy

Use the newest stable releases that work together, pin direct dependency versions and retain the lockfile. Do not force unsupported peers or replace stable dependencies with prereleases. Recheck installation, lint coverage, application tests and the production build for each upgrade.

**The original 39-dependency baseline had 37 packages matching its npm `latest` tags.** The two intentional exceptions are TypeScript and Node type declarations. None of the selected direct versions is marked deprecated in the registry.

| Dependency                      | Selected version | Status                             |
| ------------------------------- | ---------------- | ---------------------------------- |
| `@fontsource-variable/urbanist` | 5.3.0            | Latest stable                      |
| `@radix-ui/react-dialog`        | 1.3.1            | Latest stable                      |
| `@radix-ui/react-label`         | 2.1.17           | Latest stable                      |
| `@radix-ui/react-slot`          | 1.5.0            | Latest stable                      |
| `@radix-ui/react-tabs`          | 1.2.1            | Latest stable                      |
| `class-variance-authority`      | 0.7.1            | Latest stable                      |
| `clsx`                          | 2.1.1            | Latest stable                      |
| `lucide-react`                  | 1.66.0           | Latest stable                      |
| `next`                          | 16.4.3           | Latest stable                      |
| `react`                         | 19.3.1           | Latest stable                      |
| `react-dom`                     | 19.3.1           | Latest stable                      |
| `react-hook-form`               | 7.91.0           | Latest stable                      |
| `tailwind-merge`                | 3.7.0            | Latest stable                      |
| `@eslint-react/eslint-plugin`   | 5.28.8           | Latest stable                      |
| `@eslint/js`                    | 10.0.1           | Latest stable                      |
| `@next/eslint-plugin-next`      | 16.4.3           | Latest stable                      |
| `@playwright/test`              | 1.64.1           | Latest stable                      |
| `@tailwindcss/postcss`          | 4.3.3            | Latest stable                      |
| `@testing-library/dom`          | 10.4.2           | Latest stable                      |
| `@testing-library/jest-dom`     | 7.0.1            | Latest stable                      |
| `@testing-library/react`        | 16.3.3           | Latest stable                      |
| `@types/node`                   | 26.6.6           | Latest stable; matches Node 26     |
| `@types/react`                  | 19.3.0           | Latest stable                      |
| `@types/react-dom`              | 19.3.0           | Latest stable                      |
| `@vitejs/plugin-react`          | 6.1.2            | Latest stable                      |
| `eslint`                        | 10.14.0          | Latest stable                      |
| `eslint-config-prettier`        | 10.1.8           | Latest stable                      |
| `eslint-plugin-import-x`        | 4.17.1           | Latest stable                      |
| `eslint-plugin-jsx-a11y-x`      | 0.2.0            | Latest stable                      |
| `eslint-plugin-react-hooks`     | 7.1.1            | Latest stable                      |
| `globals`                       | 17.13.0          | Latest stable                      |
| `jsdom`                         | 30.1.3           | Latest stable                      |
| `postcss`                       | 8.5.32           | Latest stable                      |
| `prettier`                      | 3.9.10           | Latest stable                      |
| `tailwindcss`                   | 4.3.3            | Latest stable                      |
| `typescript`                    | 6.0.3            | Compatibility exception; see below |
| `typescript-eslint`             | 8.72.1           | Latest stable                      |
| `vite`                          | 8.3.5            | Latest stable                      |
| `vitest`                        | 5.0.5            | Latest stable                      |

Yarn is pinned to **4.18.1** via `packageManager` (4.18.0 at the original baseline). Transitive packages were refreshed within their declared ranges. Yarn's default 24-hour age gate initially selected five older releases; the reviewed upgrade used `YARN_NPM_MINIMAL_AGE_GATE=0` for that resolution only. The normal project configuration retains the default age gate. Immutable installs reproduce the verified lockfile; transitive packages can still legitimately use an older major required by their parent.

## Hobby monitoring SDKs

Added `@vercel/analytics` **2.0.1** and `@vercel/speed-insights` **2.0.0**, the stable npm `latest` releases checked on 23 September 2026. Both declare Next.js `>=13` and React `^18 || ^19 || ^19.0.0-rc`, covering this project's Next.js 16 and React 19. Versions are exact and the lockfile pins both SDKs. There are now 41 direct dependencies. No existing dependency was upgraded for monitoring.

## Security update — 1 November 2026

Every open Dependabot PR failed **Open Kiln quality**: its high/critical audit covers the whole dependency tree, while each PR updated only part of it. This update applies the open runtime, tooling, `next`, `vite`, `undici` and GitHub Actions updates together, taking each direct dependency to the newest stable release within its current major.

- `next` 16.4.3 resolves two critical remote-code-execution advisories, plus high-severity Image Optimization SSRF and Server Actions denial-of-service advisories, that affected 16.3.6. It requires `sharp` ^0.35.5, which resolves the librsvg advisory.
- `source-map-js` 1.2.2, `undici` 8.12.3 and `zod` 4.6.7 are transitive refreshes within the ranges their parents already declare (`yarn up -R`). No `resolutions` entry was added.
- The default 24-hour age gate stayed in force. `lucide-react` 1.66.0 was newer than that, so 1.65.0 is selected.
- TypeScript 7 and `@types/node` 26 remain excluded. The `@next/eslint-plugin-next` package extension moves to 16.4.3, which still omits its ESLint peer.
- `actions/setup-node` v7.1.0 and `actions/upload-artifact` v7.0.2 are pinned to the full commit SHAs of those release tags.
- Node runtimes are unchanged. Node 24.22.2 (27 October 2026) is newer than `.nvmrc` and needs its own Vercel compatibility review.

Local results on Node 24.21.0: `corepack yarn npm audit --all --recursive --severity high` reported no advisories; immutable install and peer inspection were clean; `corepack yarn verify` passed formatting, zero-warning ESLint, route types, TypeScript, 25 application tests, 14 lint regression tests, the production build and 30 Playwright tests at three viewport sizes. Remote CI and the Vercel preview remain separate checks.

## Runtime update — 1 November 2026

Node 26 became the active LTS line in October 2026 and is Vercel's default runtime; Node 24 moved to maintenance (supported until April 2028). The project now targets **Node 26.13.0**, the newest 26.x release.

- `.nvmrc`, `engines` (`>=26.13.0 <27`), the runtime guard and the CI browser job all use 26.13.0. The first Node 26 Vercel preview passed the guard at that floor, so Vercel currently supplies 26.13.0.
- Node 25 and newer no longer bundle Corepack. `vercel.json` runs `npx --yes corepack@0.36.0 yarn …` and both CI jobs install `corepack@0.36.0` with npm before using it. Corepack 0.36.0 declares support for `^22.22.2 || ^24.15.0 || >=26.0.0`. Dependabot does not update this pin; change it in `vercel.json`, the workflow and the README together.
- Yarn moves to **4.18.1**. `lucide-react` **1.66.0** is now past the 24-hour age gate. `@types/node` **26.6.6** matches the runtime and brings `undici-types` 8.9.0; Dependabot still ignores major type updates beyond the runtime.
- All 235 installed packages that declare `engines.node` accept 26.13.0. Peer inspection reports no unmet requirements.
- `corepack yarn npm audit --all --recursive` reports one moderate advisory: `minimatch` 10.2.6, used only by the lint plugin `eslint-plugin-import-x` 4.17.1, its newest release. No high or critical advisories.
- TypeScript 7 remains excluded: `typescript-eslint` 8.72.1, its newest stable release, still declares `typescript >=4.8.4 <6.1.0`.
- GitHub Actions were already on their newest releases (`actions/checkout` v7.0.1, `actions/setup-node` v7.1.0, `actions/upload-artifact` v7.0.2). Node 27 exists only as an alpha.

Results on Node 26.13.0: immutable install, `corepack yarn verify` with formatting, zero-warning ESLint, route types, TypeScript, 25 application tests, 14 lint regression tests, the production build and 34 Playwright tests at three viewport sizes (2 duplicate width sweeps skipped by design). The runtime guard rejects Node 24.22.2 with a setup message. The Vercel preview built with Next.js 16.4.3 on Node 26.x and Yarn 4.18.1.

Sources: [Node.js releases](https://nodejs.org/en/about/previous-releases), [Node release index](https://nodejs.org/dist/index.json), [Vercel supported Node versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions) and [Corepack](https://github.com/nodejs/corepack).

## Compatibility exceptions

### TypeScript 6.0.3

The newest stable TypeScript is **7.0.2**. An isolated upgrade established that `next typegen && tsc --noEmit` succeeds with it, but ESLint crashes in `ts-api-utils` while reading `Intrinsic`. The current `typescript-eslint` 8.72.1 stack still declares `>=4.8.4 <6.1.0` support and depends on the TypeScript compiler API affected by the transition. The tested, supported selection is **6.0.3**.

This is a lint-toolchain limitation, not a claim that Next.js cannot use TypeScript 7. Do not suppress the peer warning or remove type-aware checks merely to satisfy a version label. Retry when the parser and its compiler-API dependencies support TypeScript 7, then run the full checks.

Sources: [typescript-eslint dependency support](https://typescript-eslint.io/users/dependency-versions/) and [Next.js TypeScript CLI checker](https://nextjs.org/docs/app/api-reference/config/next-config-js/useTypeScriptCli).

## ESLint 10 migration

ESLint **10.11.0** replaces 9.39.5. ESLint 9 reached its published end-of-life on 6 August 2026. The legacy React plugin used by `eslint-config-next` had not completed its ESLint 10 compatibility work, so the project uses the [Next.js plugin directly](https://nextjs.org/docs/app/api-reference/config/eslint#using-the-plugin-directly), a supported configuration option.

The configuration retains every Next recommended/Core Web Vitals rule and every official React Hooks recommended rule. It adds modern React recommended TypeScript checks, the maintained accessibility fork, TypeScript recommended checks and the import export rule. Experimental modern React checks are disabled; duplicate modern Hooks checks defer to Meta's official plugin. This is not a claim of exact rule-for-rule parity with the old React preset: TypeScript covers several old JSX checks, and legacy style rules such as `react/no-unescaped-entities` are not reproduced.

Fourteen regression tests feed intentionally incorrect components into the actual ESLint configuration. They verify Next client-component rules, React keys and HTML children, Hooks ordering and dependencies, alternative text, ARIA properties/values/required state, TypeScript unused variables and explicit `any`, import exports, preserved Next/Hooks severity and a valid component.

The only package extension declares the ESLint peer omitted by `@next/eslint-plugin-next@16.4.3`, which uses `eslint-utils`. It does not expand an incompatible plugin's supported range. No `--force`, broad resolutions or blanket lint suppression is used.

Sources: [ESLint support schedule](https://eslint.org/version-support/), [ESLint React](https://github.com/Rel1cx/eslint-react) and [accessibility plugin](https://github.com/es-tooling/eslint-plugin-jsx-a11y-x).

## Code adjustments

- React context reads/providers use React 19 APIs supported by the current runtime.
- The mobile menu registers its Escape listener only while open and restores focus to its toggle. The toggle identifies its controlled navigation region.
- Timeline items use their date and title as stable keys.
- Dialog return-focus refs retain their behavior under the updated lint checks.
- Form controls reference only mounted descriptions and error messages.
- An always-loaded dialog shell contains lazy content failures and offers close/reload recovery.
- Next.js automatic agent-rule generation is disabled because the repository maintains its own contributor guide.
- The supplied campaign HTML and images remain source material and are excluded from code formatting/linting.

## Upgrade verification results (historical)

The following checks ran against `/Users/thinhbui/Public/open-kiln` on Node 24.21.0 after applying the upgrade:

| Check                                              | Result                                                                                                                                  |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `corepack yarn install --immutable`                | Passed, no peer dependency warnings                                                                                                     |
| Peer requirement inspection                        | No unsatisfied peer requirements                                                                                                        |
| `corepack yarn check:all`                          | Passed: formatting, zero-warning ESLint, Next route types, TypeScript, 16 application tests, 14 lint regression tests, production build |
| Production build                                   | Next.js 16.3.6 / Turbopack; homepage prerendered                                                                                        |
| `corepack yarn npm audit --all --recursive --json` | Exit 0, no reported advisories at verification time                                                                                     |
| Runtime guard                                      | Node 24.21.0 accepted; the machine's Node 26.9.0 rejected with a setup message                                                          |
| Source preservation                                | All 21 supplied source files/reference documents match their pre-upgrade SHA-256 hashes                                                 |
| `git diff --check`                                 | Passed                                                                                                                                  |

Production browser verification used Chromium at `http://127.0.0.1:4318/`:

- Sample search, record History, independent library search, and Q2-to-Q1 governance values passed.
- Required-field validation, sample form completion, field discard on reopen and focus restoration passed.
- Mobile menu Escape closes navigation and returns focus to its toggle.
- Record dialogs trap focus during 12 successive Tab presses and restore opener focus on Escape. The mobile dialog fits within 375 × 900 px (355 × 876 px).
- Both audience panels have no horizontal overflow at 375, 768 and 1440 px.
- Reduced-motion emulation produces `scroll-behavior: auto`.
- No console/page errors, failed requests or non-GET/HEAD requests were observed during the instrumented mobile/form/layout run.
- With JavaScript disabled, the hero and transparency section are present in server-rendered content. Interactive controls require JavaScript.

A complete `corepack yarn verify` run also passed on the official Node **24.19.0** binary after reproducing Vercel's managed runtime. Both Node 24.19.0 and 24.21.0 pass the runtime guard; Node 26 remains rejected.

The added Playwright suite also passed **eight production-browser tests** (four scenarios at desktop/mobile sizes), including script-download failure, close/focus recovery and a successful page reload. A sandboxed launch initially failed at the macOS browser permission boundary; the permitted browser run completed successfully. Playwright color variables are normalized to avoid a conflicting-environment warning without suppressing Node warnings.

The upgrade verification above covered Chromium, not Safari, Firefox or a screen reader. Its initial eight browser scenarios predate the expanded experience and native zoom checks; see the [current experience verification](verification-2026-09-23.md).

At the upgrade checkpoint, the migration was published in PR #4 and production still served the initial deployment. That checkpoint is historical: the Next.js migration has since merged and deployed. See the dated [deployment activation record](deployment.md) for the verified production commit and the distinction between production and subsequent local work.
