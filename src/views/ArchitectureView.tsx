import React from 'react';
import {
  Network,
  Database,
  Cpu,
  ShieldCheck,
  Zap,
  Lock,
  Code2,
  Layers,
  ArrowRight,
  CheckCircle2,
  FileCheck,
  Split,
  BarChart3,
  Bot,
  ExternalLink,
  Radio,
  Clock,
  Sparkles,
  ArrowDown,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useMerchant } from '../context/MerchantContext';

export const ArchitectureView: React.FC = () => {
  const { setActiveAppTab, setActiveWorld, openEvidenceDrawer } = useMerchant();

  const deterministicPipeline = [
    {
      step: '01',
      name: 'DATA SOURCES',
      badge: 'Multi-Stream Feeds',
      color: 'border-indigo-500/40 text-indigo-400',
      description: 'Paytm All-In-One QR standees, Soundbox audio triggers, SBI Current Account NetBanking (via Account Aggregator), Retail Smart POS, and wholesale supplier invoices.',
      scenarioSpec: 'Ingests Abhishek’s 42 daily Paytm QR transactions, bank balance, and wholesale invoice BILL-SUP-201 from Sharma Telecom.',
    },
    {
      step: '02',
      name: 'CONNECTORS',
      badge: 'Edge Handlers',
      color: 'border-indigo-500/40 text-indigo-400',
      description: 'Lightweight daemon bridges and webhook receivers establishing mutual mTLS channels and streaming raw payload batches.',
      scenarioSpec: 'Paytm webhook receiver, SBI Account Aggregator polling daemon, and supplier invoice connectors.',
    },
    {
      step: '03',
      name: 'INGESTION',
      badge: 'Sanitization & Quarantine',
      color: 'border-cyan-500/40 text-cyan-400',
      description: 'Deduplication engine computing SHA-256 payload checksums, schema verification, and isolating corrupted/incomplete rows into quarantine.',
      scenarioSpec: 'Quarantines ambiguous rows with missing GSTIN while accepting 100% of verified payment streams.',
    },
    {
      step: '04',
      name: 'NORMALIZATION',
      badge: 'Schema Translation',
      color: 'border-cyan-500/40 text-cyan-400',
      description: 'Maps heterogeneous provider formats into standardized financial primitives (Transaction, LedgerEntry, InvoiceObligation, SupplierPayable).',
      scenarioSpec: 'Translates Paytm QR callbacks and supplier purchase vouchers into a common normalized structure.',
    },
    {
      step: '05',
      name: 'CANONICAL DATA MODEL',
      badge: 'Single Source of Truth',
      color: 'border-cyan-500/40 text-cyan-400',
      description: 'Unified relational and time-series model maintaining immutable lineage, balance tables, and historical audit entries.',
      scenarioSpec: 'Reconciles ₹40,607 liquid bank balance, ₹45,000 Sharma Telecom payable, and rolling 14-day cashflow trajectories.',
    },
    {
      step: '06',
      name: 'ANALYTICS',
      badge: 'Time-Series Modeling',
      color: 'border-amber-500/40 text-amber-400',
      description: 'Computes rolling daily burn rate, working capital runway (11.4 days), liquidity coverage (0.90x), and projects 14-day cash trajectories.',
      scenarioSpec: 'Calculates that safe operational cash is ₹45,000, identifying an upcoming deficit 5 days in advance.',
    },
    {
      step: '07',
      name: 'SIGNALS',
      badge: 'Deterministic Anomaly Triggers',
      color: 'border-rose-500/40 text-rose-400',
      description: 'Autonomous heuristic radar firing signals when liabilities exceed available cash or cash drops below minimum operating buffers.',
      scenarioSpec: 'Generates SIG-LIQ-CLIFF (-₹4,393 on Oct 9) and SIG-CASH-BUFFER (operating cash below safe target).',
    },
    {
      step: '08',
      name: 'OPPORTUNITY ENGINE',
      badge: 'Multi-Criteria Ranking',
      color: 'border-amber-500/40 text-amber-400',
      description: 'Formulates and prioritizes quantified financial interventions by weighing recovery potential, relationship risk, and execution turnaround.',
      scenarioSpec: 'Formulates OPP-01: Bridge the ₹4,393 cliff via 7-day payment tranche split (₹25K on Oct 9 + ₹20K on Oct 16, yielding +₹20K deferral buffer).',
    },
    {
      step: '09',
      name: 'DECISION / ACTION ENGINE',
      badge: 'Human-in-the-Loop Gateway',
      color: 'border-emerald-500/40 text-emerald-400',
      description: 'Compiles executable dispatch payloads (supplier restructuring proposals and customer loyalty campaigns) requiring explicit merchant approval.',
      scenarioSpec: 'Presents 1-click approval for Action #ACT-03 to Sharma Telecom (₹20,000 split deferral). Never executes disbursements without proprietor consent.',
    },
    {
      step: '10',
      name: 'OUTCOME MEASUREMENT',
      badge: 'Closed-Loop Verification',
      color: 'border-emerald-500/40 text-emerald-400',
      description: 'Monitors downstream inbound banking settlements and outbound supplier disbursements to verify actual delta against projected recovery.',
      scenarioSpec: 'Confirms payment split execution, securing Abhishek\'s position from -₹4,393 to +₹15,607 safe cushion.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">System Architecture & Technical Rigor</h1>
            <Badge variant="indigo" size="sm">Architecture Blueprint</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Data pipeline topology, deterministic financial ground truth, and clear separation from optional AI copilot layers
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => openEvidenceDrawer('evi_01')}
            className="text-xs border-slate-300"
          >
            <span>Inspect Evidence Proof</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setActiveWorld('app');
              setActiveAppTab('command-center');
            }}
            className="text-xs bg-indigo-600 hover:bg-indigo-700"
          >
            <span>Live App View &rarr;</span>
          </Button>
        </div>
      </div>

      {/* Visually Separated Architecture Overview: Deterministic Core vs Optional AI Copilot Layer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Core 1: Deterministic Engine */}
        <Card className="p-5 space-y-2.5 border-emerald-300 bg-emerald-50/20 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">
                1. THE DETERMINISTIC CORE (Financial Ground Truth)
              </h3>
            </div>
            <Badge variant="emerald" size="sm">
              Primary System of Record
            </Badge>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            All financial calculations, ledger balances, cash deficits, supplier runway trajectories, and invoice due dates are executed by <strong>deterministic algorithms</strong>.
            <strong>LLMs do NOT calculate numbers, invent balances, or make financial decisions.</strong> Every calculation is 100% reproducible and auditable.
          </p>
          <div className="p-2.5 bg-white/80 rounded-lg border border-emerald-200 text-[11px] font-mono text-emerald-800 space-y-1">
            <div>✓ Immutable Lineage & Audit Trail</div>
            <div>✓ Traceable Evidence Records (Invoice BILL-SUP-201, Ledgers)</div>
            <div>✓ Zero Hallucination Guarantee</div>
          </div>
        </Card>

        {/* Core 2: Optional AI Copilot Layer */}
        <Card className="p-5 space-y-2.5 border-purple-300 bg-purple-50/20 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-600" />
              <h3 className="text-sm font-bold text-slate-900">
                2. OPTIONAL AI / COPILOT LAYER (Natural Language Assistant)
              </h3>
            </div>
            <Badge variant="indigo" size="sm" className="bg-purple-100 text-purple-800 border-purple-200">
              Conversational Overlay
            </Badge>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Generative AI sits strictly above the deterministic core as a natural-language copilot. It translates canonical JSON state into conversational Hindi/English voice summaries, answers proprietor questions, and tailors courteous WhatsApp reminder tones.
          </p>
          <div className="p-2.5 bg-white/80 rounded-lg border border-purple-200 text-[11px] font-mono text-purple-800 space-y-1">
            <div>✓ Strictly Grounded in Canonical State</div>
            <div>✓ Context-Aware WhatsApp Tone Crafting</div>
            <div>✓ Voice Query Translation for Non-Technical Merchants</div>
          </div>
        </Card>
      </div>

      {/* 10-Step Deterministic End-to-End Pipeline Card */}
      <Card id="tour-architecture-pipeline" className="bg-slate-950 text-white border-slate-800 p-6 space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold block">
              CANONICAL DATA PIPELINE TOPOLOGY
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
              DATA SOURCES &rarr; CONNECTORS &rarr; INGESTION &rarr; NORMALIZATION &rarr; CANONICAL MODEL &rarr; ANALYTICS &rarr; SIGNALS &rarr; OPPORTUNITIES &rarr; DECISION/ACTION &rarr; MEASUREMENT
            </h3>
          </div>
          <Badge variant="indigo" size="sm" className="bg-indigo-900/60 text-indigo-200 border-indigo-700">
            10-Stage Pipeline
          </Badge>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {deterministicPipeline.map((step, idx) => (
            <div
              key={step.step}
              className={`p-3.5 bg-slate-900 rounded-xl border ${step.color} space-y-1.5 transition-all hover:bg-slate-850`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs bg-slate-800 px-2 py-0.5 rounded border border-slate-700 text-white">
                    STEP {step.step}
                  </span>
                  <span className="font-bold text-xs text-white">{step.name}</span>
                </div>
                <Badge variant="slate" size="sm" className="bg-slate-800 text-slate-300 border-slate-700">
                  {step.badge}
                </Badge>
              </div>

              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                {step.description}
              </p>

              <div className="p-2 bg-slate-950/80 rounded-lg text-[11px] font-sans text-slate-400 border border-slate-800 flex items-start gap-1.5">
                <strong className="text-indigo-400 shrink-0">Abhishek Mobile Scenario:</strong>
                <span>{step.scenarioSpec}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Security & Multi-Tenant Isolation */}
      <Card className="p-5 space-y-3 bg-white">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-900">Security, Tenant Isolation & Governance Guarantees</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-semibold">Tenant Isolation</strong>
            <p className="text-slate-600 text-[11px] leading-snug">
              Strict cryptographic separation per GSTIN. Cross-tenant leakage is architecturally prohibited.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-semibold">Immutable Audit Log</strong>
            <p className="text-slate-600 text-[11px] leading-snug">
              Every data sync, signal generation, and action authorization is permanently recorded in the audit trail.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-semibold">Evidence Tracing</strong>
            <p className="text-slate-600 text-[11px] leading-snug">
              Every flagged risk traces directly to source documents (e.g. BILL-SUP-201, INV-REC-101).
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-semibold">No Fake APIs</strong>
            <p className="text-slate-600 text-[11px] leading-snug">
              Simulated feeds are transparently labeled as demo feeds. Production connectors follow published specs.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
