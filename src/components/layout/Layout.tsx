import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useToasts } from "../../hooks/useToasts";
import Toast from "../ui/Toast";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface ToastStackProps {
  position:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  toasts: any[];
  onClose: (id: string) => void;
}

function ToastStack({ position, toasts, onClose }: ToastStackProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Layout directions
  const isBottom = position.startsWith("bottom");

  let positionClasses = "bottom-6 right-6 flex-col-reverse";
  if (position === "top-left") positionClasses = "top-24 left-6 flex-col";
  else if (position === "top-right")
    positionClasses = "top-24 right-6 flex-col";
  else if (position === "bottom-left")
    positionClasses = "bottom-6 left-6 flex-col-reverse";
  else if (position === "bottom-center")
    positionClasses =
      "bottom-6 left-1/2 -translate-x-1/2 items-center flex-col-reverse";

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed ${positionClasses} z-[100] flex gap-3 pointer-events-auto`}
      layout
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast, index) => {
          // Newest toast is at the end of the array. Let's calculate its distance from the end.
          const revIndex = toasts.length - 1 - index;
          const isStacked = !isHovered && toasts.length > 1;

          // Stacking visual transforms
          const scale = isStacked ? Math.max(0.82, 1 - revIndex * 0.06) : 1;
          const opacity = isStacked ? Math.max(0.4, 1 - revIndex * 0.22) : 1;

          // Offset shifts: slide older toasts slightly back along vertical stack line
          const multiplier = isBottom ? -1 : 1;
          const y = isStacked ? revIndex * 14 * multiplier : 0;

          return (
            <motion.div
              key={toast.id}
              layout
              style={{
                zIndex: 100 - revIndex,
                transformOrigin: isBottom ? "bottom center" : "top center",
                position: isStacked && revIndex > 0 ? "absolute" : "relative",
              }}
              animate={{
                scale,
                opacity,
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
              <Toast {...toast} onClose={onClose} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Layout() {
  const { toasts, removeToast } = useToasts();

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-brand-100 selection:text-brand-900">
      <div className="fixed inset-0 z-[-1] mesh-bg noise" />

      <Navbar />

      <main className="flex-1 flex flex-col mt-16 lg:mt-20">
        <Outlet />
      </main>

      {(
        [
          "top-left",
          "top-right",
          "bottom-left",
          "bottom-center",
          "bottom-right",
        ] as const
      ).map((pos) => {
        const positionToasts = toasts.filter(
          (t) => (t.position || "bottom-right") === pos,
        );

        return (
          <ToastStack
            key={pos}
            position={pos}
            toasts={positionToasts}
            onClose={removeToast}
          />
        );
      })}

      <Footer />
    </div>
  );
}
