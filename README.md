# Web App Template

A production-ready React TypeScript template with modern tooling and best practices for building scalable web applications. This template provides a solid foundation with pre-configured development environment, testing setup, and architectural patterns.

## Tech Stack

### Core
- ⚡️ **[Vite 6](https://vitejs.dev/)** - Lightning-fast build tool with HMR
- ⚛️ **[React 19](https://reactjs.org/)** - Latest React with concurrent features
- 💎 **[TypeScript 5.7](https://www.typescriptlang.org/)** - Type-safe JavaScript at scale

### Routing & Data
- 🚏 **[Tanstack Router](https://tanstack.com/router/latest)** - Type-safe, file-based routing
- 🔍 **[Tanstack Query](https://tanstack.com/query/latest)** - Powerful async state management
- 🐻 **[Jotai](https://jotai.org/)** - Atomic state management

### UI & Styling
- 🎨 **[shadcn/ui](https://ui.shadcn.com/)** - High-quality React components
- 🍃 **[TailwindCSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- 🎯 **[Phosphor Icons](https://phosphoricons.com/)** - Comprehensive icon set

### Development Experience
- 🔨 **[ESLint](https://eslint.org/)** - Code quality enforcement
- 🌀 **[Prettier](https://prettier.io)** - Consistent code formatting
- 🐺 **[Husky](https://github.com/typicode/husky)** - Git hooks automation
- 📑 **[Commitlint](https://commitlint.js.org/)** - Conventional commit enforcement
- 🎭 **[Storybook](https://storybook.js.org/)** - Component development environment
- 🧪 **[Vitest](https://vitest.dev/)** - Unit testing framework

## Prerequisites

- **[Node.js](https://nodejs.org/en/)** version 22.14.0+ (or latest LTS)
- **[Yarn](https://yarnpkg.com/)** package manager (project uses Yarn 4 with PnP)
- Basic knowledge of React and TypeScript

## Project Architecture

This template follows a **modular, domain-driven architecture** with clear separation of concerns:

### Key Architectural Patterns

1. **Module-Based Organization**: Features are organized in self-contained modules with their own services, types, and hooks
2. **Service Adapter Pattern**: Abstraction layer for switching between mock and real API implementations
3. **Context-Based State**: Module-level state management using React Context
4. **Type-Safe Routing**: File-based routing with full TypeScript support
5. **Component Composition**: Atomic design principles with reusable UI components

### Folder Structure

```
scripts/                    # Scripts for generating files
├── gen-api/                # API generation from OpenAPI specs
│   ├── configs/            # Configuration files for API generation
│   ├── modules/            # Code generation modules
│   ├── main.ts             # Main API generation script
│   └── utils/              # Utility functions for generation
└── gen-icons.js            # Icon generation script
src/                        # Source files
├── assets/                 # Static files
│   ├── fonts/
│   ├── icons/              # SVG icons for generation
│   └── images/
├── configs/                # Configuration files
│   ├── client/             # API client configurations
│   ├── env.config.ts       # Environment configuration
│   ├── feature-flags.config.ts # Feature flags
│   ├── tailwind-variables.config.ts # Tailwind CSS variables
│   └── tanstack-query.config.ts # React Query configuration
├── hooks/                  # Global custom hooks
├── lib/                    # Utility libraries
│   └── utils.ts            # shadcn/ui utilities
├── modules/                # Feature-based modules (domain-driven)
│   ├── chat/               # Chat functionality
│   │   ├── ChatContext.tsx
│   │   ├── hooks/
│   │   ├── services/       # Chat service adapters and implementations
│   │   └── types/
│   ├── server/             # Server status module
│   │   ├── services/       # API services (getServerStatus, postMessageRequest)
│   │   ├── types/          # Type definitions (ServerStatusResponse)
│   │   └── serverStatus.tsx # Context provider for server status
│   ├── services/           # Service management module
│   │   ├── contexts/
│   │   ├── hooks/
│   │   └── types/
│   └── sessions/           # Session management module
│       ├── contexts/
│       ├── services/
│       └── types/
├── routes/                 # Tanstack Router route definitions
│   ├── __root.tsx          # Root route with context
│   ├── _private.tsx        # Private layout wrapper
│   ├── _private/           # Private route definitions
│   │   └── index.tsx       # Default private route (HomePage)
│   ├── _public.tsx         # Public layout wrapper
│   └── _public/            # Public route definitions
│       └── playground.tsx  # Playground page
├── services/               # Global services
├── shared/                 # Shared resources across modules
│   ├── components/         # Reusable UI components
│   │   ├── atoms/          # Basic UI components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── FileViewer/     # File viewing component
│   │   ├── ProjectStructure/ # Project structure display
│   │   ├── ServicePanel/   # Service management panel
│   │   └── ServicePreview/ # Service preview component
│   ├── hooks/              # Shared custom hooks
│   ├── layouts/            # Layout components
│   │   ├── ChatLayout.tsx
│   │   ├── FourPanelLayout/
│   │   ├── MainLayout.tsx
│   │   ├── NPanelLayout/
│   │   ├── SidebarLayout.tsx
│   │   └── ThreePanelLayout/
│   └── utils/              # Shared utilities
├── stories/                # Storybook stories
├── styles/                 # Global styles
├── system/                 # System-level utilities
│   └── utils/              # Utility functions and hooks
│       ├── WithContext.tsx # HOC for context consumption
│       ├── createContext.tsx # Context creation utility
│       ├── createServiceAdapter.ts # Service adapter pattern
│       ├── get-css-variable.util.ts # CSS variable getter
│       └── useEffectOnce.ts # Effect hook that runs once
├── tests/                  # Test files
├── views/                  # View components (pages)
│   └── _private/           # Private view components
│       ├── ChatSessionSidebar.tsx
│       ├── ChatSessionSidebarContent.tsx
│       ├── ChatUI.tsx      # Chat user interface component
│       ├── HomePage.tsx    # Main home page component
│       ├── ServerStatus.tsx # Server status display component
│       ├── ServiceContextSidebar.tsx
│       └── ServiceContextSidebarContent.tsx
├── main.tsx
└── routeTree.gen.ts        # Generated file from tanstack router
```

## Directory Structure Standards

### `/routes`
- **Purpose**: Define application routes using Tanstack Router
- **Standards**:
  - Use file-based routing with `createFileRoute`
  - Prefix layout routes with underscore (e.g., `_private.tsx`, `_public.tsx`)
  - Keep route components minimal - import actual view components from `/views`
  - Define route context in `__root.tsx`

### `/views`
- **Purpose**: View components that represent full page layouts and UI
- **Standards**:
  - Organize by route structure (e.g., `_private/`, `_public/`)
  - Each view should be a self-contained component
  - Import shared components and utilities as needed
  - Use descriptive names that match their route purpose
  - Views handle UI logic, while business logic stays in modules

### `/modules`
- **Purpose**: Feature-based modules following domain-driven design
- **Standards**:
  - Each module is self-contained with its own services, types, hooks, etc.
  - Avoid cross-module imports to maintain modularity
  - Structure: `services/`, `types/`, `hooks/`, `stores/`, `constants/`
  - Use context providers for module-level state management

### `/shared`
- **Purpose**: Shared utilities, components, and configurations used across modules
- **Standards**:
  - Only place truly shared code here
  - `/components/atoms`: Basic reusable UI components
  - `/components/ui`: shadcn/ui components (auto-generated)
  - `/layouts`: Layout components for different page structures
  - `/hooks`: Shared custom hooks
  - `/utils`: Shared utility functions
  - Keep implementations generic and reusable

### `/system/utils`
- **Purpose**: System-level utility functions and custom hooks
- **Standards**:
  - Place framework-agnostic utilities here
  - Custom hooks should be prefixed with `use` (e.g., `useEffectOnce`)
  - Keep utilities small and focused on a single responsibility
  - Document complex utility functions

## Code Standards

### TypeScript
- Use strict TypeScript with explicit types
- Export types alongside implementations
- Prefer interfaces for object shapes, types for unions/aliases

### React Components
- Use functional components with TypeScript
- Define prop types using interfaces
- Keep components focused and composable
- Use descriptive component and prop names

### Imports
- Use absolute imports with `~` prefix (e.g., `~/pages/...`)
- Group imports: React first, external libraries, then internal modules
- Maintain consistent import ordering

### State Management
- Use React Context for module-level state
- Jotai for global application state
- Keep state close to where it's used

### API Integration
- Use the shared `platformClient` for all API calls
- Follow the service adapter pattern with interfaces and implementations
- Define service functions in module `services/` directories
- Separate mock and real implementations for development/testing
- Type all API responses in module `types/` directories
- Use service adapters to switch between implementations

## UI Components

This project uses a combination of custom components and shadcn/ui components:

### shadcn/ui Components
- Pre-built accessible components using Radix UI primitives
- Located in `src/shared/components/ui/`
- Add new components using: `npx shadcn@latest add <component-name>`
- Configuration in `components.json`

### Custom Components
- Basic UI atoms in `src/shared/components/atoms/`
- Complex feature components in respective modules
- Follow consistent naming and prop patterns

## Icons

### Custom Icons
1. Put svg file to `src/assets/icons` directory. Note that the length and width should be set to 1em.

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor"
     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M18 6l-12 12"/>
    <path d="M6 6l12 12"/>
</svg>
```

2. Run command:

```bash
yarn gen-icons
```

### Phosphor Icons
- Use `@phosphor-icons/react` for most icon needs
- Consistent icon family across the application
- Import specific icons: `import { IconName } from "@phosphor-icons/react"`

## Getting Started Guide for New Engineers

### 1. Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd web-app-template

# Enable Corepack for Yarn 4
corepack enable

# Install dependencies
yarn install

# Start development server
yarn dev
```

### 2. Understanding the Codebase

#### Start with Examples
1. **Explore Routes**: Check `/src/routes` to understand the application structure
2. **View Components**: Look at `/src/views/_private/HomePage.tsx` for page examples
3. **Shared Components**: Browse `/src/shared/components/ui` for available UI components
4. **Run Storybook**: Use `yarn storybook` to see all components in isolation

#### Key Files to Review
- `CLAUDE.md` - AI assistant configuration and project guidelines
- `/src/configs/env.config.ts` - Environment configuration
- `/src/system/utils/createServiceAdapter.ts` - Service adapter pattern implementation
- `/src/routes/__root.tsx` - Application root with context providers

### 3. Development Workflow

#### Creating a New Feature

1. **Plan Your Feature**
   - Create a PRD in `/docs/features/` if needed
   - Identify required components, services, and data models

2. **Create a Module** (for complex features)
   ```
   src/modules/your-feature/
   ├── services/           # API integrations
   ├── types/              # TypeScript definitions
   ├── hooks/              # Custom React hooks
   ├── contexts/           # State management
   └── components/         # Module-specific components
   ```

3. **Add Routes**
   - Create route file in `/src/routes/`
   - Import view component from `/src/views/`

4. **Implement Services**
   - Define interface in `services/interfaces/`
   - Create mock implementation for development
   - Add real API implementation when ready

5. **Test Your Code**
   - Write unit tests with Vitest
   - Create Storybook stories for components
   - Run type checking: `yarn type-check`
   - Run linting: `yarn lint`

### 4. Best Practices

#### Code Quality
- ✅ Always use TypeScript with strict mode
- ✅ Follow the existing file naming conventions
- ✅ Keep components small and focused
- ✅ Use absolute imports with `~` prefix
- ✅ Write tests for critical functionality

#### State Management
- Use React Context for module-level state
- Use Jotai atoms for global application state
- Keep state close to where it's used
- Avoid prop drilling - use composition

#### API Integration
- Always use the service adapter pattern
- Type all API responses
- Handle loading and error states
- Implement optimistic updates where appropriate

#### Component Development
- Start with Storybook for isolated development
- Use shadcn/ui components as base
- Follow atomic design principles
- Ensure accessibility standards

### 5. Common Tasks

#### Adding a New Page
```bash
# 1. Create route file
touch src/routes/_private/new-page.tsx

# 2. Create view component
touch src/views/_private/NewPage.tsx

# 3. Link them together in the route file
```

#### Adding a shadcn/ui Component
```bash
npx shadcn@latest add <component-name>
```

#### Generating API Types
```bash
yarn gen-api
```

#### Running Tests
```bash
# Run all tests
yarn test

# Run with coverage
yarn test --coverage
```

### 6. Troubleshooting

#### Build Issues
- Ensure all imports are correct
- Check for missing dependencies
- Run `yarn type-check` to find type errors
- Clear cache: `yarn clean && yarn install`

#### Development Server Issues
- Check port 5173 is available
- Verify Node.js version meets requirements
- Check environment variables in `.env`

### 7. Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tanstack Router Docs](https://tanstack.com/router/latest)
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## Development

### Install dependencies

```bash
yarn install
```

### Available Scripts

```bash
# Development
yarn dev                    # Start development server
yarn build                  # Build for production
yarn build:development      # Build for development environment
yarn build:production       # Build for production environment
yarn preview                # Preview production build

# Code Quality
yarn format                 # Format code with Prettier
yarn lint                   # Run ESLint
yarn lint-format            # Run ESLint with auto-fix and Prettier
yarn type-check             # Run TypeScript type checking
yarn ci                     # Run format, lint, and type-check

# Testing
yarn test                   # Run Vitest tests

# Code Generation
yarn gen-icons              # Generate icon components from SVG files
yarn gen-api                # Generate API types and hooks from OpenAPI specs

# Documentation
yarn storybook              # Start Storybook development server
yarn storybook:build        # Build Storybook for production

# Utilities
yarn clean                  # Clean cache and node_modules
```

### Start Development

```bash
yarn dev
```

### Documentation

Checkout storybook server to see all components and communication with teams.

```bash
yarn storybook
```
