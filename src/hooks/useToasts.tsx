import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

export type ToastType =
  | "default"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading"
  | "promise";

export interface ToastItem {
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
  showProgress?: boolean;
  closeOnEscape?: boolean;
  showTimestamp?: boolean;
  showCloseButton?: boolean;
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  duration?: number;
  variant?: "standard" | "expanded";
  squishDelay?: number;
  springBounceToggle?: boolean;
  stiffness?: number;
  damping?: number;
  mass?: number;
  preset?: "smooth" | "bouncy" | "subtle" | "snappy";
  errorShake?: boolean;
}

interface ToastContextType {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, "id">) => string;
  updateToast: (id: string, toast: Partial<ToastItem>) => void;
  removeToast: (id: string) => void;
  expanded: boolean;
  setExpanded: (val: boolean) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

type Listener = (action: {
  type: "add" | "update" | "dismiss";
  id?: string;
  toast?: Omit<ToastItem, "id"> | Partial<ToastItem>;
}) => void;
const listeners = new Set<Listener>();

export const toast = {
  success: (
    title: string,
    options: Omit<ToastItem, "id" | "title" | "type"> = {},
  ) => toast.custom("success", title, options),
  error: (
    title: string,
    options: Omit<ToastItem, "id" | "title" | "type"> = {},
  ) => toast.custom("error", title, options),
  warning: (
    title: string,
    options: Omit<ToastItem, "id" | "title" | "type"> = {},
  ) => toast.custom("warning", title, options),
  info: (
    title: string,
    options: Omit<ToastItem, "id" | "title" | "type"> = {},
  ) => toast.custom("info", title, options),
  loading: (
    title: string,
    options: Omit<ToastItem, "id" | "title" | "type"> = {},
  ) => toast.custom("loading", title, options),
  promise: (
    title: string,
    options: Omit<ToastItem, "id" | "title" | "type"> = {},
  ) => toast.custom("promise", title, options),

  custom: (
    type: ToastType,
    title: string,
    options: Omit<ToastItem, "id" | "title" | "type"> = {},
  ) => {
    const id =
      (options as any).id || Math.random().toString(36).substring(2, 9);
    listeners.forEach((l) =>
      l({
        type: "add",
        id,
        toast: { ...options, type, title, id } as any,
      }),
    );
    return id;
  },

  update: (id: string, updatedFields: Partial<ToastItem>) => {
    listeners.forEach((l) => l({ type: "update", id, toast: updatedFields }));
  },

  dismiss: (id?: string) => {
    listeners.forEach((l) => l({ type: "dismiss", id }));
  },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [expanded, setExpanded] = useState<boolean>(false);

  const addToast = useCallback((toast: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    return id;
  }, []);

  const updateToast = useCallback(
    (id: string, updatedFields: Partial<ToastItem>) => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updatedFields } : t)),
      );
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  React.useEffect(() => {
    const handleAction = (action: {
      type: "add" | "update" | "dismiss";
      id?: string;
      toast?: Omit<ToastItem, "id"> | Partial<ToastItem>;
    }) => {
      if (action.type === "add" && action.toast) {
        const newToast = { ...(action.toast as ToastItem), id: action.id! };
        setToasts((prev) => [...prev, newToast]);
      } else if (action.type === "update" && action.toast) {
        setToasts((prev) =>
          prev.map((t) => (t.id === action.id ? { ...t, ...action.toast } : t)),
        );
      } else if (action.type === "dismiss") {
        if (action.id) {
          setToasts((prev) => prev.filter((t) => t.id !== action.id));
        } else {
          setToasts([]);
        }
      }
    };
    listeners.add(handleAction);
    return () => {
      listeners.delete(handleAction);
    };
  }, []);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        updateToast,
        removeToast,
        expanded,
        setExpanded,
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
