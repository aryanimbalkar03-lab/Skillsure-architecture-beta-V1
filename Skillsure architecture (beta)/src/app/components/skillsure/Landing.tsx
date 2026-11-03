import { Logo, GradientButton, GlassCard, StatCard, SectionHeader, IRAOrb, SkillBadge } from "./primitives";
import { Play, Download, ArrowRight, ShieldCheck, Sparkles, Briefcase, Users, FileBadge, Bot, Search, ListChecks, ArrowUpRight, Star } from "lucide-react";
import { motion } from "motion/react";
import { ScrollReveal, StaggerGroup, StaggerItem, Magnetic, Tilt3D, ParallaxLayer, MorphOrb, CountUp, MarqueeRow, SPRING } from "./motion";

export function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 ss-dot-grid opacity-40 pointer-events-none" />
      <div className="ss-aurora" />
      <MorphOrb size={620} color="rgba(37,99,235,0.35)"  style={{ top: -80,  left: -120 }} />
      <MorphOrb size={720} color="rgba(6,182,212,0.30)"  style={{ bottom: -140, right: -160, animationDelay: "-6s" }} />
      <MorphOrb size={340} color="rgba(167,139,250,0.28)" style={{ top: "38%", right: "8%", animationDelay: "-12s" }} />

      <header className="relative z-10 max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Logo size="md" />
        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          <a href="#features"  className="ss-underline hover:text-white">Features</a>
          <a href="#about"     className="ss-underline hover:text-white">About</a>
          <a href="#pricing"   className="ss-underline hover:text-white">Pricing</a>
        </nav>
        <GradientButton size="sm" magnetic icon={<Download className="h-4 w-4" />}>Download Now</GradientButton>
      </header>

      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
          transition={SPRING.hero}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...SPRING.hero, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full ss-glass text-xs uppercase tracking-[0.2em] text-cyan-300 mb-6"
          >
            <Sparkles className="h-3 w-3" /> India's #1 skill-verified network
          </motion.div>

          <motion.h1
            className="mb-5"
            style={{ fontSize: "clamp(40px, 7vw, 76px)", lineHeight: 1.05 }}
            initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
            transition={{ ...SPRING.hero, delay: 0.15 }}
          >
            Build Skills. Get <span className="ss-gradient-text">Verified.</span><br />Get Hired.
          </motion.h1>

          <motion.p
            className="text-slate-400 text-lg max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING.gentle, delay: 0.3 }}
          >
            India's first skill-verified professional network. Stop applying. Start proving.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING.gentle, delay: 0.42 }}
          >
            <GradientButton size="lg" magnetic onClick={onStart} icon={<ArrowRight className="h-4 w-4" />}>Get Started Free</GradientButton>
            <GradientButton size="lg" variant="ghost" magnetic icon={<Play className="h-4 w-4" />}>Watch Demo</GradientButton>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-20 relative"
          initial={{ opacity: 0, y: 60, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
          transition={{ ...SPRING.hero, delay: 0.4 }}
        >
          <div>
            <div>
              <div className="ss-glass rounded-3xl p-2 max-w-5xl mx-auto ss-glow-blue">
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0A0F1E]">
                  <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-3 text-xs text-slate-500">skillsure.app/profile/aryan</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 p-6">
                    <GlassCard className="col-span-2 p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-12 w-12 rounded-full ss-gradient-brand ring-2 ring-amber-400/60 flex items-center justify-center font-bold ss-float-slow">AR</div>
                        <div>
                          <div className="font-semibold">Aryan Raj <ShieldCheck className="inline h-4 w-4 text-blue-400" /></div>
                          <div className="text-xs text-slate-400">Full Stack Dev · Mumbai</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <SkillBadge name="React" level="expert" />
                        <SkillBadge name="Node.js" level="gold" />
                        <SkillBadge name="Python" level="silver" />
                        <SkillBadge name="System Design" level="gold" />
                      </div>
                    </GlassCard>
                    <GlassCard className="p-5 flex flex-col justify-between">
                      <div className="flex items-center gap-2 text-xs text-cyan-300"><IRAOrb size={20} pulse={false} /> IRA Tip</div>
                      <div className="text-sm">3 Gold-level React jobs match your verified profile.</div>
                      <button className="text-xs text-blue-400 inline-flex items-center gap-1 ss-underline w-fit">View jobs <ArrowUpRight className="h-3 w-3" /></button>
                    </GlassCard>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-14">
          <MarqueeRow duration={30} className="text-sm text-slate-500">
            <span className="mx-6">✦ <CountUp to={10000} suffix="+" /> Skills Verified</span>
            <span className="mx-6">✦ Trusted by <CountUp to={500} suffix="+" /> Hirers</span>
            <span className="mx-6">✦ India's #1 Skill Platform</span>
            <span className="mx-6">✦ AI-Personalized Learning</span>
            <span className="mx-6">✦ Anti-Spam Hiring</span>
          </MarqueeRow>
        </div>
      </section>

      {/* ============ MANIFESTO — MOVED UP AS OPENING STATEMENT ============ */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-28 text-center">
        <div className="ss-blob absolute inset-0 mx-auto pointer-events-none" style={{ width: 520, height: 520, top: "10%", left: "50%", transform: "translateX(-50%)", background: "radial-gradient(closest-side, rgba(37,99,235,0.22), transparent 70%)" }} />
        <ScrollReveal>
          <div className="text-[10px] uppercase tracking-[0.4em] text-cyan-300 mb-6">Manifesto</div>
          <p className="font-semibold tracking-tight leading-[1.02] mx-auto" style={{ fontSize: "clamp(44px, 8.5vw, 132px)", fontFamily: "var(--font-display)" }}>
            Stop <span className="line-through text-slate-500 decoration-rose-500/60 decoration-[3px]">applying</span>.<br />
            Start <span className="ss-gradient-text">proving</span>.
          </p>
          <p className="text-slate-400 text-base mt-8 max-w-xl mx-auto">A verified-first professional network. No fluff, no filler, no unverified inbox spam.</p>
        </ScrollReveal>
      </section>

      {/* ============ EDITORIAL PROBLEM WALL ============ */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-32">
        <ScrollReveal>
          <div className="text-xs uppercase tracking-[0.3em] text-cyan-300 mb-8">The Problem</div>
          <p className="font-semibold leading-[1.05] tracking-tight" style={{ fontSize: "clamp(32px, 5.5vw, 68px)", fontFamily: "var(--font-display)" }}>
            Every year, <span className="ss-gradient-text"><CountUp to={10000000} /></span> Indians graduate.<br />
            <CountUp to={30} suffix="%" className="ss-gradient-text" /> stay jobless within 6 months.<br />
            LinkedIn became a glorified <span className="italic text-slate-500">selfie feed</span>.
          </p>
          <p className="text-slate-400 text-lg mt-8 max-w-2xl">Hiring is broken because <em className="text-white not-italic">skill</em> is unprovable. We fix that.</p>
        </ScrollReveal>
      </section>

      {/* ============ SPLIT-SCREEN TWO MODES (unequal, offset) ============ */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <ScrollReveal>
          <SectionHeader eyebrow="Two Modes. One Platform." title={<>SOCIO meets <span className="ss-gradient-text">LEARNER</span></>} center />
        </ScrollReveal>
        <div className="grid md:grid-cols-12 gap-5">
          <ScrollReveal className="md:col-span-7 md:mt-0" y={40}>
            <GlassCard className="p-8 relative overflow-hidden h-full min-h-[380px]" hover>
              <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full ss-gradient-brand opacity-20 blur-3xl ss-float-slow" />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full ss-glass-strong text-[10px] uppercase tracking-[0.25em] text-blue-300 mb-6">01 · Socio</div>
              <h2 className="mb-3" style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}>The verified <span className="ss-gradient-text">feed</span>.</h2>
              <p className="text-slate-400 text-base mb-6 max-w-md">A professional network where every skill is proven, not claimed. Hiring posts filter out unverified noise before it reaches your inbox.</p>
              <div className="flex flex-wrap gap-2">
                <SkillBadge name="Verified badges" level="expert" withIcon={false} />
                <SkillBadge name="Anti-spam hiring" level="gold" withIcon={false} />
                <SkillBadge name="Draft lists" level="silver" withIcon={false} />
                <SkillBadge name="Creator economy" level="gold" withIcon={false} />
              </div>
            </GlassCard>
          </ScrollReveal>
          <ScrollReveal className="md:col-span-5 md:mt-16" y={60} delay={0.15}>
            <GlassCard className="p-8 relative overflow-hidden h-full min-h-[380px]" hover>
              <div className="absolute -left-12 -top-12 w-56 h-56 rounded-full bg-cyan-400 opacity-20 blur-3xl ss-float" />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full ss-glass-strong text-[10px] uppercase tracking-[0.25em] text-cyan-300 mb-6">02 · Learner</div>
              <h2 className="mb-3" style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}>Silver → Gold → <span className="ss-gradient-text">Expert</span>.</h2>
              <p className="text-slate-400 text-base mb-6">AI-personalized paths, proctored exams, real badges. No participation trophies.</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div className="h-full ss-gradient-brand" initial={{ width: 0 }} whileInView={{ width: "72%" }} viewport={{ once: true }} transition={{ duration: 1.6, ease: [0.2, 0.8, 0.2, 1] }} />
                </div>
                <div className="text-xs text-cyan-300 font-mono">72% · Gold</div>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ SYMMETRIC ALTERNATING TIMELINE ============ */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-28">
        <ScrollReveal>
          <SectionHeader eyebrow="Your Journey" title={<>Three steps. <span className="ss-gradient-text">One verified career.</span></>} center />
        </ScrollReveal>
        <div className="relative mt-16">
          {/* central rail with animated gradient */}
          <motion.div
            aria-hidden
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ transformOrigin: "top", background: "linear-gradient(180deg, transparent 0%, rgba(96,165,250,0.55) 20%, rgba(34,211,238,0.55) 50%, rgba(167,139,250,0.55) 80%, transparent 100%)" }}
          />
          {[
            { n: "01", t: "Register",       d: "Create your @id. IRA parses your goals and drafts a personalized path in seconds — no forms to fill.", side: "left"  as const },
            { n: "02", t: "Learn & Verify", d: "Climb Silver → Gold → Expert. Every badge is earned through AI-proctored exams and peer-reviewed capstones.", side: "right" as const },
            { n: "03", t: "Get Hired",      d: "Apply only to roles you're verified for. Recruiters see the badge, not another CV. Interview in days.", side: "left"  as const },
          ].map((s, i) => (
            <div key={s.n} className="relative grid md:grid-cols-2 gap-8 mb-14 last:mb-0 items-center">
              {/* node on rail */}
              <motion.div
                aria-hidden
                className="hidden md:flex absolute left-1/2 -translate-x-1/2 h-12 w-12 rounded-full ss-glass-strong items-center justify-center z-20 ss-glow-blue"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ delay: 0.2 + i * 0.15, ...SPRING.bouncy }}
              >
                <span className="text-xs font-mono ss-gradient-text font-bold">{s.n}</span>
              </motion.div>
              {/* card — alternates side */}
              <ScrollReveal y={30} delay={i * 0.12} className={s.side === "right" ? "md:col-start-2" : "md:col-start-1"}>
                <GlassCard className={`p-7 relative ${s.side === "right" ? "md:text-left" : "md:text-right"}`} hover>
                  <div className={`text-[10px] uppercase tracking-[0.35em] text-cyan-300 font-mono mb-2`}>Step {s.n}</div>
                  <h3 className="mb-2" style={{ fontSize: "clamp(20px, 2.4vw, 28px)" }}>{s.t}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.d}</p>
                </GlassCard>
              </ScrollReveal>
              {/* mirror slot (kept for symmetry, empty) */}
              <div className={`hidden md:block ${s.side === "right" ? "md:col-start-1 md:row-start-1" : "md:col-start-2 md:row-start-1"}`} />
            </div>
          ))}
        </div>
      </section>

      {/* ============ SYMMETRIC CONSTELLATION — IRA CENTER, MIRRORED FEATURES ============ */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <ScrollReveal>
          <SectionHeader eyebrow="What's Inside" title={<>Everything you need. <span className="ss-gradient-text">Nothing you don't.</span></>} center />
        </ScrollReveal>

        <div className="relative grid md:grid-cols-[1fr_1.35fr_1fr] gap-5 items-stretch">
          {/* radial glow behind IRA */}
          <div aria-hidden className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full pointer-events-none"
               style={{ background: "radial-gradient(closest-side, rgba(37,99,235,0.20), transparent 70%)", filter: "blur(30px)" }} />

          {/* LEFT column — 3 features */}
          <div className="flex flex-col gap-5">
            {[
              { i: ShieldCheck, t: "3-Tier Verification", d: "Silver → Gold → Expert. AI-proctored, peer-reviewed." },
              { i: FileBadge,   t: "Resume Builder",      d: "Verified skills auto-paste. Four templates. Print-to-PDF." },
              { i: Briefcase,   t: "Anti-Spam Hiring",    d: "Only verified candidates apply. Zero inbox noise." },
            ].map((f, idx) => {
              const Icon = f.i;
              return (
                <ScrollReveal key={f.t} y={30} delay={idx * 0.08} className="h-full">
                  <GlassCard className="p-5 h-full text-right" hover tilt popBadge="✓ Verified">
                    <Icon className="h-6 w-6 text-blue-400 mb-2 ml-auto" />
                    <h4 className="mb-1">{f.t}</h4>
                    <p className="text-xs text-slate-400">{f.d}</p>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>

          {/* CENTER column — IRA hero */}
          <ScrollReveal y={40} delay={0.15} className="h-full">
            <GlassCard className="p-8 h-full relative overflow-hidden flex flex-col justify-between items-center text-center" hover popBadge="✨ Signature">
              <div className="absolute inset-0 ss-dot-grid opacity-30" />
              <div className="ss-blob absolute top-10 left-1/2 -translate-x-1/2" style={{ width: 240, height: 240, background: "radial-gradient(closest-side, rgba(6,182,212,0.55), transparent 70%)" }} />
              <div className="relative flex flex-col items-center pt-6">
                <IRAOrb size={80} />
                <div className="mt-6 text-[10px] uppercase tracking-[0.35em] text-cyan-300 mb-3">Signature feature</div>
                <h3 className="mb-3" style={{ fontSize: "clamp(26px, 3.2vw, 38px)" }}>Meet <span className="ss-gradient-text">IRA</span>.</h3>
                <p className="text-slate-400 max-w-sm text-sm">Your in-house AI career coach. Voice-enabled, context-aware, runs entirely on your device. No API keys. No cloud calls.</p>
              </div>
              <div className="relative flex flex-wrap gap-2 mt-6 justify-center">
                {["Suggest skills", "Find jobs", "Plan 4 weeks"].map((c) => (
                  <span key={c} className="ss-glass-strong rounded-full px-3 py-1.5 text-[11px]">✨ {c}</span>
                ))}
              </div>
            </GlassCard>
          </ScrollReveal>

          {/* RIGHT column — 3 features (mirror of left) */}
          <div className="flex flex-col gap-5">
            {[
              { i: Bot,        t: "Voice + Chat",        d: "Talk to IRA or type. Rich cards, clickable skill paths." },
              { i: Search,     t: "AI Talent Search",    d: "Describe who you need. IRA ranks verified profiles." },
              { i: ListChecks, t: "Practice Engine",     d: "Infinite questions, instant grading, tier-locked." },
            ].map((f, idx) => {
              const Icon = f.i;
              return (
                <ScrollReveal key={f.t} y={30} delay={idx * 0.08} className="h-full">
                  <GlassCard className="p-5 h-full text-left" hover tilt popBadge="✓ Verified">
                    <Icon className="h-6 w-6 text-cyan-400 mb-2" />
                    <h4 className="mb-1">{f.t}</h4>
                    <p className="text-xs text-slate-400">{f.d}</p>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ LIVE IRA CONVERSATION DEMO ============ */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <ScrollReveal>
            <div className="text-xs uppercase tracking-[0.3em] text-cyan-300 mb-4">Live conversation</div>
            <h2 className="mb-4" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>Talk to <span className="ss-gradient-text">IRA</span>.<br />She talks back.</h2>
            <p className="text-slate-400 mb-6">Ask in plain English. Get ranked jobs, clickable skill paths, mock interviews, or a 15-minute win when you're stuck. Voice input works too — hit the mic.</p>
            <div className="flex flex-wrap gap-2">
              {["Suggest my next skill", "Find React engineers in Bangalore", "Practice a system design round"].map((q) => (
                <span key={q} className="ss-glass rounded-full px-3 py-1.5 text-xs text-slate-300">{q}</span>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal y={40} delay={0.15}>
            <GlassCard className="p-5 relative overflow-hidden" hover>
              <div className="space-y-3">
                {[
                  { me: false, t: "Hey Aryan 👋 I've been tracking your XP — you're up 36% this month. Want a recap or something new?" },
                  { me: true,  t: "Suggest my next skill" },
                  { me: false, t: "Based on your React + TS foundation, TypeScript Gold unlocks 18 new jobs. Time to Gold: ~4 weeks." },
                  { me: true,  t: "Build me a roadmap" },
                ].map((m, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.35, ...SPRING.gentle }}
                    className={`flex gap-2 ${m.me ? "justify-end" : ""}`}
                  >
                    {!m.me && <IRAOrb size={24} pulse={false} />}
                    <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm ${m.me ? "ss-gradient-brand text-white" : "ss-glass-strong"}`}>{m.t}</div>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 2, duration: 0.4 }}
                  className="flex gap-2"
                >
                  <IRAOrb size={24} pulse={false} />
                  <div className="ss-glass-strong rounded-2xl px-4 py-3 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-bounce" />
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-bounce" style={{ animationDelay: "120ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-bounce" style={{ animationDelay: "240ms" }} />
                  </div>
                </motion.div>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ MARQUEE TESTIMONIALS ============ */}
      <section className="relative z-10 py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <ScrollReveal>
            <div className="text-xs uppercase tracking-[0.3em] text-cyan-300 mb-4 text-center">Loved by builders & hirers</div>
            <h2 className="text-center" style={{ fontSize: "clamp(28px, 4vw, 46px)" }}>The proof is in the <span className="ss-gradient-text">badges</span>.</h2>
          </ScrollReveal>
        </div>
        <MarqueeRow duration={44} className="py-2">
          {[
            { n: "Priya Sharma", r: "SDE @ Razorpay",     q: "Got my first job through SkillSure. Verified Gold in DSA, hired in 4 days." },
            { n: "Rahul Mehta",  r: "Hirer @ Infosys",    q: "My recruiter inbox is finally signal, not spam. Draft lists are a game-changer." },
            { n: "Aanya Kapoor", r: "Designer",           q: "IRA's roadmap took me from Silver to Expert in 3 months. Surreal." },
            { n: "Vikram Rao",   r: "Founder @ Pixelhive", q: "Posted a role, got 12 verified applicants in an hour. Zero noise." },
            { n: "Neha Iyer",    r: "Data Analyst",       q: "The proctored exam is brutal but the badge means something. Recruiters actually reply now." },
          ].map((t) => (
            <div key={t.n} className="w-[360px] shrink-0 mx-3">
              <GlassCard className="p-5 h-full" hover>
                <div className="flex gap-1 text-amber-400 mb-2">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}</div>
                <p className="text-sm text-slate-300 mb-3 whitespace-normal">"{t.q}"</p>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full ss-gradient-brand flex items-center justify-center text-xs font-bold text-white">{t.n.split(" ").map((x) => x[0]).join("")}</div>
                  <div>
                    <div className="text-xs font-semibold">{t.n}</div>
                    <div className="text-[10px] text-slate-500">{t.r}</div>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </MarqueeRow>
      </section>


      <section id="pricing" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <ScrollReveal>
          <GlassCard className="p-12 text-center ss-glow-blue">
            <h2 className="mb-3" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>Join SkillSure Today</h2>
            <p className="text-slate-400 mb-6 max-w-xl mx-auto">Stop applying. Start proving. Build a portfolio of verified skills employers actually trust.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <GradientButton size="lg" magnetic onClick={onStart}>Sign Up Free</GradientButton>
              <GradientButton size="lg" magnetic variant="ghost" icon={<Download className="h-4 w-4" />}>Download App</GradientButton>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-10 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-500">
        <Logo size="sm" />
        <div className="flex gap-6"><a href="#" className="ss-underline">Privacy</a><a href="#" className="ss-underline">Terms</a><a href="#" className="ss-underline">Contact</a></div>
        <div>© 2026 SkillSure</div>
      </footer>
    </div>
  );
}
