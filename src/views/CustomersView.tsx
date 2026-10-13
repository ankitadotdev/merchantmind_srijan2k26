import React, { useState } from 'react';
import { Users, Phone, ArrowUpRight, Star, ShoppingBag, Calendar, CheckCircle2, Award } from 'lucide-react';
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

  const stableCustomers = customers.filter((c) => c.segment === 'STABLE');
  const highValueCustomers = customers.filter((c) => c.segment === 'HIGH_VALUE');
  const totalSpendAll = customers.reduce((acc, c) => acc + c.totalLifetimeSpend, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Customer Directory & Repeat Insights</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            RFM segmentation, repeat purchasing habits, and customer retention analytics
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
            Generates top 40% of monthly retail turnover
          </span>
        </Card>

        <Card className="p-4 border-indigo-200 bg-indigo-50/20">
          <span className="text-xs text-indigo-900 font-medium">Stable Repeat Shoppers</span>
          <div className="text-2xl font-bold font-mono text-indigo-700 mt-1">
            {stableCustomers.length} Customers
          </div>
          <Badge variant="indigo" size="sm" className="mt-1">
            Frequent Footfall
          </Badge>
        </Card>

        <Card className="p-4">
          <span className="text-xs text-slate-500 font-medium">Total Tracked Customer LTV</span>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
            {formatINR(totalSpendAll)}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Cumulative purchase volume</span>
        </Card>
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Directory</CardTitle>
          <CardDescription>
            Click any customer row to inspect their detailed profile, order history, and RFM status
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
                  <th className="px-3 py-3 text-center">Total Orders</th>
                  <th className="px-3 py-3 text-center">Last Purchase</th>
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
                            : c.segment === 'STABLE'
                            ? 'indigo'
                            : 'slate'
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
                    <td className="px-3 py-3 text-center font-mono text-slate-600">
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
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[11px] block">Lifetime Value</span>
                <strong className="text-slate-900 font-mono text-sm block mt-0.5">
                  {formatINR(selectedCustomer.totalLifetimeSpend)}
                </strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[11px] block">Completed Orders</span>
                <strong className="text-slate-900 font-mono text-sm block mt-0.5">
                  {selectedCustomer.totalOrders} purchases
                </strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[11px] block">Last Transaction</span>
                <strong className="text-slate-900 font-mono text-sm block mt-0.5">
                  {formatDate(selectedCustomer.lastPurchaseDate)}
                </strong>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block">
                Customer Intelligence Summary
              </span>
              <p className="text-slate-600 leading-relaxed">
                Customer <strong>{selectedCustomer.name}</strong> is categorized as <strong>{selectedCustomer.segment.replace('_', ' ')}</strong>. With a cumulative spend of <strong>{formatINR(selectedCustomer.totalLifetimeSpend)}</strong> across <strong>{selectedCustomer.totalOrders}</strong> visits, they represent consistent repeat footfall at Abhishek Mobile & Accessories.
              </p>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end pt-2 border-t border-slate-100">
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
