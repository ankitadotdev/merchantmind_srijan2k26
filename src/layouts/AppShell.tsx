import React, { useState } from 'react';
import { DemoModeBanner } from './DemoModeBanner';
import { TopNavbar } from './TopNavbar';
import { AppSidebar } from './AppSidebar';
import { EvidenceDrawer } from './EvidenceDrawer';
import { GuidedTourModal } from './GuidedTourModal';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <DemoModeBanner />
      <TopNavbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <AppSidebar
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          {children}
        </main>
      </div>

      <EvidenceDrawer />
      <GuidedTourModal />
    </div>
  );
};
