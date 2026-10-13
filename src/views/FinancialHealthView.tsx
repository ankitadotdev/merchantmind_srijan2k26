import React from 'react';
import { Activity, TrendingUp, TrendingDown, DollarSign, PieChart, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useMerchant } from '../context/MerchantContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { formatINR } from '../utils/formatters';

export const FinancialHealthView: React.FC = () => {
  const { financialHealth, setActiveAppTab, openEvidenceDrawer } = useMerchant();

  if (!financialHealth) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Financial Health & Working Capital</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Holistic liquidity analysis, operating margins, and working capital ratios
          </p>
        </div>
        <Badge variant={financialHealth.healthScore >= 75 ? 'emerald' : 'rose'} size="md">
          Health Index: {financialHealth.healthScore} / 100 ({financialHealth.healthStatus})
        </Badge>
      </div>

      {/* Main Ratio Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="p-5 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-600">Liquidity Coverage Ratio</span>
            <Badge variant={financialHealth.liquidityCoverageRatio < 1 ? 'rose' : 'emerald'} size="sm">
              {(financialHealth.liquidityCoverageRatio * 100).toFixed(1)}%
            </Badge>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">
            {financialHealth.liquidityCoverageRatio.toFixed(2)}x
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Measures available operating cash ({formatINR(financialHealth.availableCash)}) against urgent 7-day obligations ({formatINR(financialHealth.urgentPayablesNext7Days)}). Target is &ge; 1.25x.
          </p>
          {financialHealth.liquidityCoverageRatio < 1 && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 font-medium">
              Deficit of {formatINR(Math.abs(financialHealth.netImmediateLiquidityGap))} requires capital liberation.
            </div>
          )}
        </Card>

        <Card className="p-5 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-600">Operating Cash Runway</span>
            <Badge variant="amber" size="sm">
              {financialHealth.cashRunwayDays} Days
            </Badge>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">
            {financialHealth.cashRunwayDays} Days
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Days the retail store can operate at normal daily burn (₹3,570/day) before cash reserves reach zero without new collections.
          </p>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full" style={{ width: '36%' }} />
          </div>
        </Card>

        <Card className="p-5 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-600">Gross Operating Margin</span>
            <Badge variant="emerald" size="sm">
              Healthy
            </Badge>
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-600">
            {financialHealth.grossProfitMargin}%
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Strong margin generated primarily through premium high-velocity accessories (cables, 20W chargers) and screen repairs.
          </p>
          <span className="text-[11px] text-slate-400 block">Industry benchmark for telecom retail: 18-22%</span>
        </Card>
      </div>

      {/* P&L Statement Snapshot */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Operating P&L Performance (October 2026)</CardTitle>
          <CardDescription>Reconciled from Paytm transactions, NetBanking statements, and store ledger</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-2.5 flex justify-between font-semibold text-slate-900">
              <span>Gross Inflow (Sales & Services)</span>
              <span className="font-mono text-emerald-600">+{formatINR(financialHealth.totalRevenueMonthly)}</span>
            </div>
            <div className="py-2 flex justify-between text-slate-600 pl-4">
              <span>• Handset Sales & Telecom Hardware</span>
              <span className="font-mono text-slate-700">₹88,500</span>
            </div>
            <div className="py-2 flex justify-between text-slate-600 pl-4">
              <span>• Mobile Accessories (Chargers, Covers, Glass)</span>
              <span className="font-mono text-slate-700">₹39,800</span>
            </div>
            <div className="py-2 flex justify-between text-slate-600 pl-4">
              <span>• Screen Replacement & Device Repairs</span>
              <span className="font-mono text-slate-700">₹14,500</span>
            </div>

            <div className="py-2.5 flex justify-between font-semibold text-slate-900 pt-3">
              <span>Gross Operating Outflows</span>
              <span className="font-mono text-rose-600">-{formatINR(financialHealth.totalExpensesMonthly)}</span>
            </div>
            <div className="py-2 flex justify-between text-slate-600 pl-4">
              <span>• Supplier Restocking & Inventory Purchases</span>
              <span className="font-mono text-slate-700">₹72,000</span>
            </div>
            <div className="py-2 flex justify-between text-slate-600 pl-4">
              <span>• Shop Rental (Gomti Nagar Commercial)</span>
              <span className="font-mono text-slate-700">₹22,000</span>
            </div>
            <div className="py-2 flex justify-between text-slate-600 pl-4">
              <span>• Staff Salaries (1 Assistant Technician)</span>
              <span className="font-mono text-slate-700">₹10,500</span>
            </div>
            <div className="py-2 flex justify-between text-slate-600 pl-4">
              <span>• Electricity, High-speed Internet & Maintenance</span>
              <span className="font-mono text-slate-700">₹2,700</span>
            </div>

            <div className="py-3 flex justify-between font-bold text-sm text-slate-900 bg-slate-50 px-3 rounded-lg mt-2">
              <span>Net Monthly Operating Cashflow</span>
              <span className="font-mono text-indigo-700">+{formatINR(financialHealth.netOperatingCashflow)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
