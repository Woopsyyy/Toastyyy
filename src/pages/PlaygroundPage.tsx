import Editor from "@monaco-editor/react";
import { motion } from "framer-motion";
import {
  Check,
  Code2,
  Compass,
  Copy,
  Filter,
  Layers3,
  Palette,
  Play,
  RotateCcw,
  Settings2,
  ShieldAlert,
  Sparkles,
  SwatchBook,
  Wind,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ToastMascot from "../components/ui/ToastMascot";
import {
  gooeyToast,
  useToasts,
  type ToastCloseButtonPosition,
  type ToastInput,
  type ToastOverflowStrategy,
  type ToastPosition,
  type ToastType,
  type ToastVisualStyle,
} from "../hooks/useToasts";

const defaultConfig: ToastInput = {
  type: "success",
  title: "Gourmet toast released",
  description: "Organic motion, queue awareness, and premium visuals are live.",
  showDescription: true,
  showAction: true,
  actionText: "Undo",
  actionSuccessText: "Recovered",
  theme: "light",
  visualStyle: "glassmorphic-aurora",
  fillColor: "#FFFFFF",
  borderColor: "#EBD8FF",
  borderWidth: 1.5,
  hasBorder: true,
  showProgress: true,
  showTimestamp: true,
  showCloseButton: true,
  closeButtonPosition: "top-right",
  closeOnEscape: true,
  duration: 5600,
  position: "bottom-right",
  variant: "expanded",
  squishDelay: 0,
  springBounceToggle: true,
  stiffness: 260,
  damping: 20,
  mass: 1,
  errorShake: true,
  rtl: false,
  pauseOnHover: true,
  swipeToDismiss: true,
};

const typeOptions: ToastType[] = [
  "default",
  "success",
  "error",
  "warning",
  "info",
  "loading",
];
const positionOptions: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];
const visualStyles: Array<{
  value: ToastVisualStyle;
  label: string;
  blurb: string;
}> = [
  {
    value: "classic",
    label: "Classic",
    blurb: "The strawberry-jam blob with clean semantic color accents.",
  },
  {
    value: "glassmorphic-aurora",
    label: "Aurora Glass",
    blurb: "Translucent depth, drifting highlight blooms, and soft chroma.",
  },
  {
    value: "glow-neon",
    label: "Glow Neon",
    blurb: "Dark HUD shell with vivid semantic glow and electric edges.",
  },
  {
    value: "liquid-cyberpunk",
    label: "Liquid Cyberpunk",
    blurb: "High-contrast shell with geometric streaks and a retro pulse.",
  },
];

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex items-center justify-between rounded-2xl border border-border-strong bg-white/90 px-3.5 py-3 text-left"
    >
      <span className="text-xs font-semibold text-text-2">{label}</span>
      <span
        className={`relative h-5 w-10 rounded-full transition-colors ${
          checked ? "bg-accent" : "bg-slate-200"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
  );
}

function Slider({
  label,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-2 rounded-2xl border border-border-strong bg-white/90 px-4 py-3">
      <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-[0.18em] text-text-3">
        <span>{label}</span>
        <span className="font-mono text-accent-2">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-accent"
      />
    </div>
  );
}

export default function PlaygroundPage() {
  const { addToast, queueConfig, setQueueConfig, dismissToasts } = useToasts();
  const location = useLocation();
  const [copied, setCopied] = useState(false);
  const [config, setConfig] = useState<ToastInput>(defaultConfig);

  useEffect(() => {
    const preset = location.state?.preset;
    if (!preset) {
      return;
    }

    setConfig((previous) => ({
      ...previous,
      ...preset,
      position: preset.position ?? previous.position,
      visualStyle: preset.visualStyle ?? previous.visualStyle,
      closeButtonPosition:
        preset.closeButtonPosition ?? previous.closeButtonPosition,
    }));

    addToast({
      type: "info",
      title: "Preset loaded",
      description: `Imported the "${preset.title || "toast"}" recipe into the lab.`,
      duration: 2800,
      visualStyle: "glassmorphic-aurora",
    });
  }, [addToast, location.state]);

  const queueStrategy = queueConfig.overflowStrategy;
  const mascotMood =
    config.visualStyle === "glow-neon"
      ? "focused"
      : config.type === "error"
        ? "sleepy"
        : config.type === "success"
          ? "excited"
          : "happy";

  const updateConfig = <K extends keyof ToastInput>(
    key: K,
    value: ToastInput[K],
  ) => {
    setConfig((previous) => ({ ...previous, [key]: value }));
  };

  const fireToast = () => addToast(config);

  const codeSnippet = `import { ToastProvider, gooeyToast } from 'toastyy';

<ToastProvider maxToasts={${queueConfig.maxToasts}} overflowStrategy="${queueStrategy}">
  <App />
</ToastProvider>

gooeyToast.${config.type}("${config.title}", {
  description: ${config.showDescription ? `"${config.description || ""}"` : "undefined"},
  visualStyle: "${config.visualStyle}",
  variant: "${config.variant}",
  position: "${config.position}",
  theme: "${config.theme}",
  fillColor: "${config.fillColor || ""}",
  borderColor: "${config.borderColor || ""}",
  borderWidth: ${config.borderWidth || 0},
  closeButtonPosition: "${config.closeButtonPosition}",
  rtl: ${Boolean(config.rtl)},
  pauseOnHover: ${Boolean(config.pauseOnHover)},
  swipeToDismiss: ${Boolean(config.swipeToDismiss)},
  showProgress: ${Boolean(config.showProgress)},
  showTimestamp: ${Boolean(config.showTimestamp)},
  stiffness: ${config.stiffness || 0},
  damping: ${config.damping || 0},
  mass: ${config.mass || 0},
});`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    gooeyToast.success("Snippet copied", {
      description: "The premium toast recipe is on the clipboard.",
      visualStyle: "glassmorphic-aurora",
      duration: 2200,
    });
    window.setTimeout(() => setCopied(false), 1800);
  };

  const setOverflowStrategy = (overflowStrategy: ToastOverflowStrategy) => {
    setQueueConfig({ overflowStrategy });
  };

  const quickPreset = (visualStyle: ToastVisualStyle) => {
    const presets: Record<ToastVisualStyle, Partial<ToastInput>> = {
      classic: {
        visualStyle,
        theme: "light",
        fillColor: "#FFFFFF",
        borderColor: "#E5E7EB",
      },
      "glassmorphic-aurora": {
        visualStyle,
        theme: "light",
        fillColor: "#FFFFFF",
        borderColor: "#EBD8FF",
      },
      "glow-neon": {
        visualStyle,
        theme: "dark",
        fillColor: "#07131E",
        borderColor: "#10B981",
      },
      "liquid-cyberpunk": {
        visualStyle,
        theme: "dark",
        fillColor: "#090914",
        borderColor: "#F97316",
      },
    };

    setConfig((previous) => ({
      ...previous,
      ...presets[visualStyle],
    }));
  };

  return (
    <div className="container-wide relative py-20 px-6">
      <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top,rgba(255,140,59,0.16),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 space-y-10">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-white/70 px-4 py-1.5 backdrop-blur-sm"
            >
              <Settings2 className="h-4 w-4 text-accent" />
              <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-accent-2">
                Premium motion lab
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="max-w-3xl text-4xl font-black tracking-tight text-text md:text-6xl"
            >
              Build the toast. Stress the queue. Export the exact recipe.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.14,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="max-w-2xl text-sm leading-7 text-text-2 md:text-base"
            >
              The lab now exposes queue overflow policy, dismiss-by-type
              filters, fill and border controls, close-button placement, tactile
              swipe behavior, and the three premium skins from the plan.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.65,
              delay: 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="glass rounded-[34px] border-accent/15 p-6 shadow-xl"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-text-3">
                  Live preview personality
                </p>
                <h2 className="mt-2 text-xl font-black text-text">
                  {config.visualStyle}
                </h2>
                <p className="mt-1 text-sm text-text-2">
                  {queueConfig.maxToasts} visible · {queueStrategy} overflow
                </p>
              </div>
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-[0_24px_60px_rgba(255,140,59,0.12)]">
                <div className="absolute inset-3 rounded-full bg-[radial-gradient(circle,rgba(255,140,59,0.18),transparent_70%)]" />
                <ToastMascot size={92} mood={mascotMood} interactive={true} />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <section className="rounded-[32px] border border-border-strong bg-white/80 p-6 shadow-xl backdrop-blur-sm">
              <div className="mb-5 flex items-center gap-2">
                <Layers3 className="h-4 w-4 text-accent" />
                <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-text-3">
                  Content and placement
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-xs font-bold text-text-2">Title</span>
                  <input
                    value={config.title}
                    onChange={(event) =>
                      updateConfig("title", event.target.value)
                    }
                    className="w-full rounded-2xl border border-border-strong bg-white px-4 py-3 text-sm font-semibold text-text outline-none transition focus:border-accent"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-bold text-text-2">
                    Action label
                  </span>
                  <input
                    value={config.actionText || ""}
                    onChange={(event) =>
                      updateConfig("actionText", event.target.value)
                    }
                    className="w-full rounded-2xl border border-border-strong bg-white px-4 py-3 text-sm font-semibold text-text outline-none transition focus:border-accent"
                  />
                </label>
              </div>

              <label className="mt-4 block space-y-2">
                <span className="text-xs font-bold text-text-2">
                  Description
                </span>
                <textarea
                  value={config.description || ""}
                  onChange={(event) =>
                    updateConfig("description", event.target.value)
                  }
                  rows={3}
                  className="w-full rounded-[24px] border border-border-strong bg-white px-4 py-3 text-sm font-semibold text-text outline-none transition focus:border-accent"
                />
              </label>

              <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                <Toggle
                  label="Show description"
                  checked={Boolean(config.showDescription)}
                  onChange={() =>
                    updateConfig("showDescription", !config.showDescription)
                  }
                />
                <Toggle
                  label="Show action"
                  checked={Boolean(config.showAction)}
                  onChange={() =>
                    updateConfig("showAction", !config.showAction)
                  }
                />
                <Toggle
                  label="Show timestamp"
                  checked={Boolean(config.showTimestamp)}
                  onChange={() =>
                    updateConfig("showTimestamp", !config.showTimestamp)
                  }
                />
                <Toggle
                  label="Close button"
                  checked={Boolean(config.showCloseButton)}
                  onChange={() =>
                    updateConfig("showCloseButton", !config.showCloseButton)
                  }
                />
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                <div>
                  <div className="mb-3 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-text-3">
                    <Sparkles className="h-3.5 w-3.5 text-accent-2" />
                    Semantic type
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {typeOptions.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => updateConfig("type", type)}
                        className={`rounded-2xl border px-3 py-2 text-[11px] font-black uppercase tracking-[0.18em] transition ${
                          config.type === type
                            ? "border-transparent bg-accent-gradient text-white shadow-sm"
                            : "border-border-strong bg-white text-text-2 hover:border-accent/40"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-text-3">
                    <Compass className="h-3.5 w-3.5 text-accent-2" />
                    Position
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {positionOptions.map((position) => (
                      <button
                        key={position}
                        type="button"
                        onClick={() => updateConfig("position", position)}
                        className={`rounded-2xl border px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] transition ${
                          config.position === position
                            ? "border-transparent bg-accent-gradient text-white shadow-sm"
                            : "border-border-strong bg-white text-text-2 hover:border-accent/40"
                        }`}
                      >
                        {position.replace(/-/g, " ")}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-[32px] border border-border-strong bg-white/80 p-6 shadow-xl backdrop-blur-sm">
              <div className="mb-5 flex items-center gap-2">
                <SwatchBook className="h-4 w-4 text-accent" />
                <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-text-3">
                  Premium skins and surfaces
                </span>
              </div>

              <div className="grid gap-3 lg:grid-cols-2">
                {visualStyles.map((style) => (
                  <button
                    key={style.value}
                    type="button"
                    onClick={() => quickPreset(style.value)}
                    className={`rounded-[26px] border p-4 text-left transition ${
                      config.visualStyle === style.value
                        ? "border-accent/40 bg-accent/5 shadow-[0_18px_40px_rgba(255,140,59,0.12)]"
                        : "border-border-strong bg-white hover:border-accent/30"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-black text-text">
                        {style.label}
                      </span>
                      <Palette className="h-4 w-4 text-accent-2" />
                    </div>
                    <p className="mt-2 text-xs leading-6 text-text-2">
                      {style.blurb}
                    </p>
                  </button>
                ))}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <label className="space-y-2">
                  <span className="text-xs font-bold text-text-2">
                    Surface fill
                  </span>
                  <input
                    type="color"
                    value={config.fillColor || "#FFFFFF"}
                    onChange={(event) =>
                      updateConfig("fillColor", event.target.value)
                    }
                    className="h-12 w-full rounded-2xl border border-border-strong bg-white p-1"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-bold text-text-2">
                    Border color
                  </span>
                  <input
                    type="color"
                    value={config.borderColor || "#EBD8FF"}
                    onChange={(event) =>
                      updateConfig("borderColor", event.target.value)
                    }
                    className="h-12 w-full rounded-2xl border border-border-strong bg-white p-1"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-bold text-text-2">
                    Theme mode
                  </span>
                  <select
                    value={config.theme}
                    onChange={(event) =>
                      updateConfig(
                        "theme",
                        event.target.value as ToastInput["theme"],
                      )
                    }
                    className="h-12 w-full rounded-2xl border border-border-strong bg-white px-4 text-sm font-semibold text-text"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="custom">Custom</option>
                  </select>
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-bold text-text-2">
                    Close button
                  </span>
                  <select
                    value={config.closeButtonPosition}
                    onChange={(event) =>
                      updateConfig(
                        "closeButtonPosition",
                        event.target.value as ToastCloseButtonPosition,
                      )
                    }
                    className="h-12 w-full rounded-2xl border border-border-strong bg-white px-4 text-sm font-semibold text-text"
                  >
                    <option value="top-right">Top right</option>
                    <option value="top-left">Top left</option>
                  </select>
                </label>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                <Toggle
                  label="RTL mode"
                  checked={Boolean(config.rtl)}
                  onChange={() => updateConfig("rtl", !config.rtl)}
                />
                <Toggle
                  label="Pause on hover"
                  checked={Boolean(config.pauseOnHover)}
                  onChange={() =>
                    updateConfig("pauseOnHover", !config.pauseOnHover)
                  }
                />
                <Toggle
                  label="Swipe dismiss"
                  checked={Boolean(config.swipeToDismiss)}
                  onChange={() =>
                    updateConfig("swipeToDismiss", !config.swipeToDismiss)
                  }
                />
                <Toggle
                  label="Error shake"
                  checked={Boolean(config.errorShake)}
                  onChange={() =>
                    updateConfig("errorShake", !config.errorShake)
                  }
                />
              </div>
            </section>

            <section className="rounded-[32px] border border-border-strong bg-white/80 p-6 shadow-xl backdrop-blur-sm">
              <div className="mb-5 flex items-center gap-2">
                <Wind className="h-4 w-4 text-accent" />
                <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-text-3">
                  Motion and queue policy
                </span>
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                <Slider
                  label="Border width"
                  min={0}
                  max={4}
                  step={0.5}
                  value={config.borderWidth || 0}
                  onChange={(value) => updateConfig("borderWidth", value)}
                />
                <Slider
                  label="Duration"
                  min={1800}
                  max={9000}
                  step={200}
                  value={config.duration || 0}
                  onChange={(value) => updateConfig("duration", value)}
                />
                <Slider
                  label="Stiffness"
                  min={120}
                  max={420}
                  step={10}
                  value={config.stiffness || 0}
                  onChange={(value) => updateConfig("stiffness", value)}
                />
                <Slider
                  label="Damping"
                  min={8}
                  max={36}
                  step={1}
                  value={config.damping || 0}
                  onChange={(value) => updateConfig("damping", value)}
                />
                <Slider
                  label="Mass"
                  min={0.5}
                  max={2.5}
                  step={0.1}
                  value={config.mass || 0}
                  onChange={(value) => updateConfig("mass", value)}
                />
                <Slider
                  label="Visible stack"
                  min={1}
                  max={6}
                  step={1}
                  value={queueConfig.maxToasts}
                  onChange={(value) => setQueueConfig({ maxToasts: value })}
                />
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <div className="rounded-[24px] border border-border-strong bg-white px-4 py-4">
                  <div className="mb-3 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-text-3">
                    <Filter className="h-3.5 w-3.5 text-accent-2" />
                    Overflow strategy
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {(
                      ["stack", "dismiss-oldest"] as ToastOverflowStrategy[]
                    ).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setOverflowStrategy(mode)}
                        className={`rounded-2xl border px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] transition ${
                          queueStrategy === mode
                            ? "border-transparent bg-accent-gradient text-white shadow-sm"
                            : "border-border-strong bg-white text-text-2 hover:border-accent/40"
                        }`}
                      >
                        {mode.replace(/-/g, " ")}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-[24px] border border-border-strong bg-white px-4 py-4">
                  <div className="mb-3 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-text-3">
                    <ShieldAlert className="h-3.5 w-3.5 text-accent-2" />
                    Dismiss filters
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => dismissToasts({ type: "error" })}
                      className="rounded-2xl border border-border-strong bg-white px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-text-2 transition hover:border-red-400 hover:text-red-500"
                    >
                      Clear errors
                    </button>
                    <button
                      type="button"
                      onClick={() => dismissToasts({ type: "loading" })}
                      className="rounded-2xl border border-border-strong bg-white px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-text-2 transition hover:border-amber-400 hover:text-amber-600"
                    >
                      Clear loading
                    </button>
                    <button
                      type="button"
                      onClick={() => dismissToasts({ type: config.type })}
                      className="rounded-2xl border border-border-strong bg-white px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-text-2 transition hover:border-accent hover:text-accent-2"
                    >
                      Clear current type
                    </button>
                    <button
                      type="button"
                      onClick={() => gooeyToast.dismiss()}
                      className="rounded-2xl border border-border-strong bg-white px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-text-2 transition hover:border-text hover:text-text"
                    >
                      Clear all
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-[32px] border border-border-strong bg-slate-950 p-6 text-white shadow-[0_30px_70px_rgba(15,23,42,0.24)]">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-slate-400">
                    Live code exporter
                  </p>
                  <h2 className="mt-2 text-xl font-black">
                    Gooey syntax + provider config
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              <div className="overflow-hidden rounded-[24px] border border-white/10 bg-black/20">
                <Editor
                  height="360px"
                  defaultLanguage="typescript"
                  theme="vs-dark"
                  value={codeSnippet}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 12,
                    lineNumbers: "off",
                    readOnly: true,
                    padding: { top: 18, bottom: 18 },
                    scrollBeyondLastLine: false,
                    wordWrap: "on",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                />
              </div>
            </section>

            <section className="rounded-[32px] border border-border-strong bg-white/85 p-6 shadow-xl backdrop-blur-sm">
              <div className="mb-5 flex items-center gap-2">
                <Code2 className="h-4 w-4 text-accent" />
                <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-text-3">
                  Runtime controls
                </span>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <button
                  type="button"
                  onClick={fireToast}
                  className="btn-primary justify-center py-4 text-xs uppercase tracking-[0.18em] shadow-accent"
                >
                  <Play className="h-4 w-4" />
                  Fire toast
                </button>
                <button
                  type="button"
                  onClick={() =>
                    gooeyToast.promise(
                      new Promise((resolve) =>
                        window.setTimeout(
                          () => resolve("Synced to queue"),
                          1600,
                        ),
                      ),
                      {
                        loading: {
                          title: "Baking in progress",
                          description:
                            "Monitoring the queue while the motion settles.",
                          visualStyle: config.visualStyle,
                          position: config.position,
                        },
                        success: (value) => ({
                          title: String(value),
                          description:
                            "Promise state resolved into a success toast.",
                          visualStyle: config.visualStyle,
                          position: config.position,
                        }),
                        error: {
                          title: "Promise failed",
                        },
                      },
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-[20px] border border-border-strong bg-white px-4 py-4 text-xs font-black uppercase tracking-[0.16em] text-text transition hover:border-accent/40 hover:text-accent-2"
                >
                  <Sparkles className="h-4 w-4" />
                  Run promise flow
                </button>
                <button
                  type="button"
                  onClick={() => quickPreset("glow-neon")}
                  className="inline-flex items-center justify-center gap-2 rounded-[20px] border border-border-strong bg-white px-4 py-4 text-xs font-black uppercase tracking-[0.16em] text-text transition hover:border-accent/40 hover:text-accent-2"
                >
                  <Palette className="h-4 w-4" />
                  Load neon skin
                </button>
                <button
                  type="button"
                  onClick={() => setConfig(defaultConfig)}
                  className="inline-flex items-center justify-center gap-2 rounded-[20px] border border-border-strong bg-white px-4 py-4 text-xs font-black uppercase tracking-[0.16em] text-text transition hover:border-accent/40 hover:text-accent-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset recipe
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
