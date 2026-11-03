import { GlassCard, GradientButton, SkillBadge } from "./primitives";
import { Briefcase, MapPin, Clock, Lock, Check, Filter, Search } from "lucide-react";

const jobs = [
  { c: "Razorpay", r: "Senior React Engineer", skill: "React", lvl: "gold", type: "Immediate", loc: "Mumbai · Remote", apps: 24, verified: true },
  { c: "Cred", r: "Product Designer", skill: "Figma", lvl: "expert", type: "Scheduled", loc: "Bangalore", apps: 0, verified: false, opens: "4 days" },
  { c: "Zerodha", r: "Backend SDE", skill: "Node.js", lvl: "gold", type: "Immediate", loc: "Bangalore · On-site", apps: 18, verified: true },
  { c: "Swiggy", r: "Data Scientist", skill: "Python", lvl: "expert", type: "Scheduled", loc: "Hybrid", apps: 0, verified: false, opens: "12 days" },
  { c: "Infosys", r: "Full Stack Dev", skill: "TypeScript", lvl: "silver", type: "Immediate", loc: "Pune", apps: 156, verified: true },
] as const;

export function Jobs() {
  return (
    <div className="p-6 grid lg:grid-cols-[280px_1fr] gap-6">
      <aside className="space-y-4">
        <GlassCard className="p-5">
          <div className="flex items-center gap-2 mb-4"><Filter className="h-4 w-4" /><h4>Filters</h4></div>
          <FilterGroup title="Verified Skills" items={["React (Expert ✓)", "Node.js (Gold ✓)", "Python (Silver ✓)"]} />
          <FilterGroup title="Job Type" items={["Immediate", "Scheduled"]} />
          <FilterGroup title="Mode" items={["Remote", "Hybrid", "On-site"]} />
          <FilterGroup title="Experience" items={["0-1 yrs", "1-3 yrs", "3-5 yrs", "5+ yrs"]} />
        </GlassCard>
      </aside>

      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input placeholder="Search jobs…" className="w-full bg-[var(--input-background)] border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue-500" />
          </div>
          <span className="text-xs text-slate-500 ml-auto">{jobs.length} matches</span>
        </div>

        <div className="space-y-4">
          {jobs.map((j) => (
            <GlassCard key={j.r} className="p-5" hover>
              <div className="flex items-start gap-4 flex-wrap">
                <div className="h-12 w-12 rounded-xl ss-glass flex items-center justify-center font-bold">{j.c[0]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold ${j.type === "Immediate" ? "bg-emerald-500/20 text-emerald-300" : "bg-violet-500/20 text-violet-300"}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${j.type === "Immediate" ? "bg-emerald-400 animate-pulse" : "bg-violet-400"}`} /> {j.type}
                      {"opens" in j && <span className="opacity-80">· opens in {j.opens}</span>}
                    </span>
                  </div>
                  <h3 className="mt-1.5">{j.r}</h3>
                  <div className="text-sm text-slate-400 mb-2">{j.c}</div>
                  <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{j.loc}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />2d ago</span>
                    <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{j.apps || "—"} apps</span>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs text-slate-400">Required:</span>
                    <SkillBadge name={j.skill} level={j.lvl as any} />
                  </div>
                </div>
                <div className="ml-auto">
                  {j.verified ? (
                    <GradientButton size="sm" icon={<Check className="h-3.5 w-3.5" />}>Apply Now</GradientButton>
                  ) : (
                    <button disabled className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-slate-500 text-sm cursor-not-allowed">
                      <Lock className="h-3 w-3" /> Get Verified
                    </button>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mb-5 last:mb-0">
      <div className="text-xs uppercase tracking-wider text-slate-500 mb-2">{title}</div>
      <div className="space-y-2">
        {items.map((it) => (
          <label key={it} className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
            <input type="checkbox" className="accent-blue-500" />
            {it}
          </label>
        ))}
      </div>
    </div>
  );
}
