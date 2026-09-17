
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  AstronomicalEventName,
  AlarmSettings,
  RingingAlarm,
  SnoozedAlarm,
  SunCalcResult,
  ALARM_EVENT_NAMES,
  DEFAULT_ALARM_SETTINGS
} from './types';
import Header from './components/Header';
import TimeCard from './components/TimeCard';
import { TimeTable } from './components/TimeTable';
import AlarmModal from './components/AlarmModal';
import Walkthrough from './components/Walkthrough';
import { IntroSlides } from './components/IntroSlides';
import { VisibilitySettingsModal } from './components/VisibilitySettingsModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { BellIcon } from './components/icons/BellIcon';
import { Info, X, Search, MapPin, Calendar } from 'lucide-react';
import { calculateZmanim } from './zmanim';
import { Language, UI_TRANSLATIONS } from './i18n';

// Public domain alarm sound
const ALARM_SOUND_URL = 'https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg';

const HEBREW_DAYS = ['יום ראשון', 'יום שני', 'יום שלישי', 'יום רביעי', 'יום חמישי', 'ערב שבת קודש', 'שבת קודש'];

function getParshaForDate(date: Date): { en: string; he: string } {
  const upcomingSat = new Date(date);
  upcomingSat.setDate(date.getDate() + (6 - date.getDay()));
  upcomingSat.setHours(0, 0, 0, 0);

  const time = upcomingSat.getTime();
  
  const parshas2026: { date: string; en: string; he: string }[] = [
    { date: '2026-01-03', en: 'Parshas Vayechi', he: 'פרשת ויחי' },
    { date: '2026-01-10', en: 'Parshas Shemot', he: 'פרשת שמות' },
    { date: '2026-01-17', en: 'Parshas Vaera', he: 'פרשת וארא' },
    { date: '2026-01-24', en: 'Parshas Bo', he: 'פרשת בא' },
    { date: '2026-01-31', en: 'Parshas Beshalach', he: 'פרשת בשלח' },
    { date: '2026-02-07', en: 'Parshas Yitro', he: 'פרשת יתרו' },
    { date: '2026-02-14', en: 'Parshas Mishpatim', he: 'פרשת משפטים' },
    { date: '2026-02-21', en: 'Parshas Terumah', he: 'פרשת תרומה' },
    { date: '2026-02-28', en: 'Parshas Tetzaveh', he: 'פרשת תצוה' },
    { date: '2026-03-07', en: 'Parshas Ki Tisa', he: 'פרשת כי תשא' },
    { date: '2026-03-14', en: 'Parshas Vayakhel-Pekudei', he: 'פרשת ויקהל-פקודי' },
    { date: '2026-03-21', en: 'Parshas Vayikra', he: 'פרשת ויקרא' },
    { date: '2026-03-28', en: 'Parshas Tzav', he: 'פרשת צו' },
    { date: '2026-04-11', en: 'Parshas Shemini', he: 'פרשת שמיני' },
    { date: '2026-04-18', en: 'Parshas Tazria-Metzora', he: 'פרשת תזריע-מצורע' },
    { date: '2026-04-25', en: 'Parshas Acharei Mot-Kedoshim', he: 'פרשת אחרי מות-קדושים' },
    { date: '2026-05-02', en: 'Parshas Emor', he: 'פרשת אמור' },
    { date: '2026-05-09', en: 'Parshas Behar-Bechukotai', he: 'פרשת בהר-בחוקתי' },
    { date: '2026-05-16', en: 'Parshas Bamidbar', he: 'פרשת במדבר' },
    { date: '2026-05-23', en: 'Parshas Nasso', he: 'פרשת נשא' },
    { date: '2026-05-30', en: 'Parshas Beha\'alotcha', he: 'פרשת בהעלותך' },
    { date: '2026-06-06', en: 'Parshas Sh\'lach', he: 'פרשת שלח' },
    { date: '2026-06-13', en: 'Parshas Korach', he: 'פרשת קרח' },
    { date: '2026-06-20', en: 'Parshas Chukat', he: 'פרשת חקת' },
    { date: '2026-06-27', en: 'Parshas Balak', he: 'פרשת בלק' },
    { date: '2026-07-04', en: 'Parshas Pinchas', he: 'פרשת פינחס' },
    { date: '2026-07-11', en: 'Parshas Matot-Masei', he: 'פרשת מטות-מסעי' },
    { date: '2026-07-18', en: 'Parshas Devarim (Chazon)', he: 'פרשת דברים' },
    { date: '2026-07-25', en: 'Parshas Vaetchanan (Nachamu)', he: 'פרשת ואתחנן' },
    { date: '2026-08-01', en: 'Parshas Eikev', he: 'פרשת עקב' },
    { date: '2026-08-08', en: 'Parshas Re\'eh', he: 'פרשת ראה' },
    { date: '2026-08-15', en: 'Parshas Shoftim', he: 'פרשת שופטים' },
    { date: '2026-08-22', en: 'Parshas Ki Teitzei', he: 'פרשת כי תצא' },
    { date: '2026-08-29', en: 'Parshas Ki Tavo', he: 'פרשת כי תבוא' },
    { date: '2026-09-05', en: 'Parshas Nitzavim-Vayeilech', he: 'פרשת נצבים-וילך' },
    { date: '2026-09-12', en: 'Rosh Hashanah', he: 'ראש השנה' },
    { date: '2026-09-19', en: 'Parshas Ha\'Azinu', he: 'פרשת האזינו' },
    { date: '2026-09-26', en: 'Yom Kippur', he: 'יום כיפור' },
    { date: '2026-10-10', en: 'Parshas Bereishit', he: 'פרשת בראשית' },
    { date: '2026-10-17', en: 'Parshas Noach', he: 'פרשת נח' },
    { date: '2026-10-24', en: 'Parshas Lech-Lecha', he: 'פרשת לך-לך' },
    { date: '2026-10-31', en: 'Parshas Vayeira', he: 'פרשת וירא' },
    { date: '2026-11-07', en: 'Parshas Chayei Sarah', he: 'פרשת חיי שרה' },
    { date: '2026-11-14', en: 'Parshas Toledot', he: 'פרשת תולדות' },
    { date: '2026-11-21', en: 'Parshas Vayetzei', he: 'פרשת ויצא' },
    { date: '2026-11-28', en: 'Parshas Vayishlach', he: 'פרשת וישלח' },
    { date: '2026-12-05', en: 'Parshas Vayeshev', he: 'פרשת וישב' },
    { date: '2026-12-12', en: 'Parshas Miketz', he: 'פרשת מקץ' },
    { date: '2026-12-19', en: 'Parshas Vayigash', he: 'פרשת ויגש' },
    { date: '2026-12-26', en: 'Parshas Vayechi', he: 'פרשת ויחי' },
  ];

  const match = parshas2026.find(p => {
    const pDate = new Date(p.date);
    pDate.setHours(0, 0, 0, 0);
    return Math.abs(pDate.getTime() - time) < 24 * 60 * 60 * 1000 * 3;
  });

  if (match) {
    return { en: match.en, he: match.he };
  }
  return { en: 'Weekly Torah Portion', he: 'פרשת השבוע' };
}

function toHebrewGematria(num: number): string {
  const hundreds = ['', 'ק', 'ר', 'ש', 'ת', 'תק', 'תר', 'תש', 'תת', 'תתק'];
  const tens = ['', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ'];
  const ones = ['', 'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט'];

  let n = num % 1000;
  if (n === 0) return '';

  const lastTwo = n % 100;
  if (lastTwo === 15) {
    const h = Math.floor(n / 100);
    return (hundreds[h] || '') + 'טו';
  }
  if (lastTwo === 16) {
    const h = Math.floor(n / 100);
    return (hundreds[h] || '') + 'טז';
  }

  const h = Math.floor(n / 100);
  const t = Math.floor((n % 100) / 10);
  const o = n % 10;

  return hundreds[h] + tens[t] + ones[o];
}

function formatGematria(g: string): string {
  if (g.length === 0) return '';
  if (g.length === 1) return g + "'";
  return g.slice(0, -1) + '"' + g.slice(-1);
}

const ENGLISH_TO_HEBREW_MONTHS: Record<string, string> = {
  'tishri': 'תשרי',
  'tishrei': 'תשרי',
  'heshvan': 'חשון',
  'cheshvan': 'חשון',
  'kislev': 'כסלו',
  'tevet': 'טבת',
  'shevat': 'שבט',
  'adar i': 'אדר א׳',
  'adar ii': 'אדר ב׳',
  'adar': 'אדר',
  'nisan': 'ניסן',
  'iyar': 'אייר',
  'sivan': 'סיון',
  'tamuz': 'תמוז',
  'tammuz': 'תמוז',
  'av': 'אב',
  'elul': 'אלול'
};

function getHebrewMonthName(date: Date): string {
  try {
    const parts = new Intl.DateTimeFormat('he-IL-u-ca-hebrew', {
      month: 'long'
    }).formatToParts(date);
    
    let monthStr = '';
    for (const part of parts) {
      if (part.type === 'month') {
        monthStr = part.value;
        break;
      }
    }
    
    if (!monthStr) {
      monthStr = new Intl.DateTimeFormat('he-IL-u-ca-hebrew', { month: 'long' }).format(date);
    }
    
    const lowerMonth = monthStr.toLowerCase().trim();
    if (ENGLISH_TO_HEBREW_MONTHS[lowerMonth]) {
      return ENGLISH_TO_HEBREW_MONTHS[lowerMonth];
    }
    
    let cleanMonth = monthStr.trim();
    cleanMonth = cleanMonth.replace(/[\u05F3\u05F4'"]/g, "׳");

    const HEBREW_MONTHS = [
      "תשרי", "חשון", "מרחשון", "כסלו", "טבת", "שבט",
      "אדר א", "אדר ב", "אדר", "ניסן", "אייר", "סיון", "סיוון", "תמוז", "אב", "אלול",
      "אדר א׳", "אדר ב׳"
    ];

    if (cleanMonth.startsWith('ב')) {
      const possibleMonth = cleanMonth.slice(1);
      if (HEBREW_MONTHS.some(m => possibleMonth.includes(m) || m.includes(possibleMonth))) {
        cleanMonth = possibleMonth;
      }
    }
    
    return cleanMonth;
  } catch (e) {
    return 'תמוז';
  }
}

function getHebrewDateNumericParts(date: Date): { day: number; year: number } {
  try {
    const parts = new Intl.DateTimeFormat('en-US-u-ca-hebrew', {
      day: 'numeric',
      year: 'numeric'
    }).formatToParts(date);
    
    let day = 1;
    let year = 5786;
    for (const part of parts) {
      if (part.type === 'day') {
        day = parseInt(part.value, 10);
      } else if (part.type === 'year') {
        year = parseInt(part.value.replace(/\D/g, ''), 10);
      }
    }
    return { day, year };
  } catch (e) {
    return { day: 1, year: 5786 };
  }
}

function getHebrewDateString(date: Date): string {
  try {
    const { day, year } = getHebrewDateNumericParts(date);
    const monthName = getHebrewMonthName(date);
    
    const dayGematria = formatGematria(toHebrewGematria(day));
    const yearGematria = formatGematria(toHebrewGematria(year));
    
    return `${dayGematria} ${monthName} ${yearGematria}`;
  } catch (e) {
    return '';
  }
}

function getHebrewDayOfWeek(date: Date): string {
  return HEBREW_DAYS[date.getDay()];
}

function isDuringShabbat(time: Date, sunCalcTimes: SunCalcResult | null): boolean {
  if (!sunCalcTimes) return false;
  const day = time.getDay();
  if (day === 5) { // Friday
    if (sunCalcTimes.shkia instanceof Date && !isNaN(sunCalcTimes.shkia.getTime())) {
      // Shabbat begins 18 minutes before Sunset (Shkia)
      const candleLightingTime = new Date(sunCalcTimes.shkia.getTime() - 18 * 60 * 1000);
      return time >= candleLightingTime;
    }
  } else if (day === 6) { // Saturday
    if (sunCalcTimes.tzeisHakochavim instanceof Date && !isNaN(sunCalcTimes.tzeisHakochavim.getTime())) {
      // Shabbat ends at Nightfall (Tzeis Hakochavim)
      return time < sunCalcTimes.tzeisHakochavim;
    }
  }
  return false;
}

const PRESET_CITIES = [
  { name: 'Jerusalem', nameHe: 'ירושלים', nameFr: 'Jérusalem', nameEs: 'Jerusalén', nameRu: 'Иерусалим', lat: 31.7683, lon: 35.2137 },
  { name: 'New York', nameHe: 'ניו יורק', nameFr: 'New York', nameEs: 'Nueva York', nameRu: 'Нью-Йорк', lat: 40.7128, lon: -74.0060 },
  { name: 'Lakewood', nameHe: 'לייקווד', nameFr: 'Lakewood', nameEs: 'Lakewood', nameRu: 'Лейквуд', lat: 40.0941, lon: -74.2185 },
  { name: 'London', nameHe: 'לונדון', nameFr: 'Londres', nameEs: 'Londres', nameRu: 'Лондон', lat: 51.5074, lon: -0.1278 },
  { name: 'Paris', nameHe: 'פריז', nameFr: 'Paris', nameEs: 'París', nameRu: 'Париж', lat: 48.8566, lon: 2.3522 },
  { name: 'Los Angeles', nameHe: 'לוס אנג\'לס', nameFr: 'Los Angeles', nameEs: 'Los Ángeles', nameRu: 'Лос-Анджелес', lat: 34.0522, lon: -118.2437 },
  { name: 'Miami', nameHe: 'מיאמי', nameFr: 'Miami', nameEs: 'Miami', nameRu: 'Майами', lat: 25.7617, lon: -80.1918 },
];

const LOCATION_SELECTOR_TRANSLATIONS: Record<Language, {
  changeLocation: string;
  presetCities: string;
  customCoordinates: string;
  useCurrentGps: string;
  latitude: string;
  longitude: string;
  save: string;
  gpsFailed: string;
  gpsSuccess: string;
  gpsWarningNotice: string;
  typeLocation: string;
  searchPlaceholder: string;
  searching: string;
  noResults: string;
}> = {
  en: {
    changeLocation: "Change Location",
    presetCities: "Preset Cities",
    customCoordinates: "Custom Coordinates",
    useCurrentGps: "Use Current GPS Location",
    latitude: "Latitude",
    longitude: "Longitude",
    save: "Save Coordinates",
    gpsFailed: "Could not retrieve GPS coordinates. Please select a city or enter coordinates manually.",
    gpsSuccess: "GPS coordinates updated successfully!",
    gpsWarningNotice: "GPS unavailable. Displaying times for Jerusalem. Click below to customize.",
    typeLocation: "Type Location (Predictive)",
    searchPlaceholder: "Search city (e.g. Jerusalem, New York)...",
    searching: "Searching...",
    noResults: "No locations found",
  },
  he: {
    changeLocation: "שנה מיקום",
    presetCities: "ערים נבחרות",
    customCoordinates: "קואורדינטות מותאמות",
    useCurrentGps: "השתמש ב-GPS נוכחי",
    latitude: "קו רוחב",
    longitude: "קו אורך",
    save: "שמור קואורדינטות",
    gpsFailed: "לא ניתן היה לקבל מיקום GPS. אנא בחר עיר או הזן קואורדינטות ידנית.",
    gpsSuccess: "קואורדינטות ה-GPS עודכנו בהצלחה!",
    gpsWarningNotice: "ה-GPS אינו זמין. מציג זמנים עבור ירושלים. לחץ למטה להתאמה.",
    typeLocation: "הקלד מיקום (חיפוש חכם)",
    searchPlaceholder: "חפש עיר (למשל ירושלים, ניו יורק)...",
    searching: "מחפש...",
    noResults: "לא נמצאו מיקומים",
  },
  fr: {
    changeLocation: "Changer d'emplacement",
    presetCities: "Villes Prédéfinies",
    customCoordinates: "Coordonnées Personnalisées",
    useCurrentGps: "Utiliser la Position GPS",
    latitude: "Latitude",
    longitude: "Longitude",
    save: "Enregistrer",
    gpsFailed: "Impossible de récupérer les coordonnées GPS. Veuillez sélectionner une ville ou entrer des coordonnées.",
    gpsSuccess: "Coordonnées GPS mises à jour !",
    gpsWarningNotice: "GPS indisponible. Affichage de Jérusalem. Cliquez ci-dessous pour personnaliser.",
    typeLocation: "Saisir l'emplacement (Predictif)",
    searchPlaceholder: "Rechercher une ville (ex. Paris, Jérusalem)...",
    searching: "Recherche...",
    noResults: "Aucun emplacement trouvé",
  },
  es: {
    changeLocation: "Cambiar Ubicación",
    presetCities: "Ciudades Ajustadas",
    customCoordinates: "Coordenadas Personalizadas",
    useCurrentGps: "Usar Ubicación GPS Actual",
    latitude: "Latitud",
    longitude: "Longitud",
    save: "Guardar Coordenadas",
    gpsFailed: "No se pudo obtener la ubicación GPS. Seleccione una ciudad o ingrese las coordenadas.",
    gpsSuccess: "Coordenadas GPS actualizadas con éxito!",
    gpsWarningNotice: "GPS no disponible. Mostrando Jerusalén. Haga clic abajo para personalizar.",
    typeLocation: "Escribir ubicación (Predictivo)",
    searchPlaceholder: "Buscar ciudad (ej. Madrid, Jerusalén)...",
    searching: "Buscando...",
    noResults: "No se encontraron ubicaciones",
  },
  ru: {
    changeLocation: "Изменить местоположение",
    presetCities: "Популярные города",
    customCoordinates: "Свои координаты",
    useCurrentGps: "Использовать GPS",
    latitude: "Широта",
    longitude: "Долгота",
    save: "Сохранить",
    gpsFailed: "Не удалось получить GPS. Выберите город или введите координаты вручную.",
    gpsSuccess: "Координаты GPS успешно обновлены!",
    gpsWarningNotice: "GPS недоступен. Показано время для Иерусалима. Нажмите ниже для настройки.",
    typeLocation: "Введите местоположение (Автозаполнение)",
    searchPlaceholder: "Поиск города (например, Москва, Иерусалим)...",
    searching: "Поиск...",
    noResults: "Местоположения не найдены",
  },
};

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('zmanimLanguage');
      if (saved && ['en', 'he', 'fr', 'es', 'ru'].includes(saved)) {
        return saved as Language;
      }
    } catch (e) {
      console.error(e);
    }
    return 'en';
  });

  useEffect(() => {
    try {
      localStorage.setItem('zmanimLanguage', language);
    } catch (e) {
      console.error(e);
    }
  }, [language]);

  const [location, setLocation] = useState<{ lat: number; lon: number }>(() => {
    try {
      const saved = localStorage.getItem('astroSavedLocation');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load location from localStorage", e);
    }
    // Default fallback is Jerusalem so the app works instantly
    return { lat: 31.7683, lon: 35.2137 };
  });
  const [locationError, setLocationError] = useState<string | null>(null);
  const [times, setTimes] = useState<SunCalcResult | null>(null);
  const [cityName, setCityName] = useState<string | null>(null);
  const [isGeocoding, setIsGeocoding] = useState<boolean>(false);
  const [isGpsLoading, setIsGpsLoading] = useState<boolean>(false);
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<{ id: any; label: string; lat: number; lon: number }[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Clear suggestions and query when picker closes
  useEffect(() => {
    if (!isPickerOpen) {
      setSearchQuery('');
      setSuggestions([]);
    }
  }, [isPickerOpen]);

  // Predictive search autocomplete using Nominatim
  useEffect(() => {
    if (searchQuery.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      setIsSearching(true);
      const acceptLang = language === 'he' ? 'he-IL,he' : 'en-US,en';
      
      fetch(`https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=6&q=${encodeURIComponent(searchQuery)}`, {
        headers: {
          'Accept-Language': acceptLang
        }
      })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            const mapped = data.map((item: any) => {
              const city = item.address.city || item.address.town || item.address.village || item.address.suburb || item.name || '';
              const state = item.address.state || '';
              const country = item.address.country || '';
              
              let label = item.display_name;
              if (city) {
                const parts = [city];
                if (state && state !== city) parts.push(state);
                if (country && country !== state) parts.push(country);
                label = parts.join(', ');
              }
              
              return {
                id: item.place_id,
                label: label,
                lat: parseFloat(item.lat),
                lon: parseFloat(item.lon)
              };
            });
            setSuggestions(mapped);
          } else {
            setSuggestions([]);
          }
        })
        .catch(err => {
          console.error("Autocomplete search failed:", err);
          setSuggestions([]);
        })
        .finally(() => {
          setIsSearching(false);
        });
    }, 450);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, language]);

  useEffect(() => {
    if (location) {
      setIsGeocoding(true);
      const acceptLang = language === 'he' ? 'he-IL,he' : 'en-US,en';
      fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.lat}&lon=${location.lon}&accept-language=${encodeURIComponent(acceptLang)}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.address) {
            const city = data.address.city || data.address.town || data.address.village || data.address.suburb || '';
            const state = data.address.state || data.address.country || '';
            if (city && state) {
              setCityName(`${city}, ${state}`);
            } else if (city || state) {
              setCityName(city || state);
            } else {
              setCityName(language === 'he' ? 'אזור מקומי' : 'Local Region');
            }
          } else {
            setCityName(language === 'he' ? 'אזור מקומי' : 'Local Region');
          }
        })
        .catch(err => {
          console.error("Reverse geocoding failed:", err);
          setCityName(language === 'he' ? 'אזור מקומי' : 'Local Region');
        })
        .finally(() => {
          setIsGeocoding(false);
        });
    }
  }, [location, language]);
  const [alarmSettings, setAlarmSettings] = useState<AlarmSettings>(() => {
    try {
      const savedSettings = localStorage.getItem('astroAlarmSettings');
      if (savedSettings) {
        // Merge saved settings with defaults to ensure all keys exist
        const parsed = JSON.parse(savedSettings);
        return { ...DEFAULT_ALARM_SETTINGS, ...parsed };
      }
    } catch (error) {
      console.error("Failed to parse settings from localStorage", error);
    }
    return DEFAULT_ALARM_SETTINGS;
  });

  const [viewMode, setViewMode] = useState<'grid' | 'table'>(() => {
    try {
      const saved = localStorage.getItem('astroViewMode');
      if (saved === 'grid' || saved === 'table') {
        return saved;
      }
    } catch (e) {
      console.error(e);
    }
    return 'table';
  });

  useEffect(() => {
    try {
      localStorage.setItem('astroViewMode', viewMode);
    } catch (e) {
      console.error(e);
    }
  }, [viewMode]);
  
  const [ringingAlarm, setRingingAlarm] = useState<RingingAlarm | null>(null);
  const [snoozedAlarm, setSnoozedAlarm] = useState<SnoozedAlarm | null>(null);
  const [firedAlarms, setFiredAlarms] = useState<Set<AstronomicalEventName>>(new Set());

  const [showIntro, setShowIntro] = useState<boolean>(false);
  const [showWalkthrough, setShowWalkthrough] = useState<boolean>(false);
  const [walkthroughStep, setWalkthroughStep] = useState<number>(0);

  const [visibleZmanim, setVisibleZmanim] = useState<Record<AstronomicalEventName, boolean>>(() => {
    try {
      const saved = localStorage.getItem('zimnaVisibleBoxes');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to parse visible boxes from localStorage", e);
    }
    const defaults: Record<AstronomicalEventName, boolean> = {} as any;
    ALARM_EVENT_NAMES.forEach(name => {
      defaults[name] = true;
    });
    return defaults;
  });

  const [isVisibilityModalOpen, setIsVisibilityModalOpen] = useState(false);

  const hasHiddenZmanim = useMemo(() => {
    return ALARM_EVENT_NAMES.some(name => visibleZmanim[name] === false);
  }, [visibleZmanim]);

  useEffect(() => {
    try {
      localStorage.setItem('zimnaVisibleBoxes', JSON.stringify(visibleZmanim));
    } catch (e) {
      console.error(e);
    }
  }, [visibleZmanim]);

  const handleToggleZmanVisibility = useCallback((name: AstronomicalEventName) => {
    setVisibleZmanim(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  }, []);

  const handleShowAllZmanim = useCallback(() => {
    const all: Record<AstronomicalEventName, boolean> = {} as any;
    ALARM_EVENT_NAMES.forEach(name => {
      all[name] = true;
    });
    setVisibleZmanim(all);
  }, []);

  const handleHideAllZmanim = useCallback(() => {
    const none: Record<AstronomicalEventName, boolean> = {} as any;
    ALARM_EVENT_NAMES.forEach(name => {
      none[name] = name === 'tzeisHakochavim';
    });
    setVisibleZmanim(none);
  }, []);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize Audio object
    audioRef.current = new Audio(ALARM_SOUND_URL);
    audioRef.current.loop = true;
  }, []);
  
  // Intro slides & Walkthrough check on initial load
  useEffect(() => {
    try {
      const introSeen = localStorage.getItem('astroIntroSlidesSeen');
      if (!introSeen) {
        setShowIntro(true);
      } else {
        const hasCompletedWalkthrough = localStorage.getItem('astroAlarmWalkthroughCompleted');
        if (!hasCompletedWalkthrough) {
          // Delay slightly to ensure content is rendered
          setTimeout(() => setShowWalkthrough(true), 500);
        }
      }
    } catch (error) {
      console.error("Failed to read from localStorage", error);
    }
  }, []);

  useEffect(() => {
    const isFirstTime = !localStorage.getItem('astroSavedLocation');
    if (isFirstTime) {
      setIsGpsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLoc = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          setLocation(newLoc);
          setLocationError(null);
          setIsGpsLoading(false);
          try {
            localStorage.setItem('astroSavedLocation', JSON.stringify(newLoc));
          } catch (e) {
            console.error(e);
          }
        },
        (error) => {
          console.error("Geolocation error on startup:", error);
          setLocationError("GPS permission denied or unavailable (using Jerusalem as fallback)");
          setIsGpsLoading(false);
          // Set Jerusalem and save so we don't block
          const fallbackLoc = { lat: 31.7683, lon: 35.2137 };
          setLocation(fallbackLoc);
          try {
            localStorage.setItem('astroSavedLocation', JSON.stringify(fallbackLoc));
          } catch (e) {
            console.error(e);
          }
        },
        { enableHighAccuracy: false, timeout: 6000, maximumAge: 600000 }
      );
    }
  }, []);

  const handleFetchCurrentGps = useCallback(() => {
    setIsGpsLoading(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLoc = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        setLocation(newLoc);
        setIsGpsLoading(false);
        try {
          localStorage.setItem('astroSavedLocation', JSON.stringify(newLoc));
        } catch (e) {
          console.error(e);
        }
      },
      (error) => {
        console.error("Manual GPS fetch failed:", error);
        setLocationError("Could not retrieve GPS coordinates. Please select a city or enter coordinates manually.");
        setIsGpsLoading(false);
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  useEffect(() => {
    if (location) {
      const sunCalcTimes = calculateZmanim(selectedDate, location.lat, location.lon);
      setTimes(sunCalcTimes);
    }
  }, [location, selectedDate]);

  // Synchronize firedAlarms with past events whenever times, selectedDate or alarmSettings change,
  // to avoid retroactively triggering alarms that are already in the past.
  useEffect(() => {
    if (!times) return;
    const now = new Date();
    // Only synchronize past alarms for the selected date if it's today
    if (now.toDateString() !== selectedDate.toDateString()) {
      setFiredAlarms(new Set());
      return;
    }

    setFiredAlarms(prev => {
      let changed = false;
      const newFired = new Set(prev);
      ALARM_EVENT_NAMES.forEach(eventName => {
        const setting = alarmSettings[eventName];
        const eventTime = times[eventName];
        if (eventTime instanceof Date && !isNaN(eventTime.getTime())) {
          const alarmTime = new Date(eventTime.getTime() - setting.advanceMinutes * 60 * 1000);
          // If the alarm time has already passed today by more than 2 minutes and is not marked as fired, mark it now
          if (now.getTime() - alarmTime.getTime() > 2 * 60 * 1000) {
            if (!newFired.has(eventName)) {
              newFired.add(eventName);
              changed = true;
            }
          }
        }
      });
      return changed ? newFired : prev;
    });
  }, [times, selectedDate, alarmSettings, visibleZmanim]);

  useEffect(() => {
    try {
      localStorage.setItem('astroAlarmSettings', JSON.stringify(alarmSettings));
    } catch (error) {
      console.error("Failed to save settings to localStorage", error);
    }
  }, [alarmSettings]);

  const handleSettingsChange = useCallback((eventName: AstronomicalEventName, newSetting: { enabled?: boolean; advanceMinutes?: number }) => {
    setAlarmSettings(prev => ({
      ...prev,
      [eventName]: { ...prev[eventName], ...newSetting },
    }));
  }, []);

  const handleDismiss = useCallback(() => {
    setRingingAlarm(null);
    setSnoozedAlarm(null);
  }, []);

  const handleSnooze = useCallback((minutes: number) => {
    if (!ringingAlarm) return;
    const snoozedUntil = new Date(Date.now() + minutes * 60 * 1000);
    setSnoozedAlarm({ ...ringingAlarm, snoozedUntil });
    setRingingAlarm(null);
  }, [ringingAlarm]);

  // Main alarm checking loop
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();

      // Only fire live alarms if looking at today's date
      if (now.toDateString() !== selectedDate.toDateString()) return;

      // Automatically override and mute alarms during Shabbat (Friday sunset to Saturday nightfall)
      if (isDuringShabbat(now, times)) {
        return;
      }

      if (ringingAlarm) return; // Don't check for new alarms if one is already ringing

      // Check for snoozed alarm
      if (snoozedAlarm && now >= snoozedAlarm.snoozedUntil) {
        setRingingAlarm({ eventName: snoozedAlarm.eventName, eventTime: snoozedAlarm.eventTime });
        setSnoozedAlarm(null);
        return;
      }

      if (!times || snoozedAlarm) return;

      ALARM_EVENT_NAMES.forEach(eventName => {
        const setting = alarmSettings[eventName];
        const isVisible = visibleZmanim[eventName] !== false;
        if (setting.enabled && isVisible) {
          const eventTime = times[eventName];
          if (eventTime instanceof Date && !isNaN(eventTime.getTime())) {
            const alarmTime = new Date(eventTime.getTime() - setting.advanceMinutes * 60 * 1000);
            
            if (now >= alarmTime && !firedAlarms.has(eventName)) {
              // Only trigger the ringing UI if within a 5-minute window of the alarm time
              const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
              if (alarmTime >= fiveMinutesAgo) {
                setRingingAlarm({ eventName, eventTime });
              }
              setFiredAlarms(prev => new Set(prev).add(eventName));
            }
          }
        }
      });
    }, 5000); // Check every 5 seconds

    return () => clearInterval(intervalId);
  }, [alarmSettings, times, firedAlarms, ringingAlarm, snoozedAlarm, selectedDate, visibleZmanim]);

  // Audio playback effect
  useEffect(() => {
    const startAudio = () => {
      if (ringingAlarm && audioRef.current) {
        audioRef.current.play().then(() => {
          // Play succeeded, remove event listeners
          document.removeEventListener('click', startAudio);
          document.removeEventListener('keydown', startAudio);
        }).catch(e => {
          console.warn("Audio playback delayed until user interaction:", e.message);
        });
      }
    };

    if (ringingAlarm) {
      startAudio();
      // Listen for interaction if play was blocked by autoplay policies
      document.addEventListener('click', startAudio);
      document.addEventListener('keydown', startAudio);
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    return () => {
      document.removeEventListener('click', startAudio);
      document.removeEventListener('keydown', startAudio);
    };
  }, [ringingAlarm]);

  const orderedTimes = useMemo(() => {
    if (!times) return [];
    return ALARM_EVENT_NAMES
      .filter(name => visibleZmanim[name] !== false)
      .map(name => ({ name, time: times[name] }))
      .filter(event => event.time instanceof Date && !isNaN(event.time.getTime()))
      .sort((a, b) => a.time.getTime() - b.time.getTime());
  }, [times, visibleZmanim]);
  
  const handleNextStep = useCallback(() => {
    setWalkthroughStep(prev => prev + 1);
  }, []);

  const handlePrevStep = useCallback(() => {
    setWalkthroughStep(prev => prev - 1);
  }, []);

  const handleFinishWalkthrough = useCallback(() => {
    try {
      localStorage.setItem('astroAlarmWalkthroughCompleted', 'true');
    } catch (error) {
      console.error("Failed to save to localStorage", error);
    }
    setShowWalkthrough(false);
  }, []);

  const handleShowIntro = useCallback(() => {
    setShowIntro(true);
  }, []);

  const handleCloseIntro = useCallback(() => {
    setShowIntro(false);
    try {
      const hasCompletedWalkthrough = localStorage.getItem('astroAlarmWalkthroughCompleted');
      if (!hasCompletedWalkthrough) {
        setTimeout(() => setShowWalkthrough(true), 500);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleRestartTour = useCallback(() => {
    setWalkthroughStep(0);
    setShowWalkthrough(true);
  }, []);

  const handleResetAlarms = useCallback(() => {
    const freshDefaults = JSON.parse(JSON.stringify(DEFAULT_ALARM_SETTINGS));
    setAlarmSettings(freshDefaults);
    try {
      localStorage.setItem('astroAlarmSettings', JSON.stringify(freshDefaults));
    } catch (error) {
      console.error("Failed to clear alarm settings", error);
    }
  }, []);

  const ui = UI_TRANSLATIONS[language];
  const isRtl = language === 'he';

  return (
    <div 
      className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center p-4 sm:p-6"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
       {showWalkthrough && orderedTimes.length > 0 && (
        <Walkthrough
          step={walkthroughStep}
          onNext={handleNextStep}
          onPrev={handlePrevStep}
          onFinish={handleFinishWalkthrough}
          firstEventName={orderedTimes[0]?.name}
        />
      )}

      <Header 
        language={language} 
        onLanguageChange={setLanguage} 
        onRestartTour={handleRestartTour}
        onResetAlarms={handleResetAlarms}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onShowIntro={handleShowIntro}
        onOpenVisibilitySettings={() => setIsVisibilityModalOpen(true)}
        hasHiddenZmanim={hasHiddenZmanim}
      />
      
      <main className="w-full max-w-7xl mx-auto flex-grow px-1">
        {location && (
          <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8 shadow-sm hover:shadow-md transition-all duration-300 w-full flex flex-col gap-6">
            {/* Top Section: Calendar Details */}
            <div 
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className="flex items-stretch gap-3.5 pb-5 border-b border-slate-100 cursor-pointer hover:bg-slate-50/50 p-2.5 -m-2.5 rounded-2xl transition-all group" 
              dir="ltr"
            >
              {/* Icon Container */}
              <div className="bg-brand-50 px-3.5 rounded-2xl text-brand-600 border border-brand-100/20 shrink-0 flex items-center justify-center group-hover:bg-brand-100/60 transition-colors">
                <Calendar className="w-5 h-5 text-brand-600" />
              </div>
              
              {language === 'he' ? (
                /* Hebrew/Jewish Date */
                <div className="flex flex-col justify-center items-start text-right w-full" dir="rtl">
                  <p className="text-2xl font-black text-slate-900 tracking-tight font-outfit">
                    {getHebrewDayOfWeek(selectedDate)}
                  </p>
                  <p className="text-sm font-semibold text-slate-400 mt-1">
                    {getHebrewDateString(selectedDate)}
                  </p>
                </div>
              ) : (
                /* Gregorian/English Date */
                <div className="flex flex-col justify-center items-start text-left w-full">
                  <p className="text-2xl font-black text-slate-900 tracking-tight font-outfit">
                    {new Intl.DateTimeFormat(language, { weekday: 'long' }).format(selectedDate)}
                  </p>
                  <p className="text-sm font-semibold text-slate-400 mt-1">
                    {new Intl.DateTimeFormat(language, { month: 'long', day: 'numeric', year: 'numeric' }).format(selectedDate)}
                  </p>
                </div>
              )}
            </div>

            {/* Expandable Date Picker Panel */}
            {isDatePickerOpen && (
              <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-200 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-black text-slate-800 mb-1 font-outfit">
                      {language === 'he' ? 'בחר תאריך הלכתי' : 'Select Halachic Date'}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {language === 'he' ? 'שנה את התאריך כדי להציג את זמני היום (זמנים) לתאריך אחר.' : 'Change the date to view halachic times (Zmanim) for any other day.'}
                    </p>
                  </div>
                  
                  {/* Reset to Today button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDate(new Date());
                      setIsDatePickerOpen(false);
                    }}
                    className="self-start sm:self-center text-xs font-bold text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-3.5 py-1.5 rounded-xl transition-all"
                  >
                    {language === 'he' ? 'חזור להיום' : 'Reset to Today'}
                  </button>
                </div>

                <div className="flex items-center gap-2 max-w-md">
                  {/* Native Date Input */}
                  <div className="relative flex-grow">
                    <input
                      type="date"
                      value={selectedDate.toISOString().split('T')[0]}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        if (e.target.value) {
                          setSelectedDate(new Date(e.target.value));
                        }
                      }}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 rounded-xl text-sm font-bold text-slate-800 transition-all outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Shabbat Status Banner */}
            {times && (
              (() => {
                const day = selectedDate.getDay();
                if (day === 5) {
                  const candleLighting = times.shkia instanceof Date && !isNaN(times.shkia.getTime())
                    ? new Date(times.shkia.getTime() - 18 * 60 * 1000)
                    : null;
                  return (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-emerald-800 text-xs font-bold leading-relaxed shadow-xs" dir={language === 'he' ? 'rtl' : 'ltr'}>
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2 shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span>
                          {language === 'he'
                            ? `ערב שבת קודש: כניסת שבת ב-${candleLighting ? candleLighting.toLocaleTimeString(language, { hour: '2-digit', minute: '2-digit', hour12: false }) : ''} (כל ההתראות מושתקות אוטומטית במהלך השבת לשמירת השבת)`
                            : `Erev Shabbat: Shabbat enters at ${candleLighting ? candleLighting.toLocaleTimeString(language, { hour: '2-digit', minute: '2-digit', hour12: false }) : ''} (All alarms and reminders are automatically muted for Shabbat)`
                          }
                        </span>
                      </div>
                      <span className="bg-emerald-100 px-2.5 py-1 rounded-lg text-[10px] text-emerald-900 uppercase shrink-0 font-extrabold self-start sm:self-center">
                        {language === 'he' ? 'שבת מנוטרלת' : 'Shabbat Override Active'}
                      </span>
                    </div>
                  );
                } else if (day === 6) {
                  const tzeis = times.tzeisHakochavim instanceof Date && !isNaN(times.tzeisHakochavim.getTime())
                    ? times.tzeisHakochavim
                    : null;
                  return (
                    <div className="bg-amber-50/80 border border-amber-100 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-800 text-xs font-bold leading-relaxed shadow-xs" dir={language === 'he' ? 'rtl' : 'ltr'}>
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2 shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                        </span>
                        <span>
                          {language === 'he'
                            ? `שבת קודש: צאת השבת ב-${tzeis ? tzeis.toLocaleTimeString(language, { hour: '2-digit', minute: '2-digit', hour12: false }) : ''} (ההתראות מושתקות אוטומטית ויופעלו מחדש במוצאי שבת)`
                            : `Holy Shabbat: Shabbat ends at ${tzeis ? tzeis.toLocaleTimeString(language, { hour: '2-digit', minute: '2-digit', hour12: false }) : ''} (Alarms are automatically muted and will resume after Shabbat)`
                          }
                        </span>
                      </div>
                      <span className="bg-amber-100 px-2.5 py-1 rounded-lg text-[10px] text-amber-900 uppercase shrink-0 font-extrabold self-start sm:self-center">
                        {language === 'he' ? 'שבת קודש' : 'Shabbat Muted'}
                      </span>
                    </div>
                  );
                }
                return null;
              })()
            )}

            {/* Middle Section: Location Details */}
            <div 
              onClick={() => setIsPickerOpen(!isPickerOpen)}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 p-2.5 -m-2.5 rounded-2xl transition-all group ${isPickerOpen ? 'pb-5 border-b border-slate-100' : ''}`}
            >
              <div className="flex items-stretch gap-3.5" dir="ltr">
                <div className="bg-brand-50 px-3.5 rounded-2xl text-brand-600 border border-brand-100/20 shrink-0 flex items-center justify-center group-hover:bg-brand-100/60 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div className="flex flex-col justify-center items-start w-full" dir={language === 'he' ? 'rtl' : 'ltr'}>
                  <span className="text-[10px] font-bold text-brand-700 tracking-wider uppercase leading-none text-start mb-0.5">{ui.activeLocation}</span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-none mt-1.5 flex items-center gap-2 flex-wrap w-full text-start">
                    {isGeocoding ? (
                      <span className="text-slate-400 font-medium text-base flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-t-transparent border-slate-500 rounded-full animate-spin"></span>
                        {ui.geocoding}
                      </span>
                    ) : cityName ? (
                      cityName
                    ) : (
                      ui.yourCoordinates
                    )}
                  </h2>
                </div>
              </div>
            </div>

            {/* Expandable Location Picker Panel */}
            {isPickerOpen && (
              <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                {locationError && (
                  <div className="mb-5 bg-amber-50 border border-amber-200 text-amber-800 text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 font-medium">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0"></span>
                    <span>{locationError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                  {/* Option 1: Use Current GPS */}
                  <div className="flex flex-col justify-between bg-white border border-slate-200/60 rounded-2xl p-5 hover:shadow-xs transition-all">
                    <div className="mb-4">
                      <span className="text-[10px] font-extrabold text-brand-600 tracking-wider uppercase bg-brand-50 px-2 py-0.5 rounded-md inline-block mb-2">
                        {language === 'he' ? 'אפשרות 1' : 'Option 1'}
                      </span>
                      <h3 className="text-sm font-black text-slate-800 mb-1 font-outfit">
                        {LOCATION_SELECTOR_TRANSLATIONS[language].useCurrentGps}
                      </h3>

                    </div>

                    <button
                      type="button"
                      disabled={isGpsLoading}
                      onClick={handleFetchCurrentGps}
                      className="w-full py-3 px-4 bg-brand-600 hover:bg-brand-700 disabled:bg-brand-400 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                    >
                      {isGpsLoading ? (
                        <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                      )}
                      <span>
                        {isGpsLoading 
                          ? (language === 'he' ? 'מזהה מיקום...' : 'Locating...') 
                          : LOCATION_SELECTOR_TRANSLATIONS[language].useCurrentGps}
                      </span>
                    </button>
                  </div>

                  {/* Option 2: Type Location (Predictive) */}
                  <div className="flex flex-col bg-white border border-slate-200/60 rounded-2xl p-5 hover:shadow-xs transition-all relative">
                    <div className="mb-3">
                      <span className="text-[10px] font-extrabold text-brand-600 tracking-wider uppercase bg-brand-50 px-2 py-0.5 rounded-md inline-block mb-2">
                        {language === 'he' ? 'אפשרות 2' : 'Option 2'}
                      </span>
                      <h3 className="text-sm font-black text-slate-800 mb-1 font-outfit">
                        {LOCATION_SELECTOR_TRANSLATIONS[language].typeLocation}
                      </h3>

                    </div>

                    <div className="relative mt-auto">
                      <div className="relative">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder={LOCATION_SELECTOR_TRANSLATIONS[language].searchPlaceholder}
                          className="w-full pl-10 pr-10 py-3 text-xs font-bold text-slate-800 bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                        />
                        <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                          <Search className="w-4 h-4 text-slate-400" />
                        </div>
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => {
                              setSearchQuery('');
                              setSuggestions([]);
                            }}
                            className="absolute inset-y-0 right-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-all"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {/* Suggestions list dropdown */}
                      {isSearching && (
                        <div className="absolute left-0 right-0 mt-2 bg-white border border-slate-100 rounded-xl shadow-lg p-3 z-30 flex items-center justify-center gap-2 text-slate-500 text-xs font-bold">
                          <span className="w-4 h-4 border-2 border-t-transparent border-brand-600 rounded-full animate-spin"></span>
                          <span>{LOCATION_SELECTOR_TRANSLATIONS[language].searching}</span>
                        </div>
                      )}

                      {!isSearching && searchQuery.trim().length >= 3 && suggestions.length === 0 && (
                        <div className="absolute left-0 right-0 mt-2 bg-white border border-slate-100 rounded-xl shadow-lg p-4 z-30 text-center text-slate-400 text-xs font-semibold">
                          {LOCATION_SELECTOR_TRANSLATIONS[language].noResults}
                        </div>
                      )}

                      {!isSearching && suggestions.length > 0 && (
                        <div className="absolute left-0 right-0 mt-2 max-h-56 overflow-y-auto bg-white border border-slate-100 rounded-xl shadow-lg divide-y divide-slate-50 z-30">
                          {suggestions.map((city) => (
                            <button
                              key={city.id}
                              type="button"
                              onClick={() => {
                                setLocation({ lat: city.lat, lon: city.lon });
                                setLocationError(null);
                                setIsPickerOpen(false);
                                try {
                                  localStorage.setItem('astroSavedLocation', JSON.stringify({ lat: city.lat, lon: city.lon }));
                                } catch (e) {
                                  console.error(e);
                                }
                              }}
                              className="w-full text-left px-4 py-3 hover:bg-brand-50/65 text-xs text-slate-700 hover:text-brand-800 font-bold transition-all flex items-start gap-2.5"
                            >
                              <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
                              <span className="leading-tight">{city.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {times ? (
          viewMode === 'table' ? (
            <TimeTable
              orderedTimes={orderedTimes}
              alarmSettings={alarmSettings}
              onSettingChange={handleSettingsChange}
              language={language}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {orderedTimes.map(({ name, time }) => (
                <TimeCard
                  key={name}
                  eventName={name}
                  eventTime={time}
                  setting={alarmSettings[name]}
                  onSettingChange={(newSetting) => handleSettingsChange(name, newSetting)}
                  language={language}
                />
              ))}
            </div>
          )
        ) : (
          !locationError && location && (
            <div className="text-center py-10">
              <p className="text-xl text-slate-500 font-medium animate-pulse">{ui.calculatingTimes}</p>
            </div>
          )
        )}
      </main>

      <footer className="text-center py-6 text-slate-400 text-sm border-t border-slate-100 w-full max-w-7xl mx-auto mt-10">
        
      </footer>
      
      {ringingAlarm && (
        <AlarmModal
          alarm={ringingAlarm}
          onDismiss={handleDismiss}
          onSnooze={handleSnooze}
          language={language}
        />
      )}

      {isInfoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-200" 
            onClick={() => setIsInfoOpen(false)}
          />
          {/* Modal Container */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xl max-w-sm w-full relative z-10 animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setIsInfoOpen(false)}
              className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all`}
            >
              <X className="w-4.5 h-4.5" />
            </button>
            
            <div className="flex flex-col items-center text-center gap-3 mt-2">
              <div className="bg-brand-50 p-3 rounded-2xl text-brand-600 border border-brand-100/20">
                <Info className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 font-outfit">
                {language === 'he' ? 'קואורדינטות מיקום מדויקות' : 
                 language === 'fr' ? 'Coordonnées exactes' :
                 language === 'es' ? 'Coordenadas exactas' :
                 language === 'ru' ? 'Точные координаты' : 'Exact Coordinates'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {language === 'he' ? 'זמני היום (הזמנים ההלכתיים) מחושבים לפי קואורדינטות גיאוגרפיות מדויקות אלו.' : 
                 language === 'fr' ? 'Les heures halachiques quotidiennes sont calculées en fonction de ces coordonnées géographiques.' :
                 language === 'es' ? 'Los horarios halájicos diarios se calculan según estas coordenadas geográficas.' :
                 language === 'ru' ? 'Ежедневное галахическое время рассчитывается на основе этих точных координат.' : 'Daily halachic times are calculated based on these exact geographic coordinates.'}
              </p>
              
              <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 mt-2 space-y-2.5 text-left font-sans" dir="ltr">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-slate-400">
                    {language === 'he' ? 'קו רוחב' : 'Latitude'}
                  </span>
                  <span className="font-mono font-bold text-slate-800">{location.lat.toFixed(5)}°</span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-slate-100/80 pt-2.5">
                  <span className="font-semibold text-slate-400">
                    {language === 'he' ? 'קו אורך' : 'Longitude'}
                  </span>
                  <span className="font-mono font-bold text-slate-800">{location.lon.toFixed(5)}°</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 mt-2 bg-brand-50/50 border border-brand-100/20 px-3 py-1.5 rounded-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></span>
                <span className="text-[10px] font-bold tracking-wider text-brand-700 uppercase">
                  {ui.calibratedDaily}
                </span>
              </div>
              
              <button
                type="button"
                onClick={() => setIsInfoOpen(false)}
                className="w-full mt-3 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl transition-all"
              >
                {language === 'he' ? 'סגור' : 
                 language === 'fr' ? 'Fermer' :
                 language === 'es' ? 'Cerrar' :
                 language === 'ru' ? 'Закрыть' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      <IntroSlides 
        isOpen={showIntro} 
        onClose={handleCloseIntro} 
        language={language} 
      />

      <VisibilitySettingsModal
        isOpen={isVisibilityModalOpen}
        onClose={() => setIsVisibilityModalOpen(false)}
        language={language}
        visibleZmanim={visibleZmanim}
        onToggleZman={handleToggleZmanVisibility}
        onShowAll={handleShowAllZmanim}
        onHideAll={handleHideAllZmanim}
      />

      <OfflineIndicator />
    </div>
  );
};

export default App;
