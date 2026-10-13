import React, { useState } from 'react';
import {
  Cpu,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  UploadCloud,
  FileSpreadsheet,
  Layers,
  ArrowRight,
  Database,
  Radio,
  FileText,
  Filter,
} from 'lucide-react';
import { useMerchant } from '../context/MerchantContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { formatDateTime } from '../utils/formatters';

export const IngestionView: React.FC = () => {
  const { ingestionLogs, triggerDataSync } = useMerchant();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  const handleSimulateUpload = (filename: string) => {
    setSelectedFile(filename);
    setUploadProgress(10);
    setUploadSuccess(false);

    setTimeout(() => setUploadProgress(45), 300);
    setTimeout(() => setUploadProgress(80), 700);
    setTimeout(() => {
      setUploadProgress(100);
      setUploadSuccess(true);
      triggerDataSync('conn_csv');
    }, 1100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Data Sources & Ingestion
            </h1>
            <Badge variant="indigo" size="sm">
              Continuous Feed Active
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            MerchantMind monitors connected feeds continuously. Manual imports serve as historical onboarding and reconciliation fallbacks.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => triggerDataSync('conn_paytm')}
          className="text-xs"
        >
          <RefreshCw className="w-3.5 h-3.5 mr-1" />
          <span>Simulate Ingestion Batch</span>
        </Button>
      </div>

      {/* Core Repositioning Banner: Connected Sources + Manual Import */}
      <div className="p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl border border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-900/60 border border-indigo-700/60 px-2 py-0.5 rounded font-mono">
              The Architecture Story
            </span>
            <span className="text-xs text-slate-300 font-medium">
              Zero Daily Manual Friction
            </span>
          </div>
          <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            6 Live Data Pipelines Connected
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
          Merchants <strong>connect once</strong>, after which MerchantMind continuously evaluates payments, bank balance, Paytm telemetry, and upcoming supplier liabilities. <strong>Manual imports are never required daily</strong>—they exist strictly for:
        </p>

        {/* 5 Specific Manual Use Cases */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs font-medium">
          <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/80 text-center">
            <span className="text-indigo-300 block text-[11px]">1. Historical Data</span>
            <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Past year ledgers</span>
          </div>
          <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/80 text-center">
            <span className="text-indigo-300 block text-[11px]">2. Initial Onboarding</span>
            <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Customer Directory CSV</span>
          </div>
          <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/80 text-center">
            <span className="text-indigo-300 block text-[11px]">3. Reconciliation</span>
            <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Offline bank passbooks</span>
          </div>
          <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/80 text-center">
            <span className="text-indigo-300 block text-[11px]">4. Legacy Systems</span>
            <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Offline Tally vouchers</span>
          </div>
          <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/80 text-center col-span-2 sm:col-span-1">
            <span className="text-indigo-300 block text-[11px]">5. Data Recovery</span>
            <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Disaster rollback</span>
          </div>
        </div>
      </div>

      {/* Visual Pipeline Progression */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-indigo-600" />
            Continuous Ingestion & Action Pipeline
          </h3>
          <span className="text-[11px] text-slate-500 font-mono">
            Continuous Ingestion &bull; Zero Daily Manual Uploads Required
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-xs">
          {[
            { step: '01', title: 'SOURCE', desc: 'Paytm, Bank, POS, Tally', tag: 'Telemetry' },
            { step: '02', title: 'CONNECTOR', desc: 'Secure Webhook & AA', tag: 'Ingestion' },
            { step: '03', title: 'NORMALIZE', desc: 'Canonical Data Model', tag: 'Standard' },
            { step: '04', title: 'VALIDATE', desc: 'Schema & Quarantining', tag: 'Integrity' },
            { step: '05', title: 'RECONCILE', desc: 'Paytm vs Bank Match', tag: 'Audited' },
            { step: '06', title: 'MONITOR', desc: '14-Day Working Capital', tag: 'Continuous' },
            { step: '07', title: 'DETECT', desc: 'Working-Capital Squeeze', tag: 'Signals' },
            { step: '08', title: 'ACT', desc: 'Proprietor Sign-off', tag: 'Recovery' },
          ].map((item, idx) => (
            <div
              key={item.title}
              className={`p-2.5 rounded-xl border flex flex-col justify-between space-y-1.5 ${
                idx === 7
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : idx >= 5
                  ? 'bg-indigo-50/60 border-indigo-200 text-slate-900'
                  : 'bg-slate-50 border-slate-200/80 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold font-mono text-indigo-700">
                  {item.step}
                </span>
                <span className="text-[9px] px-1 py-0.2 rounded font-mono font-semibold bg-white/80 border border-slate-200 text-slate-600">
                  {item.tag}
                </span>
              </div>
              <div>
                <strong className="text-[11px] font-bold block">{item.title}</strong>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Upload Fallback Dropzone */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Historical / Fallback Dropzone</h3>
            <Badge variant="slate" size="sm">
              Optional
            </Badge>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Drag and drop bank CSVs, Tally XML backups, or distributor bills for historical reconciliation:
          </p>

          <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl p-5 text-center space-y-2 transition-colors">
            <UploadCloud className="w-8 h-8 text-slate-400 mx-auto" />
            <div className="text-xs text-slate-600">
              <span className="font-semibold text-indigo-600 cursor-pointer">Click to upload</span> or drag and drop
            </div>
            <span className="text-[10px] text-slate-400 block font-mono">
              CSV, XLSX, or Tally XML (up to 25MB)
            </span>
          </div>

          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-semibold text-slate-700 block">Try Preset Historical Datasets:</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => handleSimulateUpload('Abhishek_Mobile_Tally_Bills_Sep2026.csv')}
                className="text-[10px] bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded text-slate-700 font-mono cursor-pointer"
              >
                + Tally Bills Sep 2026
              </button>
              <button
                onClick={() => handleSimulateUpload('SBI_Passbook_Historical_Q3.csv')}
                className="text-[10px] bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded text-slate-700 font-mono cursor-pointer"
              >
                + SBI Passbook Q3
              </button>
            </div>
          </div>

          {selectedFile && uploadProgress !== null && (
            <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200 text-xs space-y-1.5 animate-in fade-in">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="truncate max-w-[180px] font-semibold text-indigo-900">{selectedFile}</span>
                <span className="text-indigo-700">{uploadProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-indigo-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              {uploadSuccess && (
                <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 pt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Validated & reconciled into canonical ledger!
                </span>
              )}
            </div>
          )}
        </div>

        {/* Ingestion Jobs & Quarantine Table */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Ingestion Batches & Quarantine Log</CardTitle>
                  <CardDescription>
                    Historical batch logs showing record validation, deduplication, and isolated rows
                  </CardDescription>
                </div>
                <Badge variant="indigo" size="sm">
                  {ingestionLogs.length} Batches
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-semibold">
                    <tr>
                      <th className="px-4 py-2.5 text-left">Timestamp</th>
                      <th className="px-3 py-2.5 text-left">Source Connector</th>
                      <th className="px-2 py-2.5 text-center">Recv</th>
                      <th className="px-2 py-2.5 text-center">Valid</th>
                      <th className="px-2 py-2.5 text-center">Quarantine</th>
                      <th className="px-2 py-2.5 text-center">Latency</th>
                      <th className="px-3 py-2.5 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {ingestionLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-2.5 font-mono text-slate-600 whitespace-nowrap">
                          {formatDateTime(log.timestamp)}
                        </td>
                        <td className="px-3 py-2.5 font-semibold text-slate-900">
                          {log.source}
                        </td>
                        <td className="px-2 py-2.5 text-center font-mono font-bold text-slate-800">
                          {log.recordsReceived}
                        </td>
                        <td className="px-2 py-2.5 text-center font-mono text-emerald-600 font-semibold">
                          {log.recordsValidated}
                        </td>
                        <td className="px-2 py-2.5 text-center font-mono">
                          {log.recordsQuarantined > 0 ? (
                            <span className="text-rose-600 font-bold">{log.recordsQuarantined}</span>
                          ) : (
                            <span className="text-slate-400">0</span>
                          )}
                        </td>
                        <td className="px-2 py-2.5 text-center font-mono text-slate-500">
                          {log.durationMs}ms
                        </td>
                        <td className="px-3 py-2.5">
                          <Badge variant={log.status === 'SUCCESS' ? 'emerald' : 'amber'} size="sm">
                            {log.status}
                          </Badge>
                          {log.quarantineReason && (
                            <span className="block text-[10px] text-rose-700 mt-0.5 leading-snug">
                              {log.quarantineReason}
                            </span>
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
      </div>
    </div>
  );
};
