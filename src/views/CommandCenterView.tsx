import React from 'react';
import {
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  RefreshCw,
  Wallet,
  Receipt,
  Users,
  CreditCard,
  Radio,
  ExternalLink,
  Layers,
  ArrowUpRight,
  Mic,
  MessageSquare,
  Volume2,
} from 'lucide-react';
import { useMerchant } from '../context/MerchantContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { formatINR, formatDate } from '../utils/formatters';
import { SignalActionFlowCard } from '../components/intelligence/SignalActionFlowCard';
import { MerchantActivityTimeline } from '../components/intelligence/MerchantActivityTimeline';

export const CommandCenterView: React.FC = () => {
  const {
    profile,
    financialHealth,
    opportunities,
    signals,
    payables,
    openEvidenceDrawer,
    setActiveAppTab,
    runIntelligenceScan,
    approveAction,
    actions,
    openAssistant,
    setIsBriefingOpen,
    language,
  } = useMerchant();

  if (!financialHealth) return null;

  const pendingActions = actions.filter((a) => a.status === 'AWAITING_APPROVAL');
  const proprietorFirstName = profile?.proprietor ? profile.proprietor.split(' ')[0] : 'Abhishek';

  return (
    <div className="space-y-6">
      {/* 1. HEADER: Good morning, Abhishek. MerchantMind is monitoring your business. */}
      <div
        id="tour-merchant-header"
        className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Good morning, {proprietorFirstName}.
            </h1>
            <Badge variant="indigo" size="sm">
              Retail Electronics
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              MerchantMind is continuously monitoring your business
            </span>
            <span className="text-slate-400">•</span>
            <span>{profile?.businessName || 'Abhishek Mobile & Accessories'} ({profile?.address?.city || 'Lucknow'})</span>
            <span className="text-slate-400">•</span>
            <span className="font-mono text-slate-500">GSTIN: {profile?.gstin || '08AABCR1234M1Z5'}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-[11px] text-slate-400 font-medium block">
              Paytm & Connected Telemetry
            </span>
            <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 justify-end">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              6 Sources Synced • Active Daemon
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              await runIntelligenceScan();
            }}
            className="text-xs h-9"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            <span>Scan Telemetry</span>
          </Button>
        </div>
      </div>

      {/* AI SAHAYAK VOICE & CONVERSATION PROMPT HERO BAR */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-lg border border-indigo-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-xl shadow-inner border border-white/20">
              🤖
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-wide text-white">
                Paytm Vyapar AI Sahayak
              </span>
              <Badge variant="cyan" size="sm" className="bg-cyan-900/80 text-cyan-200 border-none font-mono text-[9px]">
                VOICE & CHAT ACTIVE
              </Badge>
            </div>
            <p className="text-xs text-slate-300">
              {language === 'hi'
                ? 'Dukan ki bikri, Sharma Telecom ke bill aur udhaar ke bare me bol kar ya likh kar poochiye'
                : "Ask anything about today's Paytm QR collection, Sharma Telecom bill, or Udhaar recovery"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => openAssistant(language === 'hi' ? 'Sharma Telecom ka bill kab dena hai aur paise kitne kam hain?' : 'When is Sharma Telecom bill due and what is the cash deficit?')}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold border border-white/15 transition-colors cursor-pointer"
          >
            🚨 {language === 'hi' ? 'Sharma Telecom Bill?' : 'Sharma Telecom Bill?'}
          </button>
          <button
            onClick={() => openAssistant(language === 'hi' ? 'Amit Verma ka udhaar recover karne ke liye WhatsApp link bhejo' : 'How do we recover overdue Udhaar from Amit Verma?')}
            className="px-3 py-1.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/90 text-emerald-200 text-xs font-semibold border border-emerald-800/60 transition-colors cursor-pointer"
          >
            💬 {language === 'hi' ? 'Udhaar WhatsApp Link' : 'Udhaar Paylinks'}
          </button>
          <button
            onClick={() => setIsBriefingOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-cyan-950/70 hover:bg-cyan-900/90 text-cyan-200 text-xs font-semibold border border-cyan-800/60 transition-colors cursor-pointer"
          >
            📱 {language === 'hi' ? 'Morning Briefing' : 'Morning Briefing'}
          </button>
          <button
            onClick={() => openAssistant()}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Mic className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'Bol kar poochiye 🎙️' : 'Talk with AI 🎙️'}</span>
          </button>
        </div>
      </div>

      {/* 2. THE HEART: "WHAT NEEDS YOUR ATTENTION" (Working-Capital Squeeze vs Recovery) */}
      <div
        id="tour-supplier-cliff"
        className="p-6 bg-gradient-to-br from-rose-50/80 via-white to-amber-50/40 border-2 border-rose-300 rounded-3xl shadow-xs space-y-5"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-rose-100 pb-4">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-700 shrink-0">
              <AlertTriangle className="w-6 h-6 text-rose-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 bg-rose-200/90 px-2.5 py-0.5 rounded font-mono">
                  WHAT NEEDS YOUR ATTENTION • CRITICAL PRIORITY
                </span>
                <Badge variant="rose" size="sm">
                  Supplier Payment Due in 5 Days
                </Badge>
                <span className="text-[11px] font-mono text-slate-600 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                  Financial Stake: ₹45,000 distributor commitment
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1.5">
                MerchantMind detected a working-capital squeeze.
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed space-y-1">
                <p>
                  Wholesale distributor bill <strong>BILL-SUP-201</strong> (₹45,000 from Sharma Telecom) matures in 5 days, but available operating cash is <strong>{formatINR(financialHealth.availableCash)}</strong>, creating an immediate liquidity deficit of <strong className="text-rose-700">{formatINR(Math.abs(financialHealth.netImmediateLiquidityGap))}</strong>.
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-700 pt-1 font-medium">
                  <span>• Supplier payment due in 5 days (₹45,000)</span>
                  <span>• Current operating cash is insufficient (₹40,607)</span>
                  <span>• Payment split deferral requested (+₹20,000 liquidity buffer)</span>
                  <span>• Distributor volume rebate claimable (+₹11,200)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start lg:self-center shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => openEvidenceDrawer('evi_01')}
              className="border-rose-300 text-rose-900 hover:bg-rose-100 text-xs font-semibold h-9"
            >
              <span>Inspect Proof & Evidence</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setActiveAppTab('opportunities')}
              className="bg-rose-600 hover:bg-rose-700 text-xs font-semibold shadow-xs h-9"
            >
              <span>Review Recovery Path (+₹20,000)</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>

        {/* Highlighted Mathematical Gap & Recovery Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          {/* 1. Operating Cash */}
          <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] text-slate-400 block uppercase font-medium">1. Current Cash Position</span>
            <span className="text-lg font-bold text-slate-900 font-mono block mt-0.5">
              {formatINR(financialHealth.availableCash)}
            </span>
            <span className="text-[10px] text-slate-500 font-sans block mt-0.5">SBI Current Account</span>
          </div>

          {/* 2. Supplier Obligation */}
          <div className="p-3.5 bg-white rounded-xl border border-rose-200 shadow-2xs">
            <span className="text-[10px] text-rose-600 block uppercase font-medium">2. Upcoming Obligation</span>
            <span className="text-lg font-bold text-rose-700 font-mono block mt-0.5">
              {formatINR(financialHealth.urgentPayablesNext7Days)}
            </span>
            <span className="text-[10px] text-rose-600 font-sans block mt-0.5">Sharma Telecom (Due Oct 9)</span>
          </div>

          {/* 3. Immediate Gap */}
          <div className="p-3.5 bg-rose-50/90 rounded-xl border border-rose-300 shadow-2xs">
            <span className="text-[10px] text-rose-800 font-bold block uppercase">3. Immediate Net Gap</span>
            <span className="text-lg font-extrabold text-rose-700 font-mono block mt-0.5">
              {formatINR(financialHealth.netImmediateLiquidityGap)}
            </span>
            <span className="text-[10px] text-rose-800 font-sans font-medium block mt-0.5">Default Hazard if Unresolved</span>
          </div>

          {/* 4. Recommended Recovery */}
          <div className="p-3.5 bg-emerald-50/90 rounded-xl border border-emerald-300 shadow-2xs">
            <span className="text-[10px] text-emerald-800 font-bold block uppercase">4. Deferred / Relief Value</span>
            <span className="text-lg font-extrabold text-emerald-700 font-mono block mt-0.5">
              +{formatINR(20000)}
            </span>
            <span className="text-[10px] text-emerald-800 font-sans font-medium block mt-0.5">7-Day Supplier Tranche Split</span>
          </div>

          {/* 5. Post-Recovery Cushion */}
          <div className="p-3.5 bg-slate-900 text-white rounded-xl border border-slate-800 shadow-2xs col-span-2 sm:col-span-1">
            <span className="text-[10px] text-emerald-400 font-bold block uppercase">5. Projected Position</span>
            <span className="text-lg font-extrabold text-emerald-400 font-mono block mt-0.5">
              +{formatINR(15607)}
            </span>
            <span className="text-[10px] text-slate-300 font-sans block mt-0.5">Safe Working Cushion</span>
          </div>
        </div>
      </div>

      {/* 3. SIGNAL -> OPPORTUNITY -> ACTION FLOW COMPONENT */}
      <SignalActionFlowCard />

      {/* 4. FINANCIAL HEALTH & KPI OVERVIEW */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* A. Business Health Index */}
        <Card className="p-4">
          <span className="text-xs font-medium text-slate-500 block">Financial Health Index</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-xl font-bold font-mono text-amber-600">
              {financialHealth.healthScore} / 100
            </span>
            <Badge
              variant={
                financialHealth.healthScore >= 75
                  ? 'emerald'
                  : financialHealth.healthScore >= 55
                    ? 'amber'
                    : 'rose'
              }
              size="sm"
            >
              {financialHealth.healthStatus}
            </Badge>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Runway: {financialHealth.cashRunwayDays} days • Liquidity: 0.90x
          </span>
        </Card>

        {/* B. Cash Position */}
        <Card id="tour-kpi-cash" className="p-4 border-amber-200 bg-amber-50/20">
          <span className="text-xs font-medium text-slate-600 block">Operating Cash Position</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-xl font-bold font-mono text-slate-900">
              {formatINR(financialHealth.availableCash)}
            </span>
            <Badge variant="amber" size="sm">
              90% of Safe Target
            </Badge>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Safe Buffer: {formatINR(financialHealth.safeCashBuffer)}
          </span>
        </Card>

        {/* C. Monthly Revenue Inflow */}
        <Card className="p-4 border-indigo-200 bg-indigo-50/20">
          <span className="text-xs font-medium text-indigo-900 block">Monthly Revenue Inflow</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-xl font-bold font-mono text-indigo-700">
              {formatINR(financialHealth.totalRevenueMonthly)}
            </span>
            <Badge variant="indigo" size="sm">
              Paytm QR & Card
            </Badge>
          </div>
          <span className="text-[11px] text-indigo-600 mt-1 block">
            Avg Outflow: ~{formatINR(Math.round(financialHealth.totalExpensesMonthly / 30))}/day
          </span>
        </Card>

        {/* D. Upcoming Supplier Payables */}
        <Card className="p-4 border-rose-200 bg-rose-50/20">
          <span className="text-xs font-medium text-rose-800 block">Urgent Supplier Payables (7d)</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-xl font-bold font-mono text-rose-700">
              {formatINR(financialHealth.urgentPayablesNext7Days)}
            </span>
            <Badge variant="rose" size="sm">
              Due Oct 9
            </Badge>
          </div>
          <span className="text-[11px] text-rose-600 mt-1 block">
            Sharma Telecom Wholesale
          </span>
        </Card>
      </div>

      {/* 5. MAIN WORKSPACE: TODAY'S PRIORITIES & SIDEBAR (LIVE SIGNALS, APPROVALS, TIMELINE) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Today's Priorities (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Today's Strategic Priorities</h3>
              <p className="text-xs text-slate-500">
                Ranked deterministic opportunities to protect liquidity and profitability
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveAppTab('opportunities')}
              className="text-xs"
            >
              <span>All Opportunities ({opportunities.length})</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>

          <div className="space-y-3">
            {opportunities.map((opp, idx) => (
              <div
                key={opp.id}
                className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            opp.priority === 'CRITICAL'
                              ? 'rose'
                              : opp.priority === 'HIGH'
                                ? 'amber'
                                : 'indigo'
                          }
                          size="sm"
                        >
                          {opp.priority}
                        </Badge>
                        <span className="text-[11px] font-medium text-slate-500">
                          Due in {opp.urgencyDays} days • {opp.confidence}% confidence
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">{opp.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {opp.summary}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[11px] text-slate-400 block font-medium">Exposure</span>
                    <span className="text-sm font-bold font-mono text-slate-900">
                      {formatINR(opp.financialExposure)}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-600 block mt-0.5">
                      +{formatINR(opp.potentialGain)} Recovery
                    </span>
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-500 italic max-w-md truncate">
                    Trade-off: {opp.tradeOffSummary}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEvidenceDrawer(opp.evidenceRecordId)}
                      className="text-xs py-1 px-2.5 h-8"
                    >
                      <span>Why? (Evidence)</span>
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setActiveAppTab('actions')}
                      className="text-xs py-1 px-3 h-8 bg-indigo-600 hover:bg-indigo-700"
                    >
                      <span>Take Action</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick links to core modules */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <button
              onClick={() => setActiveAppTab('cashflow')}
              className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <Wallet className="w-4 h-4 text-indigo-600" />
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <span className="text-xs font-bold text-slate-900 block mt-2">Cashflow Radar</span>
              <span className="text-[10px] text-slate-500">14-day projection</span>
            </button>

            <button
              onClick={() => setActiveAppTab('payables')}
              className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <Receipt className="w-4 h-4 text-rose-600" />
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <span className="text-xs font-bold text-slate-900 block mt-2">Supplier Bills</span>
              <span className="text-[10px] text-slate-500">Sharma Telecom</span>
            </button>

            <button
              onClick={() => setActiveAppTab('transactions')}
              className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <span className="text-xs font-bold text-slate-900 block mt-2">Transactions</span>
              <span className="text-[10px] text-slate-500">Paytm Soundbox & QR</span>
            </button>

            <button
              onClick={() => setActiveAppTab('customers')}
              className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <Users className="w-4 h-4 text-cyan-600" />
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <span className="text-xs font-bold text-slate-900 block mt-2">Customer Profiles</span>
              <span className="text-[10px] text-slate-500">RFM & repeat buyers</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live Signals, Recommended Actions & Activity Timeline (1 Col) */}
        <div className="space-y-6">
          {/* E. Live Signals Radar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Live Anomaly Radar
                </h4>
              </div>
              <Badge variant="rose" size="sm">
                {signals.length} Active
              </Badge>
            </div>

            <div className="space-y-2.5">
              {signals.map((sig) => (
                <div
                  key={sig.id}
                  className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900 font-mono text-[11px]">
                      {sig.code}
                    </span>
                    <Badge
                      variant={sig.severity === 'CRITICAL' ? 'rose' : 'amber'}
                      size="sm"
                    >
                      {sig.severity}
                    </Badge>
                  </div>
                  <p className="text-slate-700 font-medium text-[11px] leading-snug">
                    {sig.title}
                  </p>
                  <span className="text-[10px] text-slate-500 block">
                    Trigger: {sig.triggerCondition}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveAppTab('signals')}
              className="w-full text-center text-xs font-semibold text-indigo-600 hover:text-indigo-800 pt-1 block cursor-pointer"
            >
              Open Signal Radar &rarr;
            </button>
          </div>

          {/* F. Recommended Actions Approval Queue */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Action Approval Queue
              </h4>
              <Badge variant="emerald" size="sm">
                {pendingActions.length} Pending
              </Badge>
            </div>

            <div className="space-y-2.5">
              {pendingActions.map((act) => (
                <div
                  key={act.id}
                  className="p-3 bg-indigo-50/50 rounded-lg border border-indigo-100 text-xs space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-slate-900 leading-tight">
                      {act.title}
                    </span>
                    <span className="font-mono font-bold text-emerald-700 shrink-0 ml-2">
                      +{formatINR(act.expectedImpactAmount)}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {act.description}
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-slate-400">
                      Effort: <strong>{act.implementationEffort}</strong>
                    </span>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => approveAction(act.id)}
                      className="text-xs py-1 px-2.5 h-7 bg-indigo-600 hover:bg-indigo-700"
                    >
                      Approve &rarr;
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* G. Automatic Monitoring Timeline (Section 5) */}
          <MerchantActivityTimeline limit={5} />
        </div>
      </div>
    </div>
  );
};
