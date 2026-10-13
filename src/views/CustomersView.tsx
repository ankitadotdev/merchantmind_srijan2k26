import React, { useState } from 'react';
import { Users, Phone, ArrowUpRight, AlertTriangle, ShieldCheck, Star, Send, CheckCircle2, Receipt, Clock } from 'lucide-react';
import { useMerchant } from '../context/MerchantContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { formatINR, formatDate } from '../utils/formatters';
import type { CustomerProfile } from '../types';

export const CustomersView: React.FC = () => {
  const { customers, receivables, sendKhataReminder, openEvidenceDrawer, setActiveAppTab } = useMerchant();
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [loadingReminder, setLoadingReminder] = useState<boolean>(false);

  const atRiskCustomers = customers.filter((c) => c.segment === 'AT_RISK');
  const highValueCustomers = customers.filter((c) => c.segment === 'HIGH_VALUE');

  // Customer Invoices
  const customerInvoices = selectedCustomer
    ? receivables.filter((r) => r.customerId === selectedCustomer.id)
    : [];

  const handleSendReminder = async (recId: string) => {
    setLoadingReminder(true);
    try {
      const res = await sendKhataReminder(recId);
      setFeedbackMessage(res.message);
      setTimeout(() => setFeedbackMessage(null), 4000);
    } finally {
      setLoadingReminder(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Customer Intelligence & Credit Profiles</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            RFM segmentation, credit payment discipline scores, and churn hazard detection
          </p>
        </div>
      </div>

      {feedbackMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium rounded-xl flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedbackMessage}</span>
        </div>
      )}

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

        <Card className="p-4 border-rose-200 bg-rose-50/20">
          <span className="text-xs text-rose-800 font-medium">Khata Credit At-Risk</span>
          <div className="text-2xl font-bold font-mono text-rose-700 mt-1">
            {atRiskCustomers.length} Customers
          </div>
          <Badge variant="rose" size="sm" className="mt-1">
            Amit Verma & Neha Sharma
          </Badge>
        </Card>

        <Card className="p-4">
          <span className="text-xs text-slate-500 font-medium">Avg Payment Latency</span>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
            18.4 Days
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Standard credit term: 14 days</span>
        </Card>
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Directory & Credit Discipline</CardTitle>
          <CardDescription>
            Click any customer row to inspect their detailed ledger, invoices, and credit risk score
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
                  <th className="px-3 py-3 text-right">Outstanding Khata</th>
                  <th className="px-3 py-3 text-center">Avg Delay</th>
                  <th className="px-3 py-3 text-center">Risk Score</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {customers.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedCustomer(c)}
                    className={`cursor-pointer transition-colors ${
                      c.segment === 'AT_RISK'
                        ? 'bg-rose-50/30 hover:bg-rose-50/70'
                        : 'hover:bg-slate-50/80'
                    }`}
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
                            ? 'rose'
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
                    <td className="px-3 py-3 text-right font-mono font-bold text-slate-900">
                      {c.currentOutstandingKhata > 0 ? (
                        <span className={c.segment === 'AT_RISK' ? 'text-rose-600' : 'text-slate-900'}>
                          {formatINR(c.currentOutstandingKhata)}
                        </span>
                      ) : (
                        <span className="text-slate-400">₹0</span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-center font-mono text-slate-600">
                      {c.avgPaymentLatencyDays}d
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span
                        className={`font-mono font-bold ${
                          c.riskScore >= 60 ? 'text-rose-600' : 'text-emerald-600'
                        }`}
                      >
                        {c.riskScore}/100
                      </span>
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
                  {selectedCustomer.totalOrders} purchases
                </strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[11px] block">Outstanding Khata</span>
                <strong className={`font-mono text-sm block mt-0.5 ${selectedCustomer.currentOutstandingKhata > 0 ? 'text-rose-600' : 'text-slate-900'}`}>
                  {formatINR(selectedCustomer.currentOutstandingKhata)}
                </strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[11px] block">Credit Risk Rating</span>
                <strong className={`font-mono text-sm block mt-0.5 ${selectedCustomer.riskScore >= 60 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {selectedCustomer.riskScore}/100
                </strong>
              </div>
            </div>

            {/* Invoices List */}
            <div className="space-y-2">
              <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block">
                Associated Khata Invoices
              </span>
              {customerInvoices.length > 0 ? (
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="min-w-full divide-y divide-slate-200 text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-semibold">
                      <tr>
                        <th className="px-3.5 py-2 text-left">Invoice #</th>
                        <th className="px-3 py-2 text-left">Due Date</th>
                        <th className="px-3 py-2 text-right">Outstanding</th>
                        <th className="px-3 py-2 text-center">Overdue</th>
                        <th className="px-3.5 py-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {customerInvoices.map((inv) => (
                        <tr key={inv.id}>
                          <td className="px-3.5 py-2.5 font-mono font-semibold text-slate-900">
                            {inv.invoiceNumber}
                          </td>
                          <td className="px-3 py-2.5 text-slate-500">{formatDate(inv.dueDate)}</td>
                          <td className="px-3 py-2.5 text-right font-mono font-bold text-slate-900">
                            {formatINR(inv.outstandingAmount)}
                          </td>
                          <td className="px-3 py-2.5 text-center font-mono">
                            {inv.daysOverdue > 0 ? (
                              <span className="text-rose-600 font-bold">{inv.daysOverdue} days</span>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </td>
                          <td className="px-3.5 py-2.5 text-right">
                            {inv.status === 'OVERDUE' && (
                              <Button
                                variant="primary"
                                size="sm"
                                isLoading={loadingReminder}
                                onClick={() => handleSendReminder(inv.id)}
                                className="text-xs py-1 px-2.5 h-7 bg-indigo-600 hover:bg-indigo-700"
                              >
                                <Send className="w-3 h-3 mr-1" />
                                <span>Send WhatsApp</span>
                              </Button>
                            )}
                            {inv.status === 'COLLECTED' && (
                              <Badge variant="emerald" size="sm">
                                Settled
                              </Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-3 bg-slate-50 rounded-xl text-center text-slate-500 text-xs">
                  No active unpaid Khata invoices for this customer.
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-[11px] text-slate-400">
                Payment latency average: <strong>{selectedCustomer.avgPaymentLatencyDays} days</strong>
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
