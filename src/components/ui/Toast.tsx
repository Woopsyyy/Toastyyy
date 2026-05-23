import { motion } from "framer-motion";
import {
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
  X,
  Loader2,
  Sparkles,
  Bell,
} from "lucide-react";
import { useState, useEffect } from "react";

export type ToastType =
  | "default"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading"
  | "promise";

interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  showDescription?: boolean;
  showAction?: boolean;
  actionText?: string;
  customColor?: string;
  hasBorder?: boolean;
  bounce?: number;
  theme?: "light" | "dark";
  duration?: number;
  onClose: (id: string) => void;
  showProgress?: boolean;
  closeOnEscape?: boolean;
  showTimestamp?: boolean;
  showCloseButton?: boolean;
  variant?: "standard" | "expanded";
  squishDelay?: number;
  springBounceToggle?: boolean;
  stiffness?: number;
  damping?: number;
  mass?: number;
  errorShake?: boolean;
  titleDescriptionSimultaneous?: boolean;
}

const icons = {
  default: null,
  success: <CheckCircle2 className="w-5 h-5 text-success" />,
  error: <AlertCircle className="w-5 h-5 text-error" />,
  warning: <AlertTriangle className="w-5 h-5 text-warning" />,
  info: <Info className="w-5 h-5 text-info" />,
  loading: <Loader2 className="w-5 h-5 text-accent animate-spin" />,
  promise: <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />,
};

export default function Toast({
  id,
  type,
  title,
  description,
  showDescription = true,
  showAction = false,
  actionText = "Action",
  customColor,
  hasBorder = true,
  bounce = 0.4,
  theme = "light",
  duration = 5000,
  onClose,
  showProgress = true,
  closeOnEscape = false,
  showTimestamp = false,
  showCloseButton = true,
  variant = "standard",
  squishDelay = 0,
  springBounceToggle = true,
  stiffness = 260,
  damping = 20,
  mass = 1,
  errorShake = true,
  titleDescriptionSimultaneous = false,
}: ToastProps) {
  const [progress, setProgress] = useState(100);
  const [timestamp] = useState(() => {
    const now = new Date();
    return now.toTimeString().split(" ")[0];
  });

  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (remaining === 0) {
        clearInterval(timer);
        onClose(id);
      }
    }, 10);

    return () => clearInterval(timer);
  }, [id, duration, onClose]);

  useEffect(() => {
    if (!closeOnEscape) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose(id);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [id, closeOnEscape, onClose]);

  const isDark = theme === "dark";

  // Unified spring transition config
  const customTransition = springBounceToggle
    ? {
        type: "spring",
        stiffness: stiffness,
        damping: damping,
        mass: mass,
        delay: squishDelay / 1000,
      }
    : {
        type: "spring",
        bounce: bounce,
        duration: 0.6,
        delay: squishDelay / 1000,
      };

  // Morph spring behavior for layout size updates
  const layoutTransition = {
    type: "spring",
    stiffness: 280,
    damping: 18,
    mass: 0.8,
  };

  const fullTransition = {
    default: customTransition,
    layout: layoutTransition,
  };

  // Elastic blob squish entry configuration
  const entryInitial = {
    opacity: 0,
    y: 50,
    scaleX: 0.8,
    scaleY: 1.2,
    filter: "blur(10px)",
    x: 0,
  };

  const entryAnimate = {
    opacity: 1,
    y: 0,
    scaleX: [0.8, 1.15, 0.95, 1],
    scaleY: [1.2, 0.85, 1.05, 1],
    filter: "blur(0px)",
    x: errorShake && type === "error" ? [0, -12, 12, -8, 8, -4, 4, 0] : 0,
    transition: {
      ...customTransition,
      x:
        errorShake && type === "error"
          ? {
              duration: 0.4,
              delay: (squishDelay + 150) / 1000,
              ease: "easeInOut",
            }
          : undefined,
    },
  };

  // Premium Gooey Expanded Double-Bubble layout
  if (variant === "expanded") {
    let textColor = "text-warning";
    let iconElement = <AlertCircle className="w-4 h-4 text-warning" />;
    let progressBg = "bg-warning";

    if (type === "success") {
      textColor = "text-success";
      iconElement = <CheckCircle2 className="w-4 h-4 text-success" />;
      progressBg = "bg-success";
    } else if (type === "error") {
      textColor = "text-error";
      iconElement = <AlertCircle className="w-4 h-4 text-error" />;
      progressBg = "bg-error";
    } else if (type === "info") {
      textColor = "text-info";
      iconElement = <Info className="w-4 h-4 text-info" />;
      progressBg = "bg-info";
    } else if (type === "loading") {
      textColor = "text-accent";
      iconElement = <Loader2 className="w-4 h-4 text-accent animate-spin" />;
      progressBg = "bg-accent";
    } else if (type === "default") {
      textColor = "text-accent";
      iconElement = <Bell className="w-4 h-4 text-accent" />;
      progressBg = "bg-accent";
    }

    if (customColor) {
      textColor = "";
    }

    return (
      <motion.div
        layout
        initial={entryInitial}
        animate={entryAnimate}
        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
        transition={fullTransition}
        className="relative flex flex-col items-center pointer-events-auto group min-w-[340px] max-w-[420px]"
      >
        {/* SVG Gooey Filter definition */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="0"
          height="0"
          className="absolute pointer-events-none"
        >
          <defs>
            <filter id="gooey-toast">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="4"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>

        {/* Gooey Background shapes */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0"
          style={{ filter: "url(#gooey-toast)" }}
        >
          {/* Top small bubble BG */}
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-44 h-9 ${isDark ? "bg-[#12131a] border border-white/5" : "bg-white border border-black/[0.03]"} rounded-2xl shadow-sm`}
          />
          {/* Bottom large bubble BG */}
          <div
            className={`absolute bottom-0 left-0 right-0 top-[26px] ${isDark ? "bg-[#12131a] border border-white/5" : "bg-white border border-black/[0.03]"} rounded-[24px] shadow-lg`}
          />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 w-full flex flex-col items-center select-none">
          {/* Top Title/Icon Bar */}
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay:
                (squishDelay + (titleDescriptionSimultaneous ? 0 : 50)) / 1000,
            }}
            className="h-9 flex items-center justify-center gap-1.5 px-4"
          >
            {iconElement}
            <span
              className={`text-[11px] font-extrabold tracking-wide uppercase ${textColor}`}
              style={customColor ? { color: customColor } : undefined}
            >
              {title}
            </span>
          </motion.div>

          {/* Bottom Content Area */}
          <div className="w-full pt-1 pb-4 px-5 flex items-center justify-between gap-4 mt-2">
            <div className="flex-1 min-w-0">
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay:
                    (squishDelay + (titleDescriptionSimultaneous ? 0 : 150)) /
                    1000,
                }}
                className={`text-xs font-semibold leading-relaxed ${isDark ? "text-white/80" : "text-text-2"}`}
              >
                {description || "System warning active."}
              </motion.p>
              {showAction && actionText && (
                <div className="mt-2">
                  <button
                    onClick={() => onClose(id)}
                    className="px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider bg-accent text-white hover:opacity-90 transition-opacity"
                    style={
                      customColor ? { backgroundColor: customColor } : undefined
                    }
                  >
                    {actionText}
                  </button>
                </div>
              )}
            </div>

            {showTimestamp && (
              <span className="text-[10px] font-bold text-text-3 font-mono flex-shrink-0">
                {timestamp}
              </span>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        {showProgress && (
          <div className="absolute bottom-0 left-4 right-4 h-1 bg-surface-2 rounded-full overflow-hidden z-20">
            <motion.div
              className={`h-full ${progressBg}`}
              style={customColor ? { backgroundColor: customColor } : undefined}
              initial={{ width: "100%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        )}

        {/* Close Button */}
        {showCloseButton && (
          <button
            onClick={() => onClose(id)}
            className="absolute top-[32px] right-3.5 p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-surface-2 transition-all duration-200 z-30"
          >
            <X className="w-3.5 h-3.5 text-text-3" />
          </button>
        )}
      </motion.div>
    );
  }

  const containerClasses = `toast group ${isDark ? "!bg-[#12131a] !text-white !border-white/10 shadow-xl shadow-black/30" : ""} ${hasBorder === false ? "!border-transparent" : ""}`;

  return (
    <motion.div
      layout
      initial={entryInitial}
      animate={entryAnimate}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={fullTransition}
      className={containerClasses}
      style={
        customColor && hasBorder !== false
          ? { borderColor: customColor }
          : undefined
      }
    >
      <div className="flex gap-3 w-full items-start">
        {icons[type] && (
          <div className="mt-0.5 flex-shrink-0">{icons[type]}</div>
        )}

        <div className="flex-1 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay:
                (squishDelay + (titleDescriptionSimultaneous ? 0 : 50)) / 1000,
            }}
            className="flex items-center gap-1.5 flex-wrap"
          >
            {showTimestamp && (
              <span className="text-[10px] font-bold text-text-3 font-mono">
                [{timestamp}]
              </span>
            )}
            <h4 className="text-sm font-semibold truncate">{title}</h4>
          </motion.div>
          {showDescription && description && (
            <motion.p
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay:
                  (squishDelay + (titleDescriptionSimultaneous ? 0 : 150)) /
                  1000,
              }}
              className={`mt-1 text-xs leading-relaxed line-clamp-2 ${isDark ? "text-white/60" : "text-text-2"}`}
            >
              {description}
            </motion.p>
          )}
          {showAction && actionText && (
            <div className="mt-2">
              <button
                onClick={() => onClose(id)}
                className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-accent text-white hover:opacity-90 transition-opacity"
                style={
                  customColor ? { backgroundColor: customColor } : undefined
                }
              >
                {actionText}
              </button>
            </div>
          )}
        </div>

        {showCloseButton && (
          <button
            onClick={() => onClose(id)}
            className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-surface-2 transition-all duration-200"
          >
            <X className="w-4 h-4 text-text-3" />
          </button>
        )}
      </div>

      {showProgress && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-surface-2">
          <motion.div
            className="h-full bg-brand-500"
            style={customColor ? { backgroundColor: customColor } : undefined}
            initial={{ width: "100%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
      )}
    </motion.div>
  );
}
