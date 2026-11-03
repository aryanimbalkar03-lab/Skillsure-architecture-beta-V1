import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { Sidebar, Screen } from "./components/skillsure/Sidebar";
import { Landing } from "./components/skillsure/Landing";
import { Onboarding } from "./components/skillsure/Onboarding";
import { Feed } from "./components/skillsure/Feed";
import { Profile } from "./components/skillsure/Profile";
import { Jobs } from "./components/skillsure/Jobs";
import { Hirer } from "./components/skillsure/Hirer";
import { LearnerDashboard, SkillDetail } from "./components/skillsure/Learner";
import { TestZone, PracticeZone } from "./components/skillsure/TestPractice";
import { IRAChat } from "./components/skillsure/IRAChat";
import { Messages, Settings, NotificationDrawer } from "./components/skillsure/Misc";
import { ResumeBuilder as Resume } from "./components/skillsure/ResumeBuilder";
import { Guide } from "./components/skillsure/Guide";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [mode, setMode] = useState<"socio" | "learner">("socio");
  const [showTest, setShowTest] = useState(false);
  const [notif, setNotif] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
  }, [theme]);

  const ThemeToggle = (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="fixed top-6 right-44 z-30 ss-glass-strong rounded-full p-2.5 hover:scale-105 transition"
    >
      {theme === "dark" ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-blue-500" />}
    </button>
  );

  if (screen === "landing") return <>{ThemeToggle}<Landing onStart={() => setScreen("onboarding")} /></>;
  if (screen === "onboarding") return <>{ThemeToggle}<Onboarding onDone={() => setScreen("feed")} /></>;

  function nav(s: Screen) {
    if (s === "test") { setShowTest(true); return; }
    if (s === "learner" || s === "skill" || s === "practice") setMode("learner");
    else if (["feed", "profile", "jobs", "hirer", "messages", "settings", "resume", "guide"].includes(s)) setMode("socio");
    setScreen(s);
  }

  function modeSwitch() {
    if (mode === "socio") { setMode("learner"); setScreen("learner"); }
    else { setMode("socio"); setScreen("feed"); }
  }

  if (screen === "ira") {
    return (
      <div className="flex min-h-screen">
        {ThemeToggle}
        <Sidebar active={screen} mode={mode} onNavigate={nav} onModeSwitch={modeSwitch} />
        <main className="flex-1 min-w-0">
          <IRAChat onAction={(target) => {
            if (target === "test") { setShowTest(true); return; }
            if (target === "learner") nav("learner");
            else if (target === "jobs") nav("jobs");
            else if (target === "resume") nav("resume");
            else if (target === "hirer") nav("hirer");
          }} />
        </main>
        {showTest && <TestZone onExit={() => setShowTest(false)} />}
      </div>
    );
  }
  if (screen === "messages") {
    return (
      <div className="flex min-h-screen">
        {ThemeToggle}
        <Sidebar active={screen} mode={mode} onNavigate={nav} onModeSwitch={modeSwitch} />
        <main className="flex-1 min-w-0"><Messages /></main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {ThemeToggle}
      <Sidebar active={screen} mode={mode} onNavigate={nav} onModeSwitch={modeSwitch} />
      <main className="flex-1 min-w-0 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen + mode}
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ type: "spring", stiffness: 90, damping: 18, mass: 1.1 }}
          >
            {mode === "learner" && screen === "learner" && <LearnerDashboard onNav={nav} />}
            {mode === "learner" && screen === "skill" && <SkillDetail onTest={() => setShowTest(true)} />}
            {mode === "learner" && screen === "practice" && <PracticeZone />}
            {mode === "socio" && screen === "feed" && <Feed onJobs={() => setScreen("jobs")} />}
            {mode === "socio" && screen === "profile" && <Profile />}
            {mode === "socio" && screen === "jobs" && <Jobs />}
            {mode === "socio" && screen === "hirer" && <Hirer />}
            {mode === "socio" && screen === "settings" && <Settings />}
            {mode === "socio" && screen === "resume" && <Resume />}
            {screen === "guide" && <Guide onNav={nav} />}
          </motion.div>
        </AnimatePresence>

        <button onClick={() => setNotif(true)} className="fixed top-6 right-6 z-30 ss-glass-strong rounded-full px-3 py-2 text-xs hover:bg-white/10">
          🔔 Notifications
        </button>
      </main>
      <NotificationDrawer open={notif} onClose={() => setNotif(false)} />
      {showTest && <TestZone onExit={() => setShowTest(false)} />}
    </div>
  );
}
