import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface ToastMascotProps {
  size?: number;
  mood?: "happy" | "focused" | "sleepy" | "excited";
  interactive?: boolean;
}

export default function ToastMascot({
  size = 120,
  mood = "happy",
  interactive = true,
}: ToastMascotProps) {
  const [isBlinking, setIsBlinking] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250 };
  const eyeX = useSpring(mouseX, springConfig);
  const eyeY = useSpring(mouseY, springConfig);

  useEffect(() => {
    let blinkTimeout: ReturnType<typeof setTimeout>;
    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
      const nextDelay = Math.random() * 4000 + 2000;
      blinkTimeout = setTimeout(triggerBlink, nextDelay);
    };
    blinkTimeout = setTimeout(triggerBlink, 3000);
    return () => clearTimeout(blinkTimeout);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    mouseX.set(x * 6);
    mouseY.set(y * 4);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const getMouthPath = () => {
    switch (mood) {
      case "excited":
        return "M 42,58 Q 50,68 58,58 Z";
      case "focused":
        return "M 44,58 L 56,58";
      case "sleepy":
        return "M 44,56 Q 50,54 56,56";
      case "happy":
      default:
        return "M 43,56 Q 50,63 57,56";
    }
  };

  const getEyeHeight = () => {
    if (isBlinking) return 1;
    if (mood === "sleepy") return 2;
    return 8;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ width: size, height: size }}
      className="relative select-none flex items-center justify-center cursor-pointer"
    >
      <motion.div
        whileHover={
          interactive
            ? {
                scale: 1.06,
                rotate: [0, -3, 3, 0],
                transition: { duration: 0.5 },
              }
            : {}
        }
        whileTap={interactive ? { scale: 0.94 } : {}}
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          y: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="w-full h-full relative"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_8px_24px_rgba(255,140,59,0.15)]"
        >
          <defs>
            <radialGradient id="crustGrad" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#e27c3e" />
              <stop offset="100%" stopColor="#b5521b" />
            </radialGradient>
            <radialGradient id="crumbGrad" cx="50%" cy="45%" r="45%">
              <stop offset="0%" stopColor="#fff8e3" />
              <stop offset="60%" stopColor="#ffeebb" />
              <stop offset="100%" stopColor="#ffd899" />
            </radialGradient>
            <linearGradient id="butterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff176" />
              <stop offset="100%" stopColor="#fbc02d" />
            </linearGradient>
            <filter id="gooey">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="1.5"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
            </filter>
          </defs>

          <g filter="url(#gooey)">
            <path
              d="M 22,25 
                 C 22,12 36,10 50,15 
                 C 64,10 78,12 78,25 
                 C 78,42 82,75 75,85 
                 C 68,92 32,92 25,85 
                 C 18,75 22,42 22,25 Z"
              fill="url(#crustGrad)"
            />

            <path
              d="M 25,27 
                 C 25,16 37,14 50,18 
                 C 63,14 75,16 75,27 
                 C 75,42 78,72 72,81 
                 C 66,87 34,87 28,81 
                 C 22,72 25,42 25,27 Z"
              fill="url(#crumbGrad)"
            />
          </g>

          <g>
            <motion.rect
              d="M 38,10 L 52,12 L 50,22 L 36,20 Z"
              x="38"
              y="11"
              width="15"
              height="11"
              rx="3"
              transform="rotate(-8 45 15)"
              fill="url(#butterGrad)"
              className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
              animate={
                mood === "excited" ? { y: [0, -3, 0], rotate: [-8, 2, -8] } : {}
              }
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
            <path
              d="M 45,21 Q 48,26 47,29"
              stroke="#fbc02d"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />
          </g>

          <g>
            <motion.circle
              cx="36"
              cy="48"
              style={{ x: eyeX, y: eyeY }}
              r="4.5"
              fill="#0d0d0f"
              animate={{ scaleY: getEyeHeight() / 8 }}
              transition={{ duration: 0.1 }}
            />
            {mood !== "sleepy" && !isBlinking && (
              <motion.circle
                cx="34.5"
                cy="46.5"
                style={{ x: eyeX, y: eyeY }}
                r="1.2"
                fill="#ffffff"
              />
            )}

            <motion.circle
              cx="64"
              cy="48"
              style={{ x: eyeX, y: eyeY }}
              r="4.5"
              fill="#0d0d0f"
              animate={{ scaleY: getEyeHeight() / 8 }}
              transition={{ duration: 0.1 }}
            />
            {mood !== "sleepy" && !isBlinking && (
              <motion.circle
                cx="62.5"
                cy="46.5"
                style={{ x: eyeX, y: eyeY }}
                r="1.2"
                fill="#ffffff"
              />
            )}
          </g>

          <path
            d={getMouthPath()}
            stroke="#0d0d0f"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill={mood === "excited" ? "#f43f5e" : "none"}
          />

          <circle cx="28" cy="55" r="3.5" fill="#f43f5e" opacity="0.25" />
          <circle cx="72" cy="55" r="3.5" fill="#f43f5e" opacity="0.25" />
        </svg>
      </motion.div>
    </div>
  );
}
