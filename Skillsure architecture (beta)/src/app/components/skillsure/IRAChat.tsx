import { useEffect, useMemo, useRef, useState } from "react";
import { IRAOrb, SkillBadge } from "./primitives";
import { Mic, MicOff, Send, Plus, Sparkles, TrendingUp, Target, Briefcase, GraduationCap, MessageSquare, DollarSign, FileText, Brain, Lightbulb, CheckCircle2, ArrowRight, MapPin, Volume2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, Radar, LineChart, Line } from "recharts";
import { motion, AnimatePresence } from "motion/react";
import { iraReply, IRAReply } from "./iraEngine";
import { addSkillIfMissing, useProfile } from "./store";

type Msg = { role: "ira" | "user"; text: string; reply?: IRAReply };

const usage = [
  { d: "Mon", h: 1.2 }, { d: "Tue", h: 2.1 }, { d: "Wed", h: 0.8 }, { d: "Thu", h: 3.0 }, { d: "Fri", h: 2.4 }, { d: "Sat", h: 1.6 }, { d: "Sun", h: 2.9 },
];
const growth = [
  { m: "Jan", xp: 120 }, { m: "Feb", xp: 240 }, { m: "Mar", xp: 360 }, { m: "Apr", xp: 540 }, { m: "May", xp: 820 }, { m: "Jun", xp: 1120 },
];
const radarData = [
  { axis: "Frontend", v: 85 }, { axis: "Backend", v: 62 }, { axis: "System Design", v: 48 },
  { axis: "DSA", v: 70 }, { axis: "DevOps", v: 40 }, { axis: "Communication", v: 78 },
];

type NavAction = (target: "learner" | "jobs" | "resume" | "hirer" | "test", payload?: string) => void;

export function IRAChat({ onAction }: { onAction?: NavAction }) {
  const [profile] = useProfile();
  const [msgs, setMsgs] = useState<Msg[]>(() => {
    const intro = iraReply("hi");
    return [{ role: "ira", text: intro.text, reply: intro }];
  });
  const [val, setVal] = useState("");
  const [typing, setTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceErr, setVoiceErr] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  function send(text: string) {
    if (!text.trim()) return;
    setVal("");
    setMsgs((m) => [...m, { role: "user", text }]);
    setTyping(true);
    const delay = 400 + Math.min(text.length * 10, 700);
    setTimeout(() => {
      const reply = iraReply(text);
      setMsgs((m) => [...m, { role: "ira", text: reply.text, reply }]);
      setTyping(false);
      maybeSpeak(reply.text);
    }, delay);
  }

  /* ---------- Voice ---------- */
  function maybeSpeak(t: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    // Only speak if last input came from voice
    if (!recognitionRef.current?._lastUsedVoice) return;
    try {
      const u = new SpeechSynthesisUtterance(t.replace(/[•*_#`]/g, ""));
      u.rate = 1.05; u.pitch = 1.0;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch {}
  }

  function toggleMic() {
    setVoiceErr(null);
    const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SR) { setVoiceErr("Voice input isn't supported in this browser. Try Chrome or Edge."); return; }
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const rec = new SR();
    rec.lang = "en-IN";
    rec.continuous = false;
    rec.interimResults = true;
    rec._lastUsedVoice = true;
    rec.onresult = (e: any) => {
      let txt = "";
      for (let i = e.resultIndex; i < e.results.length; i++) txt += e.results[i][0].transcript;
      setVal(txt);
      if (e.results[e.results.length - 1].isFinal) {
        rec.stop();
        setListening(false);
        send(txt);
      }
    };
    rec.onerror = (e: any) => { setVoiceErr(`Mic error: ${e.error}`); setListening(false); };
    rec.onend = () => setListening(false);
    rec.start();
    setListening(true);
    recognitionRef.current = rec;
  }

  function speakLast() {
    const last = [...msgs].reverse().find((m) => m.role === "ira");
    if (!last) return;
    const u = new SpeechSynthesisUtterance(last.text.replace(/[•*_#`]/g, ""));
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }

  /* ---------- Action handler (clickable skills) ---------- */
  function handleAction(kind: string, payload?: string) {
    if (kind === "learn_skill" && payload) {
      addSkillIfMissing(payload, "silver");
      onAction?.("learner", payload);
    } else if (kind === "open_learner") onAction?.("learner");
    else if (kind === "open_jobs") onAction?.("jobs");
    else if (kind === "open_resume") onAction?.("resume");
    else if (kind === "open_hirer") onAction?.("hirer");
    else if (kind === "start_test") onAction?.("test");
  }

  const starterChips = useMemo(() => [
    { t: "Analyze my strengths", icon: Brain },
    { t: "Suggest skills for me", icon: Lightbulb },
    { t: "Plan my next 4 weeks", icon: Target },
    { t: "What jobs can I apply to?", icon: Briefcase },
    { t: "Find React engineers in Bangalore", icon: TrendingUp },
    { t: "Practice an interview", icon: MessageSquare },
    { t: "Optimize my resume", icon: FileText },
    { t: "Salary benchmark", icon: DollarSign },
  ], []);

  const lastIra = [...msgs].reverse().find((m) => m.role === "ira");
  const dynamicChips = lastIra?.reply?.followups?.length ? lastIra.reply.followups : starterChips.map((s) => s.t);

  return (
    <div className="grid lg:grid-cols-[280px_1fr] h-screen">
      <aside className="ss-glass-strong border-r border-white/5 p-4 hidden lg:flex flex-col">
        <button className="w-full ss-glass rounded-xl p-3 flex items-center gap-2 mb-4 hover:bg-white/5">
          <Plus className="h-4 w-4" /> <span className="text-sm">New chat</span>
        </button>
        <div className="text-xs uppercase tracking-wider text-slate-500 mb-2">Today</div>
        <div className="space-y-1 mb-4">
          {["Career roadmap discussion", "React vs Vue tradeoffs", "Resume review"].map((t) => (
            <button key={t} className="w-full text-left text-sm px-3 py-2 rounded-lg text-slate-300 hover:bg-white/5 truncate">{t}</button>
          ))}
        </div>
        <div className="text-xs uppercase tracking-wider text-slate-500 mb-2">Earlier</div>
        <div className="space-y-1 mb-auto">
          {["System Design help", "Mock interview prep", "Salary negotiation tips"].map((t) => (
            <button key={t} className="w-full text-left text-sm px-3 py-2 rounded-lg text-slate-400 hover:bg-white/5 truncate">{t}</button>
          ))}
        </div>
        <div className="ss-glass rounded-xl p-3 mt-4">
          <div className="text-xs text-slate-400 mb-1">IRA knows about you</div>
          <div className="text-xs text-cyan-300">{profile.skills.length} verifications · {profile.skills[0]?.name} {profile.skills[0]?.level} · 6mo streak</div>
        </div>
      </aside>

      <div className="flex flex-col h-screen">
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
          <IRAOrb size={36} />
          <div className="flex-1">
            <div className="font-semibold">IRA</div>
            <div className="text-xs text-cyan-300">In-house engine · context-aware · voice ready</div>
          </div>
          <button onClick={speakLast} title="Read aloud" className="p-2 rounded-full hover:bg-white/5">
            <Volume2 className="h-4 w-4" />
          </button>
          <div className="hidden md:flex items-center gap-2 ss-glass rounded-full px-3 py-1.5 text-xs text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Memory active
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-auto p-6 space-y-4 max-w-3xl mx-auto w-full">
          {msgs.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
              {m.role === "ira" && <IRAOrb size={28} pulse={false} />}
              <div className={`max-w-[80%] ${m.role === "user" ? "ss-gradient-brand" : "ss-glass"} rounded-2xl px-4 py-3`}>
                <p className="text-sm leading-relaxed whitespace-pre-line">{m.text}</p>
                {m.reply?.rich && <RichRenderer reply={m.reply} onAction={handleAction} />}
                {m.reply?.actions && m.reply.actions.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {m.reply.actions.map((a) => (
                      <button key={a.label} onClick={() => handleAction(a.kind, a.payload)}
                        className="ss-gradient-brand text-white rounded-full px-3 py-1.5 text-xs font-medium inline-flex items-center gap-1.5 hover:shadow-[0_0_24px_rgba(37,99,235,0.4)] transition">
                        {a.label} <ArrowRight className="h-3 w-3" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          <AnimatePresence>
            {typing && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex gap-3">
                <IRAOrb size={28} pulse={false} />
                <div className="ss-glass rounded-2xl px-4 py-3 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-bounce" style={{ animationDelay: "120ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-bounce" style={{ animationDelay: "240ms" }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="border-t border-white/5 p-4 max-w-3xl mx-auto w-full">
          {voiceErr && <div className="mb-2 text-xs text-amber-300">{voiceErr}</div>}
          <div className="flex flex-wrap gap-2 mb-3">
            {dynamicChips.slice(0, 5).map((c) => (
              <button key={c} onClick={() => send(c)} className="ss-glass rounded-full px-3 py-1.5 text-xs hover:bg-white/10 transition-colors">
                <Sparkles className="h-3 w-3 inline mr-1 text-cyan-400" />{c}
              </button>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (val.trim()) send(val); }}
            className="ss-glass rounded-2xl p-2 flex items-center gap-2">
            <input value={val} onChange={(e) => setVal(e.target.value)} placeholder="Ask IRA anything — or hit mic to talk"
              className="flex-1 bg-transparent outline-none px-3 text-sm" />
            <button type="button" onClick={toggleMic}
              className={`p-2 rounded-full transition ${listening ? "bg-rose-500 text-white animate-pulse" : "hover:bg-white/5"}`}
              title={listening ? "Listening — click to stop" : "Speak to IRA"}>
              {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </button>
            <button type="submit" className="ss-gradient-brand rounded-full p-2.5"><Send className="h-4 w-4" /></button>
          </form>
        </div>
      </div>
    </div>
  );
}

function RichRenderer({ reply, onAction }: { reply: IRAReply; onAction: (k: string, p?: string) => void }) {
  const r = reply.rich!;
  if (r.kind === "usage") return (
    <div className="mt-3 h-40">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={usage}>
          <XAxis dataKey="d" stroke="currentColor" opacity={0.5} fontSize={11} axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip cursor={{ fill: "rgba(139,107,74,0.1)" }} contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
          <Bar dataKey="h" fill="#06B6D4" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
  if (r.kind === "growth") return (
    <div className="mt-3 h-40">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={growth}>
          <XAxis dataKey="m" stroke="currentColor" opacity={0.5} fontSize={11} axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
          <Line type="monotone" dataKey="xp" stroke="#06B6D4" strokeWidth={2.5} dot={{ fill: "#22D3EE", r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
  if (r.kind === "radar") return (
    <div className="mt-3 h-56">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={radarData} outerRadius="75%">
          <PolarGrid stroke="currentColor" opacity={0.2} />
          <PolarAngleAxis dataKey="axis" tick={{ fill: "currentColor", fontSize: 10, opacity: 0.7 }} />
          <Radar dataKey="v" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.3} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
  if (r.kind === "skills") return (
    <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
      {r.items.map((s) => (
        <button key={s.name} onClick={() => onAction("learn_skill", s.name)}
          className="ss-glass-strong rounded-lg p-3 text-left ss-card-hover hover:border-cyan-400/50 transition">
          <SkillBadge name={s.level.toUpperCase()} level={s.level} />
          <div className="text-sm font-semibold mt-2">{s.name}</div>
          <div className="text-xs text-slate-500 mt-1">{s.reason}</div>
          <div className="text-xs text-cyan-300 mt-2 inline-flex items-center gap-1">Start learning <ArrowRight className="h-3 w-3" /></div>
        </button>
      ))}
    </div>
  );
  if (r.kind === "skill_detail") {
    const s = r.skill;
    return (
      <div className="mt-3 ss-glass-strong rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-lg font-semibold">{s.name}</div>
          <SkillBadge name={`${s.weeksToGold}w → Gold`} level={s.weeksToGold <= 4 ? "silver" : "gold"} withIcon={false} />
        </div>
        <div className="grid grid-cols-3 gap-3 text-xs mb-3">
          <div><div className="text-slate-500">Avg pay</div><div className="font-semibold">₹{s.avgSalaryLpa}L</div></div>
          <div><div className="text-slate-500">ROI</div><div className="font-semibold">{s.jobROI}/10</div></div>
          <div><div className="text-slate-500">Difficulty</div><div className="font-semibold">{"●".repeat(s.difficulty)}{"○".repeat(5 - s.difficulty)}</div></div>
        </div>
        <div className="text-xs text-slate-400">Pairs with: {s.pairsWith.join(", ")}</div>
        <button onClick={() => onAction("learn_skill", s.name)} className="mt-3 ss-gradient-brand text-white rounded-full px-3 py-1.5 text-xs font-medium inline-flex items-center gap-1.5">
          Start path <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    );
  }
  if (r.kind === "roadmap") return (
    <div className="mt-3 space-y-2">
      <div className="text-xs uppercase tracking-wider text-slate-400">{r.title} · {r.weeks.length}-week plan</div>
      {r.weeks.map((w) => (
        <div key={w.week} className="ss-glass-strong rounded-lg p-3 flex items-center gap-3">
          <div className="ss-gradient-brand rounded-lg h-9 w-9 flex items-center justify-center text-xs font-semibold text-white">{w.week}</div>
          <div className="flex-1">
            <div className="text-sm font-semibold">{w.topic}</div>
            <div className="text-xs text-slate-500">Week {w.week} · ~{w.hours}h</div>
          </div>
          <GraduationCap className="h-4 w-4 text-cyan-300" />
        </div>
      ))}
      <button onClick={() => onAction("learn_skill", r.title)} className="ss-gradient-brand text-white rounded-full px-3 py-1.5 text-xs font-medium inline-flex items-center gap-1.5">
        Start week 1 <ArrowRight className="h-3 w-3" />
      </button>
    </div>
  );
  if (r.kind === "jobs") return (
    <div className="mt-3 space-y-2">
      {r.items.map((j) => (
        <div key={j.role + j.company} className="ss-glass-strong rounded-lg p-3 flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate">{j.role}</div>
            <div className="text-xs text-slate-500 truncate">{j.company} · {j.pay}</div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="text-xs text-emerald-400 font-semibold">{j.matchPct}% match</div>
            <SkillBadge name={j.level.toUpperCase()} level={j.level} />
          </div>
        </div>
      ))}
    </div>
  );
  if (r.kind === "people") return (
    <div className="mt-3 space-y-2">
      {r.items.map((p) => (
        <div key={p.name} className="ss-glass-strong rounded-lg p-3 flex items-center gap-3">
          <div className="h-9 w-9 rounded-full ss-gradient-brand flex items-center justify-center text-xs font-bold text-white shrink-0">{p.name.split(" ").map((x) => x[0]).join("")}</div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate">{p.name}</div>
            <div className="text-xs text-slate-500 flex items-center gap-2 truncate">
              {p.role} <MapPin className="h-3 w-3" /> {p.city}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <SkillBadge name={p.skill} level={p.level} />
            <div className="text-xs text-emerald-400">{p.matchPct}% fit</div>
          </div>
        </div>
      ))}
    </div>
  );
  if (r.kind === "salary") {
    const span = r.p75 - r.p25;
    const markerLeft = ((r.p50 - r.p25) / span) * 100;
    return (
      <div className="mt-3 ss-glass-strong rounded-lg p-4">
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="text-xs text-slate-400">P50 · {r.city} · {r.role}</div>
            <div className="text-2xl font-semibold ss-gradient-text">₹{r.p50}L</div>
          </div>
          <div className="text-right text-xs text-slate-400">
            <div>P25: ₹{r.p25}L</div>
            <div>P75: ₹{r.p75}L</div>
          </div>
        </div>
        <div className="h-2 rounded-full bg-white/5 relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 right-0 ss-gradient-brand rounded-full opacity-60" />
          <div className="absolute inset-y-[-2px] w-1 bg-white rounded" style={{ left: `${markerLeft}%` }} />
        </div>
        <div className="text-xs text-slate-500 mt-2">Your verified badges push you to the upper half of this band.</div>
      </div>
    );
  }
  if (r.kind === "resume_tips") return (
    <div className="mt-3 space-y-2">
      {r.tips.map((t, i) => (
        <div key={i} className="flex items-start gap-2 ss-glass-strong rounded-lg p-3">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm">{t}</div>
        </div>
      ))}
    </div>
  );
  if (r.kind === "interview") return (
    <div className="mt-3 space-y-2">
      {r.items.map((q) => (
        <div key={q.q} className="ss-glass-strong rounded-lg p-3">
          <div className="text-xs text-cyan-300 mb-1">{q.category}</div>
          <div className="text-sm">{q.q}</div>
        </div>
      ))}
    </div>
  );
  if (r.kind === "motivation") return (
    <div className="mt-3 ss-glass-strong rounded-lg p-4 flex items-center gap-3">
      <div className="h-10 w-10 rounded-full ss-gradient-brand flex items-center justify-center">
        <Sparkles className="h-5 w-5 text-white" />
      </div>
      <div className="text-xs text-slate-300">Top <span className="text-cyan-300 font-semibold">8%</span> of learners · 6-month streak intact</div>
    </div>
  );
  if (r.kind === "verify") return (
    <div className="mt-3 space-y-2">
      {r.steps.map((s, i) => (
        <div key={i} className="ss-glass-strong rounded-lg p-3 flex items-center gap-3">
          <div className="h-7 w-7 rounded-full ss-gradient-brand flex items-center justify-center text-xs font-bold text-white">{i + 1}</div>
          <div className="text-sm">{s}</div>
        </div>
      ))}
    </div>
  );
  return null;
}
