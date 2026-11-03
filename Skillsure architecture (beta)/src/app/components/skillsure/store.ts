import { useSyncExternalStore } from "react";

export type SkillLevel = "silver" | "gold" | "expert";

export type Skill = {
  id: string;
  name: string;
  level: SkillLevel;
  category: "frontend" | "backend" | "data" | "devops" | "design" | "ai" | "mobile" | "soft";
  verifiedAt: string;
  xp: number;
};

export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  start: string;
  end: string;
  bullets: string[];
};

export type EducationItem = {
  id: string;
  school: string;
  degree: string;
  start: string;
  end: string;
  detail?: string;
};

export type ProjectItem = {
  id: string;
  name: string;
  url?: string;
  blurb: string;
};

export type ResumeSection = "skills" | "experience" | "education" | "projects" | "certifications" | "summary";

export type Profile = {
  name: string;
  email: string;
  phone: string;
  location: string;
  headline: string;
  summary: string;
  links: { label: string; href: string }[];
  skills: Skill[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  certifications: string[];
  resumeOrder: ResumeSection[];
  resumeTemplate: "minimal" | "modern" | "technical" | "mocha";
};

const initial: Profile = {
  name: "Aryan Raj",
  email: "aryan@skillsure.in",
  phone: "+91 98765 43210",
  location: "Mumbai, India",
  headline: "Full Stack Engineer · React Expert",
  summary:
    "Full stack engineer with verified Expert-level React and System Design. Shipped fraud-detection dashboards at Razorpay and maintain three OSS libraries used by 14k+ devs. I care about latency, accessibility, and shipping things that actually move metrics.",
  links: [
    { label: "github.com/aryan", href: "https://github.com/aryan" },
    { label: "skillsure.app/aryan", href: "https://skillsure.app/aryan" },
  ],
  skills: [
    { id: "s1", name: "React", level: "expert", category: "frontend", verifiedAt: "2026-04-12", xp: 1240 },
    { id: "s2", name: "System Design", level: "expert", category: "backend", verifiedAt: "2026-03-08", xp: 980 },
    { id: "s3", name: "Node.js", level: "gold", category: "backend", verifiedAt: "2026-02-22", xp: 760 },
    { id: "s4", name: "TypeScript", level: "gold", category: "frontend", verifiedAt: "2026-01-30", xp: 690 },
    { id: "s5", name: "Python", level: "gold", category: "data", verifiedAt: "2025-12-14", xp: 540 },
    { id: "s6", name: "HTML/CSS", level: "silver", category: "frontend", verifiedAt: "2025-11-02", xp: 320 },
  ],
  experience: [
    {
      id: "e1",
      company: "Razorpay",
      role: "SDE Intern",
      start: "2025-06",
      end: "2025-12",
      bullets: [
        "Built fraud-detection dashboards in React + TypeScript used by 40+ risk analysts.",
        "Cut p95 load time of the merchant console by 38% via route-level code splitting.",
        "Owned migration of internal design system from v2 to v3 across 24 surfaces.",
      ],
    },
    {
      id: "e2",
      company: "Open Source",
      role: "Maintainer",
      start: "2024-01",
      end: "Present",
      bullets: [
        "Maintain `react-flow-helpers`, 14k weekly downloads on npm.",
        "Merged 47 community PRs and shipped 12 minor releases.",
      ],
    },
  ],
  education: [
    {
      id: "ed1",
      school: "IIT Bombay",
      degree: "B.Tech, Computer Science",
      start: "2020-08",
      end: "2024-05",
      detail: "CGPA 8.9 · Tech Lead, Web & Coding Club",
    },
  ],
  projects: [
    { id: "p1", name: "skillsure.app", url: "https://skillsure.app", blurb: "Verified-skills network used by 12k+ devs across India." },
    { id: "p2", name: "learn-react.dev", url: "https://learn-react.dev", blurb: "Interactive React tutorial — 320k page views, free." },
    { id: "p3", name: "react-flow-helpers", url: "https://npm.im/react-flow-helpers", blurb: "OSS utilities for React Flow, 14k weekly downloads." },
  ],
  certifications: ["SkillSure Expert · React", "SkillSure Expert · System Design"],
  resumeOrder: ["summary", "skills", "experience", "projects", "education", "certifications"],
  resumeTemplate: "modern",
};

const STORAGE_KEY = "skillsure:profile:v1";

function hydrate(): Profile {
  if (typeof window === "undefined") return initial;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initial;
    const parsed = JSON.parse(raw) as Partial<Profile>;
    return { ...initial, ...parsed };
  } catch {
    return initial;
  }
}

function persist(s: Profile) {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
}

let state: Profile = hydrate();
const listeners = new Set<() => void>();
function emit() { persist(state); listeners.forEach((l) => l()); }

export const profileStore = {
  get: () => state,
  set: (patch: Partial<Profile>) => { state = { ...state, ...patch }; emit(); },
  update: (fn: (p: Profile) => Profile) => { state = fn(state); emit(); },
  subscribe: (l: () => void) => { listeners.add(l); return () => listeners.delete(l); },
  reset: () => { state = initial; emit(); },
};

export function useProfile(): [Profile, typeof profileStore] {
  const snap = useSyncExternalStore(profileStore.subscribe, profileStore.get, profileStore.get);
  return [snap, profileStore];
}

export function addSkillIfMissing(name: string, level: SkillLevel = "silver", category: Skill["category"] = "frontend") {
  const cur = profileStore.get();
  if (cur.skills.find((s) => s.name.toLowerCase() === name.toLowerCase())) return;
  const skill: Skill = {
    id: "s" + Math.random().toString(36).slice(2, 8),
    name, level, category,
    verifiedAt: new Date().toISOString().slice(0, 10),
    xp: 80,
  };
  profileStore.update((p) => ({ ...p, skills: [...p.skills, skill] }));
}
