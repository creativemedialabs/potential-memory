import {
  Activity,
  ArrowRight,
  Award,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Command,
  Compass,
  FileCheck2,
  FileText,
  Fingerprint,
  FolderLock,
  Globe2,
  Handshake,
  MapPin,
  Network,
  Radar,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users2,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  type Variants,
} from "framer-motion";
import { useEffect, useMemo, useState, type ReactNode } from "react";

type Screen = "landing" | "dashboard" | "opportunities";

type Opportunity = {
  agency: string;
  title: string;
  value: string;
  location: string;
  setAside: string;
  due: string;
  win: number;
  competition: number;
  risk: number;
  nextStep: string;
  accent: string;
};

type Partner = {
  name: string;
  role: string;
  fit: number;
  certs: string[];
};

const opportunities: Opportunity[] = [
  {
    agency: "Department of Homeland Security",
    title: "Border Sensor Fusion Modernization",
    value: "$213.4M",
    location: "El Paso, TX",
    setAside: "8(a) Competitive",
    due: "27d 04h",
    win: 71,
    competition: 62,
    risk: 29,
    nextStep: "Lock Atlas exclusive teaming agreement",
    accent: "from-emerald-400 to-teal-600",
  },
  {
    agency: "Defense Logistics Agency",
    title: "AI Supply Chain Risk Engine",
    value: "$126.8M",
    location: "Fort Belvoir, VA",
    setAside: "Full & Open",
    due: "11d 16h",
    win: 64,
    competition: 74,
    risk: 41,
    nextStep: "Run price-to-win alternate",
    accent: "from-blue-400 to-indigo-600",
  },
  {
    agency: "Department of Energy",
    title: "Grid Resilience Analytics Platform",
    value: "$84.2M",
    location: "Washington, DC",
    setAside: "SBIR Phase III",
    due: "18d 09h",
    win: 78,
    competition: 49,
    risk: 22,
    nextStep: "Add cyber resilience reference",
    accent: "from-amber-400 to-orange-500",
  },
];

const partners: Partner[] = [
  {
    name: "Atlas Secure Systems",
    role: "Zero-trust infrastructure",
    fit: 92,
    certs: ["CMMC L2", "FedRAMP", "ISO 27001"],
  },
  {
    name: "Harbor AI Labs",
    role: "Computer vision and geospatial ML",
    fit: 87,
    certs: ["8(a)", "HUBZone", "TS Facility"],
  },
  {
    name: "Crescent Field Ops",
    role: "Field deployment and sustainment",
    fit: 82,
    certs: ["SDVOSB", "DCAA", "ISO 9001"],
  },
];

const screenNav: Array<{
  id: Screen;
  label: string;
  icon: LucideIcon;
}> = [
  { id: "landing", label: "Landing", icon: Compass },
  { id: "dashboard", label: "Dashboard", icon: Command },
  { id: "opportunities", label: "Opportunity Intelligence", icon: Target },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.45,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        setDisplay(`${prefix}${latest.toFixed(decimals)}${suffix}`);
      },
    });

    return () => controls.stop();
  }, [decimals, prefix, suffix, value]);

  return <span>{display}</span>;
}

function GlowCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(560px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.98), rgba(255,255,255,0.62) 34%, rgba(255,255,255,0.30) 64%)`;

  return (
    <motion.div
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set(event.clientX - rect.left);
        mouseY.set(event.clientY - rect.top);
      }}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      style={{ background }}
      className={`glass-card gradient-border ${className}`}
    >
      {children}
    </motion.div>
  );
}

function Badge({
  children,
  tone = "slate",
}: {
  children: ReactNode;
  tone?: "slate" | "amber" | "blue" | "emerald" | "rose";
}) {
  const tones = {
    slate: "border-slate-200 bg-white/70 text-slate-600",
    amber: "border-amber-200 bg-amber-50/80 text-amber-700",
    blue: "border-blue-200 bg-blue-50/80 text-blue-700",
    emerald: "border-emerald-200 bg-emerald-50/80 text-emerald-700",
    rose: "border-rose-200 bg-rose-50/80 text-rose-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-tight ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function Shell({
  activeScreen,
  onScreenChange,
  children,
}: {
  activeScreen: Screen;
  onScreenChange: (screen: Screen) => void;
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f3ec] text-slate-950">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-12%] top-[-14%] size-[560px] rounded-full bg-amber-200/70 blur-3xl" />
        <div className="absolute right-[-10%] top-[4%] size-[620px] rounded-full bg-blue-200/60 blur-3xl" />
        <div className="absolute bottom-[-18%] left-[30%] size-[560px] rounded-full bg-emerald-100/90 blur-3xl" />
        <div className="absolute inset-0 intelligence-grid opacity-[0.18]" />
      </div>

      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 right-0 top-0 z-50 px-4 pt-4"
      >
        <nav className="mx-auto flex max-w-[1440px] items-center justify-between rounded-[28px] border border-white/80 bg-white/72 px-4 py-3 shadow-[0_18px_70px_rgba(15,23,42,0.10)] backdrop-blur-2xl">
          <button
            type="button"
            onClick={() => onScreenChange("landing")}
            className="group flex items-center gap-3 rounded-2xl pr-2 text-left"
          >
            <div className="relative grid size-11 place-items-center rounded-2xl bg-slate-950 text-white shadow-xl shadow-slate-900/20 transition group-hover:scale-105">
              <Compass className="size-5" />
              <span className="absolute -right-1 -top-1 size-3 rounded-full bg-amber-400 ring-4 ring-white" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-[-0.02em] text-slate-950">
                NorthPoint Intelligence
              </div>
              <div className="text-xs font-medium text-slate-500">
                Find. Analyze. Win.
              </div>
            </div>
          </button>

          <div className="hidden rounded-full border border-slate-200/70 bg-slate-50/70 p-1 lg:flex">
            {screenNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeScreen === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onScreenChange(item.id)}
                  className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive ? "text-white" : "text-slate-600 hover:text-slate-950"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-full bg-slate-950 shadow-lg shadow-slate-900/15"
                      transition={{ type: "spring", stiffness: 360, damping: 32 }}
                    />
                  )}
                  <Icon className="relative size-4" />
                  <span className="relative">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button className="hidden rounded-full border border-slate-200 bg-white/72 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md sm:inline-flex">
              Live preview
            </button>
            <button
              onClick={() => onScreenChange("dashboard")}
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-xl shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Launch Command
              <ArrowRight className="size-4" />
            </button>
          </div>
        </nav>
      </motion.header>

      <main className="mx-auto max-w-[1440px] px-4 pb-10 pt-28 md:pt-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen}
            initial={{ opacity: 0, y: 22, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.992 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function HeroNetwork() {
  const nodes = [
    { label: "DHS", value: "$213M", x: "13%", y: "24%", tone: "from-emerald-400 to-teal-600" },
    { label: "DLA", value: "$126M", x: "68%", y: "16%", tone: "from-blue-400 to-indigo-600" },
    { label: "DOE", value: "$84M", x: "73%", y: "68%", tone: "from-amber-400 to-orange-500" },
    { label: "Team", value: "92%", x: "18%", y: "72%", tone: "from-slate-900 to-slate-700" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 32 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.22, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-[660px]"
    >
      <div className="absolute inset-2 rounded-[44px] bg-gradient-to-br from-white via-amber-50/80 to-blue-50 shadow-[0_50px_160px_rgba(15,23,42,0.17)]" />
      <div className="absolute inset-0 rounded-[50px] border border-white/80 bg-white/34 backdrop-blur-xl" />
      <div className="absolute inset-8 overflow-hidden rounded-[38px] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(255,255,255,0.40))]">
        <div className="absolute inset-0 intelligence-grid opacity-60" />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 620 620">
          <defs>
            <linearGradient id="linkGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="48%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          {[
            "M120 145 C220 70, 365 80, 440 115",
            "M440 115 C545 225, 530 350, 465 430",
            "M465 430 C330 520, 210 500, 145 450",
            "M145 450 C70 320, 70 230, 120 145",
            "M120 145 C235 275, 330 335, 465 430",
          ].map((path, index) => (
            <motion.path
              key={path}
              d={path}
              fill="none"
              stroke="url(#linkGradient)"
              strokeDasharray="9 13"
              strokeWidth="2.4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.55 }}
              transition={{
                duration: 1.6,
                delay: 0.35 + index * 0.14,
                repeat: Infinity,
                repeatType: "mirror",
                repeatDelay: 1.2,
              }}
            />
          ))}
        </svg>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-slate-300/70"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-amber-300/80"
        />

        <div className="absolute left-1/2 top-1/2 grid size-40 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[34px] border border-white bg-white/82 shadow-2xl shadow-slate-900/15 backdrop-blur">
          <div className="grid size-20 place-items-center rounded-3xl bg-slate-950 text-white">
            <Radar className="size-9" />
          </div>
          <div className="text-center">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              Win AI
            </div>
            <div className="text-xl font-semibold text-slate-950">Live</div>
          </div>
        </div>

        {nodes.map((node, index) => (
          <motion.div
            key={node.label}
            initial={{ opacity: 0, scale: 0.82, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.48 + index * 0.14, duration: 0.65 }}
            className="absolute"
            style={{ left: node.x, top: node.y }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.4, repeat: Infinity, delay: index * 0.25 }}
              className="w-44 rounded-[26px] border border-white/80 bg-white/80 p-4 shadow-[0_22px_60px_rgba(15,23,42,0.14)] backdrop-blur-xl"
            >
              <div className="flex items-center justify-between">
                <span className={`rounded-full bg-gradient-to-r ${node.tone} px-3 py-1 text-xs font-bold text-white`}>
                  {node.label}
                </span>
                <span className="text-xs font-semibold text-emerald-600">live</span>
              </div>
              <div className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                {node.value}
              </div>
              <div className="mt-1 text-xs text-slate-500">
                {node.label === "Team" ? "Capability fit" : "Opportunity value"}
              </div>
            </motion.div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, x: -34 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.05, duration: 0.75 }}
          className="absolute bottom-8 left-8 w-72 rounded-[28px] border border-white/80 bg-white/82 p-5 shadow-2xl shadow-slate-900/15 backdrop-blur"
        >
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white">
              <Handshake className="size-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-950">
                Subcontractor match
              </div>
              <div className="text-xs text-slate-500">Atlas Secure Systems</div>
            </div>
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "92%" }}
              transition={{ delay: 1.2, duration: 1 }}
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-600"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function LandingScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      animate="show"
      className="grid min-h-[calc(100vh-9rem)] items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]"
    >
      <motion.div variants={fadeUp} className="max-w-3xl">
        <div className="mb-6 inline-flex rounded-full border border-white/80 bg-white/70 p-1 shadow-sm backdrop-blur">
          <span className="rounded-full bg-slate-950 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white">
            Find. Analyze. Win.
          </span>
          <span className="px-4 py-2 text-xs font-semibold text-slate-500">
            Federal GTM intelligence
          </span>
        </div>

        <h1 className="text-balance text-6xl font-semibold tracking-[-0.075em] text-slate-950 md:text-8xl xl:text-9xl">
          Government Contracting.
          <span className="block bg-gradient-to-r from-slate-950 via-blue-700 to-amber-500 bg-clip-text text-transparent">
            Reimagined.
          </span>
        </h1>

        <p className="mt-7 max-w-2xl text-xl leading-9 text-slate-600">
          Discover opportunities, analyze competition, build teams, and manage
          bids from one intelligent platform.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => onNavigate("dashboard")}
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-slate-950 px-7 py-4 text-sm font-semibold text-white shadow-2xl shadow-slate-950/20 transition hover:-translate-y-1 hover:bg-slate-800"
          >
            Open command dashboard
            <ArrowRight className="size-4 transition group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => onNavigate("opportunities")}
            className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-200 bg-white/70 px-7 py-4 text-sm font-semibold text-slate-700 shadow-lg shadow-slate-950/5 backdrop-blur transition hover:-translate-y-1 hover:border-slate-300 hover:bg-white"
          >
            Explore opportunities
            <Activity className="size-4 text-emerald-500" />
          </button>
        </div>

        <div className="mt-12 grid max-w-xl grid-cols-3 gap-4">
          {[
            ["$3.8B", "Tracked pipeline"],
            ["12k+", "Federal entities"],
            ["91%", "Team match lift"],
          ].map(([metric, label]) => (
            <motion.div
              variants={fadeUp}
              key={label}
              className="rounded-[24px] border border-white/80 bg-white/62 p-4 shadow-lg shadow-slate-950/5 backdrop-blur"
            >
              <div className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                {metric}
              </div>
              <div className="mt-1 text-xs font-medium text-slate-500">{label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <HeroNetwork />
    </motion.section>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  prefix,
  suffix,
  decimals,
  detail,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  detail: string;
  tone: string;
}) {
  return (
    <GlowCard className="p-6">
      <div className="flex items-start justify-between">
        <div className={`grid size-12 place-items-center rounded-2xl bg-gradient-to-br ${tone} text-white shadow-lg`}>
          <Icon className="size-5" />
        </div>
        <Badge>live</Badge>
      </div>
      <div className="mt-8 text-4xl font-semibold tracking-[-0.055em] text-slate-950">
        <CountUp value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </div>
      <div className="mt-2 text-sm font-semibold text-slate-600">{label}</div>
      <p className="mt-4 text-sm leading-6 text-slate-500">{detail}</p>
    </GlowCard>
  );
}

function PipelineGraph() {
  const stages = [
    { label: "Discovered", value: 92, height: "h-64", tone: "from-slate-900 to-slate-700" },
    { label: "Qualified", value: 68, height: "h-52", tone: "from-blue-500 to-indigo-600" },
    { label: "Teamed", value: 43, height: "h-40", tone: "from-amber-400 to-orange-500" },
    { label: "Proposed", value: 21, height: "h-28", tone: "from-emerald-400 to-teal-600" },
    { label: "Award", value: 11, height: "h-20", tone: "from-violet-500 to-fuchsia-500" },
  ];

  return (
    <GlowCard className="p-7 lg:col-span-2">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            <TrendingUp className="size-4 text-blue-500" />
            Pipeline visualization
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-950">
            $3.8B federal capture waterfall
          </h2>
        </div>
        <Badge tone="blue">+18.4% velocity</Badge>
      </div>

      <div className="grid min-h-[360px] grid-cols-5 items-end gap-4 rounded-[32px] border border-white/80 bg-gradient-to-br from-white/72 to-slate-50/72 p-5">
        {stages.map((stage, index) => (
          <div key={stage.label} className="flex h-full flex-col justify-end">
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ opacity: 1 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={`${stage.height} relative overflow-hidden rounded-[24px] bg-gradient-to-b ${stage.tone} shadow-xl shadow-slate-950/10`}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ delay: index * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-gradient-to-t from-black/20 to-white/28"
              />
              <div className="absolute left-3 top-3 rounded-full bg-white/24 px-2.5 py-1 text-xs font-bold text-white backdrop-blur">
                {stage.value}
              </div>
            </motion.div>
            <div className="mt-4 text-center text-xs font-semibold text-slate-500">
              {stage.label}
            </div>
          </div>
        ))}
      </div>
    </GlowCard>
  );
}

function ActivityPanel() {
  const feed = [
    "DOE amended evaluation criteria: technical narrative weight increased to 45%.",
    "Atlas Secure Systems accepted NDA and uploaded CMMC package.",
    "Win engine detected incumbent staffing gap in NAICS 541715 bids.",
    "Proposal Center generated red-team checklist for DHS sensor fusion bid.",
  ];

  return (
    <GlowCard className="p-7">
      <div className="mb-7 flex items-center justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            Command feed
          </div>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
            Live capture signals
          </h2>
        </div>
        <div className="grid size-11 place-items-center rounded-2xl bg-amber-100 text-amber-700">
          <Bell className="size-5" />
        </div>
      </div>
      <div className="space-y-4">
        {feed.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            className="flex gap-4 rounded-[22px] border border-white/80 bg-white/62 p-4 shadow-sm"
          >
            <span className="mt-1 size-2.5 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.10)]" />
            <p className="text-sm leading-6 text-slate-600">{item}</p>
          </motion.div>
        ))}
      </div>
    </GlowCard>
  );
}

function DashboardScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  return (
    <motion.section variants={stagger} initial="hidden" animate="show" className="space-y-5">
      <motion.div
        variants={fadeUp}
        className="overflow-hidden rounded-[42px] border border-white/80 bg-slate-950 p-7 text-white shadow-[0_40px_130px_rgba(15,23,42,0.22)] md:p-9"
      >
        <div className="relative grid gap-8 lg:grid-cols-[1fr_0.65fr]">
          <div className="absolute inset-0 opacity-20 intelligence-grid" />
          <div className="relative">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white/68 backdrop-blur">
              <Command className="size-4 text-amber-300" />
              Command Dashboard
            </div>
            <h1 className="max-w-4xl text-balance text-5xl font-semibold tracking-[-0.06em] md:text-7xl">
              Your federal growth cockpit is live.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/64">
              Executive metrics, pursuit velocity, proposal risk, partner movement,
              and next-best actions in one boardroom-grade surface.
            </p>
          </div>
          <div className="relative rounded-[30px] border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-semibold text-white/62">Today&apos;s priority</span>
              <Badge tone="amber">due soon</Badge>
            </div>
            <div className="text-2xl font-semibold tracking-[-0.04em]">
              Lock DHS sensor fusion team
            </div>
            <p className="mt-3 text-sm leading-6 text-white/58">
              Atlas exclusivity expires in 36 hours. Harbor AI has a warm intro pending.
            </p>
            <button
              onClick={() => onNavigate("opportunities")}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
            >
              Open opportunity
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div variants={stagger} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <motion.div variants={fadeUp}>
          <MetricCard icon={Target} label="Active Opportunities" value={148} detail="Prioritized by fit, competition, and timing." tone="from-slate-900 to-slate-700" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <MetricCard icon={CircleDollarSign} label="Total Pipeline Value" value={3.8} prefix="$" suffix="B" decimals={1} detail="Weighted by stage and buying history." tone="from-blue-500 to-indigo-600" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <MetricCard icon={Clock3} label="Proposals Due This Week" value={7} detail="Auto-sequenced across active pursuit rooms." tone="from-amber-400 to-orange-500" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <MetricCard icon={TrendingUp} label="Estimated Revenue" value={482} prefix="$" suffix="M" detail="Forecasted from probability and team strength." tone="from-emerald-400 to-teal-600" />
        </motion.div>
      </motion.div>

      <div className="grid gap-5 lg:grid-cols-3">
        <PipelineGraph />
        <ActivityPanel />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {[
          { title: "Proposal Center", icon: FileText, value: "96%", label: "DHS compliance", tone: "from-blue-500 to-indigo-600" },
          { title: "Teaming Agreements", icon: Handshake, value: "3", label: "agreements moving", tone: "from-emerald-400 to-teal-600" },
          { title: "Document Vault", icon: FolderLock, value: "342", label: "secure artifacts", tone: "from-slate-900 to-slate-700" },
        ].map((module, index) => (
          <motion.div variants={fadeUp} key={module.title}>
            <GlowCard className="p-6">
              <div className="flex items-center justify-between">
                <div className={`grid size-12 place-items-center rounded-2xl bg-gradient-to-br ${module.tone} text-white`}>
                  <module.icon className="size-5" />
                </div>
                <ChevronRight className="size-5 text-slate-300" />
              </div>
              <div className="mt-7 text-4xl font-semibold tracking-[-0.05em] text-slate-950">
                {module.value}
              </div>
              <div className="mt-2 font-semibold text-slate-700">{module.title}</div>
              <div className="mt-1 text-sm text-slate-500">{module.label}</div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${82 + index * 5}%` }}
                transition={{ delay: 0.35 + index * 0.08, duration: 0.9 }}
                className="mt-5 h-1.5 rounded-full bg-gradient-to-r from-amber-400 via-blue-500 to-emerald-500"
              />
            </GlowCard>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function OpportunityListCard({
  opportunity,
  selected,
  onClick,
}: {
  opportunity: Opportunity;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ x: 4 }}
      className={`group w-full rounded-[28px] border p-5 text-left shadow-lg transition ${
        selected
          ? "border-slate-950/10 bg-white shadow-slate-950/10"
          : "border-white/80 bg-white/58 shadow-slate-950/5 hover:bg-white/80"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
            {opportunity.agency}
          </div>
          <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-slate-950">
            {opportunity.title}
          </h3>
        </div>
        <div className={`grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${opportunity.accent} text-white shadow-lg`}>
          <BriefcaseBusiness className="size-5" />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2">
        <div className="rounded-2xl bg-slate-50/80 p-3">
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Value</div>
          <div className="mt-1 text-sm font-semibold text-slate-800">{opportunity.value}</div>
        </div>
        <div className="rounded-2xl bg-slate-50/80 p-3">
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Due</div>
          <div className="mt-1 text-sm font-semibold text-slate-800">{opportunity.due}</div>
        </div>
        <div className="rounded-2xl bg-slate-50/80 p-3">
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Win</div>
          <div className="mt-1 text-sm font-semibold text-emerald-600">{opportunity.win}%</div>
        </div>
      </div>
    </motion.button>
  );
}

function ScoreCard({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: number;
  icon: LucideIcon;
  tone: string;
}) {
  return (
    <div className="rounded-[28px] border border-white/80 bg-white/72 p-5 shadow-lg shadow-slate-950/5">
      <div className="flex items-center justify-between">
        <div className={`grid size-11 place-items-center rounded-2xl bg-gradient-to-br ${tone} text-white`}>
          <Icon className="size-5" />
        </div>
        <span className="text-3xl font-semibold tracking-[-0.05em] text-slate-950">
          {value}%
        </span>
      </div>
      <div className="mt-5 text-sm font-semibold text-slate-600">{label}</div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full bg-gradient-to-r ${tone}`}
        />
      </div>
    </div>
  );
}

function OpportunityMap() {
  return (
    <div className="relative min-h-[300px] overflow-hidden rounded-[30px] border border-slate-200/80 bg-gradient-to-br from-amber-50 via-white to-blue-50">
      <div className="absolute inset-0 map-lines opacity-70" />
      {[
        ["14%", "58%", "El Paso"],
        ["44%", "48%", "Tucson"],
        ["72%", "62%", "San Diego"],
        ["59%", "31%", "Ops Hub"],
      ].map(([left, top, label], index) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, type: "spring" }}
          className="absolute"
          style={{ left, top }}
        >
          <span className="relative flex size-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-45" />
            <span className="relative inline-flex size-4 rounded-full bg-blue-600 ring-4 ring-white" />
          </span>
          <span className="mt-2 block rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow">
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-[24px] border border-white/80 bg-white/68 p-4 shadow-sm"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="font-semibold text-slate-950">{partner.name}</div>
          <div className="mt-1 text-sm text-slate-500">{partner.role}</div>
        </div>
        <Badge tone="emerald">{partner.fit}% fit</Badge>
      </div>
      <div className="mb-3 flex flex-wrap gap-2">
        {partner.certs.map((cert) => (
          <Badge key={cert} tone="blue">
            {cert}
          </Badge>
        ))}
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${partner.fit}%` }}
          transition={{ duration: 0.8 }}
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-600"
        />
      </div>
    </motion.div>
  );
}

function OpportunityIntelligenceScreen() {
  const [selectedTitle, setSelectedTitle] = useState(opportunities[0].title);
  const selectedOpportunity = useMemo(
    () => opportunities.find((opportunity) => opportunity.title === selectedTitle) ?? opportunities[0],
    [selectedTitle],
  );

  return (
    <motion.section variants={stagger} initial="hidden" animate="show" className="grid gap-5 xl:grid-cols-[430px_1fr]">
      <motion.aside variants={fadeUp} className="space-y-4">
        <GlowCard className="p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Opportunity Intelligence
              </div>
              <h1 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-slate-950">
                Pursuit radar
              </h1>
            </div>
            <div className="grid size-12 place-items-center rounded-2xl bg-slate-950 text-white">
              <Search className="size-5" />
            </div>
          </div>
          <div className="rounded-[22px] border border-slate-200/80 bg-white/70 p-3">
            <div className="flex items-center gap-3 rounded-[18px] bg-slate-50 px-4 py-3 text-sm text-slate-500">
              <Search className="size-4" />
              Search agencies, NAICS, PSC, set-asides
            </div>
          </div>
        </GlowCard>

        {opportunities.map((opportunity) => (
          <OpportunityListCard
            key={opportunity.title}
            opportunity={opportunity}
            selected={selectedTitle === opportunity.title}
            onClick={() => setSelectedTitle(opportunity.title)}
          />
        ))}
      </motion.aside>

      <motion.div variants={fadeUp} className="overflow-hidden rounded-[42px] border border-white/80 bg-white/54 shadow-[0_40px_130px_rgba(15,23,42,0.14)] backdrop-blur-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedOpportunity.title}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.35 }}
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-8 text-white md:p-10">
              <div className="absolute inset-0 opacity-30 intelligence-grid" />
              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="grid size-14 place-items-center rounded-2xl bg-white text-slate-950 shadow-2xl">
                      <Building2 className="size-7" />
                    </div>
                    <Badge tone="amber">{selectedOpportunity.setAside}</Badge>
                    <Badge tone="blue">NAICS 541715</Badge>
                    <Badge tone="emerald">PSC DA01</Badge>
                  </div>
                  <h2 className="mt-8 text-balance text-4xl font-semibold tracking-[-0.055em] md:text-6xl">
                    {selectedOpportunity.title}
                  </h2>
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
                    {selectedOpportunity.agency} is moving toward a high-value modernization award.
                    NorthPoint has identified team fit, risk signals, and next-best actions.
                  </p>
                </div>

                <div className="grid min-w-72 gap-3 rounded-[30px] border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/58">Contract value</span>
                    <span className="text-3xl font-semibold">{selectedOpportunity.value}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/58">Due countdown</span>
                    <span className="text-2xl font-semibold text-amber-300">
                      {selectedOpportunity.due}
                    </span>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div>
                    <span className="text-sm text-white/58">Recommended action</span>
                    <div className="mt-2 text-sm font-semibold text-emerald-300">
                      {selectedOpportunity.nextStep}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-5 md:p-7 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="grid gap-5">
                <div className="grid gap-4 md:grid-cols-3">
                  <ScoreCard label="Win probability" value={selectedOpportunity.win} icon={Radar} tone="from-emerald-400 to-teal-600" />
                  <ScoreCard label="Competition score" value={selectedOpportunity.competition} icon={BarChart3} tone="from-amber-400 to-orange-500" />
                  <ScoreCard label="Risk score" value={selectedOpportunity.risk} icon={ShieldCheck} tone="from-rose-400 to-red-500" />
                </div>

                <div className="rounded-[30px] border border-white/80 bg-white/72 p-6 shadow-lg shadow-slate-950/5">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                        Location map
                      </div>
                      <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                        {selectedOpportunity.location} deployment corridor
                      </h3>
                    </div>
                    <MapPin className="size-6 text-rose-500" />
                  </div>
                  <OpportunityMap />
                </div>

                <div className="rounded-[30px] border border-white/80 bg-white/72 p-6 shadow-lg shadow-slate-950/5">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                        Award timeline
                      </div>
                      <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                        Animated pursuit sequence
                      </h3>
                    </div>
                    <Clock3 className="size-6 text-amber-500" />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-5">
                    {["Research", "Draft RFP", "Q&A", "Final", "Award"].map((step, index) => (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08 }}
                        className="rounded-[22px] border border-white bg-white/70 p-4"
                      >
                        <div className={`mb-5 size-3 rounded-full ${index < 3 ? "bg-emerald-500" : "bg-slate-300"}`} />
                        <div className="text-sm font-semibold text-slate-800">{step}</div>
                        <div className="mt-1 text-xs text-slate-500">
                          {index < 2 ? "Complete" : index === 2 ? "Active" : "Upcoming"}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-5">
                <div className="rounded-[30px] border border-white/80 bg-white/72 p-6 shadow-lg shadow-slate-950/5">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                        Subcontractor matches
                      </div>
                      <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                        Recommended pursuit team
                      </h3>
                    </div>
                    <Users2 className="size-6 text-blue-500" />
                  </div>
                  <div className="space-y-3">
                    {partners.map((partner) => (
                      <PartnerCard key={partner.name} partner={partner} />
                    ))}
                  </div>
                </div>

                <div className="rounded-[30px] border border-white/80 bg-white/72 p-6 shadow-lg shadow-slate-950/5">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="grid size-11 place-items-center rounded-2xl bg-slate-950 text-white">
                      <Award className="size-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                        Relevant past performance
                      </div>
                      <div className="text-xl font-semibold tracking-[-0.04em] text-slate-950">
                        14 high-fit references
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-3">
                    {[
                      "CBP mobile surveillance analytics",
                      "TSA sensor operations cloud",
                      "USCG edge compute refresh",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-[18px] bg-slate-50/80 p-4 text-sm font-medium text-slate-600">
                        <CheckCircle2 className="size-4 text-emerald-500" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[30px] border border-white/80 bg-slate-950 p-6 text-white shadow-lg shadow-slate-950/10">
                  <div className="flex items-center gap-3">
                    <div className="grid size-11 place-items-center rounded-2xl bg-white/10 text-amber-300">
                      <Zap className="size-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/42">
                        Recommended action
                      </div>
                      <div className="mt-1 text-xl font-semibold tracking-[-0.04em]">
                        {selectedOpportunity.nextStep}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}

function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>("landing");

  return (
    <Shell activeScreen={activeScreen} onScreenChange={setActiveScreen}>
      {activeScreen === "landing" && <LandingScreen onNavigate={setActiveScreen} />}
      {activeScreen === "dashboard" && <DashboardScreen onNavigate={setActiveScreen} />}
      {activeScreen === "opportunities" && <OpportunityIntelligenceScreen />}
    </Shell>
  );
}

export default App;
