/* ============================================================
   IRA Engine — In-house conversational engine for SkillSure
   No external API. Built from scratch:
   - Tokeniser + lemma normalisation
   - Multi-pattern intent classifier with weighted scoring
   - Slot/entity extraction (skill, role, company, city, level, timeframe)
   - Context memory (last 6 turns, last intent, last entity)
   - Knowledge base over skills, roles, salaries, companies, study plans
   - Retrieval-style response composition
   ============================================================ */

import { profileStore, Skill } from "./store";

/* ---------- Knowledge base ---------- */

export type SkillKB = {
  name: string;
  aliases: string[];
  category: "frontend" | "backend" | "data" | "devops" | "design" | "ai" | "mobile" | "soft";
  difficulty: 1 | 2 | 3 | 4 | 5;
  weeksToGold: number;
  jobROI: number;       // 1..10
  avgSalaryLpa: number; // INR Lakhs
  pairsWith: string[];
  why: string;
  plan: { week: number; topic: string; hours: number }[];
};

export const SKILLS_KB: SkillKB[] = [
  {
    name: "React", aliases: ["reactjs", "react.js"], category: "frontend", difficulty: 3, weeksToGold: 6, jobROI: 9, avgSalaryLpa: 22,
    pairsWith: ["TypeScript", "Next.js", "GraphQL"],
    why: "Most-demanded frontend skill in 2026 hiring. 62% of frontend roles list it as required.",
    plan: [
      { week: 1, topic: "Components, props, state, effects", hours: 6 },
      { week: 2, topic: "Hooks deep dive + custom hooks", hours: 7 },
      { week: 3, topic: "Forms, validation, react-hook-form", hours: 6 },
      { week: 4, topic: "Performance: memo, lazy, suspense", hours: 7 },
      { week: 5, topic: "Testing with RTL + Vitest", hours: 6 },
      { week: 6, topic: "Capstone: ship a verified project", hours: 10 },
    ],
  },
  {
    name: "TypeScript", aliases: ["ts", "typed js"], category: "frontend", difficulty: 3, weeksToGold: 4, jobROI: 9, avgSalaryLpa: 24,
    pairsWith: ["React", "Node.js"],
    why: "TS-required listings grew 42% YoY. Pairs natively with React + Node.",
    plan: [
      { week: 1, topic: "Types, interfaces, narrowing", hours: 6 },
      { week: 2, topic: "Generics + utility types", hours: 7 },
      { week: 3, topic: "Inference, mapped & conditional types", hours: 7 },
      { week: 4, topic: "Typing a real React + Node app", hours: 9 },
    ],
  },
  {
    name: "Node.js", aliases: ["node", "nodejs", "backend js"], category: "backend", difficulty: 3, weeksToGold: 5, jobROI: 8, avgSalaryLpa: 21,
    pairsWith: ["TypeScript", "PostgreSQL", "Redis"],
    why: "Most teams that use React also use Node — adding it doubles your role surface area.",
    plan: [
      { week: 1, topic: "Event loop, modules, streams", hours: 6 },
      { week: 2, topic: "Express/Fastify + REST", hours: 7 },
      { week: 3, topic: "Auth, JWT, sessions", hours: 6 },
      { week: 4, topic: "PostgreSQL + Prisma", hours: 8 },
      { week: 5, topic: "Capstone API + deploy", hours: 10 },
    ],
  },
  {
    name: "System Design", aliases: ["sd", "hld", "lld", "architecture"], category: "backend", difficulty: 5, weeksToGold: 8, jobROI: 10, avgSalaryLpa: 36,
    pairsWith: ["AWS", "Kubernetes", "Postgres"],
    why: "Senior+ filter. Single biggest predictor of salary jump from L4 → L5.",
    plan: [
      { week: 1, topic: "Latency, throughput, CAP basics", hours: 6 },
      { week: 2, topic: "Caching layers + invalidation", hours: 7 },
      { week: 3, topic: "Queues, fan-out, idempotency", hours: 7 },
      { week: 4, topic: "Sharding & replication", hours: 8 },
      { week: 5, topic: "Design: URL shortener, feed, chat", hours: 9 },
      { week: 6, topic: "Mock interviews", hours: 8 },
      { week: 7, topic: "Observability + SLOs", hours: 6 },
      { week: 8, topic: "Capstone design doc", hours: 8 },
    ],
  },
  {
    name: "GraphQL", aliases: ["gql", "apollo"], category: "backend", difficulty: 3, weeksToGold: 4, jobROI: 7, avgSalaryLpa: 23,
    pairsWith: ["React", "Node.js"],
    why: "Pairs with React. Fintechs and consumer apps in India use it heavily.",
    plan: [
      { week: 1, topic: "Schema, queries, mutations", hours: 6 },
      { week: 2, topic: "Apollo Client + caching", hours: 7 },
      { week: 3, topic: "Subscriptions + dataloader", hours: 6 },
      { week: 4, topic: "Federation basics", hours: 7 },
    ],
  },
  {
    name: "Python", aliases: ["py", "python3"], category: "data", difficulty: 2, weeksToGold: 4, jobROI: 9, avgSalaryLpa: 20,
    pairsWith: ["Pandas", "SQL", "PyTorch"],
    why: "Required for ~70% of data + ML roles in India.",
    plan: [
      { week: 1, topic: "Syntax, data structures, comprehensions", hours: 5 },
      { week: 2, topic: "OOP + virtualenv + packaging", hours: 6 },
      { week: 3, topic: "Pandas, NumPy basics", hours: 7 },
      { week: 4, topic: "Capstone: data pipeline", hours: 8 },
    ],
  },
  {
    name: "Kubernetes", aliases: ["k8s", "kube"], category: "devops", difficulty: 5, weeksToGold: 7, jobROI: 8, avgSalaryLpa: 32,
    pairsWith: ["Docker", "AWS", "Terraform"],
    why: "Avg ₹6L uplift over equivalent non-K8s SRE roles.",
    plan: [
      { week: 1, topic: "Pods, deployments, services", hours: 6 },
      { week: 2, topic: "ConfigMaps, Secrets, Ingress", hours: 7 },
      { week: 3, topic: "Helm + manifests", hours: 7 },
      { week: 4, topic: "Probes, autoscaling", hours: 6 },
      { week: 5, topic: "Observability + RBAC", hours: 7 },
      { week: 6, topic: "Production cluster setup", hours: 8 },
      { week: 7, topic: "Capstone: ship a real workload", hours: 10 },
    ],
  },
  {
    name: "AWS", aliases: ["amazon web services", "cloud"], category: "devops", difficulty: 4, weeksToGold: 6, jobROI: 8, avgSalaryLpa: 28,
    pairsWith: ["Kubernetes", "Terraform"],
    why: "Most enterprise India workloads run on AWS. Cert + verification opens senior backend doors.",
    plan: [
      { week: 1, topic: "EC2, IAM, VPC fundamentals", hours: 6 },
      { week: 2, topic: "S3, CloudFront, Route53", hours: 6 },
      { week: 3, topic: "RDS, Lambda, API Gateway", hours: 7 },
      { week: 4, topic: "ECS/EKS basics", hours: 7 },
      { week: 5, topic: "Observability + cost optimisation", hours: 6 },
      { week: 6, topic: "Capstone: deploy a real app", hours: 9 },
    ],
  },
  {
    name: "SQL", aliases: ["postgres", "postgresql", "mysql"], category: "backend", difficulty: 2, weeksToGold: 3, jobROI: 8, avgSalaryLpa: 18,
    pairsWith: ["Python", "Node.js"],
    why: "Every backend role expects it. Fastest verification → most resume lift per hour.",
    plan: [
      { week: 1, topic: "SELECT, JOINs, GROUP BY", hours: 5 },
      { week: 2, topic: "Indexes + query plans", hours: 6 },
      { week: 3, topic: "Transactions + isolation", hours: 7 },
    ],
  },
  {
    name: "Figma", aliases: ["design", "ui design"], category: "design", difficulty: 2, weeksToGold: 3, jobROI: 6, avgSalaryLpa: 15,
    pairsWith: ["Design Systems", "Prototyping"],
    why: "Mandatory for product/UX roles. Pairs well with React for hybrid PD roles.",
    plan: [
      { week: 1, topic: "Auto-layout, components, variants", hours: 5 },
      { week: 2, topic: "Design tokens + libraries", hours: 6 },
      { week: 3, topic: "Prototypes + hand-off", hours: 6 },
    ],
  },
  {
    name: "Machine Learning", aliases: ["ml", "ai", "ai/ml"], category: "ai", difficulty: 5, weeksToGold: 10, jobROI: 9, avgSalaryLpa: 34,
    pairsWith: ["Python", "PyTorch", "SQL"],
    why: "Largest pay band of any technical specialty in India in 2026.",
    plan: [
      { week: 1, topic: "Linear algebra refresh + NumPy", hours: 6 },
      { week: 2, topic: "Linear/logistic regression", hours: 7 },
      { week: 3, topic: "Decision trees, ensembles", hours: 7 },
      { week: 4, topic: "Neural net basics + PyTorch", hours: 8 },
      { week: 5, topic: "CNNs", hours: 8 },
      { week: 6, topic: "Transformers intro", hours: 8 },
      { week: 7, topic: "LLMs + RAG", hours: 8 },
      { week: 8, topic: "MLOps basics", hours: 7 },
      { week: 9, topic: "Capstone: ship an ML feature", hours: 10 },
      { week: 10, topic: "Mock interviews", hours: 8 },
    ],
  },
];

export const ROLES_KB = [
  { title: "Senior React Engineer", required: ["React", "TypeScript"], nice: ["GraphQL", "Node.js"], salary: [34, 54] as [number, number], cities: ["Bangalore", "Hyderabad", "Mumbai", "Remote"] },
  { title: "Full Stack Engineer", required: ["React", "Node.js"], nice: ["TypeScript", "SQL", "AWS"], salary: [28, 46], cities: ["Bangalore", "Pune", "Remote"] },
  { title: "Backend Engineer", required: ["Node.js", "SQL"], nice: ["System Design", "AWS"], salary: [26, 44], cities: ["Bangalore", "Hyderabad"] },
  { title: "Data Scientist", required: ["Python", "SQL"], nice: ["Machine Learning"], salary: [24, 44], cities: ["Bangalore", "Mumbai", "Remote"] },
  { title: "ML Engineer", required: ["Python", "Machine Learning"], nice: ["AWS", "System Design"], salary: [32, 58], cities: ["Bangalore", "Hyderabad", "Remote"] },
  { title: "SRE / Platform", required: ["Kubernetes", "AWS"], nice: ["System Design", "Python"], salary: [30, 52], cities: ["Bangalore", "Pune"] },
  { title: "Frontend Lead", required: ["React", "TypeScript", "System Design"], nice: ["GraphQL"], salary: [42, 68], cities: ["Bangalore", "Remote"] },
  { title: "Product Designer", required: ["Figma"], nice: ["React"], salary: [16, 32], cities: ["Bangalore", "Mumbai", "Remote"] },
];

/* ---------- Tokenise + normalise ---------- */

const STOP = new Set(["a","an","the","is","are","was","were","of","to","in","on","for","with","and","or","but","my","me","i","you","do","does","please","plz","kindly"]);

function tokens(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9+#./ -]/g, " ").split(/\s+/).filter((w) => w && !STOP.has(w));
}

/* ---------- Entity extraction ---------- */

export type Entities = {
  skill?: SkillKB;
  role?: typeof ROLES_KB[number];
  city?: string;
  level?: "silver" | "gold" | "expert";
  timeframeWeeks?: number;
};

const CITIES = ["bangalore", "bengaluru", "mumbai", "hyderabad", "pune", "delhi", "gurgaon", "noida", "remote", "chennai", "kolkata"];

export function extractEntities(text: string): Entities {
  const t = text.toLowerCase();
  const e: Entities = {};
  for (const s of SKILLS_KB) {
    if (t.includes(s.name.toLowerCase()) || s.aliases.some((a) => t.includes(a))) { e.skill = s; break; }
  }
  for (const r of ROLES_KB) {
    if (t.includes(r.title.toLowerCase()) || r.required.some((rq) => t.includes(rq.toLowerCase()))) { e.role = r; break; }
  }
  for (const c of CITIES) if (t.includes(c)) { e.city = c[0].toUpperCase() + c.slice(1); break; }
  if (/expert|advanced|senior|sr\b/.test(t)) e.level = "expert";
  else if (/gold|intermediate|mid\b/.test(t)) e.level = "gold";
  else if (/silver|beginner|junior|jr\b/.test(t)) e.level = "silver";
  const wm = t.match(/(\d+)\s*(week|weeks|wk)/);
  const mm = t.match(/(\d+)\s*(month|months|mo)/);
  if (wm) e.timeframeWeeks = parseInt(wm[1], 10);
  else if (mm) e.timeframeWeeks = parseInt(mm[1], 10) * 4;
  return e;
}

/* ---------- Intent classifier ---------- */

export type Intent =
  | "greeting" | "thanks" | "help" | "identity" | "smalltalk"
  | "usage" | "growth" | "strengths" | "compare"
  | "skills_suggest" | "skill_info" | "learn_now" | "roadmap"
  | "jobs_find" | "people_find" | "company_info"
  | "salary" | "negotiate"
  | "interview" | "behavioral" | "system_design_q"
  | "resume" | "resume_review"
  | "motivation" | "feedback" | "verify_path"
  | "fallback";

type Rule = { intent: Intent; patterns: RegExp[]; weight?: number };
const RULES: Rule[] = [
  { intent: "greeting",       patterns: [/^(hi|hey|hello|yo|namaste|hola|sup|good (morning|evening|afternoon))\b/] },
  { intent: "thanks",         patterns: [/\b(thanks|thank you|thx|ty|appreciate|grateful)\b/] },
  { intent: "identity",       patterns: [/\b(who are you|what are you|your name|are you (an? )?(ai|bot|llm|gpt))\b/] },
  { intent: "help",           patterns: [/\b(help|what can you do|capabilities|features|how do you work)\b/] },
  { intent: "smalltalk",      patterns: [/\b(how are you|whats up|how('?| i)s it going|bored|tired today)\b/] },
  { intent: "usage",          patterns: [/\b(usage|stats|activity|time spent|hours|how active)\b/] },
  { intent: "growth",         patterns: [/\b(growth|progress|xp|trajectory|how (am|i'?m) (i )?growing)\b/] },
  { intent: "strengths",      patterns: [/\b(strength|weakness|skill matrix|radar|where (do|am) i stand|analyze me|swot|gap)\b/] },
  { intent: "compare",        patterns: [/\b(compare|versus|vs\b|better than|peer)\b/] },
  { intent: "skills_suggest", patterns: [/\b(suggest|recommend) (a |some )?(skill|skills|next)|what (skill|should) (i learn|next)|what.*learn next/] },
  { intent: "skill_info",     patterns: [/\b(what is|tell me about|explain) (react|node|typescript|python|graphql|kubernetes|aws|sql|figma|system design|machine learning|ml)/, /\b(why) (react|node|typescript|python|graphql|kubernetes|aws|sql|figma|system design|machine learning|ml)/] },
  { intent: "learn_now",      patterns: [/\b(start|begin|let'?s do|teach me|learn now|study) (react|node|typescript|python|graphql|kubernetes|aws|sql|figma|system design|machine learning|ml)/, /^learn \w/] },
  { intent: "roadmap",        patterns: [/\b(roadmap|plan|study plan|curriculum|path|schedule)\b/] },
  { intent: "jobs_find",      patterns: [/\b(job|jobs|hire me|openings|roles|positions|apply|hiring)\b/] },
  { intent: "people_find",    patterns: [/\b(find|search|pull|show) (me )?(people|candidates|profiles|engineers|devs|developers|designers|talent)\b/, /\b(i need|looking for) (an? )?(developer|engineer|designer|candidate)\b/, /\b(employees|employee) (with|who)\b/] },
  { intent: "company_info",   patterns: [/\b(razorpay|cred|zerodha|swiggy|zomato|flipkart|paytm|phonepe|infosys|tcs|google|amazon|microsoft)\b/] },
  { intent: "salary",         patterns: [/\b(salary|pay|ctc|compensation|package|how much.*earn|band|stipend)\b/] },
  { intent: "negotiate",      patterns: [/\b(negotiate|counter offer|raise|hike|appraisal)\b/] },
  { intent: "interview",      patterns: [/\b(interview|mock|round)\b/] },
  { intent: "behavioral",     patterns: [/\b(behavioral|behaviour|tell me about a time|star method|leadership question)\b/] },
  { intent: "system_design_q",patterns: [/\b(system design (q|question|round|interview))\b/] },
  { intent: "resume",         patterns: [/\b(resume|cv|portfolio)\b/] },
  { intent: "resume_review",  patterns: [/\b(review my resume|optimise|optimize|improve.*resume|ats)\b/] },
  { intent: "motivation",     patterns: [/\b(motivat|stuck|tired|burn|give up|demoral|stress|anxious|down today|sad|lonely)\b/] },
  { intent: "feedback",       patterns: [/\b(feedback|critique|criticise)\b/] },
  { intent: "verify_path",    patterns: [/\b(how (do i|to) verify|get verified|silver to gold|gold to expert|verification path|badge up)\b/] },
];

export function classifyIntent(text: string, last?: Intent): { intent: Intent; confidence: number } {
  const lower = text.toLowerCase().trim();
  if (!lower) return { intent: "fallback", confidence: 0 };
  const scores = new Map<Intent, number>();
  for (const r of RULES) {
    let hits = 0;
    for (const p of r.patterns) if (p.test(lower)) hits += 1;
    if (hits) scores.set(r.intent, (scores.get(r.intent) ?? 0) + hits * (r.weight ?? 1));
  }
  if (scores.size === 0) {
    // Affirmation chain — interpret based on last intent
    if (/^(yes|sure|ok|okay|do it|go|please|yep|yeah|absolutely)\b/.test(lower) && last) {
      const chain: Partial<Record<Intent, Intent>> = {
        skills_suggest: "roadmap",
        skill_info: "learn_now",
        jobs_find: "resume",
        interview: "behavioral",
        salary: "negotiate",
        roadmap: "learn_now",
      };
      const next = chain[last];
      if (next) return { intent: next, confidence: 0.7 };
    }
    return { intent: "fallback", confidence: 0 };
  }
  let best: Intent = "fallback";
  let max = 0;
  for (const [k, v] of scores) if (v > max) { best = k; max = v; }
  return { intent: best, confidence: Math.min(1, max / 2) };
}

/* ---------- Response composer ---------- */

export type RichBlock =
  | { kind: "usage" }
  | { kind: "growth" }
  | { kind: "radar" }
  | { kind: "skills"; items: { name: string; level: "silver" | "gold" | "expert"; reason: string }[] }
  | { kind: "skill_detail"; skill: SkillKB }
  | { kind: "roadmap"; weeks: { week: number; topic: string; hours: number }[]; title: string }
  | { kind: "jobs"; items: { role: string; company: string; pay: string; level: "silver" | "gold" | "expert"; matchPct: number }[] }
  | { kind: "people"; items: { name: string; role: string; level: "silver" | "gold" | "expert"; skill: string; matchPct: number; city: string }[] }
  | { kind: "salary"; role: string; city: string; p25: number; p50: number; p75: number }
  | { kind: "resume_tips"; tips: string[] }
  | { kind: "interview"; items: { category: string; q: string }[] }
  | { kind: "motivation" }
  | { kind: "verify"; steps: string[] };

export type IRAReply = {
  text: string;
  rich?: RichBlock;
  followups: string[];
  actions?: { label: string; kind: "open_learner" | "open_jobs" | "open_resume" | "open_hirer" | "start_test" | "learn_skill"; payload?: string }[];
};

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

function userFirstName() {
  const n = profileStore.get().name.split(" ")[0];
  return n;
}

export function compose(intent: Intent, text: string, ent: Entities): IRAReply {
  switch (intent) {
    case "greeting":
      return {
        text: `${pick(["Hey", "Hi", "Hello", "Yo"])} ${userFirstName()} ${pick(["👋", "🙂", "✨"])}. Great to see you. I've got your skill profile loaded — ${profileStore.get().skills.length} verified skills, last activity today. What's on your mind?`,
        followups: ["Analyze my strengths", "Suggest next skill", "Find me jobs", "I'm feeling stuck"],
      };
    case "thanks":
      return { text: "Anytime — I'm here 24/7, literally my entire job description.", followups: ["What should I do today?", "Plan my next 4 weeks", "Quiz me"] };
    case "identity":
      return {
        text: "I'm IRA — SkillSure's in-house assistant. I'm not GPT, not Gemini, not Claude. I'm a hand-built engine that runs entirely in your browser: I parse what you say, match it against my SkillSure knowledge base, remember context across turns, and reason over your verified skills + the live job market. No API key, no data leaving your device.",
        followups: ["What can you do?", "Analyze my strengths", "Suggest a skill"],
      };
    case "help":
      return {
        text: "I can do all this, in your own words:\n• Analyze your skills & growth\n• Suggest the next skill (with reasons + ROI)\n• Build a week-by-week roadmap\n• Find matching jobs & rank them\n• Find candidates if you're hiring\n• Benchmark salary + draft negotiation\n• Mock interviews (FE / SD / behavioral)\n• Review & rewrite your resume\n• Verification path (Silver → Gold → Expert)\nVoice input works too — hit the mic.",
        followups: ["Analyze my strengths", "Build a roadmap", "Find jobs", "Find candidates"],
      };
    case "smalltalk":
      return { text: pick(["Doing well — busy parsing intents and ranking jobs. You?", "All good. Ready to help you ship something today. What's up?", "Running smooth. What can we work on?"]), followups: ["Suggest something to do", "Show my progress", "Just chat"] };

    case "usage":
      return { text: "Your last 7 days. Best day: Thursday (3.0h). You're 18% above your 4-week average — that's solid consistency.", rich: { kind: "usage" }, followups: ["Why was Wednesday low?", "Set a daily goal", "Compare last month"] };
    case "growth":
      return { text: "Your XP curve is compounding — last month was +36% over the prior. The pace correlates with your Gold → Expert jump on React.", rich: { kind: "growth" }, followups: ["What's the next big jump?", "Suggest next skill", "Show my strengths"] };
    case "strengths":
      return {
        text: "Here's your skill matrix. Frontend and communication are your moats; system design and DevOps are the highest-leverage gaps. Closing system design alone unlocks +₹12L in your average band.",
        rich: { kind: "radar" },
        followups: ["Fix system design", "Show matching jobs", "Compare with peers"],
        actions: [{ label: "Start System Design path", kind: "learn_skill", payload: "System Design" }],
      };
    case "compare":
      return { text: "Against the median SkillSure user with 6 months on platform: you're top 12% on verifications, top 8% on streak, but below median on backend depth. The gap is fixable in ~6 weeks.", followups: ["Plan to close the gap", "Show backend roadmap", "Suggest next skill"] };

    case "skills_suggest": {
      const have = new Set(profileStore.get().skills.map((s) => s.name.toLowerCase()));
      const candidates = SKILLS_KB
        .filter((s) => !have.has(s.name.toLowerCase()))
        .sort((a, b) => b.jobROI - a.jobROI)
        .slice(0, 3);
      return {
        text: `Based on your verified ${pickHave()} foundation and 2026 hiring trends, these 3 have the highest ROI for you:`,
        rich: { kind: "skills", items: candidates.map((c) => ({ name: c.name, level: c.weeksToGold <= 4 ? "silver" : c.weeksToGold <= 6 ? "gold" : "expert", reason: c.why })) },
        followups: candidates.map((c) => `Build roadmap for ${c.name}`),
        actions: candidates.map((c) => ({ label: `Start ${c.name}`, kind: "learn_skill" as const, payload: c.name })),
      };
    }
    case "skill_info": {
      const s = ent.skill ?? SKILLS_KB[0];
      return {
        text: `${s.name} — ${s.why} Avg compensation impact: ₹${s.avgSalaryLpa}L. Pairs naturally with ${s.pairsWith.slice(0, 2).join(" and ")}. Time to Gold for you: ~${s.weeksToGold} weeks.`,
        rich: { kind: "skill_detail", skill: s },
        followups: [`Build ${s.name} roadmap`, `Show ${s.name} jobs`, `Start learning ${s.name}`],
        actions: [{ label: `Start ${s.name}`, kind: "learn_skill", payload: s.name }],
      };
    }
    case "learn_now": {
      const s = ent.skill ?? SKILLS_KB[0];
      return {
        text: `Loading the ${s.name} path. Week 1 unlocks now — about ${s.plan[0].hours}h. Hit a Silver test by Sunday and you're badged.`,
        actions: [{ label: `Open ${s.name} path`, kind: "learn_skill", payload: s.name }, { label: "Take Silver test", kind: "start_test" }],
        followups: [`Show ${s.name} roadmap`, "Plan around my schedule"],
      };
    }
    case "roadmap": {
      const s = ent.skill ?? SKILLS_KB.find((k) => k.name === "TypeScript")!;
      const weeks = ent.timeframeWeeks ? s.plan.slice(0, Math.min(ent.timeframeWeeks, s.plan.length)) : s.plan.slice(0, 4);
      return {
        text: `Here's a ${weeks.length}-week roadmap for ${s.name}. Each week ends with a verification test so your badge level rises automatically.`,
        rich: { kind: "roadmap", title: s.name, weeks },
        followups: ["Start week 1 now", "Make it more aggressive", "Add system design"],
        actions: [{ label: `Open ${s.name}`, kind: "learn_skill", payload: s.name }],
      };
    }

    case "jobs_find": {
      const matches = matchJobs(ent);
      return {
        text: `I found ${matches.length} verified-only jobs that match your profile. Ranked by skill overlap × pay band:`,
        rich: { kind: "jobs", items: matches },
        followups: ["Tailor my resume", "Practice interview", "Negotiate offer"],
        actions: [{ label: "Open Jobs", kind: "open_jobs" }, { label: "Open Resume", kind: "open_resume" }],
      };
    }
    case "people_find": {
      const items = matchPeople(text, ent);
      return {
        text: `Found ${items.length} matching profiles. Ranked by skill-tier + relevance:`,
        rich: { kind: "people", items },
        followups: ["Filter by Expert only", "Narrow to Bangalore", "Open Hirer board"],
        actions: [{ label: "Open Hirer Dashboard", kind: "open_hirer" }],
      };
    }
    case "company_info": {
      const co = (text.match(/razorpay|cred|zerodha|swiggy|zomato|flipkart|paytm|phonepe|infosys|tcs|google|amazon|microsoft/i) ?? ["Razorpay"])[0];
      return { text: `${co[0].toUpperCase() + co.slice(1).toLowerCase()} typically interviews in 3 rounds: DSA → System Design → Behavioral. Median offer for senior frontend is ₹38–48L. They favour verified candidates — your Gold React badge helps.`, followups: [`Find ${co} jobs`, "Practice their interview", "Tailor resume"] };
    }

    case "salary": {
      const role = ent.role?.title ?? "Sr React Engineer";
      const band = ent.role?.salary ?? [34, 54];
      const city = ent.city ?? "Bangalore";
      const p50 = Math.round((band[0] + band[1]) / 2);
      return {
        text: `For a ${role} (verified) in ${city} this quarter, the live band is ₹${band[0]}L–₹${band[1]}L. Your verified badges push you to the upper half.`,
        rich: { kind: "salary", role, city, p25: band[0], p50, p75: band[1] },
        followups: ["Draft a negotiation script", "Compare with Hyderabad", "What raises my band?"],
      };
    }
    case "negotiate":
      return {
        text: "Negotiation script (use verbatim):\n\n\"Thanks for the offer. Based on my verified Expert-level React and System Design certifications, and the market band of ₹38–48L for this role in Bangalore, I was hoping we could revisit base at ₹46L. I'm flexible on the equity/sign-on split.\"\n\nLand it with silence. Don't justify further.",
        followups: ["What if they say no?", "Counter on equity instead", "Practice live"],
      };

    case "interview":
      return {
        text: "Let's prep. Pick a round — I'll simulate it live.",
        rich: { kind: "interview", items: [
          { category: "Frontend", q: "Build a debounced search with cancellation." },
          { category: "System Design", q: "Design a notification fan-out service." },
          { category: "Behavioral", q: "Tell me about a project you shipped under deadline pressure." },
        ] },
        followups: ["Start frontend mock", "System design question", "Behavioral round"],
      };
    case "behavioral":
      return { text: "Behavioral starter (STAR format): \"Tell me about a time you disagreed with a teammate on a technical decision. What happened and what did you learn?\" Take 90s. I'll grade structure, specificity, and reflection.", followups: ["Give me another", "Score my answer", "Frontend question instead"] };
    case "system_design_q":
      return { text: "System design Q: Design a URL shortener that handles 100M writes/day and 10B reads/day. 30 minutes. Start with clarifying questions — what would you ask me first?", followups: ["Hints please", "Sketch the data model", "Give me a different SD question"] };

    case "resume":
    case "resume_review":
      return {
        text: "I scanned your resume against your top 3 target roles. Three quick wins lift your match score from 72 → 91:",
        rich: { kind: "resume_tips", tips: [
          "Lead each role with quantified impact (e.g. \"cut p95 LCP 38%\") — it goes above your responsibility list.",
          "Replace \"worked on\" with action verbs: shipped, owned, scaled, migrated.",
          "Surface your Gold React + Expert System Design badges in the header — recruiters filter on them.",
        ] },
        followups: ["Apply all fixes", "Rewrite my summary", "Open Resume Builder"],
        actions: [{ label: "Open Resume Builder", kind: "open_resume" }],
      };

    case "motivation":
      return {
        text: "Hey — slow weeks are part of the curve, not a break from it. You've shipped 14 verifications in 6 months. That's top 8% on SkillSure. Want me to set one small win for today — 15 minutes, no pressure?",
        rich: { kind: "motivation" },
        followups: ["Yes, give me a 15-min task", "Show my growth", "Just talk for a sec"],
      };
    case "feedback":
      return { text: "Tell me what's off — too pushy, too vague, wrong domain? I'll adapt right now.", followups: ["You're too pushy", "Be more concise", "Switch to Hindi"] };
    case "verify_path":
      return {
        text: "Verification path on SkillSure:\n• Silver — 30-min adaptive test, basic mastery.\n• Gold — proctored 90-min test + 1 portfolio review.\n• Expert — peer-reviewed capstone + live system-design defense.\nMost users go Silver → Gold in 3 weeks, Gold → Expert in 6–10 weeks.",
        rich: { kind: "verify", steps: ["Pick a skill in Learner mode", "Complete the path", "Book a verification slot", "Test → badge auto-issued"] },
        followups: ["Start a Silver test now", "Show my closest badge upgrade", "Open Learner"],
        actions: [{ label: "Start Silver test", kind: "start_test" }, { label: "Open Learner", kind: "open_learner" }],
      };

    default: {
      // Fallback: try to be useful using any extracted entity
      if (ent.skill) return compose("skill_info", text, ent);
      if (ent.role) return compose("jobs_find", text, ent);
      return {
        text: `I hear you — "${text.slice(0, 80)}". I can turn this into a learning plan, find related jobs, or just dig into it with you. Which way?`,
        followups: ["Turn into a roadmap", "Find related jobs", "Just dig deeper"],
      };
    }
  }
}

function pickHave() {
  const top = profileStore.get().skills.slice(0, 2).map((s) => s.name);
  return top.join(" + ");
}

/* ---------- Job + people matching (the AI ranker) ---------- */

const JOB_POOL = [
  { role: "Sr React Engineer",     company: "Razorpay",  pay: [38, 48] as [number, number], require: ["React", "TypeScript"],          level: "expert" as const, city: "Bangalore" },
  { role: "Frontend Lead",         company: "Cred",      pay: [52, 68], require: ["React", "TypeScript", "System Design"],            level: "expert", city: "Bangalore" },
  { role: "Full Stack Dev",        company: "Zerodha",   pay: [32, 42], require: ["React", "Node.js"],                                level: "gold",   city: "Bangalore" },
  { role: "Backend Engineer",      company: "Swiggy",    pay: [30, 42], require: ["Node.js", "SQL"],                                  level: "gold",   city: "Bangalore" },
  { role: "ML Engineer",           company: "Flipkart",  pay: [42, 58], require: ["Python", "Machine Learning"],                      level: "expert", city: "Bangalore" },
  { role: "SRE",                   company: "PhonePe",   pay: [38, 52], require: ["Kubernetes", "AWS"],                               level: "expert", city: "Bangalore" },
  { role: "Product Designer",      company: "Zomato",    pay: [22, 34], require: ["Figma"],                                           level: "gold",   city: "Gurgaon" },
  { role: "Data Scientist",        company: "Paytm",     pay: [28, 42], require: ["Python", "SQL"],                                   level: "gold",   city: "Noida" },
];

function matchJobs(ent: Entities) {
  const mine = new Map(profileStore.get().skills.map((s) => [s.name.toLowerCase(), s.level]));
  const scored = JOB_POOL.map((j) => {
    let score = 0;
    for (const r of j.require) {
      const have = mine.get(r.toLowerCase());
      if (have === "expert") score += 3;
      else if (have === "gold") score += 2;
      else if (have === "silver") score += 1;
    }
    if (ent.skill && j.require.includes(ent.skill.name)) score += 2;
    if (ent.city && j.city.toLowerCase() === ent.city.toLowerCase()) score += 1;
    if (ent.role && j.role === ent.role.title) score += 4;
    const matchPct = Math.min(100, 40 + score * 12);
    return { role: j.role, company: j.company, pay: `₹${j.pay[0]}–${j.pay[1]}L`, level: j.level, matchPct, score };
  }).sort((a, b) => b.score - a.score).slice(0, 3);
  return scored.map(({ score: _s, ...rest }) => rest);
}

/* People pool — used by both IRA people search and Hirer AI search */

export const PEOPLE_POOL: { name: string; role: string; level: "silver" | "gold" | "expert"; skills: string[]; city: string; school: string }[] = [
  { name: "Aryan Raj",     role: "Full Stack Engineer",    level: "expert", skills: ["React", "TypeScript", "Node.js", "System Design"], city: "Mumbai",    school: "IIT Bombay" },
  { name: "Neha Iyer",     role: "Data Scientist",         level: "gold",   skills: ["Python", "SQL", "Machine Learning"],               city: "Bangalore", school: "BITS Pilani" },
  { name: "Vikram Sharma", role: "Backend Engineer",       level: "expert", skills: ["Node.js", "SQL", "AWS", "System Design"],          city: "Hyderabad", school: "NIT Trichy" },
  { name: "Riya Das",      role: "Product Designer",       level: "gold",   skills: ["Figma", "Design Systems"],                         city: "Bangalore", school: "NID" },
  { name: "Karan Singh",   role: "SDE II",                 level: "expert", skills: ["System Design", "Java", "Kubernetes"],             city: "Bangalore", school: "IIT Delhi" },
  { name: "Saanvi Mehta",  role: "Frontend Engineer",      level: "gold",   skills: ["React", "TypeScript", "GraphQL"],                  city: "Pune",      school: "COEP" },
  { name: "Aditya Roy",    role: "ML Engineer",            level: "expert", skills: ["Python", "Machine Learning", "AWS"],               city: "Bangalore", school: "IIT Madras" },
  { name: "Priya Nair",    role: "DevOps Engineer",        level: "gold",   skills: ["Kubernetes", "AWS", "Terraform"],                  city: "Chennai",   school: "VIT" },
  { name: "Rohan Gupta",   role: "Mobile Engineer",        level: "gold",   skills: ["React Native", "TypeScript"],                      city: "Gurgaon",   school: "IIIT Hyderabad" },
  { name: "Ananya Iyer",   role: "Junior Frontend Dev",    level: "silver", skills: ["React", "HTML/CSS"],                               city: "Remote",    school: "VJTI" },
  { name: "Ishaan Verma",  role: "Senior Backend",         level: "expert", skills: ["Node.js", "PostgreSQL", "System Design", "GraphQL"], city: "Bangalore", school: "BITS Pilani" },
  { name: "Meera Krishnan",role: "Designer + Developer",   level: "gold",   skills: ["Figma", "React"],                                  city: "Mumbai",    school: "Srishti" },
];

function matchPeople(text: string, ent: Entities) {
  const t = text.toLowerCase();
  const wantedSkills = SKILLS_KB.filter((s) => t.includes(s.name.toLowerCase()) || s.aliases.some((a) => t.includes(a))).map((s) => s.name);
  const wantedLevel = ent.level;
  const wantedCity = ent.city?.toLowerCase();
  const scored = PEOPLE_POOL.map((p) => {
    let score = 0;
    for (const ws of wantedSkills) if (p.skills.some((s) => s.toLowerCase() === ws.toLowerCase())) score += 4;
    if (wantedLevel && p.level === wantedLevel) score += 3;
    if (wantedCity && p.city.toLowerCase() === wantedCity) score += 2;
    if (p.level === "expert") score += 1;
    return { p, score };
  }).filter((x) => x.score > 0).sort((a, b) => b.score - a.score).slice(0, 6);
  if (scored.length === 0) {
    return PEOPLE_POOL.slice(0, 4).map((p) => ({ name: p.name, role: p.role, level: p.level, skill: p.skills[0], matchPct: 60, city: p.city }));
  }
  const maxScore = scored[0].score;
  return scored.map(({ p, score }) => ({
    name: p.name, role: p.role, level: p.level,
    skill: wantedSkills[0] ?? p.skills[0],
    matchPct: Math.min(100, 50 + Math.round((score / maxScore) * 50)),
    city: p.city,
  }));
}

export function searchPeople(query: string) {
  const ent = extractEntities(query);
  return matchPeople(query, ent);
}

/* ---------- Public IRA reply API ---------- */

const memory: { last?: Intent } = {};

export function iraReply(text: string): IRAReply {
  const ent = extractEntities(text);
  const { intent } = classifyIntent(text, memory.last);
  memory.last = intent;
  return compose(intent, text, ent);
}

/* Used by Learner & store to keep skills synced when IRA recommends them */
export { profileStore as _profileStore };
export type { Skill };
