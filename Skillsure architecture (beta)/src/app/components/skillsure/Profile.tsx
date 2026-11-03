import { GlassCard, GradientButton, SkillBadge, ProgressRing, Logo } from "./primitives";
import { ShieldCheck, MapPin, Building2, Users, MessageSquare, Share2, Download, Award, Sparkles, Calendar, ExternalLink } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const silverSkills = ["HTML/CSS", "Git", "SQL Basics"];
const goldSkills = ["Node.js", "TypeScript", "PostgreSQL"];
const expertSkills = ["React", "System Design"];

const skillSummaries: Record<string, string> = {
  React: "Aryan has demonstrated Expert-level proficiency in React. He builds, deploys, and scales production-grade SPAs using React 18, TanStack Query, and modern state patterns.",
  "System Design": "Aryan has demonstrated Expert-level proficiency in System Design. He can architect distributed services, choose data stores, and reason about scalability trade-offs.",
  "Node.js": "Aryan has demonstrated Gold-level proficiency in Node.js. He builds resilient REST/GraphQL APIs, handles async patterns, and tunes runtime performance.",
};

export function Profile() {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="relative h-48 rounded-3xl overflow-hidden mb-0">
        <div className="absolute inset-0 ss-gradient-brand" />
        <div className="absolute inset-0 ss-dot-grid opacity-30" />
        <div className="absolute top-4 right-4 z-10"><Logo size="sm" /></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-transparent" />
      </div>

      <div className="relative -mt-16 px-6 mb-6">
        <div className="flex items-end gap-5 flex-wrap">
          <div className="relative">
            <div className="h-32 w-32 rounded-full ss-gradient-brand ring-4 ring-amber-400/80 flex items-center justify-center text-3xl font-bold border-4 border-[#0A0F1E]" style={{ fontFamily: "var(--font-display)" }}>AR</div>
            <span className="absolute bottom-1 right-1 h-7 w-7 rounded-full ss-gradient-expert flex items-center justify-center border-2 border-[#0A0F1E]">
              <ShieldCheck className="h-4 w-4" />
            </span>
          </div>
          <div className="flex-1 min-w-0 pb-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="!text-3xl">Aryan Raj</h1>
              <ShieldCheck className="h-6 w-6 text-blue-400" />
            </div>
            <div className="text-sm text-slate-400 mb-1">@aryan.dev · Full Stack Engineer</div>
            <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />Mumbai, IN</span>
              <span className="flex items-center gap-1"><Building2 className="h-3 w-3" />IIT Bombay · CSE '24</span>
              <span className="flex items-center gap-1"><Users className="h-3 w-3" />842 connections</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap pb-2">
            <GradientButton size="sm">Connect</GradientButton>
            <GradientButton size="sm" variant="ghost" icon={<MessageSquare className="h-3.5 w-3.5" />}>Message</GradientButton>
            <GradientButton size="sm" variant="ghost" icon={<Share2 className="h-3.5 w-3.5" />}>Share</GradientButton>
            <GradientButton size="sm" variant="ghost" icon={<Download className="h-3.5 w-3.5" />}>Resume</GradientButton>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <SkillBox tier="silver" title="Silver" subtitle="Fundamentals verified" skills={silverSkills} setHover={setHover} />
        <SkillBox tier="gold" title="Gold" subtitle="Intermediate verified" skills={goldSkills} setHover={setHover} />
        <SkillBox tier="expert" title="Expert" subtitle="Blue tick verified" skills={expertSkills} setHover={setHover} />
      </div>

      <AnimatePresence>
        {hover && skillSummaries[hover] && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed bottom-6 right-6 max-w-sm z-50">
            <GlassCard className="p-5 ss-glow-blue">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-4 w-4 text-blue-400" />
                <span className="font-semibold">{hover}</span>
              </div>
              <p className="text-sm text-slate-300 mb-3">{skillSummaries[hover]}</p>
              <div className="flex justify-between text-xs text-slate-500 mb-3">
                <span><Calendar className="h-3 w-3 inline mr-1" />Verified Mar 2026</span>
                <span>92nd percentile</span>
              </div>
              <button className="text-xs text-blue-400 inline-flex items-center gap-1">View Certificate <ExternalLink className="h-3 w-3" /></button>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <GlassCard className="p-6">
            <h3 className="mb-4">Experience</h3>
            <div className="space-y-4">
              {[
                { c: "Razorpay", r: "SDE Intern", d: "2025 · 6 mos", note: "Built fraud-detection dashboards in React + TypeScript." },
                { c: "Open Source", r: "Maintainer", d: "2024 — present", note: "Contributing to React ecosystem libraries." },
              ].map((e) => (
                <div key={e.c} className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl ss-glass flex items-center justify-center"><Building2 className="h-4 w-4 text-blue-400" /></div>
                  <div className="flex-1">
                    <div className="font-semibold">{e.r} · {e.c}</div>
                    <div className="text-xs text-slate-500 mb-1">{e.d}</div>
                    <p className="text-sm text-slate-400">{e.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="mb-4">Education</h3>
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-xl ss-glass flex items-center justify-center"><Award className="h-4 w-4 text-amber-400" /></div>
              <div>
                <div className="font-semibold">B.Tech, Computer Science</div>
                <div className="text-xs text-slate-500">IIT Bombay · 2020 — 2024 · CGPA 8.9</div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="mb-4">Activity</h3>
            <div className="space-y-3 text-sm">
              {[
                "🏆 Earned Expert badge in System Design",
                "📝 Posted: 'Hot take on bootcamps vs verified skills'",
                "🤝 Connected with Priya Sharma",
              ].map((a, i) => <div key={i} className="text-slate-300 border-b border-white/5 pb-2 last:border-0">{a}</div>)}
            </div>
          </GlassCard>
        </div>

        <div className="space-y-5">
          <GlassCard className="p-6">
            <h3 className="mb-4">Skill mastery</h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div><ProgressRing value={92} size={64} /><div className="text-xs text-slate-500 mt-2">React</div></div>
              <div><ProgressRing value={78} size={64} /><div className="text-xs text-slate-500 mt-2">Node</div></div>
              <div><ProgressRing value={65} size={64} /><div className="text-xs text-slate-500 mt-2">DSA</div></div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="mb-4">Certifications</h3>
            <div className="space-y-3">
              {expertSkills.map((s) => (
                <div key={s} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-blue-400" />{s}</div>
                  <span className="text-xs text-slate-500">Mar 2026</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="mb-2">Resume preview</h3>
            <div className="aspect-[3/4] rounded-xl bg-white/5 border border-white/10 ss-dot-grid" />
            <GradientButton size="sm" className="w-full mt-3" icon={<Download className="h-3.5 w-3.5" />}>Download PDF</GradientButton>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function SkillBox({ tier, title, subtitle, skills, setHover }: any) {
  const grad = tier === "silver" ? "ss-gradient-silver" : tier === "gold" ? "ss-gradient-gold" : "ss-gradient-expert";
  const text = tier === "expert" ? "text-white" : "text-[#0A0F1E]";
  return (
    <GlassCard className="p-1.5">
      <div className={`${grad} ${tier === "gold" ? "ss-shimmer" : ""} rounded-2xl p-5 ${text}`}>
        <div className="flex items-center justify-between mb-1">
          <div className="font-bold uppercase tracking-wider text-xs opacity-80">{title}</div>
          {tier === "expert" && <ShieldCheck className="h-4 w-4" />}
          {tier === "gold" && <Sparkles className="h-4 w-4" />}
          {tier === "silver" && <Award className="h-4 w-4" />}
        </div>
        <div className="text-xs opacity-70 mb-4">{subtitle}</div>
        <div className="flex flex-wrap gap-1.5">
          {skills.map((s: string) => (
            <button key={s} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(null)}
              className="bg-black/20 hover:bg-black/30 backdrop-blur rounded-full px-2.5 py-1 text-xs font-semibold">
              {s}
            </button>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
