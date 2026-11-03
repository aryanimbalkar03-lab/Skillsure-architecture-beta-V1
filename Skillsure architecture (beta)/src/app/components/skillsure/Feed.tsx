import { GlassCard, GradientButton, SkillBadge, IRAOrb } from "./primitives";
import { Bell, Search, Heart, MessageCircle, Share2, Bookmark, Briefcase, Calendar, Lock, ShieldCheck, TrendingUp, UserPlus, ArrowUpRight, DollarSign, Image as ImageIcon, Video, Crown, Gift, Wallet, Zap, X, Sparkles, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useMemo } from "react";
import { searchPeople } from "./iraEngine";

type MonetizationTier = "free" | "tip" | "paid" | "mentor";
const TIER_INFO: Record<MonetizationTier, { label: string; icon: any; price?: string; color: string; desc: string }> = {
  free:   { label: "Free post",       icon: Share2,  color: "text-slate-300", desc: "Visible to everyone" },
  tip:    { label: "Tip-enabled",     icon: Gift,    color: "text-cyan-300",  desc: "Readers can tip ₹10+" },
  paid:   { label: "Paid post",       icon: Crown,   price: "₹49", color: "text-amber-300", desc: "Locked until purchase" },
  mentor: { label: "1:1 mentor slot", icon: Zap,     price: "₹999/30min", color: "text-fuchsia-300", desc: "Bookable session" },
};

function Composer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tier, setTier] = useState<MonetizationTier>("free");
  const [text, setText] = useState("");
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-[#050814]/85 backdrop-blur flex items-center justify-center p-6" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="ss-glass-strong rounded-3xl p-6 max-w-xl w-full ss-glow-blue">
        <div className="flex items-center justify-between mb-4">
          <h3>Create post</h3>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/10"><X className="h-4 w-4" /></button>
        </div>
        <div className="flex items-start gap-3 mb-3">
          <div className="h-10 w-10 rounded-full ss-gradient-brand flex items-center justify-center font-bold text-sm">AR</div>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} placeholder="Share an insight, a milestone, or a paid masterclass…"
            className="flex-1 bg-[var(--input-background)] border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-blue-500 resize-none" />
        </div>
        <div className="flex gap-2 mb-4">
          <button className="ss-glass rounded-lg px-3 py-1.5 text-xs hover:bg-white/10 inline-flex items-center gap-1.5"><ImageIcon className="h-3.5 w-3.5" /> Image</button>
          <button className="ss-glass rounded-lg px-3 py-1.5 text-xs hover:bg-white/10 inline-flex items-center gap-1.5"><Video className="h-3.5 w-3.5" /> Video</button>
        </div>

        <div className="text-xs uppercase tracking-wider text-slate-500 mb-2">Monetization</div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {(Object.keys(TIER_INFO) as MonetizationTier[]).map((k) => {
            const t = TIER_INFO[k]; const Icon = t.icon; const active = tier === k;
            return (
              <button key={k} onClick={() => setTier(k)}
                className={`text-left rounded-xl p-3 border transition ${active ? "ss-gradient-brand border-blue-400 ss-glow-blue" : "ss-glass border-white/10 hover:border-blue-400/40"}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`h-4 w-4 ${active ? "text-white" : t.color}`} />
                  <span className="text-sm font-semibold">{t.label}</span>
                  {t.price && <span className={`ml-auto text-xs ${active ? "text-white" : "text-slate-400"}`}>{t.price}</span>}
                </div>
                <div className={`text-xs ${active ? "text-white/80" : "text-slate-500"}`}>{t.desc}</div>
              </button>
            );
          })}
        </div>

        <div className="ss-glass rounded-xl p-3 mb-4 flex items-center gap-3 text-xs text-slate-400">
          <Wallet className="h-4 w-4 text-cyan-300" />
          <span>SkillSure takes 12% · You keep <span className="text-emerald-300 font-semibold">88%</span> of every transaction</span>
        </div>

        <div className="flex justify-end gap-2">
          <GradientButton variant="ghost" size="sm" onClick={onClose}>Cancel</GradientButton>
          <GradientButton size="sm" onClick={onClose}>Publish</GradientButton>
        </div>
      </motion.div>
    </div>
  );
}

const posts = [
  {
    type: "hire", urgent: true, user: "Priya Sharma", role: "Recruiter @ Razorpay", time: "2h",
    title: "Hiring: Senior React Engineer", skill: "React", level: "gold" as const, jobType: "Immediate",
    body: "Looking for a Gold-verified React developer. 3+ yrs. Mumbai/Remote. Apply only if verified.",
  },
  {
    type: "skill", user: "Rahul Mehta", role: "@rahul.codes · Verified Expert", time: "4h",
    body: "Just cleared Expert-level System Design 🔥 Took me 6 weeks of grinding. Shoutout to IRA for the roadmap.",
    skills: [{ n: "System Design", l: "expert" as const }],
  },
  {
    type: "hire", urgent: false, user: "Aanya Kapoor", role: "Founder @ Pixelhive", time: "1d",
    title: "Scheduled Hire: Product Designer", skill: "Figma", level: "expert" as const, jobType: "Scheduled",
    body: "Cohort opens in 4 days. Expert-level Figma + portfolio review. Drop a comment to get notified.",
  },
  {
    type: "post", user: "Karan Singh", role: "@karan.builds · Gold", time: "1d",
    body: "Hot take: a verified Gold > a paid bootcamp certificate. The grind is the point.",
  },
];

export function Feed({ onJobs }: { onJobs: () => void }) {
  const [tab, setTab] = useState("all");
  const [composeOpen, setComposeOpen] = useState(false);
  return (
    <div className="grid xl:grid-cols-[1fr_360px] gap-6 p-6">
      <Composer open={composeOpen} onClose={() => setComposeOpen(false)} />
      <div className="min-w-0">
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input placeholder="Search people, skills, jobs…" className="w-full bg-[var(--input-background)] border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue-500" />
          </div>
          <button className="relative ss-glass rounded-full p-2.5">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full ss-gradient-brand text-[10px] font-bold flex items-center justify-center">3</span>
          </button>
          <div className="h-10 w-10 rounded-full ss-gradient-brand ring-2 ring-amber-400/60 flex items-center justify-center font-bold">AR</div>
        </div>

        <GlassCard className="p-4 mb-5 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full ss-gradient-brand flex items-center justify-center font-bold text-sm">AR</div>
          <button onClick={() => setComposeOpen(true)} className="flex-1 text-left ss-glass rounded-full px-4 py-2.5 text-sm text-slate-400 hover:bg-white/5">
            Share an insight or post a paid masterclass…
          </button>
          <button onClick={() => setComposeOpen(true)} className="ss-gradient-brand rounded-full px-4 py-2 text-xs font-semibold inline-flex items-center gap-1.5">
            <DollarSign className="h-3.5 w-3.5" /> Monetize
          </button>
        </GlassCard>

        <div className="ss-glass rounded-full p-1 inline-flex mb-5">
          {[
            { id: "all", label: "All" },
            { id: "hire", label: "Hiring Posts" },
            { id: "skill", label: "Skill Updates" },
            { id: "comm", label: "Community" },
          ].map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`relative px-4 py-1.5 text-sm rounded-full transition ${tab === t.id ? "text-white" : "text-slate-400 hover:text-white"}`}>
              {tab === t.id && <motion.span layoutId="tab" className="absolute inset-0 ss-gradient-brand rounded-full -z-0" />}
              <span className="relative z-10">{t.label}</span>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {posts.map((p, i) => (
            <PostCard key={i} post={p} onApply={onJobs} />
          ))}
        </div>
      </div>

      <aside className="space-y-5">
        <PeerFinder />
        <GlassCard className="p-5 ss-glow-blue relative overflow-hidden">
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full ss-gradient-brand opacity-30 blur-2xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-1"><Wallet className="h-4 w-4 text-emerald-300" /><h4>Creator earnings</h4></div>
            <div className="text-xs text-slate-400 mb-3">This month · so far</div>
            <div className="text-3xl font-bold ss-gradient-text mb-2" style={{ fontFamily: "var(--font-display)" }}>₹12,840</div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="ss-glass-strong rounded-lg p-2"><div className="text-slate-500">Tips</div><div className="font-semibold text-cyan-300">₹3.2K</div></div>
              <div className="ss-glass-strong rounded-lg p-2"><div className="text-slate-500">Paid</div><div className="font-semibold text-amber-300">₹6.4K</div></div>
              <div className="ss-glass-strong rounded-lg p-2"><div className="text-slate-500">Mentor</div><div className="font-semibold text-fuchsia-300">₹3.2K</div></div>
            </div>
            <button onClick={() => setComposeOpen(true)} className="w-full mt-3 ss-glass rounded-full py-2 text-xs hover:bg-white/10 inline-flex items-center justify-center gap-1.5">
              <Crown className="h-3 w-3 text-amber-300" /> Post & earn
            </button>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h4>People you may know</h4>
            <button className="text-xs text-blue-400">See all</button>
          </div>
          <div className="space-y-3">
            {[
              { n: "Neha Iyer", r: "Data @ Swiggy", s: "Gold" },
              { n: "Vikram S", r: "Backend @ Zerodha", s: "Expert" },
              { n: "Riya Das", r: "PM @ Cred", s: "Silver" },
            ].map((p) => (
              <div key={p.n} className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full ss-gradient-brand flex items-center justify-center font-bold text-sm">{p.n.split(" ").map(x => x[0]).join("")}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{p.n}</div>
                  <div className="text-xs text-slate-500 truncate">{p.r}</div>
                </div>
                <button className="text-xs ss-glass rounded-full px-3 py-1 hover:bg-white/10"><UserPlus className="h-3 w-3 inline mr-1" />Connect</button>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center gap-2 mb-3"><TrendingUp className="h-4 w-4 text-cyan-400" /><h4>Trending Skills</h4></div>
          <div className="space-y-2">
            {[
              { n: "React", c: "12.4K verified", lvl: "expert" as const },
              { n: "Python", c: "9.8K verified", lvl: "gold" as const },
              { n: "Figma", c: "5.2K verified", lvl: "gold" as const },
              { n: "System Design", c: "3.1K verified", lvl: "expert" as const },
            ].map((s, i) => (
              <div key={s.n} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2"><span className="text-slate-500 font-mono text-xs w-4">#{i + 1}</span>{s.n}</div>
                <span className="text-xs text-slate-500">{s.c}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center gap-2 mb-3"><Briefcase className="h-4 w-4 text-blue-400" /><h4>Active jobs</h4></div>
          <div className="space-y-2">
            {[
              { c: "Razorpay", r: "Sr React Eng", t: "Immediate" },
              { c: "Cred", r: "Product Designer", t: "Scheduled" },
              { c: "Zerodha", r: "Backend SDE", t: "Immediate" },
            ].map((j) => (
              <button key={j.c} onClick={onJobs} className="w-full text-left ss-glass rounded-xl px-3 py-2.5 flex items-center justify-between hover:bg-white/5">
                <div>
                  <div className="text-sm">{j.r}</div>
                  <div className="text-xs text-slate-500">{j.c}</div>
                </div>
                <ArrowUpRight className="h-3 w-3 text-slate-500" />
              </button>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5 ss-glow-blue">
          <div className="flex items-center gap-2 mb-3"><IRAOrb size={24} pulse={false} /><h4>IRA Suggestion</h4></div>
          <p className="text-sm text-slate-300 mb-3">Based on your React Expert + AI trend curve, "TypeScript Gold" would unlock 18 new job matches.</p>
          <GradientButton size="sm">Start Path</GradientButton>
        </GlassCard>
      </aside>
    </div>
  );
}

function PeerFinder() {
  const [q, setQ] = useState("");
  const [searched, setSearched] = useState<string | null>(null);
  const results = useMemo(() => searched ? searchPeople(searched).slice(0, 4) : [], [searched]);
  const presets = ["React mentors", "ML experts", "Designers in Mumbai"];
  return (
    <GlassCard className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <IRAOrb size={24} pulse={false} />
        <h4>Find verified peers</h4>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); if (q.trim()) setSearched(q); }}
        className="ss-glass rounded-full p-1.5 pl-3 flex items-center gap-2 mb-2">
        <Search className="h-3.5 w-3.5 text-slate-400" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. React mentor in Bangalore"
          className="flex-1 bg-transparent outline-none text-xs" />
        <button type="submit" className="ss-gradient-brand text-white rounded-full px-3 py-1 text-[11px] font-semibold">Find</button>
      </form>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {presets.map((p) => (
          <button key={p} onClick={() => { setQ(p); setSearched(p); }}
            className="ss-glass rounded-full px-2.5 py-0.5 text-[10px] hover:bg-white/10">
            <Sparkles className="h-2.5 w-2.5 inline mr-1 text-cyan-400" />{p}
          </button>
        ))}
      </div>
      <AnimatePresence>
        {searched && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="space-y-2">
            {results.map((p) => (
              <div key={p.name} className="ss-glass-strong rounded-lg p-2.5 flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full ss-gradient-brand flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                  {p.name.split(" ").map(x => x[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate">{p.name}</div>
                  <div className="text-[10px] text-slate-500 flex items-center gap-1 truncate">
                    {p.role} <MapPin className="h-2.5 w-2.5" /> {p.city}
                  </div>
                </div>
                <SkillBadge name={p.skill} level={p.level} />
              </div>
            ))}
            {results.length === 0 && <div className="text-xs text-slate-500">No matches — try another phrase.</div>}
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}

function PostCard({ post, onApply }: { post: any; onApply: () => void }) {
  const isHire = post.type === "hire";
  const verified = post.skill === "React";
  return (
    <GlassCard className={`p-5 ${isHire ? "border-l-4 border-l-blue-500" : ""}`} hover>
      <div className="flex items-start gap-3 mb-3">
        <div className="h-10 w-10 rounded-full ss-gradient-brand flex items-center justify-center font-bold text-sm">{post.user.split(" ").map((n: string) => n[0]).join("")}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm">{post.user}</span>
            <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-xs text-slate-500">· {post.time}</span>
          </div>
          <div className="text-xs text-slate-500">{post.role}</div>
        </div>
        {isHire && (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${post.urgent ? "bg-blue-500/20 text-blue-300" : "bg-violet-500/20 text-violet-300"}`}>
            {post.urgent ? <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" /> : <Calendar className="h-3 w-3" />}
            {post.jobType} Hire
          </span>
        )}
      </div>

      {isHire && (
        <div className="mb-3">
          <div className="font-semibold mb-1">{post.title}</div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Required:</span>
            <SkillBadge name={post.skill} level={post.level} />
          </div>
        </div>
      )}

      <p className="text-sm text-slate-300 mb-4">{post.body}</p>

      {post.skills && (
        <div className="flex gap-2 flex-wrap mb-4">{post.skills.map((s: any) => <SkillBadge key={s.n} name={s.n} level={s.l} />)}</div>
      )}

      {isHire && (
        <div className="mb-4">
          {verified ? (
            <GradientButton size="sm" onClick={onApply}>Apply Now</GradientButton>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-slate-500 text-sm cursor-not-allowed" title={`Get verified in ${post.skill} to apply`}>
              <Lock className="h-3 w-3" /> Locked — Need {post.level} {post.skill}
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-5 text-xs text-slate-500 pt-3 border-t border-white/5">
        <button className="flex items-center gap-1.5 hover:text-rose-400"><Heart className="h-4 w-4" /> 124</button>
        <button className="flex items-center gap-1.5 hover:text-blue-400"><MessageCircle className="h-4 w-4" /> 18</button>
        <button className="flex items-center gap-1.5 hover:text-cyan-400"><Share2 className="h-4 w-4" /> Share</button>
        <button className="flex items-center gap-1.5 hover:text-amber-400 ml-auto"><Bookmark className="h-4 w-4" /></button>
      </div>
    </GlassCard>
  );
}
