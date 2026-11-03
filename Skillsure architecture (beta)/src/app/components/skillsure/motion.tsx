import { ReactNode, useRef, useState, useEffect, MouseEvent, CSSProperties } from "react";
import { motion, useMotionValue, useSpring, useInView, HTMLMotionProps } from "motion/react";

/* ================================================================
   SkillSure motion library — Apple + Pomelli grade primitives
   All components respect prefers-reduced-motion via the OS-level
   media query already handled in theme.css.
   ================================================================ */

/* ---------- Spring presets ---------- */
export const SPRING = {
  gentle:   { type: "spring", stiffness: 120, damping: 20, mass: 0.9 } as const,
  snappy:   { type: "spring", stiffness: 340, damping: 26, mass: 0.6 } as const,
  bouncy:   { type: "spring", stiffness: 260, damping: 16, mass: 0.8 } as const,
  hero:     { type: "spring", stiffness: 90,  damping: 18, mass: 1.1 } as const,
  micro:    { type: "spring", stiffness: 500, damping: 32, mass: 0.4 } as const,
};

/* ---------- ScrollReveal — Apple-style rise + soft blur ---------- */
export function ScrollReveal({
  children, delay = 0, y = 32, className = "", once = true,
}: { children: ReactNode; delay?: number; y?: number; className?: string; once?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ ...SPRING.hero, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- StaggerGroup — for lists of cards / grids ---------- */
export function StaggerGroup({ children, delay = 0, gap = 0.08, className = "" }: { children: ReactNode; delay?: number; gap?: number; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ staggerChildren: gap, delayChildren: delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
        show:   { opacity: 1, y: 0, filter: "blur(0px)", transition: SPRING.hero },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- MagneticWrap — cursor pulls the element gently ----------
   Apple's product-page CTAs use this subtle magnetism. */
export function Magnetic({ children, strength = 22, className = "", style }: { children: ReactNode; strength?: number; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING.snappy);
  const sy = useSpring(y, SPRING.snappy);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);
    x.set((relX / r.width) * strength);
    y.set((relY / r.height) * strength);
  }
  function onLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Tilt3D — Apple product-card 3D tilt on hover ----------
   Caches the bounding rect on mouseenter so the rotation input isn't
   measured against an already-rotated element (which causes feedback jitter). */
export function Tilt3D({ children, max = 8, className = "", style }: { children: ReactNode; max?: number; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 22, mass: 0.9 });
  const sry = useSpring(ry, { stiffness: 180, damping: 22, mass: 0.9 });

  function onEnter() {
    const el = ref.current;
    if (!el) return;
    rectRef.current = el.getBoundingClientRect();
  }
  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = rectRef.current;
    if (!r) return;
    const px = (e.clientX - r.left) / r.width;   // 0..1
    const py = (e.clientY - r.top)  / r.height;
    ry.set((px - 0.5) * (max * 2));
    rx.set(-(py - 0.5) * (max * 2));
  }
  function onLeave() { rx.set(0); ry.set(0); rectRef.current = null; }

  return (
    <motion.div
      ref={ref}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", perspective: 1000, willChange: "transform", ...style }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ---------- ParallaxLayer — scroll-driven Y translate ---------- */
export function ParallaxLayer({ children, speed = 0.2, className = "" }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const sy = useSpring(y, { stiffness: 90, damping: 22, mass: 0.8 });

  useEffect(() => {
    function update() {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // progress from -1 (fully below viewport) to +1 (fully above)
      const progress = (vh / 2 - (r.top + r.height / 2)) / (vh / 2 + r.height / 2);
      y.set(progress * 50 * speed);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [y, speed]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y: sy }}>{children}</motion.div>
    </div>
  );
}

/* ---------- MorphOrb — Pomelli-style morphing blob ---------- */
export function MorphOrb({ size = 240, color = "rgba(37,99,235,0.35)", className = "", style }: { size?: number; color?: string; className?: string; style?: CSSProperties }) {
  return (
    <motion.div
      aria-hidden
      className={`ss-blob ${className}`}
      style={{
        width: size, height: size,
        background: `radial-gradient(closest-side, ${color}, transparent 70%)`,
        ...style,
      }}
    />
  );
}

/* ---------- FadeSlider — a hero image reveal used by Landing ---------- */
export function FadeSlider({ children, className = "", from = "left" }: { children: ReactNode; className?: string; from?: "left" | "right" | "bottom" }) {
  const initial = from === "left" ? { x: -60 } : from === "right" ? { x: 60 } : { y: 60 };
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)", ...initial }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={SPRING.hero}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- MotionButton — spring press with subtle magnetism ---------- */
export function MotionButton(props: HTMLMotionProps<"button">) {
  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ y: 1, scale: 0.97 }}
      transition={SPRING.snappy}
      {...props}
    />
  );
}

/* ---------- MarqueeRow — Apple-style infinite horizontal marquee ---------- */
export function MarqueeRow({ children, duration = 30, className = "" }: { children: ReactNode; duration?: number; className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {children}{children}
      </motion.div>
    </div>
  );
}

/* ---------- CountUp — Apple-style rolling counter ---------- */
export function CountUp({ to, duration = 1.6, suffix = "", className = "" }: { to: number; duration?: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 4);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return <span ref={ref} className={className}>{n.toLocaleString()}{suffix}</span>;
}

/* ---------- Page transitions ---------- */
export const pageTransition = {
  initial: { opacity: 0, y: 16, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0,  filter: "blur(0px)" },
  exit:    { opacity: 0, y: -8, filter: "blur(4px)" },
  transition: { ...SPRING.hero },
};
