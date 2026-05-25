import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Copy,
  Flame,
  Layers3,
  Quote,
  Sparkles,
  TimerReset,
  Wand2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import ToastMascot from "../components/ui/ToastMascot";
import {
  useToasts,
  type ToastInput,
  type ToastVisualStyle,
} from "../hooks/useToasts";

const flavors: Array<
  ToastInput & {
    name: string;
    mood: "happy" | "focused" | "sleepy" | "excited";
  }
> = [
  {
    name: "Strawberry Jam",
    mood: "excited",
    type: "success",
    title: "Strawberry jam launch",
    description:
      "Classic gooey physics with a warm success finish and layered motion.",
    visualStyle: "classic",
    theme: "light",
    fillColor: "#FFFFFF",
    borderColor: "#FFD3C0",
    position: "bottom-right",
    variant: "expanded",
    showTimestamp: true,
    showAction: true,
    actionText: "Undo",
    actionSuccessText: "Restored",
  },
  {
    name: "Aurora Glaze",
    mood: "happy",
    type: "info",
    title: "Aurora glaze synced",
    description:
      "Glassmorphic depth, chromatic bloom, and a soft premium drift.",
    visualStyle: "glassmorphic-aurora",
    theme: "light",
    fillColor: "#FFFFFF",
    borderColor: "#EBD8FF",
    position: "top-center",
    variant: "expanded",
    showTimestamp: true,
  },
  {
    name: "Neon Crunch",
    mood: "focused",
    type: "warning",
    title: "Neon crunch armed",
    description:
      "Dark shell, vivid glow, and tactile swipe dismissal on demand.",
    visualStyle: "glow-neon",
    theme: "dark",
    fillColor: "#07131E",
    borderColor: "#F1A91D",
    position: "top-right",
    variant: "expanded",
    showTimestamp: true,
  },
  {
    name: "Cyber Marmalade",
    mood: "sleepy",
    type: "error",
    title: "Cyber marmalade overflow",
    description:
      "Angular contrast, semantic danger glow, and controlled queue pressure.",
    visualStyle: "liquid-cyberpunk",
    theme: "dark",
    fillColor: "#090914",
    borderColor: "#F97316",
    position: "bottom-left",
    variant: "expanded",
    errorShake: true,
  },
];

const pillars = [
  {
    title: "Deterministic toast lifecycle",
    copy: "Hover pause, collapse timing, swipe dismissal, and promise transitions now behave as a single interaction model.",
  },
  {
    title: "Queue policy as a first-class control",
    copy: "Stack or purge old toasts deliberately instead of letting overflow behavior stay implicit.",
  },
  {
    title: "Premium skins, not one-off CSS tricks",
    copy: "Classic, Aurora, Neon, and Cyberpunk each carry their own contrast, shadow, and motion personality.",
  },
];

export default function HomePage() {
  const { addToast, updateToast } = useToasts();
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const heroLift = useTransform(scrollYProgress, [0, 0.25], [0, -70]);
  const haloShift = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const sideGlowShift = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const [copied, setCopied] = useState(false);
  const [activeFlavor, setActiveFlavor] = useState(0);
  const [mascotMood, setMascotMood] = useState<
    "happy" | "focused" | "sleepy" | "excited"
  >("happy");

  useEffect(() => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname]);

  const copyInstall = async () => {
    await navigator.clipboard.writeText("npm install toastyy");
    setCopied(true);
    addToast({
      type: "success",
      title: "Install command copied",
      description: "Paste it into the terminal and start baking notifications.",
      visualStyle: "glassmorphic-aurora",
      duration: 2200,
    });
    window.setTimeout(() => setCopied(false), 1800);
  };

  const playFlavor = (index: number) => {
    const flavor = flavors[index];
    setActiveFlavor(index);
    setMascotMood(flavor.mood);
    addToast({
      ...flavor,
      duration: 5200,
      showProgress: true,
      pauseOnHover: true,
      swipeToDismiss: true,
    });
    window.setTimeout(() => setMascotMood("happy"), 2200);
  };

  const runPromiseDemo = () => {
    setMascotMood("excited");
    const toastId = addToast({
      type: "loading",
      title: "Proofing dough",
      description: "Promise toast is waiting for the motion system to settle.",
      visualStyle: "glassmorphic-aurora",
      position: "bottom-center",
      variant: "expanded",
      duration: 7000,
      showTimestamp: true,
    });

    window.setTimeout(() => {
      updateToast(toastId, {
        type: "success",
        title: "Proof complete",
        description:
          "The promise resolved into a success state without leaving the stack.",
        visualStyle: "classic",
        duration: 4200,
      });
      setMascotMood("happy");
    }, 1800);
  };

  const currentFlavor = flavors[activeFlavor];

  return (
    <div className="relative overflow-hidden">
      <motion.div
        style={{ y: haloShift }}
        className="pointer-events-none absolute left-[-8%] top-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,140,59,0.2),transparent_68%)] blur-3xl"
      />
      <motion.div
        style={{ y: sideGlowShift }}
        className="pointer-events-none absolute right-[-10%] top-[16%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.12),transparent_70%)] blur-3xl"
      />

      <section className="relative z-10 px-6 pb-20 pt-24 md:pb-28 md:pt-32">
        <div className="container-tight grid gap-12 xl:grid-cols-[1.1fr_0.9fr] xl:items-center">
          <motion.div
            style={{ y: heroLift }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-white/75 px-4 py-1.5 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-accent-2">
                Motion-first toast system
              </span>
            </div>

            <h1 className="max-w-3xl text-5xl font-black tracking-tight text-text md:text-7xl md:leading-[1.02]">
              Micro-feedbacks should feel baked, not bolted on.
            </h1>

            <p className="max-w-2xl text-base leading-8 text-text-2 md:text-lg">
              Toastyyy now ships with organic morphing, hover pause, tactile
              swipe, queue overflow policy, and four premium skins that make the
              stack feel designed instead of merely rendered.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => playFlavor(activeFlavor)}
                className="btn-primary justify-center px-8 py-4 shadow-accent"
              >
                <Flame className="h-4 w-4" />
                Launch current flavor
              </button>
              <button
                type="button"
                onClick={copyInstall}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border-strong bg-white px-6 py-4 text-sm font-bold text-text transition hover:border-accent/40 hover:text-accent-2"
              >
                <Copy className="h-4 w-4" />
                {copied ? "Copied npm install toastyy" : "Copy install command"}
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-[26px] border border-border-strong bg-white/80 p-5 shadow-sm backdrop-blur-sm"
                >
                  <h2 className="text-sm font-black text-text">
                    {pillar.title}
                  </h2>
                  <p className="mt-3 text-xs leading-6 text-text-2">
                    {pillar.copy}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute inset-6 rounded-[40px] bg-[radial-gradient(circle_at_top,rgba(255,140,59,0.18),transparent_55%)] blur-2xl" />
            <div className="relative overflow-hidden rounded-[38px] border border-border-strong bg-white/85 p-7 shadow-[0_30px_80px_rgba(18,19,26,0.08)] backdrop-blur-md">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-text-3">
                    Baking lab highlight
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-text">
                    {currentFlavor.name}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-text-2">
                    {currentFlavor.description}
                  </p>
                </div>
                <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-[0_24px_60px_rgba(255,140,59,0.12)]">
                  <div className="absolute inset-4 rounded-full bg-[radial-gradient(circle,rgba(255,140,59,0.16),transparent_72%)]" />
                  <ToastMascot size={90} mood={mascotMood} interactive={true} />
                </div>
              </div>

              <div className="mt-8 grid gap-3 md:grid-cols-2">
                {flavors.map((flavor, index) => (
                  <button
                    key={flavor.name}
                    type="button"
                    onClick={() => playFlavor(index)}
                    className={`rounded-[26px] border p-4 text-left transition ${
                      activeFlavor === index
                        ? "border-accent/35 bg-accent/5 shadow-[0_18px_40px_rgba(255,140,59,0.12)]"
                        : "border-border-strong bg-white hover:border-accent/30"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-black text-text">
                        {flavor.name}
                      </span>
                      <Wand2 className="h-4 w-4 text-accent-2" />
                    </div>
                    <p className="mt-2 text-xs leading-6 text-text-2">
                      {flavor.title}
                    </p>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={runPromiseDemo}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border-strong bg-surface-2 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-text transition hover:border-accent/35 hover:text-accent-2"
                >
                  <TimerReset className="h-4 w-4" />
                  Promise showcase
                </button>
                <Link
                  to="/builder"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border-strong bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-text transition hover:border-accent/35 hover:text-accent-2"
                >
                  Open motion lab
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 border-y border-border-strong bg-white/55 px-6 py-20 backdrop-blur-sm md:py-24">
        <div className="container-tight space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-text-3">
              How the system behaves
            </p>
            <h2 className="mt-3 text-3xl font-black text-text md:text-5xl">
              Morph first. Collapse late. Never let interaction continuity snap.
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="rounded-[30px] border border-border-strong bg-white px-6 py-7 shadow-sm"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <Layers3 className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-black text-text">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-7 text-text-2">
                  {pillar.copy}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-24">
        <div className="container-tight grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[34px] border border-border-strong bg-slate-950 p-8 text-white shadow-[0_26px_70px_rgba(15,23,42,0.24)]"
          >
            <Quote className="h-8 w-8 text-amber-300" />
            <p className="mt-6 text-2xl font-black leading-[1.35] md:text-3xl">
              Crafting micro-feedbacks is not about decoration. It is about
              making state changes feel legible, tactile, and worth trusting.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-text-3">
              Crafting micro-feedbacks
            </p>
            <h2 className="text-3xl font-black text-text md:text-5xl">
              The stack should teach the product’s rhythm in under a second.
            </h2>
            <p className="text-base leading-8 text-text-2">
              A good toast carries hierarchy, communicates urgency, and leaves
              the viewport with the same grace it entered. That is why Toastyyy
              now treats animation timing, stack policy, and theme identity as
              one system rather than unrelated toggles.
            </p>
            <Link
              to="/docs"
              className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-text transition hover:border-accent/35 hover:text-accent-2"
            >
              Read the API notes
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
