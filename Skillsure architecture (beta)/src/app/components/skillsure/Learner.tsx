import { GlassCard, GradientButton, IRAOrb, ProgressRing, SkillBadge, Logo } from "./primitives";
import { Flame, Play, Timer, Sparkles, ChevronRight, Lock, CheckCircle2, Circle, BookOpen } from "lucide-react";
import { motion } from "motion/react";
import { Screen } from "./Sidebar";

export function LearnerDashboard({ onNav }: { onNav: (s: Screen) => void }) {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-4">
          <Logo size="sm" />
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full ss-glass-strong text-xs uppercase tracking-[0.2em] text-cyan-300 mb-2 ss-glow-blue">
              <Sparkles className="h-3 w-3" /> Learner Mode
            </div>
            <h1 className="!text-3xl">Welcome back, Aryan</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="ss-glass rounded-full px-4 py-2 inline-flex items-center gap-2">
            <Flame className="h-4 w-4 text-amber-400" />
            <span className="font-bold text-amber-400">12</span><span className="text-xs text-slate-400">day streak</span>
          </div>
          <div className="flex items-center gap-2">
            <ProgressRing value={64} size={48} label="64%" />
            <div className="text-xs text-slate-400">Python<br />Gold path</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        <GlassCard className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3>Your Learning Path</h3>
            <button className="text-xs text-blue-400 inline-flex items-center gap-1" onClick={() => onNav("skill")}>View skill <ChevronRight className="h-3 w-3" /></button>
          </div>
          <div className="space-y-1">
            {[
              { t: "Python Fundamentals", s: "done" },
              { t: "Data Structures in Python", s: "done" },
              { t: "OOP & Functional Patterns", s: "current", p: 60 },
              { t: "NumPy & Pandas Mastery", s: "next" },
              { t: "ML Basics with Scikit-learn", s: "next" },
              { t: "Capstone Project + Gold Test", s: "next" },
            ].map((n, i) => (
              <motion.div key={n.t} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
                {n.s === "done" && <CheckCircle2 className="h-5 w-5 text-blue-400" />}
                {n.s === "current" && <span className="relative flex h-5 w-5"><span className="absolute inset-0 rounded-full bg-cyan-400/40 animate-ping" /><span className="relative h-5 w-5 rounded-full ss-gradient-brand" /></span>}
                {n.s === "next" && <Circle className="h-5 w-5 text-slate-600" />}
                <div className="flex-1">
                  <div className={`text-sm ${n.s === "next" ? "text-slate-500" : ""}`}>{n.t}</div>
                  {n.s === "current" && (
                    <div className="h-1 mt-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${n.p}%` }} transition={{ duration: 1 }} className="h-full ss-gradient-brand" />
                    </div>
                  )}
                </div>
                {n.s === "current" && <GradientButton size="sm">Continue</GradientButton>}
              </motion.div>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-4">
          <GlassCard className="p-6 text-center" hover>
            <Play className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
            <h4 className="mb-1">Practice Zone</h4>
            <p className="text-xs text-slate-400 mb-4">Infinite questions, IRA hints.</p>
            <GradientButton size="sm" className="w-full" onClick={() => onNav("practice")}>Enter</GradientButton>
          </GlassCard>
          <GlassCard className="p-6 text-center" hover>
            <Sparkles className="h-8 w-8 text-amber-400 mx-auto mb-3" />
            <h4 className="mb-1">Mock Test Zone</h4>
            <p className="text-xs text-slate-400 mb-4">Simulate the real exam.</p>
            <GradientButton size="sm" variant="gold" className="w-full" onClick={() => onNav("test")}>Start Mock</GradientButton>
          </GlassCard>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        <GlassCard className="p-6 ss-glow-blue">
          <div className="flex items-center gap-2 mb-3"><Timer className="h-4 w-4 text-cyan-400" /><h4>Upcoming Test</h4></div>
          <div className="text-xs text-slate-400 mb-1">Python · Gold Level</div>
          <div className="font-bold text-2xl ss-gradient-text" style={{ fontFamily: "var(--font-display)" }}>02 : 14 : 36</div>
          <div className="text-xs text-slate-500">days · hours · mins</div>
          <GradientButton size="sm" className="w-full mt-4" onClick={() => onNav("test")}>Prepare</GradientButton>
        </GlassCard>

        <GlassCard className="lg:col-span-2 p-6">
          <div className="flex items-center gap-2 mb-3"><IRAOrb size={24} pulse={false} /><h4>IRA Skill Suggestions</h4></div>
          <p className="text-sm text-slate-300 mb-4">Based on your EXTC background + current AI trends, IRA recommends:</p>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { n: "Python for AI/ML", l: "gold", t: "6w" },
              { n: "Prompt Engineering", l: "silver", t: "2w" },
              { n: "MLOps", l: "expert", t: "10w" },
            ].map((s) => (
              <button key={s.n} onClick={() => onNav("skill")} className="ss-glass rounded-xl p-4 text-left ss-card-hover">
                <SkillBadge name={s.l.toUpperCase()} level={s.l as any} />
                <div className="font-semibold mt-2">{s.n}</div>
                <div className="text-xs text-slate-500">~{s.t} to verify</div>
              </button>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h3 className="mb-4">Skill Categories</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { t: "Science & Tech", s: ["Engineering", "CS", "Data", "AI/ML"], icon: "⚛️" },
            { t: "Commerce", s: ["Finance", "Accounting", "Marketing"], icon: "📊" },
            { t: "Communication", s: ["Public Speaking", "Writing"], icon: "🎤" },
          ].map((cat) => (
            <button key={cat.t} onClick={() => onNav("skill")} className="ss-glass rounded-2xl p-5 text-left ss-card-hover">
              <div className="text-3xl mb-2">{cat.icon}</div>
              <div className="font-semibold mb-1">{cat.t}</div>
              <div className="flex flex-wrap gap-1.5">
                {cat.s.map((x) => <span key={x} className="text-xs bg-white/5 rounded-full px-2 py-0.5 text-slate-400">{x}</span>)}
              </div>
            </button>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

export function SkillDetail({ onTest }: { onTest: () => void }) {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="ss-glass rounded-3xl overflow-hidden mb-6">
        <div className="ss-gradient-brand p-8 relative">
          <div className="absolute inset-0 ss-dot-grid opacity-30" />
          <div className="relative">
            <div className="text-xs uppercase tracking-[0.2em] text-cyan-200 mb-2">Skill</div>
            <h1 className="!text-4xl mb-2">Python for AI/ML</h1>
            <p className="text-blue-100 max-w-xl">Master Python's data ecosystem — NumPy, Pandas, scikit-learn — and ship real ML projects.</p>
          </div>
        </div>
        <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { l: "Verified users", v: "12,400" },
            { l: "Avg time to Gold", v: "6 weeks" },
            { l: "Your level", v: "Silver" },
            { l: "Pass rate", v: "62%" },
          ].map((s) => (
            <div key={s.l}><div className="text-xs text-slate-400">{s.l}</div><div className="font-bold text-lg">{s.v}</div></div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <LevelCard tier="silver" topics={["Syntax", "Data types", "Control flow", "Functions", "OOP basics"]} weeks={2} status="done" onTest={onTest} />
        <LevelCard tier="gold" topics={["NumPy", "Pandas", "Visualisation", "Scikit-learn", "Capstone"]} weeks={4} status="current" onTest={onTest} />
        <LevelCard tier="expert" topics={["Deep Learning", "MLOps", "Deployment", "Real production project"]} weeks={8} status="locked" onTest={onTest} />
      </div>

      <GlassCard className="p-6">
        <div className="flex items-center gap-2 mb-4"><IRAOrb size={24} pulse={false} /><h3>IRA Study Plan</h3></div>
        <div className="space-y-2">
          {[
            { w: "Week 1", t: "Numpy fundamentals + array ops" },
            { w: "Week 2", t: "Pandas: cleaning + transformations" },
            { w: "Week 3", t: "Visualisation with matplotlib/seaborn" },
            { w: "Week 4", t: "Scikit-learn classifiers + capstone" },
          ].map((p) => (
            <details key={p.w} className="ss-glass rounded-xl p-3">
              <summary className="flex items-center gap-3 cursor-pointer text-sm"><BookOpen className="h-4 w-4 text-cyan-400" /><span className="font-mono text-xs text-cyan-300">{p.w}</span>{p.t}</summary>
              <div className="text-xs text-slate-400 mt-2 pl-7">3 lessons · 2 quizzes · 1 mini project</div>
            </details>
          ))}
        </div>
        <GradientButton className="mt-5" onClick={onTest} icon={<ChevronRight className="h-4 w-4" />}>Enroll & Start</GradientButton>
      </GlassCard>
    </div>
  );
}

function LevelCard({ tier, topics, weeks, status, onTest }: { tier: "silver" | "gold" | "expert"; topics: string[]; weeks: number; status: "done" | "current" | "locked"; onTest: () => void }) {
  const titles = { silver: "Fundamentals", gold: "Intermediate", expert: "Advanced + Real Projects" };
  const grad = tier === "silver" ? "ss-gradient-silver" : tier === "gold" ? "ss-gradient-gold" : "ss-gradient-expert";
  const text = tier === "expert" ? "text-white" : "text-[#0A0F1E]";
  return (
    <GlassCard className="p-1.5">
      <div className={`${grad} ${tier === "gold" ? "ss-shimmer" : ""} rounded-2xl p-5 ${text} relative overflow-hidden`}>
        <div className="text-xs uppercase tracking-wider opacity-80 mb-1">{tier}</div>
        <div className="font-bold text-xl mb-3" style={{ fontFamily: "var(--font-display)" }}>{titles[tier]}</div>
        <ul className="text-sm space-y-1 mb-4 opacity-90">
          {topics.map((t) => <li key={t}>· {t}</li>)}
        </ul>
        <div className="text-xs opacity-80 mb-4">~{weeks} weeks</div>
        {status === "done" ? (
          <button className="w-full bg-black/20 backdrop-blur rounded-full py-2 text-xs font-semibold inline-flex items-center justify-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5" />Verified</button>
        ) : status === "locked" ? (
          <button className="w-full bg-black/30 backdrop-blur rounded-full py-2 text-xs font-semibold inline-flex items-center justify-center gap-1.5 opacity-70"><Lock className="h-3.5 w-3.5" />Locked</button>
        ) : (
          <button onClick={onTest} className="w-full bg-black/30 hover:bg-black/40 backdrop-blur rounded-full py-2 text-xs font-semibold">Start Learning</button>
        )}
      </div>
    </GlassCard>
  );
}
