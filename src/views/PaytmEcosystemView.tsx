import React, { useState } from 'react';
import {
  QrCode,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Activity,
  Layers,
  TrendingUp,
  AlertTriangle,
  ExternalLink,
  Smartphone,
  Radio,
  Clock,
  Database,
  Lock,
  ChevronDown,
} from 'lucide-react';
import { useMerchant } from '../context/MerchantContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { formatINR } from '../utils/formatters';

export const PaytmEcosystemView: React.FC = () => {
  const { triggerDataSync, setActiveAppTab, setActiveWorld, financialHealth, profile } = useMerchant();
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncResult, setLastSyncResult] = useState<string | null>(null);

  const handleSimulateSync = async () => {
    setIsSyncing(true);
    setLastSyncResult(null);
    try {
      await triggerDataSync('conn_paytm');
      setLastSyncResult('Ingested 42 verified transactions, 1 Soundbox voice event, and ₹8,450 auto-settled into SBI Current Account.');
    } finally {
      setIsSyncing(false);
    }
  };

  const integrationSurfaces = [
    {
      num: '01',
      title: 'Payment Activity & QR Inflow',
      icon: Radio,
      tag: 'Real-Time Inflow Stream',
      description:
        'Soundbox voice audio announcements and All-in-One QR transaction events stream intraday cash velocity directly into cashflow curves without waiting for end-of-day bank statements.',
      merchantImplementation: 'Ingests 42 daily Paytm QR transactions for smartphone repairs, fast chargers, and tempered glass.',
      technicalSpec: 'Webhook ingestion endpoint consuming payload: { event: "PAYMENT_SUCCESS", amount, customer_vpa, rrn, timestamp } with SHA-256 HMAC signature verification.',
    },
    {
      num: '02',
      title: 'Settlement Visibility (T+0 & T+1)',
      icon: Clock,
      tag: 'Automated Reconciliation',
      description:
        'Monitors T+0 on-demand settlements and T+1 automated settlement disbursements into the merchant SBI current account, automatically reconciling payment batches against register sales.',
      merchantImplementation: 'Reconciles ₹8,450 net afternoon settlement batch credited into Abhishek Mobile’s SBI Current Account at 17:30 IST.',
      technicalSpec: 'Settlement reconciliation pipeline matching aggregate settlement UTR numbers against individual line-item transaction IDs.',
    },
    {
      num: '03',
      title: 'Merchant Transaction Telemetry',
      icon: Activity,
      tag: 'Counter Velocity Profiling',
      description:
        'Analyzes counter ticket size distribution, transaction cadence, and peak shopping hours to understand real daily counter velocity.',
      merchantImplementation: 'Profiles Abhishek Mobile’s average transaction ticket of ₹340 and identifies peak footfall velocity between 18:00 and 21:00.',
      technicalSpec: 'Statistical bucket aggregations computing rolling median ticket size, variance, and standard deviation over 7-day and 30-day windows.',
    },
    {
      num: '04',
      title: 'Payment Trends & Seasonality',
      icon: TrendingUp,
      tag: 'Behavioral Trendlines',
      description:
        'Detects weekend versus weekday inflow patterns, customer repeat payment frequencies, and seasonal demand shifts to adjust forward liquidity buffers.',
      merchantImplementation: 'Accounts for Saturday smartphone repair surges (+24% volume) when projecting cash balances ahead of Friday supplier bills.',
      technicalSpec: 'Time-series forecasting model weighting recent 4-week seasonality to project daily cash generation curves 14 days forward.',
    },
    {
      num: '05',
      title: 'Business Health Signals',
      icon: ShieldCheck,
      tag: 'Underwriting & Health Scoring',
      description:
        'Continuously computes operational working capital runway (11.4 days), liquidity coverage (0.90x), and solvency scores based on live merchant telemetry.',
      merchantImplementation: 'Maintains an 82/100 business health score, flagging that Abhishek’s ₹40,607 cash requires an extra ₹4,393 to safely clear supplier dues.',
      technicalSpec: 'Financial ratio engine calculating Cash Runway = Liquid Cash / Average Daily Outflow, updated upon every verified settlement event.',
    },
    {
      num: '06',
      title: 'Actionable Merchant Insights',
      icon: Zap,
      tag: 'Omnichannel Remediation',
      description:
        'Powers 1-click customer Khata recovery via WhatsApp embedded with dynamic Paytm UPI QR paylinks, and alerts the merchant 5 days ahead of distributor payment cliffs.',
      merchantImplementation: 'Dispatches instant UPI payment links to Amit Verma (₹2,200) and Neha Sharma (₹1,500), recovering ₹3,700 within 48 hours.',
      technicalSpec: 'Dynamic UPI Deep-Link Generator: upi://pay?pa=abhishek.mobile@paytm&pn=Abhishek%20Mobile&am=2200&tr=INV-REC-101&cu=INR.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Paytm Integration Layer
            </h1>
            <Badge variant="indigo" size="sm" className="bg-cyan-50 text-cyan-800 border-cyan-200">
              Ecosystem Architecture
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Designed to ingest authorized Paytm merchant transaction/payment telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="indigo" size="sm" className="bg-cyan-500/20 text-cyan-800 border-cyan-300">
            SIMULATED DEMO FEED
          </Badge>
          <Badge variant="slate" size="sm" className="bg-slate-100 text-slate-700 border-slate-300">
            INTEGRATION-READY
          </Badge>
        </div>
      </div>

      {/* Hero Banner: Ecosystem Context */}
      <div className="p-6 bg-slate-900 text-white rounded-3xl border border-cyan-800/60 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <QrCode className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
              PAYTM ENTERPRISE INTEGRATION LAYER
            </span>
          </div>

          <div className="text-xs text-cyan-200/80 font-mono">
            Designed to ingest authorized Paytm merchant transaction/payment telemetry
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold max-w-3xl leading-tight">
            How Paytm Payment Infrastructure Powers Autonomous Merchant Decisions
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Paytm powers the point-of-sale for millions of Indian small businesses through All-In-One QR standees, Soundbox audio announcers, and Card EDC machines.
            MerchantMind connects directly to this high-frequency payment heartbeat to detect liquidity cliffs days in advance and automate customer Khata recovery via instant UPI paylinks.
          </p>
        </div>

        {/* Live Simulation Controls */}
        <div className="pt-2 flex flex-wrap items-center gap-3 border-t border-slate-800">
          <Button
            variant="primary"
            size="sm"
            onClick={handleSimulateSync}
            disabled={isSyncing}
            className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Ingesting Simulated Batch...' : 'Simulate Paytm Telemetry Batch'}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveAppTab('connections')}
            className="border-slate-700 text-slate-300 hover:bg-slate-800 text-xs"
          >
            <span>Inspect Connection Status</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setActiveWorld('app');
              setActiveAppTab('command-center');
            }}
            className="border-slate-700 text-slate-300 hover:bg-slate-800 text-xs"
          >
            <span>View in Command Center &rarr;</span>
          </Button>
        </div>

        {lastSyncResult && (
          <div className="p-3 bg-cyan-950/80 border border-cyan-700/60 rounded-xl text-xs text-cyan-200 flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{lastSyncResult}</span>
          </div>
        )}
      </div>

      {/* The Requested Visual Flow: PAYTM -> Payments -> Transaction Intelligence -> MerchantMind -> Cashflow -> Signals -> Opportunities -> Actions */}
      <Card className="p-5 space-y-4 bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div>
            <span className="text-xs font-mono font-bold text-indigo-700 uppercase tracking-wider block">
              THE COMPLETE INTELLIGENCE PIPELINE
            </span>
            <span className="text-[11px] text-slate-500">
              PAYTM &rarr; Payments &rarr; Transaction Intelligence &rarr; MerchantMind &rarr; Cashflow &rarr; Signals &rarr; Opportunities &rarr; Actions
            </span>
          </div>
          <Badge variant="cyan" size="sm">
            Deterministic Loop
          </Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-xs font-mono">
          {/* 1. PAYTM */}
          <div className="p-3 bg-cyan-50 rounded-xl border border-cyan-200 space-y-1">
            <span className="text-[9px] text-cyan-800 font-bold block uppercase">1. SOURCE</span>
            <span className="text-cyan-950 font-bold block text-xs">PAYTM</span>
            <span className="text-[10px] text-cyan-700 font-sans block">QR & Soundbox</span>
          </div>

          {/* 2. Payments */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[9px] text-slate-500 font-bold block uppercase">2. STREAM</span>
            <span className="text-slate-900 font-bold block text-xs">Payments</span>
            <span className="text-[10px] text-slate-500 font-sans block">Inflows & T+0</span>
          </div>

          {/* 3. Transaction Intelligence */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[9px] text-indigo-600 font-bold block uppercase">3. PARSING</span>
            <span className="text-slate-900 font-bold block text-xs">Txn Intelligence</span>
            <span className="text-[10px] text-slate-500 font-sans block">Velocity & tickets</span>
          </div>

          {/* 4. MerchantMind */}
          <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200 space-y-1">
            <span className="text-[9px] text-indigo-700 font-bold block uppercase">4. ENGINE</span>
            <span className="text-indigo-950 font-bold block text-xs">MerchantMind</span>
            <span className="text-[10px] text-indigo-700 font-sans block">Canonical model</span>
          </div>

          {/* 5. Cashflow */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[9px] text-slate-500 font-bold block uppercase">5. FORECAST</span>
            <span className="text-slate-900 font-bold block text-xs">Cashflow</span>
            <span className="text-[10px] text-slate-500 font-sans block">14-day curve</span>
          </div>

          {/* 6. Signals */}
          <div className="p-3 bg-rose-50/70 rounded-xl border border-rose-200 space-y-1">
            <span className="text-[9px] text-rose-700 font-bold block uppercase">6. DETECTION</span>
            <span className="text-rose-950 font-bold block text-xs">Signals</span>
            <span className="text-[10px] text-rose-700 font-sans block">-₹4,393 cliff alert</span>
          </div>

          {/* 7. Opportunities */}
          <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 space-y-1">
            <span className="text-[9px] text-amber-700 font-bold block uppercase">7. SYNTHESIS</span>
            <span className="text-amber-950 font-bold block text-xs">Opportunities</span>
            <span className="text-[10px] text-amber-700 font-sans block">+₹11.5K recovery</span>
          </div>

          {/* 8. Actions */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
            <span className="text-[9px] text-emerald-700 font-bold block uppercase">8. EXECUTION</span>
            <span className="text-emerald-950 font-bold block text-xs">Actions</span>
            <span className="text-[10px] text-emerald-700 font-sans block">UPI paylinks</span>
          </div>
        </div>
      </Card>

      {/* 6 Realistic Integration Surfaces Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
            6 Core Paytm Integration Surfaces
          </h3>
          <span className="text-xs text-slate-500">Architectural Specifications</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrationSurfaces.map((surface) => {
            const SurfaceIcon = surface.icon;
            return (
              <Card key={surface.num} className="p-5 space-y-3 flex flex-col justify-between hover:border-cyan-300 transition-colors">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                      SURFACE {surface.num}
                    </span>
                    <Badge variant="slate" size="sm">{surface.tag}</Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <SurfaceIcon className="w-4 h-4 text-cyan-700 shrink-0" />
                    <h4 className="text-sm font-bold text-slate-900">{surface.title}</h4>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {surface.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
                    <strong className="text-slate-900 block text-[11px] font-semibold">Abhishek Mobile Scenario:</strong>
                    <p className="text-slate-600 text-[11px] mt-0.5">{surface.merchantImplementation}</p>
                  </div>

                  <div className="p-2.5 bg-slate-900 text-slate-300 rounded-lg font-mono text-[10px] leading-tight overflow-x-auto">
                    <span className="text-cyan-400 block font-bold mb-0.5">TECHNICAL PAYLOAD / SCHEMA:</span>
                    {surface.technicalSpec}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Compliance, Honesty & Hackathon Disclosure Box */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            <h4 className="text-sm font-bold text-slate-900">
              Designed Integration Boundary & Telemetry Integrity
            </h4>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono">
            <span className="px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold">DEMO TELEMETRY ACTIVE</span>
            <span className="text-slate-300">•</span>
            <span className="px-2 py-0.5 rounded bg-cyan-50 border border-cyan-200 text-cyan-800 font-bold">CONNECTOR-READY ARCHITECTURE</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          MerchantMind features a <strong>designed integration boundary</strong> to ingest authorized Paytm merchant transaction and payment telemetry. In this hackathon presentation, all demonstration flows operate against deterministic <strong>demo telemetry</strong> adhering to official webhook schemas and UPI 2.0 dynamic link specifications. <strong>Future live integration</strong> will bind to official merchant OAuth and production webhooks—no fake live production endpoints or fabricated bank transactions are claimed.
        </p>
      </div>
    </div>
  );
};
