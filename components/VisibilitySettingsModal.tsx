import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Eye, EyeOff, CheckSquare, Square } from 'lucide-react';
import { Language, ZMAN_NAMES } from '../i18n';
import { AstronomicalEventName, ALARM_EVENT_NAMES } from '../types';

interface VisibilitySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  visibleZmanim: Record<AstronomicalEventName, boolean>;
  onToggleZman: (name: AstronomicalEventName) => void;
  onShowAll: () => void;
  onHideAll: () => void;
}

const MODAL_I18N: Record<Language, {
  title: string;
  description: string;
  showAll: string;
  hideAll: string;
  close: string;
  atLeastOne: string;
}> = {
  en: {
    title: "Show / Hide Zmanim Boxes",
    description: "Customize which astronomical daily times (Zmanim) you want to see on your dashboard.",
    showAll: "Show All",
    hideAll: "Hide All",
    close: "Close",
    atLeastOne: "At least one Zman box must remain visible!",
  },
  he: {
    title: "הצגה / הסתרת תיבות זמנים",
    description: "התאם אישית אילו זמנים הלכתיים יוצגו במסך הראשי שלך.",
    showAll: "הצג הכל",
    hideAll: "הסתר הכל",
    close: "סגור",
    atLeastOne: "עליך להשאיר לפחות תיבת זמן אחת גלויה!",
  },
  fr: {
    title: "Afficher / Masquer les Zmanim",
    description: "Personnalisez les horaires astronomiques quotidiens que vous souhaitez afficher sur votre tableau de bord.",
    showAll: "Tout Afficher",
    hideAll: "Tout Masquer",
    close: "Fermer",
    atLeastOne: "Au moins un horaire de Zman doit rester visible !",
  },
  es: {
    title: "Mostrar / Ocultar Zmanim",
    description: "Personalice qué horarios astronómicos diarios desea ver en su tablero.",
    showAll: "Mostrar Todo",
    hideAll: "Ocultar Todo",
    close: "Cerrar",
    atLeastOne: "¡Debe permanecer visible al menos un horario de Zman!",
  },
  ru: {
    title: "Показать / Скрыть Зманим",
    description: "Настройте, какие ежедневные галахические времена отображать на главном экране.",
    showAll: "Показать все",
    hideAll: "Скрыть все",
    close: "Закрыть",
    atLeastOne: "Как минимум одно время должно оставаться видимым!",
  }
};

const ToggleSwitch: React.FC<{ enabled: boolean; onChange: () => void }> = ({ enabled, onChange }) => {
  return (
    <button
      type="button"
      dir="ltr"
      onClick={onChange}
      className={`${
        enabled ? 'bg-brand-600' : 'bg-slate-300'
      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 focus:ring-offset-white`}
      role="switch"
      aria-checked={enabled}
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

export const VisibilitySettingsModal: React.FC<VisibilitySettingsModalProps> = ({
  isOpen,
  onClose,
  language,
  visibleZmanim,
  onToggleZman,
  onShowAll,
  onHideAll,
}) => {
  const isRtl = language === 'he';
  const m = MODAL_I18N[language];

  // Count active visible ones
  const visibleCount = ALARM_EVENT_NAMES.filter(name => visibleZmanim[name] !== false).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-2xl w-full relative z-10 flex flex-col max-h-[85vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-50`}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className={`flex flex-col gap-2 ${isRtl ? 'text-right' : 'text-left'} mb-6 mt-1`}>
              <div className="flex items-center gap-2.5">
                <div className="bg-brand-50 p-2.5 rounded-2xl text-brand-600 border border-brand-100/20 shrink-0">
                  <Eye className="w-5 h-5 text-brand-600" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight font-outfit">
                  {m.title}
                </h3>
              </div>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mt-1">
                {m.description}
              </p>
            </div>

            {/* Quick Actions (Select All, Deselect All) */}
            <div className={`flex gap-3 mb-5 border-b border-slate-100 pb-4 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
              <button
                type="button"
                onClick={onShowAll}
                className="flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100/80 px-3.5 py-2 rounded-xl transition-all"
              >
                <CheckSquare className="w-3.5 h-3.5" />
                <span>{m.showAll}</span>
              </button>
              <button
                type="button"
                onClick={onHideAll}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-700 bg-slate-50 hover:bg-slate-100/80 px-3.5 py-2 rounded-xl transition-all"
              >
                <Square className="w-3.5 h-3.5" />
                <span>{m.hideAll}</span>
              </button>
            </div>

            {/* Scrollable List */}
            <div className="flex-grow overflow-y-auto pr-1 -mr-1 space-y-2.5 py-1">
              {ALARM_EVENT_NAMES.map((name) => {
                const isVisible = visibleZmanim[name] !== false;
                const displayName = ZMAN_NAMES[language][name];
                
                // Disable toggling off if it's the last visible one
                const isDisabled = isVisible && visibleCount <= 1;

                return (
                  <div
                    key={name}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                      isVisible 
                        ? 'bg-white border-slate-100 shadow-xs' 
                        : 'bg-slate-50/50 border-slate-100 opacity-60'
                    } ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                      <div className={`p-2 rounded-xl shrink-0 ${isVisible ? 'bg-brand-50 text-brand-600' : 'bg-slate-100 text-slate-400'}`}>
                        {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-extrabold text-slate-800 leading-tight">
                          {displayName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <ToggleSwitch
                        enabled={isVisible}
                        onChange={() => {
                          if (isDisabled) {
                            alert(m.atLeastOne);
                            return;
                          }
                          onToggleZman(name);
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer button */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-extrabold py-3.5 px-6 rounded-2xl transition-all shadow-md shadow-brand-500/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
              >
                {m.close}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
