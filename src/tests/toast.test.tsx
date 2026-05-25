import { describe, expect, test } from "vitest";
import {
  applyQueueConfig,
  matchesToastFilter,
  type ToastItem,
  type ToastQueueConfig,
} from "../hooks/useToasts";

const baseToast = (overrides: Partial<ToastItem> = {}): ToastItem => ({
  id: "toast-1",
  type: "success",
  title: "Toast ready",
  position: "bottom-right",
  variant: "standard",
  theme: "light",
  visualStyle: "classic",
  showDescription: true,
  showProgress: true,
  showCloseButton: true,
  closeButtonPosition: "top-right",
  pauseOnHover: true,
  swipeToDismiss: true,
  ...overrides,
});

describe("toast queue helpers", () => {
  test("dismiss-oldest strategy trims the queue to maxToasts", () => {
    const config: ToastQueueConfig = {
      maxToasts: 2,
      overflowStrategy: "dismiss-oldest",
    };

    const queue = applyQueueConfig(
      [
        baseToast({ id: "toast-1" }),
        baseToast({ id: "toast-2" }),
        baseToast({ id: "toast-3" }),
      ],
      config,
    );

    expect(queue.map((toast) => toast.id)).toEqual(["toast-2", "toast-3"]);
  });

  test("stack strategy preserves the full queue in state", () => {
    const config: ToastQueueConfig = {
      maxToasts: 2,
      overflowStrategy: "stack",
    };

    const queue = applyQueueConfig(
      [
        baseToast({ id: "toast-1" }),
        baseToast({ id: "toast-2" }),
        baseToast({ id: "toast-3" }),
      ],
      config,
    );

    expect(queue).toHaveLength(3);
  });

  test("dismiss filters match by type or id", () => {
    const errorToast = baseToast({ id: "toast-error", type: "error" });

    expect(matchesToastFilter(errorToast, { type: "error" })).toBe(true);
    expect(matchesToastFilter(errorToast, { type: "success" })).toBe(false);
    expect(matchesToastFilter(errorToast, "toast-error")).toBe(true);
    expect(matchesToastFilter(errorToast, "toast-other")).toBe(false);
  });
});
