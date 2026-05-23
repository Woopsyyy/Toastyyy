import { useState } from "react";
import {
  Terminal,
  Copy,
  Check,
  Zap,
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  Code,
} from "lucide-react";
import { useToasts } from "../hooks/useToasts";

export default function DocsSection() {
  const { addToast, updateToast } = useToasts();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyCode = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    addToast({
      type: "success",
      title: "Copied Code snippet!",
      description: "Ready to paste in your React project.",
      duration: 3000,
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const firePresetToast = (preset: string) => {
    switch (preset) {
      // 03 Toast Types
      case "default":
        addToast({ type: "default", title: "Hello from Toastyyy!" });
        break;
      case "success":
        addToast({ type: "success", title: "Saved successfully!" });
        break;
      case "error":
        addToast({ type: "error", title: "Operations failed!" });
        break;
      case "warning":
        addToast({ type: "warning", title: "Careful with that parameter!" });
        break;
      case "info":
        addToast({ type: "info", title: "Central processing active." });
        break;

      // 04 Description
      case "warning-desc":
        addToast({
          type: "warning",
          title: "Payment Alert",
          description: "Your premium recipe subscription is expiring soon.",
          showDescription: true,
        });
        break;
      case "error-desc":
        addToast({
          type: "error",
          title: "Payment failed",
          description: "Your transaction was declined due to missing tokens.",
          showDescription: true,
        });
        break;

      // 05 Action Button
      case "error-action":
        addToast({
          type: "error",
          title: "Connection timed out",
          description: "Failures registered on telemetry nodes.",
          showDescription: true,
          showAction: true,
          actionText: "Retry Synced",
        });
        break;
      case "action-success-pill":
        addToast({
          type: "info",
          title: "Share link ready",
          description: "Your link has been compiled in cache.",
          showDescription: true,
          showAction: true,
          actionText: "Copy link",
        });
        break;

      // 06 Promise Toasts
      case "promise-success-pill": {
        const id = addToast({
          type: "loading",
          title: "Bundling changes...",
          showProgress: true,
        });
        setTimeout(() => {
          updateToast(id, {
            type: "success",
            title: "Changes saved",
            description: "All changes synced successfully.",
            showDescription: true,
          });
        }, 2000);
        break;
      }
      case "promise-error-pill": {
        const id = addToast({
          type: "loading",
          title: "Baking sourdough...",
          showProgress: true,
        });
        setTimeout(() => {
          updateToast(id, {
            type: "error",
            title: "Something went wrong",
            description: "Chamber temperature dropped.",
            showDescription: true,
            showAction: true,
            actionText: "Retry",
          });
        }, 2000);
        break;
      }
      case "promise-success-expanded": {
        const id = addToast({
          type: "loading",
          title: "Compiling gourmet core...",
          showProgress: true,
        });
        setTimeout(() => {
          updateToast(id, {
            type: "success",
            title: "Compilation Complete",
            description: "Created 4 bundles in 120ms.",
            showDescription: true,
          });
        }, 2000);
        break;
      }

      // 11 Custom Styling
      case "custom-style":
        addToast({
          type: "success",
          title: "Styled successfully!",
          description: "Modified with custom accent properties.",
          showDescription: true,
          customColor: "#1a1a2e",
          hasBorder: true,
        });
        break;

      // 12 Spring Animations
      case "no-spring-pill":
        addToast({
          type: "success",
          title: "Saved successfully!",
          bounce: 0.0,
        });
        break;
      case "no-spring-expanded":
        addToast({
          type: "info",
          title: "Telemetry Synced",
          description: "This is triggered without elastic boundaries.",
          showDescription: true,
          bounce: 0.0,
        });
        break;
      case "with-spring-compare":
        addToast({
          type: "success",
          title: "Saved with Elasticity!",
          bounce: 0.7,
        });
        break;
    }
  };

  const codeSnippets = {
    quickStart: `import { GooeyToaster, gooeyToast } from 'goey-toast'

function App() {
  return (
    <>
      <GooeyToaster position="bottom-right" />
      <button onClick={() => gooeyToast.success('Saved!')}>
        Save
      </button>
    </>
  )
}`,
    shadcnCli: `npx shadcn@latest add https://goey-toast.vercel.app/r/goey-toaster.json`,
    shadcnImport: `import { GooeyToaster } from "@/components/ui/goey-toaster"
import { gooeyToast } from "@/components/ui/goey-toaster"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GooeyToaster />
      </body>
    </html>
  )
}

// Trigger from anywhere
gooeyToast.success("Saved!")`,
    types: `gooeyToast('Hello')                    // default (neutral)
gooeyToast.success('Saved!')           // green
gooeyToast.error('Failed')             // red
gooeyToast.warning('Careful')          // yellow
gooeyToast.info('FYI')                 // blue`,
    description: `gooeyToast.error('Payment failed', {
  description: 'Your card was declined.',
})

// Custom component as body
gooeyToast.success('Deployed', {
  description: (
    <div>
      <strong>Production</strong>
      <span>main @ 3f8a2c1</span>
    </div>
  ),
})`,
    action: `gooeyToast.info('Share link ready', {
  description: 'Your link has been generated.',
  action: {
    label: 'Copy to Clipboard',
    onClick: () => navigator.clipboard.writeText(url),
    successLabel: 'Copied!',   // optional morph-back
  },
})`,
    promise: `gooeyToast.promise(saveData(), {
  loading: 'Saving...',
  success: 'Changes saved',
  error: 'Something went wrong',
  description: {
    success: 'All changes have been synced.',
    error: 'Please try again later.',
  },
  action: {
    error: {
      label: 'Retry',
      onClick: () => retry(),
    },
  },
})`,
    props: `<GooeyToaster position="top-center" />`,
    dismissFilter: `interface DismissFilter {
  type: GooeyToastType | GooeyToastType[]
}

// Dismiss all error toasts
gooeyToast.dismiss({ type: 'error' })

// Dismiss all error and warning toasts
gooeyToast.dismiss({ type: ['error', 'warning'] })`,
    update: `interface GooeyToastUpdateOptions {
  title?: string
  description?: ReactNode
  type?: GooeyToastType
  action?: GooeyToastAction
}

// Update a toast in place
const id = gooeyToast.success('Uploading...')
gooeyToast.update(id, {
  title: 'Upload complete!',
  type: 'success',
  description: 'File has been processed.',
})`,
    styling: `gooeyToast.success('Styled!', {
  fillColor: '#1a1a2e',
  borderColor: '#333',
  borderWidth: 2,
  classNames: {
    wrapper: 'my-wrapper',
    title: 'my-title',
    description: 'my-desc',
    actionButton: 'my-btn',
  },
})`,
    spring: `// Per-toast
gooeyToast.success('Saved', {
  description: 'Your changes have been synced.',
  spring: false,
})

// Global default
<GooeyToaster spring={false} />`,
  };

  return (
    <div className="container-wide relative z-10 min-h-screen pt-24" id="docs">
      {/* Main Documentation Body - Fluid 100% width layout */}
      <main className="w-full py-4 space-y-20 pb-32">
        <header className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-text leading-none mb-3">
            Documentation
          </h1>
          <p className="text-text-2 text-sm md:text-base max-w-2xl">
            Everything you need to add morphing toast notifications to your
            React app.
          </p>
        </header>

        {/* 01 Quick Start */}
        <section id="doc-quick-start" className="space-y-6 pt-6 scroll-mt-28">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono font-black text-accent">01</span>
            <h2 className="text-xl font-extrabold tracking-tight text-text">
              Quick Start
            </h2>
          </div>
          <p className="text-text-2 text-xs md:text-sm leading-relaxed">
            Add the GooeyToaster provider and call gooeyToast from anywhere.
          </p>

          <div className="bg-white border border-border-strong rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="px-4 py-2.5 bg-surface-2 border-b border-border-strong flex justify-between items-center select-none">
              <span className="text-[9px] font-extrabold text-text-3 tracking-wider uppercase">
                App.tsx
              </span>
              <button
                onClick={() =>
                  handleCopyCode("quickStart", codeSnippets.quickStart)
                }
                className="p-1.5 rounded-lg hover:bg-border-strong text-text-3 hover:text-accent transition-all"
              >
                {copiedId === "quickStart" ? (
                  <Check className="w-3.5 h-3.5 text-accent" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <pre className="p-5 font-mono text-[11.5px] text-text-2 overflow-x-auto leading-relaxed select-all bg-white">
              <code>{codeSnippets.quickStart}</code>
            </pre>
          </div>
          <p className="text-text-3 text-[10px] italic">
            Requires react, react-dom, and framer-motion as peer dependencies.
          </p>
        </section>

        {/* 02 shadcn/ui */}
        <section id="doc-shadcn" className="space-y-6 pt-6 scroll-mt-28">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono font-black text-accent">02</span>
            <h2 className="text-xl font-extrabold tracking-tight text-text">
              shadcn/ui
            </h2>
          </div>
          <p className="text-text-2 text-xs md:text-sm leading-relaxed">
            Install as a shadcn component with a single command. This adds a
            thin wrapper to your components/ui directory and auto-installs
            dependencies.
          </p>

          <div className="bg-white border border-border-strong rounded-2xl p-4 flex items-center justify-between font-mono text-[11.5px] text-text select-all shadow-sm">
            <div className="flex items-center gap-2 overflow-x-auto pr-4 scrollbar-none">
              <span className="text-accent flex-shrink-0 font-bold">$</span>
              <span className="whitespace-nowrap text-text-2 font-semibold">
                {codeSnippets.shadcnCli}
              </span>
            </div>
            <button
              onClick={() =>
                handleCopyCode("shadcnCli", codeSnippets.shadcnCli)
              }
              className="p-1.5 rounded-lg hover:bg-border-strong text-text-3 hover:text-accent transition-all flex-shrink-0"
            >
              {copiedId === "shadcnCli" ? (
                <Check className="w-3.5 h-3.5 text-accent" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          <p className="text-text-2 text-xs md:text-sm leading-relaxed mt-4">
            Then use it in your layout:
          </p>

          <div className="bg-white border border-border-strong rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="px-4 py-2.5 bg-surface-2 border-b border-border-strong flex justify-between items-center select-none">
              <span className="text-[9px] font-extrabold text-text-3 tracking-wider uppercase">
                layout.tsx
              </span>
              <button
                onClick={() =>
                  handleCopyCode("shadcnImport", codeSnippets.shadcnImport)
                }
                className="p-1.5 rounded-lg hover:bg-border-strong text-text-3 hover:text-accent transition-all"
              >
                {copiedId === "shadcnImport" ? (
                  <Check className="w-3.5 h-3.5 text-accent" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <pre className="p-5 font-mono text-[11.5px] text-text-2 overflow-x-auto leading-relaxed select-all bg-white">
              <code>{codeSnippets.shadcnImport}</code>
            </pre>
          </div>
        </section>

        {/* 03 Toast Types */}
        <section id="doc-types" className="space-y-6 pt-6 scroll-mt-28">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono font-black text-accent">03</span>
            <h2 className="text-xl font-extrabold tracking-tight text-text">
              Toast Types
            </h2>
          </div>
          <p className="text-text-2 text-xs md:text-sm leading-relaxed">
            Centralized notification presets designed to cover the core semantic
            states.
          </p>

          <div className="bg-white border border-border-strong rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="px-4 py-2.5 bg-surface-2 border-b border-border-strong flex justify-between items-center select-none">
              <span className="text-[9px] font-extrabold text-text-3 tracking-wider uppercase">
                API Methods
              </span>
              <button
                onClick={() => handleCopyCode("types", codeSnippets.types)}
                className="p-1.5 rounded-lg hover:bg-border-strong text-text-3 hover:text-accent transition-all"
              >
                {copiedId === "types" ? (
                  <Check className="w-3.5 h-3.5 text-accent" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <pre className="p-5 font-mono text-[11.5px] text-text-2 overflow-x-auto leading-relaxed select-all bg-white">
              <code>{codeSnippets.types}</code>
            </pre>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-2">
            {(["default", "success", "error", "warning", "info"] as const).map(
              (type) => (
                <button
                  key={type}
                  onClick={() => firePresetToast(type)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border hover:border-accent/40 bg-white hover:bg-accent/5 text-[11px] font-extrabold capitalize text-text hover:shadow-sm transition-all duration-300 group"
                >
                  <Play className="w-3 h-3 text-accent group-hover:scale-105 transition-transform" />
                  {type}
                </button>
              ),
            )}
          </div>
        </section>

        {/* 04 Description */}
        <section id="doc-description" className="space-y-6 pt-6 scroll-mt-28">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono font-black text-accent">04</span>
            <h2 className="text-xl font-extrabold tracking-tight text-text">
              Description
            </h2>
          </div>
          <p className="text-text-2 text-xs md:text-sm leading-relaxed">
            Pass a string or any ReactNode as the description to expand the
            toast into a blob.
          </p>

          <div className="bg-white border border-border-strong rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="px-4 py-2.5 bg-surface-2 border-b border-border-strong flex justify-between items-center select-none">
              <span className="text-[9px] font-extrabold text-text-3 tracking-wider uppercase">
                Example.ts
              </span>
              <button
                onClick={() =>
                  handleCopyCode("description", codeSnippets.description)
                }
                className="p-1.5 rounded-lg hover:bg-border-strong text-text-3 hover:text-accent transition-all"
              >
                {copiedId === "description" ? (
                  <Check className="w-3.5 h-3.5 text-accent" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <pre className="p-5 font-mono text-[11.5px] text-text-2 overflow-x-auto leading-relaxed select-all bg-white">
              <code>{codeSnippets.description}</code>
            </pre>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-2">
            <button
              onClick={() => firePresetToast("warning-desc")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border hover:border-accent/40 bg-white hover:bg-accent/5 text-[11px] font-extrabold text-text hover:shadow-sm transition-all duration-300 group"
            >
              <Play className="w-3 h-3 text-accent" />
              Warning + Description
            </button>
            <button
              onClick={() => firePresetToast("error-desc")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border hover:border-accent/40 bg-white hover:bg-accent/5 text-[11px] font-extrabold text-text hover:shadow-sm transition-all duration-300 group"
            >
              <Play className="w-3 h-3 text-accent" />
              Error + Description
            </button>
          </div>
        </section>

        {/* 05 Action Button */}
        <section id="doc-action-button" className="space-y-6 pt-6 scroll-mt-28">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono font-black text-accent">05</span>
            <h2 className="text-xl font-extrabold tracking-tight text-text">
              Action Button
            </h2>
          </div>
          <p className="text-text-2 text-xs md:text-sm leading-relaxed">
            Add successLabel for a pill morph-back animation on click.
          </p>

          <div className="bg-white border border-border-strong rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="px-4 py-2.5 bg-surface-2 border-b border-border-strong flex justify-between items-center select-none">
              <span className="text-[9px] font-extrabold text-text-3 tracking-wider uppercase">
                InteractiveAction.ts
              </span>
              <button
                onClick={() => handleCopyCode("action", codeSnippets.action)}
                className="p-1.5 rounded-lg hover:bg-border-strong text-text-3 hover:text-accent transition-all"
              >
                {copiedId === "action" ? (
                  <Check className="w-3.5 h-3.5 text-accent" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <pre className="p-5 font-mono text-[11.5px] text-text-2 overflow-x-auto leading-relaxed select-all bg-white">
              <code>{codeSnippets.action}</code>
            </pre>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-2">
            <button
              onClick={() => firePresetToast("error-action")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border hover:border-accent/40 bg-white hover:bg-accent/5 text-[11px] font-extrabold text-text hover:shadow-sm transition-all duration-300 group"
            >
              <Play className="w-3 h-3 text-accent" />
              Error + Action
            </button>
            <button
              onClick={() => firePresetToast("action-success-pill")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border hover:border-accent/40 bg-white hover:bg-accent/5 text-[11px] font-extrabold text-text hover:shadow-sm transition-all duration-300 group"
            >
              <Play className="w-3 h-3 text-accent" />
              Action + Success Pill
            </button>
          </div>
        </section>

        {/* 06 Promise Toasts */}
        <section
          id="doc-promise-toasts"
          className="space-y-6 pt-6 scroll-mt-28"
        >
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono font-black text-accent">06</span>
            <h2 className="text-xl font-extrabold tracking-tight text-text">
              Promise Toasts
            </h2>
          </div>
          <p className="text-text-2 text-xs md:text-sm leading-relaxed">
            Automatically transitions from loading to success/error when the
            promise resolves.
          </p>

          <div className="bg-white border border-border-strong rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="px-4 py-2.5 bg-surface-2 border-b border-border-strong flex justify-between items-center select-none">
              <span className="text-[9px] font-extrabold text-text-3 tracking-wider uppercase">
                PromiseLifecycle.ts
              </span>
              <button
                onClick={() => handleCopyCode("promise", codeSnippets.promise)}
                className="p-1.5 rounded-lg hover:bg-border-strong text-text-3 hover:text-accent transition-all"
              >
                {copiedId === "promise" ? (
                  <Check className="w-3.5 h-3.5 text-accent" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <pre className="p-5 font-mono text-[11.5px] text-text-2 overflow-x-auto leading-relaxed select-all bg-white">
              <code>{codeSnippets.promise}</code>
            </pre>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-2">
            <button
              onClick={() => firePresetToast("promise-success-pill")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border hover:border-accent/40 bg-white hover:bg-accent/5 text-[11px] font-extrabold text-text hover:shadow-sm transition-all duration-300 group"
            >
              <Play className="w-3 h-3 text-accent" />
              Promise + Success (pill)
            </button>
            <button
              onClick={() => firePresetToast("promise-error-pill")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border hover:border-accent/40 bg-white hover:bg-accent/5 text-[11px] font-extrabold text-text hover:shadow-sm transition-all duration-300 group"
            >
              <Play className="w-3 h-3 text-accent" />
              Promise + Error (pill)
            </button>
            <button
              onClick={() => firePresetToast("promise-success-expanded")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border hover:border-accent/40 bg-white hover:bg-accent/5 text-[11px] font-extrabold text-text hover:shadow-sm transition-all duration-300 group"
            >
              <Play className="w-3 h-3 text-accent" />
              Promise + Success (expanded)
            </button>
          </div>
        </section>

        {/* 07 Timings */}
        <section id="doc-timings" className="space-y-6 pt-6 scroll-mt-28">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono font-black text-accent">07</span>
            <h2 className="text-xl font-extrabold tracking-tight text-text">
              Timings
            </h2>
          </div>
          <p className="text-text-2 text-xs md:text-sm leading-relaxed">
            Control how long toasts stay visible with the timing option.
          </p>

          <div className="glass rounded-[24px] border border-border-strong overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border-strong text-text-3 font-extrabold uppercase tracking-wider text-[9px] bg-surface-2">
                  <th className="py-3 px-4">Property</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Default</th>
                  <th className="py-3 px-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="hover:bg-surface-2/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-accent">
                    displayDuration
                  </td>
                  <td className="py-3.5 px-4 text-text-2">number</td>
                  <td className="py-3.5 px-4 text-text-2">4000</td>
                  <td className="py-3.5 px-4 text-text-2">
                    Milliseconds toast stays visible
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 08 Toaster Props */}
        <section id="doc-toaster-props" className="space-y-6 pt-6 scroll-mt-28">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono font-black text-accent">08</span>
            <h2 className="text-xl font-extrabold tracking-tight text-text">
              Toaster Props
            </h2>
          </div>
          <p className="text-text-2 text-xs md:text-sm leading-relaxed">
            6 positions supported. Right-side positions auto-mirror the blob
            horizontally. Center positions use a symmetric morph where the body
            grows outward from the pill.
          </p>

          <div className="bg-white border border-border-strong rounded-2xl overflow-hidden shadow-sm flex flex-col max-w-sm">
            <div className="px-4 py-2 bg-surface-2 border-b border-border-strong flex justify-between items-center select-none">
              <span className="text-[9px] font-extrabold text-text-3 tracking-wider uppercase">
                JSX element
              </span>
            </div>
            <pre className="p-4 font-mono text-[11.5px] text-text-2 overflow-x-auto leading-relaxed select-all bg-white">
              <code>{codeSnippets.props}</code>
            </pre>
          </div>

          <div className="glass rounded-[24px] border border-border-strong overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border-strong text-text-3 font-extrabold uppercase tracking-wider text-[9px] bg-surface-2">
                    <th className="py-3 px-4">Prop</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Default</th>
                    <th className="py-3 px-4">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    {
                      p: "position",
                      t: "string",
                      d: "'bottom-right'",
                      ds: "6 positions: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right",
                    },
                    {
                      p: "duration",
                      t: "number",
                      d: "—",
                      ds: "Default display duration (ms)",
                    },
                    {
                      p: "gap",
                      t: "number",
                      d: "14",
                      ds: "Gap between stacked toasts",
                    },
                    {
                      p: "offset",
                      t: "number | string",
                      d: "'24px'",
                      ds: "Distance from screen edge",
                    },
                    {
                      p: "theme",
                      t: "'light' | 'dark'",
                      d: "'light'",
                      ds: "Color theme",
                    },
                    {
                      p: "spring",
                      t: "boolean",
                      d: "true",
                      ds: "Enable spring/bounce animations globally",
                    },
                    {
                      p: "bounce",
                      t: "number",
                      d: "0.4",
                      ds: "Spring intensity: 0.05 (subtle) to 0.8 (dramatic)",
                    },
                    {
                      p: "closeOnEscape",
                      t: "boolean",
                      d: "true",
                      ds: "Dismiss most recent toast on Escape key press",
                    },
                    {
                      p: "showProgress",
                      t: "boolean",
                      d: "false",
                      ds: "Show countdown progress bar on all toasts",
                    },
                    {
                      p: "maxQueue",
                      t: "number",
                      d: "Infinity",
                      ds: "Maximum number of toasts in the waiting queue",
                    },
                    {
                      p: "queueOverflow",
                      t: "'drop-oldest' | 'drop-newest'",
                      d: "'drop-oldest'",
                      ds: "Behavior when queue exceeds maxQueue",
                    },
                    {
                      p: "swipeToDismiss",
                      t: "boolean",
                      d: "true",
                      ds: "Enable swipe-to-dismiss touch gestures on mobile",
                    },
                    {
                      p: "preset",
                      t: "AnimationPresetName",
                      d: "—",
                      ds: "Named animation preset (smooth, bouncy, subtle, snappy)",
                    },
                  ].map((row) => (
                    <tr
                      key={row.p}
                      className="hover:bg-surface-2/40 transition-colors"
                    >
                      <td className="py-3 px-4 font-mono font-bold text-accent">
                        {row.p}
                      </td>
                      <td className="py-3 px-4 text-text-2">{row.t}</td>
                      <td className="py-3 px-4 text-text-2 font-mono text-[10px]">
                        {row.d}
                      </td>
                      <td className="py-3 px-4 text-text-2 leading-relaxed">
                        {row.ds}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 09 Options */}
        <section id="doc-options" className="space-y-6 pt-6 scroll-mt-28">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono font-black text-accent">09</span>
            <h2 className="text-xl font-extrabold tracking-tight text-text">
              Options
            </h2>
          </div>
          <p className="text-text-2 text-xs md:text-sm leading-relaxed">
            Per-toast parameters passed in the option argument to configure
            individual variants.
          </p>

          <div className="glass rounded-[24px] border border-border-strong overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border-strong text-text-3 font-extrabold uppercase tracking-wider text-[9px] bg-surface-2">
                    <th className="py-3 px-4">Option</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    {
                      o: "description",
                      t: "ReactNode",
                      d: "Body content (string or component)",
                    },
                    {
                      o: "action",
                      t: "GooeyToastAction",
                      d: "Action button config",
                    },
                    { o: "icon", t: "ReactNode", d: "Custom icon override" },
                    { o: "duration", t: "number", d: "Display duration in ms" },
                    {
                      o: "id",
                      t: "string | number",
                      d: "Unique toast identifier",
                    },
                    {
                      o: "classNames",
                      t: "GooeyToastClassNames",
                      d: "CSS class overrides",
                    },
                    {
                      o: "fillColor",
                      t: "string",
                      d: "Background color of the blob",
                    },
                    {
                      o: "borderColor",
                      t: "string",
                      d: "Border color of the blob",
                    },
                    {
                      o: "borderWidth",
                      t: "number",
                      d: "Border width in px (default 1.5)",
                    },
                    {
                      o: "timing",
                      t: "GooeyToastTimings",
                      d: "Animation timing overrides",
                    },
                    {
                      o: "spring",
                      t: "boolean",
                      d: "Enable spring/bounce animations (default true)",
                    },
                    {
                      o: "bounce",
                      t: "number",
                      d: "Spring intensity: 0.05 (subtle) to 0.8 (dramatic), default 0.4",
                    },
                    {
                      o: "showProgress",
                      t: "boolean",
                      d: "Show countdown progress bar on this toast",
                    },
                    {
                      o: "preset",
                      t: "AnimationPresetName",
                      d: "Named animation preset (smooth, bouncy, subtle, snappy)",
                    },
                    {
                      o: "onDismiss",
                      t: "(id: string | number) => void",
                      d: "Callback fired when toast is dismissed (any reason)",
                    },
                    {
                      o: "onAutoClose",
                      t: "(id: string | number) => void",
                      d: "Callback fired only when toast auto-closes (timer)",
                    },
                  ].map((row) => (
                    <tr
                      key={row.o}
                      className="hover:bg-surface-2/40 transition-colors"
                    >
                      <td className="py-3 px-4 font-mono font-bold text-accent">
                        {row.o}
                      </td>
                      <td className="py-3 px-4 text-text-2 font-mono text-[10px]">
                        {row.t}
                      </td>
                      <td className="py-3 px-4 text-text-2 leading-relaxed">
                        {row.d}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 10 Methods */}
        <section id="doc-methods" className="space-y-6 pt-6 scroll-mt-28">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono font-black text-accent">10</span>
            <h2 className="text-xl font-extrabold tracking-tight text-text">
              Methods
            </h2>
          </div>
          <p className="text-text-2 text-xs md:text-sm leading-relaxed">
            Beyond the basic gooeyToast() and type methods, the following
            methods are available for managing toasts programmatically.
          </p>

          <div className="glass rounded-[24px] border border-border-strong overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border-strong text-text-3 font-extrabold uppercase tracking-wider text-[9px] bg-surface-2">
                    <th className="py-3 px-4">Method</th>
                    <th className="py-3 px-4">Signature</th>
                    <th className="py-3 px-4">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-surface-2/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-accent">
                      gooeyToast.dismiss
                    </td>
                    <td className="py-3 px-4 text-text-2 font-mono text-[10px]">
                      (id?: string | number) =&gt; void
                    </td>
                    <td className="py-3 px-4 text-text-2 leading-relaxed">
                      Dismiss a specific toast by ID, or all toasts if no ID
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-2/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-accent">
                      gooeyToast.dismiss
                    </td>
                    <td className="py-3 px-4 text-text-2 font-mono text-[10px]">
                      (filter: DismissFilter) =&gt; void
                    </td>
                    <td className="py-3 px-4 text-text-2 leading-relaxed">
                      Dismiss all toasts matching a type filter
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-2/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-accent">
                      gooeyToast.update
                    </td>
                    <td className="py-3 px-4 text-text-2 font-mono text-[10px]">
                      (id, options: GooeyToastUpdateOptions) =&gt; void
                    </td>
                    <td className="py-3 px-4 text-text-2 leading-relaxed">
                      Update an active toast's title, description, type, or
                      action in place
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-border-strong rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="px-4 py-2.5 bg-surface-2 border-b border-border-strong flex justify-between items-center select-none">
              <span className="text-[9px] font-extrabold text-text-3 tracking-wider uppercase">
                DismissFilter Interface
              </span>
              <button
                onClick={() =>
                  handleCopyCode("dismissFilter", codeSnippets.dismissFilter)
                }
                className="p-1.5 rounded-lg hover:bg-border-strong text-text-3 hover:text-accent transition-all"
              >
                {copiedId === "dismissFilter" ? (
                  <Check className="w-3.5 h-3.5 text-accent" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <pre className="p-5 font-mono text-[11.5px] text-text-2 overflow-x-auto leading-relaxed select-all bg-white">
              <code>{codeSnippets.dismissFilter}</code>
            </pre>
          </div>

          <div className="bg-white border border-border-strong rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="px-4 py-2.5 bg-surface-2 border-b border-border-strong flex justify-between items-center select-none">
              <span className="text-[9px] font-extrabold text-text-3 tracking-wider uppercase">
                GooeyToastUpdateOptions Interface
              </span>
              <button
                onClick={() => handleCopyCode("update", codeSnippets.update)}
                className="p-1.5 rounded-lg hover:bg-border-strong text-text-3 hover:text-accent transition-all"
              >
                {copiedId === "update" ? (
                  <Check className="w-3.5 h-3.5 text-accent" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <pre className="p-5 font-mono text-[11.5px] text-text-2 overflow-x-auto leading-relaxed select-all bg-white">
              <code>{codeSnippets.update}</code>
            </pre>
          </div>
        </section>

        {/* 11 Custom Styling */}
        <section
          id="doc-custom-styling"
          className="space-y-6 pt-6 scroll-mt-28"
        >
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono font-black text-accent">11</span>
            <h2 className="text-xl font-extrabold tracking-tight text-text">
              Custom Styling
            </h2>
          </div>
          <p className="text-text-2 text-xs md:text-sm leading-relaxed">
            Override styles for any part of the toast with classNames.
          </p>

          <div className="bg-white border border-border-strong rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="px-4 py-2.5 bg-surface-2 border-b border-border-strong flex justify-between items-center select-none">
              <span className="text-[9px] font-extrabold text-text-3 tracking-wider uppercase">
                CustomStyles.ts
              </span>
              <button
                onClick={() => handleCopyCode("styling", codeSnippets.styling)}
                className="p-1.5 rounded-lg hover:bg-border-strong text-text-3 hover:text-accent transition-all"
              >
                {copiedId === "styling" ? (
                  <Check className="w-3.5 h-3.5 text-accent" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <pre className="p-5 font-mono text-[11.5px] text-text-2 overflow-x-auto leading-relaxed select-all bg-white">
              <code>{codeSnippets.styling}</code>
            </pre>
          </div>

          <div className="pt-2">
            <button
              onClick={() => firePresetToast("custom-style")}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-transparent bg-accent text-[11px] font-extrabold text-white hover:bg-accent-2 hover:shadow-md transition-all duration-300 group"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Try Custom Style
            </button>
          </div>

          <div className="glass rounded-[24px] border border-border-strong overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border-strong text-text-3 font-extrabold uppercase tracking-wider text-[9px] bg-surface-2">
                  <th className="py-3 px-4">Key</th>
                  <th className="py-3 px-4">Target</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { k: "wrapper", t: "Outer container" },
                  { k: "content", t: "Content area" },
                  { k: "header", t: "Icon + title row" },
                  { k: "title", t: "Title text" },
                  { k: "icon", t: "Icon wrapper" },
                  { k: "description", t: "Body text" },
                  { k: "actionWrapper", t: "Button container" },
                  { k: "actionButton", t: "Action button" },
                ].map((row) => (
                  <tr
                    key={row.k}
                    className="hover:bg-surface-2/40 transition-colors"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-accent">
                      {row.k}
                    </td>
                    <td className="py-3 px-4 text-text-2">{row.t}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 12 Spring Animation */}
        <section
          id="doc-spring-animation"
          className="space-y-6 pt-6 scroll-mt-28"
        >
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono font-black text-accent">12</span>
            <h2 className="text-xl font-extrabold tracking-tight text-text">
              Spring Animation
            </h2>
          </div>
          <p className="text-text-2 text-xs md:text-sm leading-relaxed">
            Disable the spring/bounce effect for a cleaner, more subtle
            animation style. Set per-toast or globally on the Toaster.
          </p>

          <div className="bg-white border border-border-strong rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="px-4 py-2.5 bg-surface-2 border-b border-border-strong flex justify-between items-center select-none">
              <span className="text-[9px] font-extrabold text-text-3 tracking-wider uppercase">
                SpringConfig.ts
              </span>
              <button
                onClick={() => handleCopyCode("spring", codeSnippets.spring)}
                className="p-1.5 rounded-lg hover:bg-border-strong text-text-3 hover:text-accent transition-all"
              >
                {copiedId === "spring" ? (
                  <Check className="w-3.5 h-3.5 text-accent" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <pre className="p-5 font-mono text-[11.5px] text-text-2 overflow-x-auto leading-relaxed select-all bg-white">
              <code>{codeSnippets.spring}</code>
            </pre>
          </div>

          <p className="text-text-2 text-xs md:text-sm leading-relaxed">
            When spring is false, all spring-based animations (landing squish,
            blob morph, pill resize, header squish) use smooth ease-in-out
            curves instead. Error shake still works regardless. Per-toast values
            override the global setting.
          </p>

          <div className="flex flex-wrap gap-2.5 pt-2">
            <button
              onClick={() => firePresetToast("no-spring-pill")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border hover:border-accent/40 bg-white hover:bg-accent/5 text-[11px] font-extrabold text-text hover:shadow-sm transition-all duration-300 group"
            >
              <Play className="w-3 h-3 text-accent" />
              No Spring (pill)
            </button>
            <button
              onClick={() => firePresetToast("no-spring-expanded")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border hover:border-accent/40 bg-white hover:bg-accent/5 text-[11px] font-extrabold text-text hover:shadow-sm transition-all duration-300 group"
            >
              <Play className="w-3 h-3 text-accent" />
              No Spring (expanded)
            </button>
            <button
              onClick={() => firePresetToast("with-spring-compare")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border hover:border-accent/40 bg-white hover:bg-accent/5 text-[11px] font-extrabold text-text hover:shadow-sm transition-all duration-300 group"
            >
              <Play className="w-3 h-3 text-accent" />
              With Spring (compare)
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
