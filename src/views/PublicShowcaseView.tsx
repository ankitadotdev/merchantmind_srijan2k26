import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  TrendingUp,
  TrendingDown,
  Calculator,
  Lock,
  QrCode,
  Layers,
  ChevronRight,
  Database,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  CheckSquare,
  Clock,
  Send,
  Building2,
  Package,
  BookOpen,
  ArrowUpRight,
  ExternalLink,
  ShieldAlert,
  Server,
  FileCheck,
  HelpCircle,
  BarChart3,
  Filter,
  Eye,
  Check,
  Split,
  ChevronDown,
} from 'lucide-react';
import { useMerchant } from '../context/MerchantContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { formatINR, formatDate } from '../utils/formatters';
import { ProductFaqGrid } from '../components/showcase/ProductFaqGrid';

export const PublicShowcaseView: React.FC = () => {
  const {
    setActiveWorld,
    setActiveAppTab,
    openTour,
    financialHealth,
    profile,
    openEvidenceDrawer,
    approveAction,
    executeActionSimulation,
    actions,
  } = useMerchant();

  // State for interactive Section 3 (9-Stage Lifecycle)
  const [activeStageIndex, setActiveStageIndex] = useState(3); // Default on Stage 4 (DETECT)

  // State for interactive Section 2 (Live Scenario Simulation Toggle)
  const [scenarioState, setScenarioState] = useState<'baseline' | 'resolved'>('baseline');

  // State for interactive Section 6 (Action Loop Simulation)
  const [simStep, setSimStep] = useState<'initial' | 'approved' | 'executing' | 'completed'>('initial');

  const handleLaunchApp = (tab = 'command-center') => {
    setActiveAppTab(tab);
    setActiveWorld('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 9-Stage Lifecycle Stages
  const lifecycleStages = [
    {
      num: '01',
      title: 'CONNECT',
      summary: 'Data enters MerchantMind once from existing merchant tools.',
      whatHappens: 'Ingests real-time Paytm QR transactions, Soundbox audio events, SBI current account statements via Account Aggregator, and POS / Khata invoices.',
      whyItMatters: 'Small merchants operate across 3–5 fragmented tools; financial data is scattered, resulting in blind spots and delayed awareness of cash shortfalls.',
      whatProduces: 'Secure, multi-channel streaming pipelines with cryptographic deduplication and format normalization.',
      scenarioExample: 'Continuously ingests Abhishek’s 42 daily Paytm QR collections and the ₹45,000 Sharma Telecom distributor bill.',
    },
    {
      num: '02',
      title: 'UNDERSTAND',
      summary: 'Raw, fragmented feeds are normalized into a single canonical ledger.',
      whatHappens: 'Standardizes disparate timestamps, customer IDs, vendor ledger lines, and payment settlement references into a unified relational model.',
      whyItMatters: 'Raw payment receipts do not understand credit maturity dates or supplier payment terms; normalisation turns noise into financial context.',
      whatProduces: 'A unified canonical financial ledger with synchronized transaction schemas, aging brackets, and SKU velocity indices.',
      scenarioExample: 'Links ₹8,450 Paytm counter collections directly to pending wholesale order lines and customer credit entries.',
    },
    {
      num: '03',
      title: 'MONITOR',
      summary: 'Continuously tracks operational health, cash runway, and working capital ratios.',
      whatHappens: 'Calculates rolling daily operational burn rate (₹3,570/day), liquidity coverage ratio (0.90x), and safe operating cash threshold (₹45,000).',
      whyItMatters: 'Merchants cannot calculate dynamic cash curves in their heads; monitoring creates continuous radar visibility 14 days forward.',
      whatProduces: 'Real-time liquidity trajectory comparing projected inflows against mandatory outflows and safety reserves.',
      scenarioExample: 'Monitors Abhishek’s ₹40,607 current bank balance against his upcoming weekly fixed and variable expenditure commitments.',
    },
    {
      num: '04',
      title: 'DETECT',
      summary: 'Deterministic heuristics identify impending liquidity cliffs and trapped capital.',
      whatHappens: 'Deterministic algorithms cross-reference payable maturity dates, overdue Khata books (>30 days), and non-moving inventory SKUs.',
      whyItMatters: 'Most small business crises are predictable days in advance; early detection prevents panicked borrowing or supplier defaults.',
      whatProduces: 'Prioritized financial signals with quantified monetary exposure, time-to-cliff metrics, and root cause tags.',
      scenarioExample: 'Detects that the ₹45,000 Sharma Telecom bill due in 5 days creates an immediate -₹4,393 cash deficit.',
    },
    {
      num: '05',
      title: 'EXPLAIN',
      summary: 'Every flagged anomaly is backed by 100% transparent mathematical proof.',
      whatHappens: 'Assembles the complete mathematical derivation, linking canonical source records, timeline events, and causal factors into an Evidence Drawer.',
      whyItMatters: 'Merchants distrust black-box AI recommendations; transparent arithmetic builds trust and enables confident decision-making.',
      whatProduces: 'Clickable evidence proof linking invoice IDs (BILL-SUP-201), aging ledgers, and exact formulas (Cash ₹40,607 - Bill ₹45,000 = -₹4,393).',
      scenarioExample: 'Provides exact audit lineage: Bill BILL-SUP-201 (₹45,000) from Sharma Telecom + Overdue Khata (₹3,700) + Dead Stock (₹10,660).',
    },
    {
      num: '06',
      title: 'RECOMMEND',
      summary: 'Formulates ranked, trade-off evaluated operational resolutions.',
      whatHappens: 'Evaluates capital recovery paths against implementation effort, customer relationship impact, and speed of liquidity generation.',
      whyItMatters: 'Finding a problem without a feasible solution creates anxiety; merchants need concrete, evaluated operational paths.',
      whatProduces: 'A ranked decision matrix detailing primary intervention (Khata recovery: +₹3,700) and secondary intervention (Inventory clearance: +₹7,800).',
      scenarioExample: 'Recommends polite WhatsApp UPI paylinks to overdue customers (+₹3.7K) plus a 48h flash discount bundle on dead cases (+₹7.8K).',
    },
    {
      num: '07',
      title: 'APPROVE',
      summary: 'Merchant retains 100% human-in-the-loop control to authorize execution.',
      whatHappens: 'Presents the structured action in a clean review card; no external message or transaction dispatches without explicit merchant confirmation.',
      whyItMatters: 'Autonomous software must never tamper with merchant customer relationships or vendor terms without human consent.',
      whatProduces: 'Cryptographically logged approval event with timestamp, user ID, and anticipated impact threshold.',
      scenarioExample: 'Abhishek reviews the pre-drafted WhatsApp reminder for Amit Verma (₹2,200) and taps "Approve & Dispatch".',
    },
    {
      num: '08',
      title: 'ACT',
      summary: 'Executes approved actions through simulated or real omnichannel connectors.',
      whatHappens: 'Dispatches targeted WhatsApp payment requests with dynamic Paytm UPI QR links and updates the internal execution ledger.',
      whyItMatters: 'Merchants lack the time to draft individual reminders or organize clearance campaigns manually during a busy retail day.',
      whatProduces: 'Outbound payment telemetry payloads, tracking links, and merchant execution receipts.',
      scenarioExample: 'Simulates dispatch of automated UPI paylinks to Amit Verma (38d overdue) and Neha Sharma (34d overdue).',
    },
    {
      num: '09',
      title: 'MEASURE',
      summary: 'Tracks actual business outcomes against projected recovery to close the loop.',
      whatHappens: 'Ingests inbound payment webhooks and inventory decrement events to calculate realized working capital improvements.',
      whyItMatters: 'Closed-loop telemetry confirms whether the intervention resolved the crisis or if follow-up escalation is needed.',
      whatProduces: 'A verified outcome delta report showing the liquidity deficit eliminated and the updated cash balance.',
      scenarioExample: 'Measures ₹11,500 total recovered capital, transforming Abhishek’s -₹4,393 cash deficit into a +₹7,107 liquid cushion!',
    },
  ];

  const currentStage = lifecycleStages[activeStageIndex];

  return (
    <div className="space-y-24 py-6">
      {/* =========================================================================
          SECTION 1 — HERO SECTION
          ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-6 pt-4">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-medium border border-slate-800 shadow-xs">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-300 tracking-wide font-mono text-[11px] uppercase">
            DEMO SCENARIO • ABHISHEK MOBILE & ACCESSORIES
          </span>
        </div>

        {/* Main Transformation Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] max-w-4xl mx-auto">
          Merchant intelligence that turns everyday business data into <span className="text-indigo-600">explainable decisions and actions.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          A continuous financial operating system for small and medium retail merchants. Connects payment terminals, bank statements, customer Khata, and inventory to detect working-capital risk, explain it with verifiable evidence, and execute recovery actions.
        </p>

        {/* Primary & Secondary CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={() => handleLaunchApp('command-center')}
            className="shadow-sm shadow-indigo-200 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700"
          >
            <span>Explore Live Merchant Scenario</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection('lifecycle-section')}
            className="border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50"
          >
            <HelpCircle className="w-4 h-4 mr-1.5 text-indigo-600" />
            <span>See How It Works</span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={openTour}
            className="border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50"
          >
            <Play className="w-4 h-4 mr-1.5 text-indigo-600 fill-indigo-600" />
            <span>Judge Tour (90s)</span>
          </Button>
        </div>

        {/* Live Merchant Telemetry Snapshot in Hero */}
        <div className="pt-6 max-w-4xl mx-auto">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs text-left">
            <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs text-slate-900">DEMO SCENARIO:</span>
                <span className="text-xs text-slate-700 font-bold">Abhishek Mobile & Accessories</span>
                <span className="text-slate-400 text-xs">• Hazratganj Market, Lucknow</span>
                <Badge variant="indigo" size="sm">Retail Electronics</Badge>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Deterministic Demo Feed Active</span>
              </div>
            </div>

            {/* 4 Connected Numbers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-b border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Available Cash</span>
                <span className="text-base font-bold font-mono text-slate-900">{formatINR(40607)}</span>
                <span className="text-[10px] text-slate-500 block">SBI Current Account</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Supplier Due (5d)</span>
                <span className="text-base font-bold font-mono text-rose-700">{formatINR(45000)}</span>
                <span className="text-[10px] text-rose-600 block">Sharma Telecom (BILL-SUP-201)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Overdue Khata</span>
                <span className="text-base font-bold font-mono text-amber-800">{formatINR(3700)}</span>
                <span className="text-[10px] text-amber-700 block">Amit (₹2.2K) + Neha (₹1.5K)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Dead Stock Capital</span>
                <span className="text-base font-bold font-mono text-slate-800">{formatINR(10660)}</span>
                <span className="text-[10px] text-slate-500 block">47+ Days Idle Phone Cases</span>
              </div>
            </div>

            {/* Critical Live Insight Banner */}
            <div className="pt-3 flex flex-wrap items-center justify-between gap-3 bg-rose-50/80 p-3 rounded-xl border border-rose-200 mt-2">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span className="text-xs text-rose-950 font-medium">
                  <strong>Detected Liquidity Gap:</strong> ₹40,607 cash vs ₹45,000 supplier obligation = <strong className="text-rose-700">-₹4,393 immediate deficit</strong> due in 5 days.
                </span>
              </div>
              <button
                onClick={() => openEvidenceDrawer('evi_01')}
                className="text-xs font-bold text-rose-800 hover:text-rose-950 flex items-center gap-1 cursor-pointer shrink-0"
              >
                <span>Inspect Evidence Proof</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 5 Core Questions for Judges */}
        <div className="pt-8 max-w-5xl mx-auto text-left">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
            <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 font-mono block">
                WHAT IS IT?
              </span>
              <strong className="text-slate-900 block text-xs">Intelligent Financial OS</strong>
              <p className="text-[11px] text-slate-600 leading-snug">
                Connects everyday merchant data and turns it into explainable working-capital actions.
              </p>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 font-mono block">
                WHO IS IT FOR?
              </span>
              <strong className="text-slate-900 block text-xs">Retail Store Merchants</strong>
              <p className="text-[11px] text-slate-600 leading-snug">
                Mobile shops, electronics retailers, and kiranas who lack full-time finance departments.
              </p>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 font-mono block">
                PROBLEM SOLVED
              </span>
              <strong className="text-slate-900 block text-xs">Working-Capital Squeeze</strong>
              <p className="text-[11px] text-slate-600 leading-snug">
                Overdue Khata and stagnant inventory locking up cash right before supplier bills mature.
              </p>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 font-mono block">
                HOW IT WORKS
              </span>
              <strong className="text-slate-900 block text-xs">Connect Once → Act</strong>
              <p className="text-[11px] text-slate-600 leading-snug">
                Paytm & bank telemetry continuously feed deterministic monitors that recommend 1-click actions.
              </p>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 font-mono block">
                WHY DIFFERENT?
              </span>
              <strong className="text-slate-900 block text-xs">Zero AI Hallucination</strong>
              <p className="text-[11px] text-slate-600 leading-snug">
                Deterministic forensic math. Every calculation cites source invoice and statement IDs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 — LIVE MERCHANT SCENARIO (Interactive Financial Decision Interface)
          ========================================================================= */}
      <section id="live-scenario-section" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800 space-y-8">
          {/* Header & Scenario Context */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 font-mono">
                  DEMO SCENARIO
                </span>
                <Badge variant="indigo" size="sm" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                  STATUS: LIVE DEMO
                </Badge>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Abhishek Mobile & Accessories • Retail Electronics
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Proprietor: Abhishek Kumar • Hazratganj Market, Lucknow • Monthly Gross: ₹1,42,800 (+8.4% MoM)
              </p>
            </div>

            {/* Interactive Scenario Toggle */}
            <div className="flex items-center p-1 bg-slate-800 rounded-xl border border-slate-700">
              <button
                onClick={() => setScenarioState('baseline')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${scenarioState === 'baseline'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
                  }`}
              >
                1. Immediate Deficit (-₹4,393)
              </button>
              <button
                onClick={() => setScenarioState('resolved')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${scenarioState === 'resolved'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
                  }`}
              >
                2. Post-Recovery Surplus (+₹7,107)
              </button>
            </div>
          </div>

          {/* 4 Financial Anchors */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-800/90 rounded-2xl border border-slate-700/80 space-y-1">
              <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">
                Operating Cash
              </span>
              <div className="text-2xl font-bold font-mono text-white">₹40,607</div>
              <span className="text-xs text-slate-300">SBI Current A/c</span>
              <span className="text-[11px] text-slate-400 block pt-1 border-t border-slate-700/60">
                Safe threshold: ₹45,000
              </span>
            </div>

            <div className="p-4 bg-slate-800/90 rounded-2xl border border-rose-900/60 space-y-1">
              <span className="text-[10px] font-mono font-bold text-rose-400 block uppercase">
                Supplier Due (5 Days)
              </span>
              <div className="text-2xl font-bold font-mono text-rose-400">₹45,000</div>
              <span className="text-xs text-slate-300">Sharma Telecom (BILL-SUP-201)</span>
              <span className="text-[11px] text-rose-400 font-semibold block pt-1 border-t border-slate-700/60">
                Matures Oct 09, 2026
              </span>
            </div>

            <div className="p-4 bg-slate-800/90 rounded-2xl border border-amber-900/60 space-y-1">
              <span className="text-[10px] font-mono font-bold text-amber-400 block uppercase">
                Overdue Khata
              </span>
              <div className="text-2xl font-bold font-mono text-amber-300">₹3,700</div>
              <span className="text-xs text-slate-300">Amit (₹2.2K) + Neha (₹1.5K)</span>
              <span className="text-[11px] text-amber-300 font-semibold block pt-1 border-t border-slate-700/60">
                Both &gt;30 days overdue
              </span>
            </div>

            <div className="p-4 bg-slate-800/90 rounded-2xl border border-slate-700/80 space-y-1">
              <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">
                Dead Stock Capital
              </span>
              <div className="text-2xl font-bold font-mono text-slate-200">₹10,660</div>
              <span className="text-xs text-slate-300">iPhone 11 & OnePlus 7 Items</span>
              <span className="text-[11px] text-slate-400 block pt-1 border-t border-slate-700/60">
                47+ days idle (0 turns)
              </span>
            </div>
          </div>

          {/* Decision Simulation Callout: Gap vs Recovery Path */}
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-slate-400 block uppercase">
                  FINANCIAL REALITY & RESOLUTION
                </span>
                <div className="text-base sm:text-lg font-bold text-white mt-0.5">
                  &ldquo;MerchantMind detected a <span className="text-rose-400">₹4,393 immediate liquidity gap</span>.&rdquo;
                </div>
              </div>
              <Badge variant={scenarioState === 'baseline' ? 'rose' : 'emerald'} size="md">
                {scenarioState === 'baseline' ? 'IMMEDIATE DEFICIT RISK' : 'SURPLUS RECOVERY PATH'}
              </Badge>
            </div>

            {/* Dynamic Recovery Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs pt-1">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-mono block">Action 1: Collect Khata</span>
                <span className="text-base font-bold font-mono text-emerald-400">+₹3,700</span>
                <p className="text-slate-400 text-[11px] leading-snug">
                  Automated WhatsApp UPI paylinks to Amit Verma and Neha Sharma.
                </p>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-mono block">Action 2: Clear Dead Stock</span>
                <span className="text-base font-bold font-mono text-emerald-400">+₹7,800</span>
                <p className="text-slate-400 text-[11px] leading-snug">
                  48-hour flash counter discount bundle at ₹299 recovering cost capital.
                </p>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-mono block">Total Potential Recovery</span>
                <span className="text-base font-bold font-mono text-emerald-400">+₹11,500</span>
                <p className="text-slate-400 text-[11px] leading-snug">
                  ₹3,700 Khata + ₹7,800 inventory clearance unlocked.
                </p>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-mono block">
                  {scenarioState === 'baseline' ? 'Current Baseline Position' : 'Projected Position'}
                </span>
                <span
                  className={`text-base font-bold font-mono ${scenarioState === 'baseline' ? 'text-rose-400' : 'text-emerald-400 font-extrabold'
                    }`}
                >
                  {scenarioState === 'baseline' ? '-₹4,393 Deficit' : '+₹7,107 Surplus'}
                </span>
                <p className="text-slate-400 text-[11px] leading-snug">
                  {scenarioState === 'baseline'
                    ? 'Cash drops below zero upon Sharma Telecom settlement.'
                    : 'Supplier settled cleanly with ₹7,107 safe working cushion.'}
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                Deterministic calculation: <span className="font-mono text-white">₹40,607 - ₹45,000 + ₹11,500 = +₹7,107</span>
              </span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleLaunchApp('command-center')}
                className="bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold"
              >
                <span>Open in Merchant Command Center &rarr;</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 — 9-STAGE INTERACTIVE LIFECYCLE (Visual Product Flow)
          ========================================================================= */}
      <section id="lifecycle-section" className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 font-mono">
            END-TO-END FINANCIAL OPERATING LIFECYCLE
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            The 9-Stage MerchantMind Intelligence Flow
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Click any stage below to examine what happens, why it matters, what MerchantMind produces, and the real Abhishek Mobile scenario.
          </p>
        </div>

        {/* 9 Interactive Stage Stepper */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
          {lifecycleStages.map((stage, idx) => {
            const isActive = activeStageIndex === idx;
            return (
              <button
                key={stage.num}
                onClick={() => setActiveStageIndex(idx)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${isActive
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
              >
                <span className={`text-[10px] font-mono font-bold block ${isActive ? 'text-indigo-200' : 'text-slate-400'}`}>
                  {stage.num}
                </span>
                <span className="text-[11px] font-bold block mt-0.5 leading-tight">{stage.title}</span>
              </button>
            );
          })}
        </div>

        {/* Stage Deep Dive Card */}
        <div className="p-6 bg-white border border-indigo-200 rounded-2xl shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center font-mono font-bold text-indigo-700 text-sm">
                {currentStage.num}
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  STAGE {currentStage.num}: {currentStage.title}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">{currentStage.summary}</p>
              </div>
            </div>
            <Badge variant="indigo" size="sm">
              Deterministic Intelligence Stage
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs pt-1">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
              <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider text-indigo-900">
                1. What Happens
              </span>
              <p className="text-slate-600 leading-relaxed">{currentStage.whatHappens}</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
              <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider text-indigo-900">
                2. Why It Matters
              </span>
              <p className="text-slate-600 leading-relaxed">{currentStage.whyItMatters}</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
              <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider text-indigo-900">
                3. What It Produces
              </span>
              <p className="text-slate-600 leading-relaxed">{currentStage.whatProduces}</p>
            </div>

            <div className="p-3.5 bg-indigo-50/70 rounded-xl border border-indigo-200/80 space-y-1">
              <span className="font-bold text-indigo-950 block text-[11px] uppercase tracking-wider">
                4. Abhishek Mobile Scenario
              </span>
              <p className="text-slate-800 font-medium leading-relaxed">{currentStage.scenarioExample}</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 — PROBLEM → DETECTION → DECISION STORY (Reasoning Pipeline)
          ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 font-mono">
            COGNITIVE REASONING ARCHITECTURE
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            How Raw Data Becomes a Prioritized Decision
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            A transparent 8-step pipeline transforming messy retail counter transactions into measurable financial surplus.
          </p>
        </div>

        {/* Visual Flow Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Step 1 */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-slate-400">01 • INGESTION</span>
              <Database className="w-4 h-4 text-indigo-600" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Raw Business Data</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Paytm QR settlements, SBI bank statement, supplier bill BILL-SUP-201, and paper Khata entries.
            </p>
            <span className="text-[10px] font-semibold text-slate-500 block pt-1 border-t border-slate-100">
              42 daily transactions ingested
            </span>
          </div>

          {/* Step 2 */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-slate-400">02 • SCHEMA</span>
              <Layers className="w-4 h-4 text-indigo-600" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Normalization</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Deduplicates transactions, calculates aging brackets, and binds customer contacts to receivables.
            </p>
            <span className="text-[10px] font-semibold text-slate-500 block pt-1 border-t border-slate-100">
              Canonical ledger unified
            </span>
          </div>

          {/* Step 3 */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-slate-400">03 • TELEMETRY</span>
              <Cpu className="w-4 h-4 text-indigo-600" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Financial Signals</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Monitors daily burn rate (₹3,570/d), runway (11.4 days), and flags vendor cliff due in 5 days.
            </p>
            <span className="text-[10px] font-semibold text-rose-600 block pt-1 border-t border-slate-100">
              Cliff threshold triggered
            </span>
          </div>

          {/* Step 4 */}
          <div className="p-4 bg-white rounded-2xl border border-rose-200 bg-rose-50/30 shadow-xs space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-rose-600">04 • DETECTION</span>
              <AlertTriangle className="w-4 h-4 text-rose-600" />
            </div>
            <h3 className="font-bold text-rose-950 text-sm">Opportunity Detection</h3>
            <p className="text-rose-900/80 text-xs leading-relaxed">
              Identifies that ₹45,000 obligation exceeds ₹40,607 cash by ₹4,393; pinpoints ₹11.5K trapped capital.
            </p>
            <span className="text-[10px] font-bold text-rose-700 block pt-1 border-t border-rose-200">
              -₹4,393 deficit exposure
            </span>
          </div>

          {/* Step 5 */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-slate-400">05 • TRUTH</span>
              <FileCheck className="w-4 h-4 text-indigo-600" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Evidence Proof</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Binds detection to invoice BILL-SUP-201, Khata ledgers INV-REC-101/103, and SKU idle counters.
            </p>
            <span className="text-[10px] font-semibold text-indigo-600 block pt-1 border-t border-slate-100">
              Clickable in Evidence Drawer
            </span>
          </div>

          {/* Step 6 */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-slate-400">06 • RANKING</span>
              <Split className="w-4 h-4 text-indigo-600" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Prioritized Decision</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Ranks actionable paths by capital yield, relationship friction, and speed of liquidity release.
            </p>
            <span className="text-[10px] font-semibold text-emerald-700 block pt-1 border-t border-slate-100">
              ₹11,500 recovery potential
            </span>
          </div>

          {/* Step 7 */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-slate-400">07 • CONSENT</span>
              <CheckSquare className="w-4 h-4 text-indigo-600" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Merchant Action</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Abhishek grants 1-click approval to dispatch WhatsApp UPI paylinks and display counter flash standees.
            </p>
            <span className="text-[10px] font-semibold text-slate-500 block pt-1 border-t border-slate-100">
              Human-in-the-loop audit
            </span>
          </div>

          {/* Step 8 */}
          <div className="p-4 bg-white rounded-2xl border border-emerald-200 bg-emerald-50/30 shadow-xs space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-emerald-700">08 • TELEMETRY</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="font-bold text-emerald-950 text-sm">Measured Outcome</h3>
            <p className="text-emerald-900/80 text-xs leading-relaxed">
              Ingests recovered funds; verifies ₹11,500 capital gain, flipping -₹4,393 cliff to +₹7,107 surplus.
            </p>
            <span className="text-[10px] font-bold text-emerald-700 block pt-1 border-t border-emerald-200">
              +₹7,107 net surplus achieved
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 — "WHY NOT JUST A DASHBOARD?" (Critical Differentiator)
          ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 font-mono">
              PARADIGM SHIFT
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Why Not Just an Analytics Dashboard?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Dashboards tell the merchant what already happened. MerchantMind acts as your continuous business finance team.
            </p>
          </div>

          {/* Side by Side Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditional Dashboard */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-800">Traditional Dashboard</h3>
                  <span className="text-xs text-slate-500 font-medium">&ldquo;Here are your numbers.&rdquo;</span>
                </div>
                <Badge variant="slate" size="sm">Passive Analytics</Badge>
              </div>

              <div className="space-y-3.5 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold shrink-0 text-[11px] mt-0.5">✕</span>
                  <div>
                    <strong className="text-slate-800 block">Backward-Looking Charts</strong>
                    <span>Shows historical sales curves and past receipts without predicting impending working capital cliffs.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold shrink-0 text-[11px] mt-0.5">✕</span>
                  <div>
                    <strong className="text-slate-800 block">Siloed Data Tables</strong>
                    <span>Cash balance is shown in one tab, supplier payables in another, and Khata in a notebook; no unified gap math.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold shrink-0 text-[11px] mt-0.5">✕</span>
                  <div>
                    <strong className="text-slate-800 block">Burden on the Merchant</strong>
                    <span>Forces the proprietor to spend evenings calculating cashflow spreadsheets instead of running the counter.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold shrink-0 text-[11px] mt-0.5">✕</span>
                  <div>
                    <strong className="text-slate-800 block">Zero Action Capability</strong>
                    <span>Only displays static graphs; cannot draft WhatsApp UPI payment reminders or simulate clearance bundles.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* MerchantMind */}
            <div className="p-6 bg-indigo-50/60 rounded-2xl border border-indigo-200 space-y-5">
              <div className="flex items-center justify-between border-b border-indigo-200 pb-3">
                <div>
                  <h3 className="text-base font-bold text-indigo-950">MerchantMind Intelligent OS</h3>
                  <span className="text-xs text-indigo-700 font-medium">&ldquo;Here is what needs attention and what to do.&rdquo;</span>
                </div>
                <Badge variant="indigo" size="sm">Active Decision Support</Badge>
              </div>

              <div className="space-y-3.5 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-indigo-950 block">Forward-Looking Liquidity Cliffs</strong>
                    <span>Predicts that ₹45K supplier bill due in 5 days creates an immediate -₹4,393 gap based on current ₹40,607 cash.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-indigo-950 block">Evidence-First Mathematical Proof</strong>
                    <span>Every alert is traced to canonical invoice records (BILL-SUP-201) with zero hallucinated calculations.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-indigo-950 block">Ranked Operational Solutions</strong>
                    <span>Formulates concrete recovery steps: +₹3,700 from overdue Khata + +₹7,800 from dead stock = +₹11,500 recovery.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-indigo-950 block">1-Click Human-in-the-Loop Execution</strong>
                    <span>Abhishek reviews pre-drafted WhatsApp UPI paylinks and dispatches them with 1 tap, turning deficit into +₹7,107 surplus.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6 — EVIDENCE-FIRST INTELLIGENCE (Verifiable Proof)
          ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 font-mono">
              ZERO HALLUCINATION GROUND TRUTH
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Evidence-First Intelligence: Traced to Canonical Records
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              MerchantMind never produces mysterious AI assertions. Every critical finding answers <strong>WHAT</strong>, <strong>WHY</strong>, <strong>EVIDENCE</strong>, <strong>IMPACT</strong>, and <strong>OPTIONS</strong> with clickable audit proof.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Click any record below to test Evidence Drawer:
          </span>
        </div>

        {/* Visual Example Box: Opportunity Structure */}
        <div className="p-6 bg-white border border-indigo-200 rounded-3xl shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Badge variant="rose" size="sm">CRITICAL OPPORTUNITY</Badge>
              <h3 className="text-sm font-bold text-slate-900">
                Supplier Payment Pressure & Liquidity Shortfall
              </h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => openEvidenceDrawer('evi_01')}
              className="text-xs border-indigo-300 text-indigo-700 hover:bg-indigo-50"
            >
              <span>Inspect Source Record (BILL-SUP-201) &rarr;</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Opportunity</span>
              <strong className="text-slate-900 block font-sans">Supplier Pressure</strong>
              <p className="text-slate-500 text-[11px] leading-snug">Wholesale distributor bill due in 5 days.</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Why</span>
              <strong className="text-slate-900 block font-sans">Cash Deficit</strong>
              <p className="text-slate-500 text-[11px] leading-snug">₹40,607 cash vs ₹45,000 supplier liability.</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Evidence</span>
              <strong className="text-indigo-600 block font-mono">BILL-SUP-201</strong>
              <p className="text-slate-500 text-[11px] leading-snug">Sharma Telecom Distributor verified invoice.</p>
            </div>

            <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-200 space-y-1">
              <span className="text-[10px] font-bold text-rose-700 uppercase font-mono block">Impact</span>
              <strong className="text-rose-700 block font-mono">-₹4,393 Deficit</strong>
              <p className="text-rose-900/80 text-[11px] leading-snug">Overdraft or bounced payment hazard.</p>
            </div>

            <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-1">
              <span className="text-[10px] font-bold text-emerald-700 uppercase font-mono block">Options</span>
              <strong className="text-emerald-700 block font-sans">+₹11,500 Recovery</strong>
              <p className="text-emerald-900/80 text-[11px] leading-snug">Khata collection + Dead stock clearance.</p>
            </div>
          </div>
        </div>

        {/* 4 Interactive Clickable Source Records */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card
            onClick={() => openEvidenceDrawer('evi_01')}
            className="p-4 cursor-pointer hover:border-indigo-400 hover:shadow-xs transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-slate-900">BILL-SUP-201</span>
              <Badge variant="rose" size="sm">Payable (5d)</Badge>
            </div>
            <div className="text-base font-bold font-mono text-slate-900">{formatINR(45000)}</div>
            <p className="text-xs text-slate-600 leading-snug">
              Sharma Telecom wholesale bill due on Oct 09, 2026.
            </p>
            <span className="text-[11px] font-semibold text-indigo-600 flex items-center gap-1 pt-1">
              <span>Inspect Proof</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </Card>

          <Card
            onClick={() => openEvidenceDrawer('evi_02')}
            className="p-4 cursor-pointer hover:border-indigo-400 hover:shadow-xs transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-slate-900">INV-REC-101</span>
              <Badge variant="amber" size="sm">Khata 38d</Badge>
            </div>
            <div className="text-base font-bold font-mono text-slate-900">{formatINR(2200)}</div>
            <p className="text-xs text-slate-600 leading-snug">
              Amit Verma display assembly repair overdue.
            </p>
            <span className="text-[11px] font-semibold text-indigo-600 flex items-center gap-1 pt-1">
              <span>Inspect Proof</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </Card>

          <Card
            onClick={() => openEvidenceDrawer('evi_02')}
            className="p-4 cursor-pointer hover:border-indigo-400 hover:shadow-xs transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-slate-900">INV-REC-103</span>
              <Badge variant="amber" size="sm">Khata 34d</Badge>
            </div>
            <div className="text-base font-bold font-mono text-slate-900">{formatINR(1500)}</div>
            <p className="text-xs text-slate-600 leading-snug">
              Neha Sharma wireless earbuds purchase overdue.
            </p>
            <span className="text-[11px] font-semibold text-indigo-600 flex items-center gap-1 pt-1">
              <span>Inspect Proof</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </Card>

          <Card
            onClick={() => openEvidenceDrawer('evi_03')}
            className="p-4 cursor-pointer hover:border-indigo-400 hover:shadow-xs transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-slate-900">SKU-CS-IP11</span>
              <Badge variant="slate" size="sm">Dead Stock</Badge>
            </div>
            <div className="text-base font-bold font-mono text-slate-900">{formatINR(6000)}</div>
            <p className="text-xs text-slate-600 leading-snug">
              iPhone 11 rugged cases 47 days idle (0 sales turns).
            </p>
            <span className="text-[11px] font-semibold text-indigo-600 flex items-center gap-1 pt-1">
              <span>Inspect Proof</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </Card>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7 — ACTION LOOP (Interactive Simulated Execution)
          ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 font-mono">
                ACTION LOOP SIMULATION
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                From Signal Detection to Measured Business Outcome
              </h3>
              <p className="text-xs text-slate-500">
                Demonstrates how MerchantMind maintains human-in-the-loop control while automating routine follow-up.
              </p>
            </div>
            <Badge variant="indigo" size="sm">
              Interactive Prototype Demo
            </Badge>
          </div>

          {/* Stepper Flow */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                <span className="font-mono font-bold text-slate-400 block text-[10px]">1. SIGNAL & PROBLEM</span>
                <span className="font-bold text-slate-900 block">Amit Verma Overdue Khata (₹2,200)</span>
                <p className="text-slate-500 text-[11px]">38 days past maturity date. Zero formal reminder dispatched this week.</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                <span className="font-mono font-bold text-slate-400 block text-[10px]">2. RECOMMENDED ACTION</span>
                <span className="font-bold text-slate-900 block">Polite WhatsApp UPI Paylink</span>
                <p className="text-slate-500 text-[11px]">Personalized greeting with verified invoice breakdown and 1-tap QR link.</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                <span className="font-mono font-bold text-slate-400 block text-[10px]">3. MERCHANT APPROVAL & DISPATCH</span>
                <div className="flex items-center gap-2 pt-1">
                  {simStep === 'initial' && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setSimStep('approved')}
                      className="text-xs bg-indigo-600 hover:bg-indigo-700 w-full"
                    >
                      <CheckSquare className="w-3.5 h-3.5 mr-1" />
                      <span>Approve in Demo</span>
                    </Button>
                  )}
                  {simStep === 'approved' && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        setSimStep('executing');
                        setTimeout(() => setSimStep('completed'), 900);
                      }}
                      className="text-xs bg-emerald-600 hover:bg-emerald-700 w-full"
                    >
                      <Play className="w-3.5 h-3.5 mr-1" />
                      <span>Simulate Dispatch</span>
                    </Button>
                  )}
                  {simStep === 'executing' && (
                    <div className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 py-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                      <span>Dispatching simulated WhatsApp payload...</span>
                    </div>
                  )}
                  {simStep === 'completed' && (
                    <div className="w-full space-y-1 text-center">
                      <Badge variant="emerald" size="sm" className="w-full justify-center">
                        Simulated Recovery Tracked!
                      </Badge>
                      <button
                        onClick={() => setSimStep('initial')}
                        className="text-[10px] text-slate-400 hover:text-slate-600 underline cursor-pointer"
                      >
                        Reset interaction
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {simStep === 'completed' && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>
                    <strong>Outcome Measured:</strong> Simulated settlement confirmation ingested. ₹2,200 recovered into SBI Current Account, reducing overdue exposure to ₹1,500.
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleLaunchApp('actions')}
                  className="text-xs border-emerald-300 text-emerald-900"
                >
                  <span>View in Action Center &rarr;</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8 — PAYTM ECOSYSTEM SECTION (Honest Framing & 6 Integration Surfaces)
          ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-cyan-800/50 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-950 border border-cyan-600/40 text-[11px] font-semibold text-cyan-300">
                <QrCode className="w-3.5 h-3.5" />
                <span>Paytm Commerce Ecosystem Synergy</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
                How Paytm Telemetry Supercharges Merchant Intelligence
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="indigo" size="sm" className="bg-cyan-500/20 text-cyan-300 border-cyan-500/40">
                Current Demo: Simulated Feed
              </Badge>
              <Badge variant="slate" size="sm" className="bg-slate-800 text-slate-300 border-slate-700">
                Production: Integration-Ready
              </Badge>
            </div>
          </div>

          {/* Conceptual Pipeline Flow */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-cyan-900/60 font-mono text-xs">
            <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block mb-2">
              CONCEPTUAL TELEMETRY FLOW
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-slate-300 text-[11px]">
              <div className="p-2 bg-slate-900 rounded border border-slate-800 text-cyan-300 font-semibold">
                PAYTM QR / SOUNDBOX
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800 text-slate-400 font-semibold">
                &rarr; MERCHANTMIND
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800 text-slate-400 font-semibold">
                &rarr; NORMALIZE
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800 text-slate-400 font-semibold">
                &rarr; MONITOR
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800 text-rose-300 font-semibold">
                &rarr; DETECT
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800 text-amber-300 font-semibold">
                &rarr; DECISION
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800 text-emerald-300 font-semibold">
                &rarr; ACTION
              </div>
            </div>
          </div>

          {/* 6 Realistic Integration Surfaces */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-800/80 rounded-xl border border-cyan-900/50 space-y-1.5">
              <strong className="text-cyan-300 text-xs block">1. Payment Activity</strong>
              <p className="text-xs text-slate-300 leading-relaxed">
                Soundbox voice announcements and All-in-One QR events provide instantaneous confirmation of cash inflows without waiting for bank end-of-day reports.
              </p>
            </div>

            <div className="p-4 bg-slate-800/80 rounded-xl border border-cyan-900/50 space-y-1.5">
              <strong className="text-cyan-300 text-xs block">2. Settlement Visibility</strong>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tracks T+0 on-demand and T+1 automated settlement disbursements into the merchant SBI current account, auto-matching sales slips against bank balances.
              </p>
            </div>

            <div className="p-4 bg-slate-800/80 rounded-xl border border-cyan-900/50 space-y-1.5">
              <strong className="text-cyan-300 text-xs block">3. Merchant Transaction Telemetry</strong>
              <p className="text-xs text-slate-300 leading-relaxed">
                Analyzes counter ticket size distribution, average ticket values (₹340), and customer payment velocities to isolate busy versus sluggish hours.
              </p>
            </div>

            <div className="p-4 bg-slate-800/80 rounded-xl border border-cyan-900/50 space-y-1.5">
              <strong className="text-cyan-300 text-xs block">4. Payment Trends</strong>
              <p className="text-xs text-slate-300 leading-relaxed">
                Monitors day-of-week inflow patterns and seasonal velocity to adjust rolling 14-day cashflow models and safety buffer requirements.
              </p>
            </div>

            <div className="p-4 bg-slate-800/80 rounded-xl border border-cyan-900/50 space-y-1.5">
              <strong className="text-cyan-300 text-xs block">5. Business Health Signals</strong>
              <p className="text-xs text-slate-300 leading-relaxed">
                Continuously recalculates working capital runway (11.4 days) and liquidity coverage (0.90x) based on real-time transaction run rates.
              </p>
            </div>

            <div className="p-4 bg-slate-800/80 rounded-xl border border-cyan-900/50 space-y-1.5">
              <strong className="text-cyan-300 text-xs block">6. Actionable Merchant Insights</strong>
              <p className="text-xs text-slate-300 leading-relaxed">
                Powers 1-click dynamic Paytm UPI QR paylinks dispatched via WhatsApp to overdue Khata customers and alerts the merchant 5 days ahead of vendor cliffs.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-3">
            <span>
              <strong>Engineering Transparency:</strong> MerchantMind does not claim live private Paytm API access in this hackathon demo. It features an integration-ready schema consuming standard webhook payloads.
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleLaunchApp('paytm-ecosystem')}
              className="text-xs border-cyan-700 text-cyan-300 hover:bg-cyan-950"
            >
              <span>Explore Paytm View &rarr;</span>
            </Button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9 — ARCHITECTURE STORY (10-Tier Flow & AI Boundary)
          ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 font-mono">
            SYSTEM ARCHITECTURE & TECHNICAL INTEGRITY
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Decoupled Architecture with Deterministic Financial Ground Truth
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            A clear architectural boundary separates deterministic financial calculations from conversational AI overlays.
          </p>
        </div>

        <div className="p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 font-mono text-xs space-y-6 shadow-xl">
          {/* 10-Tier Architectural Flow */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
              10-TIER PLATFORM PIPELINE
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center">
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-indigo-400 font-bold block text-[10px]">1. DATA SOURCES</span>
                <span className="text-slate-300 text-[10px] block mt-0.5">Paytm • Banks • POS</span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-indigo-400 font-bold block text-[10px]">2. CONNECTORS</span>
                <span className="text-slate-300 text-[10px] block mt-0.5">Webhooks & Batch AA</span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-cyan-400 font-bold block text-[10px]">3. CANONICAL MODEL</span>
                <span className="text-slate-300 text-[10px] block mt-0.5">Unified Ledger Schema</span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-cyan-400 font-bold block text-[10px]">4. ANALYTICS ENGINE</span>
                <span className="text-slate-300 text-[10px] block mt-0.5">Runway & Burn Math</span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-rose-400 font-bold block text-[10px]">5. SIGNAL DETECTION</span>
                <span className="text-slate-300 text-[10px] block mt-0.5">Cliff & Khata Alerts</span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-amber-400 font-bold block text-[10px]">6. OPPORTUNITY ENGINE</span>
                <span className="text-slate-300 text-[10px] block mt-0.5">Impact & Gain Ranking</span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-amber-400 font-bold block text-[10px]">7. EVIDENCE LAYER</span>
                <span className="text-slate-300 text-[10px] block mt-0.5">Source Record Proof</span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-emerald-400 font-bold block text-[10px]">8. ACTION ENGINE</span>
                <span className="text-slate-300 text-[10px] block mt-0.5">Human Approval Gate</span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-emerald-400 font-bold block text-[10px]">9. OUTCOME ENGINE</span>
                <span className="text-slate-300 text-[10px] block mt-0.5">Measured Delta Loop</span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-purple-400 font-bold block text-[10px]">10. AI / COPILOT</span>
                <span className="text-slate-300 text-[10px] block mt-0.5">Natural Lang Overlay</span>
              </div>
            </div>
          </div>

          {/* Strict Deterministic Truth Boundary */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs font-sans text-slate-300 space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <strong className="text-white text-sm font-semibold">
                Deterministic Financial Truth vs AI / Copilot Boundary
              </strong>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-emerald-400 block font-mono text-[11px] uppercase">
                  DETERMINISTIC FINANCIAL ENGINE (TRUTH)
                </span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Financial balances, cashflow runway, aging days, and supplier deficits are calculated exclusively with deterministic arithmetic. We never allow probabilistic models to fabricate account balances, invent phantom liabilities, or guess payment amounts.
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-purple-400 block font-mono text-[11px] uppercase">
                  AI & COPILOT OVERLAY (SYNTHESIS)
                </span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Generative AI and LLMs are deployed strictly as conversational assistants: natural language queries (&ldquo;Can I afford to restock smartwatches this week?&rdquo;), polite WhatsApp reminder tone synthesis, and explainable summaries grounded in canonical JSON.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <span className="text-slate-400 text-xs font-mono">
              Architecture Standard: Zero Hallucination • Audit Logged • Tenant Isolated
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleLaunchApp('architecture')}
              className="border-slate-700 text-slate-200 text-xs shrink-0"
            >
              <span>View Full Architecture Blueprint &rarr;</span>
            </Button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9.5 — PRODUCT EXPLANATION & ARCHITECTURAL FOUNDATION (14 Answers)
          ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <ProductFaqGrid />
      </section>

      {/* =========================================================================
          SECTION 10 — FINAL CALL TO ACTION (Judge Evaluation Entry)
          ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-semibold text-xs border border-indigo-200">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Srijan 2k26 Evaluation Showcase • Team Aarambh Coders</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Ready to experience MerchantMind in action?
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Launch Abhishek Kumar&rsquo;s live command center, inspect his ₹4,393 cash cliff in the Evidence Drawer, and watch simulated recovery actions resolve the deficit into a safe operating buffer.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={() => handleLaunchApp('command-center')}
            className="shadow-sm shadow-indigo-200 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700"
          >
            <span>Explore Live Demo</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={openTour}
            className="border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50"
          >
            <Play className="w-4 h-4 mr-1.5 text-indigo-600 fill-indigo-600" />
            <span>Take 90-Second Guided Tour</span>
          </Button>
        </div>
      </section>
    </div>
  );
};
