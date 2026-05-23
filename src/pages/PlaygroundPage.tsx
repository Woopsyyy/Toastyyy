import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Editor from "@monaco-editor/react";
import {
  Sparkles,
  Terminal,
  Zap,
  Clock,
  Settings,
  Play,
  Wind,
  Sliders,
  Palette,
  Compass,
  Eye,
  Maximize2,
  RotateCcw,
  Settings2,
  Code2,
  Check,
  Copy,
} from "lucide-react";
import { useToasts } from "../hooks/useToasts";
import ToastMascot from "../components/ui/ToastMascot";

type ToastType =
  | "default"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading"
  | "promise";
type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export default function PlaygroundPage() {
  const { addToast } = useToasts();
  const location = useLocation();

  const [showCode, setShowCode] = useState(true);
  const [copied, setCopied] = useState(false);

  const [config, setConfig] = useState({
    title: "Gourmet Toast Ready",
    description: "Crispy edges with a perfect layer of butter.",
    showDescription: true,
    showAction: false,
    actionText: "Undo",
    customColor: "#ff8c3b",
    hasBorder: true,
    bounce: 0.4,
    theme: "light" as "light" | "dark",
    showProgress: true,
    closeOnEscape: false,
    showTimestamp: false,
    showCloseButton: true,
    position: "bottom-right" as ToastPosition,
    type: "success" as ToastType,
    variant: "standard" as "standard" | "expanded",
    squishDelay: 0,
    springBounceToggle: true,
    stiffness: 260,
    damping: 20,
    mass: 1.0,
    errorShake: true,
    titleDescriptionSimultaneous: false,
  });

  // Hydrate preset from route state when coming from examples configure click
  useEffect(() => {
    if (location.state?.preset) {
      const preset = location.state.preset;
      setConfig({
        title: preset.title || "Gourmet Toast Ready",
        description: preset.description || "",
        showDescription: preset.showDescription ?? true,
        showAction: preset.showAction ?? false,
        actionText: preset.actionText || "Undo",
        customColor: preset.customColor || "#ff8c3b",
        hasBorder: preset.hasBorder ?? true,
        bounce: preset.bounce ?? 0.4,
        theme: preset.theme || "light",
        showProgress: preset.showProgress ?? true,
        closeOnEscape: preset.closeOnEscape ?? false,
        showTimestamp: preset.showTimestamp ?? false,
        showCloseButton: preset.showCloseButton ?? true,
        position: preset.position || "bottom-right",
        type: preset.type || "default",
        variant: preset.variant || "standard",
        squishDelay: preset.squishDelay ?? 0,
        springBounceToggle: preset.springBounceToggle ?? true,
        stiffness: preset.stiffness ?? 260,
        damping: preset.damping ?? 20,
        mass: preset.mass ?? 1.0,
        errorShake: preset.errorShake ?? true,
        titleDescriptionSimultaneous:
          preset.titleDescriptionSimultaneous ?? false,
      });

      // Notify user of loaded recipe
      addToast({
        type: "info",
        title: "Recipe Loaded!",
        description: `Successfully loaded preset parameters for "${preset.title}".`,
        duration: 3000,
      });
    }
  }, [location.state, addToast]);

  const handleFire = () => {
    addToast({
      type: config.type,
      title: config.title,
      description: config.description,
      showDescription: config.showDescription,
      showAction: config.showAction,
      actionText: config.actionText,
      customColor: config.customColor,
      hasBorder: config.hasBorder,
      bounce: config.bounce,
      theme: config.theme,
      showProgress: config.showProgress,
      closeOnEscape: config.closeOnEscape,
      showTimestamp: config.showTimestamp,
      showCloseButton: config.showCloseButton,
      position: config.position,
      variant: config.variant,
      squishDelay: config.squishDelay,
      springBounceToggle: config.springBounceToggle,
      stiffness: config.stiffness,
      damping: config.damping,
      mass: config.mass,
      errorShake: config.errorShake,
      titleDescriptionSimultaneous: config.titleDescriptionSimultaneous,
    });
  };

  const getMascotMood = () => {
    if (config.theme === "dark") return "sleepy";
    switch (config.type) {
      case "success":
        return "excited";
      case "error":
        return "sleepy";
      case "warning":
        return "focused";
      case "info":
      default:
        return "happy";
    }
  };

  const codeSnippet = `import { toast } from 'toastyy'

toast.${config.type}('${config.title}', {
  description: ${config.showDescription ? `'${config.description}'` : "undefined"},
  variant: '${config.variant}',
  position: '${config.position}',
  theme: '${config.theme}',
  showProgress: ${config.showProgress},
  closeOnEscape: ${config.closeOnEscape},
  showTimestamp: ${config.showTimestamp},
  showCloseButton: ${config.showCloseButton},
  hasBorder: ${config.hasBorder},
  bounce: ${config.bounce},
  customColor: '${config.customColor}',
  showAction: ${config.showAction},
  actionText: '${config.actionText}',
  squishDelay: ${config.squishDelay},
  springBounceToggle: ${config.springBounceToggle},
  stiffness: ${config.stiffness},
  damping: ${config.damping},
  mass: ${config.mass},
  errorShake: ${config.errorShake},
  titleDescriptionSimultaneous: ${config.titleDescriptionSimultaneous}
})`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    addToast({
      type: "success",
      title: "Copied Config!",
      description: "The code is ready to paste.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container-wide py-24 px-6 relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 select-none">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center text-accent">
              <Settings2 className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-extrabold text-accent-2 uppercase tracking-widest">
              Tactile Playground
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl lg:text-5xl font-extrabold tracking-tight text-text mb-4"
          >
            Notification{" "}
            <span className="gradient-text-warm font-black">Sandbox</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-text-2 text-sm md:text-base leading-relaxed"
          >
            Tweak custom spring parameters, accent boundaries, mascot moods, and
            behavior rules. Adjust variables on the left and see code outputs
            generated instantly.
          </motion.p>
        </div>
      </div>

      {/* Side by Side 2-Column Cockpit Layout */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Parameters Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-border-strong rounded-[28px] shadow-xl p-6 space-y-6">
            <div className="flex justify-center py-4 bg-surface-2 rounded-2xl border border-border-strong/50 select-none">
              <ToastMascot
                size={120}
                mood={getMascotMood()}
                interactive={true}
              />
            </div>

            {/* Content Parameters */}
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 select-none">
                <Sliders className="w-3.5 h-3.5 text-accent-2" />
                <span className="text-[10px] font-extrabold text-text-2 uppercase tracking-wider">
                  Content Parameters
                </span>
              </div>
              <div className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold text-text-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={config.title}
                    onChange={(e) =>
                      setConfig((prev) => ({ ...prev, title: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 bg-white border border-border-strong rounded-xl text-xs text-text focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-semibold"
                  />
                </div>

                <div className="space-y-1.5 bg-white border border-border-strong p-3.5 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-extrabold text-text-2">
                      Show Description
                    </label>
                    <button
                      onClick={() =>
                        setConfig((prev) => ({
                          ...prev,
                          showDescription: !prev.showDescription,
                        }))
                      }
                      className={`w-9 h-5 rounded-full relative flex items-center p-0.5 transition-colors duration-300 ${config.showDescription ? "bg-accent" : "bg-gray-200"}`}
                    >
                      <div
                        className={`w-3.5 h-3.5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${config.showDescription ? "translate-x-4" : "translate-x-0"}`}
                      />
                    </button>
                  </div>
                  {config.showDescription && (
                    <textarea
                      value={config.description}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      rows={2}
                      className="w-full mt-2 px-3 py-2 bg-surface-2 border border-border-strong rounded-xl text-xs text-text focus:outline-none focus:border-accent transition-all resize-none font-semibold leading-relaxed"
                    />
                  )}
                </div>

                <div className="space-y-1.5 bg-white border border-border-strong p-3.5 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-extrabold text-text-2">
                      Show Action Button
                    </label>
                    <button
                      onClick={() =>
                        setConfig((prev) => ({
                          ...prev,
                          showAction: !prev.showAction,
                        }))
                      }
                      className={`w-9 h-5 rounded-full relative flex items-center p-0.5 transition-colors duration-300 ${config.showAction ? "bg-accent" : "bg-gray-200"}`}
                    >
                      <div
                        className={`w-3.5 h-3.5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${config.showAction ? "translate-x-4" : "translate-x-0"}`}
                      />
                    </button>
                  </div>
                  {config.showAction && (
                    <input
                      type="text"
                      value={config.actionText}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          actionText: e.target.value,
                        }))
                      }
                      className="w-full mt-2 px-3 py-2 bg-surface-2 border border-border-strong rounded-xl text-xs text-text focus:outline-none focus:border-accent transition-all font-semibold"
                      placeholder="Button label..."
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Appearance Settings */}
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 select-none">
                <Sparkles className="w-3.5 h-3.5 text-accent-2" />
                <span className="text-[10px] font-extrabold text-text-2 uppercase tracking-wider">
                  Appearance Type
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {(
                  [
                    "default",
                    "success",
                    "error",
                    "warning",
                    "info",
                    "loading",
                  ] as ToastType[]
                ).map((type) => (
                  <button
                    key={type}
                    onClick={() => setConfig((prev) => ({ ...prev, type }))}
                    className={`px-2.5 py-2 rounded-xl border text-[10px] font-bold capitalize transition-all ${config.type === type ? "bg-accent-gradient border-transparent text-white shadow-sm" : "bg-white border-border-strong text-text-2 hover:border-accent/40"}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Viewport Position */}
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 select-none">
                <Compass className="w-3.5 h-3.5 text-accent-2" />
                <span className="text-[10px] font-extrabold text-text-2 uppercase tracking-wider">
                  Viewport Position
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {(
                  [
                    "top-left",
                    "top-right",
                    "bottom-left",
                    "bottom-center",
                    "bottom-right",
                  ] as ToastPosition[]
                ).map((pos) => (
                  <button
                    key={pos}
                    onClick={() =>
                      setConfig((prev) => ({ ...prev, position: pos }))
                    }
                    className={`px-2 py-2 rounded-xl border text-[10px] font-bold transition-all ${config.position === pos ? "bg-accent-gradient border-transparent text-white shadow-sm" : "bg-white border-border-strong text-text-2 hover:border-accent/40"}`}
                  >
                    {pos.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Accent Style config */}
            <div className="space-y-4 bg-white border border-border-strong p-4 rounded-2xl shadow-sm">
              <div className="flex items-center gap-1.5 select-none pb-2 border-b border-border-strong">
                <Palette className="w-3.5 h-3.5 text-accent-2" />
                <span className="text-[10px] font-extrabold text-text-2 uppercase tracking-wider">
                  Accent Style
                </span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-text-2">
                  Toast Brand Color
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-text-3 uppercase tracking-wider font-mono">
                    {config.customColor}
                  </span>
                  <input
                    type="color"
                    value={config.customColor}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        customColor: e.target.value,
                      }))
                    }
                    className="w-8 h-8 rounded-full border border-border-strong cursor-pointer overflow-hidden p-0 bg-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border-strong/50">
                <span className="text-xs font-bold text-text-2">
                  Theme Mode
                </span>
                <div className="flex bg-surface-2 p-0.5 rounded-lg border border-border-strong select-none">
                  {(["light", "dark"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() =>
                        setConfig((prev) => ({ ...prev, theme: t }))
                      }
                      className={`px-3 py-1 rounded-md text-[10px] font-black capitalize transition-all ${config.theme === t ? "bg-white text-accent shadow-sm" : "text-text-3"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Spring Physics Config */}
            <div className="space-y-4">
              <div className="flex items-center justify-between select-none">
                <div className="flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-accent-2" />
                  <span className="text-[10px] font-extrabold text-text-2 uppercase tracking-wider">
                    Spring Physics
                  </span>
                </div>
                <button
                  onClick={() =>
                    setConfig((prev) => ({
                      ...prev,
                      springBounceToggle: !prev.springBounceToggle,
                    }))
                  }
                  className={`w-9 h-5 rounded-full relative flex items-center p-0.5 transition-colors duration-300 ${config.springBounceToggle ? "bg-accent" : "bg-gray-200"}`}
                >
                  <div
                    className={`w-3.5 h-3.5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${config.springBounceToggle ? "translate-x-4" : "translate-x-0"}`}
                  />
                </button>
              </div>

              {config.springBounceToggle ? (
                <div className="space-y-4.5 bg-white border border-border-strong p-4 rounded-xl shadow-sm">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-extrabold text-text-2">
                      <span>Stiffness</span>
                      <span className="text-accent-2 font-mono">
                        {config.stiffness}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="500"
                      step="10"
                      value={config.stiffness}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          stiffness: parseInt(e.target.value),
                        }))
                      }
                      className="w-full accent-accent"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-extrabold text-text-2">
                      <span>Damping</span>
                      <span className="text-accent-2 font-mono">
                        {config.damping}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="40"
                      step="1"
                      value={config.damping}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          damping: parseInt(e.target.value),
                        }))
                      }
                      className="w-full accent-accent"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-extrabold text-text-2">
                      <span>Mass</span>
                      <span className="text-accent-2 font-mono">
                        {config.mass.toFixed(1)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="3.0"
                      step="0.1"
                      value={config.mass}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          mass: parseFloat(e.target.value),
                        }))
                      }
                      className="w-full accent-accent"
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-border-strong p-3.5 rounded-xl shadow-sm">
                  <div className="flex justify-between text-[11px] font-extrabold text-text-2 mb-2">
                    <span>Bounce Coefficient</span>
                    <span className="text-accent-2 font-mono">
                      {config.bounce.toFixed(2)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.00"
                    max="0.90"
                    step="0.05"
                    value={config.bounce}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        bounce: parseFloat(e.target.value),
                      }))
                    }
                    className="w-full accent-accent"
                  />
                </div>
              )}

              {/* Squish Delay */}
              <div className="space-y-1.5 bg-white border border-border-strong p-3.5 rounded-xl shadow-sm">
                <div className="flex justify-between text-[11px] font-extrabold text-text-2">
                  <span>Squish Delay</span>
                  <span className="text-accent-2 font-mono">
                    {config.squishDelay}ms
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="50"
                  value={config.squishDelay}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      squishDelay: parseInt(e.target.value),
                    }))
                  }
                  className="w-full accent-accent"
                />
              </div>
            </div>

            {/* Additional Features */}
            <div className="space-y-3 bg-white border border-border-strong p-4 rounded-2xl shadow-sm">
              <div className="flex items-center gap-1.5 select-none pb-2 border-b border-border-strong">
                <Eye className="w-3.5 h-3.5 text-accent-2" />
                <span className="text-[10px] font-extrabold text-text-2 uppercase tracking-wider">
                  Features & Behavior
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-text-2">
                  Draw Outer Border
                </span>
                <button
                  onClick={() =>
                    setConfig((prev) => ({
                      ...prev,
                      hasBorder: !prev.hasBorder,
                    }))
                  }
                  className={`w-9 h-5 rounded-full relative flex items-center p-0.5 transition-colors duration-300 ${config.hasBorder ? "bg-accent" : "bg-gray-200"}`}
                >
                  <div
                    className={`w-3.5 h-3.5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${config.hasBorder ? "translate-x-4" : "translate-x-0"}`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border-strong/40">
                <span className="text-xs font-bold text-text-2">
                  Progress Bar
                </span>
                <button
                  onClick={() =>
                    setConfig((prev) => ({
                      ...prev,
                      showProgress: !prev.showProgress,
                    }))
                  }
                  className={`w-9 h-5 rounded-full relative flex items-center p-0.5 transition-colors duration-300 ${config.showProgress ? "bg-accent" : "bg-gray-200"}`}
                >
                  <div
                    className={`w-3.5 h-3.5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${config.showProgress ? "translate-x-4" : "translate-x-0"}`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border-strong/40">
                <span className="text-xs font-bold text-text-2">
                  Close on Escape Key
                </span>
                <button
                  onClick={() =>
                    setConfig((prev) => ({
                      ...prev,
                      closeOnEscape: !prev.closeOnEscape,
                    }))
                  }
                  className={`w-9 h-5 rounded-full relative flex items-center p-0.5 transition-colors duration-300 ${config.closeOnEscape ? "bg-accent" : "bg-gray-200"}`}
                >
                  <div
                    className={`w-3.5 h-3.5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${config.closeOnEscape ? "translate-x-4" : "translate-x-0"}`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border-strong/40">
                <span className="text-xs font-bold text-text-2">
                  Show Timestamp
                </span>
                <button
                  onClick={() =>
                    setConfig((prev) => ({
                      ...prev,
                      showTimestamp: !prev.showTimestamp,
                    }))
                  }
                  className={`w-9 h-5 rounded-full relative flex items-center p-0.5 transition-colors duration-300 ${config.showTimestamp ? "bg-accent" : "bg-gray-200"}`}
                >
                  <div
                    className={`w-3.5 h-3.5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${config.showTimestamp ? "translate-x-4" : "translate-x-0"}`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border-strong/40">
                <span className="text-xs font-bold text-text-2">
                  Show Close Button (X)
                </span>
                <button
                  onClick={() =>
                    setConfig((prev) => ({
                      ...prev,
                      showCloseButton: !prev.showCloseButton,
                    }))
                  }
                  className={`w-9 h-5 rounded-full relative flex items-center p-0.5 transition-colors duration-300 ${config.showCloseButton ? "bg-accent" : "bg-gray-200"}`}
                >
                  <div
                    className={`w-3.5 h-3.5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${config.showCloseButton ? "translate-x-4" : "translate-x-0"}`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border-strong/40">
                <span className="text-xs font-bold text-text-2">
                  Shake on Error
                </span>
                <button
                  onClick={() =>
                    setConfig((prev) => ({
                      ...prev,
                      errorShake: !prev.errorShake,
                    }))
                  }
                  className={`w-9 h-5 rounded-full relative flex items-center p-0.5 transition-colors duration-300 ${config.errorShake ? "bg-accent" : "bg-gray-200"}`}
                >
                  <div
                    className={`w-3.5 h-3.5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${config.errorShake ? "translate-x-4" : "translate-x-0"}`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border-strong/40">
                <span className="text-xs font-bold text-text-2">
                  Simultaneous Text Entry
                </span>
                <button
                  onClick={() =>
                    setConfig((prev) => ({
                      ...prev,
                      titleDescriptionSimultaneous:
                        !prev.titleDescriptionSimultaneous,
                    }))
                  }
                  className={`w-9 h-5 rounded-full relative flex items-center p-0.5 transition-colors duration-300 ${config.titleDescriptionSimultaneous ? "bg-accent" : "bg-gray-200"}`}
                >
                  <div
                    className={`w-3.5 h-3.5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${config.titleDescriptionSimultaneous ? "translate-x-4" : "translate-x-0"}`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border-strong/40">
                <span className="text-xs font-bold text-text-2">
                  Gooey Expanded Style
                </span>
                <button
                  onClick={() =>
                    setConfig((prev) => ({
                      ...prev,
                      variant:
                        prev.variant === "expanded" ? "standard" : "expanded",
                    }))
                  }
                  className={`w-9 h-5 rounded-full relative flex items-center p-0.5 transition-colors duration-300 ${config.variant === "expanded" ? "bg-accent" : "bg-gray-200"}`}
                >
                  <div
                    className={`w-3.5 h-3.5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${config.variant === "expanded" ? "translate-x-4" : "translate-x-0"}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Monaco Exporter + Fire Trigger */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          <div className="bg-white border border-border-strong rounded-[28px] shadow-xl overflow-hidden flex flex-col h-[calc(100vh-160px)] min-h-[500px]">
            <div className="px-6 py-4 border-b border-border-strong flex items-center justify-between bg-surface-2 select-none">
              <div className="flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-accent" />
                <span className="text-sm font-extrabold text-text uppercase tracking-wider">
                  Live Code Exporter
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg hover:bg-border-strong text-text-3 hover:text-accent transition-all"
                  title="Copy Code"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-accent" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Monaco Editor Container */}
            <div className="flex-1 min-h-0 bg-white relative border-b border-border-strong">
              <Editor
                height="100%"
                defaultLanguage="typescript"
                theme="vs"
                value={codeSnippet}
                options={{
                  minimap: { enabled: false },
                  fontSize: 12,
                  lineNumbers: "on",
                  readOnly: true,
                  padding: { top: 16, bottom: 16 },
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                  fontFamily: "JetBrains Mono, monospace",
                }}
              />
            </div>

            {/* Execute Controls */}
            <div className="p-6 bg-surface-2 flex flex-col gap-2.5 select-none">
              <button
                onClick={handleFire}
                className="btn-primary w-full py-4 justify-center shadow-accent text-xs font-black uppercase tracking-wider"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Bake & Fire Toast
              </button>
              <button
                onClick={() =>
                  setConfig({
                    title: "Gourmet Toast Ready",
                    description: "Crispy edges with a perfect layer of butter.",
                    showDescription: true,
                    showAction: false,
                    actionText: "Undo",
                    customColor: "#ff8c3b",
                    hasBorder: true,
                    bounce: 0.4,
                    theme: "light",
                    showProgress: true,
                    closeOnEscape: false,
                    showTimestamp: false,
                    showCloseButton: true,
                    position: "bottom-right",
                    type: "success",
                    variant: "standard",
                    squishDelay: 0,
                    springBounceToggle: true,
                    stiffness: 260,
                    damping: 20,
                    mass: 1.0,
                    errorShake: true,
                    titleDescriptionSimultaneous: false,
                  })
                }
                className="flex items-center justify-center gap-1.5 text-[9px] font-extrabold text-text-3 hover:text-accent-2 transition-colors uppercase tracking-widest py-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Recipe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
