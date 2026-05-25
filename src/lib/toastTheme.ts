export type ToastTheme = "light" | "dark" | "custom";

export const LIGHT_TOAST_SURFACE = "#FFFFFF";
export const DARK_TOAST_SURFACE = "#12131A";
export const DEFAULT_CUSTOM_TOAST_SURFACE = "#FF8C3B";

const HEX_COLOR_PATTERN = /^#(?:[0-9a-fA-F]{6})$/;

export function normalizeHexColor(
  value: string | undefined,
  fallback = DEFAULT_CUSTOM_TOAST_SURFACE,
) {
  if (!value) {
    return fallback;
  }

  const normalized = value.toUpperCase();
  return HEX_COLOR_PATTERN.test(normalized) ? normalized : fallback;
}

export function resolveToastSurfaceColor(
  theme: ToastTheme,
  customColor?: string,
) {
  if (theme === "light") {
    return LIGHT_TOAST_SURFACE;
  }

  if (theme === "dark") {
    return DARK_TOAST_SURFACE;
  }

  return normalizeHexColor(customColor, DEFAULT_CUSTOM_TOAST_SURFACE);
}

export function isHexColorLight(hexColor: string) {
  const normalized = normalizeHexColor(hexColor).slice(1);
  const red = parseInt(normalized.slice(0, 2), 16) / 255;
  const green = parseInt(normalized.slice(2, 4), 16) / 255;
  const blue = parseInt(normalized.slice(4, 6), 16) / 255;

  const toLinear = (channel: number) =>
    channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;

  const luminance =
    0.2126 * toLinear(red) + 0.7152 * toLinear(green) + 0.0722 * toLinear(blue);

  return luminance > 0.62;
}
