import React, { useState } from 'react';
import { Language, UI_TRANSLATIONS } from '../i18n';
import { Globe, Menu, RotateCcw, HelpCircle, Share2, ChevronDown, Check, Compass, X, LayoutGrid, List, Sparkles, Eye, EyeOff } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onRestartTour: () => void;
  onResetAlarms: () => void;
  viewMode: 'grid' | 'table';
  onViewModeChange: (mode: 'grid' | 'table') => void;
  onShowIntro: () => void;
  onOpenVisibilitySettings: () => void;
  hasHiddenZmanim: boolean;
}

const VIEW_TRANSLATIONS: Record<Language, { grid: string; list: string }> = {
  en: { grid: "Grid View", list: "List View" },
  he: { grid: "תצוגת קוביות", list: "תצוגת רשימה" },
  fr: { grid: "Grille", list: "Liste" },
  es: { grid: "Cuadrícula", list: "Lista" },
  ru: { grid: "Плитка", list: "Список" },
};

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'he', label: 'עברית' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
  { code: 'ru', label: 'Русский' },
];

const LANG_LABELS: Record<Language, string> = {
  en: 'English',
  he: 'עברית',
  fr: 'Français',
  es: 'Español',
  ru: 'Русский',
};

const MENU_TRANSLATIONS: Record<Language, {
  tour: string;
  introSlides: string;
  resetSettings: string;
  resetConfirm: string;
  resetSuccess: string;
  aboutTitle: string;
  aboutContent: string;
  shareApp: string;
  shareSuccess: string;
  close: string;
  cancel: string;
  confirm: string;
  toggleBoxes: string;
}> = {
  en: {
    tour: "Launch Interactive Tour",
    introSlides: "Feature Slideshow",
    resetSettings: "Reset Alarms to Default",
    resetConfirm: "Are you sure you want to reset all alarms to defaults?",
    resetSuccess: "Alarms successfully reset!",
    aboutTitle: "Astronomical Calculations",
    aboutContent: "Zman (The Flagship Zmanim App) calculates exact daily astronomical times using SunCalc.js. These include Alos (Dawn), Netz (Sunrise), Shema (Gra & Magen Avraham), Tefillah, Chatzos (Solar Noon), Mincha, Plag Hamincha, Shkia (Sunset), and Tzeis (Nightfall). Times are dynamically calibrated based on your active GPS coordinates and the Sun's precise angular position relative to the local horizon.",
    shareApp: "Share App Link",
    shareSuccess: "Link copied to clipboard!",
    close: "Close",
    cancel: "Cancel",
    confirm: "Reset",
    toggleBoxes: "Show / Hide Boxes"
  },
  he: {
    tour: "הפעל מדריך אינטראקטיבי",
    introSlides: "מצגת היכרות",
    resetSettings: "אפס הגדרות לברירת מחדל",
    resetConfirm: "האם אתה בטוח שברצונך לאפס את כל ההתראות?",
    resetSuccess: "ההתראות אופסו בהצלחה!",
    aboutTitle: "חישובים אסטרונומיים והלכתיים",
    aboutContent: "אפליקציית Zman מחשבת את הזמנים האסטרונומיים המדויקים מדי יום באמצעות SunCalc.js. החישובים כוללים את עלות השחר, הנץ החמה, קריאת שמע (גר״א ומג״א), תפילה, חצות היום, מנחה, פלג המנחה, שקיעת החמה, וצאת הכוכבים. הזמנים מכוילים באופן דינמי על בסיס קואורדינטות ה-GPS הפעילות שלך וזווית השמש ביחס לאופק המקומי.",
    shareApp: "שתף קישור לאפליקציה",
    shareSuccess: "הקישור הועתק ללוח!",
    close: "סגור",
    cancel: "ביטול",
    confirm: "אפס",
    toggleBoxes: "הצג / הסתר תיבות"
  },
  fr: {
    tour: "Lancer la Visite Guidée",
    introSlides: "Diaporama de Présentation",
    resetSettings: "Réinitialiser les Alarmes",
    resetConfirm: "Êtes-vous sûr de vouloir réinitialiser toutes les alarmes ?",
    resetSuccess: "Alarmes réinitialisées avec succès !",
    aboutTitle: "Calculs Astronomiques & Halachiques",
    aboutContent: "Zman calcule les horaires astronomiques quotidiens exacts à l'aide de SunCalc.js, y compris Alos (Aube), Netz (Lever), Chéma, Tefilah, Chatzos (Midi), Mincha, Plag et Tzeis (Nuitfall). Les heures sont calibrées de manière dynamique en fonction de vos coordonnées GPS et de la position angulaire du soleil.",
    shareApp: "Partager l'Application",
    shareSuccess: "Lien copié dans le presse-papiers !",
    close: "Fermer",
    cancel: "Annuler",
    confirm: "Réinitialiser",
    toggleBoxes: "Afficher / Masquer"
  },
  es: {
    tour: "Iniciar Visita Guiada",
    introSlides: "Presentación de Características",
    resetSettings: "Restablecer Alarmas",
    resetConfirm: "¿Está seguro de que desea restablecer todas las alarmas?",
    resetSuccess: "¡Alarmas restablecidas con éxito!",
    aboutTitle: "Cálculos Astronómicos y Halájicos",
    aboutContent: "Zman calcula las horas astronómicas diarias exactas utilizando SunCalc.js, incluyendo Alos (Alba), Netz (Amanecer), Shemá, Tefilá, Chatzos (Mediodía), Minjá, Plag y Tzeis (Anochecer). Los tiempos se calibran dinámicamente en función de sus coordenadas GPS.",
    shareApp: "Compartir Aplicación",
    shareSuccess: "¡Enlace copiado al portapapeles!",
    close: "Cerrar",
    cancel: "Cancelar",
    confirm: "Restablecer",
    toggleBoxes: "Mostrar / Ocultar"
  },
  ru: {
    tour: "Запустить интерактивный тур",
    introSlides: "Интро-презентация функций",
    resetSettings: "Сбросить настройки",
    resetConfirm: "Вы уверены, что хотите сбросить все настройки будильников?",
    resetSuccess: "Настройки успешно сброшены!",
    aboutTitle: "Астрономические Расчеты",
    aboutContent: "Zman рассчитывает точное ежедневное астрономическое время с помощью SunCalc.js, включая Алос (Рассвет), Нец (Восход), Шма, Тфилу, Хацот (Полдень), Минху, Плаг и Цейс (Ночь). Время калибруется динамически на основе ваших GPS-координат.",
    shareApp: "Поделиться Приложением",
    shareSuccess: "Ссылка скопирована в буфер обмена!",
    close: "Закрыть",
    cancel: "Отмена",
    confirm: "Сбросить",
    toggleBoxes: "Показать / Скрыть"
  }
};

const Header: React.FC<HeaderProps> = ({ language, onLanguageChange, onRestartTour, onResetAlarms, viewMode, onViewModeChange, onShowIntro, onOpenVisibilitySettings, hasHiddenZmanim }) => {
  const ui = UI_TRANSLATIONS[language];
  const m = MENU_TRANSLATIONS[language];
  const isRtl = language === 'he';

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showResetSuccess, setShowResetSuccess] = useState(false);

  const handleShare = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setShareStatus(true);
      setTimeout(() => setShareStatus(false), 2500);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleResetClick = () => {
    setShowResetConfirm(true);
    setIsBurgerOpen(false);
  };

  const handleConfirmReset = () => {
    onResetAlarms();
    setShowResetConfirm(false);
    setShowResetSuccess(true);
  };

  return (
    <header 
      className="w-full max-w-7xl mx-auto mb-6 sm:mb-10 flex flex-col items-center relative"
      data-walkthrough="header"
    >
      {/* Top Bar with Language Dropdown, View Mode Toggle, and Hamburger Menu */}
      <div className="w-full flex justify-between items-center mb-6 px-1">
        
        {/* Left Side: Language Selector & View Mode Toggle */}
        <div className="flex items-center gap-2" data-walkthrough="top-left-controls">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsLangOpen(!isLangOpen);
                setIsBurgerOpen(false);
              }}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-100 rounded-2xl shadow-sm hover:bg-slate-50 hover:border-slate-200 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <Globe className="w-3.5 h-3.5 text-brand-600" />
              <span>{LANG_LABELS[language]}</span>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setIsLangOpen(false)} />
                <div className="absolute left-0 mt-2 w-40 bg-white border border-slate-100 rounded-2xl shadow-xl py-1.5 z-40 animate-in fade-in slide-in-from-top-2 duration-150">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setIsLangOpen(false);
                      }}
                      className="flex items-center justify-between w-full px-4 py-2.5 text-xs text-left font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition-colors"
                    >
                      <span>{lang.label}</span>
                      {language === lang.code && <Check className="w-3.5 h-3.5 text-brand-600 shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* View Mode Toggle Segmented Control */}
          <div className="flex bg-white border border-slate-100 rounded-2xl p-1 shadow-sm shrink-0" data-walkthrough="view-mode-toggle">
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-xl transition-all ${
                viewMode === 'grid'
                  ? 'bg-brand-50 text-brand-600 font-bold'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title={VIEW_TRANSLATIONS[language].grid}
              aria-label={VIEW_TRANSLATIONS[language].grid}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('table')}
              className={`p-1.5 rounded-xl transition-all ${
                viewMode === 'table'
                  ? 'bg-brand-50 text-brand-600 font-bold'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title={VIEW_TRANSLATIONS[language].list}
              aria-label={VIEW_TRANSLATIONS[language].list}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Show / Hide Boxes Button with Indicator */}
          <button
            type="button"
            onClick={onOpenVisibilitySettings}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-2xl border transition-all relative ${
              hasHiddenZmanim
                ? 'bg-amber-50/50 border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-300'
                : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50 hover:border-slate-200'
            }`}
            title={m.toggleBoxes}
          >
            {hasHiddenZmanim ? (
              <EyeOff className="w-3.5 h-3.5 text-amber-600" />
            ) : (
              <Eye className="w-3.5 h-3.5 text-brand-600" />
            )}
            <span className="hidden sm:inline">{m.toggleBoxes}</span>
            {hasHiddenZmanim && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
            )}
          </button>
        </div>

        {/* Right Side: PWA Install & Burger Menu */}
        <div className="flex items-center gap-2">
          <PWAInstallButton language={language} variant="header" />

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsBurgerOpen(!isBurgerOpen);
                setIsLangOpen(false);
              }}
              className="p-2 text-slate-700 bg-white border border-slate-100 rounded-2xl shadow-sm hover:bg-slate-50 hover:border-slate-200 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500"
              aria-label="Menu"
            >
              <Menu className="w-4 h-4 text-slate-700" />
            </button>

            {isBurgerOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setIsBurgerOpen(false)} />
                <div className={`absolute ${isRtl ? 'left-0' : 'right-0'} mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-40 divide-y divide-slate-50 animate-in fade-in slide-in-from-top-2 duration-150`}>
                  <div className="py-1">
                    <PWAInstallButton
                      language={language}
                      variant="menu"
                      onInstalled={() => setIsBurgerOpen(false)}
                    />

                    <button
                      onClick={() => {
                        onRestartTour();
                        setIsBurgerOpen(false);
                      }}
                      className={`flex items-center gap-2.5 w-full px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-950 font-bold transition-colors ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}
                    >
                      <Compass className="w-4 h-4 text-brand-600" />
                      <span>{m.tour}</span>
                    </button>

                  <button
                    onClick={() => {
                      onShowIntro();
                      setIsBurgerOpen(false);
                    }}
                    className={`flex items-center gap-2.5 w-full px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-950 font-bold transition-colors ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}
                  >
                    <Sparkles className="w-4 h-4 text-brand-600" />
                    <span>{m.introSlides}</span>
                  </button>


                </div>
                
                <div className="py-1">
                  <button
                    onClick={() => {
                      setIsAboutOpen(true);
                      setIsBurgerOpen(false);
                    }}
                    className={`flex items-center gap-2.5 w-full px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-950 font-bold transition-colors ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}
                  >
                    <HelpCircle className="w-4 h-4 text-brand-600" />
                    <span>{m.aboutTitle}</span>
                  </button>
                  
                  <button
                    onClick={handleShare}
                    className={`flex items-center gap-2.5 w-full px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-950 font-bold transition-colors ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}
                  >
                    <Share2 className="w-4 h-4 text-brand-600" />
                    <span>{shareStatus ? m.shareSuccess : m.shareApp}</span>
                  </button>
                </div>

                <div className="py-1">
                  <button
                    onClick={handleResetClick}
                    className={`flex items-center gap-2.5 w-full px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 hover:text-red-700 font-bold transition-colors ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}
                  >
                    <RotateCcw className="w-4 h-4 text-red-500" />
                    <span>{m.resetSettings}</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

    </div>

      {/* Brand Identity / Logo */}
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-brand-600 font-outfit tracking-tight leading-none">
            Zimna
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-2" dir="rtl">
            לע"נ ר' עזרא בן יחיא
          </p>
        </div>
      </div>

      {/* About Astronomical Info Modal */}
      {isAboutOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsAboutOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-brand-50 border border-brand-100 mb-4">
              <HelpCircle className="w-6 h-6 text-brand-600" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 text-center tracking-tight mb-3">
              {m.aboutTitle}
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed text-center mb-6">
              {m.aboutContent}
            </p>

            <button
              onClick={() => setIsAboutOpen(false)}
              className="w-full bg-brand-600 text-white font-extrabold py-3 px-4 rounded-xl hover:bg-brand-700 transition-all shadow-md shadow-brand-500/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
            >
              {m.close}
            </button>
          </div>
        </div>
      )}

      {/* Reset Alarms Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowResetConfirm(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-50 border border-red-100 mb-4">
              <RotateCcw className="w-6 h-6 text-red-600" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 text-center tracking-tight mb-3">
              {m.resetSettings}
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed text-center mb-6">
              {m.resetConfirm}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="w-full bg-slate-100 text-slate-700 font-bold py-3 px-4 rounded-xl hover:bg-slate-200 transition-all focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                {m.cancel}
              </button>
              <button
                onClick={handleConfirmReset}
                className="w-full bg-red-600 text-white font-extrabold py-3 px-4 rounded-xl hover:bg-red-700 transition-all shadow-md shadow-red-500/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                {m.confirm}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Alarms Success Modal */}
      {showResetSuccess && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowResetSuccess(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-emerald-50 border border-emerald-100 mb-4">
              <Check className="w-6 h-6 text-emerald-600" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 text-center tracking-tight mb-3">
              {m.resetSuccess}
            </h3>

            <button
              onClick={() => setShowResetSuccess(false)}
              className="w-full bg-brand-600 text-white font-extrabold py-3 px-4 rounded-xl hover:bg-brand-700 transition-all shadow-md shadow-brand-500/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
            >
              {m.close}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
