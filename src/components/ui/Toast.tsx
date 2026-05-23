import { motion, useMotionValue, animate } from "framer-motion";
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
import { useState, useEffect, useRef } from "react";

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
  theme?: "light" | "dark" | "custom";
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

function morphPathCenterRaw(pw: number, bw: number, th: number, t: number) {
  const PH = 36;
  const pr = PH / 2; // 18
  const pillW = Math.min(pw, bw);
  const pillOffset = (bw - pillW) / 2;
  if (t <= 0 || PH + (th - PH) * t - PH < 8) {
    return [
      `M ${pillOffset},${pr}`,
      `A ${pr},${pr} 0 0 1 ${pillOffset + pr},0`,
      `H ${pillOffset + pillW - pr}`,
      `A ${pr},${pr} 0 0 1 ${pillOffset + pillW},${pr}`,
      `A ${pr},${pr} 0 0 1 ${pillOffset + pillW - pr},${PH}`,
      `H ${pillOffset + pr}`,
      `A ${pr},${pr} 0 0 1 ${pillOffset},${pr}`,
      `Z`,
    ].join(" ");
  }
  const bodyH = PH + (th - PH) * t;
  const curve = 14 * t;
  const cr = Math.min(16, (bodyH - PH) * 0.45);
  const bodyTop = PH - curve;
  const bodyCenter = bw / 2;
  const halfBodyW = pillW / 2 + ((bw - pillW) / 2) * t;
  const bodyLeft = bodyCenter - halfBodyW;
  const bodyRight = bodyCenter + halfBodyW;
  const qLeftX = Math.max(bodyLeft + cr, pillOffset - curve);
  const qRightX = Math.min(bodyRight - cr, pillOffset + pillW + curve);
  return [
    `M ${pillOffset},${pr}`,
    `A ${pr},${pr} 0 0 1 ${pillOffset + pr},0`,
    `H ${pillOffset + pillW - pr}`,
    `A ${pr},${pr} 0 0 1 ${pillOffset + pillW},${pr}`,
    `L ${pillOffset + pillW},${bodyTop}`,
    `Q ${pillOffset + pillW},${bodyTop + curve} ${qRightX},${bodyTop + curve}`,
    `H ${bodyRight - cr}`,
    `A ${cr},${cr} 0 0 1 ${bodyRight},${bodyTop + curve + cr}`,
    `L ${bodyRight},${bodyH - cr}`,
    `A ${cr},${cr} 0 0 1 ${bodyRight - cr},${bodyH}`,
    `H ${bodyLeft + cr}`,
    `A ${cr},${cr} 0 0 1 ${bodyLeft},${bodyH - cr}`,
    `L ${bodyLeft},${bodyTop + curve + cr}`,
    `A ${cr},${cr} 0 0 1 ${bodyLeft + cr},${bodyTop + curve}`,
    `H ${qLeftX}`,
    `Q ${pillOffset},${bodyTop + curve} ${pillOffset},${bodyTop}`,
    `Z`,
  ].join(" ");
}

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
  const [isExpanded, setIsExpanded] = useState(false);
  const [typeWasLoading, setTypeWasLoading] = useState(type === "loading");
  const [timestamp] = useState(() => {
    const now = new Date();
    return now.toTimeString().split(" ")[0];
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const [dims, setDims] = useState({ pw: 160, bw: 340, th: 110 });
  const dimsRef = useRef(dims);
  dimsRef.current = dims;

  const morphProgress = useMotionValue(0);
  const [currentPath, setCurrentPath] = useState(() =>
    morphPathCenterRaw(160, 340, 110, 0),
  );
  const [revealDescription, setRevealDescription] = useState(
    type !== "loading",
  );

  // Sync path when dimensions update and animation is idle
  useEffect(() => {
    if (variant !== "expanded") return;
    const path = morphPathCenterRaw(
      dims.pw,
      dims.bw,
      dims.th,
      morphProgress.get(),
    );
    setCurrentPath(path);
  }, [dims, variant, morphProgress]);

  // Measure dimensions dynamically using a ResizeObserver on the wrapper
  useEffect(() => {
    if (variant !== "expanded") return;
    const measure = () => {
      if (headerRef.current && bodyRef.current && containerRef.current) {
        const pw = Math.max(120, headerRef.current.offsetWidth + 32); // Safe min width for title pill
        const bw = Math.max(340, bodyRef.current.offsetWidth); // Safe min width for body wrapper
        const th = Math.max(
          isExpanded ? 95 : 36,
          containerRef.current.offsetHeight,
        ); // Safe height min-bounds
        setDims({ pw, bw, th });
      }
    };
    measure();
    const resizeObserver = new ResizeObserver(measure);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [variant, isExpanded, title, description]);

  // Spring morph the mathematical path coordinates
  useEffect(() => {
    if (variant !== "expanded") return;
    const controls = animate(morphProgress, isExpanded ? 1 : 0, {
      type: "spring",
      stiffness: springBounceToggle ? stiffness : 280,
      damping: springBounceToggle ? damping : 18,
      mass: springBounceToggle ? mass : 0.8,
      onUpdate: (latest) => {
        const path = morphPathCenterRaw(
          dimsRef.current.pw,
          dimsRef.current.bw,
          dimsRef.current.th,
          latest,
        );
        setCurrentPath(path);
      },
    });
    return () => controls.stop();
  }, [
    isExpanded,
    variant,
    springBounceToggle,
    stiffness,
    damping,
    mass,
    morphProgress,
  ]);

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
    if (type === "loading") {
      setIsExpanded(false);
      setRevealDescription(false);
      setTypeWasLoading(true);
      if (showDescription && description) {
        const timer = setTimeout(() => {
          setIsExpanded(true);
          setRevealDescription(true);
        }, 1500); // Give 1.5s compact spinner pill state first
        return () => clearTimeout(timer);
      }
    } else {
      setRevealDescription(true);
      const delay = typeWasLoading ? 300 : 600;
      const timer = setTimeout(() => {
        setIsExpanded(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [type, typeWasLoading, showDescription, description]);

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

  // Dynamic style mapping: background and foreground per theme + type
  const getStyles = () => {
    // ── Card background ──────────────────────────────────────────────────────
    let cardBg: string;
    let strokeColor: string;

    if (theme === "light") {
      // Light: always white card
      cardBg = "#ffffff";
      strokeColor = "rgba(0,0,0,0.06)";
    } else if (theme === "custom") {
      // Custom: use the brand color picker value as the background
      cardBg = customColor || "#ff8c3b";
      strokeColor = "rgba(255,255,255,0.15)";
    } else {
      // Dark (default): charcoal card for all types
      cardBg = "#12131a";
      strokeColor = "rgba(255,255,255,0.08)";
    }

    // ── Foreground base: derived from background luminance ────────────────────
    const isLightBg = cardBg === "#ffffff";
    // For custom, do a quick luminance check so white text works on dark brand colors
    // and dark text works on light brand colors
    const isCustomLightBg =
      theme === "custom" &&
      customColor != null &&
      parseInt(customColor.slice(1), 16) > 0xaaaaaa;

    const useDarkText = isLightBg || isCustomLightBg;

    let titleColor = useDarkText ? "text-[#12131a]" : "text-white";
    const descColor = useDarkText ? "text-[#12131a]/75" : "text-white/70";
    let progressBg = useDarkText ? "bg-[#12131a]" : "bg-white";
    const closeBtnColor = useDarkText
      ? "text-[#12131a]/60 hover:bg-black/5"
      : "text-white/60 hover:bg-white/10";
    let iconColor = useDarkText ? "text-[#12131a]" : "text-white";

    // ── Semantic title + icon overrides (applied on top of base) ─────────────
    // These always win regardless of theme so the user can always identify type
    switch (type) {
      case "success":
        titleColor = "text-success";
        iconColor = "text-success";
        progressBg = "bg-success";
        break;
      case "error":
        titleColor = "text-error";
        iconColor = "text-error";
        progressBg = "bg-error";
        break;
      case "warning":
        titleColor = "text-warning";
        iconColor = "text-warning";
        progressBg = "bg-warning";
        break;
      case "info":
        titleColor = "text-info";
        iconColor = "text-info";
        progressBg = "bg-info";
        break;
      case "loading":
        // Spinner color matches theme contrast
        titleColor = useDarkText ? "text-accent" : "text-white";
        iconColor = useDarkText ? "text-accent" : "text-white";
        progressBg = useDarkText ? "bg-accent" : "bg-white";
        break;
      case "promise":
        titleColor = "text-purple-400";
        iconColor = "text-purple-400";
        progressBg = "bg-purple-400";
        break;
      default:
        // Default type: keep the base (no semantic override)
        break;
    }

    return {
      cardBg,
      strokeColor,
      titleColor,
      descColor,
      progressBg,
      closeBtnColor,
      iconColor,
    };
  };

  const {
    cardBg,
    strokeColor,
    titleColor,
    descColor,
    progressBg,
    closeBtnColor,
    iconColor,
  } = getStyles();

  // Helper to render the appropriate Lucide icon with dynamic color and size
  const renderIcon = (sizeClass: string, colorClass: string) => {
    const iconProps = { className: `${sizeClass} ${colorClass}` };
    switch (type) {
      case "success":
        return <CheckCircle2 {...iconProps} />;
      case "error":
        return <AlertCircle {...iconProps} />;
      case "warning":
        return <AlertTriangle {...iconProps} />;
      case "info":
        return <Info {...iconProps} />;
      case "loading":
        return (
          <Loader2 className={`${sizeClass} animate-spin ${colorClass}`} />
        );
      case "promise":
        return (
          <Sparkles className={`${sizeClass} animate-pulse ${colorClass}`} />
        );
      case "default":
      default:
        if (variant === "expanded") {
          return <Bell {...iconProps} />;
        }
        return null;
    }
  };

  // Premium Gooey Expanded Double-Bubble layout
  if (variant === "expanded") {
    return (
      <motion.div
        ref={containerRef}
        layout
        initial={entryInitial}
        animate={entryAnimate}
        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
        transition={fullTransition}
        className="relative flex flex-col items-center pointer-events-auto group min-w-[340px] max-w-[420px]"
      >
        {/* Crisp, Sharp Organic Morphing Bezier SVG Background */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-visible"
          style={{
            filter:
              "drop-shadow(0 8px 30px rgba(0,0,0,0.16)) drop-shadow(0 2px 8px rgba(0,0,0,0.08))",
          }}
        >
          <path
            d={currentPath}
            fill={cardBg}
            stroke={strokeColor}
            strokeWidth={hasBorder ? 1.5 : 0}
          />
        </svg>

        {/* Foreground Content */}
        <div className="relative z-10 w-full flex flex-col items-center select-none">
          {/* Top Title/Icon Bar */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay:
                (squishDelay + (titleDescriptionSimultaneous ? 0 : 50)) / 1000,
            }}
            className="h-9 flex items-center justify-center gap-1.5 px-4"
          >
            {renderIcon("w-4 h-4", iconColor)}
            <span
              className={`text-[11px] font-extrabold tracking-wide uppercase ${titleColor}`}
            >
              {title}
            </span>
          </motion.div>

          {/* Bottom Content Area */}
          <motion.div
            ref={bodyRef}
            layout
            animate={{
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0,
              scale: isExpanded ? 1 : 0.8,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 22,
            }}
            className="w-full overflow-hidden"
          >
            <div className="w-full pt-1 pb-4 px-5 flex items-center justify-between gap-4 mt-2">
              <div className="flex-1 min-w-0">
                {revealDescription && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay:
                        (squishDelay +
                          (titleDescriptionSimultaneous ? 0 : 150)) /
                        1000,
                    }}
                    className={`text-xs font-semibold leading-relaxed ${descColor}`}
                  >
                    {description || "System warning active."}
                  </motion.p>
                )}
                {showAction && actionText && (
                  <div className="mt-2">
                    <button
                      onClick={() => onClose(id)}
                      className="px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider bg-accent text-white hover:opacity-90 transition-opacity"
                      style={
                        customColor
                          ? { backgroundColor: customColor }
                          : undefined
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
          </motion.div>
        </div>

        {/* Progress Bar */}
        {showProgress && isExpanded && (
          <div className="absolute bottom-0 left-4 right-4 h-1 bg-white/10 rounded-full overflow-hidden z-20">
            <motion.div
              className={`h-full ${progressBg}`}
              initial={{ width: "100%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        )}

        {/* Close Button */}
        {showCloseButton && isExpanded && (
          <button
            onClick={() => onClose(id)}
            className={`absolute top-[32px] right-3.5 p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 z-30 ${closeBtnColor}`}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </motion.div>
    );
  }

  // isBgDark mirrors the same logic used inside getStyles()
  const isBgDark = cardBg !== "#ffffff";

  return (
    <motion.div
      layout
      initial={entryInitial}
      animate={entryAnimate}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={fullTransition}
      className={`toast group ${hasBorder === false ? "!border-transparent" : ""}`}
      style={{
        backgroundColor: cardBg,
        borderColor: strokeColor,
        color: isBgDark ? "#ffffff" : "#12131a",
        boxShadow: isBgDark
          ? "0 10px 40px rgba(0,0,0,0.22)"
          : "0 10px 40px rgba(0,0,0,0.10)",
      }}
    >
      <div className="flex gap-3 w-full items-start">
        {renderIcon("w-5 h-5", iconColor) && (
          <div className="mt-0.5 flex-shrink-0">
            {renderIcon("w-5 h-5", iconColor)}
          </div>
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
            <h4 className={`text-sm font-semibold truncate ${titleColor}`}>
              {title}
            </h4>
          </motion.div>
          {showDescription && description && revealDescription && (
            <motion.p
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay:
                  (squishDelay + (titleDescriptionSimultaneous ? 0 : 150)) /
                  1000,
              }}
              className={`mt-1 text-xs leading-relaxed line-clamp-2 ${descColor}`}
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
            className={`p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 ${closeBtnColor}`}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showProgress && (
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{
            background: isBgDark
              ? "rgba(255,255,255,0.18)"
              : "rgba(0,0,0,0.07)",
          }}
        >
          <motion.div
            className={`h-full ${progressBg}`}
            initial={{ width: "100%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
      )}
    </motion.div>
  );
}
