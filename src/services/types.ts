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

export interface IMerchantService {
  getMerchantProfile(): Promise<MerchantProfile>;
  getFinancialHealth(): Promise<FinancialHealthMetrics>;
  getCashflow(): Promise<CashflowDatapoint[]>;
  getReceivables(): Promise<ReceivableRecord[]>;
  getPayables(): Promise<PayableRecord[]>;
  getInventory(): Promise<InventoryItem[]>;
  getCustomers(): Promise<CustomerProfile[]>;
  getSignals(): Promise<BusinessSignal[]>;
  getOpportunities(): Promise<Opportunity[]>;
  getOpportunityById(id: string): Promise<Opportunity | undefined>;
  getEvidenceById(id: string): Promise<EvidenceRecord | undefined>;
  getRecommendedActions(): Promise<RecommendedAction[]>;
  getActivityTimeline(): Promise<MerchantActivityEvent[]>;
  
  // Interactive Simulation Handlers
  approveAction(actionId: string): Promise<RecommendedAction>;
  executeActionSimulation(actionId: string): Promise<RecommendedAction>;
  sendKhataReminder(receivableId: string): Promise<{ success: boolean; message: string; timestamp: string }>;
  triggerDataSync(connectionId: string): Promise<DataConnection>;
  runIntelligenceScan(): Promise<{ newSignals: number; newOpportunities: number }>;
  
  // Telemetry & Audit
  getDataConnections(): Promise<DataConnection[]>;
  getIngestionLogs(): Promise<IngestionJobLog[]>;
  getAuditLogs(): Promise<AuditEvent[]>;
  getTransactions(): Promise<TransactionRecord[]>;
  
  // Scenario Management
  switchScenario(scenario: BusinessScenarioId): Promise<void>;
  resetDemo(): Promise<void>;
}
