import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Check } from 'lucide-react';
import type { AlarmSetting, AstronomicalEventName } from '../types';
import { ADVANCE_MINUTES_OPTIONS } from '../types';
import { ClockIcon } from './icons/ClockIcon';
import { Language, ZMAN_NAMES, EVENT_DETAILS_I18N, UI_TRANSLATIONS } from '../i18n';

interface TimeCardProps {
  eventName: AstronomicalEventName;
  eventTime: Date;
  setting: AlarmSetting;
  onSettingChange: (newSetting: Partial<AlarmSetting>) => void;
  language: Language;
}

const ToggleSwitch: React.FC<{ enabled: boolean; onChange: (enabled: boolean) => void }> = ({ enabled, onChange }) => {
  return (
    <button
      type="button"
      dir="ltr"
      className={`${
        enabled ? 'bg-brand-600' : 'bg-slate-300'
      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 focus:ring-offset-white`}
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
    >
      <span
        aria-hidden="true"
        className={`${
          enabled ? 'translate-x-5' : 'translate-x-0'
        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
      />
    </button>
  );
};

const TimeCard: React.FC<TimeCardProps> = ({ eventName, eventTime, setting, onSettingChange, language }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const formattedTime = eventTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

  const handleToggle = (enabled: boolean) => {
    onSettingChange({ enabled });
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSettingChange({ advanceMinutes: parseInt(e.target.value, 10) });
  };

  const details = EVENT_DETAILS_I18N[language][eventName];
  const ui = UI_TRANSLATIONS[language];
  const displayName = ZMAN_NAMES[language][eventName];

  const handleShare = async () => {
    const textToShare = `🌅 *${displayName}* (${ui.appName || 'Zimna'})\n` +
      `⏰ *${formattedTime}*\n\n` +
      `📖 *${ui.section1}*:\n${details.description}\n\n` +
      `⚖️ *${ui.section2}*:\n${details.obligations}\n\n` +
      `📐 *${ui.section3}*:\n${details.calculation}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${displayName} - Zimna`,
          text: textToShare,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          copyToClipboard(textToShare);
        }
      }
    } else {
      copyToClipboard(textToShare);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    });
  };

  return (
    <div 
      className="bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md p-6 flex flex-col justify-between transition-all duration-300 hover:border-brand-300 hover:shadow-brand-50/50"
      data-walkthrough={`time-card-${eventName}`}
    >
      <div>
        <div className="flex justify-center items-start gap-2">
          <div className="w-full flex flex-col items-center text-center">
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight leading-snug font-sans text-center">{displayName}</h2>
            </div>
            
            {/* Enlarged Time and Tap-to-Expand Info Button on the same level */}
            <div className="flex items-center justify-center gap-2 mt-3.5 w-full">
              <div className="flex items-center gap-2 text-slate-900 bg-teal-50/50 border border-teal-100/50 px-3.5 py-2.5 rounded-2xl flex-grow justify-center">
                <ClockIcon className="w-5 h-5 text-brand-600 shrink-0" />
                <p className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-none text-slate-900">{formattedTime}</p>
              </div>

              {/* Share Button */}
              <button
                type="button"
                onClick={handleShare}
                className={`p-3 rounded-2xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-600 shrink-0 relative ${
                  showCopied
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200 scale-105 shadow-sm'
                    : 'bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100 hover:text-slate-700 hover:scale-105'
                }`}
                title={language === 'he' ? "שתף זמן" : "Share time"}
              >
                {showCopied ? (
                  <Check className="w-5 h-5 text-emerald-600 animate-in zoom-in duration-150" />
                ) : (
                  <Share2 className="w-5 h-5" />
                )}
                {showCopied && (
                  <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-sm whitespace-nowrap animate-in fade-in slide-in-from-bottom-1 z-10">
                    {language === 'he' ? 'הועתק!' : 'Copied!'}
                  </span>
                )}
              </button>

              {/* Info Button */}
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className={`p-3 rounded-2xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-600 shrink-0 ${
                  isExpanded
                    ? 'bg-brand-50 text-brand-900 border-brand-200 shadow-sm scale-105'
                    : 'bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100 hover:text-slate-700 hover:scale-105'
                }`}
                aria-expanded={isExpanded}
                title={isExpanded ? "Hide halachic details" : "Show halachic details"}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.063.852l-.708 2.836a.75.75 0 001.063.852l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Structured Halachic Sections (Collapsible) */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-3.5 text-xs border-t border-slate-100 pt-4">
                <div className="space-y-1 bg-brand-50/30 p-3 rounded-xl border border-brand-100/20">
                  <span className="font-bold text-brand-800 block text-[10px] tracking-wider uppercase">{ui.section1}</span>
                  <p className="leading-relaxed text-slate-700 font-medium">{details.description}</p>
                </div>
                <div className="space-y-1 bg-blue-50/40 p-3 rounded-xl border border-blue-100/30">
                  <span className="font-bold text-blue-800 block text-[10px] tracking-wider uppercase">{ui.section2}</span>
                  <p className="leading-relaxed text-slate-700 font-medium">{details.obligations}</p>
                </div>
                <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-500 block text-[10px] tracking-wider uppercase">{ui.section3}</span>
                  <p className="leading-relaxed text-slate-500 font-medium text-[11px]">{details.calculation}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <label htmlFor={`enable-${eventName}`} className="font-semibold text-slate-700 text-sm">
            {ui.enableAlarm}
          </label>
          <div data-walkthrough={`toggle-${eventName}`}>
            <ToggleSwitch enabled={setting.enabled} onChange={handleToggle} />
          </div>
        </div>
        
        <div className={`transition-all duration-300 ${setting.enabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
           <div 
            className="flex justify-between items-center"
            data-walkthrough={`select-${eventName}`}
           >
            <label htmlFor={`minutes-${eventName}`} className="font-medium text-slate-600 text-sm">
              {ui.notifyInAdvance}
            </label>
            <select
              id={`minutes-${eventName}`}
              value={setting.advanceMinutes}
              onChange={handleMinutesChange}
              disabled={!setting.enabled}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 font-medium"
            >
              {ADVANCE_MINUTES_OPTIONS.map(min => (
                <option key={min} value={min}>{min} {ui.min}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeCard;
