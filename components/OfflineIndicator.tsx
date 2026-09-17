import React from 'react';
import { useOnlineStatus } from '../useOnlineStatus';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      id="pwa-offline-indicator"
      className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs z-50 flex items-center gap-2.5 rounded-2xl bg-slate-900 text-white px-4 py-3 text-xs font-semibold shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-300"
    >
      <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
      <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
      <span className="leading-snug">Offline Mode — Cached times and local calculations are active.</span>
    </div>
  );
};
