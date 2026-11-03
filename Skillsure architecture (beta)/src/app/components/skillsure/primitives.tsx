import { ReactNode, ButtonHTMLAttributes, MouseEvent, useRef, useState } from "react";
import { Zap, ShieldCheck, Award, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Magnetic, Tilt3D } from "./motion";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dim = size === "lg" ? "36" : size === "sm" ? "20" : "28";
  const text = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-lg";
  return (
    <div className="flex items-center gap-2.5">
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="ss-glow-blue"
      >
        <defs>
          <linearGradient id="ss-logo-grad1" x1="10" y1="10" x2="30" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00F0FF" />
            <stop offset="1" stopColor="#0057FF" />
          </linearGradient>
          <linearGradient id="ss-logo-grad2" x1="30" y1="10" x2="10" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00F0FF" />
            <stop offset="1" stopColor="#FFD700" />
          </linearGradient>
        </defs>
        
        {/* Figma/Claude/GPT inspired geometric logo */}
        {/* Top left droplet */}
        <path d="M20 20C20 11.7157 13.2843 5 5 5V20H20Z" fill="url(#ss-logo-grad1)" />
        {/* Bottom right droplet */}
        <path d="M20 20C20 28.2843 26.7157 35 35 35V20H20Z" fill="url(#ss-logo-grad1)" />
        {/* Top right circle */}
        <circle cx="27.5" cy="12.5" r="7.5" fill="url(#ss-logo-grad2)" />
        {/* Bottom left diamond/sparkle */}
        <path d="M12.5 20C12.5 20 14.5 24.5 19 27.5C14.5 30.5 12.5 35 12.5 35C12.5 35 10.5 30.5 6 27.5C10.5 24.5 12.5 20 12.5 20Z" fill="#0057FF" />
      </svg>
      <span style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }} className={`${text} font-bold tracking-tight`}>
        SKILL<span className="ss-gradient-text">SURE</span>
      </span>
    </div>
  );
}

export function GlassCard({
  children, className = "", hover = false, tilt = false, magnetic = false,
  spotlight = true, edgeGlow = false, popBadge,
}: {
  children: ReactNode; className?: string; hover?: boolean; tilt?: boolean; magnetic?: boolean;
  spotlight?: boolean; edgeGlow?: boolean; popBadge?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (!spotlight) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }
  const cls = [
    "ss-glass rounded-2xl relative group/card",
    hover && !tilt ? "ss-card-hover" : "",
    spotlight ? "ss-spotlight" : "",
    edgeGlow ? "ss-edge-glow" : "",
    className,
  ].filter(Boolean).join(" ");
  const inner = (
    <div ref={ref} onMouseMove={onMove} className={cls}>
      {children}
      {popBadge && (
        <motion.span
          aria-hidden
          initial={{ opacity: 0, y: -6, scale: 0.6, rotate: -8 }}
          whileHover={{}}
          className="pointer-events-none absolute -top-3 -right-3 z-20 ss-glass-strong rounded-full px-3 py-1 text-[10px] font-semibold text-cyan-300 uppercase tracking-wider opacity-0 scale-[0.6] -rotate-6 group-hover/card:opacity-100 group-hover/card:scale-100 group-hover/card:rotate-0 transition-all duration-500 ss-glow-blue"
          style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
        >
          {popBadge}
        </motion.span>
      )}
    </div>
  );
  const stretchCls = "h-full w-full";
  if (tilt && magnetic) return <Magnetic strength={14} className={stretchCls}><Tilt3D max={6} className={stretchCls}>{inner}</Tilt3D></Magnetic>;
  if (tilt) return <Tilt3D max={6} className={stretchCls}>{inner}</Tilt3D>;
  if (magnetic) return <Magnetic strength={14} className={stretchCls}>{inner}</Magnetic>;
  return inner;
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  magnetic?: boolean;
  runlight?: boolean;
  halo?: boolean;
  sheen?: boolean;
};
export function GradientButton({
  children, variant = "primary", size = "md", icon, className = "",
  magnetic = false, runlight, halo, sheen, onClick, ...rest
}: BtnProps) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const idRef = useRef(0);

  // Sensible defaults per variant — Apple-style ambient effects on all real CTAs
  const isPrimary = variant === "primary";
  const isGold    = variant === "gold";
  const useRunlight = runlight ?? (isPrimary || isGold);
  const useHalo     = halo     ?? (isPrimary || isGold);
  const useSheen    = sheen    ?? (isPrimary || isGold);

  const sizes = {
    sm: "px-3.5 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  };
  const styles = {
    primary: "ss-gradient-brand text-white",
    ghost:   "border border-white/15 text-white hover:bg-white/5",
    gold:    "ss-gradient-gold text-[#0A0F1E]",
  };

  // Inner button owns overflow-hidden effects (sheen + ripple + runlight ring).
  // Outer wrapper owns the halo (which extends beyond the button bounds and
  // therefore must NOT be clipped by overflow-hidden).
  const innerCls = [
    "relative inline-flex items-center justify-center gap-2 rounded-full font-medium overflow-hidden",
    sizes[size], styles[variant],
    useRunlight ? (isGold ? "ss-runlight ss-runlight-gold" : "ss-runlight") : "",
    useSheen    ? "ss-sheen" : "",
    className,
  ].filter(Boolean).join(" ");

  const outerCls = [
    "relative inline-block",
    useHalo ? (isGold ? "ss-halo ss-halo-gold" : "ss-halo") : "",
  ].filter(Boolean).join(" ");

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    const target = e.currentTarget;
    const r = target.getBoundingClientRect();
    const id = ++idRef.current;
    setRipples((prev) => [...prev, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((rp) => rp.id !== id));
    }, 720);
    (onClick as any)?.(e);
  }

  const btn = (
    <span className={outerCls}>
      <motion.button
        whileHover={{ y: -2, scale: 1.035 }}
        whileTap={{ y: 1, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 340, damping: 26, mass: 0.6 }}
        className={innerCls}
        onClick={handleClick}
        {...(rest as any)}
      >
        <span className="relative z-10 inline-flex items-center gap-2">{icon}{children}</span>
        {ripples.length > 0 && (
          <span className="ss-ripple-layer">
            {ripples.map((rp) => (
              <span key={rp.id} className="ss-ripple-dot" style={{ ["--rx" as any]: `${rp.x}px`, ["--ry" as any]: `${rp.y}px` }} />
            ))}
          </span>
        )}
      </motion.button>
    </span>
  );
  return magnetic ? <Magnetic strength={18}>{btn}</Magnetic> : btn;
}

export function SkillBadge({ name, level, withIcon = true }: { name: string; level: "silver" | "gold" | "expert"; withIcon?: boolean }) {
  const map = {
    silver: { bg: "ss-gradient-silver", text: "text-[#0A0F1E]", icon: <Award className="h-3 w-3" /> },
    gold: { bg: "ss-gradient-gold ss-shimmer", text: "text-[#0A0F1E]", icon: <Sparkles className="h-3 w-3" /> },
    expert: { bg: "ss-gradient-expert", text: "text-white", icon: <ShieldCheck className="h-3 w-3" /> },
  }[level];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${map.bg} ${map.text}`}>
      {withIcon && map.icon}
      {name}
    </span>
  );
}

export function SectionHeader({ eyebrow, title, subtitle, center = false }: { eyebrow?: string; title: ReactNode; subtitle?: string; center?: boolean }) {
  return (
    <div className={`${center ? "text-center mx-auto" : ""} max-w-2xl mb-10`}>
      {eyebrow && <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full ss-glass text-xs uppercase tracking-[0.2em] text-cyan-300 mb-4">{eyebrow}</div>}
      <h2 className="mb-3" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>{title}</h2>
      {subtitle && <p className="text-slate-400 text-base">{subtitle}</p>}
    </div>
  );
}

export function StatCard({ value, label, accent = "blue" }: { value: string; label: string; accent?: "blue" | "amber" | "red" }) {
  const color = accent === "amber" ? "text-amber-400" : accent === "red" ? "text-rose-400" : "ss-gradient-text";
  return (
    <GlassCard className="p-6" hover>
      <div className={`text-4xl font-bold mb-2 ${color}`} style={{ fontFamily: "var(--font-display)" }}>{value}</div>
      <div className="text-sm text-slate-400">{label}</div>
    </GlassCard>
  );
}

export function ProgressRing({ value, size = 56, label }: { value: number; size?: number; label?: string }) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - value / 100);
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(148,163,184,0.18)" strokeWidth="4" fill="none" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} stroke="url(#ringgrad)" strokeWidth="4" fill="none" strokeLinecap="round"
          strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: off }} transition={{ duration: 1, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="ringgrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute text-xs font-semibold">{label ?? `${value}%`}</span>
    </div>
  );
}

export function IRAOrb({ size = 40, pulse = true }: { size?: number; pulse?: boolean }) {
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      {pulse && <span className="absolute inset-0 rounded-full bg-cyan-400/30 blur-xl animate-pulse" />}
      <div
        className="relative rounded-full"
        style={{
          width: size, height: size,
          background: "conic-gradient(from 0deg, #3B82F6, #06B6D4, #A78BFA, #3B82F6)",
          boxShadow: "0 0 24px rgba(59,130,246,0.6), inset 0 0 16px rgba(255,255,255,0.2)",
          animation: "spin 8s linear infinite",
        }}
      />
      <span className="absolute font-bold text-white text-[10px]" style={{ fontFamily: "var(--font-display)" }}>IRA</span>
    </div>
  );
}
