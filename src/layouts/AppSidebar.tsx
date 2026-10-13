import React from 'react';
import {
  LayoutDashboard,
  Activity,
  TrendingUp,
  Receipt,
  BookOpen,
  Building2,
  Package,
  Users,
  Radio,
  Zap,
  CheckSquare,
  Layers,
  Cpu,
  Clock,
  HelpCircle,
  Network,
  QrCode,
  Settings,
  AlertTriangle,
} from 'lucide-react';
import { useMerchant } from '../context/MerchantContext';
import { Badge } from '../components/ui/Badge';

interface AppSidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const {
    activeAppTab,
    setActiveAppTab,
    receivables,
    payables,
    inventory,
    signals,
    opportunities,
    actions,
  } = useMerchant();

  const overdueKhataCount = receivables.filter((r) => r.status === 'OVERDUE').length;
  const urgentPayablesCount = payables.filter((p) => p.isCliff || p.priority === 'URGENT').length;
  const deadStockCount = inventory.filter((i) => i.status === 'DEAD_STOCK').length;
  const criticalSignalsCount = signals.filter((s) => s.severity === 'CRITICAL').length;
  const pendingActionsCount = actions.filter((a) => a.status === 'AWAITING_APPROVAL' || a.status === 'DRAFT').length;

  const handleTabClick = (tabId: string) => {
    setActiveAppTab(tabId);
    setIsMobileMenuOpen(false);
  };

  const navGroups = [
    {
      groupTitle: 'COMMAND',
      items: [
        { id: 'command-center', label: 'Command Center', icon: LayoutDashboard },
        { id: 'financial-health', label: 'Financial Health', icon: Activity },
        { id: 'cashflow', label: 'Cashflow & Cliff', icon: TrendingUp },
        { id: 'transactions', label: 'Transactions', icon: Receipt },
      ],
    },
    {
      groupTitle: 'WORKING CAPITAL',
      items: [
        {
          id: 'khata',
          label: 'Khata / Receivables',
          icon: BookOpen,
          badge: overdueKhataCount > 0 ? `${overdueKhataCount} Overdue` : undefined,
          badgeVariant: 'rose' as const,
        },
        {
          id: 'payables',
          label: 'Supplier Payables',
          icon: Building2,
          badge: urgentPayablesCount > 0 ? '₹45K Cliff' : undefined,
          badgeVariant: 'amber' as const,
        },
        {
          id: 'inventory',
          label: 'Inventory Velocity',
          icon: Package,
          badge: deadStockCount > 0 ? `${deadStockCount} Dead` : undefined,
          badgeVariant: 'slate' as const,
        },
        { id: 'customers', label: 'Customers & Credit', icon: Users },
      ],
    },
    {
      groupTitle: 'INTELLIGENCE',
      items: [
        {
          id: 'signals',
          label: 'Signal Radar',
          icon: Radio,
          badge: criticalSignalsCount > 0 ? `${criticalSignalsCount} Alert` : undefined,
          badgeVariant: 'rose' as const,
        },
        {
          id: 'opportunities',
          label: 'Opportunity Center',
          icon: Zap,
          badge: `${opportunities.length} Open`,
          badgeVariant: 'indigo' as const,
        },
        {
          id: 'actions',
          label: 'Action & Approval',
          icon: CheckSquare,
          badge: pendingActionsCount > 0 ? `${pendingActionsCount} Ready` : undefined,
          badgeVariant: 'emerald' as const,
        },
      ],
    },
    {
      groupTitle: 'DATA & ECOSYSTEM',
      items: [
        { id: 'connections', label: 'Connections & Paytm', icon: Layers },
        { id: 'ingestion', label: 'Ingestion & Quarantine', icon: Cpu },
        { id: 'audit', label: 'Audit Trail', icon: Clock },
      ],
    },
    {
      groupTitle: 'SYSTEM & HELP',
      items: [
        { id: 'how-it-works', label: 'How MerchantMind Works', icon: HelpCircle },
        { id: 'architecture', label: 'Enterprise Architecture', icon: Network },
        { id: 'paytm-ecosystem', label: 'Paytm Ecosystem Hub', icon: QrCode },
        { id: 'settings', label: 'Business Profile', icon: Settings },
      ],
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full py-4 overflow-y-auto">
      {/* Quick Liquidity Health Alert Widget */}
      <div className="mx-3 mb-4 p-3 bg-rose-50/80 border border-rose-200 rounded-xl">
        <div className="flex items-center gap-2 text-rose-800 font-semibold text-xs mb-1">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>Liquidity Alert</span>
        </div>
        <p className="text-[11px] text-rose-700 leading-snug">
          ₹45K supplier bill due in 5 days. Cash gap of ₹4,393.
        </p>
        <button
          onClick={() => handleTabClick('opportunities')}
          className="mt-2 text-[11px] font-semibold text-indigo-700 hover:text-indigo-900 inline-flex items-center gap-1 cursor-pointer"
        >
          View Solution &rarr;
        </button>
      </div>

      <nav className="flex-1 px-2 space-y-6">
        {navGroups.map((group) => (
          <div key={group.groupTitle} className="space-y-1">
            <h4 className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {group.groupTitle}
            </h4>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeAppTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left ${isActive
                      ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-600' : 'text-slate-400'
                          }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <Badge variant={item.badgeVariant || 'slate'} size="sm" className="ml-1 shrink-0">
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer Info */}
      <div className="p-3 mx-2 mt-4 border-t border-slate-200 text-center">
        <p className="text-[11px] font-medium text-slate-500">MerchantMind v1.0</p>
        <p className="text-[10px] text-slate-400">Lucknow Retail Cluster #14</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-200 bg-white shrink-0 min-h-[calc(100vh-6rem)]">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-64 max-w-xs bg-white shadow-xl flex flex-col z-50">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
