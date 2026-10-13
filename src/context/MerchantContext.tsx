import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  MerchantProfile,
  FinancialHealthMetrics,
  CashflowDatapoint,
  ReceivableRecord,
  PayableRecord,
  InventoryItem,
  CustomerProfile,
  BusinessSignal,
  Opportunity,
  EvidenceRecord,
  RecommendedAction,
  DataConnection,
  IngestionJobLog,
  AuditEvent,
  TransactionRecord,
  BusinessScenarioId,
  MerchantActivityEvent,
} from '../types';
import { merchantServiceInstance } from '../services/MockMerchantService';

interface MerchantContextValue {
  profile: MerchantProfile | null;
  financialHealth: FinancialHealthMetrics | null;
  cashflow: CashflowDatapoint[];
  receivables: ReceivableRecord[];
  payables: PayableRecord[];
  inventory: InventoryItem[];
  customers: CustomerProfile[];
  signals: BusinessSignal[];
  opportunities: Opportunity[];
  actions: RecommendedAction[];
  connections: DataConnection[];
  ingestionLogs: IngestionJobLog[];
  auditLogs: AuditEvent[];
  transactions: TransactionRecord[];
  activityTimeline: MerchantActivityEvent[];
  isLoading: boolean;
  activeScenario: BusinessScenarioId;

  // Navigation & Shell
  activeWorld: 'showcase' | 'app';
  setActiveWorld: (world: 'showcase' | 'app') => void;
  activeAppTab: string;
  setActiveAppTab: (tab: string) => void;

  // Modals & Drawers
  selectedEvidenceId: string | null;
  selectedEvidence: EvidenceRecord | null;
  openEvidenceDrawer: (evidenceId: string) => Promise<void>;
  closeEvidenceDrawer: () => void;

  // Interactive Simulation Handlers
  approveAction: (actionId: string) => Promise<void>;
  executeActionSimulation: (actionId: string) => Promise<void>;
  sendKhataReminder: (receivableId: string) => Promise<{ success: boolean; message: string }>;
  triggerDataSync: (connectionId: string) => Promise<void>;
  runIntelligenceScan: () => Promise<{ newSignals: number; newOpportunities: number }>;
  switchScenario: (scenario: BusinessScenarioId) => Promise<void>;
  resetDemo: () => Promise<void>;

  // Guided Tour
  isTourOpen: boolean;
  openTour: () => void;
  closeTour: () => void;
}

const MerchantContext = createContext<MerchantContextValue | undefined>(undefined);

export const MerchantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<MerchantProfile | null>(null);
  const [financialHealth, setFinancialHealth] = useState<FinancialHealthMetrics | null>(null);
  const [cashflow, setCashflow] = useState<CashflowDatapoint[]>([]);
  const [receivables, setReceivables] = useState<ReceivableRecord[]>([]);
  const [payables, setPayables] = useState<PayableRecord[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [customers, setCustomers] = useState<CustomerProfile[]>([]);
  const [signals, setSignals] = useState<BusinessSignal[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [actions, setActions] = useState<RecommendedAction[]>([]);
  const [connections, setConnections] = useState<DataConnection[]>([]);
  const [ingestionLogs, setIngestionLogs] = useState<IngestionJobLog[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditEvent[]>([]);
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [activityTimeline, setActivityTimeline] = useState<MerchantActivityEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Shell State
  const [activeWorld, setActiveWorld] = useState<'showcase' | 'app'>('showcase');
  const [activeAppTab, setActiveAppTab] = useState<string>('command-center');
  const [activeScenario, setActiveScenario] = useState<BusinessScenarioId>('abhishek-mobile-crisis');

  // Evidence Drawer State
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string | null>(null);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceRecord | null>(null);

  // Guided Tour
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [
        p,
        fh,
        cf,
        rec,
        pay,
        inv,
        cust,
        sig,
        opp,
        act,
        conn,
        ingest,
        audit,
        tx,
        timeline,
      ] = await Promise.all([
        merchantServiceInstance.getMerchantProfile(),
        merchantServiceInstance.getFinancialHealth(),
        merchantServiceInstance.getCashflow(),
        merchantServiceInstance.getReceivables(),
        merchantServiceInstance.getPayables(),
        merchantServiceInstance.getInventory(),
        merchantServiceInstance.getCustomers(),
        merchantServiceInstance.getSignals(),
        merchantServiceInstance.getOpportunities(),
        merchantServiceInstance.getRecommendedActions(),
        merchantServiceInstance.getDataConnections(),
        merchantServiceInstance.getIngestionLogs(),
        merchantServiceInstance.getAuditLogs(),
        merchantServiceInstance.getTransactions(),
        merchantServiceInstance.getActivityTimeline(),
      ]);

      setProfile(p);
      setFinancialHealth(fh);
      setCashflow(cf);
      setReceivables(rec);
      setPayables(pay);
      setInventory(inv);
      setCustomers(cust);
      setSignals(sig);
      setOpportunities(opp);
      setActions(act);
      setConnections(conn);
      setIngestionLogs(ingest);
      setAuditLogs(audit);
      setTransactions(tx);
      setActivityTimeline(timeline);
      setActiveScenario(p.activeScenario);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const openEvidenceDrawer = async (evidenceId: string) => {
    setSelectedEvidenceId(evidenceId);
    const evi = await merchantServiceInstance.getEvidenceById(evidenceId);
    setSelectedEvidence(evi || null);
  };

  const closeEvidenceDrawer = () => {
    setSelectedEvidenceId(null);
    setSelectedEvidence(null);
  };

  const approveAction = async (actionId: string) => {
    await merchantServiceInstance.approveAction(actionId);
    await refreshData();
  };

  const executeActionSimulation = async (actionId: string) => {
    await merchantServiceInstance.executeActionSimulation(actionId);
    await refreshData();
  };

  const sendKhataReminder = async (receivableId: string) => {
    const res = await merchantServiceInstance.sendKhataReminder(receivableId);
    await refreshData();
    return res;
  };

  const triggerDataSync = async (connectionId: string) => {
    await merchantServiceInstance.triggerDataSync(connectionId);
    await refreshData();
  };

  const runIntelligenceScan = async () => {
    const res = await merchantServiceInstance.runIntelligenceScan();
    await refreshData();
    return res;
  };

  const switchScenario = async (scenario: BusinessScenarioId) => {
    await merchantServiceInstance.switchScenario(scenario);
    setActiveScenario(scenario);
    await refreshData();
  };

  const resetDemo = async () => {
    await merchantServiceInstance.resetDemo();
    await refreshData();
  };

  const openTour = () => setIsTourOpen(true);
  const closeTour = () => setIsTourOpen(false);

  return (
    <MerchantContext.Provider
      value={{
        profile,
        financialHealth,
        cashflow,
        receivables,
        payables,
        inventory,
        customers,
        signals,
        opportunities,
        actions,
        connections,
        ingestionLogs,
        auditLogs,
        transactions,
        activityTimeline,
        isLoading,
        activeScenario,
        activeWorld,
        setActiveWorld,
        activeAppTab,
        setActiveAppTab,
        selectedEvidenceId,
        selectedEvidence,
        openEvidenceDrawer,
        closeEvidenceDrawer,
        approveAction,
        executeActionSimulation,
        sendKhataReminder,
        triggerDataSync,
        runIntelligenceScan,
        switchScenario,
        resetDemo,
        isTourOpen,
        openTour,
        closeTour,
      }}
    >
      {children}
    </MerchantContext.Provider>
  );
};

export const useMerchant = (): MerchantContextValue => {
  const context = useContext(MerchantContext);
  if (!context) {
    throw new Error('useMerchant must be used within a MerchantProvider');
  }
  return context;
};
