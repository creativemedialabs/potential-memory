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
  DatabaseZap,
  FileCheck2,
  FileText,
  Fingerprint,
  FolderLock,
  Globe2,
  Handshake,
  Layers3,
  MapPin,
  Network,
  Radar,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users2,
} from "lucide-react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  type Variants,
} from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

type Opportunity = {
  agency: string;
  title: string;
  value: string;
  valueShort: string;
  location: string;
  setAside: string;
  due: string;
  win: number;
  nextStep: string;
  accent: string;
};

type Subcontractor = {
  name: string;
  category: string;
  reliability: number;
  response: string;
  strength: string;
  certifications: string[];
  wins: string;
  projects: string;
  regions: string[];
};

const opportunities: Opportunity[] = [
  {
    agency: "Department of Energy",
    title: "Grid Resilience Analytics Platform",
    value: "$84.2M",
    valueShort: "84.2",
    location: "Washington, DC",
    setAside: "SBIR Phase III",
    due: "18 days",
    win: 78,
    nextStep: "Invite cyber resilience partner",
    accent: "from-amber-400 to-orange-500",
  },
  {
    agency: "Defense Logistics Agency",
    title: "AI Supply Chain Risk Engine",
    value: "$126.8M",
    valueShort: "126.8",
    location: "Fort Belvoir, VA",
    setAside: "Full & Open",
    due: "11 days",
    win: 64,
    nextStep: "Price LPTA alternate",
    accent: "from-sky-400 to-blue-600",
  },
  {
    agency: "Department of Homeland Security",
    title: "Border Sensor Fusion Modernization",
    value: "$213.4M",
    valueShort: "213.4",
    location: "El Paso, TX",
    setAside: "8(a) Competitive",
    due: "27 days",
    win: 71,
    nextStep: "Lock teaming agreement",
    accent: "from-emerald-400 to-teal-600",
  },
];

const subcontractors: Subcontractor[] = [
  {
    name: "Atlas Secure Systems",
    category: "Zero-trust infrastructure",
    reliability: 96,
    response: "42 min",
    strength: "Prime preferred",
    certifications: ["CMMC L2", "FedRAMP", "ISO 27001"],
    wins: "$420M influenced",
    projects: "38 federal programs",
    regions: ["DC", "VA", "MD", "TX"],
  },
  {
    name: "Harbor AI Labs",
    category: "Computer vision and geospatial ML",
    reliability: 91,
    response: "1.4 hr",
    strength: "Warm intro",
    certifications: ["8(a)", "HUBZone", "TS Facility"],
    wins: "$188M influenced",
    projects: "21 mission systems",
    regions: ["CA", "CO", "AZ", "NM"],
  },
  {
    name: "Crescent Field Ops",
    category: "Field deployment and sustainment",
    reliability: 88,
    response: "3.2 hr",
    strength: "Prior co-bid",
    certifications: ["SDVOSB", "ISO 9001", "DCAA"],
    wins: "$260M influenced",
    projects: "52 deployments",
    regions: ["GA", "AL", "FL", "NC"],
  },
];

const navItems = [
  ["Opportunity Intelligence", Target],
  ["Pipeline", TrendingUp],
  ["Subcontractor Network", Network],
  ["Proposal Center", FileText],
  ["Teaming Agreements", Handshake],
  ["Win Probability Engine", Radar],
  ["Market Intelligence", Globe2],
  ["Compliance Center", ShieldCheck],
  ["Document Vault", FolderLock],
  ["Command Center", Command],
] as const;

const feed = [
  "DOE amended evaluation criteria: technical narrative weight increased to 45%",
  "Atlas Secure Systems accepted NDA and uploaded CMMC package",
  "Win engine detected incumbent staffing gap in NAICS 541715 bids",
  "Proposal Center generated red-team checklist for DHS sensor fusion bid",
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08,
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
      duration: 1.7,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        setDisplay(`${prefix}${latest.toFixed(decimals)}${suffix}`);
      },
    });

    return () => controls.stop();
  }, [decimals, prefix, suffix, value]);

  return <span>{display}</span>;
}

function MagneticCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(520px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.58) 35%, rgba(255, 255, 255, 0.28) 62%)`;

  return (
    <motion.div
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        mouseX.set(event.clientX - bounds.left);
        mouseY.set(event.clientY - bounds.top);
      }}
      whileHover={{ y: -8, scale: 1.012 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      style={{ background }}
      className={`glass-card gradient-border ${className}`}
    >
      {children}
    </motion.div>
  );
}

function Badge({ children, tone = "amber" }: { children: ReactNode; tone?: string }) {
  const tones: Record<string, string> = {
    amber: "border-amber-200 bg-amber-50/80 text-amber-700",
    blue: "border-blue-200 bg-blue-50/80 text-blue-700",
    emerald: "border-emerald-200 bg-emerald-50/80 text-emerald-700",
    rose: "border-rose-200 bg-rose-50/80 text-rose-700",
    slate: "border-slate-200 bg-white/70 text-slate-600",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-tight ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-500 shadow-sm backdrop-blur">
        <Sparkles className="size-3.5 text-amber-500" />
        {eyebrow}
      </div>
      <h2 className="text-balance text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-6xl">
        {title}
      </h2>
      <p className="mt-5 text-lg leading-8 text-slate-600">{body}</p>
    </motion.div>
  );
}

function Header() {
  return (
    <motion.header
      initial={{ y: -26, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-50 px-4 pt-4"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-[28px] border border-white/80 bg-white/70 px-4 py-3 shadow-[0_18px_70px_rgba(15,23,42,0.10)] backdrop-blur-2xl">
        <a href="#home" className="flex items-center gap-3">
          <div className="relative grid size-11 place-items-center rounded-2xl bg-slate-950 text-white shadow-xl shadow-slate-900/20">
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
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {["Command", "Opportunities", "Network", "Win Engine"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-950 hover:text-white"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button className="hidden rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md sm:inline-flex">
            View Demo
          </button>
          <button className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-xl shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800">
            Launch Command
            <ArrowRight className="size-4" />
          </button>
        </div>
      </nav>
    </motion.header>
  );
}

function HeroVisualization() {
  const nodes = [
    { label: "DOE", x: "16%", y: "24%", delay: 0.2, value: "$84.2M" },
    { label: "DHS", x: "66%", y: "18%", delay: 0.5, value: "$213M" },
    { label: "DLA", x: "76%", y: "70%", delay: 0.8, value: "$126M" },
    { label: "NOAA", x: "24%", y: "72%", delay: 1.1, value: "$58M" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-[620px]"
    >
      <div className="absolute inset-3 rounded-[42px] bg-gradient-to-br from-white via-amber-50/80 to-blue-50 shadow-[0_50px_160px_rgba(15,23,42,0.16)]" />
      <div className="absolute inset-0 rounded-[48px] border border-white/80 bg-white/38 backdrop-blur-xl" />
      <div className="absolute inset-8 overflow-hidden rounded-[36px] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.90),rgba(255,255,255,0.42))]">
        <div className="absolute inset-0 intelligence-grid opacity-60" />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 600">
          <defs>
            <linearGradient id="heroLine" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          {[
            ["110", "150", "410", "120"],
            ["410", "120", "470", "420"],
            ["470", "420", "150", "430"],
            ["150", "430", "110", "150"],
            ["110", "150", "470", "420"],
          ].map(([x1, y1, x2, y2], index) => (
            <motion.line
              key={`${x1}-${y1}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#heroLine)"
              strokeWidth="2"
              strokeDasharray="8 12"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.55 }}
              transition={{
                duration: 1.5,
                delay: 0.4 + index * 0.16,
                repeat: Infinity,
                repeatType: "mirror",
                repeatDelay: 1.1,
              }}
            />
          ))}
        </svg>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-slate-300/70"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-amber-300/80"
        />

        <div className="absolute left-1/2 top-1/2 grid size-36 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[32px] border border-white bg-white/80 shadow-2xl shadow-slate-900/15 backdrop-blur">
          <div className="grid size-20 place-items-center rounded-3xl bg-slate-950 text-white">
            <Radar className="size-9" />
          </div>
          <div className="text-center">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              Win AI
            </div>
            <div className="text-lg font-semibold text-slate-950">78%</div>
          </div>
        </div>

        {nodes.map((node) => (
          <motion.div
            key={node.label}
            initial={{ opacity: 0, scale: 0.84, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: node.delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute"
            style={{ left: node.x, top: node.y }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, delay: node.delay }}
              className="w-44 rounded-[24px] border border-white/80 bg-white/78 p-4 shadow-[0_22px_60px_rgba(15,23,42,0.14)] backdrop-blur-xl"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-bold text-white">
                  {node.label}
                </span>
                <span className="text-xs font-semibold text-emerald-600">live</span>
              </div>
              <div className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                {node.value}
              </div>
              <div className="mt-1 text-xs text-slate-500">Opportunity value</div>
            </motion.div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="absolute bottom-8 left-8 w-72 rounded-[28px] border border-white/80 bg-white/80 p-5 shadow-2xl shadow-slate-900/15 backdrop-blur"
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
              transition={{ delay: 1.35, duration: 1 }}
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-600"
            />
          </div>
          <div className="mt-3 flex justify-between text-xs font-semibold text-slate-500">
            <span>Capability fit</span>
            <span className="text-emerald-600">92%</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 34 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.25, duration: 0.8 }}
          className="absolute right-7 top-8 rounded-[26px] border border-white/80 bg-white/76 p-4 shadow-xl shadow-slate-900/10 backdrop-blur"
        >
          <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            <Clock3 className="size-4" />
            Award timeline
          </div>
          {["Sources sought", "RFP", "Orals", "Award"].map((item, index) => (
            <div key={item} className="flex items-center gap-3 py-1.5 text-sm">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.45 + index * 0.12, type: "spring" }}
                className={`size-2.5 rounded-full ${
                  index < 2 ? "bg-emerald-500" : "bg-slate-300"
                }`}
              />
              <span className={index < 2 ? "font-semibold text-slate-900" : "text-slate-500"}>
                {item}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-36 lg:pt-44">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-14%] size-[520px] rounded-full bg-amber-200/60 blur-3xl" />
        <div className="absolute right-[-6%] top-[4%] size-[540px] rounded-full bg-blue-200/55 blur-3xl" />
        <div className="absolute bottom-[0%] left-[30%] size-[460px] rounded-full bg-emerald-100/80 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="mb-6 inline-flex rounded-full border border-white/80 bg-white/70 p-1 shadow-sm backdrop-blur">
            <span className="rounded-full bg-slate-950 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white">
              Find. Analyze. Win.
            </span>
            <span className="px-4 py-2 text-xs font-semibold text-slate-500">
              Federal GTM intelligence
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-balance text-6xl font-semibold tracking-[-0.07em] text-slate-950 md:text-8xl"
          >
            Government Contracting.
            <span className="block bg-gradient-to-r from-slate-950 via-blue-700 to-amber-500 bg-clip-text text-transparent">
              Reimagined.
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-xl leading-9 text-slate-600">
            Discover opportunities, analyze competition, build teams, and manage bids
            from one intelligent platform.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button className="group inline-flex items-center justify-center gap-3 rounded-full bg-slate-950 px-7 py-4 text-sm font-semibold text-white shadow-2xl shadow-slate-950/20 transition hover:-translate-y-1 hover:bg-slate-800">
              Open intelligence workspace
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </button>
            <button className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-200 bg-white/70 px-7 py-4 text-sm font-semibold text-slate-700 shadow-lg shadow-slate-950/5 backdrop-blur transition hover:-translate-y-1 hover:border-slate-300 hover:bg-white">
              Watch live brief
              <Activity className="size-4 text-emerald-500" />
            </button>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-12 grid max-w-xl grid-cols-3 gap-4">
            {[
              ["$3.8B", "Tracked pipeline"],
              ["12k+", "Federal entities"],
              ["91%", "Team match lift"],
            ].map(([metric, label]) => (
              <div key={label} className="rounded-[24px] border border-white/80 bg-white/62 p-4 shadow-lg shadow-slate-950/5 backdrop-blur">
                <div className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                  {metric}
                </div>
                <div className="mt-1 text-xs font-medium text-slate-500">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <HeroVisualization />
      </div>
    </section>
  );
}

function NavigationMatrix() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
      >
        {navItems.map(([label, Icon]) => (
          <motion.a
            variants={fadeUp}
            key={label}
            href={`#${label.toLowerCase().replaceAll(" ", "-")}`}
            whileHover={{ y: -6 }}
            className="group rounded-[24px] border border-white/80 bg-white/62 p-4 shadow-lg shadow-slate-950/5 backdrop-blur-xl transition hover:bg-white"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="grid size-10 place-items-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-900/15">
                <Icon className="size-5" />
              </div>
              <ChevronRight className="size-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-700" />
            </div>
            <div className="text-sm font-semibold tracking-[-0.02em] text-slate-950">
              {label}
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}

function MetricCard({
  icon,
  label,
  value,
  suffix,
  prefix,
  body,
  tone,
}: {
  icon: ReactNode;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  body: string;
  tone: string;
}) {
  return (
    <MagneticCard className="p-6">
      <div className="flex items-start justify-between">
        <div className={`grid size-12 place-items-center rounded-2xl bg-gradient-to-br ${tone} text-white shadow-lg`}>
          {icon}
        </div>
        <Badge tone="slate">live</Badge>
      </div>
      <div className="mt-8 text-4xl font-semibold tracking-[-0.05em] text-slate-950">
        <CountUp value={value} prefix={prefix} suffix={suffix} decimals={suffix === "B" ? 1 : 0} />
      </div>
      <div className="mt-2 text-sm font-semibold text-slate-600">{label}</div>
      <p className="mt-4 text-sm leading-6 text-slate-500">{body}</p>
    </MagneticCard>
  );
}

function PipelineWaterfall() {
  const stages = [
    { label: "Discovered", value: 92, height: "h-56", color: "from-slate-900 to-slate-700" },
    { label: "Qualified", value: 68, height: "h-44", color: "from-blue-500 to-indigo-600" },
    { label: "Teamed", value: 43, height: "h-32", color: "from-amber-400 to-orange-500" },
    { label: "Proposed", value: 21, height: "h-24", color: "from-emerald-400 to-teal-600" },
    { label: "Award", value: 11, height: "h-16", color: "from-violet-500 to-fuchsia-500" },
  ];

  return (
    <MagneticCard className="p-7 lg:col-span-2">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            <TrendingUp className="size-4 text-blue-500" />
            Interactive pipeline visualization
          </div>
          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
            $3.8B federal capture waterfall
          </h3>
        </div>
        <Badge tone="blue">+18.4% velocity</Badge>
      </div>

      <div className="grid min-h-80 grid-cols-5 items-end gap-4 rounded-[30px] border border-white/80 bg-gradient-to-br from-white/70 to-slate-50/70 p-5">
        {stages.map((stage, index) => (
          <div key={stage.label} className="flex h-full flex-col justify-end">
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ opacity: 1 }}
              animate={{}}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={`${stage.height} group relative overflow-hidden rounded-[22px] bg-gradient-to-b ${stage.color} shadow-xl shadow-slate-950/10`}
            >
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-gradient-to-t from-black/16 to-white/26"
              />
              <div className="absolute left-3 top-3 rounded-full bg-white/22 px-2 py-1 text-xs font-bold text-white backdrop-blur">
                {stage.value}
              </div>
            </motion.div>
            <div className="mt-4 text-center text-xs font-semibold text-slate-500">
              {stage.label}
            </div>
          </div>
        ))}
      </div>
    </MagneticCard>
  );
}

function ActivityFeed() {
  return (
    <MagneticCard className="p-7">
      <div className="mb-7 flex items-center justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            Command feed
          </div>
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
            Live capture signals
          </h3>
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
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-4 rounded-[22px] border border-white/80 bg-white/58 p-4 shadow-sm"
          >
            <span className="mt-1 size-2.5 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.10)]" />
            <p className="text-sm leading-6 text-slate-600">{item}</p>
          </motion.div>
        ))}
      </div>
    </MagneticCard>
  );
}

function Dashboard() {
  return (
    <section id="command" className="mx-auto max-w-7xl px-4 py-24">
      <SectionHeading
        eyebrow="Command Center"
        title="A live operating system for federal growth."
        body="NorthPoint replaces static bid trackers with an executive-grade intelligence cockpit: animated counters, visual pipelines, live risk signals, and deadline-aware workflows."
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={fadeUp}>
          <MetricCard
            icon={<Target className="size-5" />}
            label="Active Opportunities"
            value={148}
            body="Prioritized by fit, competitive posture, and procurement momentum."
            tone="from-slate-900 to-slate-700"
          />
        </motion.div>
        <motion.div variants={fadeUp}>
          <MetricCard
            icon={<CircleDollarSign className="size-5" />}
            label="Total Pipeline Value"
            value={3.8}
            prefix="$"
            suffix="B"
            body="Weighted by stage, probability, and agency buying history."
            tone="from-blue-500 to-indigo-600"
          />
        </motion.div>
        <motion.div variants={fadeUp}>
          <MetricCard
            icon={<Clock3 className="size-5" />}
            label="Proposals Due This Week"
            value={7}
            body="Auto-sequenced milestones keep every bid moving."
            tone="from-amber-400 to-orange-500"
          />
        </motion.div>
        <motion.div variants={fadeUp}>
          <MetricCard
            icon={<TrendingUp className="size-5" />}
            label="Estimated Revenue"
            value={482}
            prefix="$"
            suffix="M"
            body="Forecasted from probability, team strength, and price-to-win."
            tone="from-emerald-400 to-teal-600"
          />
        </motion.div>
      </motion.div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <PipelineWaterfall />
        <ActivityFeed />
      </div>
    </section>
  );
}

function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  return (
    <MagneticCard className="group p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            {opportunity.agency}
          </div>
          <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-slate-950">
            {opportunity.title}
          </h3>
        </div>
        <div className={`grid size-12 place-items-center rounded-2xl bg-gradient-to-br ${opportunity.accent} text-white shadow-xl shadow-slate-950/10`}>
          <BriefcaseBusiness className="size-5" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          ["Value", opportunity.value],
          ["Location", opportunity.location],
          ["Set Aside", opportunity.setAside],
          ["Due Date", opportunity.due],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[18px] border border-white/70 bg-white/62 p-3">
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
              {label}
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-800">{value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[22px] bg-slate-950 p-4 text-white shadow-xl shadow-slate-950/15">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-white/58">Win Probability</span>
          <span className="text-lg font-semibold">{opportunity.win}%</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${opportunity.win}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className={`h-full rounded-full bg-gradient-to-r ${opportunity.accent}`}
          />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
            Recommended next step
          </div>
          <div className="mt-1 text-sm font-semibold text-slate-700">
            {opportunity.nextStep}
          </div>
        </div>
        <ArrowRight className="size-5 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-900" />
      </div>
    </MagneticCard>
  );
}

function OpportunityIntelligence() {
  return (
    <section id="opportunities" className="mx-auto max-w-7xl px-4 py-24">
      <SectionHeading
        eyebrow="Opportunity Intelligence"
        title="Every opportunity becomes a living briefing."
        body="Cards surface agency, value, set-aside, timing, probability, and the next action without collapsing the work into another enterprise table."
      />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        className="grid gap-5 lg:grid-cols-3"
      >
        {opportunities.map((opportunity) => (
          <motion.div variants={fadeUp} key={opportunity.title}>
            <OpportunityCard opportunity={opportunity} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function OpportunityDetail() {
  const timeline = [
    ["Market research", "Complete", "emerald"],
    ["Draft RFP", "Complete", "emerald"],
    ["Q&A window", "Active", "amber"],
    ["Final proposal", "18 days", "slate"],
    ["Award", "Q4", "slate"],
  ];

  return (
    <section id="opportunity-intelligence" className="mx-auto max-w-7xl px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden rounded-[42px] border border-white/80 bg-white/54 shadow-[0_40px_130px_rgba(15,23,42,0.14)] backdrop-blur-2xl"
      >
        <div className="relative border-b border-white/80 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-8 text-white md:p-10">
          <div className="absolute inset-0 opacity-30 intelligence-grid" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <div className="grid size-14 place-items-center rounded-2xl bg-white text-slate-950 shadow-2xl">
                  <Building2 className="size-7" />
                </div>
                <Badge tone="amber">8(a) Competitive</Badge>
                <Badge tone="blue">NAICS 541715</Badge>
                <Badge tone="emerald">PSC DA01</Badge>
              </div>
              <h2 className="mt-8 text-balance text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
                Border Sensor Fusion Modernization
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
                DHS is consolidating sensor fusion, edge analytics, and field operations
                into a multi-award modernization program across the southwest corridor.
              </p>
            </div>

            <div className="grid min-w-72 gap-3 rounded-[30px] border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/58">Contract value</span>
                <span className="text-3xl font-semibold">$213.4M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/58">Due date countdown</span>
                <span className="text-2xl font-semibold text-amber-300">27d 04h</span>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/58">Recommended action</span>
                <span className="text-sm font-semibold text-emerald-300">
                  Lock team today
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-5 p-5 md:p-7 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ["Win probability", 71, "from-emerald-400 to-teal-600", Radar],
              ["Competition score", 62, "from-amber-400 to-orange-500", BarChart3],
              ["Risk score", 29, "from-rose-400 to-red-500", ShieldCheck],
            ].map(([label, value, color, Icon]) => {
              const IconComponent = Icon as typeof Radar;
              return (
                <div key={label as string} className="rounded-[28px] border border-white/80 bg-white/72 p-5 shadow-lg shadow-slate-950/5">
                  <div className="flex items-center justify-between">
                    <div className={`grid size-11 place-items-center rounded-2xl bg-gradient-to-br ${color as string} text-white`}>
                      <IconComponent className="size-5" />
                    </div>
                    <span className="text-3xl font-semibold tracking-[-0.05em] text-slate-950">
                      {value as number}%
                    </span>
                  </div>
                  <div className="mt-5 text-sm font-semibold text-slate-600">
                    {label as string}
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${value as number}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className={`h-full rounded-full bg-gradient-to-r ${color as string}`}
                    />
                  </div>
                </div>
              );
            })}

            <div className="rounded-[30px] border border-white/80 bg-white/72 p-6 shadow-lg shadow-slate-950/5 md:col-span-3">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                    Location map
                  </div>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                    Southwest corridor deployment
                  </h3>
                </div>
                <MapPin className="size-6 text-rose-500" />
              </div>
              <div className="relative min-h-72 overflow-hidden rounded-[28px] border border-slate-200/80 bg-gradient-to-br from-amber-50 via-white to-blue-50">
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
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.14, type: "spring" }}
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
                {["Atlas Secure Systems", "Harbor AI Labs", "Crescent Field Ops"].map((name, index) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.12 }}
                    className="flex items-center justify-between rounded-[22px] border border-white bg-white/70 p-4"
                  >
                    <div>
                      <div className="font-semibold text-slate-950">{name}</div>
                      <div className="text-sm text-slate-500">
                        {index === 0 ? "Prime cyber partner" : index === 1 ? "Edge AI specialist" : "Field deployment"}
                      </div>
                    </div>
                    <Badge tone={index === 0 ? "emerald" : "blue"}>{92 - index * 5}% fit</Badge>
                  </motion.div>
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
                {["CBP mobile surveillance analytics", "TSA sensor operations cloud", "USCG edge compute refresh"].map((item) => (
                  <div key={item} className="rounded-[18px] bg-slate-50/80 p-4 text-sm font-medium text-slate-600">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-white/80 bg-white/72 p-6 shadow-lg shadow-slate-950/5">
              <div className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Award timeline
              </div>
              <div className="space-y-0">
                {timeline.map(([label, status, tone], index) => (
                  <div key={label} className="relative flex gap-4 pb-5 last:pb-0">
                    {index < timeline.length - 1 && (
                      <span className="absolute left-[9px] top-6 h-full w-px bg-slate-200" />
                    )}
                    <span
                      className={`relative mt-1 size-5 rounded-full border-4 border-white shadow ${
                        tone === "emerald" ? "bg-emerald-500" : tone === "amber" ? "bg-amber-400" : "bg-slate-300"
                      }`}
                    />
                    <div className="flex-1 rounded-[18px] bg-white/70 p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-800">{label}</span>
                        <span className="text-sm font-medium text-slate-500">{status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function SubcontractorCard({ subcontractor }: { subcontractor: Subcontractor }) {
  return (
    <MagneticCard className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">
            {subcontractor.name}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">{subcontractor.category}</p>
        </div>
        <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
          <Network className="size-5" />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {subcontractor.certifications.map((certification) => (
          <Badge key={certification} tone="blue">
            {certification}
          </Badge>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {[
          ["Reliability", `${subcontractor.reliability}%`],
          ["Response", subcontractor.response],
          ["Win history", subcontractor.wins],
          ["Past projects", subcontractor.projects],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[20px] border border-white/80 bg-white/62 p-4">
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
              {label}
            </div>
            <div className="mt-2 text-sm font-semibold text-slate-800">{value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[24px] bg-gradient-to-br from-slate-950 to-blue-950 p-5 text-white">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-white/70">Relationship strength</span>
          <span className="text-sm font-semibold text-emerald-300">{subcontractor.strength}</span>
        </div>
        <div className="relative h-24 overflow-hidden rounded-[18px] bg-white/10">
          <div className="absolute inset-0 map-lines opacity-30" />
          {subcontractor.regions.map((region, index) => (
            <motion.span
              key={region}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring" }}
              className="absolute rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold text-slate-950"
              style={{
                left: `${16 + index * 19}%`,
                top: `${28 + (index % 2) * 28}%`,
              }}
            >
              {region}
            </motion.span>
          ))}
        </div>
      </div>
    </MagneticCard>
  );
}

function SubcontractorNetwork() {
  return (
    <section id="subcontractor-network" className="mx-auto max-w-7xl px-4 py-24">
      <SectionHeading
        eyebrow="Subcontractor Network"
        title="LinkedIn meets Palantir for pursuit teams."
        body="Every partner profile carries capability tags, coverage, certifications, response behavior, win history, and relationship intelligence."
      />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        className="grid gap-5 lg:grid-cols-3"
      >
        {subcontractors.map((subcontractor) => (
          <motion.div variants={fadeUp} key={subcontractor.name}>
            <SubcontractorCard subcontractor={subcontractor} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function WinEngine() {
  const competitors = [
    ["Incumbent", 84, "Known scope advantage"],
    ["NorthPoint team", 71, "Superior AI + field coverage"],
    ["Large integrator", 57, "Price pressure risk"],
    ["Regional 8(a)", 43, "Narrow capability match"],
  ];

  return (
    <section id="win-engine" className="mx-auto max-w-7xl px-4 py-24">
      <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow="Win Probability Engine"
          title="Probability you can explain in the boardroom."
          body="The engine models fit, price-to-win, incumbent behavior, team coverage, agency history, risk signals, and proposal readiness."
        />
        <MagneticCard className="p-7">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Competitive landscape
              </div>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                DHS sensor fusion bid posture
              </h3>
            </div>
            <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-slate-950 to-blue-950 text-white">
              <Fingerprint className="size-5" />
            </div>
          </div>

          <div className="space-y-4">
            {competitors.map(([name, score, note], index) => (
              <motion.div
                key={name as string}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-[24px] border border-white/80 bg-white/66 p-5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-950">{name}</div>
                    <div className="text-sm text-slate-500">{note}</div>
                  </div>
                  <div className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                    {score as number}%
                  </div>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${score as number}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.12 }}
                    className={`h-full rounded-full ${
                      index === 1
                        ? "bg-gradient-to-r from-emerald-400 to-teal-600"
                        : "bg-gradient-to-r from-slate-300 to-slate-500"
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </MagneticCard>
      </div>
    </section>
  );
}

function WorkflowSuite() {
  const modules = [
    {
      id: "proposal-center",
      title: "Proposal Center",
      body: "AI-assisted compliance matrix, outline builder, color-team calendar, and executive narrative controls.",
      icon: FileText,
      tone: "from-blue-500 to-indigo-600",
      points: ["Pink team ready", "27 reviewer comments", "96% compliant"],
    },
    {
      id: "teaming-agreements",
      title: "Teaming Agreements",
      body: "NDA routing, workshare negotiation, exclusivity status, and signature-aware pursuit governance.",
      icon: Handshake,
      tone: "from-emerald-400 to-teal-600",
      points: ["3 active NDAs", "2 workshare drafts", "Atlas exclusive"],
    },
    {
      id: "compliance-center",
      title: "Compliance Center",
      body: "CMMC, FAR, DFARS, representations, certs, and flow-down obligations stay inspection ready.",
      icon: FileCheck2,
      tone: "from-amber-400 to-orange-500",
      points: ["FAR scan complete", "CMMC L2 verified", "4 open clauses"],
    },
    {
      id: "document-vault",
      title: "Document Vault",
      body: "Secure versioned vault for past performance, key personnel, pricing artifacts, and team packages.",
      icon: FolderLock,
      tone: "from-slate-900 to-slate-700",
      points: ["342 artifacts", "8 locked rooms", "Zero stale resumes"],
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-24">
      <SectionHeading
        eyebrow="Pursuit Operations"
        title="Proposal workflows with institutional memory."
        body="The platform brings proposal execution, teaming agreements, compliance readiness, and secure documents into one premium operating model."
      />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        className="grid gap-5 md:grid-cols-2"
      >
        {modules.map((module) => (
          <motion.div variants={fadeUp} key={module.title} id={module.id}>
            <MagneticCard className="p-7">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                    <Layers3 className="size-4" />
                    Operations layer
                  </div>
                  <h3 className="text-3xl font-semibold tracking-[-0.05em] text-slate-950">
                    {module.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500">
                    {module.body}
                  </p>
                </div>
                <div className={`grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${module.tone} text-white shadow-xl shadow-slate-950/10`}>
                  <module.icon className="size-6" />
                </div>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {module.points.map((point, index) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-[20px] border border-white/80 bg-white/64 p-4 text-sm font-semibold text-slate-700"
                  >
                    {point}
                  </motion.div>
                ))}
              </div>
            </MagneticCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function MarketIntelligence() {
  return (
    <section id="market-intelligence" className="mx-auto max-w-7xl px-4 py-24">
      <div className="overflow-hidden rounded-[42px] border border-white/80 bg-gradient-to-br from-white/78 via-blue-50/74 to-amber-50/78 p-6 shadow-[0_40px_130px_rgba(15,23,42,0.12)] backdrop-blur-2xl md:p-9">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              <Globe2 className="size-4 text-blue-500" />
              Market Intelligence
            </div>
            <h2 className="text-balance text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-6xl">
              Geographic demand maps and agency buying signals.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Identify where spending is concentrating, which agencies are accelerating,
              and which competitors are quietly building capture positions.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["$19.2B", "AI modernization"],
                ["42", "Agency surges"],
                ["318", "Pre-RFP signals"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[24px] border border-white/80 bg-white/62 p-5">
                  <div className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                    {value}
                  </div>
                  <div className="mt-1 text-xs font-semibold text-slate-500">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[440px] overflow-hidden rounded-[34px] border border-white/80 bg-slate-950 shadow-2xl shadow-slate-950/20">
            <div className="absolute inset-0 opacity-25 intelligence-grid" />
            {[
              ["18%", "28%", "DoD", "$9.4B", "from-blue-400 to-indigo-500"],
              ["62%", "22%", "DHS", "$4.8B", "from-emerald-400 to-teal-500"],
              ["72%", "66%", "DOE", "$2.7B", "from-amber-400 to-orange-500"],
              ["28%", "70%", "HHS", "$2.3B", "from-rose-400 to-pink-500"],
            ].map(([left, top, label, value, tone], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.16, type: "spring", stiffness: 160 }}
                className="absolute"
                style={{ left, top }}
              >
                <motion.div
                  animate={{ y: [0, -9, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.4 }}
                  className={`rounded-[24px] bg-gradient-to-br ${tone} p-4 text-white shadow-2xl`}
                >
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                    {label}
                  </div>
                  <div className="mt-2 text-2xl font-semibold">{value}</div>
                </motion.div>
              </motion.div>
            ))}
            <svg className="absolute inset-0 h-full w-full">
              <motion.path
                d="M90 130 C210 80, 310 120, 405 110 S560 210, 450 290 S250 360, 170 305"
                fill="none"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="2"
                strokeDasharray="10 12"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8 }}
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

function CommandCenter() {
  return (
    <section id="command-center" className="mx-auto max-w-7xl px-4 py-24">
      <SectionHeading
        eyebrow="Command Center"
        title="A terminal-grade launchpad for serious contractors."
        body="Executive briefings, live ingestion status, next-best actions, and AI-prepared pursuit rooms make the workspace feel operational the moment it opens."
      />

      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <MagneticCard className="p-7">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Executive briefing
              </div>
              <h3 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-slate-950">
                Today&apos;s capture priorities
              </h3>
            </div>
            <div className="grid size-12 place-items-center rounded-2xl bg-slate-950 text-white">
              <Command className="size-5" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["1", "Finalize DHS teaming", "Atlas exclusivity expires in 36 hours"],
              ["2", "Counter DLA incumbent", "Price-to-win model suggests 8% variance"],
              ["3", "Advance DOE story", "Past performance gap needs cyber reference"],
            ].map(([rank, title, body]) => (
              <motion.div
                key={title}
                whileHover={{ y: -6 }}
                className="rounded-[26px] border border-white/80 bg-white/70 p-5 shadow-lg shadow-slate-950/5"
              >
                <div className="mb-6 grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-sm font-bold text-white">
                  {rank}
                </div>
                <div className="font-semibold text-slate-950">{title}</div>
                <p className="mt-3 text-sm leading-6 text-slate-500">{body}</p>
              </motion.div>
            ))}
          </div>
        </MagneticCard>

        <MagneticCard className="p-7">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Loading skeletons
              </div>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                Data fabric ingest
              </h3>
            </div>
            <DatabaseZap className="size-6 text-emerald-500" />
          </div>
          <div className="space-y-4">
            {["SAM.gov opportunities", "FPDS award history", "Subcontractor graph", "Compliance vault"].map((item, index) => (
              <div key={item} className="rounded-[22px] border border-white/80 bg-white/62 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">{item}</span>
                  <CheckCircle2 className="size-4 text-emerald-500" />
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.14,
                    }}
                    className="h-full w-1/2 rounded-full bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                  />
                </div>
              </div>
            ))}
          </div>
        </MagneticCard>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-4 pb-10 pt-16">
      <div className="rounded-[34px] border border-white/80 bg-white/58 p-6 shadow-lg shadow-slate-950/5 backdrop-blur-xl md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-2xl bg-slate-950 text-white">
              <Compass className="size-5" />
            </div>
            <div>
              <div className="font-semibold text-slate-950">NorthPoint Intelligence</div>
              <div className="text-sm text-slate-500">Find. Analyze. Win.</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-sm font-medium text-slate-500">
            <span>Light mode only</span>
            <span>•</span>
            <span>Premium federal GTM intelligence</span>
            <span>•</span>
            <span>Built with React, TypeScript, Tailwind, Framer Motion</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f3ec] text-slate-950">
      <Header />
      <main>
        <Hero />
        <NavigationMatrix />
        <Dashboard />
        <OpportunityIntelligence />
        <OpportunityDetail />
        <SubcontractorNetwork />
        <WinEngine />
        <MarketIntelligence />
        <WorkflowSuite />
        <CommandCenter />
      </main>
      <Footer />
    </div>
  );
}

export default App;
