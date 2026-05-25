import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { ToastTheme } from "../lib/toastTheme";

export type ToastType =
  | "default"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading"
  | "promise";

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type ToastVariant = "standard" | "expanded";
export type ToastOverflowStrategy = "stack" | "dismiss-oldest";
export type ToastVisualStyle =
  | "classic"
  | "glassmorphic-aurora"
  | "glow-neon"
  | "liquid-cyberpunk";
export type ToastDismissReason =
  | "manual"
  | "auto"
  | "action"
  | "swipe"
  | "programmatic";
export type ToastCloseButtonPosition = "top-left" | "top-right";

export interface ToastClassNames {
  root?: string;
  icon?: string;
  content?: string;
  title?: string;
  description?: string;
  body?: string;
  action?: string;
  closeButton?: string;
  progressTrack?: string;
  progressIndicator?: string;
}

export interface ToastDismissPayload {
  reason: ToastDismissReason;
  toast: ToastItem;
}

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  showDescription?: boolean;
  showAction?: boolean;
  actionText?: string;
  actionSuccessText?: string;
  customColor?: string;
  fillColor?: string;
  borderColor?: string;
  borderWidth?: number;
  hasBorder?: boolean;
  bounce?: number;
  theme?: ToastTheme;
  visualStyle?: ToastVisualStyle;
  classNames?: ToastClassNames;
  showProgress?: boolean;
  closeOnEscape?: boolean;
  showTimestamp?: boolean;
  showCloseButton?: boolean;
  closeButtonPosition?: ToastCloseButtonPosition;
  position?: ToastPosition;
  duration?: number;
  variant?: ToastVariant;
  squishDelay?: number;
  springBounceToggle?: boolean;
  stiffness?: number;
  damping?: number;
  mass?: number;
  preset?: "smooth" | "bouncy" | "subtle" | "snappy";
  errorShake?: boolean;
  rtl?: boolean;
  pauseOnHover?: boolean;
  swipeToDismiss?: boolean;
  onDismiss?: (payload: ToastDismissPayload) => void;
  onAutoClose?: (toast: ToastItem) => void;
}

export type ToastInput = Omit<ToastItem, "id"> & { id?: string };
export type ToastOptions = Omit<ToastInput, "title" | "type">;
export type ToastDismissFilter =
  | string
  | {
      id?: string;
      type?: ToastType;
      position?: ToastPosition;
    };

export interface ToastQueueConfig {
  maxToasts: number;
  overflowStrategy: ToastOverflowStrategy;
}

interface ToastContextType {
  toasts: ToastItem[];
  addToast: (toast: ToastInput) => string;
  updateToast: (id: string, toast: Partial<ToastItem>) => void;
  removeToast: (id: string, reason?: ToastDismissReason) => void;
  dismissToasts: (filter?: ToastDismissFilter) => void;
  expanded: boolean;
  setExpanded: (val: boolean) => void;
  queueConfig: ToastQueueConfig;
  setQueueConfig: (config: Partial<ToastQueueConfig>) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const DEFAULT_QUEUE_CONFIG: ToastQueueConfig = {
  maxToasts: 4,
  overflowStrategy: "stack",
};

type ToastAction =
  | { type: "add"; id: string; toast: ToastInput }
  | { type: "update"; id: string; toast: Partial<ToastItem> }
  | { type: "dismiss"; filter?: ToastDismissFilter }
  | { type: "config"; config: Partial<ToastQueueConfig> };

type Listener = (action: ToastAction) => void;
const listeners = new Set<Listener>();

type ToastPromiseStageValue =
  | string
  | (Omit<Partial<ToastItem>, "id"> & {
      title: string;
    });

type ToastPromiseStageResolver<T> =
  | ToastPromiseStageValue
  | ((value: T) => ToastPromiseStageValue);

export interface ToastPromiseStages<T> {
  loading: ToastPromiseStageValue;
  success: ToastPromiseStageResolver<T>;
  error: ToastPromiseStageResolver<unknown>;
}

function createToastId() {
  return Math.random().toString(36).slice(2, 10);
}

function normalizeMaxToasts(value?: number) {
  return Math.max(1, Math.floor(value ?? DEFAULT_QUEUE_CONFIG.maxToasts));
}

function mergeQueueConfig(
  current: ToastQueueConfig,
  update: Partial<ToastQueueConfig>,
): ToastQueueConfig {
  return {
    maxToasts: normalizeMaxToasts(update.maxToasts ?? current.maxToasts),
    overflowStrategy: update.overflowStrategy ?? current.overflowStrategy,
  };
}

function normalizeToastInput(input: ToastInput, forcedId?: string): ToastItem {
  return {
    ...input,
    id: forcedId ?? input.id ?? createToastId(),
    type: input.type ?? "default",
    title: input.title,
    position: input.position ?? "bottom-right",
    variant: input.variant ?? "standard",
    theme: input.theme ?? "light",
    visualStyle: input.visualStyle ?? "classic",
    showDescription: input.showDescription ?? true,
    showProgress: input.showProgress ?? true,
    showCloseButton: input.showCloseButton ?? true,
    closeButtonPosition: input.closeButtonPosition ?? "top-right",
    pauseOnHover: input.pauseOnHover ?? true,
    swipeToDismiss: input.swipeToDismiss ?? true,
  };
}

function queueDismissCallbacks(
  toasts: ToastItem[],
  reason: ToastDismissReason,
) {
  if (!toasts.length) {
    return;
  }

  queueMicrotask(() => {
    toasts.forEach((toast) => {
      if (reason === "auto") {
        toast.onAutoClose?.(toast);
      }

      toast.onDismiss?.({
        reason,
        toast,
      });
    });
  });
}

function applyOverflowStrategy(
  toasts: ToastItem[],
  config: ToastQueueConfig,
): { next: ToastItem[]; dismissed: ToastItem[] } {
  if (
    config.overflowStrategy !== "dismiss-oldest" ||
    toasts.length <= config.maxToasts
  ) {
    return {
      next: toasts,
      dismissed: [],
    };
  }

  const overflowCount = toasts.length - config.maxToasts;
  return {
    next: toasts.slice(overflowCount),
    dismissed: toasts.slice(0, overflowCount),
  };
}

export function matchesToastFilter(
  toastItem: ToastItem,
  filter?: ToastDismissFilter,
) {
  if (!filter) {
    return true;
  }

  if (typeof filter === "string") {
    return toastItem.id === filter;
  }

  if (filter.id && toastItem.id !== filter.id) {
    return false;
  }

  if (filter.type && toastItem.type !== filter.type) {
    return false;
  }

  if (filter.position && toastItem.position !== filter.position) {
    return false;
  }

  return true;
}

export function applyQueueConfig(
  toasts: ToastItem[],
  config: ToastQueueConfig,
) {
  return applyOverflowStrategy(toasts, config).next;
}

function resolvePromiseStage<T>(
  stage: ToastPromiseStageResolver<T>,
  value: T,
): ToastPromiseStageValue {
  if (typeof stage === "function") {
    return stage(value);
  }

  return stage;
}

function resolveStageToast<T>(
  stage: ToastPromiseStageResolver<T>,
  value: T,
  type: ToastType,
  baseOptions: ToastOptions,
): Partial<ToastItem> {
  const resolved = resolvePromiseStage(stage, value);

  if (typeof resolved === "string") {
    return {
      ...baseOptions,
      type,
      title: resolved,
    };
  }

  return {
    ...baseOptions,
    ...resolved,
    type,
  };
}

interface ToastApi {
  (title: string, options?: ToastOptions): string;
  custom: (type: ToastType, title: string, options?: ToastOptions) => string;
  success: (title: string, options?: ToastOptions) => string;
  error: (title: string, options?: ToastOptions) => string;
  warning: (title: string, options?: ToastOptions) => string;
  info: (title: string, options?: ToastOptions) => string;
  loading: (title: string, options?: ToastOptions) => string;
  promise: {
    (title: string, options?: ToastOptions): string;
    <T>(
      promiseOrFactory: Promise<T> | (() => Promise<T>),
      stages: ToastPromiseStages<T>,
      options?: ToastOptions,
    ): Promise<T>;
  };
  update: (id: string, updatedFields: Partial<ToastItem>) => void;
  dismiss: (filter?: ToastDismissFilter) => void;
  configure: (config: Partial<ToastQueueConfig>) => void;
}

const toastBase = ((title: string, options: ToastOptions = {}) =>
  toastBase.custom("default", title, options)) as ToastApi;

toastBase.custom = (
  type: ToastType,
  title: string,
  options: ToastOptions = {},
) => {
  const id = options.id ?? createToastId();
  listeners.forEach((listener) =>
    listener({
      type: "add",
      id,
      toast: {
        ...options,
        type,
        title,
      },
    }),
  );
  return id;
};

toastBase.success = (title, options = {}) =>
  toastBase.custom("success", title, options);
toastBase.error = (title, options = {}) =>
  toastBase.custom("error", title, options);
toastBase.warning = (title, options = {}) =>
  toastBase.custom("warning", title, options);
toastBase.info = (title, options = {}) =>
  toastBase.custom("info", title, options);
toastBase.loading = (title, options = {}) =>
  toastBase.custom("loading", title, options);

toastBase.promise = (<T,>(
  promiseOrFactory: Promise<T> | (() => Promise<T>) | string,
  stagesOrOptions?: ToastPromiseStages<T> | ToastOptions,
  options: ToastOptions = {},
) => {
  if (typeof promiseOrFactory === "string") {
    return toastBase.custom(
      "promise",
      promiseOrFactory,
      (stagesOrOptions as ToastOptions) ?? {},
    );
  }

  const promise =
    typeof promiseOrFactory === "function"
      ? promiseOrFactory()
      : promiseOrFactory;
  const stages = stagesOrOptions as ToastPromiseStages<T>;
  const loadingStage =
    typeof stages.loading === "string"
      ? { title: stages.loading }
      : stages.loading;

  const id = toastBase.loading(loadingStage.title, {
    ...options,
    ...loadingStage,
  });

  return promise.then(
    (value) => {
      const successToast = resolveStageToast(
        stages.success,
        value,
        "success",
        options,
      );

      toastBase.update(id, {
        ...successToast,
        duration: successToast.duration ?? 4000,
      });
      return value;
    },
    (error) => {
      const errorToast = resolveStageToast(
        stages.error,
        error,
        "error",
        options,
      );

      toastBase.update(id, {
        ...errorToast,
        duration: errorToast.duration ?? 5000,
      });
      throw error;
    },
  );
}) as ToastApi["promise"];

toastBase.update = (id, updatedFields) => {
  listeners.forEach((listener) =>
    listener({
      type: "update",
      id,
      toast: updatedFields,
    }),
  );
};

toastBase.dismiss = (filter) => {
  listeners.forEach((listener) =>
    listener({
      type: "dismiss",
      filter,
    }),
  );
};

toastBase.configure = (config) => {
  listeners.forEach((listener) =>
    listener({
      type: "config",
      config,
    }),
  );
};

export const toast = toastBase;
export const gooeyToast = toastBase;

interface ToastProviderProps extends Partial<ToastQueueConfig> {
  children: ReactNode;
}

export function ToastProvider({
  children,
  maxToasts = DEFAULT_QUEUE_CONFIG.maxToasts,
  overflowStrategy = DEFAULT_QUEUE_CONFIG.overflowStrategy,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [queueConfig, setQueueConfigState] = useState<ToastQueueConfig>(() => ({
    maxToasts: normalizeMaxToasts(maxToasts),
    overflowStrategy,
  }));
  const queueConfigRef = useRef(queueConfig);

  useEffect(() => {
    queueConfigRef.current = queueConfig;
    setToasts((previous) => applyQueueConfig(previous, queueConfig));
  }, [queueConfig]);

  const appendToast = useCallback((input: ToastInput) => {
    const nextToast = normalizeToastInput(input);
    setToasts((previous) => {
      const { next, dismissed } = applyOverflowStrategy(
        [...previous, nextToast],
        queueConfigRef.current,
      );
      queueDismissCallbacks(dismissed, "programmatic");
      return next;
    });
    return nextToast.id;
  }, []);

  const addToast = useCallback(
    (input: ToastInput) => appendToast(input),
    [appendToast],
  );

  const updateToast = useCallback(
    (id: string, updatedFields: Partial<ToastItem>) => {
      setToasts((previous) =>
        previous.map((toastItem) =>
          toastItem.id === id ? { ...toastItem, ...updatedFields } : toastItem,
        ),
      );
    },
    [],
  );

  const removeToast = useCallback(
    (id: string, reason: ToastDismissReason = "manual") => {
      setToasts((previous) => {
        const dismissed = previous.filter((toastItem) => toastItem.id === id);
        queueDismissCallbacks(dismissed, reason);
        return previous.filter((toastItem) => toastItem.id !== id);
      });
    },
    [],
  );

  const dismissToasts = useCallback((filter?: ToastDismissFilter) => {
    setToasts((previous) => {
      const dismissed = previous.filter((toastItem) =>
        matchesToastFilter(toastItem, filter),
      );
      queueDismissCallbacks(dismissed, "programmatic");
      return previous.filter(
        (toastItem) => !matchesToastFilter(toastItem, filter),
      );
    });
  }, []);

  const setQueueConfig = useCallback((config: Partial<ToastQueueConfig>) => {
    setQueueConfigState((current) => mergeQueueConfig(current, config));
  }, []);

  useEffect(() => {
    const handleAction = (action: ToastAction) => {
      if (action.type === "add") {
        appendToast({
          ...action.toast,
          id: action.id,
        });
        return;
      }

      if (action.type === "update") {
        updateToast(action.id, action.toast);
        return;
      }

      if (action.type === "dismiss") {
        dismissToasts(action.filter);
        return;
      }

      setQueueConfig(action.config);
    };

    listeners.add(handleAction);
    return () => {
      listeners.delete(handleAction);
    };
  }, [appendToast, dismissToasts, setQueueConfig, updateToast]);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        updateToast,
        removeToast,
        dismissToasts,
        expanded,
        setExpanded,
        queueConfig,
        setQueueConfig,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export function useToasts() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToasts must be used within a ToastProvider");
  }
  return context;
}
