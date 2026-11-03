import { useState } from "react";
import { GlassCard, GradientButton, SkillBadge } from "./primitives";
import { Search, ShieldCheck, Send, Bell, Briefcase, GraduationCap, UserPlus, Download } from "lucide-react";

export function Messages() {
  const [tab, setTab] = useState("verified");
  const convos = [
    { n: "Priya Sharma", r: "Recruiter @ Razorpay", last: "Loved your portfolio. Free Tuesday?", t: "2m", verified: true, hirer: true, unread: 1 },
    { n: "Rahul Mehta", r: "@rahul.codes", last: "Did you finish the System Design path?", t: "1h", verified: true, unread: 0 },
    { n: "Aanya Kapoor", r: "Founder @ Pixelhive", last: "Cohort opens in 4 days 🎨", t: "3h", verified: true, hirer: true, unread: 2 },
    { n: "anonymous_user", r: "Unverified", last: "Hi can you help me with…", t: "1d", verified: false, unread: 0 },
  ];
  const filtered = convos.filter((c) => tab === "verified" ? c.verified && !c.hirer : tab === "hirers" ? c.hirer : !c.verified);
  return (
    <div className="grid lg:grid-cols-[340px_1fr] h-screen">
      <aside className="ss-glass-strong border-r border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input placeholder="Search messages…" className="w-full bg-[var(--input-background)] border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm outline-none" />
          </div>
        </div>
        <div className="px-3 pt-3">
          <div className="ss-glass rounded-full p-1 inline-flex text-xs">
            {[{ id: "verified", label: "Verified" }, { id: "hirers", label: "Hirers" }, { id: "filtered", label: "Filtered" }].map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`px-3 py-1 rounded-full ${tab === t.id ? "ss-gradient-brand text-white" : "text-slate-400"}`}>{t.label}</button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-auto p-3 space-y-1">
          {tab === "filtered" && (
            <div className="ss-glass rounded-xl p-3 text-xs text-amber-300/80 mb-2">
              These users aren't verified for the skill relevant to your role.
            </div>
          )}
          {filtered.map((c) => (
            <button key={c.n} className="w-full flex gap-3 p-3 rounded-xl hover:bg-white/5 text-left">
              <div className="h-11 w-11 rounded-full ss-gradient-brand flex items-center justify-center font-bold text-sm shrink-0">{c.n.split(" ").map(x => x[0]).join("")}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm flex items-center gap-1.5 truncate">{c.n} {c.verified && <ShieldCheck className="h-3 w-3 text-blue-400" />}</span>
                  <span className="text-[10px] text-slate-500">{c.t}</span>
                </div>
                <div className="text-xs text-slate-500 truncate">{c.last}</div>
              </div>
              {c.unread > 0 && <span className="h-5 min-w-5 px-1 ss-gradient-brand rounded-full text-[10px] font-bold flex items-center justify-center self-center">{c.unread}</span>}
            </button>
          ))}
          {filtered.length === 0 && <div className="text-center text-xs text-slate-500 mt-10">No messages here.</div>}
        </div>
      </aside>

      <div className="flex flex-col h-screen">
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full ss-gradient-brand flex items-center justify-center font-bold text-sm">PS</div>
          <div>
            <div className="font-semibold flex items-center gap-1.5">Priya Sharma <ShieldCheck className="h-3.5 w-3.5 text-blue-400" /></div>
            <div className="text-xs text-slate-500">Active now · Recruiter @ Razorpay</div>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-6 space-y-3 max-w-2xl mx-auto w-full">
          {[
            { me: false, t: "Hey Aryan! Loved your React Expert badge ✨" },
            { me: true, t: "Thank you! Took a while to get there 😅" },
            { me: false, t: "Want to chat about the Senior React role?" },
            { me: true, t: "Absolutely. Tuesday afternoon works." },
            { me: false, t: "Perfect — I'll send a calendar invite." },
          ].map((m, i) => (
            <div key={i} className={`flex ${m.me ? "justify-end" : ""}`}>
              <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${m.me ? "ss-gradient-brand" : "ss-glass"}`}>{m.t}</div>
            </div>
          ))}
        </div>
        <div className="border-t border-white/5 p-4 max-w-2xl mx-auto w-full">
          <form className="ss-glass rounded-full p-1.5 pl-5 flex items-center gap-2">
            <input placeholder="Message Priya…" className="flex-1 bg-transparent outline-none text-sm" />
            <button className="ss-gradient-brand rounded-full p-2.5"><Send className="h-4 w-4" /></button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function Settings() {
  const [wantJob, setWantJob] = useState(true);
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-5">
      <h1 className="!text-3xl mb-2">Settings</h1>

      <GlassCard className="p-6">
        <h3 className="mb-4">Profile</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {[["Display name", "Aryan Raj"], ["Headline", "Full Stack Engineer"], ["Bio", "Building tools for India's next generation of devs."], ["Links", "github.com/aryan"]].map(([l, v]) => (
            <div key={l} className={l === "Bio" ? "sm:col-span-2" : ""}>
              <label className="text-xs text-slate-400 mb-1.5 block">{l}</label>
              <input defaultValue={v} className="w-full bg-[var(--input-background)] border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none" />
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <h3 className="mb-4">Privacy</h3>
        {[
          { l: "Who can message me", v: ["Everyone", "Verified only", "Connections"], i: 1 },
          { l: "Who can view my skills", v: ["Public", "Connections"], i: 0 },
        ].map((r) => (
          <div key={r.l} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
            <div className="text-sm">{r.l}</div>
            <select defaultValue={r.v[r.i]} className="bg-[var(--input-background)] border border-white/10 rounded-lg px-3 py-1.5 text-sm">
              {r.v.map((x) => <option key={x}>{x}</option>)}
            </select>
          </div>
        ))}
      </GlassCard>

      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="font-semibold">"Want a Job" mode</div>
            <div className="text-xs text-slate-400">Receive immediate hiring notifications for verified skills.</div>
          </div>
          <button onClick={() => setWantJob(!wantJob)} className={`relative h-7 w-12 rounded-full transition ${wantJob ? "ss-gradient-brand" : "bg-white/10"}`}>
            <span className={`absolute top-0.5 h-6 w-6 bg-white rounded-full transition ${wantJob ? "left-[22px]" : "left-0.5"}`} />
          </button>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <h3 className="mb-4">Subscription</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { n: "Free", p: "₹0", f: ["3 skill paths", "Basic IRA", "Public profile"], cur: false },
            { n: "Pro", p: "₹499/mo", f: ["Unlimited paths", "IRA Pro", "Priority hiring"], cur: true },
            { n: "Elite", p: "₹1499/mo", f: ["Everything in Pro", "Mock interviews", "1:1 coach"], cur: false },
          ].map((t) => (
            <div key={t.n} className={`rounded-2xl p-5 ${t.cur ? "ss-gradient-brand text-white ss-glow-blue" : "ss-glass"}`}>
              <div className="text-xs uppercase tracking-wider opacity-80">{t.n}</div>
              <div className="text-2xl font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>{t.p}</div>
              <ul className="text-xs space-y-1.5 mb-4 opacity-90">{t.f.map((x) => <li key={x}>· {x}</li>)}</ul>
              <button className={`w-full text-xs rounded-full py-2 font-semibold ${t.cur ? "bg-white/20" : "bg-white/10 hover:bg-white/15"}`}>{t.cur ? "Current Plan" : "Upgrade"}</button>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

export function Resume() {
  return (
    <div className="p-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-5">
      <GlassCard className="p-6">
        <h3 className="mb-4">Resume Editor</h3>
        <div className="space-y-4">
          {[
            { l: "Personal Info", v: "Aryan Raj · aryan@skillsure.in · +91 98xxx" },
            { l: "Headline", v: "Full Stack Engineer · React Expert" },
            { l: "Education", v: "B.Tech CSE, IIT Bombay (2020–24)" },
            { l: "Experience", v: "Razorpay Intern · Open Source Maintainer" },
            { l: "Projects", v: "skillsure.app · learn-react.dev · 12 OSS PRs merged" },
          ].map((s) => (
            <div key={s.l}>
              <label className="text-xs text-slate-400 mb-1.5 block">{s.l}</label>
              <textarea defaultValue={s.v} rows={2} className="w-full bg-[var(--input-background)] border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none resize-none" />
            </div>
          ))}
          <div>
            <label className="text-xs text-slate-400 mb-1.5 block">Verified Skills (auto)</label>
            <div className="flex flex-wrap gap-2 ss-glass rounded-xl p-3">
              <SkillBadge name="React" level="expert" />
              <SkillBadge name="System Design" level="expert" />
              <SkillBadge name="Node.js" level="gold" />
              <SkillBadge name="TypeScript" level="gold" />
              <SkillBadge name="HTML/CSS" level="silver" />
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1.5 block">Template</label>
            <div className="grid grid-cols-3 gap-3">
              {["Minimal", "Modern", "Technical"].map((t, i) => (
                <button key={t} className={`ss-glass rounded-xl p-3 text-xs ${i === 1 ? "ring-2 ring-blue-500" : ""}`}>
                  <div className="aspect-[3/4] bg-white/5 rounded mb-2 ss-dot-grid" />
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="lg:sticky lg:top-6 self-start">
        <div className="flex items-center justify-between mb-3">
          <h3>Live Preview</h3>
          <GradientButton size="sm" icon={<Download className="h-3.5 w-3.5" />}>Export PDF</GradientButton>
        </div>
        <div className="bg-white text-slate-900 rounded-2xl p-8 shadow-2xl aspect-[3/4] overflow-auto">
          <div className="border-b-2 border-slate-900 pb-3 mb-4">
            <div className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Aryan Raj</div>
            <div className="text-sm text-slate-600">Full Stack Engineer · React Expert</div>
            <div className="text-xs text-slate-500 mt-1">aryan@skillsure.in · +91 98xxx · Mumbai</div>
          </div>
          <Section title="Verified Skills (SkillSure)">
            <div className="text-xs flex flex-wrap gap-1.5">
              {[["React", "Expert ✓"], ["System Design", "Expert ✓"], ["Node.js", "Gold"], ["TypeScript", "Gold"]].map(([s, l]) => (
                <span key={s} className="border border-slate-300 rounded-full px-2 py-0.5">{s} · {l}</span>
              ))}
            </div>
          </Section>
          <Section title="Education">
            <div className="text-sm font-semibold">B.Tech, Computer Science</div>
            <div className="text-xs text-slate-600">IIT Bombay · 2020 — 2024 · CGPA 8.9</div>
          </Section>
          <Section title="Experience">
            <div className="text-sm font-semibold">SDE Intern · Razorpay</div>
            <div className="text-xs text-slate-600 mb-1">2025 · 6 mos</div>
            <div className="text-xs">Built fraud-detection dashboards in React + TypeScript.</div>
          </Section>
          <Section title="Projects">
            <ul className="text-xs list-disc pl-4 space-y-0.5">
              <li>skillsure.app — verified-skills network</li>
              <li>learn-react.dev — interactive React tutorial</li>
              <li>12 OSS PRs merged in React ecosystem</li>
            </ul>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: any }) {
  return (
    <div className="mb-4">
      <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-1.5">{title}</div>
      {children}
    </div>
  );
}

export function NotificationDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  const items = [
    { i: Briefcase, c: "text-blue-400", t: "New immediate hiring post matches your React Gold certification", time: "2m" },
    { i: ShieldCheck, c: "text-emerald-400", t: "Congratulations! You've been verified at Gold level for Data Analysis", time: "1h" },
    { i: UserPlus, c: "text-cyan-400", t: "Arjun Mehta (Hirer at Infosys) saved your profile to their draft list", time: "3h" },
    { i: GraduationCap, c: "text-amber-400", t: "IRA suggests: You're 3 lessons away from completing your Python Gold path", time: "1d" },
  ];
  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div onClick={(e) => e.stopPropagation()} className="absolute right-0 top-0 bottom-0 w-full max-w-sm ss-glass-strong border-l border-white/10 p-5 overflow-auto">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2"><Bell className="h-4 w-4" /><h3>Notifications</h3></div>
          <button onClick={onClose} className="text-xs text-slate-400 hover:text-white">Close</button>
        </div>
        <div className="space-y-3">
          {items.map((n, i) => {
            const Icon = n.i;
            return (
              <div key={i} className="ss-glass rounded-xl p-3 flex gap-3">
                <Icon className={`h-5 w-5 mt-0.5 ${n.c}`} />
                <div className="flex-1">
                  <div className="text-sm">{n.t}</div>
                  <div className="text-xs text-slate-500 mt-1">{n.time} ago</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
