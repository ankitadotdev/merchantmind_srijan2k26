import React, { useState } from 'react';
import {
  Layers,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  QrCode,
  Building,
  BookOpen,
  HardDrive,
  FileSpreadsheet,
  Package,
  MessageSquare,
  Settings,
  Activity,
  Sliders,
  ExternalLink,
  ChevronRight,
  Database,
  Radio,
} from 'lucide-react';
import { useMerchant } from '../context/MerchantContext';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import type { DataConnection } from '../types';
import { LiveSyncSimulationModal } from '../components/connections/LiveSyncSimulationModal';
import { ConnectionDetailsModal } from '../components/connections/ConnectionDetailsModal';

export const ConnectionsView: React.FC = () => {
  const { connections, triggerDataSync } = useMerchant();

  // Modal states
  const [activeSyncConnection, setActiveSyncConnection] = useState<DataConnection | null>(null);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [activeDetailsConnection, setActiveDetailsConnection] = useState<DataConnection | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleStartSync = (conn: DataConnection) => {
    setActiveSyncConnection(conn);
    setIsSyncModalOpen(true);
  };

  const handleViewDetails = (conn: DataConnection) => {
    setActiveDetailsConnection(conn);
    setIsDetailsModalOpen(true);
  };

  const handleSyncComplete = async (connId: string) => {
    await triggerDataSync(connId);
    setNotification('Telemetry pipeline synchronized and committed to canonical data model.');
    setTimeout(() => setNotification(null), 4000);
  };

  const getIcon = (category: string, id: string) => {
    if (id === 'conn_paytm') return QrCode;
    if (id === 'conn_whatsapp') return MessageSquare;
    if (id === 'conn_inventory') return Package;

    switch (category) {
      case 'PAYMENTS':
        return QrCode;
      case 'BANKING':
        return Building;
      case 'ACCOUNTING':
        return BookOpen;
      case 'POS':
        return HardDrive;
      case 'INVENTORY':
        return Package;
      default:
        return FileSpreadsheet;
    }
  };

  const getSyncFrequency = (id: string) => {
    switch (id) {
      case 'conn_paytm':
        return 'Continuous Real-Time Webhook';
      case 'conn_sbi':
        return 'Daily at 06:00 AM (AA Feed)';
      case 'conn_pos':
        return 'Every 2 minutes (Counter Terminal)';
      case 'conn_tally':
        return 'Hourly / On-Save XML Bridge';
      case 'conn_inventory':
        return 'Every 15 minutes (Barcode Sync)';
      case 'conn_whatsapp':
        return 'Real-Time Event Hook';
      default:
        return 'Manual Batch Upload';
    }
  };

  const totalRecords = connections.reduce((acc, c) => acc + c.recordsIngestedTotal, 0);

  return (
    <div className="space-y-6">
      {/* Modals */}
      <LiveSyncSimulationModal
        connection={activeSyncConnection}
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        onSyncComplete={handleSyncComplete}
      />

      <ConnectionDetailsModal
        connection={activeDetailsConnection}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onTriggerSync={handleStartSync}
      />

      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Business Connections & Live Telemetry Hub
            </h1>
            <Badge variant="emerald" size="sm">
              Continuous Ingestion Active
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time automated connectors feeding payment terminals, banking statements, and accounting ledgers into MerchantMind
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-[11px] text-slate-400 font-medium block">Total Records Synced</span>
            <span className="text-sm font-bold font-mono text-slate-900">
              {totalRecords.toLocaleString()} entries
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const paytm = connections.find((c) => c.id === 'conn_paytm') || connections[0];
              handleStartSync(paytm);
            }}
            className="text-xs"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1" />
            <span>Sync All Active Sources</span>
          </Button>
        </div>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium rounded-xl flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Flagship Paytm Integration Hero Banner */}
      <div className="p-5 bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 text-white rounded-2xl border border-cyan-800/80 shadow-md flex flex-wrap items-center justify-between gap-5">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-900/60 border border-cyan-600/40 px-2 py-0.5 rounded font-mono">
              Paytm Integration Layer
            </span>
            <span className="text-xs text-cyan-200 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Designed to ingest authorized Paytm merchant transaction/payment telemetry
            </span>
          </div>
          <h3 className="text-lg font-bold text-white">
            Paytm All-In-One Merchant Ecosystem (QR, Soundbox & EDC)
          </h3>
          <p className="text-xs text-cyan-100/80 leading-relaxed">
            Feeds instantaneous intraday sales confirmations, Soundbox audio verifications, and daily UPI batch settlements directly into MerchantMind’s working capital radar.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] font-mono text-cyan-200/90">
            <span>Status: <strong>HEALTHY (99%)</strong></span>
            <span>•</span>
            <span>Last Synced: <strong>Moments ago</strong></span>
            <span>•</span>
            <span>Ingested: <strong>1,420 transactions</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const paytm = connections.find((c) => c.id === 'conn_paytm');
              if (paytm) handleViewDetails(paytm);
            }}
            className="border-cyan-700/80 text-cyan-200 hover:bg-cyan-900/40 text-xs h-9"
          >
            <Settings className="w-3.5 h-3.5 mr-1" />
            <span>Connection Settings</span>
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              const paytm = connections.find((c) => c.id === 'conn_paytm') || connections[0];
              handleStartSync(paytm);
            }}
            className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs h-9 shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1" />
            <span>Sync Paytm Feed</span>
          </Button>
        </div>
      </div>

      {/* 6 Real Business Connections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {connections.map((conn) => {
          const Icon = getIcon(conn.category, conn.id);
          const isConnected = conn.status === 'CONNECTED';
          const frequency = getSyncFrequency(conn.id);

          return (
            <Card
              key={conn.id}
              className="p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                        conn.id === 'conn_paytm'
                          ? 'bg-cyan-50 border-cyan-200 text-cyan-700'
                          : conn.id === 'conn_whatsapp'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                          : 'bg-indigo-50 border-indigo-200 text-indigo-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">
                        {conn.name}
                      </h4>
                      <span className="text-[11px] text-slate-400 font-medium block mt-0.5">
                        {conn.provider}
                      </span>
                    </div>
                  </div>

                  {(() => {
                    switch (conn.status) {
                      case 'CONNECTED':
                        return <Badge variant="emerald" size="sm">Connected</Badge>;
                      case 'DEMO_CONNECTED':
                        return <Badge variant="indigo" size="sm">Demo Connected</Badge>;
                      case 'CONNECTOR_READY':
                        return <Badge variant="cyan" size="sm">Connector Ready</Badge>;
                      case 'COMING_SOON':
                        return <Badge variant="slate" size="sm">Coming Soon</Badge>;
                      default:
                        return <Badge variant="amber" size="sm">Needs Attention</Badge>;
                    }
                  })()}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {conn.description}
                </p>

                <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 text-[11px] space-y-1.5 font-sans">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Sync Frequency:</span>
                    <strong className="text-slate-800 text-[10px] font-semibold">{frequency}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Records Synced:</span>
                    <strong className="font-mono text-slate-900 font-bold">
                      {conn.recordsIngestedTotal.toLocaleString()}
                    </strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Last Synced:</span>
                    <span className="font-mono text-slate-600">{conn.lastSyncedAt}</span>
                  </div>
                  <div className="pt-1.5 border-t border-slate-200/60">
                    <div className="flex justify-between items-center text-[10px] mb-1">
                      <span className="text-slate-500 font-medium">Data Health Quality:</span>
                      <span className="font-mono font-bold text-emerald-700">{conn.dataHealthScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${conn.dataHealthScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewDetails(conn)}
                  className="text-xs py-1 px-2.5 h-8 text-slate-600"
                >
                  <Sliders className="w-3 h-3 mr-1" />
                  <span>{conn.status === 'COMING_SOON' ? 'View Specs' : 'View Details'}</span>
                </Button>

                {conn.status === 'COMING_SOON' ? (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className="text-xs py-1 px-3 h-8 text-slate-400 border-slate-200 cursor-not-allowed"
                  >
                    <span>In Roadmap</span>
                  </Button>
                ) : conn.status === 'CONNECTOR_READY' ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleViewDetails(conn)}
                    className="text-xs py-1 px-3 h-8 bg-cyan-600 hover:bg-cyan-700"
                  >
                    <span>Configure</span>
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleStartSync(conn)}
                    className="text-xs py-1 px-3 h-8 bg-indigo-600 hover:bg-indigo-700"
                  >
                    <RefreshCw className="w-3 h-3 mr-1" />
                    <span>Sync Now</span>
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
