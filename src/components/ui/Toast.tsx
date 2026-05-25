import { animate, motion, type PanInfo, useMotionValue } from "framer-motion";
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
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type {
  ToastDismissReason,
  ToastItem,
  ToastType,
} from "../../hooks/useToasts";
import { resolveToastVisuals } from "./toastVisuals";

interface ToastProps extends ToastItem {
  onClose: (id: string, reason?: ToastDismissReason) => void;
}

type AlignMode = "left" | "right" | "center";
type ToastVisualState =
  | "entering"
  | "expanded"
  | "hover-expanded"
  | "collapsing"
  | "collapsed"
  | "swiping"
  | "dismissing"
  | "removed";

const EXPANDED_BODY_WIDTH = 360;
const STANDARD_TEXT_DELAY_MS = 140;
const LOADING_EXPANDED_DELAY_MS = 580;

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

function morphPathCenterRaw(
  pillWidth: number,
  bodyWidth: number,
  totalHeight: number,
  progress: number,
  align: AlignMode,
) {
  const pillHeight = 36;
  const pillRadius = pillHeight / 2;
  const safePillWidth = Math.min(pillWidth, bodyWidth);
  const pillOffset =
    align === "left"
      ? 0
      : align === "right"
        ? bodyWidth - safePillWidth
        : (bodyWidth - safePillWidth) / 2;

  if (
    progress <= 0 ||
    pillHeight + (totalHeight - pillHeight) * progress - pillHeight < 8
  ) {
    return [
      `M ${pillOffset},${pillRadius}`,
      `A ${pillRadius},${pillRadius} 0 0 1 ${pillOffset + pillRadius},0`,
      `H ${pillOffset + safePillWidth - pillRadius}`,
      `A ${pillRadius},${pillRadius} 0 0 1 ${pillOffset + safePillWidth},${pillRadius}`,
      `A ${pillRadius},${pillRadius} 0 0 1 ${pillOffset + safePillWidth - pillRadius},${pillHeight}`,
      `H ${pillOffset + pillRadius}`,
      `A ${pillRadius},${pillRadius} 0 0 1 ${pillOffset},${pillRadius}`,
      "Z",
    ].join(" ");
  }

  const bodyHeight = pillHeight + (totalHeight - pillHeight) * progress;
  const curve = 14 * progress;
  const cornerRadius = Math.min(16, (bodyHeight - pillHeight) * 0.45);
  const bodyTop = pillHeight - curve;

  if (align === "right") {
    const bodyLeft = (bodyWidth - safePillWidth) * (1 - progress);
    const quadraticLeftX = Math.max(
      bodyLeft + cornerRadius,
      pillOffset - curve,
    );
    return [
      `M ${pillOffset},${pillRadius}`,
      `A ${pillRadius},${pillRadius} 0 0 1 ${pillOffset + pillRadius},0`,
      `H ${bodyWidth - pillRadius}`,
      `A ${pillRadius},${pillRadius} 0 0 1 ${bodyWidth},${pillRadius}`,
      `L ${bodyWidth},${bodyHeight - cornerRadius}`,
      `A ${cornerRadius},${cornerRadius} 0 0 1 ${bodyWidth - cornerRadius},${bodyHeight}`,
      `H ${bodyLeft + cornerRadius}`,
      `A ${cornerRadius},${cornerRadius} 0 0 1 ${bodyLeft},${bodyHeight - cornerRadius}`,
      `L ${bodyLeft},${bodyTop + curve + cornerRadius}`,
      `A ${cornerRadius},${cornerRadius} 0 0 1 ${bodyLeft + cornerRadius},${bodyTop + curve}`,
      `H ${quadraticLeftX}`,
      `Q ${pillOffset},${bodyTop + curve} ${pillOffset},${bodyTop}`,
      "Z",
    ].join(" ");
  }

  if (align === "left") {
    const bodyRight = safePillWidth + (bodyWidth - safePillWidth) * progress;
    const quadraticRightX = Math.min(
      bodyRight - cornerRadius,
      safePillWidth + curve,
    );
    return [
      `M 0,${pillRadius}`,
      `A ${pillRadius},${pillRadius} 0 0 1 ${pillRadius},0`,
      `H ${safePillWidth - pillRadius}`,
      `A ${pillRadius},${pillRadius} 0 0 1 ${safePillWidth},${pillRadius}`,
      `L ${safePillWidth},${bodyTop}`,
      `Q ${safePillWidth},${bodyTop + curve} ${quadraticRightX},${bodyTop + curve}`,
      `H ${bodyRight - cornerRadius}`,
      `A ${cornerRadius},${cornerRadius} 0 0 1 ${bodyRight},${bodyTop + curve + cornerRadius}`,
      `L ${bodyRight},${bodyHeight - cornerRadius}`,
      `A ${cornerRadius},${cornerRadius} 0 0 1 ${bodyRight - cornerRadius},${bodyHeight}`,
      `H ${cornerRadius}`,
      `A ${cornerRadius},${cornerRadius} 0 0 1 0,${bodyHeight - cornerRadius}`,
      `L 0,${pillRadius}`,
      "Z",
    ].join(" ");
  }

  const bodyCenter = bodyWidth / 2;
  const halfBodyWidth =
    safePillWidth / 2 + ((bodyWidth - safePillWidth) / 2) * progress;
  const bodyLeft = bodyCenter - halfBodyWidth;
  const bodyRight = bodyCenter + halfBodyWidth;
  const quadraticLeftX = Math.max(bodyLeft + cornerRadius, pillOffset - curve);
  const quadraticRightX = Math.min(
    bodyRight - cornerRadius,
    pillOffset + safePillWidth + curve,
  );

  return [
    `M ${pillOffset},${pillRadius}`,
    `A ${pillRadius},${pillRadius} 0 0 1 ${pillOffset + pillRadius},0`,
    `H ${pillOffset + safePillWidth - pillRadius}`,
    `A ${pillRadius},${pillRadius} 0 0 1 ${pillOffset + safePillWidth},${pillRadius}`,
    `L ${pillOffset + safePillWidth},${bodyTop}`,
    `Q ${pillOffset + safePillWidth},${bodyTop + curve} ${quadraticRightX},${bodyTop + curve}`,
    `H ${bodyRight - cornerRadius}`,
    `A ${cornerRadius},${cornerRadius} 0 0 1 ${bodyRight},${bodyTop + curve + cornerRadius}`,
    `L ${bodyRight},${bodyHeight - cornerRadius}`,
    `A ${cornerRadius},${cornerRadius} 0 0 1 ${bodyRight - cornerRadius},${bodyHeight}`,
    `H ${bodyLeft + cornerRadius}`,
    `A ${cornerRadius},${cornerRadius} 0 0 1 ${bodyLeft},${bodyHeight - cornerRadius}`,
    `L ${bodyLeft},${bodyTop + curve + cornerRadius}`,
    `A ${cornerRadius},${cornerRadius} 0 0 1 ${bodyLeft + cornerRadius},${bodyTop + curve}`,
    `H ${quadraticLeftX}`,
    `Q ${pillOffset},${bodyTop + curve} ${pillOffset},${bodyTop}`,
    "Z",
  ].join(" ");
}

function getAlignMode(
  position: ToastProps["position"],
  rtl: boolean,
): AlignMode {
  const baseAlign: AlignMode = position?.endsWith("right")
    ? "right"
    : position?.endsWith("center")
      ? "center"
      : "left";

  if (!rtl) {
    return baseAlign;
  }

  if (baseAlign === "left") {
    return "right";
  }

  if (baseAlign === "right") {
    return "left";
  }

  return "center";
}

function renderVisualOverlay(
  visualStyle: ToastProps["visualStyle"],
  accentColor: string,
  highlightColor: string,
  isDarkSurface: boolean,
) {
  if (visualStyle === "glassmorphic-aurora") {
    return (
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          background:
            "radial-gradient(circle at 15% 20%, rgba(255,255,255,0.7), transparent 32%), radial-gradient(circle at 80% 10%, rgba(56,189,248,0.38), transparent 28%), radial-gradient(circle at 75% 78%, rgba(244,114,182,0.32), transparent 34%)",
        }}
        animate={{ rotate: [0, 5, -4, 0], scale: [1, 1.03, 0.99, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    );
  }

  if (visualStyle === "glow-neon") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.08), transparent 28%), linear-gradient(135deg, rgba(15,23,42,0.1), transparent 55%)",
          boxShadow: `inset 0 0 0 1px ${highlightColor}, inset 0 0 24px ${accentColor}22`,
        }}
      />
    );
  }

  if (visualStyle === "liquid-cyberpunk") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-95"
        style={{
          background: `linear-gradient(120deg, rgba(255,255,255,${
            isDarkSurface ? "0.02" : "0.08"
          }) 0%, transparent 24%), repeating-linear-gradient(135deg, transparent 0 10px, ${highlightColor} 10px 12px)`,
        }}
      />
    );
  }

  return null;
}

export default function Toast({
  id,
  type,
  title,
  description,
  showDescription = true,
  showAction = false,
  actionText = "Action",
  actionSuccessText,
  customColor,
  fillColor,
  borderColor,
  borderWidth = 1.5,
  hasBorder = true,
  bounce = 0.4,
  theme = "light",
  visualStyle = "classic",
  classNames,
  duration = 5000,
  onClose,
  showProgress = true,
  closeOnEscape = false,
  showTimestamp = false,
  showCloseButton = true,
  closeButtonPosition = "top-right",
  position = "bottom-right",
  variant = "standard",
  squishDelay = 0,
  springBounceToggle = true,
  stiffness = 260,
  damping = 20,
  mass = 1,
  preset,
  errorShake = true,
  rtl = false,
  pauseOnHover = true,
  swipeToDismiss = true,
}: ToastProps) {
  const svgId = useId().replace(/:/g, "");
  const isExpandedVariant = variant === "expanded";
  const hasDescription = Boolean(showDescription && description);
  const hasExpandedBody = hasDescription || showAction || showTimestamp;
  const align = getAlignMode(position, rtl);

  let stiffnessValue = stiffness;
  let dampingValue = damping;
  let massValue = mass;

  if (preset) {
    switch (preset) {
      case "smooth":
        stiffnessValue = 240;
        dampingValue = 26;
        massValue = 1;
        break;
      case "bouncy":
        stiffnessValue = 300;
        dampingValue = 15;
        massValue = 1;
        break;
      case "subtle":
        stiffnessValue = 220;
        dampingValue = 28;
        massValue = 0.9;
        break;
      case "snappy":
        stiffnessValue = 380;
        dampingValue = 24;
        massValue = 0.8;
        break;
    }
  }

  const [expandedOpen, setExpandedOpen] = useState(false);
  const [revealDescription, setRevealDescription] = useState(false);
  const [remainingMs, setRemainingMs] = useState(duration);
  const [isHovered, setIsHovered] = useState(false);
  const [visualState, setVisualState] = useState<ToastVisualState>("entering");
  const [actionCompleted, setActionCompleted] = useState(false);
  const [timestamp] = useState(() => new Date().toTimeString().split(" ")[0]);
  const [dims, setDims] = useState({
    pw: 176,
    bw: EXPANDED_BODY_WIDTH,
    th: 116,
  });

  const closeRequestedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const previousTypeRef = useRef(type);
  const dimsRef = useRef(dims);
  dimsRef.current = dims;

  const morphProgress = useMotionValue(0);
  const [currentPath, setCurrentPath] = useState(() =>
    morphPathCenterRaw(176, EXPANDED_BODY_WIDTH, 116, 0, align),
  );

  const progress =
    duration > 0 ? Math.max(0, (remainingMs / duration) * 100) : 0;
  const collapseThresholdMs = hasExpandedBody
    ? Math.min(1600, Math.max(850, duration * 0.3))
    : 0;

  const requestClose = useCallback(
    (reason: ToastDismissReason) => {
      if (closeRequestedRef.current) {
        return;
      }

      closeRequestedRef.current = true;
      setVisualState("dismissing");
      onClose(id, reason);
    },
    [id, onClose],
  );

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
    accentColor,
    shadow,
    isDarkSurface,
    highlightColor,
  } = resolveToastVisuals({
    theme,
    customColor,
    fillColor,
    borderColor,
    type,
    visualStyle,
  });

  useEffect(() => {
    closeRequestedRef.current = false;
    setRemainingMs(duration);
    setActionCompleted(false);
  }, [duration, id]);

  useEffect(() => {
    if (!isExpandedVariant) {
      setExpandedOpen(false);
      setRevealDescription(Boolean(hasDescription));
      setVisualState("expanded");
      previousTypeRef.current = type;
      return;
    }

    if (!hasExpandedBody) {
      setExpandedOpen(false);
      setRevealDescription(false);
      setVisualState("collapsed");
      previousTypeRef.current = type;
      return;
    }

    setExpandedOpen(false);
    setRevealDescription(false);
    setVisualState("entering");

    const wasLoading = previousTypeRef.current === "loading";
    previousTypeRef.current = type;

    const expandDelay =
      type === "loading" ? LOADING_EXPANDED_DELAY_MS : wasLoading ? 180 : 320;

    const expandTimer = window.setTimeout(() => {
      setExpandedOpen(true);
      setVisualState("expanded");
    }, expandDelay);

    const revealTimer = window.setTimeout(() => {
      if (hasDescription) {
        setRevealDescription(true);
      }
    }, expandDelay + 120);

    return () => {
      window.clearTimeout(expandTimer);
      window.clearTimeout(revealTimer);
    };
  }, [hasDescription, hasExpandedBody, id, isExpandedVariant, type]);

  useEffect(() => {
    if (!isExpandedVariant || !hasExpandedBody) {
      return;
    }

    if (isHovered) {
      setExpandedOpen(true);
      if (hasDescription) {
        setRevealDescription(true);
      }
      setVisualState("hover-expanded");
      return;
    }

    if (remainingMs <= collapseThresholdMs) {
      setVisualState((current) =>
        current === "collapsed" ? current : "collapsing",
      );
      setExpandedOpen(false);
      const collapseTimer = window.setTimeout(() => {
        setVisualState("collapsed");
      }, 180);
      return () => window.clearTimeout(collapseTimer);
    }

    if (expandedOpen) {
      setVisualState("expanded");
    }
  }, [
    collapseThresholdMs,
    expandedOpen,
    hasDescription,
    hasExpandedBody,
    isExpandedVariant,
    isHovered,
    remainingMs,
  ]);

  useEffect(() => {
    let frameId = 0;
    let previousFrame = performance.now();

    const tick = (now: number) => {
      const delta = now - previousFrame;
      previousFrame = now;

      if (!(pauseOnHover && isHovered) && !closeRequestedRef.current) {
        setRemainingMs((current) => {
          if (current <= 0) {
            return 0;
          }
          return Math.max(0, current - delta);
        });
      }

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [isHovered, pauseOnHover]);

  useEffect(() => {
    if (remainingMs > 0 || closeRequestedRef.current) {
      return;
    }

    requestClose("auto");
  }, [remainingMs, requestClose]);

  useEffect(() => {
    if (!closeOnEscape) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        requestClose("manual");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeOnEscape, requestClose]);

  useEffect(() => {
    if (!isExpandedVariant) {
      return;
    }

    const measure = () => {
      if (!containerRef.current || !titleRef.current || !bodyRef.current) {
        return;
      }

      const pillWidth = Math.max(148, titleRef.current.offsetWidth + 48);
      const bodyWidth = Math.max(
        EXPANDED_BODY_WIDTH,
        bodyRef.current.scrollWidth + 26,
      );
      const totalHeight = Math.max(
        expandedOpen ? 104 : 36,
        containerRef.current.offsetHeight,
      );

      setDims({
        pw: pillWidth,
        bw: bodyWidth,
        th: totalHeight,
      });
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    if (bodyRef.current) {
      resizeObserver.observe(bodyRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [
    actionCompleted,
    actionSuccessText,
    actionText,
    description,
    expandedOpen,
    hasExpandedBody,
    isExpandedVariant,
    showAction,
    showTimestamp,
    title,
  ]);

  useEffect(() => {
    if (!isExpandedVariant) {
      return;
    }

    setCurrentPath(
      morphPathCenterRaw(dims.pw, dims.bw, dims.th, morphProgress.get(), align),
    );
  }, [align, dims, isExpandedVariant, morphProgress]);

  useEffect(() => {
    if (!isExpandedVariant) {
      return;
    }

    const controls = animate(morphProgress, expandedOpen ? 1 : 0, {
      type: "spring",
      stiffness: springBounceToggle ? stiffnessValue : 280,
      damping: springBounceToggle ? dampingValue : 18,
      mass: springBounceToggle ? massValue : 0.8,
      onUpdate: (latest) => {
        setCurrentPath(
          morphPathCenterRaw(
            dimsRef.current.pw,
            dimsRef.current.bw,
            dimsRef.current.th,
            latest,
            align,
          ),
        );
      },
    });

    return () => controls.stop();
  }, [
    align,
    dampingValue,
    expandedOpen,
    isExpandedVariant,
    massValue,
    morphProgress,
    springBounceToggle,
    stiffnessValue,
  ]);

  const entryTransition = springBounceToggle
    ? {
        type: "spring" as const,
        stiffness: stiffnessValue,
        damping: dampingValue,
        mass: massValue,
        delay: squishDelay / 1000,
      }
    : {
        type: "spring" as const,
        bounce,
        duration: 0.45,
        delay: squishDelay / 1000,
      };

  const layoutTransition = {
    type: "spring" as const,
    stiffness: 280,
    damping: 22,
    mass: 0.8,
  };

  const bodyTransition = {
    type: "spring" as const,
    stiffness: springBounceToggle ? stiffnessValue : 280,
    damping: springBounceToggle ? dampingValue : 18,
    mass: springBounceToggle ? massValue : 0.8,
  };

  const standardEntryInitial = {
    opacity: 0,
    y: 24,
    scale: 0.96,
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
          <Loader2
            className={cx(sizeClass, "animate-spin")}
            style={iconStyle}
          />
        );
      case "promise":
        return (
          <Sparkles
            className={cx(sizeClass, "animate-pulse")}
            style={iconStyle}
          />
        );
      case "default":
      default:
        return isExpandedVariant ? (
          <Bell className={sizeClass} style={iconStyle} />
        ) : null;
    }
  };

  const handleAction = () => {
    if (actionSuccessText) {
      setActionCompleted(true);
      window.setTimeout(() => requestClose("action"), 520);
      return;
    }

    requestClose("action");
  };

  const onDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (Math.abs(info.offset.x) > 120) {
      requestClose("swipe");
      return;
    }

    setVisualState(
      expandedOpen ? (isHovered ? "hover-expanded" : "expanded") : "collapsed",
    );
  };

  const titleAnimationDelay = (squishDelay + 50) / 1000;
  const descriptionAnimationDelay =
    (squishDelay + STANDARD_TEXT_DELAY_MS) / 1000;
  const contentKey = `${type}-${title}-${description ?? ""}-${showAction ? actionText : ""}`;
  const closeButtonClass =
    closeButtonPosition === "top-left" ? "left-3.5" : "right-3.5";
  const standardTextAlign = rtl ? "text-right" : "text-left";
  const actionLabel =
    actionCompleted && actionSuccessText ? actionSuccessText : actionText;
  const borderSize = hasBorder ? borderWidth : 0;

  if (isExpandedVariant) {
    return (
      <motion.div
        ref={containerRef}
        layout
        drag={swipeToDismiss ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.22}
        dragMomentum={false}
        onDragStart={() => setVisualState("swiping")}
        onDragEnd={onDragEnd}
        initial={expandedEntryInitial}
        animate={expandedEntryAnimate}
        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
        transition={{
          default: entryTransition,
          layout: layoutTransition,
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={cx(
          "relative flex flex-col items-center pointer-events-auto select-none",
          classNames?.root,
        )}
        dir={rtl ? "rtl" : "ltr"}
        style={{
          maxWidth: 440,
          filter:
            visualStyle === "glow-neon"
              ? `drop-shadow(0 0 28px ${highlightColor})`
              : undefined,
        }}
      >
        <svg className="absolute inset-0 h-full w-full overflow-visible pointer-events-none select-none z-0">
          <defs>
            <linearGradient
              id={`${svgId}-cyber`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor={isDarkSurface ? "#090914" : cardBg}
              />
              <stop offset="70%" stopColor={cardBg} />
              <stop offset="100%" stopColor={highlightColor} />
            </linearGradient>
          </defs>
          <path
            d={currentPath}
            fill={
              visualStyle === "liquid-cyberpunk"
                ? `url(#${svgId}-cyber)`
                : cardBg
            }
            stroke={strokeColor}
            strokeWidth={borderSize}
          />
          {visualStyle === "glow-neon" ? (
            <path
              d={currentPath}
              fill="transparent"
              stroke={highlightColor}
              strokeWidth={0.75}
              opacity={0.65}
            />
          ) : null}
        </svg>

        <div className="relative z-10 w-full flex flex-col items-center">
          <motion.div
            key={`header-${contentKey}`}
            initial={{ opacity: 0, y: -4, width: dims.pw }}
            animate={{ opacity: 1, y: 0, width: dims.pw }}
            transition={{
              width: bodyTransition,
              default: { duration: 0.28, delay: titleAnimationDelay },
            }}
            className={cx(
              "absolute top-0 h-9 flex items-center overflow-hidden z-20",
              align === "center"
                ? "justify-center"
                : align === "right"
                  ? "justify-end"
                  : "justify-start",
            )}
            style={{
              left: align === "right" ? "auto" : 0,
              right: align === "right" ? 0 : "auto",
            }}
          >
            <div
              ref={titleRef}
              className={cx(
                "flex items-center gap-1.5 whitespace-nowrap h-full w-full",
                align === "center"
                  ? "justify-center px-4"
                  : align === "right"
                    ? "justify-end px-5"
                    : "justify-start px-5",
                classNames?.content,
              )}
            >
              {renderIcon("h-4 w-4")}
              <span
                className={cx(
                  "text-[11px] font-extrabold tracking-[0.22em] uppercase",
                  classNames?.title,
                )}
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
              scale: expandedOpen ? 1 : 0.94,
            }}
            transition={bodyTransition}
            className="w-full overflow-hidden mt-9"
          >
            <div
              className={cx(
                "max-w-full pt-1 pb-4 px-5 mt-2 flex items-start gap-4",
                rtl ? "flex-row-reverse text-right" : "text-left",
                classNames?.body,
              )}
              style={{ width: dims.bw }}
            >
              <div className="flex-1 min-w-0">
                {hasDescription && revealDescription ? (
                  <motion.p
                    key={`expanded-description-${contentKey}`}
                    initial={{ opacity: 0, y: -14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 160, damping: 14 }}
                    className={cx(
                      "text-xs font-semibold leading-relaxed",
                      classNames?.description,
                    )}
                    style={{ color: descriptionColor }}
                  >
                    {description}
                  </motion.p>
                ) : null}

                {showAction && actionLabel ? (
                  <div className="mt-3">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={handleAction}
                      className={cx(
                        "px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.18em] transition-all",
                        classNames?.action,
                      )}
                      style={{
                        background: accentColor,
                        color: isDarkSurface ? "#07131E" : "#FFFFFF",
                        boxShadow: `0 10px 24px ${highlightColor}`,
                      }}
                    >
                      <motion.span
                        key={actionLabel}
                        initial={{ opacity: 0.7, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 240,
                          damping: 18,
                        }}
                      >
                        {actionLabel}
                      </motion.span>
                    </motion.button>
                  </div>
                ) : null}
              </div>

              {showTimestamp ? (
                <span
                  className="text-[10px] font-bold font-mono flex-shrink-0"
                  style={{ color: timestampColor }}
                >
                  {timestamp}
                </span>
              ) : null}
            </div>
          </motion.div>
        </div>

        {showProgress && remainingMs > 0 ? (
          <div
            className={cx(
              "absolute bottom-0 left-4 right-4 h-1 rounded-full overflow-hidden z-20",
              classNames?.progressTrack,
            )}
            style={{ backgroundColor: progressTrackColor }}
          >
            <motion.div
              className={cx("h-full", classNames?.progressIndicator)}
              style={{ backgroundColor: progressColor }}
              initial={{ width: "100%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        ) : null}

        {showCloseButton ? (
          <button
            type="button"
            onClick={() => requestClose("manual")}
            className={cx(
              "absolute top-[32px] p-1 rounded-lg transition-all duration-200 z-30",
              closeButtonClass,
              isHovered || visualState === "hover-expanded"
                ? "opacity-100"
                : "opacity-0",
              classNames?.closeButton,
            )}
            style={{ color: closeColor }}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : null}
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      drag={swipeToDismiss ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.24}
      dragMomentum={false}
      onDragStart={() => setVisualState("swiping")}
      onDragEnd={onDragEnd}
      initial={standardEntryInitial}
      animate={standardEntryAnimate}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{
        default: entryTransition,
        layout: layoutTransition,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cx(
        "group relative overflow-hidden rounded-[28px] pointer-events-auto max-w-[420px] min-w-[320px]",
        classNames?.root,
      )}
      dir={rtl ? "rtl" : "ltr"}
      style={{
        background: cardBg,
        border: `${borderSize}px solid ${strokeColor}`,
        color: baseTextColor,
        boxShadow: shadow,
        backdropFilter:
          visualStyle === "glassmorphic-aurora"
            ? "blur(24px) saturate(185%)"
            : undefined,
        WebkitBackdropFilter:
          visualStyle === "glassmorphic-aurora"
            ? "blur(24px) saturate(185%)"
            : undefined,
      }}
    >
      {renderVisualOverlay(
        visualStyle,
        accentColor,
        highlightColor,
        isDarkSurface,
      )}

      <div
        className={cx(
          "relative z-10 flex gap-3 items-start px-5 py-4",
          rtl ? "flex-row-reverse text-right" : "text-left",
        )}
      >
        {renderIcon("w-5 h-5") ? (
          <div className={cx("mt-0.5 flex-shrink-0", classNames?.icon)}>
            {renderIcon("w-5 h-5")}
          </div>
        ) : null}

        <div className={cx("flex-1 min-w-0 pr-8", classNames?.content)}>
          <motion.div
            key={`title-${contentKey}`}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: titleAnimationDelay }}
            className={cx(
              "flex items-center gap-1.5 flex-wrap",
              standardTextAlign,
            )}
          >
            {showTimestamp ? (
              <span
                className="text-[10px] font-bold font-mono"
                style={{ color: timestampColor }}
              >
                [{timestamp}]
              </span>
            ) : null}
            <h4
              className={cx(
                "text-sm font-semibold truncate",
                classNames?.title,
              )}
              style={{ color: titleColor }}
            >
              {title}
            </h4>
          </motion.div>

          {hasDescription ? (
            <motion.p
              key={`description-${contentKey}`}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: descriptionAnimationDelay }}
              className={cx(
                "mt-1 text-xs leading-relaxed line-clamp-2",
                standardTextAlign,
                classNames?.description,
              )}
              style={{ color: descriptionColor }}
            >
              {description}
            </motion.p>
          ) : null}

          {showAction && actionLabel ? (
            <div className="mt-3">
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={handleAction}
                className={cx(
                  "px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.18em] transition-all",
                  classNames?.action,
                )}
                style={{
                  background: accentColor,
                  color: isDarkSurface ? "#07131E" : "#FFFFFF",
                  boxShadow: `0 10px 24px ${highlightColor}`,
                }}
              >
                <motion.span
                  key={actionLabel}
                  initial={{ opacity: 0.7, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 240, damping: 18 }}
                >
                  {actionLabel}
                </motion.span>
              </motion.button>
            </div>
          ) : null}
        </div>
      </div>

      {showCloseButton ? (
        <button
          type="button"
          onClick={() => requestClose("manual")}
          className={cx(
            "absolute top-3.5 p-1 rounded-lg transition-all duration-200 z-20",
            closeButtonClass,
            isHovered ? "opacity-100" : "opacity-0",
            classNames?.closeButton,
          )}
          style={{ color: closeColor }}
        >
          <X className="w-4 h-4" />
        </button>
      ) : null}

      {showProgress && remainingMs > 0 ? (
        <div
          className={cx(
            "absolute bottom-0 left-0 right-0 h-1",
            classNames?.progressTrack,
          )}
          style={{ backgroundColor: progressTrackColor }}
        >
          <motion.div
            className={cx("h-full", classNames?.progressIndicator)}
            style={{ backgroundColor: progressColor }}
            initial={{ width: "100%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
      ) : null}
    </motion.div>
  );
}
