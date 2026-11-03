SKILLSURE — COMPLETE AI DESIGN PROMPT
Paste this entire prompt into Figma AI / Galileo / v0 / Relume or any AI UI builder

🧠 PRODUCT OVERVIEW
Design a complete, production-ready desktop + mobile hybrid application called SKILLSURE — a next-generation socio-learning platform that merges the best of LinkedIn, GPT, Figma, Canva, and Claude into one unified product. This is NOT a basic app. The UI must be extraordinarily modern, premium, and memorable — inspired by the design language of Figma, Notion, Linear, and Vercel — but with its own bold identity.
Core Concept: SKILLSURE is a dual-mode platform:

SOCIO MODE — A verified professional networking space (LinkedIn, but fixed and smarter)
LEARNER MODE — A strict, AI-personalized skill development and certification engine

Three Pillars: Build → Learn → Opportunity

🎨 VISUAL IDENTITY & DESIGN SYSTEM
Theme

Color Palette: Deep navy (#0A0F1E) as primary background. Electric blue (#2563EB) as brand accent. Cyan-teal (#06B6D4) as secondary accent. White (#F8FAFC) for text. Subtle gradient overlays: deep navy → indigo (#1E1B4B). Gold (#F59E0B) used ONLY for "Gold" skill badges. Silver (#94A3B8) for "Silver" badges. Verified blue (#3B82F6) for "Expert / Blue Tick" badges.
DO NOT use plain white backgrounds. Every screen should feel premium and dimensional.
Glassmorphism panels: frosted glass cards with backdrop-filter: blur(20px), semi-transparent borders, and subtle inner glows.
Micro-gradients on all interactive elements — buttons, cards, badges.

Typography

Display / Headings: "Clash Display" or "Cabinet Grotesk" — bold, geometric, modern
Body: "Satoshi" or "General Sans" — clean, readable
Code / Monospace blocks: "JetBrains Mono"
Font scale: tight line-heights, large hero text (56–72px headings), 15–16px body

Motion & Interaction

Smooth page transitions (fade + slight upward slide, 300ms)
Hover states on cards: subtle lift (translateY -4px) + glow border
Skeleton loaders on all data-heavy screens
Animated skill badge reveals (scale + shimmer on load)
Progress bars animate on enter
Tab switches: sliding underline indicator
All modals: spring-animated entry

Layout

12-column grid system
Left sidebar navigation (icon + label, collapsible)
Consistent 24px padding inside cards
Cards use border-radius: 16px; modals use border-radius: 24px
Use generous whitespace — content should breathe


📱 SCREENS TO DESIGN — FULL LIST

1. LANDING / MARKETING PAGE (Pre-login)
Layout: Full-screen hero with animated particle/dot grid background in navy-blue.
Above the fold:

Top nav: Logo (SKILLSURE wordmark, S-bolt icon) | Features | About | Pricing | [Download Now] button (gradient CTA, pill-shaped)
Hero headline (large, bold): "Build Skills. Get Verified. Get Hired." — with a subtle animated gradient on "Verified"
Sub-headline: "India's first skill-verified professional network. Stop applying. Start proving."
Two CTAs side by side: [Get Started Free] (primary, blue gradient) | [Watch Demo] (ghost button with play icon)
Hero visual: 3D-style mockup of the app (phone + desktop), floating with soft drop shadow and glow
Tagline strip below hero: rotating marquee showing — "10,000+ Skills Verified" | "Trusted by 500+ Hirers" | "India's #1 Skill Platform"

Sections below fold:

Problem Section: 3 stat cards with large numbers — "1 Cr+ students graduate yearly" / "30% unemployed" / "LinkedIn = glorified Instagram" — dark cards with red/amber accent text
Solution Section: Two-column layout — SOCIO MODE vs LEARNER MODE visual comparison with icons
How It Works: 3-step horizontal flow — Register → Learn & Get Verified → Get Hired — connected by animated dashed line
Features Highlight Grid: 6 cards in 2x3 grid — Skill Verification, AI Personalization (IRA), Draft List for Hirers, Anti-Spam Applications, Practice Engine, Resume Builder
Testimonials / Social Proof strip
Download / CTA Banner: Full-width gradient banner — "Join SkillSure Today" with Download Now + Sign Up buttons
Footer: Logo, links, social icons, copyright


2. ONBOARDING / SIGN UP FLOW
Screen 2A — Create Account

Centered card on dark background with subtle gradient blur behind it
Fields: Full Name | Unique User ID (primary key — show availability checker inline with green tick / red X) | Email | Phone | Country (dropdown with flags) | Password
"User ID" field has a tooltip: "This is your permanent unique identity on SkillSure — choose wisely"
Progress indicator at top: Step 1 of 3
[Continue] CTA button

Screen 2B — IRA Personalization (AI Onboarding)

Full-screen onboarding chat-style UI with IRA (the AI chatbot)
IRA avatar: animated, glowing orb with "IRA" label
IRA asks questions in conversation bubbles (like Claude's onboarding):

"Welcome! Are you a Student or a Working Professional?"
[Student] or [Working Professional] — large toggle-style buttons
If Student: College Name → Stream (Science / Commerce / Arts) → Year (1st–4th) → Target Domain
If Professional: Company → Role → Years of Experience → Target Skill Domain


Each answer auto-populates user profile in background (show live profile preview card on right side of screen updating in real time as they answer)
Progress bar at top

Screen 2C — App Tour

IRA guides user through a brief 4-step animated tour of the app
Modal-style overlay highlighting each main feature with spotlight effect
Skip button always visible


3. MAIN HOME FEED — SOCIO MODE
Layout: Left sidebar (navigation) + Center feed + Right panel
Left Sidebar:

User avatar + name + unique ID + skill level badges (Silver/Gold/Expert)
Navigation items with icons: Home | Explore | My Skills | Jobs | Messages | IRA Chat | Learner Mode | Settings
"Switch to Learner Mode" toggle button at bottom — pill-shaped, glowing blue when active
Collapse arrow

Center Feed:

Top bar: Search (global) + Notification bell (with badge) + Profile avatar
Feed filter tabs: All | Hiring Posts | Skill Updates | Community
Post cards (glassmorphism style):

User avatar + name + verified skill badge(s) + timestamp
Post content (text / image / video)
Like, Comment, Share, Bookmark actions
If it's a HIRING POST: distinct styling — blue left border + "🔵 Immediate Hire" or "🗓 Scheduled Hire" label + [Apply Now] CTA button
Hiring posts show: Role | Required Verified Skill | Company | Type (Immediate / Scheduled)
Application button is DISABLED if user is not verified for that skill (with tooltip: "Get verified in [skill] to apply")



Right Panel:

"People You May Know" — 3 profile cards with [Connect] button
"Trending Skills" — ranked list with skill name + number of verified users
"Active Job Posts" — 3 mini job cards
"IRA Suggestion" — small card with AI tip of the day based on user profile


4. USER PROFILE PAGE
This is the most important page. Design it to be extraordinary.
Layout: Full-width hero banner (customizable gradient or image) + profile info below
Profile Header:

Large circular avatar with glowing ring (color = highest skill level achieved)
Name (large, bold) | Unique @UserID | Headline / Bio
Location | College or Company | Connection count
Action buttons: [Connect] | [Message] | [Share Profile] | [Download Resume]

Skill Verification Boxes — THE SIGNATURE FEATURE:
Three premium badge containers displayed prominently below the bio:

🥈 SILVER BOX (slate/silver gradient card): Lists all Silver-level verified skills as pill badges
🥇 GOLD BOX (amber/gold gradient card): Lists all Gold-level verified skills
✅ EXPERT BOX (blue gradient card with animated shimmer): Lists all Expert/Blue-tick verified skills — each with a verified checkmark

On hover of any skill badge → popover card appears showing:

Skill name + level icon
5-line AI-generated summary: "Aryan has demonstrated Gold-level proficiency in Full Stack Development. He can build, deploy, and maintain scalable web applications using React, Node.js, and cloud platforms."
Date verified | Score percentile | [View Certificate] button

Sections below:

Experience (LinkedIn-style cards)
Education
Resume (embedded preview with [Download] button)
Activity Feed (recent posts, skill updates)
Certifications from SkillSure


5. JOBS / HIRING SECTION
Layout: Two-column — filters on left, job cards on right
Filter Panel (left):

Skill filter (only shows skills user is verified for — auto-filtered)
Job type: Immediate | Scheduled
Location | Remote/Hybrid/On-site
Experience level

Job Cards (right):

Company logo + name | Role title | Required Skill + Verification Level needed
Posted time | Applications: [count] or "Closed"
Status indicator: 🟢 Immediate | 🔵 Scheduled (with countdown: "Opens in 4 days")
[Apply Now] button — glowing green; grayed out if user not verified

Hirer Draft List (Hirer View):

Separate tab: "My Candidate Pipeline"
Kanban-style board: Saved | Shortlisted | To Contact | Hired
Each card = candidate profile mini-card with skill badges
Drag-to-reorder between columns


6. LEARNER MODE — HOME DASHBOARD
Design this as a completely different visual environment from Socio Mode.
Use a slightly lighter, more focused dark theme — deep charcoal (#111827) with electric blue accents. When user switches to Learner Mode, animate the screen transition as a "mode switch" (brief full-screen flash + new layout slides in).
Layout: Top header + 3-column dashboard grid
Top Header:

"LEARNER MODE" label with glowing badge
Current active skills being learned + progress rings
Streak counter: 🔥 12-day streak
[Switch Back to Socio Mode] button

Dashboard Cards:

My Learning Path — IRA-generated personalized roadmap shown as a vertical timeline with nodes (completed = filled blue, current = pulsing, upcoming = ghost)
Practice Zone — CTA card to enter practice mode
Mock Test Zone — CTA to enter mock exam
Upcoming Test — Countdown timer card
AI Skill Suggestions — IRA card: "Based on your EXTC background + current AI trends, we recommend: Python for AI/ML (Gold Level)"
Skill Categories: Science & Tech → Engineering / CS / Data / AI | Commerce → Finance / Accounting / Marketing | Communication → Public Speaking / Writing


7. LEARNER MODE — SKILL SELECTION & LEVELS
Skill Category Tree Screen:

Visual node map / tree diagram of all skill categories
Click to expand sub-categories
Each skill shows: how many users verified | avg time to Gold | your current level

Skill Detail Page:

Skill banner (gradient, skill icon, name)
Three level cards side by side:

🥈 Silver — "Fundamentals" — Topic list — Estimated 2 weeks — [Start Learning]
🥇 Gold — "Intermediate" — Topic list — Estimated 4 weeks — [Locked until Silver]
✅ Expert — "Advanced + Real Projects" — [Locked until Gold]


IRA Study Plan: AI-generated week-by-week plan in an accordion
[Enroll & Start] button


8. TEST ZONE — FULL SCREEN EXAM MODE
This screen must feel like a national examination portal — strict, clean, intimidating.
On entering Test Zone:

Full-screen takeover animation (screen dims, modal expands to 100%)
Warning modal before start: "This test uses AI proctoring. Camera + screen sharing will be activated. Minimize = test cancelled. You have been warned." → [I Understand. Begin Test]

Test Interface (full screen, no sidebar):

Top bar: Skill Name + Level | Question X of Y | Timer (large, countdown, red when < 5 min) | Camera preview (small circle, top right, glowing green = active)
Question area (large, centered, clean)
For MCQ: 4 option cards (click to select, highlighted on selection)
For communication/audio skills: mic visualizer + record button
No copy-paste. Right-click disabled.
AI Eye-tracking warning banner: if triggered → yellow warning "⚠️ Warning 1 of 2: Eyes detected off screen"
If Warning 2 triggered → 2 hard questions auto-added, notification animates in
If test violated → full screen red overlay → "Test Terminated. Retry available in 30 days."

Post-Test Result Screen:

Score revealed with animated counter
Skill badge awarded (Silver / Gold / Expert) with confetti animation
AI Summary from IRA: "You scored in the 82nd percentile. Your profile has been updated."
[View Badge] | [Share on SkillSure Feed] | [Go to Profile]


9. PRACTICE ZONE

Clean split screen: question on left, scratchpad / answer area on right
Difficulty selector: Easy / Medium / Hard
Infinite question mode — "Next Question" button
AI hint button (IRA): "Need a hint? IRA can guide you" → collapsible hint panel
Progress tracker: accuracy %, questions solved today, streak
When AI detects strong performance → nudge card: "You're consistently scoring 85%+. Ready to take the Gold test?" with [Go to Test Zone] CTA


10. IRA — AI CHATBOT
IRA is the heart of the app. Design her interface as world-class.
Full-screen chat interface:

Left panel: Chat history list (past conversations grouped by date)
Center: Chat window

IRA avatar: animated glowing orb, shifting blue-cyan gradient
Messages: IRA = left-aligned dark glass bubble | User = right-aligned blue bubble
IRA can render: text | bullet points | graphs/charts (bar, line, pie inline in chat) | skill progress cards | job recommendation cards


Input bar: text field + mic icon (voice input) + send button
Quick action chips above input: "Show my app usage" | "Suggest skills for me" | "Explain my progress" | "What jobs can I apply to?"

Example IRA outputs (design these as rich message types):

When asked for usage stats → renders an inline mini bar chart card
When asked for skill suggestions → renders a 3-card carousel of recommended skills
When asked to explain a concept → renders a clean explanation card with examples
Personality: Warm, direct, intelligent — like a personal career coach


11. MESSAGES / DM

Left panel: conversation list with avatar, name, last message preview, timestamp
Anti-spam badge: conversations filtered by — Verified Connections | Hirers | Others
Chat window: standard modern message UI with delivery receipts
If non-verified user messages a professional → message is flagged and held in a "Filtered" tab with note: "This user is not verified for the skill relevant to your role"


12. SETTINGS PAGE

Profile settings: avatar upload, banner, bio, links
Privacy: Who can message me | Who can view my skills | Notification preferences
"Want a Job" toggle — when ON, user receives immediate hiring notifications for their verified skills
Account: Change password, linked email/phone, delete account
Subscription: Current plan | Upgrade CTA card (Free / Pro / Elite tiers shown as 3 column comparison)


13. HIRER DASHBOARD (Hirer Lens)

Post a Job modal: Role title | Skill required | Level required (Silver/Gold/Expert) | Immediate or Scheduled | Date (if scheduled) | Description
Active listings overview with applicant count
Applicant pool: filterable grid of only skill-verified candidates
Draft list (Kanban board as described in Jobs section)
Analytics: Views | Applications | Hire rate


14. RESUME BUILDER

Clean editor on left, live preview on right
Sections: Personal Info | Education | Experience | Projects | Skills (auto-pulled from verified SkillSure badges — shown with badge icons) | Certifications
Template selector: 3 minimal, modern templates
Export as PDF button
Auto-populated fields from profile


🔔 NOTIFICATION SYSTEM

Bell icon with badge count
Notification drawer (slides in from right):

🔵 "New immediate hiring post matches your React Gold certification"
✅ "Congratulations! You've been verified at Gold level for Data Analysis"
👤 "Arjun Mehta (Hirer at Infosys) saved your profile to their draft list"
📚 "IRA suggests: You're 3 lessons away from completing your Python Gold path"




📐 COMPONENT LIBRARY TO BUILD
Design all the following reusable components:

Primary Button — gradient blue, pill shape, hover glow
Ghost Button — transparent, white border, hover fill
Skill Badge (Silver) — silver gradient pill
Skill Badge (Gold) — gold shimmer pill
Skill Badge (Expert) — blue verified pill with checkmark icon
Profile Mini Card — avatar + name + top skill badge + connect button
Job Post Card — company + role + skill required + apply button
Notification Card — icon + message + timestamp + action button
IRA Message Bubble — glass card, IRA avatar, text + optional inline chart
Progress Ring — circular SVG progress indicator with percentage
Level Card (Silver/Gold/Expert) — for skill detail page
Warning Banner — yellow/red with icon for test zone
Tab Bar — underline indicator, smooth animation
Modal — spring-animated, backdrop blur, close button
Stat Card — large number + label + subtle trend indicator


⚙️ DESIGN RULES & DON'TS
DO:

Use glassmorphism consistently for cards and panels
Use gradients on every CTA button
Animate skill badge reveals with shimmer
Make the profile page feel like a portfolio, not a resume
Make Learner Mode feel distinctly different (focused, strict) from Socio Mode (expressive, social)
Design IRA as a premium AI companion, not a basic chatbot
Every empty state should have an IRA prompt: "Looks empty here — want IRA to suggest something?"

DON'T:

No white backgrounds
No generic LinkedIn-clone layouts
No flat, colorless buttons
No walls of text without visual hierarchy
No unbranded screens — every screen must feel like SKILLSURE
No clip-art icons — use a consistent icon set (Phosphor Icons or Lucide)


🧩 DESIGN DELIVERABLES EXPECTED

Full design system / component library (Colors, Typography, Icons, Spacing, Components)
All 14 screens above — desktop (1440px) AND mobile (390px) responsive versions
Interactive prototype flow: Landing → Signup → Onboarding (IRA) → Socio Feed → Profile → Learner Mode → Test Zone → IRA Chat
Hover states and micro-interaction specs for all interactive elements
Dark mode only (no light mode toggle needed for V1)