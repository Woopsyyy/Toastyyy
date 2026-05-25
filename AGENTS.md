# Repository Guidelines

## Project Structure & Module Organization
Toastyyy is a Vite + React + TypeScript project with both a demo app and a publishable library. Source lives in `src/`: pages in `src/pages`, shared UI in `src/components/ui`, layout chrome in `src/components/layout`, toast state in `src/hooks`, and theme helpers in `src/lib`. Tests live in `src/tests/*.test.tsx`. Static assets are in `public/`. Build and workflow helpers are under `scripts/`. Library output is generated into `dist-lib/`; do not edit generated files by hand.

## Build, Test, and Development Commands
- `npm run dev`: switches to the `dev` branch via `scripts/branch-switch.js`, then starts Vite.
- `npm run build`: runs `tsc` and builds the demo app into `dist/`.
- `npm run build:lib`: builds the package bundle defined by `vite.config.lib.ts` into `dist-lib/`.
- `npm run lint`: runs ESLint on `ts` and `tsx` files with zero warnings allowed.
- `npm run test`: runs the Vitest suite.
- `npm run test:dev`: runs Prettier check, ESLint, `tsc --noEmit`, and tests as the local pre-push gate.

## Coding Style & Naming Conventions
Use TypeScript with 2-space indentation and semicolons omitted only where the existing file already does so. Keep React components in PascalCase files such as `Toast.tsx` and `HomePage.tsx`. Hooks must use the `useX` pattern, for example `useToasts.tsx`. Prefer Tailwind utility classes plus shared CSS variables in `src/index.css`. Export public library components from `src/index.ts` whenever they are meant to ship.

## Testing Guidelines
Vitest is the test runner. Place tests in `src/tests` and use the `*.test.tsx` naming pattern. Add focused tests for hook helpers, queue behavior, and exported API changes. Run `npm run test` during development and `npm run test:dev` before opening a PR.

## Commit & Pull Request Guidelines
Recent history uses short, imperative subjects like `fix some issues`, `new changes`, and occasional scoped prefixes such as `fix:`. Prefer clearer one-line summaries in that style, for example `fix: update toast queue behavior`. Open PRs against `dev`, not `prod`. Include a concise summary, linked issue if applicable, and screenshots or GIFs for visible UI or motion changes. Confirm `npm run test:dev` passes before requesting review.

## Workflow Notes
Do not push directly to `prod`. Use the repo’s guarded flow in `GIT_WORKFLOW.md`, and use `npm run push:dev` if you want the scripted staging, commit prompt, and safe push behavior.
