import React from 'react';
import { Settings, User, Building, CreditCard, RotateCcw, ShieldCheck } from 'lucide-react';
import { useMerchant } from '../context/MerchantContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const SettingsView: React.FC = () => {
  const { profile, resetDemo } = useMerchant();

  if (!profile) return null;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Business Profile & Settings</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Store identity, GST registration, bank account details, and demo controls
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={resetDemo} className="text-xs">
          <RotateCcw className="w-3.5 h-3.5 mr-1" />
          <span>Reset Demo Store</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Merchant Store Details</CardTitle>
          <CardDescription>Primary business credentials and commercial trade name</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 font-medium block">Business Name</span>
              <strong className="text-slate-900 text-sm font-semibold">{profile.businessName}</strong>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Trade Name</span>
              <strong className="text-slate-900 text-sm font-semibold">{profile.tradeName}</strong>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Proprietor Name</span>
              <strong className="text-slate-900 text-sm font-semibold">{profile.proprietor}</strong>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">GSTIN Registration</span>
              <strong className="text-slate-900 text-sm font-mono font-semibold">{profile.gstin}</strong>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Category & Line of Business</span>
              <strong className="text-slate-800 text-xs">{profile.category} ({profile.subCategory})</strong>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Registered Address</span>
              <strong className="text-slate-800 text-xs">
                {profile.address.line1}, {profile.address.market}, {profile.address.city}, {profile.address.state} — {profile.address.pincode}
              </strong>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Settlement Bank Account</CardTitle>
          <CardDescription>Linked account for Paytm soundbox and UPI settlement disbursements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-slate-900 font-semibold block">{profile.primaryBank}</strong>
                <span className="text-slate-500 font-mono text-[11px]">{profile.primaryAccountMasked} • Current Account</span>
              </div>
            </div>
            <Badge variant="emerald" size="sm">
              Verified
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
