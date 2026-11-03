import { Home, Compass, GraduationCap, Briefcase, MessageSquare, Sparkles, BookOpen, Settings, ChevronsLeft, FileText, BarChart3, HelpCircle } from "lucide-react";
import { Logo, IRAOrb, SkillBadge } from "./primitives";
import { motion } from "motion/react";

export type Screen =
  | "landing" | "onboarding" | "feed" | "profile" | "jobs" | "hirer"
  | "learner" | "skill" | "test" | "practice" | "ira" | "messages"
  | "settings" | "resume" | "guide";

const items: { id: Screen; label: string; icon: any }[] = [
  { id: "feed", label: "Home", icon: Home },
  { id: "profile", label: "Profile", icon: Compass },
  { id: "jobs", label: "Jobs", icon: Briefcase },
  { id: "hirer", label: "Hirer", icon: BarChart3 },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "ira", label: "IRA Chat", icon: Sparkles },
  { id: "resume", label: "Resume", icon: FileText },
  { id: "guide", label: "Guide", icon: HelpCircle },
  { id: "settings", label: "Settings", icon: Settings },
];

const learnerItems: { id: Screen; label: string; icon: any }[] = [
  { id: "learner", label: "Dashboard", icon: GraduationCap },
  { id: "skill", label: "Skills", icon: BookOpen },
  { id: "practice", label: "Practice", icon: Compass },
  { id: "test", label: "Test Zone", icon: Sparkles },
  { id: "ira", label: "IRA Chat", icon: Sparkles },
  { id: "guide", label: "Guide", icon: HelpCircle },
];

export function Sidebar({ active, mode, onNavigate, onModeSwitch }: {
  active: Screen; mode: "socio" | "learner";
  onNavigate: (s: Screen) => void; onModeSwitch: () => void;
}) {
  const list = mode === "learner" ? learnerItems : items;
  return (
    <aside className="ss-glass-strong w-64 shrink-0 flex flex-col h-screen sticky top-0 border-r border-white/5">
      <div className="px-5 py-5 border-b border-white/5">
        <Logo size="md" />
      </div>

      <div className="px-4 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-11 w-11 rounded-full ss-gradient-brand flex items-center justify-center font-bold ring-2 ring-amber-400/60">AR</div>
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold truncate">Aryan Raj</div>
            <div className="text-xs text-slate-400 truncate">@aryan.dev</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          <SkillBadge name="3" level="silver" />
          <SkillBadge name="2" level="gold" />
          <SkillBadge name="1" level="expert" />
        </div>
      </div>

      <nav className="flex-1 px-3 py-3 space-y-1 overflow-auto">
        {list.map((it) => {
          const Icon = it.icon;
          const isActive = active === it.id;
          return (
            <button
              key={it.id}
              onClick={() => onNavigate(it.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition relative ${isActive ? "bg-blue-500/15 text-white" : "text-slate-300 hover:bg-white/5"}`}
            >
              {isActive && <motion.span layoutId="navactive" className="absolute left-0 top-1.5 bottom-1.5 w-1 ss-gradient-brand rounded-r" />}
              <Icon className="h-4 w-4" />
              <span>{it.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-3">
        <button
          onClick={onModeSwitch}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-full font-medium transition ${mode === "learner" ? "ss-gradient-brand text-white ss-glow-blue" : "ss-glass text-white hover:bg-white/5"}`}
        >
          <IRAOrb size={20} pulse={false} />
          <span className="text-sm">{mode === "learner" ? "Learner Mode" : "Switch to Learner"}</span>
        </button>
        <button className="w-full flex items-center justify-center gap-2 text-xs text-slate-500 hover:text-slate-300">
          <ChevronsLeft className="h-3 w-3" /> Collapse
        </button>
      </div>
    </aside>
  );
}
