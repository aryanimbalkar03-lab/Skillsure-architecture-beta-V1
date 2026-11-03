import { useState, useEffect, useRef } from "react";
import { GlassCard, GradientButton, IRAOrb, SkillBadge, Logo } from "./primitives";
import { Camera, AlertTriangle, Check, X, Sparkles, Lightbulb, ChevronRight, Eye, Mic, ScanFace, Activity, Wifi } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

function ProctorPanel({ warns, onWarn }: { warns: number; onWarn: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [camOn, setCamOn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gaze, setGaze] = useState<"focused" | "drifting" | "away">("focused");
  const [face, setFace] = useState<"detected" | "multi" | "none">("detected");
  const [audio, setAudio] = useState(12);

  useEffect(() => {
    let stream: MediaStream | null = null;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setCamOn(true);
        }
      } catch (e: any) {
        setError("Camera unavailable — proctor running in simulated mode");
      }
    })();
    return () => { stream?.getTracks().forEach((t) => t.stop()); };
  }, []);

  // Simulated AI detection loop
  useEffect(() => {
    const t = setInterval(() => {
      const r = Math.random();
      setGaze(r > 0.985 ? "away" : r > 0.85 ? "drifting" : "focused");
      const f = Math.random();
      setFace(f > 0.995 ? "multi" : f > 0.99 ? "none" : "detected");
      setAudio(Math.round(8 + Math.random() * 22));
    }, 1400);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (gaze === "away" || face !== "detected") {
      const id = setTimeout(() => onWarn(), 200);
      return () => clearTimeout(id);
    }
  }, [gaze, face]);

  const statusColor = gaze === "focused" && face === "detected" ? "emerald" : gaze === "drifting" ? "amber" : "rose";

  return (
    <div className="ss-glass-strong rounded-2xl p-3 w-56">
      <div className="relative rounded-xl overflow-hidden bg-black aspect-[4/3] mb-2">
        <video ref={videoRef} muted playsInline className="w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} />
        {!camOn && (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-500 bg-gradient-to-br from-slate-900 to-slate-950">
            <div className="text-center">
              <Camera className="h-6 w-6 mx-auto mb-1 opacity-40" />
              <div>{error || "Connecting…"}</div>
            </div>
          </div>
        )}
        {/* Face bounding box overlay */}
        {camOn && face === "detected" && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className={`absolute border-2 rounded-lg border-${statusColor}-400/80`}
            style={{ left: "22%", top: "18%", right: "22%", bottom: "30%" }}
          >
            <div className={`absolute -top-5 left-0 text-[10px] px-1.5 py-0.5 rounded bg-${statusColor}-500/80 text-white font-mono`}>
              face · {Math.round(88 + Math.random() * 10)}%
            </div>
          </motion.div>
        )}
        {/* Scanning line */}
        <motion.div
          animate={{ y: ["0%", "100%", "0%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-px bg-cyan-400/60 shadow-[0_0_8px_2px_rgba(34,211,238,0.6)]"
        />
        <div className="absolute top-2 left-2 flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" /> REC
        </div>
      </div>

      <div className="space-y-1.5 text-[11px]">
        <ProctorRow icon={ScanFace} label="Face" value={face === "detected" ? "1 person" : face === "multi" ? "MULTIPLE" : "NOT FOUND"} ok={face === "detected"} />
        <ProctorRow icon={Eye} label="Gaze" value={gaze === "focused" ? "on screen" : gaze === "drifting" ? "drifting" : "OFF SCREEN"} ok={gaze === "focused"} warn={gaze === "drifting"} />
        <ProctorRow icon={Mic} label="Audio" value={`${audio} dB`} ok={audio < 30} warn={audio >= 30 && audio < 40} />
        <ProctorRow icon={Activity} label="Tab focus" value="locked" ok />
        <ProctorRow icon={Wifi} label="Network" value="stable" ok />
      </div>

      <div className={`mt-2.5 text-center text-[11px] font-semibold px-2 py-1.5 rounded-lg ${warns === 0 ? "bg-emerald-500/15 text-emerald-300" : warns === 1 ? "bg-amber-500/15 text-amber-300" : "bg-rose-500/15 text-rose-300"}`}>
        {warns === 0 ? "AI proctor · clean" : `Warning ${warns}/2`}
      </div>
    </div>
  );
}

function ProctorRow({ icon: Icon, label, value, ok, warn }: { icon: any; label: string; value: string; ok?: boolean; warn?: boolean }) {
  const color = ok ? "text-emerald-300" : warn ? "text-amber-300" : "text-rose-300";
  const dot = ok ? "bg-emerald-400" : warn ? "bg-amber-400" : "bg-rose-400";
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-3 w-3 text-slate-400" />
      <span className="text-slate-400">{label}</span>
      <span className={`ml-auto font-mono ${color}`}>{value}</span>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
    </div>
  );
}

const questions = [
  { q: "Which Python data structure preserves insertion order AND allows duplicates?", o: ["set", "dict (≥3.7)", "list", "frozenset"], a: 2 },
  { q: "What does `df.groupby('x').agg('sum')` return?", o: ["Series", "DataFrame", "ndarray", "GroupBy object"], a: 1 },
  { q: "Which scikit-learn class is used for k-fold cross validation?", o: ["KFold", "GridSearch", "Splitter", "Pipeline"], a: 0 },
];

export function TestZone({ onExit }: { onExit: () => void }) {
  const [stage, setStage] = useState<"warn" | "running" | "result" | "term">("warn");
  const [idx, setIdx] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(15 * 60);
  const [warns, setWarns] = useState(0);

  useEffect(() => {
    if (stage !== "running") return;
    const t = setInterval(() => setTime((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [stage]);

  function next() {
    const correct = pick === questions[idx].a;
    if (correct) setScore((s) => s + 1);
    if (idx + 1 < questions.length) {
      setIdx(idx + 1); setPick(null);
    } else {
      setStage("result");
    }
  }

  function triggerWarn() {
    const next = warns + 1;
    setWarns(next);
    if (next >= 2) setStage("term");
  }

  if (stage === "warn") {
    return (
      <div className="fixed inset-0 z-50 bg-[#050814]/95 backdrop-blur flex items-center justify-center p-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="ss-glass-strong rounded-3xl p-10 max-w-lg ss-glow-blue">
          <div className="h-14 w-14 rounded-2xl bg-amber-500/20 flex items-center justify-center mb-4">
            <AlertTriangle className="h-7 w-7 text-amber-400" />
          </div>
          <h2 className="mb-3">Test Zone — Strict Mode</h2>
          <ul className="text-sm text-slate-300 space-y-2 mb-6">
            <li>📷 AI proctoring is active. Camera and screen sharing are required.</li>
            <li>🚫 Minimizing the window will cancel the test.</li>
            <li>👁 Eyes off-screen 2× → 2 hard questions auto-added.</li>
            <li>📋 Copy-paste, right-click, and tab switching are disabled.</li>
          </ul>
          <p className="text-xs text-rose-400 mb-6">You have been warned.</p>
          <div className="flex gap-3 justify-end">
            <GradientButton variant="ghost" onClick={onExit}>Cancel</GradientButton>
            <GradientButton onClick={() => setStage("running")}>I Understand. Begin Test</GradientButton>
          </div>
        </motion.div>
      </div>
    );
  }

  if (stage === "term") {
    return (
      <div className="fixed inset-0 z-50 bg-rose-950/95 backdrop-blur flex items-center justify-center p-6">
        <div className="text-center">
          <X className="h-20 w-20 text-rose-400 mx-auto mb-4" />
          <h1 className="!text-4xl mb-3 text-rose-200">Test Terminated</h1>
          <p className="text-rose-300/80 mb-6">AI proctor detected violations. You may retry in 30 days.</p>
          <GradientButton variant="ghost" onClick={onExit}>Exit</GradientButton>
        </div>
      </div>
    );
  }

  if (stage === "result") {
    const pct = Math.round((score / questions.length) * 100);
    const lvl = pct >= 80 ? "expert" : pct >= 60 ? "gold" : "silver";
    return (
      <div className="fixed inset-0 z-50 bg-[#050814]/95 backdrop-blur flex items-center justify-center p-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="ss-glass-strong rounded-3xl p-10 max-w-lg text-center ss-glow-blue">
          <div className="text-6xl mb-3">🎉</div>
          <div className="text-xs uppercase tracking-[0.2em] text-cyan-300 mb-2">Result</div>
          <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="text-7xl font-bold ss-gradient-text mb-4" style={{ fontFamily: "var(--font-display)" }}>
            {pct}%
          </motion.div>
          <div className="mb-4 inline-flex"><SkillBadge name={`Python ${lvl}`} level={lvl as any} /></div>
          <div className="ss-glass rounded-xl p-4 text-left mb-6">
            <div className="flex items-center gap-2 text-xs text-cyan-300 mb-2"><IRAOrb size={20} pulse={false} /> IRA</div>
            <p className="text-sm">You scored in the <span className="font-bold">{pct >= 80 ? "92" : pct >= 60 ? "74" : "52"}nd</span> percentile. Your profile has been updated with the {lvl} badge.</p>
          </div>
          <div className="flex gap-3 justify-center flex-wrap">
            <GradientButton variant="ghost" onClick={onExit}>Go to Profile</GradientButton>
            <GradientButton onClick={onExit}>Share on Feed</GradientButton>
          </div>
        </motion.div>
      </div>
    );
  }

  const Q = questions[idx];
  const mins = Math.floor(time / 60), secs = time % 60;
  const lowTime = time < 5 * 60;
  return (
    <div className="fixed inset-0 z-50 bg-[#050814] overflow-auto">
      <div className="absolute inset-0 ss-dot-grid opacity-20 pointer-events-none" />
      <div className="fixed top-4 right-4 z-10 hidden md:block">
        <ProctorPanel warns={warns} onWarn={triggerWarn} />
      </div>
      <div className="relative max-w-4xl mx-auto px-6 py-6 md:pr-72">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-4">
            <Logo size="sm" />
            <div>
              <SkillBadge name="Python · Gold" level="gold" />
              <div className="text-xs text-slate-500 mt-1">Question {idx + 1} of {questions.length}</div>
            </div>
          </div>
          <div className={`font-mono text-3xl font-bold ${lowTime ? "text-rose-400 animate-pulse" : ""}`} style={{ fontFamily: "var(--font-mono)" }}>
            {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
          </div>
        </div>

        {warns > 0 && (
          <div className="mb-5 ss-glass border border-amber-400/30 rounded-xl p-3 flex items-center gap-3 bg-amber-500/10">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span className="text-sm text-amber-200">⚠️ Warning {warns} of 2: Eyes detected off screen.</span>
          </div>
        )}

        <GlassCard className="p-8 mb-5">
          <div className="text-xs uppercase tracking-wider text-slate-500 mb-3">Question</div>
          <h2 className="mb-6 !text-2xl">{Q.q}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {Q.o.map((o, i) => (
              <button key={i} onClick={() => setPick(i)}
                className={`text-left rounded-2xl p-4 border transition ${pick === i ? "ss-gradient-brand border-blue-400 ss-glow-blue text-white" : "ss-glass border-white/10 hover:border-blue-400/50"}`}>
                <span className={`inline-flex items-center justify-center h-7 w-7 rounded-full text-xs font-bold mr-3 ${pick === i ? "bg-white/20" : "bg-white/10"}`}>{String.fromCharCode(65 + i)}</span>
                {o}
              </button>
            ))}
          </div>
        </GlassCard>

        <div className="flex justify-between gap-3">
          <button onClick={triggerWarn} className="text-xs text-slate-500 hover:text-amber-400">[ simulate eye-tracking warning ]</button>
          <GradientButton disabled={pick === null} onClick={next} icon={<ChevronRight className="h-4 w-4" />}>
            {idx + 1 === questions.length ? "Submit" : "Next"}
          </GradientButton>
        </div>
      </div>
    </div>
  );
}

export function PracticeZone() {
  const [hint, setHint] = useState(false);
  const [diff, setDiff] = useState<"easy" | "med" | "hard">("med");
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="!text-3xl mb-1">Practice Zone</h1>
          <p className="text-sm text-slate-400">Infinite questions · IRA hints on demand</p>
        </div>
        <div className="ss-glass rounded-full p-1 inline-flex">
          {(["easy", "med", "hard"] as const).map((d) => (
            <button key={d} onClick={() => setDiff(d)}
              className={`px-4 py-1.5 text-xs rounded-full capitalize ${diff === d ? "ss-gradient-brand text-white" : "text-slate-400"}`}>{d}</button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        <GlassCard className="p-6">
          <div className="text-xs uppercase tracking-wider text-cyan-300 mb-2">Question</div>
          <h3 className="mb-4">Implement a Python function `flatten(nested)` that flattens an arbitrarily nested list into a single list.</h3>
          <div className="ss-glass-strong rounded-xl p-4 font-mono text-xs text-slate-400 mb-4">
            <div>Input:  [[1, 2, [3]], 4, [[5, 6]]]</div>
            <div>Output: [1, 2, 3, 4, 5, 6]</div>
          </div>
          {hint && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              className="ss-glass rounded-xl p-4 border border-cyan-400/30">
              <div className="flex items-center gap-2 text-xs text-cyan-300 mb-2"><Lightbulb className="h-3.5 w-3.5" /> IRA hint</div>
              <p className="text-sm text-slate-300">Try recursion: if an element is a list, recurse; otherwise, append. Use `isinstance(x, list)`.</p>
            </motion.div>
          )}
          <button onClick={() => setHint(!hint)} className="text-xs text-cyan-300 mt-3 inline-flex items-center gap-1"><Sparkles className="h-3 w-3" />{hint ? "Hide hint" : "Need a hint? IRA can guide you"}</button>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="text-xs uppercase tracking-wider text-slate-500 mb-2">Your answer</div>
          <textarea
            placeholder="def flatten(nested):&#10;    ..."
            rows={12}
            className="w-full bg-[#050814] border border-white/10 rounded-xl px-4 py-3 text-sm font-mono outline-none focus:border-blue-500 resize-none"
            style={{ fontFamily: "var(--font-mono)" }}
          />
          <div className="flex gap-2 mt-3 justify-end">
            <GradientButton variant="ghost" size="sm">Skip</GradientButton>
            <GradientButton size="sm" icon={<Check className="h-3.5 w-3.5" />}>Submit</GradientButton>
            <GradientButton size="sm" icon={<ChevronRight className="h-3.5 w-3.5" />}>Next</GradientButton>
          </div>
        </GlassCard>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-5">
        <GlassCard className="p-5"><div className="text-xs text-slate-400">Accuracy today</div><div className="text-3xl font-bold ss-gradient-text" style={{ fontFamily: "var(--font-display)" }}>87%</div></GlassCard>
        <GlassCard className="p-5"><div className="text-xs text-slate-400">Solved today</div><div className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>14</div></GlassCard>
        <GlassCard className="p-5"><div className="text-xs text-slate-400">Streak</div><div className="text-3xl font-bold text-amber-400" style={{ fontFamily: "var(--font-display)" }}>🔥 12</div></GlassCard>
      </div>

      <GlassCard className="p-6 ss-glow-blue flex items-center gap-4 flex-wrap">
        <IRAOrb size={36} />
        <div className="flex-1 min-w-[240px]">
          <div className="font-semibold mb-1">Ready for Gold?</div>
          <div className="text-sm text-slate-400">You're consistently scoring 85%+. Time to make it official.</div>
        </div>
        <GradientButton variant="gold">Go to Test Zone</GradientButton>
      </GlassCard>
    </div>
  );
}
