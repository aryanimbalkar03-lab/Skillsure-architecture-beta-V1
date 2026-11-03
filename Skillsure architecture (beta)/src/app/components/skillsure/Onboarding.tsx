import { useState } from "react";
import { GlassCard, GradientButton, Logo, IRAOrb } from "./primitives";
import { Check, X, Send, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Onboarding({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "Aryan Raj", uid: "aryan.dev", email: "", phone: "", country: "🇮🇳 India", password: "" });
  const [path, setPath] = useState<"student" | "pro" | null>(null);
  const [chat, setChat] = useState<{ role: "ira" | "user"; text: string }[]>([
    { role: "ira", text: "Welcome to SkillSure 👋 I'm IRA, your AI career coach. Are you a Student or a Working Professional?" },
  ]);
  const [profile, setProfile] = useState<Record<string, string>>({});
  const [stage, setStage] = useState(0);

  const studentQs = ["College name?", "Stream — Science / Commerce / Arts?", "Year — 1st, 2nd, 3rd or 4th?", "Target domain (e.g., Full Stack, AI, Finance)?"];
  const proQs = ["Company name?", "Current role?", "Years of experience?", "Target skill domain?"];
  const qs = path === "pro" ? proQs : studentQs;

  function answer(text: string) {
    const newChat = [...chat, { role: "user" as const, text }];
    const key = path === "pro" ? ["company", "role", "years", "target"][stage] : ["college", "stream", "year", "target"][stage];
    setProfile((p) => ({ ...p, [key]: text }));
    if (stage + 1 < qs.length) {
      newChat.push({ role: "ira", text: qs[stage + 1] });
      setStage(stage + 1);
    } else {
      newChat.push({ role: "ira", text: `Perfect. I've drafted a personalized roadmap for you. Let's take a quick tour 🚀` });
      setTimeout(() => setStep(2), 1200);
    }
    setChat(newChat);
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-blue-600/20 blur-[160px] pointer-events-none" />
      <header className="relative z-10 max-w-6xl mx-auto w-full px-6 py-5 flex items-center justify-between">
        <Logo size="md" />
        <div className="text-xs text-slate-400">Step {step + 1} of 3</div>
      </header>
      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 mb-6">
        <div className="h-1 rounded-full bg-white/5 overflow-hidden">
          <motion.div className="h-full ss-gradient-brand" animate={{ width: `${((step + 1) / 3) * 100}%` }} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="acc" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="relative z-10 max-w-md mx-auto w-full px-6 py-8 flex-1">
            <GlassCard className="p-8">
              <h2 className="mb-1">Create your account</h2>
              <p className="text-sm text-slate-400 mb-6">Choose your unique identity. This is permanent.</p>
              <div className="space-y-4">
                <Field label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                <div>
                  <label className="text-xs text-slate-400 mb-1.5 block">Unique User ID</label>
                  <div className="relative">
                    <input value={form.uid} onChange={(e) => setForm({ ...form, uid: e.target.value })}
                      className="w-full bg-[var(--input-background)] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 text-xs text-emerald-400"><Check className="h-3 w-3" /> available</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1.5">Your permanent @id — choose wisely.</div>
                </div>
                <Field label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} type="email" />
                <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                <Field label="Password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} type="password" />
              </div>
              <GradientButton size="lg" onClick={() => setStep(1)} className="w-full mt-6" icon={<ChevronRight className="h-4 w-4" />}>Continue</GradientButton>
            </GlassCard>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="ira" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="relative z-10 max-w-6xl mx-auto w-full px-6 py-4 flex-1 grid lg:grid-cols-[1fr_360px] gap-6">
            <GlassCard className="p-6 flex flex-col" >
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/5">
                <IRAOrb size={36} />
                <div>
                  <div className="font-semibold">IRA</div>
                  <div className="text-xs text-cyan-300">Personalizing your journey</div>
                </div>
              </div>
              <div className="flex-1 space-y-4 overflow-auto pr-2">
                {chat.map((m, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${m.role === "user" ? "ss-gradient-brand text-white" : "ss-glass"}`}>
                      {m.text}
                    </div>
                  </motion.div>
                ))}
                {!path && (
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => { setPath("student"); setChat([...chat, { role: "user", text: "Student" }, { role: "ira", text: studentQs[0] }]); setStage(0); }}
                      className="flex-1 ss-glass rounded-2xl p-5 text-left ss-card-hover">
                      <div className="text-2xl mb-1">🎓</div>
                      <div className="font-semibold">Student</div>
                      <div className="text-xs text-slate-400">Building skills for placement</div>
                    </button>
                    <button onClick={() => { setPath("pro"); setChat([...chat, { role: "user", text: "Working Professional" }, { role: "ira", text: proQs[0] }]); setStage(0); }}
                      className="flex-1 ss-glass rounded-2xl p-5 text-left ss-card-hover">
                      <div className="text-2xl mb-1">💼</div>
                      <div className="font-semibold">Working Professional</div>
                      <div className="text-xs text-slate-400">Upskilling for your next role</div>
                    </button>
                  </div>
                )}
              </div>
              {path && (
                <ChatInput onSend={answer} />
              )}
            </GlassCard>

            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-cyan-300 mb-3">Live Profile Preview</div>
              <GlassCard className="p-5 sticky top-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full ss-gradient-brand flex items-center justify-center font-bold">{form.name.split(" ").map(n => n[0]).join("")}</div>
                  <div>
                    <div className="font-semibold">{form.name}</div>
                    <div className="text-xs text-slate-400">@{form.uid}</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  {Object.entries(profile).map(([k, v]) => (
                    <motion.div key={k} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-500 capitalize">{k}</span><span>{v}</span>
                    </motion.div>
                  ))}
                  {Object.keys(profile).length === 0 && <div className="text-xs text-slate-500">Answer IRA's questions to see your profile build live →</div>}
                </div>
              </GlassCard>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="tour" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="relative z-10 max-w-2xl mx-auto w-full px-6 py-12 flex-1 flex items-center justify-center">
            <GlassCard className="p-10 text-center w-full ss-glow-blue">
              <IRAOrb size={64} />
              <h2 className="mt-5 mb-2">You're all set, {form.name.split(" ")[0]}!</h2>
              <p className="text-slate-400 mb-6">I've built your personalized roadmap. Let's start with a quick tour of your home feed.</p>
              <div className="grid grid-cols-4 gap-3 mb-8">
                {["Feed", "Profile", "Learn", "IRA"].map((s, i) => (
                  <div key={s} className="ss-glass rounded-xl p-4 text-xs">
                    <div className="h-2 w-2 rounded-full ss-gradient-brand mx-auto mb-2" />
                    <div>{s}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 justify-center">
                <GradientButton variant="ghost" onClick={onDone}>Skip Tour</GradientButton>
                <GradientButton onClick={onDone} icon={<ChevronRight className="h-4 w-4" />}>Enter SkillSure</GradientButton>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="text-xs text-slate-400 mb-1.5 block">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[var(--input-background)] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none" />
    </div>
  );
}

function ChatInput({ onSend }: { onSend: (v: string) => void }) {
  const [val, setVal] = useState("");
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (val.trim()) { onSend(val); setVal(""); } }}
      className="mt-4 pt-4 border-t border-white/5 flex gap-2">
      <input value={val} onChange={(e) => setVal(e.target.value)} placeholder="Type your answer…"
        className="flex-1 bg-[var(--input-background)] border border-white/10 rounded-full px-4 py-2.5 text-sm outline-none focus:border-blue-500" />
      <button type="submit" className="ss-gradient-brand rounded-full p-2.5"><Send className="h-4 w-4" /></button>
    </form>
  );
}
