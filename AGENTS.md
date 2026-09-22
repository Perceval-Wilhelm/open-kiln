# Open Kiln contributor guide

Open Kiln is an English-language CSR campaign assessment demo for INSEE Ecocycle. All treatment records and park metrics are fictional. Forms only simulate completion.

## Architecture

- Next.js App Router; `src/app/page.tsx` composes the landing page.
- `src/app/layout.tsx` owns metadata, viewport, global CSS and the locally served Urbanist font.
- `src/features/open-kiln/OpenKilnPage.tsx` is a Server Component. Campaign copy and the SVG illustration stay in server composition.
- `Experience.tsx` owns client interaction state. Server-rendered content is passed as children, rather than imported into the client provider.
- `EvidenceOverlay.tsx` owns the always-available Radix dialog shell, focus restoration and loading/error boundaries. It lazily loads content from `Dialogs.tsx`; a rejected import requires a page reload. Preserve the close action in both fallback states.
- `ExperienceSections.tsx` connects record search, audience pathways and the library to that state.
- `data.ts`, `types.ts` and `logic.ts` hold fixtures, contracts and pure functions.
- `src/components/ui/` contains the shadcn/Radix primitives actually used. Prefer composition; update them when compatibility or accessibility requires it.
- Use `@/*` for imports from `src/`. Keep unrelated template infrastructure out of the project.

## Development

Use Node.js 24 LTS (24.21.0 or newer within 24.x) and the Yarn version pinned in `package.json` through Corepack.

```sh
corepack yarn install --immutable
corepack yarn dev
corepack yarn check:all
```

`check:all` checks formatting, ESLint, Next.js route types, TypeScript, Vitest, lint regression tests and production build. It does not rewrite source. Run `yarn format` intentionally after edits. Use `yarn start` to review a production build. Install Chromium with `corepack yarn exec playwright install chromium`, then run `corepack yarn verify` for the full local suite, including production browser tests. `test:e2e` alone requires an existing build. The test server defaults to port 4320 and fails if the port is occupied; override `PLAYWRIGHT_PORT` instead of killing unrelated processes.

`next.config.ts` sets `agentRules: false` so development does not append generated instructions to this maintained file.

For UI changes, verify both audience journeys in a real browser, desktop/mobile layouts, dialog keyboard/focus behavior and the absence of hydration or network errors. For rendering changes, also check the page with JavaScript disabled.

## Product boundaries

- Keep treatment status separate from evidence availability. A completed record may have partial evidence.
- Processing records have no completion date. Preserve publication revisions and monitoring limitations.
- Governance figures are an independent aggregate dataset with explicit denominators. Do not imply regulatory certification or tenant-level access.
- Forms must not send requests or persist personal data. Closing a form discards its contents.
- Preserve sample labels and publisher attribution for external references.
- No backend, authentication, analytics, real booking or email delivery without a new product requirement.

## Dependencies and delivery

- Pin direct dependency versions and commit `yarn.lock` with intentional dependency changes.
- Prefer the newest stable version compatible with the complete toolchain. Check peer requirements and the Node engine; see `docs/toolchain.md` for current exceptions.
- ESLint uses the Next.js plugin directly with maintained React, official Hooks, accessibility and import plugins. Preserve coverage with `test:tooling` when changing this configuration.
- Do not bypass incompatibilities with forced installs or broad resolutions.
- Keep Vercel configured as Next.js with its default output directory. The legacy Vite `dist` override must not be used.
- See `docs/deployment.md` before changing GitHub or Vercel settings. Keep action references pinned to full commit SHAs and preserve the required check names. Workflow changes must retain read-only default permissions and must not add credentials for the Git-based deployment flow.
- Dependabot proposes updates; it does not auto-merge. TypeScript and Node types require compatibility review for major changes.
- Use Conventional Commits. Never change Git identity or add co-author/tool attribution. Commit and push only when authorized.
