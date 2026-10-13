import React, { useState } from 'react';
import { Receipt, Search, Filter, ArrowDownLeft, ArrowUpRight, QrCode, CreditCard, Banknote } from 'lucide-react';
import { useMerchant } from '../context/MerchantContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { formatINR, formatDate } from '../utils/formatters';

export const TransactionsView: React.FC = () => {
  const { transactions } = useMerchant();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  const filtered = transactions.filter((tx) => {
    const matchSearch =
      tx.counterparty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.referenceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = filterType === 'ALL' || tx.type === filterType;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Unified Transaction Ledger</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Normalized transaction stream consolidating Paytm QR, EDC card swipes, UPI, and cash registers
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search counterparty, reference ID, category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          {['ALL', 'INFLOW_SALE', 'OUTFLOW_EXPENSE'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer ${
                filterType === t
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {t === 'ALL' ? 'All Transactions' : t === 'INFLOW_SALE' ? 'Inflows' : 'Outflows'}
            </button>
          ))}
        </div>
      </div>

      {/* Ledger Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold">
                <tr>
                  <th className="px-4 py-3 text-left">Date & Time</th>
                  <th className="px-3 py-3 text-left">Counterparty</th>
                  <th className="px-3 py-3 text-left">Channel</th>
                  <th className="px-3 py-3 text-left">Category</th>
                  <th className="px-3 py-3 text-left">Reference #</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filtered.map((tx) => {
                  const isInflow = tx.type.startsWith('INFLOW');
                  return (
                    <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3 font-mono text-slate-600">
                        {formatDate(tx.date)} • {tx.time}
                      </td>
                      <td className="px-3 py-3 font-semibold text-slate-900">{tx.counterparty}</td>
                      <td className="px-3 py-3">
                        <Badge variant="indigo" size="sm">
                          {tx.channel.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td className="px-3 py-3 text-slate-600">{tx.category}</td>
                      <td className="px-3 py-3 font-mono text-slate-500">{tx.referenceId}</td>
                      <td
                        className={`px-4 py-3 text-right font-mono font-bold ${
                          isInflow ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        {isInflow ? '+' : '-'}
                        {formatINR(tx.amount)}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="emerald" size="sm">
                          {tx.status}
                        </Badge>
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
