import React, { useState, useEffect } from 'react';
import {
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  X,
  ShieldCheck,
  Database,
  ArrowRight,
  Server,
  Layers,
  Lock,
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import type { DataConnection } from '../../types';

interface LiveSyncSimulationModalProps {
  connection: DataConnection | null;
  isOpen: boolean;
  onClose: () => void;
  onSyncComplete?: (connectionId: string) => void;
}

type SyncStage =
  | 'IDLE'
  | 'CONNECTING'
  | 'AUTHENTICATING'
  | 'FETCHING'
  | 'NORMALIZING'
  | 'VALIDATING'
  | 'RECONCILING'
  | 'COMPLETE';

export const LiveSyncSimulationModal: React.FC<LiveSyncSimulationModalProps> = ({
  connection,
  isOpen,
  onClose,
  onSyncComplete,
}) => {
  const [currentStage, setCurrentStage] = useState<SyncStage>('IDLE');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen || !connection) {
      setCurrentStage('IDLE');
      setProgress(0);
      setLogs([]);
      return;
    }

    let isMounted = true;
    setCurrentStage('CONNECTING');
    setProgress(10);
    setLogs([`[00.1s] Initializing TLS 1.3 socket to ${connection.provider} gateway...`]);

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    // Stage 1 -> Authenticating
    timeouts.push(
      setTimeout(() => {
        if (!isMounted) return;
        setCurrentStage('AUTHENTICATING');
        setProgress(25);
        setLogs((prev) => [
          ...prev,
          `[00.3s] Mutual mTLS handshake verified. Ingestion lease granted.`,
        ]);
      }, 400)
    );

    // Stage 2 -> Fetching
    timeouts.push(
      setTimeout(() => {
        if (!isMounted) return;
        setCurrentStage('FETCHING');
        setProgress(45);
        const count = connection.id === 'conn_paytm' ? 1284 : 412;
        setLogs((prev) => [
          ...prev,
          `[00.7s] Fetching records batch... ${count.toLocaleString()} raw payloads received.`,
        ]);
      }, 900)
    );

    // Stage 3 -> Normalizing
    timeouts.push(
      setTimeout(() => {
        if (!isMounted) return;
        setCurrentStage('NORMALIZING');
        setProgress(65);
        const count = connection.id === 'conn_paytm' ? 1284 : 412;
        setLogs((prev) => [
          ...prev,
          `[01.2s] Normalizing payloads to MerchantMind Canonical Schema (${count} / ${count})...`,
        ]);
      }, 1500)
    );

    // Stage 4 -> Validating
    timeouts.push(
      setTimeout(() => {
        if (!isMounted) return;
        setCurrentStage('VALIDATING');
        setProgress(80);
        setLogs((prev) => [
          ...prev,
          `[01.6s] Running schema validation, GST checksums, and duplicate transaction filters...`,
        ]);
      }, 2000)
    );

    // Stage 5 -> Reconciling
    timeouts.push(
      setTimeout(() => {
        if (!isMounted) return;
        setCurrentStage('RECONCILING');
        setProgress(92);
        const anomalies = connection.id === 'conn_paytm' ? 3 : 1;
        setLogs((prev) => [
          ...prev,
          `[02.1s] Reconciling against ledger... ${anomalies} anomalies flagged for review.`,
        ]);
      }, 2500)
    );

    // Stage 6 -> Complete
    timeouts.push(
      setTimeout(() => {
        if (!isMounted) return;
        setCurrentStage('COMPLETE');
        setProgress(100);
        const accepted = connection.id === 'conn_paytm' ? 1281 : 411;
        const anomalies = connection.id === 'conn_paytm' ? 3 : 1;
        setLogs((prev) => [
          ...prev,
          `[02.6s] Sync complete: ${accepted.toLocaleString()} accepted, ${anomalies} flagged into anomaly radar.`,
          `[02.7s] Canonical cashflow curves recalculated.`,
        ]);
        if (onSyncComplete) {
          onSyncComplete(connection.id);
        }
      }, 3000)
    );

    return () => {
      isMounted = false;
      timeouts.forEach(clearTimeout);
    };
  }, [isOpen, connection]);

  if (!isOpen || !connection) return null;

  const stageOrder: SyncStage[] = [
    'CONNECTING',
    'AUTHENTICATING',
    'FETCHING',
    'NORMALIZING',
    'VALIDATING',
    'RECONCILING',
    'COMPLETE',
  ];

  const currentStageIndex = stageOrder.indexOf(currentStage);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
              <RefreshCw
                className={`w-4 h-4 ${currentStage !== 'COMPLETE' ? 'animate-spin' : ''}`}
              />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <span>Live Telemetry Synchronization</span>
                {currentStage === 'COMPLETE' && (
                  <Badge variant="emerald" size="sm">
                    Success
                  </Badge>
                )}
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">
                {connection.name} ({connection.provider})
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-5">
          {/* Progress Bar & Status */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span className="uppercase font-mono tracking-wider text-[11px] text-indigo-700">
                {currentStage === 'COMPLETE' ? 'Synchronization Finished' : `STAGE: ${currentStage}`}
              </span>
              <span className="font-mono">{progress}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
              <div
                className={`h-full transition-all duration-300 ${
                  currentStage === 'COMPLETE'
                    ? 'bg-emerald-500'
                    : 'bg-indigo-600'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* 7 Stage Pipeline Indicator */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {stageOrder.map((st, i) => {
              const isPast = currentStageIndex > i;
              const isCurrent = currentStageIndex === i;

              return (
                <div key={st} className="flex flex-col items-center">
                  <div
                    className={`w-5 h-5 rounded-full text-[9px] font-bold font-mono flex items-center justify-center transition-colors ${
                      isPast
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-indigo-600 text-white ring-2 ring-indigo-200'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isPast ? '✓' : i + 1}
                  </div>
                  <span
                    className={`text-[8px] font-bold font-mono uppercase mt-1 truncate max-w-[45px] ${
                      isCurrent ? 'text-indigo-700' : isPast ? 'text-slate-700' : 'text-slate-400'
                    }`}
                  >
                    {st === 'AUTHENTICATING' ? 'AUTH' : st}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Telemetry Output Log Terminal */}
          <div className="bg-slate-950 rounded-xl p-3 font-mono text-[11px] text-emerald-400/90 space-y-1 max-h-40 overflow-y-auto border border-slate-800 shadow-inner">
            {logs.map((log, idx) => (
              <div key={idx} className="leading-relaxed flex items-start gap-1">
                <span className="text-slate-500 select-none">&gt;</span>
                <span className={log.includes('anomalies') ? 'text-amber-300' : ''}>{log}</span>
              </div>
            ))}
            {currentStage !== 'COMPLETE' && (
              <div className="flex items-center gap-1.5 text-slate-500 animate-pulse pt-1">
                <span>&gt; Ingesting telemetry packets...</span>
              </div>
            )}
          </div>

          {/* Reconciled Stats Summary */}
          {currentStage === 'COMPLETE' && (
            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200/90 text-xs space-y-2">
              <div className="flex items-center justify-between font-semibold text-emerald-900">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Canonical Reconciliation Summary
                </span>
                <span className="font-mono text-[11px] text-emerald-700">Deterministic Run</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div className="bg-white/80 p-2 rounded-lg border border-emerald-200">
                  <span className="text-[10px] text-slate-500 block">Accepted</span>
                  <span className="text-sm font-bold font-mono text-emerald-700">
                    {connection.id === 'conn_paytm' ? '1,281' : '411'}
                  </span>
                </div>
                <div className="bg-white/80 p-2 rounded-lg border border-emerald-200">
                  <span className="text-[10px] text-slate-500 block">Flagged</span>
                  <span className="text-sm font-bold font-mono text-amber-700">
                    {connection.id === 'conn_paytm' ? '3' : '1'}
                  </span>
                </div>
                <div className="bg-white/80 p-2 rounded-lg border border-emerald-200">
                  <span className="text-[10px] text-slate-500 block">Health Quality</span>
                  <span className="text-sm font-bold font-mono text-emerald-700">
                    {connection.dataHealthScore}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            {currentStage === 'COMPLETE'
              ? 'Telemetry committed to canonical model'
              : 'Processing deterministic pipeline...'}
          </span>
          <Button
            variant={currentStage === 'COMPLETE' ? 'primary' : 'outline'}
            size="sm"
            onClick={onClose}
            disabled={currentStage !== 'COMPLETE'}
            className="text-xs"
          >
            {currentStage === 'COMPLETE' ? 'Done & Return' : 'Syncing...'}
          </Button>
        </div>
      </div>
    </div>
  );
};
