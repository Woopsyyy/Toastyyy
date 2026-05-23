# Changelog - Toastyyy Ecosystem

All notable changes and structural upgrades to the **Toastyyy** React notification ecosystem are documented here.

---

## [1.2.0] — 2026-05-24

### 🚀 CI/CD & Pipeline Upgrades
- **Specialized Workflows:** Created a three-stage automated delivery pipeline under `.github/workflows/`:
  - `dev-pipeline.yml`: Quality checks (Prettier, ESLint, TypeScript, Vitest) and Vercel Preview deployments on every `dev` push.
  - `pr-validation.yml`: Gated Pull Requests to `prod` requiring green audits, and automated CodeRabbit reviews.
  - `prod-deployment.yml`: Released stable build to Vercel Production on push/merge to `prod` branch.
- **Discord Telemetry Integrations:** Wired all pipeline transitions (started, validation results, deployment urls, PR statuses) to your Discord channels via standard webhook curls.
- **CodeRabbit AI Integration:** Configured `.coderabbit.yaml` to execute chill AI reviews focusing on memory leaks, async safety, rerenders, performance, and accessibility.

### 🍞 Toast Engine Animation Upgrades
- **Elastic Blob Squish:** Mounting toasts now execute bouncy scale keyframes to deliver organic micro-feedback.
- **Dynamic Springs:** Connected parameters (`stiffness`, `damping`, `mass`) to active Framer Motion components, giving full tactile control over curves.
- **Spring Toggle:** Developers can disable springs to fall back on elegant linear eases.
- **`squishDelay`:** Integrated a prop to delay the bounce reaction.
- **Error Shake:** Error notifications trigger quick horizontal shakes to capture immediate focus.
- **Gooey Stacking & Fanning Reveal:** Replaced simple columns with overlapping stacks in `Layout.tsx`. Stacked notifications scale and layer backwards when quiet, and fan out smoothly into standard spaced lists on container hover.
- **Simultaneous Text Entry:** Added toggles to animate Title and Description items concurrently or stagger them for dramatic storytelling.
- **Timestamps:** Standardized custom timezone timestamps.

### 🎨 Visual Settings & Playground UX
- **Floating VS Code Settings Drawer:** Created a fixed, sliding sidebar settings drawer containing all telemetry variables. Fits beautiful backdrop blur overlays and does not disrupt main pages.
- **Category Grid Layout:** Restructured the Examples grid to span the full width, rendering **4 showcase cards per row** elegantly.
- **Buy Me a Coffee ☕ Hero Trigger:** Swapped "Fire Warm Toast" for a mock espresso sequence that morphs from loading seeds into delicious hot coffee success alert.
- **Scroll Mascot Reactions:** Hooked scroll listeners in `HomePage.tsx` to trigger excited Mascot bounces and spring transforms as you scroll.
- **Playground Navigation:** Included a direct Playground link in the global header navbar.

### 📦 Component Registry & Testing
- **shadcn/ui Registry:** Added `registry.json` conforming to `registry-item.json` schemas for seamless terminal additions (`npx shadcn add`).
- **Vitest Framework Setup:** Configured `vitest` v1.6.0 (perfectly compatible with Vite 5) and wrote automated unit tests at `src/tests/toast.test.tsx` verifying additions, updates, and dismissals.
