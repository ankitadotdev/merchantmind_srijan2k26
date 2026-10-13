import React, { useState } from 'react';
import { BookOpen, Send, CheckCircle2, Clock, AlertCircle, Phone, ArrowUpRight } from 'lucide-react';
import { useMerchant } from '../context/MerchantContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { formatINR, formatDate } from '../utils/formatters';

export const KhataReceivablesView: React.FC = () => {
  const { receivables, sendKhataReminder, openEvidenceDrawer } = useMerchant();
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const totalReceivables = receivables.reduce((sum, r) => sum + r.outstandingAmount, 0);
  const overdueAmount = receivables
    .filter((r) => r.status === 'OVERDUE')
    .reduce((sum, r) => sum + r.outstandingAmount, 0);

  const handleSendReminder = async (id: string) => {
    setLoadingId(id);
    try {
      const res = await sendKhataReminder(id);
      setFeedbackMessage(res.message);
      setTimeout(() => setFeedbackMessage(null), 4000);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Khata & Customer Receivables</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Credit ledger tracking, aging buckets, and automated polite WhatsApp UPI collection links
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => openEvidenceDrawer('evi_02')}
            className="text-xs border-amber-300 text-amber-900"
          >
            <span>View Aging Risk Proof</span>
          </Button>
        </div>
      </div>

      {feedbackMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium rounded-xl flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <span className="text-xs text-slate-500 font-medium">Total Outstanding Khata</span>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
            {formatINR(totalReceivables)}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">5 Active Customer Ledgers</span>
        </Card>

        <Card className="p-4 border-rose-200 bg-rose-50/20">
          <span className="text-xs text-rose-800 font-medium">Overdue Trapped Capital (&gt;30d)</span>
          <div className="text-2xl font-bold font-mono text-rose-700 mt-1">
            {formatINR(overdueAmount)}
          </div>
          <Badge variant="rose" size="sm" className="mt-1">
            High Default Hazard
          </Badge>
        </Card>

        <Card className="p-4">
          <span className="text-xs text-slate-500 font-medium">Current / Due Within 7 Days</span>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
            {formatINR(totalReceivables - overdueAmount)}
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Healthy turnover velocity</span>
        </Card>
      </div>

      {/* Aging Distribution Bar */}
      <Card className="p-5 space-y-3">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
          <span>Khata Aging Distribution</span>
          <span className="text-slate-400 font-normal">Overdue threshold: 30 days</span>
        </div>
        <div className="w-full h-3 rounded-full bg-slate-100 flex overflow-hidden">
          <div style={{ width: '44%' }} title="0-7 Days: ₹19,000" className="bg-emerald-500" />
          <div style={{ width: '47%' }} title="8-30 Days: ₹20,500" className="bg-indigo-500" />
          <div style={{ width: '9%' }} title="31-60 Days: ₹3,700" className="bg-rose-500" />
        </div>
        <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-600 pt-1">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> 0–7 Days: <strong>₹19,000</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> 8–30 Days: <strong>₹20,500</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> 31–60 Days (Overdue): <strong className="text-rose-600">₹3,700</strong>
          </span>
        </div>
      </Card>

      {/* Customer Khata Ledger Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Khata Ledger Details</CardTitle>
          <CardDescription>
            One-click polite reminder triggers dispatch unique dynamic Paytm/UPI intent paylinks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold">
                <tr>
                  <th className="px-3.5 py-2.5 text-left">Customer & Contact</th>
                  <th className="px-3 py-2.5 text-left">Invoice #</th>
                  <th className="px-3 py-2.5 text-left">Due Date</th>
                  <th className="px-3 py-2.5 text-right">Outstanding</th>
                  <th className="px-3 py-2.5 text-center">Overdue</th>
                  <th className="px-3 py-2.5 text-left">Status</th>
                  <th className="px-3 py-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {receivables.map((rec) => (
                  <tr
                    key={rec.id}
                    className={
                      rec.status === 'OVERDUE'
                        ? 'bg-rose-50/40 hover:bg-rose-50/70 transition-colors'
                        : 'hover:bg-slate-50/80 transition-colors'
                    }
                  >
                    <td className="px-3.5 py-2.5">
                      <div className="font-semibold text-slate-900">{rec.customerName}</div>
                      <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3" />
                        <span>{rec.customerPhone}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 font-mono text-slate-700">{rec.invoiceNumber}</td>
                    <td className="px-3 py-2.5 text-slate-500">{formatDate(rec.dueDate)}</td>
                    <td className="px-3 py-2.5 text-right font-mono font-bold text-slate-900">
                      {formatINR(rec.outstandingAmount)}
                    </td>
                    <td className="px-3 py-2.5 text-center font-mono">
                      {rec.daysOverdue > 0 ? (
                        <span className="text-rose-700 font-bold">{rec.daysOverdue}d</span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-3 py-2.5">
                      <Badge
                        variant={
                          rec.status === 'COLLECTED'
                            ? 'emerald'
                            : rec.status === 'OVERDUE'
                            ? 'rose'
                            : rec.status === 'DUE_SOON'
                            ? 'amber'
                            : 'slate'
                        }
                        size="sm"
                      >
                        {rec.status}
                      </Badge>
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      {rec.status === 'OVERDUE' && (
                        <Button
                          variant="primary"
                          size="sm"
                          isLoading={loadingId === rec.id}
                          onClick={() => handleSendReminder(rec.id)}
                          className="text-xs py-1 px-2.5 h-7 bg-indigo-600 hover:bg-indigo-700"
                        >
                          <Send className="w-3 h-3 mr-1" />
                          <span>Remind WhatsApp</span>
                        </Button>
                      )}
                      {rec.status === 'COLLECTED' && (
                        <span className="text-emerald-700 font-semibold text-[11px] inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Paid</span>
                        </span>
                      )}
                      {rec.status === 'CURRENT' && (
                        <span className="text-slate-400 text-[11px]">On Schedule</span>
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
