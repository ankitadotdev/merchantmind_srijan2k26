import React, { useState } from 'react';
import {
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Play,
  CheckCircle2,
  Database,
  Layers,
  Activity,
  AlertTriangle,
  FileCheck,
  Split,
  CheckSquare,
  Send,
  BarChart3,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { useMerchant } from '../context/MerchantContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { formatINR } from '../utils/formatters';
import { ProductFaqGrid } from '../components/showcase/ProductFaqGrid';

export const HowItWorksView: React.FC = () => {
  const { openTour, setActiveAppTab, setActiveWorld, openEvidenceDrawer } = useMerchant();
  const [selectedStageIndex, setSelectedStageIndex] = useState(3); // Default to Stage 4: DETECT

  const stages = [
    {
      num: '01',
      title: 'CONNECT',
      icon: Database,
      tag: 'Multi-Modal Ingestion',
      summary: 'Data enters MerchantMind once via merchant payment, banking, and ledger streams.',
      input: 'Paytm All-In-One QR transactions, Soundbox voice events, SBI Current Account NetBanking (via Account Aggregator), and POS / Tally invoice receipts.',
      processing: 'Multi-stream ingestion pipeline runs cryptographic SHA-256 deduplication, payload validation, and format checking.',
      output: 'Normalized, unified stream of raw financial events quarantined against schema mismatches.',
      merchantValue: 'Zero duplicate entry. The merchant continues using their existing QR standee and bank account without changing tools.',
      scenarioDetail: 'Ingests Abhishek’s 42 daily Paytm QR collections and the ₹45,000 Sharma Telecom distributor invoice (BILL-SUP-201).',
    },
    {
      num: '02',
      title: 'UNDERSTAND',
      icon: Layers,
      tag: 'Normalization & Schema',
      summary: 'Disparate multi-format feeds are standardized into a canonical business ledger.',
      input: 'Heterogeneous payment timestamps, gross receipts, vendor bills, customer Khata books, and inventory SKU barcodes.',
      processing: 'Deterministic normalization reconciles payments against orders, maps customer identity across UPI and Khata, and computes SKU turnover velocity.',
      output: 'A canonical unified financial schema: transactions, receivables aging ledger, payables schedule, and inventory stock index.',
      merchantValue: 'Instant single source of truth across bank, counter cash, customer credit, and vendor debt.',
      scenarioDetail: 'Links ₹8,450 Paytm counter collections directly to pending wholesale order lines and customer credit entries.',
    },
    {
      num: '03',
      title: 'MONITOR',
      icon: Activity,
      tag: 'Continuous Financial Radar',
      summary: 'Continuously tracks operational health, cash runway, and working capital ratios.',
      input: 'Daily burn rate (₹3,570/day), current liquid balance (₹40,607), and operating expenditure requirements.',
      processing: 'Calculates 14-day forward liquidity trajectories, liquidity coverage ratios (0.90x), and safe cash reserve thresholds (₹45,000).',
      output: 'Real-time financial health radar highlighting balance shifts and runway days remaining.',
      merchantValue: 'Replaces stressful weekend spreadsheet balancing with continuous, automatic radar monitoring.',
      scenarioDetail: 'Monitors Abhishek’s ₹40,607 cash balance against his 11.4-day operational runway and flags safe minimum buffer deficits.',
    },
    {
      num: '04',
      title: 'DETECT',
      icon: AlertTriangle,
      tag: 'Deterministic Signal Engine',
      summary: 'Deterministic heuristics continuously scan for impending liquidity cliffs & trapped capital.',
      input: 'Upcoming payables maturity dates + customer Khata aging buckets (>30 days) + dead inventory stock velocity (0 sales in 45+ days).',
      processing: 'Deterministic business rules evaluate cash balance vs upcoming liabilities. When liabilities exceed cash within 7 days, an anomaly signal fires.',
      output: 'Prioritized financial opportunities with quantified monetary exposure (-₹4,393 gap) and confidence rating.',
      merchantValue: 'Know what needs attention days before cash gets trapped, avoiding bounced checks and vendor credit freezes.',
      scenarioDetail: 'Flags that ₹45,000 distributor bill due Oct 9 will cause an immediate -₹4,393 liquid cash shortfall against ₹40,607 current cash.',
    },
    {
      num: '05',
      title: 'EXPLAIN',
      icon: FileCheck,
      tag: 'Zero-Hallucination Evidence',
      summary: 'Every flagged anomaly is backed by 100% transparent mathematical proof.',
      input: 'Canonical source records: Invoice BILL-SUP-201, Khata ledgers INV-REC-101/103, and bank balance snapshots.',
      processing: 'Assembles an immutable audit tree linking every arithmetic step (Cash ₹40,607 - Due Bill ₹45,000 = -₹4,393) to original document IDs.',
      output: 'Verifiable Evidence Drawer with clickable invoice lines, timeline events, and formula explanations.',
      merchantValue: 'Zero black-box hallucinations. The merchant can verify every number back to their actual vendor bills and bank receipts.',
      scenarioDetail: 'Abhishek inspects BILL-SUP-201 in the Evidence Drawer to confirm Sharma Telecom’s ₹45,000 bill due in 5 days.',
    },
    {
      num: '06',
      title: 'RECOMMEND',
      icon: Split,
      tag: 'Decision Matrix',
      summary: 'Formulates ranked, trade-off evaluated operational resolutions.',
      input: 'Trapped receivables ledgers (₹3,700), idle accessory inventory (₹10,660), and supplier credit terms.',
      processing: 'Multi-criteria ranking engine calculates expected capital yield, customer relationship friction, and execution turnaround time.',
      output: 'Ranked action cards detailing exact intervention steps, expected recovery amounts, and trade-off considerations.',
      merchantValue: 'Transforms anxiety into clear choices. Instead of generic advice, provides high-yield actionable interventions.',
      scenarioDetail: 'Ranks WhatsApp UPI paylinks to Amit Verma (+₹2,200) and Neha Sharma (+₹1,500) plus a 48-hour dead stock flash bundle (+₹7,800).',
    },
    {
      num: '07',
      title: 'APPROVE',
      icon: CheckSquare,
      tag: 'Human-in-the-Loop Gate',
      summary: 'The merchant retains 100% human-in-the-loop control to authorize execution.',
      input: 'Pre-drafted action payloads (WhatsApp reminder texts with dynamic UPI QR links, inventory clearance pricing).',
      processing: 'Presents explicit merchant approval modal with preview, customizable messaging, and one-click consent logging.',
      output: 'Cryptographically signed merchant execution mandate logged to the immutable audit trail.',
      merchantValue: 'Complete peace of mind. The software never sends messages to customers or triggers payments without explicit merchant sign-off.',
      scenarioDetail: 'Abhishek reviews the polite WhatsApp message draft for Amit Verma, verifies the ₹2,200 amount, and taps "Approve & Dispatch".',
    },
    {
      num: '08',
      title: 'ACT',
      icon: Send,
      tag: 'Omnichannel Execution',
      summary: 'Executes approved actions through simulated or real omnichannel connectors.',
      input: 'Approved action payload, customer contact metadata, and payment collection gateway endpoints.',
      processing: 'Dispatches automated WhatsApp messages containing personalized invoice breakdowns and dynamic 1-tap Paytm UPI payment links.',
      output: 'Real-time dispatch confirmations, delivery telemetry receipts, and outbound interaction logs.',
      merchantValue: 'Executes follow-ups in seconds without the merchant needing to spend hours calling or manually messaging customers.',
      scenarioDetail: 'Simulates instant dispatch of WhatsApp UPI collection link to Amit Verma (38 days overdue) and Neha Sharma (34 days overdue).',
    },
    {
      num: '09',
      title: 'MEASURE',
      icon: BarChart3,
      tag: 'Closed-Loop Telemetry',
      summary: 'Tracks actual business outcomes against projected recovery to close the loop.',
      input: 'Inbound UPI settlement webhooks, SBI current account deposits, and retail POS inventory decrement events.',
      processing: 'Closed-loop telemetry engine computes the net delta between pre-intervention deficit and realized post-action cash balance.',
      output: 'Verified outcome delta report: ₹11,500 total capital unlocked, turning the -₹4,393 deficit into a +₹7,107 liquid cushion.',
      merchantValue: 'Proves tangible business ROI: the merchant immediately sees how much trapped working capital was recovered.',
      scenarioDetail: 'Confirms ₹3,700 Khata recovery + ₹7,800 inventory clearance, ensuring Sharma Telecom’s bill is paid on time with ₹7,107 surplus.',
    },
  ];

  const currentStage = stages[selectedStageIndex];
  const IconComponent = currentStage.icon;

  const handleNextStage = () => {
    setSelectedStageIndex((prev) => (prev < stages.length - 1 ? prev + 1 : 0));
  };

  const handlePrevStage = () => {
    setSelectedStageIndex((prev) => (prev > 0 ? prev - 1 : stages.length - 1));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">How MerchantMind Works</h1>
            <Badge variant="indigo" size="sm">Interactive Tutorial</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            The 9-stage deterministic intelligence lifecycle powering autonomous decision-support
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setActiveWorld('app');
              setActiveAppTab('command-center');
            }}
            className="text-xs border-slate-300"
          >
            <span>Enter Live App</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
          <Button variant="primary" size="sm" onClick={openTour} className="text-xs bg-indigo-600 hover:bg-indigo-700">
            <Play className="w-3.5 h-3.5 mr-1" />
            <span>Launch Judge Tour</span>
          </Button>
        </div>
      </div>

      {/* 9-Stage Interactive Horizontal Stepper */}
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-1.5 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
        {stages.map((stage, idx) => {
          const isSelected = selectedStageIndex === idx;
          const StageIcon = stage.icon;
          return (
            <button
              key={stage.num}
              onClick={() => setSelectedStageIndex(idx)}
              className={`p-2 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between ${isSelected
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                  {stage.num}
                </span>
                <StageIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
              </div>
              <span className="text-[11px] font-bold mt-1 block truncate leading-tight">
                {stage.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Stage Detail Card (Input / Processing / Output / Value) */}
      <div className="bg-white border border-indigo-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* Stage Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-indigo-600 uppercase">
                  STAGE {currentStage.num} OF 09
                </span>
                <Badge variant="indigo" size="sm">{currentStage.tag}</Badge>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                {currentStage.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevStage}
              className="text-xs px-2.5 h-8 border-slate-200"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              <span>Prev</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextStage}
              className="text-xs px-2.5 h-8 border-slate-200"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>

        <p className="text-sm font-medium text-slate-700 leading-relaxed">
          {currentStage.summary}
        </p>

        {/* 4 Architectural Columns: Input, Processing, Output, Merchant Value */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          {/* 1. Input */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                1. INPUT
              </span>
              <h3 className="text-xs font-bold text-slate-900">What Goes In</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {currentStage.input}
              </p>
            </div>
            <span className="text-[10px] text-slate-400 block pt-2 border-t border-slate-200/60 font-medium">
              Data & Signal Ingestion
            </span>
          </div>

          {/* 2. Processing */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 block">
                2. PROCESSING
              </span>
              <h3 className="text-xs font-bold text-slate-900">How It Computes</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {currentStage.processing}
              </p>
            </div>
            <span className="text-[10px] text-indigo-600 block pt-2 border-t border-slate-200/60 font-medium">
              Deterministic Logic
            </span>
          </div>

          {/* 3. Output */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 block">
                3. OUTPUT
              </span>
              <h3 className="text-xs font-bold text-slate-900">What It Produces</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {currentStage.output}
              </p>
            </div>
            <span className="text-[10px] text-emerald-600 block pt-2 border-t border-slate-200/60 font-medium">
              Verifiable Artifacts
            </span>
          </div>

          {/* 4. Merchant Value */}
          <div className="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-200 space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-900 block">
                4. MERCHANT VALUE
              </span>
              <h3 className="text-xs font-bold text-indigo-950">Why It Matters</h3>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {currentStage.merchantValue}
              </p>
            </div>
            <span className="text-[10px] text-indigo-700 block pt-2 border-t border-indigo-200/60 font-medium">
              Commercial Impact
            </span>
          </div>
        </div>

        {/* Real Demo Example Banner */}
        <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1 max-w-3xl">
            <div className="flex items-center gap-2">
              <Badge variant="indigo" size="sm" className="bg-indigo-500/20 text-indigo-300 border-indigo-500/40">
                Abhishek Mobile & Accessories Real Scenario
              </Badge>
              <span className="text-xs text-slate-400 font-mono">Hazratganj Market, Lucknow</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              {currentStage.scenarioDetail}
            </p>
          </div>

          {currentStage.num === '05' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => openEvidenceDrawer('evi_01')}
              className="border-indigo-400 text-indigo-200 hover:bg-slate-800 text-xs shrink-0"
            >
              <span>Test Evidence Drawer &rarr;</span>
            </Button>
          )}

          {currentStage.num !== '05' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setActiveWorld('app');
                setActiveAppTab('command-center');
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-xs shrink-0"
            >
              <span>View in Command Center &rarr;</span>
            </Button>
          )}
        </div>
      </div>

      {/* Comprehensive 9-Stage Summary Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
          All 9 Stages at a Glance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {stages.map((stage, idx) => (
            <div
              key={stage.num}
              onClick={() => setSelectedStageIndex(idx)}
              className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${selectedStageIndex === idx
                ? 'bg-indigo-50/70 border-indigo-300 shadow-2xs'
                : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-indigo-600">{stage.num}</span>
                <span className="text-[10px] text-slate-400 font-medium">{stage.tag}</span>
              </div>
              <h4 className="font-bold text-slate-900 mt-1">{stage.title}</h4>
              <p className="text-slate-600 text-[11px] mt-0.5 leading-snug line-clamp-2">
                {stage.summary}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 14 Core Platform Architectural Answers */}
      <ProductFaqGrid />
    </div>
  );
};
