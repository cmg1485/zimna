
import React, { useState } from 'react';
import type { RingingAlarm } from '../types';
import { BellIcon } from './icons/BellIcon';
import { XIcon } from './icons/XIcon';
import { Language, ZMAN_NAMES, UI_TRANSLATIONS } from '../i18n';

interface AlarmModalProps {
  alarm: RingingAlarm;
  onDismiss: () => void;
  onSnooze: (minutes: number) => void;
  language: Language;
}

const AlarmModal: React.FC<AlarmModalProps> = ({ alarm, onDismiss, onSnooze, language }) => {
  const { eventName, eventTime } = alarm;
  const formattedTime = eventTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const [shareStatus, setShareStatus] = useState<string | null>(null);

  const ui = UI_TRANSLATIONS[language];
  const displayName = ZMAN_NAMES[language][eventName];

  const handleShare = async () => {
    const shareText = `⏰ Zmanim Today: ${ui.itsTime} - ${displayName} at ${formattedTime}! 🌟 Calibrate your daily mitzvos & prayers with Zmanim Today.`;
    const shareData = {
      title: `Zmanim Today - ${displayName}`,
      text: shareText,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        setShareStatus(ui.shared);
        setTimeout(() => setShareStatus(null), 3000);
        return;
      } catch (error) {
        console.warn('Native share failed, falling back to clipboard:', error);
      }
    }

    try {
      await navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
      setShareStatus(ui.shared);
      setTimeout(() => setShareStatus(null), 3000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      setShareStatus('Copy failed');
      setTimeout(() => setShareStatus(null), 3000);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white border border-brand-200 rounded-3xl shadow-2xl w-full max-w-md text-center p-6 sm:p-8 transform transition-all animate-fade-in-up relative">
        <div className="absolute top-4 right-4">
          <button
            onClick={onDismiss}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-full hover:bg-slate-100"
            aria-label={ui.dismissAlarm}
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-brand-50 border border-brand-200 mb-4 animate-bounce">
          <BellIcon className="w-8 h-8 text-brand-600" />
        </div>
        
        <h2 id="modal-title" className="text-3xl font-black text-slate-900 tracking-tight">
          {ui.itsTime}
        </h2>
        <div className="mt-2 flex flex-col items-center">
          <span className="text-2xl font-bold text-brand-600 font-sans leading-snug">{displayName}</span>
          <span className="text-lg font-semibold text-slate-500 mt-1">{formattedTime}</span>
        </div>

        <div className="flex flex-col gap-2.5 mt-8">
          <div className="flex gap-2.5">
            <button
              onClick={() => onSnooze(2)}
              className="flex-1 bg-slate-100 text-slate-700 font-semibold py-3 px-4 rounded-xl hover:bg-slate-200 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
            >
              {ui.snoozeMin} 2 {ui.min}
            </button>
            <button
              onClick={() => onSnooze(5)}
              className="flex-1 bg-slate-100 text-slate-700 font-semibold py-3 px-4 rounded-xl hover:bg-slate-200 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
            >
              {ui.snoozeMin} 5 {ui.min}
            </button>
          </div>

          <button
            onClick={handleShare}
            className={`w-full ${shareStatus ? 'bg-emerald-600' : 'bg-slate-800 hover:bg-slate-700'} text-white font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
            <span>{shareStatus || ui.shareAlarmAlert}</span>
          </button>

          <button
            onClick={onDismiss}
            className="w-full bg-brand-600 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-brand-700 transition-all shadow-md shadow-brand-500/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
          >
            {ui.dismissAlarm}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AlarmModal;
