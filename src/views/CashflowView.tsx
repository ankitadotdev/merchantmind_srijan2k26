import React from 'react';
import { TrendingUp, AlertTriangle, Calendar, ShieldCheck, ChevronRight } from 'lucide-react';
import { useMerchant } from '../context/MerchantContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { formatINR, formatDate } from '../utils/formatters';

export const CashflowView: React.FC = () => {
  const { cashflow, financialHealth, openEvidenceDrawer, setActiveAppTab } = useMerchant();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Cashflow & Liquidity Cliff Radar</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            14-day daily rolling projection combining Paytm settlements, scheduled invoices, and overheads
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => openEvidenceDrawer('evi_01')}
          className="text-xs border-rose-300 text-rose-800 hover:bg-rose-50"
        >
          <AlertTriangle className="w-3.5 h-3.5 mr-1 text-rose-600" />
          <span>Inspect Oct 9 Cliff Evidence</span>
        </Button>
      </div>

      {/* Critical Cliff Warning Banner */}
      <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold text-sm">
            !
          </div>
          <div>
            <h4 className="text-xs font-bold text-rose-950 uppercase tracking-wider">
              Cliff Detected on 09 Oct 2026 (Friday)
            </h4>
            <p className="text-xs text-rose-800 mt-0.5">
              Sharma Telecom bill (₹45,000) causes cash reserve to collapse to ₹5,607, breaching your ₹45,000 safe buffer.
            </p>
          </div>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setActiveAppTab('opportunities')}
          className="bg-rose-600 hover:bg-rose-700 text-xs"
        >
          <span>Act to Prevent Deficit &rarr;</span>
        </Button>
      </div>

      {/* 14-Day Projection Ledger Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Liquidity Trajectory (28 Sep — 11 Oct 2026)</CardTitle>
          <CardDescription>
            Historical actuals transitioned into deterministic forward projections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold">
                <tr>
                  <th className="px-3.5 py-2.5 text-left">Date</th>
                  <th className="px-3 py-2.5 text-left">Day</th>
                  <th className="px-3 py-2.5 text-right">Inflow (Sales/Khata)</th>
                  <th className="px-3 py-2.5 text-right">Outflow (Bills/Rent)</th>
                  <th className="px-3 py-2.5 text-right">Net Daily</th>
                  <th className="px-3.5 py-2.5 text-right">Projected Balance</th>
                  <th className="px-3.5 py-2.5 text-left">Status / Annotations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {cashflow.map((row, idx) => {
                  const isBelowBuffer = row.projectedBalance < row.safeBufferLine;
                  return (
                    <tr
                      key={idx}
                      className={
                        row.isCliff
                          ? 'bg-rose-100/70 font-semibold'
                          : row.date === '2026-10-04'
                          ? 'bg-indigo-50/60 font-semibold'
                          : isBelowBuffer && row.isForecast
                          ? 'bg-amber-50/50'
                          : 'hover:bg-slate-50/80 transition-colors'
                      }
                    >
                      <td className="px-3.5 py-2.5 font-mono text-slate-900">{formatDate(row.date)}</td>
                      <td className="px-3 py-2.5 text-slate-600">{row.dayLabel}</td>
                      <td className="px-3 py-2.5 text-right font-mono text-emerald-600 font-semibold">
                        +{formatINR(row.inflow)}
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono text-rose-600 font-semibold">
                        -{formatINR(row.outflow)}
                      </td>
                      <td
                        className={`px-3 py-2.5 text-right font-mono font-bold ${
                          row.netDaily >= 0 ? 'text-emerald-700' : 'text-rose-700'
                        }`}
                      >
                        {formatINR(row.netDaily, { showSign: true })}
                      </td>
                      <td
                        className={`px-3.5 py-2.5 text-right font-mono font-bold ${
                          row.isCliff
                            ? 'text-rose-900 text-sm'
                            : isBelowBuffer
                            ? 'text-amber-800'
                            : 'text-slate-900'
                        }`}
                      >
                        {formatINR(row.projectedBalance)}
                      </td>
                      <td className="px-3.5 py-2.5">
                        {row.isCliff ? (
                          <Badge variant="rose" size="sm">
                            ⚠️ Liquidity Cliff (-₹40,800 day)
                          </Badge>
                        ) : row.date === '2026-10-04' ? (
                          <Badge variant="indigo" size="sm">
                            Current Point
                          </Badge>
                        ) : row.isForecast ? (
                          <span className="text-[11px] text-slate-400">Forecasted</span>
                        ) : (
                          <span className="text-[11px] text-emerald-600">Settled Actual</span>
                        )}
                        {row.annotation && (
                          <span className="text-[11px] text-slate-600 ml-2 italic">
                            {row.annotation}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
