import React, { useState } from 'react';
import { Users, Phone, Calendar, ShoppingBag, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useMerchant } from '../context/MerchantContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { formatINR, formatDate } from '../utils/formatters';
import type { CustomerProfile } from '../types';

export const CustomersView: React.FC = () => {
  const { customers } = useMerchant();
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile | null>(null);

  const atRiskCustomers = customers.filter((c) => c.segment === 'AT_RISK');
  const highValueCustomers = customers.filter((c) => c.segment === 'HIGH_VALUE');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Customer Directory & Repeat Intelligence</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            RFM segmentation, repeat customer frequency, and lifetime purchasing value
          </p>
        </div>
      </div>

      {/* Segment Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <span className="text-xs text-slate-500 font-medium">High Value Regulars</span>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
            {highValueCustomers.length} Customers
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            Generates 68% of monthly retail turnover
          </span>
        </Card>

        <Card className="p-4 border-amber-200 bg-amber-50/20">
          <span className="text-xs text-amber-800 font-medium">At-Risk / Lapsing</span>
          <div className="text-2xl font-bold font-mono text-amber-700 mt-1">
            {atRiskCustomers.length} Customers
          </div>
          <span className="text-[11px] text-amber-700 font-medium mt-1 block">
            Zero store visits in &gt;25 days
          </span>
        </Card>

        <Card className="p-4">
          <span className="text-xs text-slate-500 font-medium">Total Tracked Customers</span>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
            {customers.length} Profiles
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Identified via Paytm QR & counter invoices
          </span>
        </Card>
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Directory & Purchase History</CardTitle>
          <CardDescription>
            Click any customer row to inspect their RFM purchasing profile and repeat activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold">
                <tr>
                  <th className="px-4 py-3 text-left">Customer Name</th>
                  <th className="px-3 py-3 text-left">Segment</th>
                  <th className="px-3 py-3 text-right">Lifetime Spend</th>
                  <th className="px-3 py-3 text-center">Orders</th>
                  <th className="px-3 py-3 text-left">Last Purchase</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {customers.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedCustomer(c)}
                    className="cursor-pointer transition-colors hover:bg-slate-50/80"
                  >
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900 hover:text-indigo-600 transition-colors">
                        {c.name}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3" />
                        <span>{c.phone}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <Badge
                        variant={
                          c.segment === 'HIGH_VALUE'
                            ? 'emerald'
                            : c.segment === 'AT_RISK'
                            ? 'amber'
                            : 'indigo'
                        }
                        size="sm"
                      >
                        {c.segment.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="px-3 py-3 text-right font-mono font-bold text-slate-900">
                      {formatINR(c.totalLifetimeSpend)}
                    </td>
                    <td className="px-3 py-3 text-center font-mono text-slate-700">
                      {c.totalOrders}
                    </td>
                    <td className="px-3 py-3 font-mono text-slate-600">
                      {formatDate(c.lastPurchaseDate)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCustomer(c);
                        }}
                        className="text-xs py-1 px-2.5 h-7"
                      >
                        Inspect &rarr;
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <Modal
          isOpen={Boolean(selectedCustomer)}
          onClose={() => setSelectedCustomer(null)}
          title={`Customer Profile: ${selectedCustomer.name}`}
          description={`Contact: ${selectedCustomer.phone} • Segment: ${selectedCustomer.segment.replace('_', ' ')}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            {/* KPI Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[11px] block">Lifetime Value</span>
                <strong className="text-slate-900 font-mono text-sm block mt-0.5">
                  {formatINR(selectedCustomer.totalLifetimeSpend)}
                </strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[11px] block">Completed Orders</span>
                <strong className="text-slate-900 font-mono text-sm block mt-0.5">
                  {selectedCustomer.totalOrders} visits
                </strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[11px] block">Avg Order Value</span>
                <strong className="text-slate-900 font-mono text-sm block mt-0.5">
                  {formatINR(Math.round(selectedCustomer.totalLifetimeSpend / Math.max(1, selectedCustomer.totalOrders)))}
                </strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[11px] block">Last Visit</span>
                <strong className="text-slate-900 font-mono text-sm block mt-0.5">
                  {formatDate(selectedCustomer.lastPurchaseDate)}
                </strong>
              </div>
            </div>

            <div className="p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-1">
              <span className="font-semibold text-indigo-900 block text-xs">
                Repeat Customer Insights
              </span>
              <p className="text-[11px] text-indigo-700 leading-relaxed">
                This customer exhibits high brand loyalty with frequent repeat counter visits at Abhishek Mobile. Recommending exclusive festive launch preview communications to maximize retention.
              </p>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-[11px] text-slate-400 font-mono">
                ID: {selectedCustomer.id}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCustomer(null)}
                className="text-xs"
              >
                Close Profile
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
