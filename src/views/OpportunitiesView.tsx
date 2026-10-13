import React, { useState } from 'react';
import { Zap, Filter, Search, RefreshCw, AlertTriangle, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';
import { useMerchant } from '../context/MerchantContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { formatINR } from '../utils/formatters';

export const OpportunitiesView: React.FC = () => {
  const { opportunities, openEvidenceDrawer, setActiveAppTab, runIntelligenceScan } = useMerchant();
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  const filteredOpportunities = opportunities.filter((opp) => {
    if (filterCategory === 'ALL') return true;
    return opp.priority === filterCategory || opp.category === filterCategory;
  });

  const handleScan = async () => {
    setIsScanning(true);
    try {
      const res = await runIntelligenceScan();
      setScanMessage(`Scan finished: ${res.newSignals} verified signals and ${res.newOpportunities} actionable opportunities.`);
      setTimeout(() => setScanMessage(null), 4000);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Opportunity & Risk Center</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Ranked deterministic business opportunities to protect liquidity and accelerate capital turn
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleScan}
            isLoading={isScanning}
            className="text-xs"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1" />
            <span>Run Intelligence Scan</span>
          </Button>
        </div>
      </div>

      {scanMessage && (
        <div className="p-3 bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-medium rounded-xl flex items-center gap-2 animate-in fade-in duration-200">
          <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>{scanMessage}</span>
        </div>
      )}

      {/* Detection Transition Banner */}
      <div className="p-5 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl border border-indigo-800/60 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-800/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 bg-rose-900/60 border border-rose-700/60 px-2 py-0.5 rounded font-mono">
              CONTINUOUS DETECTION ENGINE
            </span>
            <span className="text-xs text-indigo-200 font-medium">
              Transition from Monitoring to Detection
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase text-slate-400">Total Financial Stake:</span>
            <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-700/60">
              ₹99,967 Total Opportunity Exposure
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>MerchantMind detected a working-capital squeeze.</span>
          </h2>
          <p className="text-xs text-indigo-200/90 leading-relaxed max-w-3xl">
            Autonomous heuristic radar identified that operating liquidity will drop into a negative position when distributor invoice <strong>BILL-SUP-201</strong> (₹45,000) matures in 5 days against <strong>₹40,607</strong> liquid operating cash.
          </p>
        </div>

        {/* Why it Matters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs pt-1">
          <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/80">
            <span className="text-rose-400 block font-semibold text-[11px]">1. Supplier Due (5d)</span>
            <span className="text-[11px] text-slate-300 mt-0.5 block">BILL-SUP-201: ₹45,000</span>
          </div>
          <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/80">
            <span className="text-amber-400 block font-semibold text-[11px]">2. Cash Inadequacy</span>
            <span className="text-[11px] text-slate-300 mt-0.5 block">Current funds: ₹40,607 (-₹4.3K gap)</span>
          </div>
          <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/80">
            <span className="text-cyan-400 block font-semibold text-[11px]">3. Overdue Khata</span>
            <span className="text-[11px] text-slate-300 mt-0.5 block">₹3,700 trapped in 34d+ ledgers</span>
          </div>
          <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/80">
            <span className="text-emerald-400 block font-semibold text-[11px]">4. Stagnant Stock</span>
            <span className="text-[11px] text-slate-300 mt-0.5 block">₹10,660 locked in idle accessories</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'ALL', label: `All (${opportunities.length})` },
          { id: 'CRITICAL', label: 'Critical' },
          { id: 'HIGH', label: 'High Priority' },
          { id: 'SUPPLIER_PAYMENT', label: 'Supplier Cliffs' },
          { id: 'OVERDUE_RECEIVABLES', label: 'Khata Delays' },
          { id: 'DEAD_STOCK', label: 'Dead Stock' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterCategory(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterCategory === tab.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Opportunities Card Stack */}
      <div className="space-y-4">
        {filteredOpportunities.map((opp, idx) => (
          <Card
            key={opp.id}
            id={idx === 0 ? 'tour-opportunities-top' : undefined}
            className="p-5 shadow-xs hover:border-indigo-300 transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
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
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    {opp.category.replace('_', ' ')}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[11px] text-slate-500">
                    Urgency: <strong>{opp.urgencyDays} Days</strong>
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[11px] text-emerald-700 font-semibold">
                    {opp.confidence}% Mathematical Confidence
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {opp.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                  {opp.summary}
                </p>

                {/* What, Why, Impact Snapshot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs">
                    <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">
                      Root Cause (Why?)
                    </span>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                      {opp.whyExplanation}
                    </p>
                  </div>

                  <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 text-xs">
                    <span className="font-bold text-indigo-950 block text-[11px] uppercase tracking-wider">
                      Strategic Trade-off
                    </span>
                    <p className="text-slate-700 text-xs mt-1 leading-relaxed">
                      {opp.tradeOffSummary}
                    </p>
                  </div>
                </div>
              </div>

              {/* Financial Impact Metric Badge & Actions */}
              <div className="md:text-right shrink-0 flex flex-col justify-between items-start md:items-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                <div>
                  <span className="text-[11px] text-slate-400 font-medium block">Financial Exposure</span>
                  <span className="text-lg font-bold font-mono text-slate-900">
                    {formatINR(opp.financialExposure)}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 block mt-0.5">
                    +{formatINR(opp.potentialGain)} Net Recovery
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEvidenceDrawer(opp.evidenceRecordId)}
                    className="text-xs"
                  >
                    <span>Inspect Proof</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setActiveAppTab('actions')}
                    className="text-xs bg-indigo-600 hover:bg-indigo-700"
                  >
                    <span>Take Action</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
