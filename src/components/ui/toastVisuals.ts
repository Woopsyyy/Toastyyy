import type { ToastType, ToastVisualStyle } from "../../hooks/useToasts";
import {
  LIGHT_TOAST_SURFACE,
  isHexColorLight,
  resolveToastSurfaceColor,
  type ToastTheme,
} from "../../lib/toastTheme";

const SEMANTIC_COLORS: Record<ToastType, string> = {
  default: "#12131A",
  success: "#0BC47B",
  error: "#F43F5E",
  warning: "#F1A91D",
  info: "#3B82F6",
  loading: "#FF8C3B",
  promise: "#8B5CF6",
};

export interface ToastVisuals {
  cardBg: string;
  strokeColor: string;
  titleColor: string;
  descriptionColor: string;
  progressColor: string;
  progressTrackColor: string;
  closeColor: string;
  iconColor: string;
  timestampColor: string;
  baseTextColor: string;
  accentColor: string;
  shadow: string;
  isDarkSurface: boolean;
  highlightColor: string;
}

function resolveBaseSurface(
  theme: ToastTheme,
  customColor: string | undefined,
  fillColor: string | undefined,
) {
  if (fillColor) {
    return fillColor;
  }

  return resolveToastSurfaceColor(theme, customColor);
}

function resolveVariantSurface(
  visualStyle: ToastVisualStyle,
  baseSurface: string,
  semanticColor: string,
) {
  switch (visualStyle) {
    case "glassmorphic-aurora":
      return baseSurface === LIGHT_TOAST_SURFACE
        ? "rgba(255,255,255,0.48)"
        : "rgba(15,23,42,0.58)";
    case "glow-neon":
      return "#07131E";
    case "liquid-cyberpunk":
      return "#090914";
    case "classic":
    default:
      return baseSurface;
  }
}

export function resolveToastVisuals({
  theme,
  customColor,
  fillColor,
  borderColor,
  type,
  visualStyle,
}: {
  theme: ToastTheme;
  customColor?: string;
  fillColor?: string;
  borderColor?: string;
  type: ToastType;
  visualStyle: ToastVisualStyle;
}): ToastVisuals {
  const semanticColor = SEMANTIC_COLORS[type];
  const baseSurface = resolveBaseSurface(theme, customColor, fillColor);
  const cardBg = resolveVariantSurface(visualStyle, baseSurface, semanticColor);

  const isDarkSurface =
    visualStyle === "glow-neon" ||
    visualStyle === "liquid-cyberpunk" ||
    (baseSurface !== LIGHT_TOAST_SURFACE && !isHexColorLight(baseSurface));

  const baseTextColor = isDarkSurface ? "#FFFFFF" : "#12131A";
  const descriptionColor = isDarkSurface
    ? "rgba(255,255,255,0.82)"
    : "rgba(18,19,26,0.7)";
  const timestampColor = isDarkSurface
    ? "rgba(255,255,255,0.58)"
    : "rgba(18,19,26,0.48)";
  const closeColor = isDarkSurface
    ? "rgba(255,255,255,0.72)"
    : "rgba(18,19,26,0.54)";
  const progressTrackColor = isDarkSurface
    ? "rgba(255,255,255,0.14)"
    : "rgba(0,0,0,0.08)";

  let strokeColor = borderColor;
  let shadow = isDarkSurface
    ? "0 20px 50px rgba(0,0,0,0.34)"
    : "0 20px 50px rgba(0,0,0,0.12)";
  let titleColor = type === "default" ? baseTextColor : semanticColor;
  let progressColor = type === "default" ? baseTextColor : semanticColor;
  let highlightColor = `${semanticColor}33`;

  switch (visualStyle) {
    case "glassmorphic-aurora":
      strokeColor ??= isDarkSurface
        ? "rgba(255,255,255,0.18)"
        : "rgba(255,255,255,0.62)";
      shadow = `0 24px 64px ${semanticColor}26`;
      highlightColor = `${semanticColor}40`;
      break;
    case "glow-neon":
      strokeColor ??= `${semanticColor}99`;
      titleColor = semanticColor;
      progressColor = semanticColor;
      shadow = `0 0 0 1px ${semanticColor}66, 0 12px 40px ${semanticColor}3A, 0 0 60px ${semanticColor}26`;
      highlightColor = `${semanticColor}55`;
      break;
    case "liquid-cyberpunk":
      strokeColor ??= semanticColor;
      titleColor = semanticColor;
      progressColor = semanticColor;
      shadow = `0 18px 44px rgba(5,5,12,0.54), 0 0 0 1px ${semanticColor}80`;
      highlightColor = `${semanticColor}4A`;
      break;
    case "classic":
    default:
      strokeColor ??= isDarkSurface
        ? "rgba(255,255,255,0.12)"
        : "rgba(0,0,0,0.08)";
      break;
  }

  return {
    cardBg,
    strokeColor,
    titleColor,
    descriptionColor,
    progressColor,
    progressTrackColor,
    closeColor,
    iconColor: titleColor,
    timestampColor,
    baseTextColor,
    accentColor: semanticColor,
    shadow,
    isDarkSurface,
    highlightColor,
  };
}
