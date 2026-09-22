# Toolchain verification

Verified on **23 September 2026** against npm package metadata, official documentation and local execution. This is a dated snapshot, not a promise that package versions will remain the newest.

## Version policy

Use the newest stable releases that work together, pin direct dependency versions and retain the lockfile. Do not force unsupported peers or replace stable dependencies with prereleases. Recheck installation, lint coverage, application tests and the production build for each upgrade.

**37 of 39 direct dependencies match their current npm `latest` tag.** The two intentional exceptions are TypeScript and Node type declarations. None of the selected direct versions is marked deprecated in the registry.

| Dependency                      | Selected version | Status                             |
| ------------------------------- | ---------------- | ---------------------------------- |
| `@fontsource-variable/urbanist` | 5.3.0            | Latest stable                      |
| `@radix-ui/react-dialog`        | 1.1.23           | Latest stable                      |
| `@radix-ui/react-label`         | 2.1.15           | Latest stable                      |
| `@radix-ui/react-slot`          | 1.3.3            | Latest stable                      |
| `@radix-ui/react-tabs`          | 1.1.21           | Latest stable                      |
| `class-variance-authority`      | 0.7.1            | Latest stable                      |
| `clsx`                          | 2.1.1            | Latest stable                      |
| `lucide-react`                  | 1.47.0           | Latest stable                      |
| `next`                          | 16.3.6           | Latest stable                      |
| `react`                         | 19.3.0           | Latest stable                      |
| `react-dom`                     | 19.3.0           | Latest stable                      |
| `react-hook-form`               | 7.88.0           | Latest stable                      |
| `tailwind-merge`                | 3.7.0            | Latest stable                      |
| `@eslint-react/eslint-plugin`   | 5.20.5           | Latest stable                      |
| `@eslint/js`                    | 10.0.1           | Latest stable                      |
| `@next/eslint-plugin-next`      | 16.3.6           | Latest stable                      |
| `@playwright/test`              | 1.63.0           | Latest stable                      |
| `@tailwindcss/postcss`          | 4.3.3            | Latest stable                      |
| `@testing-library/dom`          | 10.4.2           | Latest stable                      |
| `@testing-library/jest-dom`     | 7.0.1            | Latest stable                      |
| `@testing-library/react`        | 16.3.3           | Latest stable                      |
| `@types/node`                   | 24.13.6          | Compatibility exception; see below |
| `@types/react`                  | 19.3.0           | Latest stable                      |
| `@types/react-dom`              | 19.3.0           | Latest stable                      |
| `@vitejs/plugin-react`          | 6.1.1            | Latest stable                      |
| `eslint`                        | 10.11.0          | Latest stable                      |
| `eslint-config-prettier`        | 10.1.8           | Latest stable                      |
| `eslint-plugin-import-x`        | 4.17.1           | Latest stable                      |
| `eslint-plugin-jsx-a11y-x`      | 0.2.0            | Latest stable                      |
| `eslint-plugin-react-hooks`     | 7.1.1            | Latest stable                      |
| `globals`                       | 17.12.0          | Latest stable                      |
| `jsdom`                         | 30.1.1           | Latest stable                      |
| `postcss`                       | 8.5.28           | Latest stable                      |
| `prettier`                      | 3.9.8            | Latest stable                      |
| `tailwindcss`                   | 4.3.3            | Latest stable                      |
| `typescript`                    | 6.0.3            | Compatibility exception; see below |
| `typescript-eslint`             | 8.70.1           | Latest stable                      |
| `vite`                          | 8.3.0            | Latest stable                      |
| `vitest`                        | 5.0.1            | Latest stable                      |

Yarn is pinned to **4.18.0** via `packageManager`. Transitive packages were refreshed within their declared ranges. Yarn's default 24-hour age gate initially selected five older releases; the reviewed upgrade used `YARN_NPM_MINIMAL_AGE_GATE=0` for that resolution only. The normal project configuration retains the default age gate. Immutable installs reproduce the verified lockfile; transitive packages can still legitimately use an older major required by their parent.

## Compatibility exceptions

### TypeScript 6.0.3

The newest stable TypeScript is **7.0.2**. An isolated upgrade established that `next typegen && tsc --noEmit` succeeds with it, but ESLint crashes in `ts-api-utils` while reading `Intrinsic`. The current `typescript-eslint` 8.70.1 stack declares `>=4.8.4 <6.1.0` support and depends on the TypeScript compiler API affected by the transition. The tested, supported selection is **6.0.3**.

This is a lint-toolchain limitation, not a claim that Next.js cannot use TypeScript 7. Do not suppress the peer warning or remove type-aware checks merely to satisfy a version label. Retry when the parser and its compiler-API dependencies support TypeScript 7, then run the full checks.

Sources: [typescript-eslint dependency support](https://typescript-eslint.io/users/dependency-versions/) and [Next.js TypeScript CLI checker](https://nextjs.org/docs/app/api-reference/config/next-config-js/useTypeScriptCli).

### Node.js 24.21.0 and @types/node 24.13.6

**26.10.0** is the latest Node Current release; **24.21.0** is the latest Node 24 LTS release. Vercel currently lists Node 24, 22 and 20, with 24 as its newest supported runtime. Open Kiln therefore uses Node **24.21.0**, and `@types/node` **24.13.6**, the newest types in the matching major. Installing the globally newest types (26.6.2) would advertise APIs outside the deployment runtime.

`.nvmrc` pins the verified release, `engines` requires `>=24.21.0 <25`, and the runtime guard fails clearly if development, builds, startup or combined checks use the wrong runtime. The guard permits newer 24.x patches. CI reads `.nvmrc`; select 24.x in Vercel and verify the actual build log when deploying. No global Node installation is changed by this repository.

Sources: [Node.js releases](https://nodejs.org/en/about/previous-releases), [Node release index](https://nodejs.org/dist/index.json) and [Vercel supported Node versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).

## ESLint 10 migration

ESLint **10.11.0** replaces 9.39.5. ESLint 9 reached its published end-of-life on 6 August 2026. The legacy React plugin used by `eslint-config-next` had not completed its ESLint 10 compatibility work, so the project uses the [Next.js plugin directly](https://nextjs.org/docs/app/api-reference/config/eslint#using-the-plugin-directly), a supported configuration option.

The configuration retains every Next recommended/Core Web Vitals rule and every official React Hooks recommended rule. It adds modern React recommended TypeScript checks, the maintained accessibility fork, TypeScript recommended checks and the import export rule. Experimental modern React checks are disabled; duplicate modern Hooks checks defer to Meta's official plugin. This is not a claim of exact rule-for-rule parity with the old React preset: TypeScript covers several old JSX checks, and legacy style rules such as `react/no-unescaped-entities` are not reproduced.

Fourteen regression tests feed intentionally incorrect components into the actual ESLint configuration. They verify Next client-component rules, React keys and HTML children, Hooks ordering and dependencies, alternative text, ARIA properties/values/required state, TypeScript unused variables and explicit `any`, import exports, preserved Next/Hooks severity and a valid component.

The only package extension declares the ESLint peer omitted by `@next/eslint-plugin-next@16.3.6`, which uses `eslint-utils`. It does not expand an incompatible plugin's supported range. No `--force`, broad resolutions or blanket lint suppression is used.

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

## Verification results

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

The added Playwright suite also passed **eight production-browser tests** (four scenarios at desktop/mobile sizes), including script-download failure, close/focus recovery and a successful page reload. A sandboxed launch initially failed at the macOS browser permission boundary; the permitted browser run completed successfully. Playwright color variables are normalized to avoid a conflicting-environment warning without suppressing Node warnings.

This is focused Chromium regression coverage. Safari, Firefox, native browser zoom, screen-reader testing and public deployment were not rerun in this upgrade. Remote GitHub Actions and Vercel results remain separate checks. GitHub protection/security settings and the Vercel Next.js preset were configured; no commit, push or new deployment was performed. The workflow and Dependabot definitions still need publishing. See [deployment activation status](deployment.md).
