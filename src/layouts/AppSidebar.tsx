import React from 'react';
import {
  LayoutDashboard,
  MessageSquare,
  Activity,
  TrendingUp,
  Receipt,
  Building2,
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
    payables,
    signals,
    opportunities,
    actions,
    language,
  } = useMerchant();

  const urgentPayablesCount = payables.filter((p) => p.isCliff || p.priority === 'URGENT').length;
  const criticalSignalsCount = signals.filter((s) => s.severity === 'CRITICAL').length;
  const pendingActionsCount = actions.filter((a) => a.status === 'AWAITING_APPROVAL' || a.status === 'DRAFT').length;

  const handleTabClick = (tabId: string) => {
    setActiveAppTab(tabId);
    setIsMobileMenuOpen(false);
  };

  const navGroups = [
    {
      groupTitle: language === 'hi' ? 'दुकान कमांड' : 'COMMAND',
      items: [
        { id: 'command-center', label: language === 'hi' ? 'कमांड सेंटर' : 'Command Center', icon: LayoutDashboard },
        {
          id: 'vyapar-assistant',
          label: language === 'hi' ? 'AI व्यापार सहायक' : 'AI Vyapar Sahayak',
          icon: MessageSquare,
          badge: 'VOICE 🎙️',
          badgeVariant: 'cyan' as const,
        },
        { id: 'cashflow', label: language === 'hi' ? 'कैशफ्लो और बिल रडार' : 'Cashflow & Cliff', icon: TrendingUp },
        { id: 'financial-health', label: language === 'hi' ? 'बिजनेस हेल्थ' : 'Financial Health', icon: Activity },
        { id: 'transactions', label: language === 'hi' ? 'लेन-देन (Transactions)' : 'Transactions', icon: Receipt },
      ],
    },
    {
      groupTitle: language === 'hi' ? 'वर्किंग कैपिटल' : 'WORKING CAPITAL',
      items: [
        {
          id: 'payables',
          label: language === 'hi' ? 'सप्लायर बिल (Due)' : 'Supplier Payables',
          icon: Building2,
          badge: urgentPayablesCount > 0 ? '₹45K Cliff' : undefined,
          badgeVariant: 'amber' as const,
        },
        {
          id: 'customers',
          label: language === 'hi' ? 'ग्राहक डायरेक्टरी' : 'Customers Directory',
          icon: Users,
        },
      ],
    },
    {
      groupTitle: language === 'hi' ? 'इंटेलिजेंस और एक्शन्स' : 'INTELLIGENCE & ACTIONS',
      items: [
        {
          id: 'actions',
          label: language === 'hi' ? '1-क्लिक समाधान (Actions)' : 'Action & Approval',
          icon: CheckSquare,
          badge: pendingActionsCount > 0 ? `${pendingActionsCount} Ready` : undefined,
          badgeVariant: 'emerald' as const,
        },
        {
          id: 'signals',
          label: language === 'hi' ? 'सिग्नल रडार (Alerts)' : 'Signal Radar',
          icon: Radio,
          badge: criticalSignalsCount > 0 ? `${criticalSignalsCount} Alert` : undefined,
          badgeVariant: 'rose' as const,
        },
        {
          id: 'opportunities',
          label: language === 'hi' ? 'पूंजी अवसर (Opportunities)' : 'Opportunity Center',
          icon: Zap,
          badge: `${opportunities.length} Open`,
          badgeVariant: 'indigo' as const,
        },
        { id: 'paytm-ecosystem', label: language === 'hi' ? 'Paytm टेलीमेट्री हब' : 'Paytm Telemetry Hub', icon: QrCode },
      ],
    },
    {
      groupTitle: language === 'hi' ? 'सिस्टम और आर्किटेक्चर' : 'SYSTEM & ARCHITECTURE',
      items: [
        { id: 'architecture', label: language === 'hi' ? 'सिस्टम आर्किटेक्चर' : 'Enterprise Architecture', icon: Network },
        { id: 'how-it-works', label: language === 'hi' ? 'सिस्टम कैसे काम करता है' : 'How It Works', icon: HelpCircle },
        { id: 'settings', label: language === 'hi' ? 'दुकान प्रोफाइल' : 'Business Profile', icon: Settings },
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
