import React from 'react';
import { Package, AlertTriangle, ArrowRight, Zap, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { useMerchant } from '../context/MerchantContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { formatINR } from '../utils/formatters';

export const InventoryView: React.FC = () => {
  const { inventory, financialHealth, openEvidenceDrawer, setActiveAppTab } = useMerchant();

  const deadStockItems = inventory.filter((i) => i.status === 'DEAD_STOCK');
  const fastMovingItems = inventory.filter((i) => i.status === 'FAST_MOVING');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Inventory Velocity & Locked Capital</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time stock velocity, turnover ratios, and dead stock capital liberation
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => openEvidenceDrawer('evi_03')}
          className="text-xs border-amber-300 text-amber-900"
        >
          <span>Inspect Dead Stock Audit</span>
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <span className="text-xs text-slate-500 font-medium">Total Inventory Valuation</span>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
            {formatINR(financialHealth?.totalInventoryValuation || 86400)}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Cost Value (6 Core SKUs)</span>
        </Card>

        <Card className="p-4 border-amber-200 bg-amber-50/20">
          <span className="text-xs text-amber-800 font-medium">Dead Stock Capital Locked</span>
          <div className="text-2xl font-bold font-mono text-amber-900 mt-1">
            {formatINR(financialHealth?.deadStockCapitalLocked || 10660)}
          </div>
          <Badge variant="amber" size="sm" className="mt-1">
            47+ Days Idle (0 Velocity)
          </Badge>
        </Card>

        <Card className="p-4">
          <span className="text-xs text-slate-500 font-medium">Fast-Moving Stock Value</span>
          <div className="text-2xl font-bold font-mono text-emerald-600 mt-1">
            ₹29,240
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Avg turn: 24 units/month</span>
        </Card>
      </div>

      {/* Dead Stock Action Recommendation Banner */}
      {financialHealth?.deadStockCapitalLocked && financialHealth.deadStockCapitalLocked > 0 ? (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                Capital Unlock Candidate: Stagnant Smartphone Accessories
              </h4>
              <p className="text-xs text-amber-800 mt-0.5">
                iPhone 11 cases, armbands & OTG adapters have 0 sales in 30 days. Running a 48h clearance frees <strong>₹7,800 cash</strong>.
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setActiveAppTab('actions')}
            className="bg-amber-600 hover:bg-amber-700 text-xs"
          >
            <span>Launch Flash Clearance (Unlock ₹7.8K) &rarr;</span>
          </Button>
        </div>
      ) : null}

      {/* Inventory SKU Table */}
      <Card>
        <CardHeader>
          <CardTitle>SKU Inventory Valuation & Velocity</CardTitle>
          <CardDescription>
            Continuous stock deduction synced with Smart POS barcode scanner
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold">
                <tr>
                  <th className="px-3.5 py-2.5 text-left">SKU & Item Title</th>
                  <th className="px-3 py-2.5 text-left">Category</th>
                  <th className="px-3 py-2.5 text-center">Stock</th>
                  <th className="px-3 py-2.5 text-right">Cost Price</th>
                  <th className="px-3 py-2.5 text-right">Locked Capital</th>
                  <th className="px-3 py-2.5 text-center">Days Idle</th>
                  <th className="px-3 py-2.5 text-left">Status</th>
                  <th className="px-3 py-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {inventory.map((item) => (
                  <tr
                    key={item.id}
                    className={
                      item.status === 'DEAD_STOCK'
                        ? 'bg-amber-50/40 hover:bg-amber-50/70 transition-colors'
                        : 'hover:bg-slate-50/80 transition-colors'
                    }
                  >
                    <td className="px-3.5 py-2.5">
                      <div className="font-semibold text-slate-900">{item.title}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{item.sku}</div>
                    </td>
                    <td className="px-3 py-2.5 text-slate-600">{item.category}</td>
                    <td className="px-3 py-2.5 text-center font-mono font-semibold text-slate-800">
                      {item.currentStock} units
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono text-slate-600">
                      {formatINR(item.unitCostPrice)}
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono font-bold text-slate-900">
                      {formatINR(item.totalLockedCapital)}
                    </td>
                    <td className="px-3 py-2.5 text-center font-mono">
                      <span className={item.daysInStock >= 45 ? 'text-amber-800 font-bold' : 'text-slate-500'}>
                        {item.daysInStock}d
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <Badge
                        variant={
                          item.status === 'DEAD_STOCK'
                            ? 'amber'
                            : item.status === 'FAST_MOVING'
                            ? 'emerald'
                            : 'slate'
                        }
                        size="sm"
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      {item.status === 'DEAD_STOCK' ? (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => setActiveAppTab('actions')}
                          className="text-xs py-1 px-2.5 h-7 bg-amber-600 hover:bg-amber-700"
                        >
                          Clearance &rarr;
                        </Button>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Normal</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
