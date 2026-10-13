import React, { useState } from 'react';
import {
  HelpCircle,
  ShieldCheck,
  Zap,
  Layers,
  Database,
  Search,
  CheckCircle2,
  Lock,
  QrCode,
  TrendingUp,
  Cpu,
  Bot,
  Activity,
  ChevronDown,
  Sparkles,
  Users,
  AlertTriangle,
  Radio,
  Eye,
  Calculator,
  CheckSquare,
  FileText,
  ChevronUp,
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface FaqItem {
  id: string;
  question: string;
  category: string;
  badge: string;
  shortAnswer: string;
  detail: string;
  highlights: string[];
  keyMetric: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeVariant: 'indigo' | 'emerald' | 'amber' | 'rose' | 'slate' | 'cyan';
}

export const ProductFaqGrid: React.FC = () => {
  // Allow multiple open questions or toggle individual ones
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(['q1', 'q2', 'q3']));
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const faqs: FaqItem[] = [
    {
      id: 'q1',
      question: 'WHAT IS MERCHANTMIND?',
      category: 'CORE',
      badge: 'Platform Definition',
      icon: Sparkles,
      badgeVariant: 'indigo',
      shortAnswer: 'An autonomous financial intelligence & decision operating system that protects retail merchant liquidity.',
      detail:
        'MerchantMind continuously connects to merchant payment terminals, bank feeds, point-of-sale registers, and customer Khata ledgers. It detects working capital cliffs 5–14 days in advance, formulates quantified internal recovery options, and verifies business outcomes upon proprietor approval.',
      highlights: [
        'Continuous autonomous monitoring replacing manual spreadsheet wrangling',
        'Transparent deterministic financial math citing exact source records',
        'Human-in-the-loop decision matrix requiring explicit proprietor sign-off',
      ],
      keyMetric: '8 Core Working Capital Metrics',
    },
    {
      id: 'q2',
      question: 'WHO IS IT FOR?',
      category: 'CORE',
      badge: 'Target Persona',
      icon: Users,
      badgeVariant: 'cyan',
      shortAnswer: 'India’s 63+ million micro, small, and medium retail proprietors (MSMEs).',
      detail:
        'Engineered specifically for high-velocity counter businesses like Abhishek Kumar (Abhishek Mobile & Accessories, Hazratganj Market, Lucknow). These merchants handle rapid daily counter transactions, customer Khata credit, wholesale distributor payables, and seasonal shelf inventory without a dedicated CFO or accounting staff.',
      highlights: [
        'Proprietor Persona: Abhishek Kumar • Hazratganj Market, Lucknow',
        'Store Profile: Retail Electronics & Mobile Accessories (40+ daily transactions)',
        'Operating Reality: Profitable on paper, but cash is trapped in Khata and slow-moving shelf stock',
      ],
      keyMetric: '63M+ Indian Retail MSMEs',
    },
    {
      id: 'q3',
      question: 'WHAT PROBLEM DOES IT SOLVE?',
      category: 'CORE',
      badge: 'Liquidity Protection',
      icon: AlertTriangle,
      badgeVariant: 'rose',
      shortAnswer: 'Averts sudden working-capital cliffs, unrecovered Khata defaults, and predatory emergency debt.',
      detail:
        'Merchants routinely face acute liquidity crunches when large wholesale supplier bills (e.g. ₹45,000 from Sharma Telecom) fall due while customer Khata payments (₹3,700+) remain stalled. Without real-time foresight, merchants are forced into predatory 24–36% APR emergency loans or suffer distributor credit freezes.',
      highlights: [
        'Detects impending cash deficits 5 to 14 days before payments fall due',
        'Liberates internal trapped capital (Khata + stagnant stock) before taking high-interest debt',
        'Protects supplier credit lines, wholesale rebates, and vendor relationships',
      ],
      keyMetric: 'Averts 24–36% APR Emergency Loans',
    },
    {
      id: 'q4',
      question: 'HOW DOES IT GET DATA?',
      category: 'DATA',
      badge: 'Continuous Telemetry',
      icon: Radio,
      badgeVariant: 'indigo',
      shortAnswer: 'Connect once, sync continuously via automated webhooks and daemon bridges.',
      detail:
        'MerchantMind pulls live telemetry directly from Paytm All-In-One QR & Soundbox webhooks, Account Aggregator bank statement feeds (SBI), Smart POS terminals, and Tally Prime local XML bridges. Merchants never have to manually prepare or upload spreadsheets every day.',
      highlights: [
        'Paytm QR transactions and Soundbox voice announcements ingested in real time',
        'Daily automated banking statement sync via Account Aggregator protocol',
        'CSV file import available purely as a fallback for historical onboarding and recovery',
      ],
      keyMetric: '6 Automated Telemetry Streams',
    },
    {
      id: 'q5',
      question: 'WHAT DOES IT MONITOR?',
      category: 'DATA',
      badge: 'Working Capital Health',
      icon: Eye,
      badgeVariant: 'amber',
      shortAnswer: 'Operating bank balance, daily payment velocity, customer Khata aging, supplier bills, and stock velocity.',
      detail:
        'Continuously tracks 8 core operational indicators: liquid operating cash, safe reserve buffer, 14-day cash runway, urgent 7-day supplier payables, overdue Khata (>30 days), dead stock capital locked (>45 days), gross operating margin, and net liquidity gap.',
      highlights: [
        'Rolling daily burn rate and cash runway (e.g., 11.4 days at ₹3,570/day burn)',
        'Khata aging distribution buckets: 0–7d, 8–30d, 31–60d, 61–90d, 90+d',
        'Inventory velocity classification: Fast-Moving, Normal, and Dead Stock',
      ],
      keyMetric: '14-Day Forward Rolling Forecast',
    },
    {
      id: 'q6',
      question: 'HOW DOES IT DETECT RISKS?',
      category: 'INTELLIGENCE',
      badge: 'Deterministic Radar',
      icon: Cpu,
      badgeVariant: 'rose',
      shortAnswer: 'Autonomous heuristic engine evaluating mathematical threshold rules every minute.',
      detail:
        'Fires immediate signals when upcoming liabilities exceed liquid cash within 7 days (SIG-LIQ-CLIFF), when customer credit crosses 30 days without settlement (SIG-REC-OVERDUE), or when SKU velocity drops to zero for 45+ consecutive days (SIG-INV-DEADSTOCK).',
      highlights: [
        'Heuristic triggers evaluated against canonical normalized ledgers',
        'Severity classification: CRITICAL, HIGH, MEDIUM, and INFORMATIONAL',
        'Calculates exact quantified financial exposure (e.g., ₹99,967 total portfolio stake)',
      ],
      keyMetric: 'Instant Heuristic Anomaly Triggers',
    },
    {
      id: 'q7',
      question: 'HOW DOES IT EXPLAIN THEM?',
      category: 'INTELLIGENCE',
      badge: 'Forensic Evidence',
      icon: Calculator,
      badgeVariant: 'indigo',
      shortAnswer: 'Grounded in transparent, verifiable source records with zero black-box math.',
      detail:
        'Every insight opens an Evidence Drawer detailing the exact arithmetic formula (e.g. Cash ₹40,607 - Bill ₹45,000 = Deficit -₹4,393), linking directly to wholesale distributor invoices (BILL-SUP-201), customer credit ledgers, and inventory SKU barcodes.',
      highlights: [
        'Step-by-step formula breakdown visible to the merchant and auditor',
        'Direct lineage to original source records with dates, amounts, and counterparties',
        'Explicit trade-off analysis explaining relationship risks and implementation effort',
      ],
      keyMetric: '100% Verifiable Source Attribution',
    },
    {
      id: 'q8',
      question: 'HOW DOES IT RECOMMEND ACTIONS?',
      category: 'ACTIONS',
      badge: 'Quantified Recovery',
      icon: Zap,
      badgeVariant: 'emerald',
      shortAnswer: 'Calculates the fastest, lowest-friction path to liberate dormant working capital.',
      detail:
        'Rather than defaulting to debt, MerchantMind prioritizes internal capital liberation: sending polite WhatsApp UPI payment links to overdue Khata customers (+₹3,700) and scheduling a 48h weekend flash clearance on stagnant accessories (+₹7,800), together unlocking +₹11,500.',
      highlights: [
        'Ranked by capital yield, implementation turnaround, and counterparty relationship risk',
        'Pre-generates ready-to-dispatch messages with dynamic Paytm UPI collection links',
        'Turns a projected -₹4,393 crisis into a safe +₹7,107 working surplus',
      ],
      keyMetric: '+₹11,500 Capital Recovery Potential',
    },
    {
      id: 'q9',
      question: 'HOW ARE ACTIONS APPROVED?',
      category: 'ACTIONS',
      badge: 'Human-in-the-Loop',
      icon: CheckSquare,
      badgeVariant: 'indigo',
      shortAnswer: 'Proprietor one-click sign-off with message preview, edit, or dismiss options.',
      detail:
        'MerchantMind adheres to a strict human-in-the-loop governance protocol. The system never contacts customers or disburses funds autonomously. The proprietor inspects the prepared WhatsApp reminder or clearance markdown, customizes wording if desired, and clicks "Approve Action".',
      highlights: [
        'Zero autonomous customer outreach or balance modifications without consent',
        'Interactive modal allowing editing of recovery amounts and notification text',
        'Clear sandbox guardrail labels ensuring safe, transparent demo execution',
      ],
      keyMetric: 'Proprietor Final Sign-Off Required',
    },
    {
      id: 'q10',
      question: 'HOW ARE OUTCOMES MEASURED?',
      category: 'ACTIONS',
      badge: 'Closed-Loop Verification',
      icon: TrendingUp,
      badgeVariant: 'emerald',
      shortAnswer: 'Tracks subsequent banking and POS feeds to verify actual cash recovery against forecast.',
      detail:
        'When customer UPI remittances settle into the SBI bank account and clearance inventory scans through the POS counter, the outcome telemetry engine records confirmed recovery, verifying that the -₹4,393 crisis was averted and safe cushion restored to +₹7,107.',
      highlights: [
        'Automated reconciliation of incoming UPI settlements against Khata invoices',
        'Real-time stock decrement tracking for clearance inventory items',
        'Before vs After comparative impact cards stored in the immutable audit trail',
      ],
      keyMetric: 'Verified Transformation: -₹4,393 → +₹7,107',
    },
    {
      id: 'q11',
      question: 'WHERE DOES AI FIT?',
      category: 'INTELLIGENCE',
      badge: 'Copilot & Synthesis',
      icon: Bot,
      badgeVariant: 'indigo',
      shortAnswer: 'Strictly as a natural-language copilot and explanation synthesizer above the core.',
      detail:
        'Generative AI handles natural-language query parsing, voice briefing generation in Hindi and Hinglish, and polite WhatsApp message drafting. It operates strictly as an advisory presentation layer and is architecturally separated from financial computation.',
      highlights: [
        'Translates complex financial ratios into conversational merchant explanations',
        'Powers multi-lingual voice copilot for non-technical shop proprietors',
        'Explicit execution boundary: AI models never calculate or alter ledger balances',
      ],
      keyMetric: 'Zero Math Done by Generative AI',
    },
    {
      id: 'q12',
      question: 'WHAT IS 100% DETERMINISTIC?',
      category: 'SECURITY',
      badge: 'Mathematical Core',
      icon: Lock,
      badgeVariant: 'slate',
      shortAnswer: '100% of financial balances, cashflow curves, deficits, and formula trees.',
      detail:
        'All ledger aggregations, liquidity gap calculations, aging buckets, and opportunity exposures use reproducible arithmetic rules. Probabilistic machine learning models are strictly prohibited from inventing numbers or estimating financial liabilities.',
      highlights: [
        'Deterministic arithmetic pipeline: Inflow - Outflow = Net Cash Position',
        'Zero hallucination risk for financial numbers, invoice amounts, and due dates',
        'Cryptographic SHA-256 audit hashes logged for all financial events',
      ],
      keyMetric: '100% Auditable Arithmetic',
    },
    {
      id: 'q13',
      question: 'WHERE DOES PAYTM FIT?',
      category: 'DATA',
      badge: 'Fintech Telemetry',
      icon: QrCode,
      badgeVariant: 'cyan',
      shortAnswer: 'Primary intraday telemetry: All-In-One QR, Soundbox voice triggers, and EDC settlements.',
      detail:
        'Paytm provides the heartbeat of counter transaction velocity. MerchantMind consumes Soundbox audio confirmation events and daily batch settlements to feed real-time velocity curves and generate 1-click dynamic Paytm UPI collection links for Khata recovery.',
      highlights: [
        'Real-time webhook ingestion for Paytm QR payments and Soundbox voice alerts',
        'T+0 and T+1 automated settlement reconciliation with current bank accounts',
        'Dynamic UPI paylink generation embedded in automated WhatsApp payment reminders',
      ],
      keyMetric: 'Intraday Counter Velocity Stream',
    },
    {
      id: 'q14',
      question: 'HOW IS DATA SECURED & ISOLATED?',
      category: 'SECURITY',
      badge: 'Enterprise Security',
      icon: ShieldCheck,
      badgeVariant: 'emerald',
      shortAnswer: 'Strict multi-tenant schema isolation by GSTIN with immutable audit logging.',
      detail:
        'Each merchant’s ledger and telemetry data resides in logically isolated schemas partitioned by GSTIN. All actions, data syncs, and manual approvals are recorded in an append-only, tamper-evident audit trail compliant with the Digital Personal Data Protection (DPDP) Act 2023.',
      highlights: [
        'Tenant data partitioned by verified GSTIN (08AABCR1234M1Z5)',
        'DPDP Act 2023 compliant data governance and consent management',
        'mTLS 1.3 encrypted data transit and AES-256 encrypted storage at rest',
      ],
      keyMetric: 'DPDP Act 2023 Compliant',
    },
  ];

  const categoryCounts = {
    ALL: faqs.length,
    CORE: faqs.filter((f) => f.category === 'CORE').length,
    DATA: faqs.filter((f) => f.category === 'DATA').length,
    INTELLIGENCE: faqs.filter((f) => f.category === 'INTELLIGENCE').length,
    ACTIONS: faqs.filter((f) => f.category === 'ACTIONS').length,
    SECURITY: faqs.filter((f) => f.category === 'SECURITY').length,
  };

  const categories = [
    { id: 'ALL', label: `All Questions (${categoryCounts.ALL})` },
    { id: 'CORE', label: `Core Story (${categoryCounts.CORE})` },
    { id: 'DATA', label: `Data & Telemetry (${categoryCounts.DATA})` },
    { id: 'INTELLIGENCE', label: `Detection & Heuristics (${categoryCounts.INTELLIGENCE})` },
    { id: 'ACTIONS', label: `Decisions & Actions (${categoryCounts.ACTIONS})` },
    { id: 'SECURITY', label: `Security & Rigor (${categoryCounts.SECURITY})` },
  ];

  const filteredFaqs =
    filterCategory === 'ALL'
      ? faqs
      : faqs.filter((f) => f.category === filterCategory);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setOpenIds(new Set(faqs.map((f) => f.id)));
  };

  const collapseAll = () => {
    setOpenIds(new Set());
  };

  const allExpanded = filteredFaqs.every((f) => openIds.has(f.id));

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded font-mono">
              Product Architecture & Operating Model
            </span>
            <Badge variant="indigo" size="sm">
              14 Core Answers
            </Badge>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Understanding the MerchantMind Platform
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent, evidence-grounded answers to how MerchantMind connects, monitors, calculates, and protects MSME liquidity
          </p>
        </div>

        {/* Global Controls: Expand/Collapse All */}
        <div className="flex items-center gap-2 self-start lg:self-center">
          <Button
            variant="outline"
            size="sm"
            onClick={allExpanded ? collapseAll : expandAll}
            className="text-xs h-8 px-3 border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            {allExpanded ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 mr-1 text-slate-500" />
                <span>Collapse All</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 mr-1 text-slate-500" />
                <span>Expand All ({filteredFaqs.length})</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Filter Category Pills */}
      <div className="flex flex-wrap items-center gap-1.5 pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilterCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
              filterCategory === cat.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
            }`}
          >
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Grid of Answer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFaqs.map((faq) => {
          const isOpen = openIds.has(faq.id);
          const Icon = faq.icon;

          return (
            <div
              key={faq.id}
              onClick={() => toggleFaq(faq.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isOpen
                  ? 'border-indigo-300 bg-gradient-to-br from-indigo-50/25 via-white to-white shadow-xs ring-1 ring-indigo-200/60'
                  : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div>
                {/* Card Top: Icon, ID, Category Badge, Chevron */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                        isOpen
                          ? 'bg-indigo-600 text-white border-indigo-700 shadow-2xs'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-700">
                          {faq.id.toUpperCase()}
                        </span>
                        <Badge variant={faq.badgeVariant} size="sm">
                          {faq.badge}
                        </Badge>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug mt-0.5">
                        {faq.question}
                      </h4>
                    </div>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'rotate-180 bg-indigo-100 text-indigo-700'
                        : 'bg-slate-100 text-slate-400 group-hover:text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Short Answer (Always Visible, Punchy) */}
                <p className="text-xs text-slate-700 font-medium leading-relaxed mt-3.5 pl-1">
                  {faq.shortAnswer}
                </p>

                {/* Expanded Detailed Content */}
                {isOpen && (
                  <div className="mt-3.5 pt-3 border-t border-indigo-100/80 space-y-3 animate-in fade-in duration-150">
                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/80 p-3 rounded-xl border border-slate-200/70">
                      {faq.detail}
                    </p>

                    {/* Structured Key Highlights */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                        Key Architecture Highlights:
                      </span>
                      <ul className="space-y-1 text-[11px] text-slate-600">
                        {faq.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="leading-snug">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Metric Tag */}
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-medium">Platform Guarantee:</span>
                <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                  {faq.keyMetric}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
