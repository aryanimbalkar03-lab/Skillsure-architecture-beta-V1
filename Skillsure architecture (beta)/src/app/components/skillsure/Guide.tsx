import { useState } from "react";
import { GlassCard, GradientButton, IRAOrb, SkillBadge, Logo } from "./primitives";
import { motion } from "motion/react";
import {
  Compass, Sparkles, Briefcase, GraduationCap, Camera, ShieldCheck,
  DollarSign, FileText, MessageSquare, Code2, Palette, BarChart3,
  Database, Megaphone, Wrench, Brain, Cpu, ArrowRight, CheckCircle2,
  Search, Play, BookOpen, Trophy, Users,
} from "lucide-react";

const FEATURES = [
  { icon: Sparkles, title: "IRA Chatbot", body: "Context-aware AI coach. Roadmaps, mock interviews, salary benchmarks, motivation.", to: "ira" },
  { icon: ShieldCheck, title: "3-Tier Verification", body: "Silver, Gold, Expert badges earned through AI-proctored tests. Recruiters filter on them.", to: "skill" },
  { icon: Camera, title: "Test Zone — Proctored", body: "Live camera + gaze tracking, tab-switch lock, copy-paste disabled. Cheat-proof verification.", to: "test" },
  { icon: GraduationCap, title: "Learner Mode", body: "Structured curriculum, infinite practice, IRA hints on demand. Dual-mode toggle.", to: "learner" },
  { icon: Briefcase, title: "Verified-Only Jobs", body: "Apply only if you have the required badge. Filters noise on both sides of the table.", to: "jobs" },
  { icon: BarChart3, title: "Hirer Dashboard", body: "Post immediate or scheduled hires, see verified candidates ranked by badge tier.", to: "hirer" },
  { icon: DollarSign, title: "Creator Economics", body: "Monetize posts: tips, paid mentorship slots, sponsorships. Track earnings live.", to: "feed" },
  { icon: FileText, title: "Resume Builder", body: "ATS-optimized templates. Auto-syncs your verifications, projects, and impact metrics.", to: "resume" },
  { icon: MessageSquare, title: "Messages", body: "DMs with recruiters, mentors, peers. Voice notes, attachments, read receipts.", to: "messages" },
];

const CATEGORIES = [
  {
    icon: Code2, name: "Engineering", color: "from-blue-500 to-cyan-400",
    skills: ["React", "TypeScript", "Python", "Go", "Rust", "Node.js", "GraphQL", "Kubernetes", "System Design", "DSA"],
    count: "42K verified",
  },
  {
    icon: Palette, name: "Design", color: "from-pink-500 to-purple-500",
    skills: ["Figma", "UX Research", "Design Systems", "Motion", "Prototyping", "Webflow", "Brand"],
    count: "18K verified",
  },
  {
    icon: Brain, name: "AI / ML", color: "from-violet-500 to-fuchsia-500",
    skills: ["PyTorch", "Transformers", "RAG", "LLM Eval", "Computer Vision", "MLOps"],
    count: "9.4K verified",
  },
  {
    icon: Database, name: "Data", color: "from-emerald-500 to-teal-400",
    skills: ["SQL", "dbt", "Airflow", "Snowflake", "Pandas", "Tableau", "Spark"],
    count: "12K verified",
  },
  {
    icon: BarChart3, name: "Product", color: "from-amber-500 to-orange-500",
    skills: ["PRDs", "Roadmapping", "Analytics", "Experimentation", "Discovery"],
    count: "6.8K verified",
  },
  {
    icon: Megaphone, name: "Marketing", color: "from-rose-500 to-red-500",
    skills: ["SEO", "Content", "Lifecycle", "Paid Ads", "Brand Strategy"],
    count: "5.1K verified",
  },
  {
    icon: Wrench, name: "DevOps", color: "from-slate-500 to-zinc-400",
    skills: ["AWS", "Terraform", "Docker", "CI/CD", "Observability", "Linux"],
    count: "7.2K verified",
  },
  {
    icon: Cpu, name: "Hardware", color: "from-indigo-500 to-blue-600",
    skills: ["Embedded C", "RTOS", "PCB Design", "FPGA", "Robotics"],
    count: "2.3K verified",
  },
];

const STEPS = [
  { n: 1, t: "Onboard", d: "Tell IRA your goals — she builds your starting profile in 60 seconds." },
  { n: 2, t: "Pick a category", d: "Browse 8 skill categories. Each has a verified test path and learning roadmap." },
  { n: 3, t: "Practice", d: "Unlimited drills in Practice Zone with IRA hints. Sharpen until you're consistent." },
  { n: 4, t: "Get verified", d: "Take the proctored Test Zone exam. Earn Silver, Gold, or Expert based on score." },
  { n: 5, t: "Apply or get hired", d: "Verified-only jobs unlock automatically. Or post a hire if you're recruiting." },
  { n: 6, t: "Earn", d: "Monetize your knowledge — paid posts, mentorship, sponsorships." },
];

export function Guide({ onNav }: { onNav: (s: any) => void }) {
  const [tab, setTab] = useState<"overview" | "categories" | "features" | "how">("overview");
  const [search, setSearch] = useState("");

  const filteredCats = CATEGORIES.map((c) => ({
    ...c,
    skills: search ? c.skills.filter((s) => s.toLowerCase().includes(search.toLowerCase())) : c.skills,
  })).filter((c) => !search || c.skills.length > 0 || c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Logo size="lg" />
        <div>
          <h1 className="!text-3xl mb-0.5">The SkillSure Guide</h1>
          <p className="text-sm text-slate-400">Everything you can do here, in one page.</p>
        </div>
      </div>

      <div className="ss-glass rounded-full p-1 inline-flex mt-5 mb-6 flex-wrap">
        {[
          { id: "overview", label: "Overview" },
          { id: "categories", label: "Skill Categories" },
          { id: "features", label: "Features" },
          { id: "how", label: "How it Works" },
        ].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id as any)}
            className={`relative px-4 py-1.5 text-sm rounded-full transition ${tab === t.id ? "text-white" : "text-slate-400 hover:text-white"}`}>
            {tab === t.id && <motion.span layoutId="guidetab" className="absolute inset-0 ss-gradient-brand rounded-full -z-0" />}
            <span className="relative z-10">{t.label}</span>
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="grid lg:grid-cols-3 gap-5">
          <GlassCard className="p-6 lg:col-span-2 ss-glow-blue">
            <div className="flex items-center gap-3 mb-3">
              <IRAOrb size={32} />
              <div>
                <div className="text-xs text-cyan-300 uppercase tracking-wider">From IRA</div>
                <h3>Welcome to SkillSure</h3>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              SkillSure is a verified-skill marketplace. Instead of trusting resumes, recruiters here trust badges —
              earned through AI-proctored tests across 8 categories. You learn in <span className="text-cyan-300">Learner Mode</span>,
              network and get hired in <span className="text-cyan-300">Socio Mode</span>, and earn from your knowledge through creator tools.
            </p>
            <div className="flex flex-wrap gap-2">
              <GradientButton size="sm" onClick={() => onNav("learner")} icon={<Play className="h-3.5 w-3.5" />}>Start Learning</GradientButton>
              <GradientButton size="sm" variant="ghost" onClick={() => onNav("feed")} icon={<Users className="h-3.5 w-3.5" />}>Open Feed</GradientButton>
              <GradientButton size="sm" variant="ghost" onClick={() => onNav("ira")} icon={<Sparkles className="h-3.5 w-3.5" />}>Talk to IRA</GradientButton>
            </div>
          </GlassCard>
          {[
            { i: Trophy, n: "Top 8%", l: "Your learner percentile" },
            { i: ShieldCheck, n: "6", l: "Badges earned" },
            { i: BookOpen, n: "14", l: "Verifications passed" },
          ].map((s) => {
            const Icon = s.i;
            return (
              <GlassCard key={s.l} className="p-5 flex items-center gap-3">
                <Icon className="h-6 w-6 text-cyan-300" />
                <div>
                  <div className="text-2xl font-bold ss-gradient-text" style={{ fontFamily: "var(--font-display)" }}>{s.n}</div>
                  <div className="text-xs text-slate-400">{s.l}</div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}

      {tab === "categories" && (
        <>
          <div className="relative max-w-md mb-5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search skills (e.g. React, Figma, SQL)…"
              className="w-full bg-[var(--input-background)] border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue-500" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCats.map((c) => {
              const Icon = c.icon;
              return (
                <motion.div key={c.name} whileHover={{ y: -3 }}>
                  <GlassCard className="p-5 h-full" hover>
                    <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-3`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <h4>{c.name}</h4>
                      <span className="text-xs text-slate-500">{c.count}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {c.skills.slice(0, 6).map((s) => (
                        <span key={s} className="ss-glass-strong text-xs px-2 py-1 rounded-full text-slate-300">{s}</span>
                      ))}
                      {c.skills.length > 6 && <span className="text-xs text-slate-500 px-2 py-1">+{c.skills.length - 6}</span>}
                    </div>
                    <button onClick={() => onNav("learner")} className="text-xs text-cyan-300 mt-3 inline-flex items-center gap-1 hover:text-cyan-200">
                      Explore path <ArrowRight className="h-3 w-3" />
                    </button>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </>
      )}

      {tab === "features" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <GlassCard key={f.title} className="p-5 group" hover>
                <div className="h-10 w-10 rounded-xl ss-glass-strong flex items-center justify-center mb-3 group-hover:ss-gradient-brand transition">
                  <Icon className="h-5 w-5 text-cyan-300 group-hover:text-white" />
                </div>
                <h4 className="mb-1.5">{f.title}</h4>
                <p className="text-sm text-slate-400 mb-3">{f.body}</p>
                <button onClick={() => onNav(f.to)} className="text-xs text-cyan-300 inline-flex items-center gap-1 hover:text-cyan-200">
                  Open <ArrowRight className="h-3 w-3" />
                </button>
              </GlassCard>
            );
          })}
        </div>
      )}

      {tab === "how" && (
        <div className="grid lg:grid-cols-2 gap-5">
          {STEPS.map((s, i) => (
            <motion.div key={s.n} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
              <GlassCard className="p-5 flex gap-4">
                <div className="h-10 w-10 rounded-xl ss-gradient-brand flex items-center justify-center font-bold flex-shrink-0">{s.n}</div>
                <div>
                  <h4 className="mb-1">{s.t}</h4>
                  <p className="text-sm text-slate-400">{s.d}</p>
                </div>
                <CheckCircle2 className="h-5 w-5 text-emerald-400 ml-auto flex-shrink-0" />
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
