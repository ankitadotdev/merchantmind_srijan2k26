import type { IMerchantService } from './types';
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
import {
  INITIAL_MERCHANT_PROFILE,
  INITIAL_FINANCIAL_HEALTH,
  CASHFLOW_PROJECTION_DATA,
  INITIAL_RECEIVABLES,
  INITIAL_PAYABLES,
  INITIAL_INVENTORY,
  INITIAL_CUSTOMERS,
  INITIAL_SIGNALS,
  INITIAL_OPPORTUNITIES,
  INITIAL_EVIDENCE_RECORDS,
  INITIAL_RECOMMENDED_ACTIONS,
  INITIAL_DATA_CONNECTIONS,
  INITIAL_INGESTION_LOGS,
  INITIAL_AUDIT_LOGS,
  INITIAL_TRANSACTIONS,
  INITIAL_ACTIVITY_TIMELINE,
  DEMO_SCENARIOS,
} from '../mock/demoData';

export class MockMerchantService implements IMerchantService {
  private profile: MerchantProfile = { ...INITIAL_MERCHANT_PROFILE };
  private financialHealth: FinancialHealthMetrics = { ...INITIAL_FINANCIAL_HEALTH };
  private cashflow: CashflowDatapoint[] = [...CASHFLOW_PROJECTION_DATA];
  private receivables: ReceivableRecord[] = [...INITIAL_RECEIVABLES];
  private payables: PayableRecord[] = [...INITIAL_PAYABLES];
  private inventory: InventoryItem[] = [...INITIAL_INVENTORY];
  private customers: CustomerProfile[] = [...INITIAL_CUSTOMERS];
  private signals: BusinessSignal[] = [...INITIAL_SIGNALS];
  private opportunities: Opportunity[] = [...INITIAL_OPPORTUNITIES];
  private evidence: Record<string, EvidenceRecord> = { ...INITIAL_EVIDENCE_RECORDS };
  private actions: RecommendedAction[] = [...INITIAL_RECOMMENDED_ACTIONS];
  private connections: DataConnection[] = [...INITIAL_DATA_CONNECTIONS];
  private ingestionLogs: IngestionJobLog[] = [...INITIAL_INGESTION_LOGS];
  private auditLogs: AuditEvent[] = [...INITIAL_AUDIT_LOGS];
  private transactions: TransactionRecord[] = [...INITIAL_TRANSACTIONS];
  private activityTimeline: MerchantActivityEvent[] = [...INITIAL_ACTIVITY_TIMELINE];

  // Helper delay to emulate realistic responsive interaction
  private async delay(ms = 120): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getMerchantProfile(): Promise<MerchantProfile> {
    await this.delay();
    return { ...this.profile };
  }

  async getFinancialHealth(): Promise<FinancialHealthMetrics> {
    await this.delay();
    return { ...this.financialHealth };
  }

  async getCashflow(): Promise<CashflowDatapoint[]> {
    await this.delay();
    return [...this.cashflow];
  }

  async getReceivables(): Promise<ReceivableRecord[]> {
    await this.delay();
    return [...this.receivables];
  }

  async getPayables(): Promise<PayableRecord[]> {
    await this.delay();
    return [...this.payables];
  }

  async getInventory(): Promise<InventoryItem[]> {
    await this.delay();
    return [...this.inventory];
  }

  async getCustomers(): Promise<CustomerProfile[]> {
    await this.delay();
    return [...this.customers];
  }

  async getSignals(): Promise<BusinessSignal[]> {
    await this.delay();
    return [...this.signals];
  }

  async getOpportunities(): Promise<Opportunity[]> {
    await this.delay();
    return [...this.opportunities];
  }

  async getOpportunityById(id: string): Promise<Opportunity | undefined> {
    await this.delay();
    const opp = this.opportunities.find((o) => o.id === id);
    return opp ? { ...opp } : undefined;
  }

  async getEvidenceById(id: string): Promise<EvidenceRecord | undefined> {
    await this.delay();
    const evi = this.evidence[id];
    return evi ? { ...evi } : undefined;
  }

  async getRecommendedActions(): Promise<RecommendedAction[]> {
    await this.delay();
    return [...this.actions];
  }

  async approveAction(actionId: string): Promise<RecommendedAction> {
    await this.delay(200);
    const index = this.actions.findIndex((a) => a.id === actionId);
    if (index === -1) throw new Error(`Action with id ${actionId} not found`);

    const now = new Date().toISOString();
    const updated: RecommendedAction = {
      ...this.actions[index],
      status: 'APPROVED',
      approvedAt: now,
    };
    this.actions[index] = updated;

    this.auditLogs.unshift({
      id: `aud_${Date.now()}`,
      timestamp: now,
      category: 'ACTION_APPROVED',
      actor: this.profile.proprietor,
      actionTitle: `Action Approved: ${updated.title}`,
      entityId: updated.id,
      summary: `Approved by proprietor. Scheduled for simulated execution.`,
    });

    return { ...updated };
  }

  async executeActionSimulation(actionId: string): Promise<RecommendedAction> {
    await this.delay(350);
    const index = this.actions.findIndex((a) => a.id === actionId);
    if (index === -1) throw new Error(`Action with id ${actionId} not found`);

    const target = this.actions[index];
    const now = new Date().toISOString();

    const completedAction: RecommendedAction = {
      ...target,
      status: 'COMPLETED',
      executedAt: now,
      simulatedLogs: [
        ...(target.simulatedLogs || []),
        { step: 'Executed simulated automated dispatch payload', timestamp: now, status: 'SUCCESS' },
        { step: 'Simulated customer acknowledgement & settlement event', timestamp: now, status: 'SUCCESS' },
      ],
    };
    this.actions[index] = completedAction;

    // Apply deterministic business outcome to financial state
    if (target.id === 'act_01') {
      // Overdue Khata recovery: +₹3,700 cash, -₹3,700 overdue receivables
      this.financialHealth = {
        ...this.financialHealth,
        availableCash: this.financialHealth.availableCash + 3700,
        overdueReceivables: Math.max(0, this.financialHealth.overdueReceivables - 3700),
        netImmediateLiquidityGap: this.financialHealth.availableCash + 3700 - this.financialHealth.urgentPayablesNext7Days,
        healthScore: 72,
        healthStatus: 'CAUTION',
      };
      // Mark Amit and Neha collected
      this.receivables = this.receivables.map((r) =>
        r.id === 'rec_01' || r.id === 'rec_02' ? { ...r, status: 'COLLECTED', outstandingAmount: 0 } : r
      );
    } else if (target.id === 'act_02') {
      // Dead stock clearance: +₹7,800 cash, -₹10,660 locked capital
      this.financialHealth = {
        ...this.financialHealth,
        availableCash: this.financialHealth.availableCash + 7800,
        deadStockCapitalLocked: 0,
        netImmediateLiquidityGap: this.financialHealth.availableCash + 7800 - this.financialHealth.urgentPayablesNext7Days,
        healthScore: 84,
        healthStatus: 'STABLE',
      };
      this.inventory = this.inventory.map((inv) =>
        inv.status === 'DEAD_STOCK' ? { ...inv, currentStock: 0, totalLockedCapital: 0, status: 'HEALTHY' } : inv
      );
    }

    this.auditLogs.unshift({
      id: `aud_${Date.now()}`,
      timestamp: now,
      category: 'ACTION_EXECUTED',
      actor: 'Simulation Engine',
      actionTitle: `Simulated Execution: ${target.title}`,
      entityId: target.id,
      summary: `Completed simulated execution. Target metric delta verified: ${target.measuredOutcome?.actualSimulatedDelta}`,
    });

    return { ...completedAction };
  }

  async sendKhataReminder(receivableId: string): Promise<{ success: boolean; message: string; timestamp: string }> {
    await this.delay(200);
    const rec = this.receivables.find((r) => r.id === receivableId);
    if (!rec) throw new Error('Receivable not found');

    const now = new Date().toISOString();
    rec.remindersCount += 1;
    rec.lastReminderSentAt = now;

    this.auditLogs.unshift({
      id: `aud_${Date.now()}`,
      timestamp: now,
      category: 'ACTION_EXECUTED',
      actor: 'Khata Intelligence Bot',
      actionTitle: `Payment Reminder Sent to ${rec.customerName}`,
      entityId: rec.id,
      summary: `WhatsApp reminder dispatched with instant Paytm/UPI deep-link for ₹${rec.outstandingAmount.toLocaleString('en-IN')}.`,
    });

    return {
      success: true,
      message: `Simulated WhatsApp reminder dispatched to ${rec.customerName} (${rec.customerPhone})`,
      timestamp: now,
    };
  }

  async triggerDataSync(connectionId: string): Promise<DataConnection> {
    await this.delay(400);
    const index = this.connections.findIndex((c) => c.id === connectionId);
    if (index === -1) throw new Error('Connection not found');

    const now = new Date().toISOString();
    const updated: DataConnection = {
      ...this.connections[index],
      status: 'CONNECTED',
      lastSyncedAt: now,
      recordsIngestedTotal: this.connections[index].recordsIngestedTotal + 14,
      dataHealthScore: Math.min(100, this.connections[index].dataHealthScore + 1),
    };
    this.connections[index] = updated;

    this.ingestionLogs.unshift({
      id: `job_${Date.now()}`,
      timestamp: now,
      source: updated.name,
      recordsReceived: 14,
      recordsValidated: 14,
      recordsQuarantined: 0,
      duplicatesRemoved: 0,
      durationMs: 240,
      status: 'SUCCESS',
    });

    this.auditLogs.unshift({
      id: `aud_${Date.now()}`,
      timestamp: now,
      category: 'SYNC_COMPLETED',
      actor: 'Sync Orchestrator',
      actionTitle: `Telemetry Ingested: ${updated.name}`,
      entityId: updated.id,
      summary: `Simulated sync completed. 14 new records ingested into canonical model.`,
    });

    return { ...updated };
  }

  async runIntelligenceScan(): Promise<{ newSignals: number; newOpportunities: number }> {
    await this.delay(500);
    const now = new Date().toISOString();
    this.profile.lastDataSync = now;

    this.auditLogs.unshift({
      id: `aud_${Date.now()}`,
      timestamp: now,
      category: 'SIGNAL_DETECTED',
      actor: 'Intelligence Radar',
      actionTitle: 'Merchant Diagnostic Scan Finished',
      entityId: 'radar_01',
      summary: 'Ran 14 deterministic validation heuristics across cashflow, ledger, and stock velocity.',
    });

    return { newSignals: this.signals.length, newOpportunities: this.opportunities.length };
  }

  async getDataConnections(): Promise<DataConnection[]> {
    await this.delay();
    return [...this.connections];
  }

  async getIngestionLogs(): Promise<IngestionJobLog[]> {
    await this.delay();
    return [...this.ingestionLogs];
  }

  async getAuditLogs(): Promise<AuditEvent[]> {
    await this.delay();
    return [...this.auditLogs];
  }

  async getTransactions(): Promise<TransactionRecord[]> {
    await this.delay();
    return [...this.transactions];
  }

  async getActivityTimeline(): Promise<MerchantActivityEvent[]> {
    await this.delay(50);
    return [...this.activityTimeline];
  }

  async switchScenario(scenario: BusinessScenarioId): Promise<void> {
    await this.delay(150);
    this.profile.activeScenario = scenario;

    const matched = DEMO_SCENARIOS.find((s) => s.id === scenario);
    if (matched) {
      this.financialHealth = {
        ...INITIAL_FINANCIAL_HEALTH,
        ...matched.financialHealth,
      };
      this.activityTimeline = [...matched.timeline];
    } else if (scenario === 'healthy-growth' || scenario === 'healthy-business') {
      const hb = DEMO_SCENARIOS.find((s) => s.id === 'healthy-business');
      if (hb) {
        this.financialHealth = { ...INITIAL_FINANCIAL_HEALTH, ...hb.financialHealth };
        this.activityTimeline = [...hb.timeline];
      }
    } else {
      // Default to flagship crisis
      this.financialHealth = { ...INITIAL_FINANCIAL_HEALTH };
      this.activityTimeline = [...INITIAL_ACTIVITY_TIMELINE];
    }

    const now = new Date().toISOString();
    this.auditLogs.unshift({
      id: `aud_${Date.now()}`,
      timestamp: now,
      category: 'SCENARIO_CHANGED',
      actor: 'Demo Scenario Controller',
      actionTitle: `Switched Demo Scenario: ${matched?.name || scenario}`,
      entityId: scenario,
      summary: `Hydrated deterministic financial numbers, signals, and live telemetry for ${matched?.name || scenario}.`,
    });
  }

  async resetDemo(): Promise<void> {
    await this.delay(100);
    this.profile = { ...INITIAL_MERCHANT_PROFILE };
    this.financialHealth = { ...INITIAL_FINANCIAL_HEALTH };
    this.cashflow = [...CASHFLOW_PROJECTION_DATA];
    this.receivables = [...INITIAL_RECEIVABLES];
    this.payables = [...INITIAL_PAYABLES];
    this.inventory = [...INITIAL_INVENTORY];
    this.customers = [...INITIAL_CUSTOMERS];
    this.signals = [...INITIAL_SIGNALS];
    this.opportunities = [...INITIAL_OPPORTUNITIES];
    this.evidence = { ...INITIAL_EVIDENCE_RECORDS };
    this.actions = [...INITIAL_RECOMMENDED_ACTIONS];
    this.connections = [...INITIAL_DATA_CONNECTIONS];
    this.ingestionLogs = [...INITIAL_INGESTION_LOGS];
    this.auditLogs = [...INITIAL_AUDIT_LOGS];
    this.transactions = [...INITIAL_TRANSACTIONS];
    this.activityTimeline = [...INITIAL_ACTIVITY_TIMELINE];
  }
}

export const merchantServiceInstance = new MockMerchantService();
