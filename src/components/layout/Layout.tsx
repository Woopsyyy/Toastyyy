import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  useToasts,
  type ToastItem,
  type ToastPosition,
} from "../../hooks/useToasts";
import Toast from "../ui/Toast";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface ToastStackProps {
  position: ToastPosition;
  toasts: ToastItem[];
  onClose: (id: string) => void;
  expanded?: boolean;
}

function ToastStack({
  position,
  toasts,
  onClose,
  expanded = false,
}: ToastStackProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isBottom = position.startsWith("bottom");
  const isCenter = position.endsWith("center");
  const isRight = position.endsWith("right");

  const positionClasses = {
    "top-left": "top-24 left-4 sm:left-6 items-start",
    "top-center": "top-24 left-1/2 -translate-x-1/2 items-center",
    "top-right": "top-24 right-4 sm:right-6 items-end",
    "bottom-left": "bottom-6 left-4 sm:left-6 items-start",
    "bottom-center": "bottom-6 left-1/2 -translate-x-1/2 items-center",
    "bottom-right": "bottom-6 right-4 sm:right-6 items-end",
  }[position];

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed ${positionClasses} z-[100] flex pointer-events-auto gap-3`}
      style={{
        flexDirection: isBottom ? "column-reverse" : "column",
      }}
      layout
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toastItem, index) => {
          const reverseIndex = toasts.length - 1 - index;
          const isStacked = !expanded && !isHovered && toasts.length > 1;
          const scale = isStacked ? Math.max(0.84, 1 - reverseIndex * 0.06) : 1;
          const opacity = isStacked
            ? Math.max(0.34, 1 - reverseIndex * 0.2)
            : 1;
          const y = isStacked ? reverseIndex * 14 * (isBottom ? -1 : 1) : 0;
          const x =
            isStacked && !isCenter ? reverseIndex * (isRight ? 4 : -4) : 0;

          return (
            <motion.div
              key={toastItem.id}
              layout
              style={{
                zIndex: 100 - reverseIndex,
                transformOrigin: isBottom
                  ? isCenter
                    ? "bottom center"
                    : isRight
                      ? "bottom right"
                      : "bottom left"
                  : isCenter
                    ? "top center"
                    : isRight
                      ? "top right"
                      : "top left",
                position:
                  isStacked && reverseIndex > 0 ? "absolute" : "relative",
              }}
              animate={{
                scale,
                opacity,
                x,
                y,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 22,
                mass: 0.8,
              }}
              className="pointer-events-auto"
            >
              <Toast {...toastItem} onClose={onClose} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Layout() {
  const { toasts, removeToast, expanded, setExpanded, queueConfig } =
    useToasts();

  const positions: ToastPosition[] = [
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ];

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-brand-100 selection:text-brand-900">
      <div className="fixed inset-0 z-[-1] mesh-bg noise" />

      <Navbar />

      <main className="flex-1 flex flex-col mt-16 lg:mt-20">
        <Outlet />
      </main>

      {positions.map((position) => {
        const positionToasts = toasts.filter(
          (toastItem) => (toastItem.position || "bottom-right") === position,
        );
        const visibleToasts =
          queueConfig.overflowStrategy === "stack"
            ? positionToasts.slice(-queueConfig.maxToasts)
            : positionToasts;

        if (!visibleToasts.length) {
          return null;
        }

        return (
          <div
            key={position}
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
          >
            <ToastStack
              position={position}
              toasts={visibleToasts}
              onClose={removeToast}
              expanded={expanded}
            />
          </div>
        );
      })}

      <Footer />
    </div>
  );
}
