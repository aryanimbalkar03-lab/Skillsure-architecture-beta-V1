import { useRef, useState } from "react";
import { GlassCard, GradientButton, SkillBadge } from "./primitives";
import { useProfile, profileStore, ResumeSection, ExperienceItem, ProjectItem, EducationItem } from "./store";
import { Download, Printer, Plus, Trash2, GripVertical, ArrowUp, ArrowDown, Sparkles, Wand2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const SECTION_LABELS: Record<ResumeSection, string> = {
  summary: "Summary",
  skills: "Verified Skills",
  experience: "Experience",
  education: "Education",
  projects: "Projects",
  certifications: "Certifications",
};

const TEMPLATES: { id: "minimal" | "modern" | "technical" | "mocha"; label: string; accent: string }[] = [
  { id: "minimal",   label: "Minimal",   accent: "#0F172A" },
  { id: "modern",    label: "Modern",    accent: "#2563EB" },
  { id: "technical", label: "Technical", accent: "#06B6D4" },
  { id: "mocha",     label: "Mocha",     accent: "#8B6B4A" },
];

export function ResumeBuilder() {
  const [profile, store] = useProfile();
  const printRef = useRef<HTMLDivElement>(null);
  const [aiOpen, setAiOpen] = useState(false);

  function updateField<K extends keyof typeof profile>(k: K, v: typeof profile[K]) {
    store.set({ [k]: v } as any);
  }

  function move(section: ResumeSection, dir: -1 | 1) {
    const order = [...profile.resumeOrder];
    const idx = order.indexOf(section);
    if (idx < 0) return;
    const j = idx + dir;
    if (j < 0 || j >= order.length) return;
    [order[idx], order[j]] = [order[j], order[idx]];
    store.set({ resumeOrder: order });
  }

  function toggleSection(section: ResumeSection) {
    const order = [...profile.resumeOrder];
    if (order.includes(section)) store.set({ resumeOrder: order.filter((s) => s !== section) });
    else store.set({ resumeOrder: [...order, section] });
  }

  function addExperience() {
    const item: ExperienceItem = { id: "e" + Date.now(), company: "New Company", role: "Role", start: "2026-01", end: "Present", bullets: ["Impact statement"] };
    store.set({ experience: [...profile.experience, item] });
  }
  function updateExperience(id: string, patch: Partial<ExperienceItem>) {
    store.set({ experience: profile.experience.map((e) => e.id === id ? { ...e, ...patch } : e) });
  }
  function removeExperience(id: string) {
    store.set({ experience: profile.experience.filter((e) => e.id !== id) });
  }

  function addProject() {
    const p: ProjectItem = { id: "p" + Date.now(), name: "New Project", blurb: "What it does + impact" };
    store.set({ projects: [...profile.projects, p] });
  }
  function updateProject(id: string, patch: Partial<ProjectItem>) {
    store.set({ projects: profile.projects.map((p) => p.id === id ? { ...p, ...patch } : p) });
  }
  function removeProject(id: string) {
    store.set({ projects: profile.projects.filter((p) => p.id !== id) });
  }

  function addEducation() {
    const ed: EducationItem = { id: "ed" + Date.now(), school: "School", degree: "Degree", start: "2020", end: "2024" };
    store.set({ education: [...profile.education, ed] });
  }
  function updateEducation(id: string, patch: Partial<EducationItem>) {
    store.set({ education: profile.education.map((e) => e.id === id ? { ...e, ...patch } : e) });
  }
  function removeEducation(id: string) {
    store.set({ education: profile.education.filter((e) => e.id !== id) });
  }

  function aiEnhance() {
    setAiOpen(true);
    setTimeout(() => {
      const skills = profile.skills.slice(0, 3).map((s) => `${s.name} (${s.level})`).join(", ");
      const summary = `${profile.headline}. ${profile.experience.length}+ shipped roles, with verified ${skills}. Track record of measurable wins — ${profile.experience[0]?.bullets[0]?.toLowerCase().replace(/\.$/, "") || "leading high-impact engineering"}.`;
      store.set({ summary });
      setAiOpen(false);
    }, 900);
  }

  function syncFromProfile() {
    // Auto-paste: any verified skill not yet in the resume "skills" section is included by default.
    // Always force-rebuild summary if user wants
    const certs = profile.skills.filter((s) => s.level === "expert").map((s) => `SkillSure Expert · ${s.name}`);
    store.set({ certifications: certs.length ? certs : profile.certifications });
  }

  function printPDF() { window.print(); }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="!text-3xl mb-1">Resume Builder</h1>
          <p className="text-sm text-slate-400">Auto-synced from your profile & verified skills. Personalize anything.</p>
        </div>
        <div className="flex items-center gap-2">
          <GradientButton variant="ghost" size="sm" icon={<Wand2 className="h-3.5 w-3.5" />} onClick={aiEnhance}>AI rewrite summary</GradientButton>
          <GradientButton variant="ghost" size="sm" icon={<Sparkles className="h-3.5 w-3.5" />} onClick={syncFromProfile}>Re-sync from profile</GradientButton>
          <GradientButton size="sm" icon={<Printer className="h-3.5 w-3.5" />} onClick={printPDF}>Print / Save PDF</GradientButton>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-5">
        {/* ============== EDITOR ============== */}
        <div className="space-y-4 print:hidden">
          <GlassCard className="p-5">
            <h3 className="mb-3">Personal Info</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Name"     value={profile.name}     onChange={(v) => updateField("name", v)} />
              <Field label="Headline" value={profile.headline} onChange={(v) => updateField("headline", v)} />
              <Field label="Email"    value={profile.email}    onChange={(v) => updateField("email", v)} />
              <Field label="Phone"    value={profile.phone}    onChange={(v) => updateField("phone", v)} />
              <Field label="Location" value={profile.location} onChange={(v) => updateField("location", v)} />
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <h3 className="mb-3">Summary</h3>
            <textarea rows={4} value={profile.summary} onChange={(e) => updateField("summary", e.target.value)}
              className="w-full bg-[var(--input-background)] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none resize-none" />
            <AnimatePresence>
              {aiOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="mt-2 text-xs text-cyan-300 flex items-center gap-2">
                  <Wand2 className="h-3 w-3" /> IRA is rewriting your summary…
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3>Verified Skills (auto-pasted)</h3>
              <span className="text-xs text-slate-400">{profile.skills.length} skills</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((s) => (
                <SkillBadge key={s.id} name={s.name} level={s.level} />
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-3">Verified skills come straight from your profile. Earn a badge in Learner mode → it appears here automatically.</p>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3>Experience</h3>
              <button onClick={addExperience} className="text-xs text-cyan-300 inline-flex items-center gap-1"><Plus className="h-3 w-3" /> Add role</button>
            </div>
            <div className="space-y-3">
              {profile.experience.map((e) => (
                <div key={e.id} className="ss-glass rounded-xl p-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <input value={e.role} onChange={(ev) => updateExperience(e.id, { role: ev.target.value })}
                        placeholder="Role" className="bg-[var(--input-background)] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none" />
                      <input value={e.company} onChange={(ev) => updateExperience(e.id, { company: ev.target.value })}
                        placeholder="Company" className="bg-[var(--input-background)] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none" />
                      <input value={e.start} onChange={(ev) => updateExperience(e.id, { start: ev.target.value })}
                        placeholder="Start" className="bg-[var(--input-background)] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none" />
                      <input value={e.end} onChange={(ev) => updateExperience(e.id, { end: ev.target.value })}
                        placeholder="End" className="bg-[var(--input-background)] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none" />
                    </div>
                    <button onClick={() => removeExperience(e.id)} className="text-slate-500 hover:text-rose-400 p-1"><Trash2 className="h-4 w-4" /></button>
                  </div>
                  <textarea value={e.bullets.join("\n")}
                    onChange={(ev) => updateExperience(e.id, { bullets: ev.target.value.split("\n").filter(Boolean) })}
                    rows={3} placeholder="One impact bullet per line"
                    className="w-full bg-[var(--input-background)] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none resize-none" />
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3>Projects</h3>
              <button onClick={addProject} className="text-xs text-cyan-300 inline-flex items-center gap-1"><Plus className="h-3 w-3" /> Add project</button>
            </div>
            <div className="space-y-2">
              {profile.projects.map((p) => (
                <div key={p.id} className="ss-glass rounded-xl p-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <input value={p.name} onChange={(e) => updateProject(p.id, { name: e.target.value })}
                        placeholder="Project name" className="bg-[var(--input-background)] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none" />
                      <input value={p.url ?? ""} onChange={(e) => updateProject(p.id, { url: e.target.value })}
                        placeholder="URL (optional)" className="bg-[var(--input-background)] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none" />
                    </div>
                    <button onClick={() => removeProject(p.id)} className="text-slate-500 hover:text-rose-400 p-1"><Trash2 className="h-4 w-4" /></button>
                  </div>
                  <input value={p.blurb} onChange={(e) => updateProject(p.id, { blurb: e.target.value })}
                    placeholder="One-line description with impact" className="w-full bg-[var(--input-background)] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none" />
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3>Education</h3>
              <button onClick={addEducation} className="text-xs text-cyan-300 inline-flex items-center gap-1"><Plus className="h-3 w-3" /> Add</button>
            </div>
            <div className="space-y-2">
              {profile.education.map((ed) => (
                <div key={ed.id} className="ss-glass rounded-xl p-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <input value={ed.school} onChange={(e) => updateEducation(ed.id, { school: e.target.value })}
                        placeholder="School" className="bg-[var(--input-background)] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none" />
                      <input value={ed.degree} onChange={(e) => updateEducation(ed.id, { degree: e.target.value })}
                        placeholder="Degree" className="bg-[var(--input-background)] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none" />
                      <input value={ed.start} onChange={(e) => updateEducation(ed.id, { start: e.target.value })}
                        placeholder="Start" className="bg-[var(--input-background)] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none" />
                      <input value={ed.end} onChange={(e) => updateEducation(ed.id, { end: e.target.value })}
                        placeholder="End" className="bg-[var(--input-background)] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none" />
                    </div>
                    <button onClick={() => removeEducation(ed.id)} className="text-slate-500 hover:text-rose-400 p-1"><Trash2 className="h-4 w-4" /></button>
                  </div>
                  <input value={ed.detail ?? ""} onChange={(e) => updateEducation(ed.id, { detail: e.target.value })}
                    placeholder="Detail (CGPA, honours, role…)" className="w-full bg-[var(--input-background)] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none" />
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <h3 className="mb-3">Section order & visibility</h3>
            <div className="space-y-1">
              {(Object.keys(SECTION_LABELS) as ResumeSection[]).map((s) => {
                const active = profile.resumeOrder.includes(s);
                return (
                  <div key={s} className={`flex items-center gap-2 ss-glass rounded-lg px-3 py-2 ${active ? "" : "opacity-50"}`}>
                    <GripVertical className="h-4 w-4 text-slate-500" />
                    <div className="flex-1 text-sm">{SECTION_LABELS[s]}</div>
                    {active && (
                      <>
                        <button onClick={() => move(s, -1)} className="p-1 hover:bg-white/10 rounded"><ArrowUp className="h-3.5 w-3.5" /></button>
                        <button onClick={() => move(s, 1)} className="p-1 hover:bg-white/10 rounded"><ArrowDown className="h-3.5 w-3.5" /></button>
                      </>
                    )}
                    <button onClick={() => toggleSection(s)} className="text-xs text-cyan-300 ml-1">{active ? "Hide" : "Show"}</button>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <h3 className="mb-3">Template</h3>
            <div className="grid grid-cols-4 gap-3">
              {TEMPLATES.map((t) => (
                <button key={t.id} onClick={() => store.set({ resumeTemplate: t.id })}
                  className={`ss-glass rounded-xl p-3 text-xs ${profile.resumeTemplate === t.id ? "ring-2 ring-cyan-400" : ""}`}>
                  <div className="aspect-[3/4] rounded mb-2 ss-dot-grid" style={{ background: t.accent + "22" }} />
                  {t.label}
                </button>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* ============== PREVIEW ============== */}
        <div className="lg:sticky lg:top-6 self-start">
          <div className="flex items-center justify-between mb-3 print:hidden">
            <h3>Live Preview</h3>
            <GradientButton size="sm" icon={<Download className="h-3.5 w-3.5" />} onClick={printPDF}>Export PDF</GradientButton>
          </div>
          <div ref={printRef} className="resume-paper">
            <ResumePreview profile={profile} />
          </div>
        </div>
      </div>

      <style>{`
        .resume-paper {
          background: #fff; color: #1A1209; border-radius: 1rem;
          padding: 2.5rem; box-shadow: 0 12px 40px rgba(0,0,0,0.25);
          min-height: 1100px; max-width: 850px; margin: 0 auto;
        }
        @media print {
          body * { visibility: hidden; }
          .resume-paper, .resume-paper * { visibility: visible; }
          .resume-paper { position: absolute; left: 0; top: 0; box-shadow: none; border-radius: 0; padding: 1.5cm; }
        }
      `}</style>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-xs text-slate-400 mb-1.5 block">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[var(--input-background)] border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none" />
    </div>
  );
}

function ResumePreview({ profile }: { profile: ReturnType<typeof profileStore.get> }) {
  const accent = profile.resumeTemplate === "minimal" ? "#0F172A"
    : profile.resumeTemplate === "modern" ? "#2563EB"
    : profile.resumeTemplate === "technical" ? "#06B6D4"
    : "#8B6B4A";
  const headerStyle = profile.resumeTemplate === "mocha"
    ? { borderBottom: `3px double ${accent}`, color: accent }
    : profile.resumeTemplate === "modern"
    ? { borderLeft: `6px solid ${accent}`, paddingLeft: 16 }
    : { borderBottom: `2px solid ${accent}` };

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", color: "#1A1209" }}>
      <div style={{ ...headerStyle, paddingBottom: 12, marginBottom: 18 }}>
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", fontFamily: "var(--font-display)" }}>
          {profile.name}
        </div>
        <div style={{ fontSize: 14, color: "#4A3624", marginTop: 2 }}>{profile.headline}</div>
        <div style={{ fontSize: 11, color: "#6B4F36", marginTop: 6 }}>
          {profile.email} · {profile.phone} · {profile.location}
          {profile.links.length > 0 && " · "}
          {profile.links.map((l, i) => <span key={l.label}>{i > 0 && " · "}{l.label}</span>)}
        </div>
      </div>

      {profile.resumeOrder.map((section) => {
        if (section === "summary" && profile.summary) return (
          <Block key={section} title="Summary" accent={accent}>
            <p style={{ fontSize: 12, lineHeight: 1.55 }}>{profile.summary}</p>
          </Block>
        );
        if (section === "skills") return (
          <Block key={section} title="Verified Skills" accent={accent}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {profile.skills.map((s) => (
                <span key={s.id} style={{
                  border: `1px solid ${accent}`, color: accent,
                  borderRadius: 999, padding: "2px 10px", fontSize: 11, fontWeight: 600,
                  background: s.level === "expert" ? accent + "15" : "transparent",
                }}>
                  {s.name} · {s.level === "expert" ? "Expert ✓" : s.level === "gold" ? "Gold" : "Silver"}
                </span>
              ))}
            </div>
          </Block>
        );
        if (section === "experience") return (
          <Block key={section} title="Experience" accent={accent}>
            {profile.experience.map((e) => (
              <div key={e.id} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{e.role} · {e.company}</div>
                  <div style={{ fontSize: 11, color: "#6B4F36" }}>{e.start} — {e.end}</div>
                </div>
                <ul style={{ marginTop: 4, paddingLeft: 18, fontSize: 12, lineHeight: 1.5 }}>
                  {e.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </Block>
        );
        if (section === "projects") return (
          <Block key={section} title="Projects" accent={accent}>
            <ul style={{ paddingLeft: 18, fontSize: 12, lineHeight: 1.55 }}>
              {profile.projects.map((p) => (
                <li key={p.id}>
                  <span style={{ fontWeight: 600 }}>{p.name}</span> — {p.blurb}
                  {p.url && <span style={{ color: accent }}> · {p.url}</span>}
                </li>
              ))}
            </ul>
          </Block>
        );
        if (section === "education") return (
          <Block key={section} title="Education" accent={accent}>
            {profile.education.map((ed) => (
              <div key={ed.id} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{ed.degree}</div>
                <div style={{ fontSize: 11, color: "#6B4F36" }}>{ed.school} · {ed.start} — {ed.end}{ed.detail ? ` · ${ed.detail}` : ""}</div>
              </div>
            ))}
          </Block>
        );
        if (section === "certifications" && profile.certifications.length > 0) return (
          <Block key={section} title="Certifications" accent={accent}>
            <ul style={{ paddingLeft: 18, fontSize: 12, lineHeight: 1.55 }}>
              {profile.certifications.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </Block>
        );
        return null;
      })}
    </div>
  );
}

function Block({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: "0.2em",
        color: accent, textTransform: "uppercase", marginBottom: 8,
        borderBottom: `1px solid ${accent}33`, paddingBottom: 2,
      }}>{title}</div>
      {children}
    </div>
  );
}
