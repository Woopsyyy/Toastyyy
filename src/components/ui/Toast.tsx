import { animate, motion, useMotionValue } from "framer-motion";
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  CheckCircle2,
  Info,
  Loader2,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ToastType } from "../../hooks/useToasts";
import type { ToastTheme } from "../../lib/toastTheme";
import { resolveToastVisuals } from "./toastVisuals";

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
  theme?: ToastTheme;
  duration?: number;
  onClose: (id: string) => void;
  showProgress?: boolean;
  closeOnEscape?: boolean;
  showTimestamp?: boolean;
  showCloseButton?: boolean;
  variant?: "standard" | "expanded";
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  squishDelay?: number;
  springBounceToggle?: boolean;
  stiffness?: number;
  damping?: number;
  mass?: number;
  preset?: "smooth" | "bouncy" | "subtle" | "snappy";
  errorShake?: boolean;
}

const STANDARD_TEXT_DELAY_MS = 140;
const LOADING_EXPANDED_DELAY_MS = 650;

function morphPathCenterRaw(
  pw: number,
  bw: number,
  th: number,
  t: number,
  align: "left" | "right" | "center" = "right",
) {
  const PH = 36;
  const pr = PH / 2; // 18
  const pillW = Math.min(pw, bw);

  // Determine pill offset based on alignment mode
  const pillOffset =
    align === "left" ? 0 : align === "right" ? bw - pillW : (bw - pillW) / 2;

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

  if (align === "right") {
    const bodyLeft = (bw - pillW) * (1 - t);
    const qLeftX = Math.max(bodyLeft + cr, pillOffset - curve);
    return [
      `M ${pillOffset},${pr}`,
      `A ${pr},${pr} 0 0 1 ${pillOffset + pr},0`,
      `H ${bw - pr}`,
      `A ${pr},${pr} 0 0 1 ${bw},${pr}`,
      `L ${bw},${bodyH - cr}`,
      `A ${cr},${cr} 0 0 1 ${bw - cr},${bodyH}`,
      `H ${bodyLeft + cr}`,
      `A ${cr},${cr} 0 0 1 ${bodyLeft},${bodyH - cr}`,
      `L ${bodyLeft},${bodyTop + curve + cr}`,
      `A ${cr},${cr} 0 0 1 ${bodyLeft + cr},${bodyTop + curve}`,
      `H ${qLeftX}`,
      `Q ${pillOffset},${bodyTop + curve} ${pillOffset},${bodyTop}`,
      `Z`,
    ].join(" ");
  }

  if (align === "left") {
    const bodyRight = pillW + (bw - pillW) * t;
    const qRightX = Math.min(bodyRight - cr, pillW + curve);
    return [
      `M 0,${pr}`,
      `A ${pr},${pr} 0 0 1 ${pr},0`,
      `H ${pillW - pr}`,
      `A ${pr},${pr} 0 0 1 ${pillW},${pr}`,
      `L ${pillW},${bodyTop}`,
      `Q ${pillW},${bodyTop + curve} ${qRightX},${bodyTop + curve}`,
      `H ${bodyRight - cr}`,
      `A ${cr},${cr} 0 0 1 ${bodyRight},${bodyTop + curve + cr}`,
      `L ${bodyRight},${bodyH - cr}`,
      `A ${cr},${cr} 0 0 1 ${bodyRight - cr},${bodyH}`,
      `H ${cr}`,
      `A ${cr},${cr} 0 0 1 0,${bodyH - cr}`,
      `L 0,${pr}`,
      `Z`,
    ].join(" ");
  }

  // Symmetrical Center Alignment
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
  position = "bottom-right",
  variant = "standard",
  squishDelay = 0,
  springBounceToggle = true,
  stiffness = 260,
  damping = 20,
  mass = 1,
  preset,
  errorShake = true,
}: ToastProps) {
  const isExpandedVariant = variant === "expanded";
  const hasDescription = Boolean(showDescription && description);
  const hasExpandedBody = hasDescription || showAction || showTimestamp;

  const align: "left" | "right" | "center" =
    position === "bottom-center"
      ? "center"
      : "left";

  // Resolve spring presets matching 'goey-toast' physics
  let stiffnessVal = stiffness;
  let dampingVal = damping;
  let massVal = mass;

  if (preset) {
    switch (preset) {
      case "smooth":
        stiffnessVal = 240;
        dampingVal = 26;
        massVal = 1.0;
        break;
      case "bouncy":
        stiffnessVal = 300;
        dampingVal = 15;
        massVal = 1.0;
        break;
      case "subtle":
        stiffnessVal = 220;
        dampingVal = 28;
        massVal = 0.9;
        break;
      case "snappy":
        stiffnessVal = 380;
        dampingVal = 24;
        massVal = 0.8;
        break;
    }
  }

  const [progress, setProgress] = useState(100);
  const [expandedOpen, setExpandedOpen] = useState(false);
  const [timestamp] = useState(() => {
    const now = new Date();
    return now.toTimeString().split(" ")[0];
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const previousTypeRef = useRef(type);

  const [dims, setDims] = useState({ pw: 160, bw: 340, th: 110 });
  const dimsRef = useRef(dims);
  dimsRef.current = dims;

  const morphProgress = useMotionValue(0);
  const [currentPath, setCurrentPath] = useState(() =>
    morphPathCenterRaw(160, 340, 110, 0, align),
  );
  const [revealDescription, setRevealDescription] = useState(false);

  useEffect(() => {
    if (!isExpandedVariant) return;
    const path = morphPathCenterRaw(
      dims.pw,
      dims.bw,
      dims.th,
      morphProgress.get(),
      align,
    );
    setCurrentPath(path);
  }, [dims, isExpandedVariant, morphProgress, align]);

  useEffect(() => {
    if (!isExpandedVariant) return;

    const measure = () => {
      if (titleRef.current && bodyRef.current && containerRef.current) {
        const pw = Math.max(120, titleRef.current.offsetWidth + 40); // extra padding for premium look
        const bw = Math.max(340, bodyRef.current.offsetWidth);
        const th = Math.max(
          expandedOpen ? 95 : 36,
          containerRef.current.offsetHeight,
        );
        setDims({ pw, bw, th });
      }
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [
    description,
    expandedOpen,
    isExpandedVariant,
    showAction,
    showTimestamp,
    title,
  ]);

  useEffect(() => {
    if (!isExpandedVariant) return;

    const controls = animate(morphProgress, expandedOpen ? 1 : 0, {
      type: "spring",
      stiffness: springBounceToggle ? stiffnessVal : 280,
      damping: springBounceToggle ? dampingVal : 18,
      mass: springBounceToggle ? massVal : 0.8,
      onUpdate: (latest) => {
        const path = morphPathCenterRaw(
          dimsRef.current.pw,
          dimsRef.current.bw,
          dimsRef.current.th,
          latest,
          align,
        );
        setCurrentPath(path);
      },
    });
    return () => controls.stop();
  }, [
    dampingVal,
    expandedOpen,
    isExpandedVariant,
    massVal,
    morphProgress,
    springBounceToggle,
    stiffnessVal,
    align,
  ]);

  useEffect(() => {
    setProgress(100);
    const startTime = Date.now();
    const timer = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (remaining === 0) {
        window.clearInterval(timer);
        onClose(id);
      }
    }, 50);

    return () => window.clearInterval(timer);
  }, [duration, id, onClose]);

  useEffect(() => {
    if (!isExpandedVariant) {
      setExpandedOpen(false);
      setRevealDescription(false);
      previousTypeRef.current = type;
      return;
    }

    const wasLoading = previousTypeRef.current === "loading";
    previousTypeRef.current = type;

    if (!hasExpandedBody) {
      setExpandedOpen(false);
      setRevealDescription(false);
      return;
    }

    // Always start collapsed & hide description initially for a clean sequential sequence
    setExpandedOpen(false);
    setRevealDescription(false);

    let expandTimer: number;
    let revealTimer: number;

    if (type === "loading") {
      expandTimer = window.setTimeout(() => {
        setExpandedOpen(true);
        revealTimer = window.setTimeout(() => {
          if (hasDescription) {
            setRevealDescription(true);
          }
        }, 150); // slight offset to allow expansion slide to begin
      }, LOADING_EXPANDED_DELAY_MS);
    } else {
      // Let the title pill show first, then slide/expand the toast background
      expandTimer = window.setTimeout(
        () => {
          setExpandedOpen(true);
          revealTimer = window.setTimeout(() => {
            if (hasDescription) {
              setRevealDescription(true);
            }
          }, 120); // starts emerging as the morph expands down
        },
        wasLoading ? 180 : 500,
      ); // 500ms delay gives time for title to mount and settle
    }

    return () => {
      window.clearTimeout(expandTimer);
      window.clearTimeout(revealTimer);
    };
  }, [hasDescription, hasExpandedBody, isExpandedVariant, type]);

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

  const entryTransition = springBounceToggle
    ? {
        type: "spring",
        stiffness: stiffnessVal,
        damping: dampingVal,
        mass: massVal,
        delay: squishDelay / 1000,
      }
    : {
        type: "spring",
        bounce,
        duration: 0.45,
        delay: squishDelay / 1000,
      };

  const layoutTransition = {
    type: "spring",
    stiffness: 280,
    damping: 18,
    mass: 0.8,
  };

  const bodyTransition = {
    type: "spring" as const,
    stiffness: springBounceToggle ? stiffnessVal : 280,
    damping: springBounceToggle ? dampingVal : 18,
    mass: springBounceToggle ? massVal : 0.8,
  };

  const standardEntryInitial = {
    opacity: 0,
    y: 24,
    scale: 0.96,
    x: 0,
  };

  const standardEntryAnimate = {
    opacity: 1,
    y: 0,
    scale: 1,
    x: errorShake && type === "error" ? [0, -10, 10, -6, 6, 0] : 0,
    transition: {
      ...entryTransition,
      x:
        errorShake && type === "error"
          ? {
              duration: 0.34,
              delay: (squishDelay + 120) / 1000,
              ease: "easeInOut",
            }
          : undefined,
    },
  };

  const expandedEntryInitial = {
    opacity: 0,
    y: 32,
    scale: 0.92,
    x: 0,
    width: dims.pw,
  };

  const expandedEntryAnimate = {
    opacity: 1,
    y: 0,
    scale: 1,
    x: errorShake && type === "error" ? [0, -10, 10, -6, 6, 0] : 0,
    width: expandedOpen ? dims.bw : dims.pw,
    transition: {
      ...entryTransition,
      width: bodyTransition,
      x:
        errorShake && type === "error"
          ? {
              duration: 0.34,
              delay: (squishDelay + 120) / 1000,
              ease: "easeInOut",
            }
          : undefined,
    },
  };

  const {
    cardBg,
    strokeColor,
    titleColor,
    descriptionColor,
    progressColor,
    progressTrackColor,
    closeColor,
    iconColor,
    timestampColor,
    baseTextColor,
    shadow,
  } = resolveToastVisuals({
    theme,
    customColor,
    type,
  });

  const renderIcon = (sizeClass: string) => {
    const iconStyle = { color: iconColor };
    switch (type) {
      case "success":
        return <CheckCircle2 className={sizeClass} style={iconStyle} />;
      case "error":
        return <AlertCircle className={sizeClass} style={iconStyle} />;
      case "warning":
        return <AlertTriangle className={sizeClass} style={iconStyle} />;
      case "info":
        return <Info className={sizeClass} style={iconStyle} />;
      case "loading":
        return (
          <Loader2 className={`${sizeClass} animate-spin`} style={iconStyle} />
        );
      case "promise":
        return (
          <Sparkles
            className={`${sizeClass} animate-pulse`}
            style={iconStyle}
          />
        );
      case "default":
      default:
        if (isExpandedVariant) {
          return <Bell className={sizeClass} style={iconStyle} />;
        }
        return null;
    }
  };

  const titleAnimationDelay = (squishDelay + 50) / 1000;
  const descriptionAnimationDelay = (squishDelay + 140) / 1000;
  const contentKey = `${type}-${title}-${description ?? ""}-${showAction ? actionText : ""}`;

  if (isExpandedVariant) {
    return (
      <motion.div
        ref={containerRef}
        layout
        initial={expandedEntryInitial}
        animate={expandedEntryAnimate}
        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
        transition={{
          default: entryTransition,
          layout: layoutTransition,
        }}
        className="relative flex flex-col items-center pointer-events-auto group max-w-[420px]"
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

        <div className="relative z-10 w-full flex flex-col items-center select-none">
          <motion.div
            key={`header-${contentKey}`}
            ref={headerRef}
            initial={{
              opacity: 0,
              y: -4,
              width: dims.pw,
              ...(align === "left"
                ? { left: 0 }
                : { left: "50%", x: "-50%" }),
            }}
            animate={{
              opacity: 1,
              y: 0,
              width: dims.pw,
              ...(align === "left"
                ? { left: 0 }
                : { left: "50%", x: "-50%" }),
            }}
            transition={{
              width: bodyTransition,
              left: bodyTransition,
              right: bodyTransition,
              x: bodyTransition,
              default: { duration: 0.28, delay: titleAnimationDelay },
            }}
            className="absolute top-0 h-9 flex items-center justify-center overflow-hidden z-20"
          >
            <div
              ref={titleRef}
              className={`flex items-center gap-1.5 whitespace-nowrap h-full w-full ${
                align === "center"
                  ? "justify-center px-4"
                  : "justify-start px-5"
              }`}
            >
              {renderIcon("w-4 h-4")}
              <span
                className="text-[11px] font-extrabold tracking-wide uppercase"
                style={{ color: titleColor }}
              >
                {title}
              </span>
            </div>
          </motion.div>

          <motion.div
            ref={bodyRef}
            layout
            animate={{
              height: expandedOpen ? "auto" : 0,
              opacity: expandedOpen ? 1 : 0,
              scale: expandedOpen ? 1 : 0.92,
            }}
            transition={bodyTransition}
            className="w-full overflow-hidden mt-9"
          >
            <div className="w-[340px] max-w-full pt-1 pb-4 px-5 flex items-center justify-between gap-4 mt-2">
              <div className="flex-1 min-w-0">
                {hasDescription && revealDescription && (
                  <motion.p
                    key={`expanded-description-${contentKey}`}
                    initial={{ opacity: 0, y: -16 }} // slide down from the toast title
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 160,
                      damping: 14,
                    }}
                    className="text-xs font-semibold leading-relaxed"
                    style={{ color: descriptionColor }}
                  >
                    {description}
                  </motion.p>
                )}
                {showAction && actionText && (
                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={() => onClose(id)}
                      className="px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider bg-accent text-white hover:opacity-90 transition-opacity"
                    >
                      {actionText}
                    </button>
                  </div>
                )}
              </div>

              {showTimestamp && (
                <span
                  className="text-[10px] font-bold font-mono flex-shrink-0"
                  style={{ color: timestampColor }}
                >
                  {timestamp}
                </span>
              )}
            </div>
          </motion.div>
        </div>

        {showProgress && expandedOpen && (
          <div
            className="absolute bottom-0 left-4 right-4 h-1 rounded-full overflow-hidden z-20"
            style={{ backgroundColor: progressTrackColor }}
          >
            <motion.div
              className="h-full"
              style={{ backgroundColor: progressColor }}
              initial={{ width: "100%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        )}

        {showCloseButton && expandedOpen && (
          <button
            type="button"
            onClick={() => onClose(id)}
            className="absolute top-[32px] right-3.5 p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:opacity-100 transition-all duration-200 z-30"
            style={{ color: closeColor }}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={standardEntryInitial}
      animate={standardEntryAnimate}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{
        default: entryTransition,
        layout: layoutTransition,
      }}
      className={`toast group ${hasBorder ? "" : "!border-transparent"}`}
      style={{
        backgroundColor: cardBg,
        borderColor: strokeColor,
        color: baseTextColor,
        boxShadow: shadow,
      }}
    >
      <div className="flex gap-3 w-full items-start">
        {renderIcon("w-5 h-5") && (
          <div className="mt-0.5 flex-shrink-0">{renderIcon("w-5 h-5")}</div>
        )}

        <div className="flex-1 min-w-0">
          <motion.div
            key={`title-${contentKey}`}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: titleAnimationDelay }}
            className="flex items-center gap-1.5 flex-wrap"
          >
            {showTimestamp && (
              <span
                className="text-[10px] font-bold font-mono"
                style={{ color: timestampColor }}
              >
                [{timestamp}]
              </span>
            )}
            <h4
              className="text-sm font-semibold truncate"
              style={{ color: titleColor }}
            >
              {title}
            </h4>
          </motion.div>
          {hasDescription && (
            <motion.p
              key={`description-${contentKey}`}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: descriptionAnimationDelay }}
              className="mt-1 text-xs leading-relaxed line-clamp-2"
              style={{ color: descriptionColor }}
            >
              {description}
            </motion.p>
          )}
          {showAction && actionText && (
            <div className="mt-2">
              <button
                type="button"
                onClick={() => onClose(id)}
                className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-accent text-white hover:opacity-90 transition-opacity"
              >
                {actionText}
              </button>
            </div>
          )}
        </div>

        {showCloseButton && (
          <button
            type="button"
            onClick={() => onClose(id)}
            className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:opacity-100 transition-all duration-200"
            style={{ color: closeColor }}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showProgress && (
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ backgroundColor: progressTrackColor }}
        >
          <motion.div
            className="h-full"
            style={{ backgroundColor: progressColor }}
            initial={{ width: "100%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
      )}
    </motion.div>
  );
}
