# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
React TypeScript web application template using Vite 6, TanStack Router/Query, and shadcn/ui components. The architecture follows a modular, domain-driven design with service adapter pattern for flexible API integration.

## Essential Commands

```bash
# Development
yarn dev                    # Start dev server on port 5173
yarn storybook              # Component development environment on port 6006

# Building & Testing
yarn build                  # Production build
yarn build:development      # Development build
yarn build:production       # Production build with optimizations
yarn preview                # Preview production build

# Code Quality (run these before committing)
yarn type-check             # TypeScript type checking (uses: yarn exec tsc --noEmit)
yarn lint                   # ESLint checking
yarn lint-format            # Auto-fix linting and format code
yarn test                   # Run Vitest tests
yarn test --watch           # Run tests in watch mode
yarn ci                     # Run format, lint, and type-check sequentially

# Code Generation
yarn gen-icons              # Generate React components from SVG files in src/assets/icons
yarn gen-api                # Generate TypeScript types from OpenAPI specs
npx shadcn@latest add <component>  # Add shadcn/ui component
```

## High-Level Architecture

### Service Adapter Pattern
The codebase uses a service adapter pattern (`src/system/utils/createServiceAdapter.ts`) that enables switching between mock and real API implementations based on feature flags. This is critical for:
- Development without backend dependencies
- Testing with predictable data
- Gradual API integration

**Implementation Flow:**
1. Define interface in `services/interfaces/IServiceName.ts`
2. Create mock implementation in `services/implementations/mock/`
3. Create real implementation in `services/implementations/real/`
4. Use `createServiceAdapter()` to create a proxy that switches based on `FEATURE_FLAGS`

### Module Architecture
Modules in `src/modules/` are self-contained feature domains with:
- `services/` - API integrations specific to the module
- `types/` - TypeScript definitions
- `hooks/` - Custom React hooks
- `contexts/` - React Context providers for module state
- `components/` - Module-specific components

Modules should avoid cross-dependencies to maintain isolation.

### Routing System
TanStack Router with file-based routing:
- Routes defined in `src/routes/`
- Layout routes prefixed with `_` (e.g., `_private.tsx`)
- Route components import view components from `src/views/`
- Router context defined in `__root.tsx`
- Auto code-splitting enabled via Vite plugin

### State Management Layers
1. **Module State**: React Context in module `contexts/`
2. **Global State**: Jotai atoms for cross-module state
3. **Server State**: TanStack Query for API data with caching

### Component Organization
- `src/shared/components/ui/` - shadcn/ui components (auto-generated, don't modify)
- `src/shared/components/atoms/` - Custom atomic components wrapping ui components
- `src/shared/layouts/` - Reusable layout containers with slot-based composition
- `src/views/` - Page-level components mapped to routes

### Path Aliases
TypeScript path aliases configured in `tsconfig.json`:
- `~/*` - Maps to `src/modules/*` first, then `src/*`
- `~shared/*` - Shared resources
- `~config/*` - Configuration files
- `~views/*` - View components
- `~lib/*` - Utility libraries

### Environment & Feature Flags
- Environment config: `src/configs/env.config.ts` (type-safe env variables)
- Feature flags: `src/configs/feature-flags.config.ts` (controls mock/real service usage)
- CSS variables: `src/configs/tailwind-variables.config.ts`

### Build Pipeline
1. Vite processes TypeScript with SWC for fast compilation
2. TanStack Router plugin generates route tree
3. Tailwind CSS 4 processes utility classes
4. Custom `vite-tw-merge.plugin.ts` handles class merging

## Development Workflow

### Adding New Features
1. Create module in `src/modules/feature-name/` if complex
2. Define service interface and implementations
3. Add route in `src/routes/`
4. Create view component in `src/views/`
5. Use `yarn storybook` for isolated component development

### API Integration
1. Check/update OpenAPI spec in `scripts/gen-api/configs/`
2. Run `yarn gen-api` to generate types
3. Implement service with adapter pattern
4. Set feature flag in `src/configs/feature-flags.config.ts`

### Testing Strategy
- Unit tests for services and utilities with Vitest
- Component tests in Storybook stories
- Integration tests for API endpoints
- Always run `yarn type-check` and `yarn lint` before committing

## Critical Patterns

### Service Implementation Template
```typescript
// 1. Interface
export interface IMyService {
  getData(): Promise<Data>;
}

// 2. Implementations
const mockImplementation: IMyService = { /* ... */ };
const realImplementation: IMyService = { /* ... */ };

// 3. Adapter
export const myService = createServiceAdapter({
  mock: async () => mockImplementation,
  real: async () => realImplementation
}, {
  featureFlagKey: 'USE_MOCK_MY_SERVICE',
  cacheInstance: true
});
```

### Context Provider Pattern
Use `src/system/utils/createContext.tsx` for type-safe context creation with built-in error handling for missing providers.

### Component Composition
Prefer composition with slots over prop drilling:
- Layouts accept `header`, `sidebar`, `content` props
- Use `children` for main content
- Pass components, not just data

## Project Constraints

- **Yarn 4 with PnP**: Project uses Yarn 4 with Plug'n'Play. Use `corepack enable` for setup.
- **Node.js 22.14.0+**: Required for compatibility
- **TypeScript Strict Mode**: All code must pass strict type checking
- **Conventional Commits**: Enforced via commitlint
- **Pre-commit Hooks**: Husky runs linting and formatting

## Common Issues & Solutions

- **Build fails with import errors**: Check path aliases and ensure imports use correct prefixes
- **Type checking slow**: Use `yarn exec tsc --noEmit` directly instead of `npx tsc`
- **Mock/Real service confusion**: Check `FEATURE_FLAGS` settings and global `USE_MOCK_APIS` flag
- **Component not updating**: Verify TanStack Query cache settings in `src/configs/tanstack-query.config.ts`