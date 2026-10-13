import React, { useState } from 'react';
import { DemoModeBanner } from './DemoModeBanner';
import { TopNavbar } from './TopNavbar';
import { EvidenceDrawer } from './EvidenceDrawer';
import { GuidedTourModal } from './GuidedTourModal';

export const PublicShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-indigo-500 selection:text-white">
      <DemoModeBanner />
      <TopNavbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <main className="flex-1 w-full">{children}</main>
      <EvidenceDrawer />
      <GuidedTourModal />
    </div>
  );
};
