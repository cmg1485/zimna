import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  Bell, 
  VolumeX, 
  MapPin, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  Globe,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { Language } from '../i18n';

interface IntroSlidesProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

interface SlideData {
  id: number;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  highlights: Record<Language, string[]>;
}

const SLIDES: SlideData[] = [
  {
    id: 1,
    icon: Sparkles,
    iconColor: 'text-brand-600',
    iconBg: 'bg-brand-50',
    title: {
      en: "Welcome to Zimna",
      he: "ברוכים הבאים ל-Zimna",
      fr: "Bienvenue sur Zimna",
      es: "Bienvenido a Zimna",
      ru: "Добро пожаловать в Zimna"
    },
    description: {
      en: "Your ultimate companion for daily Jewish Halachic times (Zmanim) and intelligent sunrise & sunset alarm notifications.",
      he: "המלווה האישי והמעוצב שלכם למעקב מדויק אחר זמני היום בהלכה (זמנים) וניהול התראות חכמות מבוססות שמש.",
      fr: "Votre compagnon élégant pour les horaires halachiques juifs quotidiens (Zmanim) et les notifications d'alarme intelligentes.",
      es: "Su elegante compañero para los horarios halájicos diarios (Zmanim) y las notificaciones de alarma inteligentes.",
      ru: "Ваш элегантный помощник для ежедневного отслеживания еврейского галахического времени (зманим) и настройки умных будильников."
    },
    highlights: {
      en: ["Real-time Zmanim calculations", "Fully localized interface", "Clean, clutter-free aesthetics"],
      he: ["חישובי זמנים בזמן אמת", "ממשק מתורגם במלואו", "עיצוב נקי ויוקרתי ללא עומס"],
      fr: ["Calculs des Zmanim en temps réel", "Interface entièrement traduite", "Esthétique épurée et moderne"],
      es: ["Cálculos de Zmanim en tiempo real", "Interfaz completamente traducida", "Estética limpia y moderna"],
      ru: ["Расчет зманим в реальном времени", "Полностью локализованный интерфейс", "Чистый и современный дизайн"]
    }
  },
  {
    id: 2,
    icon: Bell,
    iconColor: 'text-rose-600',
    iconBg: 'bg-rose-50',
    title: {
      en: "Halachic Zmanim Alarms",
      he: "התראות זמני הלכה חכמות",
      fr: "Alarmes des Zmanim",
      es: "Alarmas de Zmanim",
      ru: "Галахические будильники"
    },
    description: {
      en: "Configure dedicated audio alarms for critical times: Dawn (Alos), Sunrise (Hanetz), Shema, Tefillah, Sunset (Shkia), and Nightfall (Tzeis). Never miss a halachic deadline again.",
      he: "הגדירו התראות קוליות ייעודיות לזמנים קריטיים: עלות השחר, הנץ החמה, סוף זמן קריאת שמע ותפילה, שקיעה וצאת הכוכבים.",
      fr: "Configurez des alarmes audio individuelles pour l'aube (Alos), le lever du soleil (Hanetz), le Shema, la Tefillah, le coucher du soleil (Shkia) et la tombée de la nuit (Tzeis).",
      es: "Configure alarmas de audio individuales para el amanecer (Alos), la salida del sol (Hanetz), el Shema, la Tefilá, el atardecer (Shkia) y el anochecer (Tzeis).",
      ru: "Настраивайте индивидуальные звуковые сигналы на рассвет (Алот), восход (Ханец), Шма, Тфилу, закат (Шкия) и выход звезд (Цейт)."
    },
    highlights: {
      en: ["Custom sound alerts", "Easy one-tap triggers", "Snooze & persistent ringing"],
      he: ["התראות שמע מותאמות", "הפעלה קלה בנגיעה אחת", "אפשרות נודניק וצלצול עקבי"],
      fr: ["Alertes sonores personnalisées", "Activation en un clic", "Rappels et sonneries persistantes"],
      es: ["Alertas de sonido personalizadas", "Activación fácil en un toque", "Repetición y timbres persistentes"],
      ru: ["Индивидуальные звуковые сигналы", "Включение в одно касание", "Повтор сигнала и надежный звонок"]
    }
  },
  {
    id: 3,
    icon: VolumeX,
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-50',
    title: {
      en: "Shabbat Safety Override",
      he: "שומר שבת אוטומטי",
      fr: "Sécurité Shabbat",
      es: "Seguridad de Shabat",
      ru: "Режим Шаббата"
    },
    description: {
      en: "Rest easy on holy days. The app automatically overrides, mutes, and disables all active alarms from Friday afternoon (18 minutes before sunset) until Saturday nightfall (Tzeis) to safeguard Shabbat sanctity.",
      he: "שמירת השבת בראש שקט לגמרי. האפליקציה משתיקה, מנטרלת ומבטלת אוטומטית את כל ההתראות הפעילות החל מ-18 דקות לפני שקיעת החמה ביום שישי ועד צאת השבת במוצאי שבת.",
      fr: "Profitez d'un Shabbat paisible et saint. L'application coupe et remplace automatiquement toutes les alarmes de 18 minutes avant le coucher du soleil le vendredi jusqu'à la tombée de la nuit le samedi.",
      es: "Disfrute de un Shabat pacífico y sagrado. La aplicación silencia y anula automáticamente todas las alarmas desde 18 minutos antes del atardecer del viernes hasta el anochecer del sábado.",
      ru: "Проведите Шаббат в покое и святости. Приложение автоматически отключает и блокирует все будильники, начиная за 18 минут до заката в пятницу и до исхода субботы."
    },
    highlights: {
      en: ["Auto-mute on Friday sunset", "Auto-resume after Shabbat", "Visual countdown banners"],
      he: ["השתקה אוטומטית בכניסת השבת", "חזרה אוטומטית לפעילות במוצאי שבת", "באנר סטטוס חזותי להמחשה"],
      fr: ["Sourdine auto à l'entrée du Shabbat", "Reprise auto après le Shabbat", "Bannière visuelle explicative"],
      es: ["Silencio auto al entrar el Shabat", "Reanudación auto tras el Shabat", "Banner visual explicativo"],
      ru: ["Автоотключение перед закатом", "Автовосстановление после Шаббата", "Визуальные баннеры статуса"]
    }
  },
  {
    id: 4,
    icon: MapPin,
    iconColor: 'text-indigo-600',
    iconBg: 'bg-indigo-50',
    title: {
      en: "Smart Location Options",
      he: "אפשרויות מיקום חכמות",
      fr: "Options de Localisation",
      es: "Opciones de Ubicación",
      ru: "Умная геолокация"
    },
    description: {
      en: "Times are custom-tailored to your location. Instantly fetch your current coordinates via GPS, search through cities globally with autocomplete, or enter custom coordinates.",
      he: "כל הזמנים מחושבים בדיוק מירבי למיקומכם הנוכחי. זהו את המיקום בעזרת ה-GPS, חפשו ערים בכל העולם או הזינו קואורדינטות ידניות.",
      fr: "Les horaires sont calculés précisément selon votre position. Utilisez le GPS, recherchez n'importe quelle ville avec l'aide à la saisie, ou entrez des coordonnées manuelles.",
      es: "Los horarios se calculan con precisión para su ubicación. Use el GPS del navegador, busque cualquier ciudad en el mundo, o ingrese coordenadas manualmente.",
      ru: "Время рассчитывается индивидуально для вашей геопозиции. Используйте GPS браузера, автозаполнение для городов по всему миру или вводите координаты вручную."
    },
    highlights: {
      en: ["Automatic GPS detection", "Global autocomplete search", "Custom coordinate inputs"],
      he: ["זיהוי GPS אוטומטי", "חיפוש השלמה אוטומטית עולמי", "הזנת קואורדינטות מותאמת"],
      fr: ["Détection GPS automatique", "Recherche globale de villes", "Saisie manuelle des coordonnées"],
      es: ["Detección GPS automática", "Búsqueda global de ciudades", "Entrada manual de coordenadas"],
      ru: ["Автоматическое определение GPS", "Глобальный поиск городов", "Ручной ввод координат"]
    }
  },
  {
    id: 5,
    icon: Clock,
    iconColor: 'text-teal-600',
    iconBg: 'bg-teal-50',
    title: {
      en: "Advance Alerts & Snooze",
      he: "התראות מוקדמות ונודניק",
      fr: "Alertes en avance & Snooze",
      es: "Alertas tempranas y repetición",
      ru: "Предупреждения и повтор"
    },
    description: {
      en: "Don't wait until the last minute. Set alarms to notify you minutes in advance (e.g. 15 minutes before Shema time to prepare) and configure gentle, custom snooze times.",
      he: "אל תחכו לרגע האחרון! הגדירו התראה מוקדמת מותאמת אישית (לדוגמה: קבלו התראה 15 דקות לפני סוף זמן קריאת שמע כדי להספיק להתארגן) לצד אפשרות נודניק.",
      fr: "N'attendez pas l'événement! Configurez des alertes en avance (ex. 15 minutes avant la fin du Shema) et profitez de l'option de rappel (Snooze).",
      es: "¡No espere al último minuto! Configure advertencias previas (por ejemplo, 15 minutos antes de que termine el Shema) junto con opciones de repetición.",
      ru: "Не ждите наступления события! Настройте заблаговременное предупреждение (например, за 15 минут до окончания времени Шма) и параметры повтора."
    },
    highlights: {
      en: ["Adjustable notification offsets", "Multi-stage snooze options", "Loud, clear persistent ringing"],
      he: ["טווח דקות התראה גמיש", "אפשרויות נודניק רב-שלביות", "צלצול ברור ועקבי למניעת פספוס"],
      fr: ["Décalages d'alertes réglables", "Options de rappel multi-étapes", "Sonnerie claire et persistante"],
      es: ["Intervalos de alerta ajustables", "Opciones de repetición múltiple", "Alarma sonora clara y persistente"],
      ru: ["Настройка времени предупреждения", "Многоэтапный повтор сигнала", "Громкий и надежный звуковой сигнал"]
    }
  }
];

const BUTTON_LABELS = {
  skip: { en: "Skip", he: "דלג", fr: "Passer", es: "Omitir", ru: "Пропустить" },
  next: { en: "Next", he: "הבא", fr: "Suivant", es: "Siguiente", ru: "Далее" },
  prev: { en: "Prev", he: "הקודם", fr: "Précédent", es: "Anterior", ru: "Назад" },
  start: { en: "Get Started", he: "בואו נתחיל!", fr: "Commencer", es: "Comenzar", ru: "Начать" }
};

export const IntroSlides: React.FC<IntroSlidesProps> = ({ isOpen, onClose, language }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev
  
  if (!isOpen) return null;

  const isRtl = language === 'he';
  const currentSlide = SLIDES[currentIdx];
  const IconComponent = currentSlide.icon;

  const handleNext = () => {
    if (currentIdx < SLIDES.length - 1) {
      setDirection(isRtl ? -1 : 1);
      setCurrentIdx(currentIdx + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setDirection(isRtl ? 1 : -1);
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleFinish = () => {
    try {
      localStorage.setItem('astroIntroSlidesSeen', 'true');
    } catch (e) {
      console.error(e);
    }
    onClose();
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0
    })
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred overlay */}
      <div 
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-md transition-opacity duration-300"
        onClick={handleFinish}
      />

      {/* Main Container */}
      <div 
        className="relative bg-white border border-slate-100/80 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        dir={isRtl ? 'rtl' : 'ltr'}
        id="intro-slides-modal"
      >
        {/* Close Button */}
        <button
          onClick={handleFinish}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all focus:outline-none"
          aria-label="Close presentation"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Area */}
        <div className="flex-grow p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIdx}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="flex flex-col items-center text-center mt-6 flex-grow"
            >
              {/* Illustrated Icon */}
              <div className={`p-5 rounded-3xl ${currentSlide.iconBg} ${currentSlide.iconColor} mb-6 shadow-xs`}>
                <IconComponent className="w-10 h-10 stroke-[2.25]" />
              </div>

              {/* Slide Title */}
              <h2 className="text-2xl font-black text-slate-800 font-outfit mb-3 tracking-tight">
                {currentSlide.title[language] || currentSlide.title['en']}
              </h2>

              {/* Slide Description */}
              <p className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed mb-6 max-w-sm">
                {currentSlide.description[language] || currentSlide.description['en']}
              </p>

              {/* Highlights List */}
              <div className="w-full max-w-xs space-y-2 text-right">
                {(currentSlide.highlights[language] || currentSlide.highlights['en']).map((highlight, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-center gap-2.5 px-3 py-2 bg-slate-50 border border-slate-100/50 rounded-xl text-xs sm:text-sm font-bold text-slate-600 ${
                      isRtl ? 'flex-row-reverse text-right' : 'text-left'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                    <span className="flex-grow">{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Footer Controls */}
          <div className="mt-8 border-t border-slate-50 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Progress indicator (dots) */}
            <div className="flex gap-1.5 order-2 sm:order-1" dir="ltr">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIdx ? 1 : -1);
                    setCurrentIdx(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIdx ? 'w-5 bg-brand-600' : 'w-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div className={`flex gap-2 w-full sm:w-auto order-1 sm:order-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
              {/* Back / Skip */}
              {currentIdx > 0 ? (
                <button
                  onClick={handlePrev}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-700 bg-white border border-slate-150 rounded-xl hover:bg-slate-50 hover:border-slate-250 transition-all focus:outline-none"
                >
                  {isRtl ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
                  <span>{BUTTON_LABELS.prev[language] || BUTTON_LABELS.prev['en']}</span>
                </button>
              ) : (
                <button
                  onClick={handleFinish}
                  className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-bold text-slate-400 hover:text-slate-600 bg-white border border-transparent rounded-xl hover:bg-slate-50 transition-all focus:outline-none"
                >
                  {BUTTON_LABELS.skip[language] || BUTTON_LABELS.skip['en']}
                </button>
              )}

              {/* Next / Finish */}
              <button
                onClick={handleNext}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-black text-white bg-brand-600 hover:bg-brand-500 rounded-xl transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <span>
                  {currentIdx === SLIDES.length - 1 
                    ? (BUTTON_LABELS.start[language] || BUTTON_LABELS.start['en'])
                    : (BUTTON_LABELS.next[language] || BUTTON_LABELS.next['en'])
                  }
                </span>
                {currentIdx < SLIDES.length - 1 && (
                  isRtl ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
