import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, BellOff, ChevronDown, ChevronUp, Clock, Share2, Check } from 'lucide-react';
import type { AlarmSetting, AstronomicalEventName } from '../types';
import { ADVANCE_MINUTES_OPTIONS } from '../types';
import { Language, ZMAN_NAMES, EVENT_DETAILS_I18N, UI_TRANSLATIONS } from '../i18n';

interface TimeTableProps {
  orderedTimes: { name: AstronomicalEventName; time: Date }[];
  alarmSettings: Record<AstronomicalEventName, AlarmSetting>;
  onSettingChange: (name: AstronomicalEventName, newSetting: Partial<AlarmSetting>) => void;
  language: Language;
}

const ZMAN_SUBTEXTS: Record<Language, Record<AstronomicalEventName, string>> = {
  en: {
    alosHashachar: "16.1° / 72 mins before Sunrise",
    netzHachamah: "Sea level horizon",
    shemaMA: "Magen Avraham (3 proportional hours from Alos)",
    shemaGra: "Gra (3 proportional hours from Sunrise)",
    tefillahGra: "Gra (4 proportional hours from Sunrise)",
    chatzos: "Solar noon / Midpoint of day",
    minchaGedolah: "6.5 proportional hours from Sunrise",
    minchaKetanah: "9.5 proportional hours from Sunrise",
    plagHamincha: "10.75 proportional hours from Sunrise",
    shkia: "Sunset sea level horizon",
    tzeisHakochavim: "8.5° below western horizon",
  },
  he: {
    alosHashachar: "16.1 מעלות / כ-72 דקות לפני הנץ",
    netzHachamah: "בגובה פני הים",
    shemaMA: "מג״א (3 שעות זמניות מעלות השחר)",
    shemaGra: "גר״א (3 שעות זמניות מהנץ)",
    tefillahGra: "גר״א (4 שעות זמניות מהנץ)",
    chatzos: "חצות היום האסטרונומי",
    minchaGedolah: "6.5 שעות זמניות מהנץ",
    minchaKetanah: "9.5 שעות זמניות מהנץ",
    plagHamincha: "פלג המנחה (1.25 שעות זמניות לפני השקיעה)",
    shkia: "שקיעת החמה בגובה פני הים",
    tzeisHakochavim: "8.5 מעלות מתחת לאופק",
  },
  fr: {
    alosHashachar: "16.1° / 72 min avant le lever",
    netzHachamah: "Horizon au niveau de la mer",
    shemaMA: "Magen Avraham",
    shemaGra: "Gra (3 heures prop. du lever)",
    tefillahGra: "Gra (4 heures prop. du lever)",
    chatzos: "Midi halachique",
    minchaGedolah: "6.5 heures prop.",
    minchaKetanah: "9.5 heures prop.",
    plagHamincha: "10.75 heures prop.",
    shkia: "Coucher du soleil",
    tzeisHakochavim: "8.5° sous l'horizon",
  },
  es: {
    alosHashachar: "16.1° / 72 min antes del amanecer",
    netzHachamah: "Horizonte al nivel del mar",
    shemaMA: "Magen Avraham",
    shemaGra: "Gra (3 horas prop. del amanecer)",
    tefillahGra: "Gra (4 horas prop. del amanecer)",
    chatzos: "Mediodía halájico",
    minchaGedolah: "6.5 horas proporcionales",
    minchaKetanah: "9.5 horas proporcionales",
    plagHamincha: "10.75 horas proporcionales",
    shkia: "Puesta de sol",
    tzeisHakochavim: "8.5° bajo el horizonte",
  },
  ru: {
    alosHashachar: "16.1° / 72 мин до восхода",
    netzHachamah: "Уровень моря",
    shemaMA: "Маген Авраам",
    shemaGra: "Гра (3 пропорц. часа от восхода)",
    tefillahGra: "Гра (4 пропорц. часа от восхода)",
    chatzos: "Астрономический полдень",
    minchaGedolah: "6.5 пропорц. часов",
    minchaKetanah: "9.5 пропорц. часов",
    plagHamincha: "10.75 пропорц. часов",
    shkia: "Заход солнца",
    tzeisHakochavim: "8.5° под горизонтом",
  }
};

const TABLE_VIEW_TRANSLATIONS: Record<Language, {
  upcomingTitle: string;
  expandHint: string;
}> = {
  en: {
    upcomingTitle: "Upcoming Zmanim",
    expandHint: "Click row for halachic details & custom offset",
  },
  he: {
    upcomingTitle: "זמנים קרובים",
    expandHint: "לחץ על שורה לפרטי הלכה והתאמת דקות",
  },
  fr: {
    upcomingTitle: "Horaires à Venir",
    expandHint: "Cliquez pour les détails halachiques et le décalage",
  },
  es: {
    upcomingTitle: "Próximos Zmanim",
    expandHint: "Haga clic para detalles halájicos y compensación",
  },
  ru: {
    upcomingTitle: "Предстоящие Зманим",
    expandHint: "Нажмите для галахических деталей и настройки времени",
  }
};

export const TimeTable: React.FC<TimeTableProps> = ({ orderedTimes, alarmSettings, onSettingChange, language }) => {
  const [expandedZman, setExpandedZman] = useState<AstronomicalEventName | null>(null);
  const [copiedZman, setCopiedZman] = useState<AstronomicalEventName | null>(null);
  const isRtl = language === 'he';
  const t = TABLE_VIEW_TRANSLATIONS[language];
  const ui = UI_TRANSLATIONS[language];

  const handleShare = async (
    name: AstronomicalEventName,
    time: Date,
    displayName: string,
    details: any
  ) => {
    const formattedTime = time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const textToShare = `🌅 *${displayName}* (${ui.appName || 'Zimna'})\n` +
      `⏰ *${formattedTime}*\n\n` +
      `📖 *${ui.section1}*:\n${details.description}\n\n` +
      `⚖️ *${ui.section2}*:\n${details.obligations}\n\n` +
      `📐 *${ui.section3}*:\n${details.calculation}`;

    const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedZman(name);
        setTimeout(() => setCopiedZman(null), 2000);
      });
    };

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

  const handleRowClick = (name: AstronomicalEventName) => {
    setExpandedZman(prev => (prev === name ? null : name));
  };

  const handleToggle = (name: AstronomicalEventName, enabled: boolean, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent expanding/collapsing row when clicking bell
    onSettingChange(name, { enabled });
  };

  const handleMinutesChange = (name: AstronomicalEventName, e: React.ChangeEvent<HTMLSelectElement>) => {
    onSettingChange(name, { advanceMinutes: parseInt(e.target.value, 10) });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main Table Container */}
      <div className="w-full flex flex-col gap-4">
        {orderedTimes.map(({ name, time }) => {
          const setting = alarmSettings[name];
          const isExpanded = expandedZman === name;
          const formattedTime = time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
          const displayName = ZMAN_NAMES[language][name];
          const subtext = ZMAN_SUBTEXTS[language][name];
          const details = EVENT_DETAILS_I18N[language][name];

          return (
            <div 
              key={name}
              className={`bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 w-full cursor-pointer ${
                isExpanded ? 'bg-slate-50/50' : 'hover:bg-slate-50/30'
              }`}
              onClick={() => handleRowClick(name)}
              data-walkthrough={`time-table-row-${name}`}
            >
              {/* Main Row Content */}
              <div className="flex items-center justify-between px-5 py-4 sm:px-6">
                {/* Left Column: Name, Description, and Time */}
                <div className={`flex-grow flex flex-col gap-1 ${isRtl ? 'text-right items-start pl-4' : 'text-left items-start pr-4'}`}>
                  {/* Line 1: Name */}
                  <p className="text-sm sm:text-base font-extrabold text-slate-800 leading-snug font-outfit">
                    {displayName}
                  </p>
                  {/* Line 2: Description */}
                  <p className="text-[11.5px] font-bold text-slate-400 leading-normal">
                    {subtext}
                  </p>
                  {/* Line 3: Time */}
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="font-outfit text-base sm:text-lg font-black text-slate-900 leading-none">
                      {formattedTime}
                    </span>
                    <Clock className="w-3.5 h-3.5 text-brand-600/80 shrink-0" />
                  </div>
                </div>

                {/* Right Column: Quick actions (Bell Icon & Caret) */}
                <div className="flex items-center gap-3 shrink-0 self-center">
                  {/* Minute preview badge when alarm enabled */}
                  {setting.enabled && (
                    <span className="hidden sm:inline-block bg-teal-50 border border-teal-100 text-brand-700 text-[10px] font-extrabold px-2.5 py-1 rounded-lg">
                      {setting.advanceMinutes} {ui.min}
                    </span>
                  )}

                  {/* Alarm Toggle Bell Button */}
                  <button
                    type="button"
                    onClick={(e) => handleToggle(name, !setting.enabled, e)}
                    className={`p-2.5 rounded-full border transition-all duration-200 ${
                      setting.enabled
                        ? 'bg-brand-50 hover:bg-brand-100 border-brand-200 text-brand-600 shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-100 text-slate-400'
                    }`}
                    title={setting.enabled ? ui.dismissAlarm : ui.enableAlarm}
                    data-walkthrough={`table-toggle-${name}`}
                  >
                    {setting.enabled ? (
                      <Bell className="w-4 h-4 fill-brand-600" />
                    ) : (
                      <BellOff className="w-4 h-4" />
                    )}
                  </button>

                  {/* Share Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(name, time, displayName, details);
                    }}
                    className={`p-2.5 rounded-full border transition-all duration-200 relative ${
                      copiedZman === name
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-600 scale-105 shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-100 text-slate-400 hover:text-slate-700 hover:scale-105'
                    }`}
                    title={language === 'he' ? "שתף זמן" : "Share time"}
                  >
                    {copiedZman === name ? (
                      <Check className="w-4 h-4 text-emerald-600 animate-in zoom-in duration-150" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                    {copiedZman === name && (
                      <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-sm whitespace-nowrap animate-in fade-in slide-in-from-bottom-1 z-10">
                        {language === 'he' ? 'הועתק!' : 'Copied!'}
                      </span>
                    )}
                  </button>

                  {/* Caret icon indicator */}
                  <div className="text-slate-300">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Details Section */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="overflow-hidden border-t border-slate-100 bg-slate-50/30"
                    onClick={(e) => e.stopPropagation()} // don't collapse on inner clicks
                  >
                    <div className="p-5 sm:p-6 space-y-4">
                      {/* Settings Bar */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-700 text-sm">
                            {ui.enableAlarm}
                          </span>
                          <button
                            type="button"
                            dir="ltr"
                            onClick={(e) => {
                              onSettingChange(name, { enabled: !setting.enabled });
                            }}
                            className={`${
                              setting.enabled ? 'bg-brand-600' : 'bg-slate-300'
                            } relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                            role="switch"
                            aria-checked={setting.enabled}
                          >
                            <span
                              className={`${
                                setting.enabled ? 'translate-x-4' : 'translate-x-0'
                              } pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ease-in-out`}
                            />
                          </button>
                        </div>

                        <div className={`flex items-center gap-2 transition-all ${setting.enabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                          <label htmlFor={`table-minutes-${name}`} className="font-medium text-slate-600 text-sm">
                            {ui.notifyInAdvance}
                          </label>
                          <select
                            id={`table-minutes-${name}`}
                            value={setting.advanceMinutes}
                            onChange={(e) => handleMinutesChange(name, e)}
                            disabled={!setting.enabled}
                            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-500 font-bold"
                          >
                            {ADVANCE_MINUTES_OPTIONS.map(min => (
                              <option key={min} value={min}>{min} {ui.min}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Structured Halachic Info Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        <div className="space-y-1 bg-brand-50/30 p-3.5 rounded-xl border border-brand-100/20">
                          <span className="font-bold text-brand-800 block text-[10px] tracking-wider uppercase">
                            {ui.section1}
                          </span>
                          <p className="leading-relaxed text-slate-700 font-medium">
                            {details.description}
                          </p>
                        </div>

                        <div className="space-y-1 bg-blue-50/40 p-3.5 rounded-xl border border-blue-100/30">
                          <span className="font-bold text-blue-800 block text-[10px] tracking-wider uppercase">
                            {ui.section2}
                          </span>
                          <p className="leading-relaxed text-slate-700 font-medium">
                            {details.obligations}
                          </p>
                        </div>

                        <div className="space-y-1 bg-slate-100/50 p-3.5 rounded-xl border border-slate-200/50">
                          <span className="font-bold text-slate-500 block text-[10px] tracking-wider uppercase">
                            {ui.section3}
                          </span>
                          <p className="leading-relaxed text-slate-500 font-medium">
                            {details.calculation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
