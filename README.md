# Open Kiln

**Verify, not just trust.** An interactive CSR campaign assessment demo for INSEE Ecocycle, built with Next.js and React.

Explore fictional treatment records, inspect evidence and its limitations, and follow verification journeys for EHS teams and industrial park boards. The interface is in English and uses clearly labelled sample data throughout.

## What you can explore

- Search four sample records by manifest ID, generator name or treatment date.
- Read treatment details, monitoring coverage and publication history in accessible dialogs.
- Compare completed, processing and partial-evidence records.
- Switch between EHS and industrial park governance pathways, including Q1/Q2 aggregate dashboards.
- Search and filter 12 library resources: 10 sample documents and two attributed external references.
- Try guided-visit, roundtable, evidence-request, update and follow-up forms. The success state explicitly says **“Demo complete. No request was sent.”**

This is a demonstration: no real customer data, regulatory certification, live monitoring, authentication, booking, email delivery or reporting integration is provided. Form entries stay in page memory and are discarded when the form closes.

## Run locally

Requirements: **Node.js 24.21.0 or newer within the 24.x LTS line**, and [Corepack](https://github.com/nodejs/corepack). The exact Yarn version is pinned in `package.json`. Dependencies use the `node-modules` linker.

```sh
git clone https://github.com/Perceval-Wilhelm/open-kiln.git
cd open-kiln
nvm install
nvm use
corepack yarn install --immutable
corepack yarn dev
```

`.nvmrc` pins the verified Node release. If you use Homebrew instead of nvm, select its Node 24 installation in the current shell before running Yarn:

```sh
export PATH="$(brew --prefix node@24)/bin:$PATH"
node --version
```

This requires an existing `node@24` installation. `dev`, `build`, `start` and the combined checks fail early with a clear message when the selected runtime is unsupported. Node 26 is the newer Current line, but this project uses the latest Node 24 LTS release supported by Vercel. See the compatibility notes below.

Open [localhost:3000](http://localhost:3000). To use another port, run `corepack yarn dev --port 3001`.

For a production preview:

```sh
corepack yarn build
corepack yarn start
```

No environment variables or API keys are needed. Urbanist is served from the deployment through `next/font/local`; neither builds nor visitors need to request it from Google Fonts.

## Stack

| Area        | Choice                                                                                                         |
| ----------- | -------------------------------------------------------------------------------------------------------------- |
| Application | Next.js App Router, React, TypeScript                                                                          |
| Rendering   | Prerendered homepage with client components for interactions                                                   |
| Styling     | Tailwind CSS 4, project CSS and a local Urbanist variable font                                                 |
| UI controls | shadcn components composed from Radix primitives; Lucide icons                                                 |
| Forms       | React Hook Form with local validation                                                                          |
| Quality     | ESLint 10 with Next.js, React, Hooks and accessibility rules; Prettier; Vitest, Testing Library and Playwright |
| Deployment  | Vercel with the Next.js preset                                                                                 |

See [dependency versions and compatibility decisions](docs/toolchain.md). Vite remains a development dependency solely because Vitest uses it to transform tests; Next.js handles application development, routing and production builds.

## Repository map

```text
src/
  app/                     # Layout, metadata, homepage and 404
  components/ui/           # UI primitives used by the demo
  features/open-kiln/      # Campaign sections, client interactions, fixtures and tests
  lib/                     # Shared class-name utility
  styles/                  # Theme tokens and base styles
  test/                    # Vitest browser-environment setup
public/open-kiln.svg        # Project favicon
scripts/                   # Runtime guard and lint regression tests
e2e/                       # Production browser regression tests
.github/                   # Quality workflows and dependency updates
docs/                      # Dependency verification and browser review guide
```

Change record/resource content in `src/features/open-kiln/data.ts`, campaign copy in `OpenKilnPage.tsx`, and visual styles in `open-kiln.css`. `OpenKilnPage.tsx` composes static campaign content on the server. `Experience.tsx` owns client interaction state; `EvidenceOverlay.tsx` owns the accessible dialog shell, lazy content and loading/error recovery; `ExperienceSections.tsx` connects search, pathways and the library. Server-rendered content passes through the client provider as children. Keep static sections out of the client import graph when extending the page.

## Quality checks

```sh
corepack yarn format:check  # Check formatting without edits
corepack yarn lint          # Lint with zero warnings allowed
corepack yarn type-check    # Generate route types, then check TypeScript
corepack yarn test          # Run unit and interaction tests once
corepack yarn test:tooling  # Check lint coverage with intentional regressions
corepack yarn test:watch    # Watch tests during development
corepack yarn check:all     # Formatting, lint, types, unit/tooling tests and build
corepack yarn exec playwright install chromium  # Browser setup, once per Playwright update
corepack yarn test:e2e      # Browser tests against the existing production build
corepack yarn verify        # check:all followed by browser tests
```

`corepack yarn format` intentionally formats source and documentation. The `check` scripts never auto-fix files. GitHub Actions runs separate **Open Kiln quality** and **Open Kiln browser** checks for pull requests targeting `main` and pushes to `main`. The quality job also blocks high/critical dependency advisories. Browser tests start their own production server on port 4320; use `PLAYWRIGHT_PORT=4321 corepack yarn test:e2e` if that port is occupied. They do not reuse an existing server. Failure traces and screenshots are kept locally in ignored output folders and uploaded by CI for seven days.

See the [review guide](docs/open-kiln-demo.md) for manual checks and the [delivery guide](docs/deployment.md) for branch protection, dependency updates and deployment gates.

## Deploy on Vercel

The personal GitHub repository is connected to the Vercel project **open-kiln**. Its production domain is [open-kiln.vercel.app](https://open-kiln.vercel.app). Project settings use **Next.js**, repository root, Node.js **24.x**, and no legacy output or command overrides.

`vercel.json` declares the framework, immutable Corepack install and build command. It resets the output directory to the framework default. No application secrets or environment variables are needed. Preview deployments retain Vercel Authentication; the production domain is public.

Work on a feature branch, open a pull request, pass both required checks and review the Vercel preview before merging to `main`. A merge triggers a production deployment. Never redeploy the old Vite commit under the new Next.js preset. See [deployment setup, activation status and rollback](docs/deployment.md) before the first migration release.

## Documentation and references

- [GitHub and Vercel delivery guide](docs/deployment.md)
- [Dependency versions and compatibility](docs/toolchain.md)
- [Sample data and browser review guide](docs/open-kiln-demo.md)
- [Original landing-page investigation](docs/open-kiln-landing-page-brief.md) — historical requirements context; the README and toolchain guide describe the current implementation.

External EPA and GIZ documents provide technical background; they do not verify any fictional treatment record. The kiln illustration and wordmark are rendered in code. Urbanist is distributed under the SIL Open Font License included with `@fontsource-variable/urbanist`.
