# Reference Manual: Toastyyy vs. Goey-Toast

This document provides a technical comparison and integration reference for the two leading motion-focused React toast packages within this ecosystem.

---

## 📦 Package Summaries

### 1. Toastyyy (Local Workspace Library)
*   **Package Name:** `toastyyy`
*   **NPM Version:** `1.1.0`
*   **Core Philosophy:** A creative, handcrafted layout ecosystem featuring a warm-cream aesthetic and custom spring physics. It is built around an interactive SVG Mascot tracking the user's cursor vector coordinates.
*   **Best Used For:** Highly visual SaaS landing pages, portfolios, creative labs, and websites looking to build deep brand affinity via tactile character feedback.

### 2. Goey-Toast (Reference Package)
*   **Package Name:** `goey-toast`
*   **NPM Version:** `0.4.0`
*   **GitHub Repository:** [anl331/goey-toast](https://github.com/anl331/goey-toast)
*   **Core Philosophy:** A morphing, gooey blob-style notification library built on top of Sonner. It uses Framer Motion to handle signature organic SVG morph transitions (pill-to-blob-to-pill).
*   **Best Used For:** Standard application environments looking for rapid, drop-in Sonner toast queues with organic gooey styling layers.

---

## 🛠️ Feature Comparison Matrix

| Feature | Toastyyy | Goey-Toast |
| :--- | :--- | :--- |
| **Animation Engine** | Framer Motion (Springs) | Framer Motion (SVG Morphing Paths) |
| **Base Core** | Built from scratch | Built on top of Sonner |
| **Theme Aesthetic** | Soft cream-glass tactile | Dynamic dark/light morphing blobs |
| **Mascot Companion** | Handcrafted SVG Mascot (Gaze tracking) | None |
| **Progress Gauges** | Bottom inline layout timers | None |
| **Promise Tracking** | Event queue updates | Official `gooeyToast.promise()` method |

---

## 🚀 Installation & Direct Setup

### Setting up Toastyyy
```bash
npm install toastyyy
```

```tsx
import { ToastProvider, useToasts } from 'toastyyy'

function App() {
  return (
    <ToastProvider>
      <MainComponent />
    </ToastProvider>
  )
}

function MainComponent() {
  const { addToast } = useToasts()
  return (
    <button onClick={() => addToast({ type: 'success', title: 'Crisp Butter Slice Ready!' })}>
      Fire Toastyyy
    </button>
  )
}
```

### Setting up Goey-Toast
```bash
npm install goey-toast
```

```tsx
import { GooeyToaster, gooeyToast } from 'goey-toast'
import 'goey-toast/styles.css'

function App() {
  return (
    <>
      <GooeyToaster position="bottom-left" />
      <button onClick={() => gooeyToast.success('Saved to cloud!')}>
        Fire Goey-Toast
      </button>
    </>
  )
}
```
