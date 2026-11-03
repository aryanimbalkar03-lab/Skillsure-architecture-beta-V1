import { GlassCard, GradientButton, SkillBadge, StatCard, IRAOrb } from "./primitives";
import { Plus, Search, Sparkles, MapPin, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { searchPeople } from "./iraEngine";

const cols = ["Saved", "Shortlisted", "To Contact", "Hired"];
type Candidate = { n: string; r: string; lvl: "silver" | "gold" | "expert"; skill: string };

const seed: Record<string, Candidate[]> = {
  Saved: [
    { n: "Aryan Raj", r: "Full Stack · IIT-B", lvl: "expert", skill: "React" },
    { n: "Neha Iyer", r: "Data · BITS", lvl: "gold", skill: "Python" },
  ],
  Shortlisted: [{ n: "Vikram S", r: "Backend · NIT-T", lvl: "expert", skill: "Node.js" }],
  "To Contact": [{ n: "Riya Das", r: "Designer · NID", lvl: "gold", skill: "Figma" }],
  Hired: [{ n: "Karan Singh", r: "SDE · IIT-D", lvl: "expert", skill: "System Design" }],
};

export function Hirer() {
  const [board, setBoard] = useState(seed);
  const [drag, setDrag] = useState<{ from: string; idx: number } | null>(null);
  const [showPost, setShowPost] = useState(false);

  function moveTo(to: string) {
    if (!drag) return;
    const card = board[drag.from][drag.idx];
    const next = { ...board };
    next[drag.from] = next[drag.from].filter((_, i) => i !== drag.idx);
    next[to] = [card, ...next[to]];
    setBoard(next);
    setDrag(null);
  }

  function saveFromSearch(c: { name: string; role: string; level: "silver" | "gold" | "expert"; skill: string; city: string }) {
    setBoard((b) => ({ ...b, Saved: [{ n: c.name, r: `${c.role} · ${c.city}`, lvl: c.level, skill: c.skill }, ...b.Saved] }));
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="!text-3xl mb-1">Hirer Dashboard</h1>
          <p className="text-sm text-slate-400">Your verified candidate pipeline</p>
        </div>
        <GradientButton icon={<Plus className="h-4 w-4" />} onClick={() => setShowPost(true)}>Post a Job</GradientButton>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <StatCard value="2.4K" label="Profile views" />
        <StatCard value="184" label="Verified applicants" />
        <StatCard value="68%" label="Hire rate" />
      </div>

      <AITalentSearch onSave={saveFromSearch} />

      <div className="grid lg:grid-cols-4 gap-4">
        {cols.map((col) => (
          <div key={col} onDragOver={(e) => e.preventDefault()} onDrop={() => moveTo(col)}>
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">{col}</div>
              <span className="text-xs text-slate-500">{board[col].length}</span>
            </div>
            <div className="space-y-3 min-h-[200px] ss-glass rounded-2xl p-3">
              {board[col].map((c, i) => (
                <motion.div
                  key={c.n + i} draggable
                  onDragStart={() => setDrag({ from: col, idx: i })}
                  layout
                  className="ss-glass-strong rounded-xl p-3 cursor-grab active:cursor-grabbing"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-full ss-gradient-brand flex items-center justify-center font-bold text-xs text-white">{c.n.split(" ").map(x => x[0]).join("")}</div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{c.n}</div>
                      <div className="text-xs text-slate-500 truncate">{c.r}</div>
                    </div>
                  </div>
                  <SkillBadge name={c.skill} level={c.lvl} />
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showPost && (
        <div className="fixed inset-0 z-50 bg-[#050814]/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowPost(false)}>
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="ss-glass-strong rounded-3xl p-8 w-full max-w-lg">
            <h2 className="mb-1">Post a Job</h2>
            <p className="text-xs text-slate-400 mb-5">Only verified candidates can apply.</p>
            <div className="space-y-3">
              <input placeholder="Role title" className="w-full bg-[var(--input-background)] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none" />
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Required skill" className="bg-[var(--input-background)] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none" />
                <select className="bg-[var(--input-background)] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none">
                  <option>Silver</option><option>Gold</option><option>Expert</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <select className="bg-[var(--input-background)] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none">
                  <option>Immediate</option><option>Scheduled</option>
                </select>
                <input type="date" className="bg-[var(--input-background)] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none" />
              </div>
              <textarea rows={4} placeholder="Description" className="w-full bg-[var(--input-background)] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none resize-none" />
            </div>
            <div className="flex gap-3 justify-end mt-6">
              <GradientButton variant="ghost" onClick={() => setShowPost(false)}>Cancel</GradientButton>
              <GradientButton onClick={() => setShowPost(false)}>Publish</GradientButton>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function AITalentSearch({ onSave }: { onSave: (c: { name: string; role: string; level: "silver" | "gold" | "expert"; skill: string; city: string; matchPct: number }) => void }) {
  const [q, setQ] = useState("");
  const [searched, setSearched] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const results = useMemo(() => searched ? searchPeople(searched) : [], [searched]);

  function run(query: string) {
    if (!query.trim()) return;
    setLoading(true);
    setTimeout(() => { setSearched(query); setLoading(false); }, 500);
  }

  const presets = [
    "Find React engineers in Bangalore",
    "I need an Expert ML engineer",
    "Senior backend devs with System Design",
    "Designer with Figma in Mumbai",
  ];

  return (
    <GlassCard className="p-5 mb-6">
      <div className="flex items-start gap-3 mb-4">
        <IRAOrb size={36} />
        <div className="flex-1">
          <h3 className="mb-1">AI Talent Search</h3>
          <p className="text-xs text-slate-400">Describe who you need in plain English — IRA pulls ranked verified profiles.</p>
        </div>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); run(q); }}
        className="ss-glass rounded-2xl p-2 flex items-center gap-2 mb-3">
        <Search className="h-4 w-4 ml-2 text-slate-400" />
        <input value={q} onChange={(e) => setQ(e.target.value)}
          placeholder="e.g. I need an Expert React + TypeScript engineer in Bangalore"
          className="flex-1 bg-transparent outline-none px-2 text-sm" />
        <button type="submit" disabled={loading} className="ss-gradient-brand text-white rounded-full px-4 py-2 text-xs font-medium inline-flex items-center gap-1.5">
          {loading ? "Searching…" : <>Search <ArrowRight className="h-3 w-3" /></>}
        </button>
      </form>
      <div className="flex flex-wrap gap-2 mb-2">
        {presets.map((p) => (
          <button key={p} onClick={() => { setQ(p); run(p); }}
            className="ss-glass rounded-full px-3 py-1 text-xs hover:bg-white/10">
            <Sparkles className="h-3 w-3 inline mr-1 text-cyan-400" />{p}
          </button>
        ))}
      </div>
      <AnimatePresence>
        {searched && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mt-3 space-y-2">
            <div className="text-xs text-slate-400">{results.length} ranked matches for "{searched}"</div>
            {results.map((p) => (
              <div key={p.name} className="ss-glass-strong rounded-xl p-3 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full ss-gradient-brand flex items-center justify-center text-xs font-bold text-white shrink-0">
                  {p.name.split(" ").map((x) => x[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{p.name}</div>
                  <div className="text-xs text-slate-500 flex items-center gap-2 truncate">
                    {p.role} <MapPin className="h-3 w-3" /> {p.city}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <SkillBadge name={p.skill} level={p.level} />
                  <div className="text-xs text-emerald-400 font-semibold">{p.matchPct}% fit</div>
                </div>
                <button onClick={() => onSave(p)} className="ss-gradient-brand text-white rounded-full px-3 py-1.5 text-xs font-medium ml-2">
                  Save
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}
