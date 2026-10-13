import React from 'react';
import { MerchantProvider, useMerchant } from './context/MerchantContext';
import { PublicShell } from './layouts/PublicShell';
import { AppShell } from './layouts/AppShell';

// Views
import { PublicShowcaseView } from './views/PublicShowcaseView';
import { CommandCenterView } from './views/CommandCenterView';
import { FinancialHealthView } from './views/FinancialHealthView';
import { CashflowView } from './views/CashflowView';
import { TransactionsView } from './views/TransactionsView';
import { KhataReceivablesView } from './views/KhataReceivablesView';
import { SupplierPayablesView } from './views/SupplierPayablesView';
import { InventoryView } from './views/InventoryView';
import { CustomersView } from './views/CustomersView';
import { SignalsView } from './views/SignalsView';
import { OpportunitiesView } from './views/OpportunitiesView';
import { ActionCenterView } from './views/ActionCenterView';
import { ConnectionsView } from './views/ConnectionsView';
import { IngestionView } from './views/IngestionView';
import { AuditTrailView } from './views/AuditTrailView';
import { HowItWorksView } from './views/HowItWorksView';
import { ArchitectureView } from './views/ArchitectureView';
import { PaytmEcosystemView } from './views/PaytmEcosystemView';
import { SettingsView } from './views/SettingsView';

const AppContent: React.FC = () => {
  const { activeWorld, activeAppTab, isLoading } = useMerchant();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600 font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold text-slate-700">Initializing MerchantMind Engine...</span>
        </div>
      </div>
    );
  }

  if (activeWorld === 'showcase') {
    return (
      <PublicShell>
        <PublicShowcaseView />
      </PublicShell>
    );
  }

  // World B: Operational Merchant Application
  const renderAppView = () => {
    switch (activeAppTab) {
      case 'command-center':
        return <CommandCenterView />;
      case 'financial-health':
        return <FinancialHealthView />;
      case 'cashflow':
        return <CashflowView />;
      case 'transactions':
        return <TransactionsView />;
      case 'khata':
        return <KhataReceivablesView />;
      case 'payables':
        return <SupplierPayablesView />;
      case 'inventory':
        return <InventoryView />;
      case 'customers':
        return <CustomersView />;
      case 'signals':
        return <SignalsView />;
      case 'opportunities':
        return <OpportunitiesView />;
      case 'actions':
        return <ActionCenterView />;
      case 'connections':
        return <ConnectionsView />;
      case 'ingestion':
        return <IngestionView />;
      case 'audit':
        return <AuditTrailView />;
      case 'how-it-works':
        return <HowItWorksView />;
      case 'architecture':
        return <ArchitectureView />;
      case 'paytm-ecosystem':
        return <PaytmEcosystemView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <CommandCenterView />;
    }
  };

  return <AppShell>{renderAppView()}</AppShell>;
};

export default function App() {
  return (
    <MerchantProvider>
      <AppContent />
    </MerchantProvider>
  );
}
