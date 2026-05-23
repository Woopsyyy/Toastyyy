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
  errorShake?: boolean;
  titleDescriptionSimultaneous?: boolean;
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
