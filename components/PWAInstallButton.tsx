import React, { useState } from 'react';
import { usePWAInstall } from '../usePWAInstall';
import { Download, Share, X, PlusSquare } from 'lucide-react';
import { Language } from '../i18n';

interface PWAInstallButtonProps {
  language?: Language;
  variant?: 'header' | 'menu' | 'banner';
  className?: string;
  onInstalled?: () => void;
}

const INSTALL_LABELS: Record<Language, {
  install: string;
  iosGuideTitle: string;
  iosStep1: string;
  iosStep2: string;
  close: string;
}> = {
  en: {
    install: 'Install App',
    iosGuideTitle: 'Install on iPhone / iPad',
    iosStep1: 'Tap the Share icon in the Safari toolbar at the bottom of your screen.',
    iosStep2: 'Scroll down and select "Add to Home Screen".',
    close: 'Close',
  },
  he: {
    install: 'התקן אפליקציה',
    iosGuideTitle: 'התקנה ב-iPhone / iPad',
    iosStep1: 'לחץ על כפתור השיתוף בסרגל הכלים של Safari בתחתית המסך.',
    iosStep2: 'גלול מטה ובחר ״הוסף למסך הבית״.',
    close: 'סגור',
  },
  fr: {
    install: "Installer l'application",
    iosGuideTitle: 'Installer sur iPhone / iPad',
    iosStep1: "Appuyez sur le bouton Partager dans la barre d'outils Safari.",
    iosStep2: 'Faites défiler vers le bas et sélectionnez "Sur l\'écran d\'accueil".',
    close: 'Fermer',
  },
  es: {
    install: 'Instalar aplicación',
    iosGuideTitle: 'Instalar en iPhone / iPad',
    iosStep1: 'Toca el botón Compartir en la barra de herramientas de Safari.',
    iosStep2: 'Desplázate hacia abajo y selecciona "Agregar a pantalla de inicio".',
    close: 'Cerrar',
  },
  ru: {
    install: 'Установить приложение',
    iosGuideTitle: 'Установка на iPhone / iPad',
    iosStep1: 'Нажмите кнопку «Поделиться» на панели инструментов Safari.',
    iosStep2: 'Прокрутите вниз и выберите «На экран „Домой“».',
    close: 'Закрыть',
  },
};

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  language = 'en',
  variant = 'header',
  className = '',
  onInstalled,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide
  if (isInstalled) {
    return null;
  }

  const t = INSTALL_LABELS[language] || INSTALL_LABELS.en;
  const isRtl = language === 'he';

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success && onInstalled) {
        onInstalled();
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    }
  };

  // Chromium / Android / Desktop or iOS Safari
  if (!isInstallable && !isIOS) {
    return null;
  }

  return (
    <>
      {variant === 'header' && (
        <button
          id="pwa-install-header-btn"
          type="button"
          onClick={handleInstallClick}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-2xl bg-brand-600 text-white hover:bg-brand-700 shadow-sm transition-all ${className}`}
          title={t.install}
        >
          <Download className="w-3.5 h-3.5" />
          <span>{t.install}</span>
        </button>
      )}

      {variant === 'menu' && (
        <button
          id="pwa-install-menu-btn"
          type="button"
          onClick={handleInstallClick}
          className={`flex items-center gap-2.5 w-full px-4 py-2.5 text-xs text-brand-700 hover:bg-brand-50 hover:text-brand-800 font-bold transition-colors ${
            isRtl ? 'flex-row-reverse text-right' : 'text-left'
          } ${className}`}
        >
          <Download className="w-4 h-4 text-brand-600" />
          <span>{t.install}</span>
        </button>
      )}

      {variant === 'banner' && (
        <div
          id="pwa-install-banner"
          className="bg-brand-50 border border-brand-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-extrabold text-brand-900">{t.install}</h4>
              <p className="text-[11px] text-brand-700 mt-0.5">Quick access to daily halachic times on your home screen or desktop.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleInstallClick}
            className="self-start sm:self-center px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
          >
            {t.install}
          </button>
        </div>
      )}

      {/* iOS Safari Guided Instructions Modal */}
      {showIOSGuide && (
        <div
          id="pwa-ios-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
        >
          <div
            className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 relative"
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            <button
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 transition-colors"
              aria-label={t.close}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center mx-auto mb-4 text-brand-600">
              <Download className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-extrabold text-slate-900 text-center tracking-tight">
              {t.iosGuideTitle}
            </h3>

            <div className="mt-4 space-y-3 text-xs text-slate-600 font-medium">
              <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 font-bold text-[11px] flex items-center justify-center shrink-0">1</span>
                <div className="flex-1">
                  <p>{t.iosStep1}</p>
                  <div className="flex items-center gap-1.5 mt-1 text-brand-600 font-semibold">
                    <Share className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 font-bold text-[11px] flex items-center justify-center shrink-0">2</span>
                <div className="flex-1">
                  <p>{t.iosStep2}</p>
                  <div className="flex items-center gap-1.5 mt-1 text-slate-700 font-semibold">
                    <PlusSquare className="w-3.5 h-3.5" />
                    <span>Add to Home Screen</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full rounded-xl bg-brand-600 py-3 text-xs font-bold text-white hover:bg-brand-700 transition-all shadow-sm"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
