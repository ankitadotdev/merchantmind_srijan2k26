import React, { useState } from 'react';
import { Building2, AlertTriangle, Clock, Calendar, CheckCircle2, DollarSign, Phone, FileText, ChevronRight } from 'lucide-react';
import { useMerchant } from '../context/MerchantContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { formatINR, formatDate } from '../utils/formatters';
import type { PayableRecord } from '../types';

export const SupplierPayablesView: React.FC = () => {
  const { payables, openEvidenceDrawer, setActiveAppTab } = useMerchant();
  const [selectedPayable, setSelectedPayable] = useState<PayableRecord | null>(null);

  const totalPayables = payables.reduce((sum, p) => sum + p.balanceDue, 0);
  const urgentPayables = payables.filter((p) => p.isCliff || p.daysUntilDue <= 7).reduce((sum, p) => sum + p.balanceDue, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Supplier Payables & Obligations</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Wholesale distributor invoices, payment cliffs, and prompt-settlement rebate opportunities
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => openEvidenceDrawer('evi_01')}
          className="text-xs border-rose-300 text-rose-800"
        >
          <span>Inspect Cliff Exposure</span>
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <span className="text-xs text-slate-500 font-medium">Total Accounts Payable</span>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
            {formatINR(totalPayables)}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">2 Wholesale Distributors</span>
        </Card>

        <Card className="p-4 border-rose-200 bg-rose-50/20">
          <span className="text-xs text-rose-800 font-medium">Due in Next 7 Days (Liquidity Cliff)</span>
          <div className="text-2xl font-bold font-mono text-rose-700 mt-1">
            {formatINR(urgentPayables)}
          </div>
          <Badge variant="rose" size="sm" className="mt-1">
            Matures Oct 9 (5 days)
          </Badge>
        </Card>

        <Card className="p-4">
          <span className="text-xs text-slate-500 font-medium">Early-Pay Rebates Available</span>
          <div className="text-2xl font-bold font-mono text-emerald-600 mt-1">
            ₹675 Saved
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">1.5% discount if settled on time</span>
        </Card>
      </div>

      {/* Supplier Bills Table */}
      <Card>
        <CardHeader>
          <CardTitle>Wholesale Invoices & Maturity Schedule</CardTitle>
          <CardDescription>
            Click any invoice row to inspect vendor terms, credit grace periods, and prompt payment rebates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold">
                <tr>
                  <th className="px-3.5 py-2.5 text-left">Supplier Name</th>
                  <th className="px-3 py-2.5 text-left">Bill Number</th>
                  <th className="px-3 py-2.5 text-left">Maturity Date</th>
                  <th className="px-3 py-2.5 text-right">Amount Due</th>
                  <th className="px-3 py-2.5 text-center">Days Remaining</th>
                  <th className="px-3 py-2.5 text-left">Risk / Cliff</th>
                  <th className="px-3 py-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {payables.map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => setSelectedPayable(p)}
                    className={`cursor-pointer transition-colors ${
                      p.isCliff
                        ? 'bg-rose-50/40 hover:bg-rose-50/70 font-semibold'
                        : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <td className="px-3.5 py-2.5">
                      <div className="font-semibold text-slate-900 hover:text-indigo-600 transition-colors">
                        {p.supplierName}
                      </div>
                      <div className="text-[11px] text-slate-400">{p.supplierCategory}</div>
                    </td>
                    <td className="px-3 py-2.5 font-mono text-slate-700">{p.billNumber}</td>
                    <td className="px-3 py-2.5 text-slate-600">{formatDate(p.dueDate)}</td>
                    <td className="px-3 py-2.5 text-right font-mono font-bold text-slate-900">
                      {formatINR(p.balanceDue)}
                    </td>
                    <td className="px-3 py-2.5 text-center font-mono">
                      <span className={p.daysUntilDue <= 5 ? 'text-rose-700 font-bold' : 'text-slate-600'}>
                        {p.daysUntilDue} days
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      {p.isCliff ? (
                        <Badge variant="rose" size="sm">
                          ⚠️ Liquidity Cliff
                        </Badge>
                      ) : (
                        <Badge variant="slate" size="sm">
                          Normal Schedule
                        </Badge>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      {p.isCliff ? (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveAppTab('opportunities');
                          }}
                          className="text-xs py-1 px-2.5 h-7 bg-rose-600 hover:bg-rose-700"
                        >
                          Resolve Cliff &rarr;
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPayable(p);
                          }}
                          className="text-xs py-1 px-2.5 h-7"
                        >
                          Details &rarr;
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Supplier Detail Modal */}
      {selectedPayable && (
        <Modal
          isOpen={Boolean(selectedPayable)}
          onClose={() => setSelectedPayable(null)}
          title={`Wholesale Obligation: ${selectedPayable.supplierName}`}
          description={`Bill: ${selectedPayable.billNumber} • Category: ${selectedPayable.supplierCategory}`}
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Invoice Total Balance:</span>
                <strong className="text-base font-mono font-bold text-slate-900">
                  {formatINR(selectedPayable.balanceDue)}
                </strong>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500">Maturity Date:</span>
                <span className="font-mono text-slate-800">{formatDate(selectedPayable.dueDate)} ({selectedPayable.daysUntilDue} days remaining)</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500">Distributor Contact:</span>
                <span className="font-mono text-slate-800">{selectedPayable.supplierPhone}</span>
              </div>
            </div>

            {selectedPayable.earlyPaymentDiscountPercent && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 space-y-1">
                <span className="font-bold text-[11px] block uppercase">Early Settlement Rebate</span>
                <p className="text-[11px] leading-relaxed">
                  Paying within <strong>{selectedPayable.earlyPaymentDiscountDays} days</strong> of invoice date unlocks a <strong>{selectedPayable.earlyPaymentDiscountPercent}% cash discount</strong> (₹675 savings).
                </p>
              </div>
            )}

            {selectedPayable.isCliff && (
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-rose-900 space-y-1">
                <span className="font-bold text-[11px] block uppercase">Liquidity Cliff Alert</span>
                <p className="text-[11px] leading-relaxed">
                  This obligation exceeds liquid reserves by ₹4,393. Bouncing this bill will incur bank bounce penalties and forfeit wholesale purchase terms.
                </p>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedPayable(null);
                  openEvidenceDrawer('evi_01');
                }}
                className="text-xs"
              >
                Inspect Proof &rarr;
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setSelectedPayable(null);
                  setActiveAppTab('opportunities');
                }}
                className="text-xs bg-indigo-600 hover:bg-indigo-700"
              >
                View Solution &rarr;
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
