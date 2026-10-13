import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Settings,
  Layers,
  Database,
  Lock,
  Sliders,
  ExternalLink,
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import type { DataConnection } from '../../types';

interface ConnectionDetailsModalProps {
  connection: DataConnection | null;
  isOpen: boolean;
  onClose: () => void;
  onTriggerSync: (connection: DataConnection) => void;
}

export const ConnectionDetailsModal: React.FC<ConnectionDetailsModalProps> = ({
  connection,
  isOpen,
  onClose,
  onTriggerSync,
}) => {
  const [autoReconcile, setAutoReconcile] = useState(true);
  const [anomalyThreshold, setAnomalyThreshold] = useState('Standard (95%)');
  const [saveFeedback, setSaveFeedback] = useState(false);

  if (!isOpen || !connection) return null;

  const handleSaveSettings = () => {
    setSaveFeedback(true);
    setTimeout(() => setSaveFeedback(false), 2000);
  };

  const getFrequency = (connId: string) => {
    switch (connId) {
      case 'conn_paytm':
        return 'Continuous Real-Time Webhook';
      case 'conn_sbi':
        return 'Daily at 06:00 AM (Account Aggregator)';
      case 'conn_pos':
        return 'Every 2 minutes (Counter Terminal)';
      case 'conn_tally':
        return 'Hourly / On-Save XML Bridge';
      case 'conn_inventory':
        return 'Every 15 minutes (Barcode Sync)';
      case 'conn_whatsapp':
        return 'Real-Time Event Hook';
      default:
        return 'Manual Upload & On-Demand Batch';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold">
              <Database className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">{connection.name}</h3>
                <Badge variant={connection.status === 'CONNECTED' ? 'emerald' : 'amber'} size="sm">
                  {connection.status}
                </Badge>
              </div>
              <p className="text-xs text-slate-500 font-mono">
                Provider: {connection.provider} • ID: {connection.id}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-[10px] text-slate-400 uppercase font-medium block">Sync Frequency</span>
              <span className="font-semibold text-slate-900 block mt-0.5 leading-snug">
                {getFrequency(connection.id)}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-[10px] text-slate-400 uppercase font-medium block">Total Records Synced</span>
              <span className="text-base font-bold font-mono text-slate-900 block mt-0.5">
                {connection.recordsIngestedTotal.toLocaleString()}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-[10px] text-slate-400 uppercase font-medium block">Data Health Quality</span>
              <span className="text-base font-bold font-mono text-emerald-600 block mt-0.5">
                {connection.dataHealthScore}%
              </span>
            </div>
          </div>

          {/* Description & Capabilities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">
              Connector Description
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              {connection.description}
            </p>
          </div>

          {/* Supported Entities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
              Ingested Canonical Entities
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {connection.supportedEntities.map((ent) => (
                <span
                  key={ent}
                  className="px-2.5 py-1 bg-indigo-50/70 border border-indigo-200 text-indigo-700 text-xs rounded-lg font-medium"
                >
                  {ent}
                </span>
              ))}
            </div>
          </div>

          {/* Settings Section */}
          <div className="pt-3 border-t border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <Settings className="w-3.5 h-3.5 text-slate-500" />
                Connection Settings & Guardrails
              </h4>
              {saveFeedback && (
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Settings saved
                </span>
              )}
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200">
                <div>
                  <span className="font-semibold text-slate-900 block">Automated Canonical Reconciliation</span>
                  <span className="text-slate-500 text-[11px]">
                    Cross-reference ingested entries against SBI bank transactions automatically
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={autoReconcile}
                  onChange={(e) => setAutoReconcile(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200">
                <div>
                  <span className="font-semibold text-slate-900 block">Anomaly Detection Sensitivity</span>
                  <span className="text-slate-500 text-[11px]">
                    Confidence threshold for generating signals in the Anomaly Radar
                  </span>
                </div>
                <select
                  value={anomalyThreshold}
                  onChange={(e) => setAnomalyThreshold(e.target.value)}
                  className="text-xs border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                >
                  <option>Strict (99%)</option>
                  <option>Standard (95%)</option>
                  <option>Sensitive (90%)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveSettings}
            className="text-xs"
          >
            Save Configuration
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-xs"
            >
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onClose();
                onTriggerSync(connection);
              }}
              className="text-xs bg-indigo-600 hover:bg-indigo-700"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1" />
              <span>Sync Now</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
