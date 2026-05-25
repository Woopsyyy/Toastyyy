# Copying Gooey-Toast Animations, Logic, and redrawing a Premium Animated Landing Page

We will implement a 100% full-fidelity replica of the organic morphing `goey-toast` physics, options, state management, queue policies, and responsive layouts. Additionally, we will introduce three ultra-premium unique toast designs ("Glassmorphic Aurora", "Glow-in-the-dark Neon", and "Liquid Cyberpunk") and revamp the landing page with breathtaking spring animations, scroll-triggered visual effects, and a highly interactive showcase.

## User Review Required

> [!IMPORTANT]
> - **Unified Global API**: To make the integration seamless, we will export `gooeyToast` alongside `toast` and `useToasts` from `src/hooks/useToasts.tsx` so both legacy and modern `goey-toast` syntax are fully supported.
> - **Tactile Mobile Swipe-to-Dismiss**: Enabled globally via Framer Motion drag gestures. Dismisses the toast dynamically when swiped left or right past a 120px threshold on touch devices.
> - **Queue Overflow Strategy**: Allows selecting between standard `stack` (overlaying oldest behind newest) and `dismiss-oldest` (actively purging old toasts from state to stay within `maxToasts` count).

## Proposed Changes

### State & Hooks

#### [MODIFY] [useToasts.tsx](file:///home/woopsy/project/Random/Toasty/src/hooks/useToasts.tsx)
- Enhance the `ToastItem` interface to support:
  - `fillColor`, `borderColor`, `borderWidth`
  - `classNames` overrides object
  - `closeButtonPosition` (`"top-left" | "top-right"`)
  - `onDismiss` and `onAutoClose` callbacks
  - `actionSuccessText` for success morphing
  - RTL mode layout (`rtl?: boolean`)
- Implement queue limits (`maxToasts`) and queue overflow strategies (`"stack" | "dismiss-oldest"`).
- Implement standard promise resolution `toast.promise()` tracking `loading` -> `success/error` state changes.
- Implement advanced dismiss matching filters: support dismiss by ID string, or type matching object e.g., `toast.dismiss({ type: "error" })`.
- Export `gooeyToast` as a direct alias for `toast` to align perfectly with the target library's exact API.

### Components & UI

#### [MODIFY] [Toast.tsx](file:///home/woopsy/project/Random/Toasty/src/components/ui/Toast.tsx)
- Enable 6 positioning options by adding `top-center` stack alignment.
- Implement automatic horizontal mirroring for right-side positions: `align = position.endsWith("right") ? "right" : position.endsWith("center") ? "center" : "left"`.
- Implement hover-pause: hovering over an expanded toast pauses the progress countdown timer.
- Implement hover-reexpand: hovering over a collapsing or collapsed pill triggers an immediate spring-morph back to its expanded form.
- Add support for custom `fillColor`, `borderColor`, `borderWidth`, and custom CSS overrides `classNames`.
- Implement mobile swipe-to-dismiss using Framer Motion's `drag="x"` with elastic spring bounds.
- Integrate action buttons with success label morphing: if `actionSuccessText` is set, clicking the button morphs its text with a nice spring-scale transition before dismiss.
- Implement RTL layout alignment.
- Add support for multiple ultra-premium custom visual variations:
  1. **Strawberry Jam / Standard**: Classic organic blob morphing.
  2. **Glassmorphic Aurora**: High-translucency glass backdrop with a colorful, rotating radial gradient.
  3. **Glow Neon**: Dark surface with an intense neon ambient glow matching the toast's semantic type.
  4. **Liquid Cyberpunk**: Sharp, stylized geometric blob with high-contrast borders and retro monospace styling.

#### [MODIFY] [Layout.tsx](file:///home/woopsy/project/Random/Toasty/src/components/layout/Layout.tsx)
- Upgrade `ToastStack` to support all 6 positions, including the newly added `top-center` position.
- Adjust vertical layout stacking direction depending on `position`: top positions stack downwards, bottom positions stack upwards.

### Pages & Builder

#### [MODIFY] [PlaygroundPage.tsx](file:///home/woopsy/project/Random/Toasty/src/pages/PlaygroundPage.tsx)
- Add knobs and control sliders in the Sandbox sidebar for all new options:
  - Custom border width slider
  - Overflow strategy toggle
  - Dismiss-by-type filters buttons
  - Multiple custom themes select (Glassmorphic Aurora, Glow Neon, Liquid Cyberpunk, Classic)
  - Close button position toggle (top-left vs top-right)
- Update the Live Code Exporter snippet generation.

#### [MODIFY] [HomePage.tsx](file:///home/woopsy/project/Random/Toasty/src/pages/HomePage.tsx)
- Create a breathtaking landing page explaining how the morphing system works.
- Include a high-fidelity interactive "Baking Lab" section where users click different gourmet toast flavors and witness custom fluid animations.
- Integrate interactive scroll triggers: sections fade, slide, and organic shapes drift in and out as the user scrolls.
- Add a live interactive quote section about "Crafting Micro-feedbacks".

## Verification Plan

### Automated Tests
- Run `pnpm run test` or `vitest run` to make sure existing test cases pass.
- Create or update test cases for the updated state hooks.

### Manual Verification
- Launch the development server using `npm run dev`.
- Visit the home page, playground page, and docs page to visually check each position stack and mirroring expansion.
- Hover over the toasts to verify countdown pause.
- Hover over collapsing toasts to verify spring-driven re-expansion.
- Drag/swipe a toast horizontally on mobile viewports to verify swipe dismiss behavior.


# Toastyyy Premium Motion System — Enhanced Implementation Plan

> Reference:
>
> * https://goey-toast.vercel.app/
> * https://github.com/anl331/goey-toast

---

# Vision

Toastyyy will become a premium motion-first React toast system that combines:

* organic blob physics
* cinematic UI animations
* tactile interactions
* immersive developer experience
* advanced customization
* production-grade performance

The goal is NOT to merely clone the reference package.

The goal is to:

1. fully recreate the smoothness and interaction quality
2. surpass it with premium themes, playground tooling, and developer experience
3. establish Toastyyy as a standout toast framework for React developers

---

# Core Experience Goals

Toastyyy should feel:

* alive
* fluid
* tactile
* organic
* cinematic
* responsive
* premium

Every interaction should communicate:

> “This toast system was crafted with motion design obsession.”

---

# Motion Philosophy

The reference package succeeds because:

* animations are layered
* spring timing is tuned carefully
* transforms inherit momentum
* hover states preserve continuity
* stack positioning behaves physically
* expansion feels directional
* interactions never abruptly stop

Toastyyy will preserve all of these principles.

---

# Phase 1 — Animation Engine Recreation

## Objective

Achieve 100% parity with the animation smoothness and physical behavior of the reference package.

This is the MOST critical phase.

---

# Motion Architecture

## [NEW] Internal Animation State Machine

Create a deterministic animation lifecycle.

```ts
type ToastVisualState =
  | "entering"
  | "expanded"
  | "hover-expanded"
  | "collapsing"
  | "collapsed"
  | "swiping"
  | "dismissing"
  | "removed";
```

Benefits:

* prevents animation conflicts
* ensures smooth interruption handling
* preserves spring continuity
* enables hover re-expansion
* improves gesture coordination

---

# Spring Physics System

## [NEW] Animation Presets

Create reusable motion profiles.

```ts
const animationPresets = {
  smooth: {
    stiffness: 210,
    damping: 24,
    mass: 0.9,
  },

  bouncy: {
    stiffness: 320,
    damping: 18,
    mass: 0.8,
  },

  subtle: {
    stiffness: 160,
    damping: 30,
    mass: 1,
  },

  snappy: {
    stiffness: 420,
    damping: 28,
    mass: 0.7,
  },
};
```

Different springs should be used for:

* entry animation
* hover transitions
* collapse states
* dismiss motion
* stack repositioning
* swipe rebound
* morph transitions

---

# Gooey Morph Recreation

## [CRITICAL]

The gooey effect is NOT simply blur.

The reference package combines:

* SVG goo filters
* scale interpolation
* border-radius morphing
* layered shadows
* opacity transitions
* transform continuity

Implementation:

```html
<svg>
  <filter id="gooey">
    <feGaussianBlur stdDeviation="10" />
    <feColorMatrix values="..." />
  </filter>
</svg>
```

Apply ONLY to:

* active toast stacks
* morph transitions
* grouped interactions

Avoid global filters for performance reasons.

---

# Organic Blob Morphing

## [NEW]

Toast expansion should transition through:

1. compact pill
2. intermediate liquid blob
3. fully expanded card

This morph sequence should animate:

* width
* height
* border radius
* shadow spread
* scale
* opacity
* glow diffusion

---

# Phase 2 — Stack Physics & Positioning

## Objective

Make toast stacks feel spatially alive.

---

# Direction-Aware Expansion

Toast expansion should originate from stack anchor direction.

Examples:

* top-right → expands left/down
* bottom-left → expands right/up
* center → expands symmetrically

Implementation:

```ts
const transformOrigins = {
  "top-right": "top right",
  "top-left": "top left",
  "bottom-right": "bottom right",
  "bottom-left": "bottom left",
  "top-center": "top center",
  "bottom-center": "bottom center",
};
```

---

# 6 Position Support

Support:

* top-left
* top-center
* top-right
* bottom-left
* bottom-center
* bottom-right

Right-side positions should automatically mirror horizontal animations.

Center positions should use symmetric morphing.

---

# Stack Compression Physics

## [NEW]

When multiple toasts appear:

* background toasts scale down slightly
* opacity subtly decreases
* vertical spacing compresses
* z-index dynamically shifts

Example:

* first toast → scale(1)
* second → scale(.97)
* third → scale(.94)

This creates:

* depth
* hierarchy
* cinematic stacking

---

# Queue Overflow Intelligence

## Overflow Modes

```ts
type OverflowStrategy =
  | "stack"
  | "dismiss-oldest"
  | "collapse-oldest"
  | "replace-similar";
```

---

# Replace Similar Mode

If identical notifications appear repeatedly:

* merge them
* increment a counter badge
* pulse the badge

Example:

```txt
❌ Failed to save file ×5
```

---

# Phase 3 — Interaction Fidelity

## Hover Pause

Hovering an expanded toast should:

* pause dismiss timer
* smoothly freeze progress bar
* subtly increase glow intensity
* reduce animation velocity

Avoid abrupt stopping.

---

# Hover Re-Expand

When hovering a collapsed pill:

* it should elastically reopen
* continue previous spring momentum
* preserve motion continuity

This creates “alive UI” feeling.

---

# Swipe-to-Dismiss

## Mobile Gesture Physics

Implement:

* drag elasticity
* velocity-based dismissal
* momentum thresholds
* rotation interpolation
* rebound springs

Example:

```ts
rotate: dragX * 0.03
```

The toast should feel like a physical card being thrown away.

---

# Keyboard Accessibility

Support:

* Escape dismiss
* focus navigation
* action button focus rings
* screen reader announcements

---

# Phase 4 — Toast Features

## Core Features

Implement:

* body content
* React node support
* duration configuration
* bounce intensity
* custom fill color
* custom border color
* custom border width
* CSS class overrides
* timestamp support
* close button positioning
* progress countdown bars
* dark mode
* RTL support

---

# Promise Toasts

Support:

```ts
toast.promise(promise, {
  loading: "Uploading...",
  success: "Upload complete",
  error: "Upload failed",
});
```

Transitions should animate smoothly between states.

---

# Action Buttons

Support:

* CTA buttons
* async handlers
* success morph-back animations
* loading states

---

# Dismiss Filters

Support:

* dismiss by id
* dismiss by type
* dismiss all
* dismiss group

Example:

```ts
toast.dismiss({ type: "error" });
```

---

# Phase 5 — Premium Toast Themes

## Objective

Differentiate Toastyyy from every other toast library.

---

# 1. Aurora Glass

Inspired by:

* macOS liquid glass
* Arc Browser
* Linear

Features:

* frosted blur
* chromatic gradients
* ambient lighting
* translucent layers
* animated radial glows

---

# 2. Neon Reactor

Inspired by:

* synthwave UI
* cyberpunk dashboards

Features:

* edge glow
* bloom lighting
* animated shimmer
* semantic neon colors

---

# 3. Liquid Metal

Inspired by:

* futuristic chrome
* molten liquid

Features:

* reflective gradients
* metallic highlights
* dynamic light sweeps

---

# 4. Minimal Swiss

Inspired by:

* Vercel
* Raycast
* Linear

Features:

* typography-first
* clean spacing
* subtle motion
* minimal shadows

---

# Phase 6 — Landing Page Experience

## Objective

Create a landing page that feels like:

* a premium product launch
* an interactive motion showcase
* a developer playground

NOT merely documentation.

---

# Hero Section

## Hook Quotes

> “Notifications shouldn’t interrupt experiences — they should become part of them.”

Alternative:

> “The toast library that finally feels alive.”

Alternative:

> “Micro-feedbacks engineered with motion obsession.”

---

# Hero Experience

## Interactive Blob Playground

Mouse movement should affect:

* glow intensity
* morph diffusion
* floating particles
* liquid distortion

Toast blobs should subtly react to cursor proximity.

---

# Scroll Storytelling Sections

## Section 1 — Built for Motion

Show:

* stack choreography
* gooey morphing
* spring physics
* collapse behavior

Include animated diagrams.

---

## Section 2 — Craft Micro-feedback

Interactive playground:

* animation preset switcher
* blur slider
* goo strength slider
* border controls
* live spring tuning

---

## Section 3 — Built for React Developers

Feature cards:

* Sonner powered
* Framer Motion
* Type-safe
* Fully customizable
* RTL ready
* Promise-aware

Cards animate into view on scroll.

---

# Scroll Effects

Use:

* fade transitions
* parallax motion
* staggered reveals
* floating gradients
* morphing backgrounds

Avoid:

* excessive scroll jank
* overly aggressive effects

---

# Phase 7 — Playground & DX

## Advanced Playground

Include:

* live code generation
* real-time preview
* theme switcher
* preset selector
* queue simulation
* mobile gesture preview
* dark/light toggle

---

# Live Export Snippets

As controls change:

```tsx
gooeyToast.success("Saved!", {
  theme: "aurora",
  animation: "smooth",
  position: "top-right",
});
```

should update automatically.

---

# Phase 8 — Performance Engineering

## Objective

Maintain stable 60fps animation performance.

---

# Optimization Strategy

Use:

* transform-only animations
* will-change optimization
* lazy mounting
* motion memoization
* reduced re-renders
* AnimatePresence batching

---

# GPU Acceleration

```css
transform: translateZ(0);
backface-visibility: hidden;
```

---

# Smart Blur Handling

Reduce expensive blur usage:

* on background stacks
* during queue bursts
* on low-end devices

---

# Reduced Motion Support

Respect:

```css
prefers-reduced-motion
```

Provide simplified transitions.

---

# Recommended Tech Stack

## Core Toast Engine

* Sonner

## Motion

* Framer Motion

## Scroll Effects

* Framer Motion scroll APIs
  OR
* GSAP ScrollTrigger

## Styling

* TailwindCSS
* CSS Variables
* Motion Tokens

---

# Recommended Internal Architecture

```txt
src/
 ├── motion/
 │    ├── springs.ts
 │    ├── presets.ts
 │    ├── stackPhysics.ts
 │    ├── gooey.ts
 │    ├── transforms.ts
 │    └── gestures.ts
 │
 ├── components/
 │    ├── toast/
 │    │    ├── ToastCard.tsx
 │    │    ├── ToastBlob.tsx
 │    │    ├── ToastStack.tsx
 │    │    ├── ProgressBar.tsx
 │    │    ├── SwipeLayer.tsx
 │    │    └── ToastAction.tsx
 │
 ├── themes/
 │    ├── aurora.ts
 │    ├── neon.ts
 │    ├── swiss.ts
 │    └── liquid.ts
 │
 ├── hooks/
 │    ├── useToasts.ts
 │    └── useToastQueue.ts
```

---

# Success Criteria

The implementation is successful if:

* the motion quality instantly stands out
* interactions feel tactile
* stacks feel physically alive
* hover states feel continuous
* developers want to showcase the library itself
* Toastyyy feels BETTER than the reference package
* the landing page becomes part of the product experience itself

---

# Final Product Positioning

Toastyyy should position itself as:

> “The premium motion-first React toast system.”

NOT:

* “another notification package”
* “another Sonner wrapper”
* “another Framer Motion demo”

The product itself should feel like a showcase of advanced interaction design.
