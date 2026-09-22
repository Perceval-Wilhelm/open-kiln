# GitHub and Vercel delivery

Configuration reviewed on **23 September 2026**. Open Kiln is a frontend demonstration with fictional data and local-only forms. It needs no application API keys, databases, email services or paid infrastructure add-ons.

## Project identity

- GitHub: [Perceval-Wilhelm/open-kiln](https://github.com/Perceval-Wilhelm/open-kiln).
- Vercel: [open-kiln](https://vercel.com/perceval-wilhelms-projects/open-kiln), in the personal `perceval-wilhelms-projects` workspace.
- Production: [open-kiln.vercel.app](https://open-kiln.vercel.app).
- Production branch: `main`. Other unassigned branches create preview deployments.

## Activation status

The Next.js migration in [PR #4](https://github.com/Perceval-Wilhelm/open-kiln/pull/4) was merged on 23 September 2026. The verified production baseline is commit `041b21d7393d9748cb41131ea41d1d332eeb858e`, with [production deployment `dpl_EU5PUDj6qHiGCZWqJhbC2jtA3edB`](https://vercel.com/perceval-wilhelms-projects/open-kiln/EU5PUDj6qHiGCZWqJhbC2jtA3edB) Ready and serving the public domain.

Both **Open Kiln quality** and **Open Kiln browser** passed on [the main-branch run](https://github.com/Perceval-Wilhelm/open-kiln/actions/runs/35780133655). Both deployment checks are configured as **Blocking** for Production. The migration has completed; these are no longer pending activation steps.

This is a dated deployment record, not a claim that subsequent local changes are deployed. Experience refinements must pass the routine PR/preview/production flow below. Do not redeploy an old Vite source commit using the Next.js settings.

## GitHub protections

The active [main ruleset](https://github.com/Perceval-Wilhelm/open-kiln/rules/23842210) applies to the default branch without a bypass actor:

- Pull requests are required, with all review conversations resolved.
- Both **Open Kiln quality** and **Open Kiln browser** must succeed, from the GitHub Actions integration, against an up-to-date branch.
- Force pushes and branch deletion are blocked; history must remain linear.
- Only squash merging is enabled. Merged branches are deleted automatically.
- Required approval count is zero for a solo-owner project. This still requires a PR and passing checks; it does not require an impossible self-approval. Add a reviewer requirement when another maintainer joins.
- Squash commits use the PR title with a blank default body. Review the final message and identity before merging.

GitHub Actions has a read-only default token, cannot create approving PR reviews, and requires actions to be pinned to full commit SHAs. The workflow also declares `contents: read` and disables persisted checkout credentials. It uses no Vercel token: Vercel's existing Git integration builds the previews and production site.

Dependency vulnerability alerts, automated security fixes, secret scanning and push protection are enabled. Weekly version-update PRs are active through `.github/dependabot.yml` on the default branch. There is no auto-merge. TypeScript and `@types/node` major updates need deliberate compatibility review; see [toolchain decisions](toolchain.md).

## CI behavior

`.github/workflows/check.yml` runs on PRs targeting `main`, pushes to `main`, and manual dispatch once published. New runs cancel older runs for the same branch or PR.

| Check             | Verification                                                                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Open Kiln quality | Immutable install, high/critical dependency audit, formatting, zero-warning lint, route types, TypeScript, application tests, lint regression tests and production build |
| Open Kiln browser | A fresh production build and Chromium checks at desktop/tablet/mobile sizes; includes simulated dialog-download failure and recovery                                     |

Each job has a 15-minute limit. Browser failure reports, screenshots and traces are retained for seven days. Tests use fictional input only. Browser artifacts remain ignored locally.

## Vercel settings

| Setting                           | Configuration                                                        |
| --------------------------------- | -------------------------------------------------------------------- |
| Framework                         | Next.js                                                              |
| Root directory                    | Repository root                                                      |
| Node.js                           | 24.x; CI/local `.nvmrc` pins the verified patch                      |
| Install command                   | `corepack yarn install --immutable`, from `vercel.json`              |
| Build command                     | `corepack yarn build`, from `vercel.json`                            |
| Output directory                  | Framework default; `outputDirectory: null`; no `dist` override       |
| Dashboard command overrides       | Disabled                                                             |
| Production branch / domain        | `main` / `open-kiln.vercel.app`                                      |
| Preview branch tracking           | Enabled for unassigned branches                                      |
| Deployment protection             | Vercel Authentication, Standard Protection; production domain public |
| Source maps                       | Protected                                                            |
| Application environment variables | None required                                                        |
| Deployment checks                 | Open Kiln quality + Open Kiln browser; Production Blocking           |

The existing basic build machine and disabled on-demand concurrent builds are sufficient for this demo. No paid upgrade was enabled. The repository's `.vercelignore` excludes original proposal attachments and generated/test output from CLI uploads; it does not replace reviewing the Git diff before publishing.

Avoid duplicating source-controlled build settings in the dashboard. When changing runtime versions, update `.nvmrc`, `engines`, the runtime guard and compatible Node type declarations together; verify that Vercel supports the target major first.

Vercel's first migration preview exposed two platform differences: Node 24.x currently resolves to **24.19.0**, and bare `yarn build` selected Yarn 1. The supported runtime floor is therefore 24.19.0, while `.nvmrc` retains the newer local release 24.21.0. Both install and build explicitly invoke Corepack. The quality CI job uses `.nvmrc`; the browser job uses the observed Vercel patch.

## Routine release

1. Create or continue a feature branch. Preserve the configured personal Git identity; do not rewrite earlier authorship.
2. Run `corepack yarn install --immutable`. After a Playwright update, run `corepack yarn exec playwright install chromium`.
3. Run `corepack yarn verify`. Choose a free `PLAYWRIGHT_PORT` if the default test port is occupied.
4. Review the complete diff, including deletions, new files and the lockfile. Keep original assessment attachments and local generated artifacts out of the release.
5. Commit and push the feature branch, then open a PR. Check the two named GitHub jobs and the Vercel preview build.
6. Review the preview while signed into the owning Vercel account: search, evidence, both audience journeys, forms, mobile layout and keyboard focus. Confirm the build identifies Next.js and Node 24.x.
7. Confirm that both deployment checks remain configured as Production Blocking. Confirm the production deployment passes those checks before its alias is promoted.
8. Merge only after release approval. Vercel builds `main` and assigns the production domain after its deployment checks pass. Confirm the deployment is Ready and that the public domain serves the expected commit.
9. Check build/runtime logs and repeat the normal-flow smoke test on production. Do not send real personal data through the demo forms.

## Recovery

For a broken production release, inspect the deployment and build logs first. Use Vercel's **Instant Rollback** to a previously verified production deployment when an immediate recovery is needed; confirm the domain serves that deployment. Rollback changes the deployed alias, not Git history. Follow it with a corrective PR so the next `main` deployment does not reintroduce the fault.

The initial Vite deployment may remain an emergency rollback target during migration. Rolling back to its existing artifact does not rebuild it. Rebuilding an old source commit requires its matching framework/build configuration, so do not simply click Redeploy on that commit under the Next.js preset.

Do not bypass required checks, force-push `main`, weaken preview authentication or promote an unreviewed preview to work around a failed build.

## Official references

- [Vercel Git integration](https://vercel.com/docs/git)
- [Vercel deployment checks](https://vercel.com/docs/deployment-checks)
- [Vercel supported Node versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions)
- [Vercel Instant Rollback](https://vercel.com/docs/instant-rollback)
- [GitHub rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets)
- [Playwright CI](https://playwright.dev/docs/ci-intro)
