import type { ToastType } from "../../hooks/useToasts";
import {
  LIGHT_TOAST_SURFACE,
  isHexColorLight,
  resolveToastSurfaceColor,
  type ToastTheme,
} from "../../lib/toastTheme";

const SEMANTIC_COLORS: Record<ToastType, string> = {
  default: "#12131A",
  success: "var(--success)",
  error: "var(--error)",
  warning: "var(--warning)",
  info: "var(--info)",
  loading: "var(--accent)",
  promise: "#A855F7",
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
  shadow: string;
  isDarkSurface: boolean;
}

export function resolveToastVisuals({
  theme,
  customColor,
  type,
}: {
  theme: ToastTheme;
  customColor?: string;
  type: ToastType;
}): ToastVisuals {
  const cardBg = resolveToastSurfaceColor(theme, customColor);
  const isDarkSurface =
    cardBg !== LIGHT_TOAST_SURFACE && !isHexColorLight(cardBg);
  const baseTextColor = isDarkSurface ? "#FFFFFF" : "#12131A";
  const strokeColor = isDarkSurface
    ? "rgba(255,255,255,0.12)"
    : "rgba(0,0,0,0.08)";
  const descriptionColor = isDarkSurface
    ? "rgba(255,255,255,0.88)"
    : "rgba(18,19,26,0.72)";
  const timestampColor = isDarkSurface
    ? "rgba(255,255,255,0.62)"
    : "rgba(18,19,26,0.48)";
  const closeColor = isDarkSurface
    ? "rgba(255,255,255,0.64)"
    : "rgba(18,19,26,0.52)";
  const progressTrackColor = isDarkSurface
    ? "rgba(255,255,255,0.18)"
    : "rgba(0,0,0,0.07)";
  const semanticColor = SEMANTIC_COLORS[type];

  return {
    cardBg,
    strokeColor,
    titleColor: type === "default" ? baseTextColor : semanticColor,
    descriptionColor,
    progressColor: type === "default" ? baseTextColor : semanticColor,
    progressTrackColor,
    closeColor,
    iconColor: type === "default" ? baseTextColor : semanticColor,
    timestampColor,
    baseTextColor,
    shadow: isDarkSurface
      ? "0 10px 40px rgba(0,0,0,0.22)"
      : "0 10px 40px rgba(0,0,0,0.10)",
    isDarkSurface,
  };
}
