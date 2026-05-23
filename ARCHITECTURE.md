# Toastyyy Architecture & Design Guide

Toastyyy is an interactive, performance-first React notification system built on **buttery-smooth spring physics** and creative laboratory aesthetics. This document details the architectural landscape, directory layout, component structure, animation systems, and engineering choices that define the library.

---

## 🏗️ Folder Structure

```text
├── .github/workflows/         # Advanced CI/CD workflows
│   ├── dev-pipeline.yml       # Branch dev quality assertions & Vercel Preview
│   ├── pr-validation.yml      # PR controls & Discord status telemetry
│   └── prod-deployment.yml    # Branch prod release pipeline & Vercel Production
├── src/
│   ├── components/
│   │   ├── layout/            # Layout systems and structural templates
│   │   │   ├── Navbar.tsx     # Header context with active spring overlays
│   │   │   ├── Footer.tsx     # Telemetry visual footer
│   │   │   └── Layout.tsx     # Core structure & position toast stack containers
│   │   └── ui/
│   │       ├── Toast.tsx      # Main notification component with expanded bubbles
│   │       ├── ToastMascot.tsx# Interactive Vector Mascot tracking coordinate gaze
│   │       ├── LineGraph.tsx  # Telemetry visuals
│   │       └── ProfitCard.tsx # Visual showcase widgets
│   ├── hooks/
│   │   └── useToasts.tsx      # Context provider holding queue state and dynamic morphs
│   ├── pages/
│   │   ├── HomePage.tsx       # Landing page detailing hero coffee sequences & mascot scroll
│   │   ├── ExamplesPage.tsx   # Visual Playground showcasing drawer slides & 4-card grid
│   │   ├── DocsPage.tsx       # Visual telemetry documentation
│   │   └── ChangelogPage.tsx  # Release log detailing ecosystem evolutions
│   ├── App.tsx                # Client side page router
│   ├── index.ts               # Core module bundle exports
│   └── main.tsx               # App entrypoint
├── registry.json              # Custom shadcn/ui CLI registry item schema
├── .coderabbit.yaml           # CodeRabbit AI automated PR reviewer profile
└── package.json               # Package configs and test scripts (Vitest)
```

---

## 🔄 Toast Animation Engine & State Flow

The engine manages state programmatically using a single custom context and supports layout transitions.

```mermaid
graph TD
    User([User Trigger]) --> Hook[useToasts Hook]
    Hook --> Add[addToast Action]
    Add --> State[(Toast Queue State)]
    State --> Provider[ToastProvider Context]
    Provider --> Layout[Layout.tsx Channels]
    Layout --> Stack[ToastStack Stacker]
    Stack --> Render[Toast.tsx Card]
    
    Render -- Hover Stack -- -> FanOut[Fanned Out List]
    Render -- State Resolution -- -> Morph[Spring Morph Transition]
```

### 1. Toast Stack Stacker (`Layout.tsx`)
Notifications are organized across five designated layout channels (`top-left`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`).
- **Gooey Stacking:** When not hovered, toasts stack on top of each other absolutely. Older toasts are scaled down slightly (`scale = 1 - index * 0.06`) and faded (`opacity = 1 - index * 0.22`), layering behind the active top bubble.
- **Hover Fanning Reveal:** Hovering over the position slot container smoothly expands the overlay stack into a clean, relative list (`gap-3`) with standard dimensions and full opacities, allowing the developer to preview all surrounding active logs.

### 2. High-Fidelity Springs & Easing (`Toast.tsx`)
The animation parameters utilize high-end GPU-accelerated spring configurations:
- **Elastic Blob Squish:** The entrance animation uses vertical/horizontal scale keyframes (`scaleX: [0.8, 1.15, 0.95, 1]`) with a custom `squishDelay` prop, giving the card a satisfying organic gelatinous drop.
- **Spring Controls:** Explicit spring variables (`stiffness`, `damping`, `mass`) are configurable inside the Visual Engine, which applies them directly using Framer Motion. Disabling springs falls back to a clean linear cubic curve.
- **Error Shake:** Mounting an error toast triggers a fast horizontal shift sequence (`x: [0, -12, 12, -8, 8, -4, 4, 0]`) to convey priority feedback.
- **Pill Morphing:** Programmatic toast morphs (resolving loading loader icons to success/error states) execute layout updates with customized spring damping ratios, preventing visual jumps.

---

## 🎨 Color System & Aesthetics

Toastyyy matches creative developer laboratory aesthetics, blending smooth gradients, high-contrast dark modes, and soft glassmorphic borders:
- **Default Theme Presets:** Features a tailored Light mode (clean borders, white backgrounds) and a Sleek Dark Mode (vibrant `#12131a` surfaces, white/5 borders, shadow overlays).
- **Brand Colors:** Toast cards support custom brand hex colors (`customColor`), dynamically colorizing borders, progress indicators, action buttons, and icons.

---

## 🧪 Testing System

Ecosystem operations are verified inside the `src/tests/toast.test.tsx` suite using **Vitest**:
- **Reliability:** Confirms accurate additions to the active queue.
- **Morphing:** Verifies programmatic data updates when transitioning active notifications.
- **Dismissal:** Asserts queue size reductions when close triggers are called.
