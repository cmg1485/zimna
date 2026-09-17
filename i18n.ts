import { AstronomicalEventName } from './types';

export type Language = 'en' | 'he' | 'fr' | 'es' | 'ru';

export interface TranslationSet {
  appName: string;
  subtitle: string;
  activeLocation: string;
  geocoding: string;
  yourCoordinates: string;
  latitude: string;
  longitude: string;
  calibratedDaily: string;
  enableAlarm: string;
  notifyInAdvance: string;
  min: string;
  snoozeMin: string;
  shareAlarmAlert: string;
  dismissAlarm: string;
  itsTime: string;
  shared: string;
  section1: string;
  section2: string;
  section3: string;
  requestingLocation: string;
  calculatingTimes: string;
}

export const UI_TRANSLATIONS: Record<Language, TranslationSet> = {
  en: {
    appName: "Zimna",
    subtitle: "Your personal alarm clock for Jewish practice daily halachic times (Zmanim).",
    activeLocation: "Active Halachic Location",
    geocoding: "Geocoding...",
    yourCoordinates: "Your Coordinates",
    latitude: "Latitude",
    longitude: "Longitude",
    calibratedDaily: "Times Calibrated Daily",
    enableAlarm: "Enable Daily Alarm",
    notifyInAdvance: "Notify in advance",
    min: "min",
    snoozeMin: "Snooze",
    shareAlarmAlert: "Share Alarm Alert",
    dismissAlarm: "Dismiss Alarm",
    itsTime: "It's Time!",
    shared: "Shared!",
    section1: "1. Definition",
    section2: "2. Halachic Obligations",
    section3: "3. Calculation Method",
    requestingLocation: "Requesting location to calculate daily Zmanim...",
    calculatingTimes: "Calculating times for your location...",
  },
  he: {
    appName: "זמנים היום",
    subtitle: "שעון המעורר האישי שלך לזמני ההלכה היומיים (זמנים).",
    activeLocation: "מיקום הלכתי פעיל",
    geocoding: "מזהה מיקום...",
    yourCoordinates: "הקואורדינטות שלך",
    latitude: "קו רוחב",
    longitude: "קו אורך",
    calibratedDaily: "זמנים מכוילים מדי יום",
    enableAlarm: "הפעלת התראה",
    notifyInAdvance: "התרעה מראש",
    min: "דק׳",
    snoozeMin: "נודניק",
    shareAlarmAlert: "שתף התראה",
    dismissAlarm: "בטל התראה",
    itsTime: "הגיע הזמן!",
    shared: "שותף!",
    section1: "1. הגדרה",
    section2: "2. חיובים הלכתיים",
    section3: "3. שיטת חישוב",
    requestingLocation: "מבקש מיקום לצורך חישוב זמני היום...",
    calculatingTimes: "מחשב זמנים עבור המיקום שלך...",
  },
  fr: {
    appName: "Zmanim Today",
    subtitle: "Votre réveil personnel pour les horaires halachiques quotidiens (Zmanim).",
    activeLocation: "Emplacement Halachique Actif",
    geocoding: "Géolocalisation...",
    yourCoordinates: "Vos Coordonnées",
    latitude: "Latitude",
    longitude: "Longitude",
    calibratedDaily: "Heures Calibrées Quotidiennement",
    enableAlarm: "Activer l'Alarme",
    notifyInAdvance: "Notifier à l'avance",
    min: "min",
    snoozeMin: "Répéter",
    shareAlarmAlert: "Partager l'Alarme",
    dismissAlarm: "Arrêter l'Alarme",
    itsTime: "C'est l'Heure !",
    shared: "Partagé !",
    section1: "1. Définition",
    section2: "2. Obligations Halachiques",
    section3: "3. Méthode de Calcul",
    requestingLocation: "Demande de localisation pour calculer le Zmanim...",
    calculatingTimes: "Calcul des horaires pour votre position...",
  },
  es: {
    appName: "Zmanim Today",
    subtitle: "Tu reloj despertador personal para los horarios halájicos diarios (Zmanim).",
    activeLocation: "Ubicación Halájica Activa",
    geocoding: "Geolocalizando...",
    yourCoordinates: "Tus Coordenadas",
    latitude: "Latitud",
    longitude: "Longitud",
    calibratedDaily: "Tiempos Calibrados Diariamente",
    enableAlarm: "Activar Alarma",
    notifyInAdvance: "Notificar con anticipación",
    min: "min",
    snoozeMin: "Posponer",
    shareAlarmAlert: "Compartir Alarma",
    dismissAlarm: "Descartar Alarma",
    itsTime: "¡Es la Hora!",
    shared: "¡Compartido!",
    section1: "1. Definición",
    section2: "2. Obligaciones Halájicas",
    section3: "3. Método de Cálculo",
    requestingLocation: "Solicitando ubicación para calcular Zmanim diarios...",
    calculatingTimes: "Calculando tiempos para su ubicación...",
  },
  ru: {
    appName: "Зманим Сегодня",
    subtitle: "Ваш личный будильник для ежедневного галахического времени (Зманим).",
    activeLocation: "Активное Галахическое Местоположение",
    geocoding: "Геолокация...",
    yourCoordinates: "Ваши Координаты",
    latitude: "Широта",
    longitude: "Долгота",
    calibratedDaily: "Время Калибруется Ежедневно",
    enableAlarm: "Включить Будильник",
    notifyInAdvance: "Уведомить заранее",
    min: "мин",
    snoozeMin: "Дремать",
    shareAlarmAlert: "Поделиться Будильником",
    dismissAlarm: "Отключить Будильник",
    itsTime: "Время пришло!",
    shared: "Отправлено!",
    section1: "1. Определение",
    section2: "2. Галахические Обязанности",
    section3: "3. Метод Расчета",
    requestingLocation: "Запрос местоположения для расчета Зманим...",
    calculatingTimes: "Расчет времени для вашего местоположения...",
  }
};

export const ZMAN_NAMES: Record<Language, Record<AstronomicalEventName, string>> = {
  en: {
    alosHashachar: 'Alos Hashachar (Dawn)',
    netzHachamah: 'Netz Hachamah (Sunrise)',
    shemaMA: 'Latest Shema (Magen Avraham)',
    shemaGra: 'Latest Shema (Gra)',
    tefillahGra: 'Latest Tefillah (Gra)',
    chatzos: 'Chatzos (Midday)',
    minchaGedolah: 'Mincha Gedolah',
    minchaKetanah: 'Mincha Ketanah',
    plagHamincha: 'Plag Hamincha',
    shkia: 'Shkia (Sunset)',
    tzeisHakochavim: 'Tzeis Hakochavim (Nightfall)',
  },
  he: {
    alosHashachar: 'עלות השחר',
    netzHachamah: 'נץ החמה',
    shemaMA: 'סוף זמן קריאת שמע (מג"א)',
    shemaGra: 'סוף זמן קריאת שמע (גר"א)',
    tefillahGra: 'סוף זמן תפילה (גר"א)',
    chatzos: 'חצות היום',
    minchaGedolah: 'מנחה גדולה',
    minchaKetanah: 'מנחה קטנה',
    plagHamincha: 'פלג המנחה',
    shkia: 'שקיעת החמה',
    tzeisHakochavim: 'צאת הכוכבים',
  },
  fr: {
    alosHashachar: 'Alos Hashachar (L\'Aube)',
    netzHachamah: 'Netz Hachamah (Lever du Soleil)',
    shemaMA: 'Limite du Chéma (Magen Avraham)',
    shemaGra: 'Limite du Chéma (Gra)',
    tefillahGra: 'Limite de la Tefila (Gra)',
    chatzos: 'Chatzos (Midi Halachique)',
    minchaGedolah: 'Mincha Gedolah',
    minchaKetanah: 'Mincha Ketanah',
    plagHamincha: 'Plag Hamincha',
    shkia: 'Shkia (Coucher du Soleil)',
    tzeisHakochavim: 'Tzeis Hakochavim (Sortie des Étoiles)',
  },
  es: {
    alosHashachar: 'Alos Hashachar (El Alba)',
    netzHachamah: 'Netz Hachamah (Salida del Sol)',
    shemaMA: 'Límite de Shemá (Magen Avraham)',
    shemaGra: 'Límite de Shemá (Gra)',
    tefillahGra: 'Límite de Tefilá (Gra)',
    chatzos: 'Chatzos (Mediodía Halájico)',
    minchaGedolah: 'Mincha Gedolah',
    minchaKetanah: 'Mincha Ketanah',
    plagHamincha: 'Plag Hamincha',
    shkia: 'Shkia (Ocaso / Sunset)',
    tzeisHakochavim: 'Tzeis Hakochavim (Salida de Estrellas)',
  },
  ru: {
    alosHashachar: 'Алос Хашахар (Рассвет)',
    netzHachamah: 'Нец Хахама (Восход Солнца)',
    shemaMA: 'Время Шма (Маген Авраам)',
    shemaGra: 'Время Шма (Гра)',
    tefillahGra: 'Время Тфилы (Гра)',
    chatzos: 'Хацот (Полдень)',
    minchaGedolah: 'Минха Гедола',
    minchaKetanah: 'Минха Ктана',
    plagHamincha: 'Плаг Аминха',
    shkia: 'Шкия (Заход Солнца)',
    tzeisHakochavim: 'Цейс Акохавим (Выход Звезд)',
  }
};

export interface TranslatedZmanDetail {
  description: string;
  obligations: string;
  calculation: string;
}

export const EVENT_DETAILS_I18N: Record<Language, Record<AstronomicalEventName, TranslatedZmanDetail>> = {
  en: {
    alosHashachar: {
      description: 'Dawn. The beginning of daylight when the sun\'s first rays begin to illuminate the upper atmosphere.',
      obligations: 'Fast days begin at this moment. Under pressing circumstances (e.g. travel), one may pray Shacharis, recite morning Shema, or perform daytime mitzvos (Tzitzis, Tefillin, Lulav).',
      calculation: 'Calculated when the sun is 16.1 degrees below the eastern horizon, or approximately 72 minutes before sunrise.'
    },
    netzHachamah: {
      description: 'Sunrise. The moment when the upper edge of the sun\'s disk first appears above the horizon.',
      obligations: 'The ideal and preferred time to begin the morning Amidah (Shacharis) to pray "Vatikin". Earliest preferred time for all daytime commandments (Shofar, Lulav, Bris Milah, Megillah).',
      calculation: 'Calculated astronomically when the sun\'s top limb rises above the local sea-level horizon.'
    },
    shemaMA: {
      description: 'The latest deadline for morning Shema according to the stricter Magen Avraham opinion.',
      obligations: 'Biblical obligation to recite the morning Shema expires. If missed, one should still recite it with its blessings until the 4th hour (Zman Tefillah), or without blessings later.',
      calculation: 'Calculated as 3 proportional hours (Sha\'os Zmaniyos) after Alos Hashachar, where the day is measured from Alos Hashachar to Tzeis Hakochavim.'
    },
    shemaGra: {
      description: 'The latest consensus deadline for morning Shema according to the Vilna Gaon (Gra) and Shulchan Aruch.',
      obligations: 'Latest time to fulfill the biblical obligation of reciting the morning Shema in its proper time.',
      calculation: 'Calculated as 3 proportional hours (Sha\'os Zmaniyos) after Sunrise, where the day is measured strictly from Sunrise to Sunset.'
    },
    tefillahGra: {
      description: 'The latest deadline for the morning prayer (Amidah) according to the Vilna Gaon (Gra).',
      obligations: 'Latest time to pray Shacharis (Amidah) with its primary reward. If missed, Shacharis can still be prayed until Chatzos (midday) but without the "in its proper time" reward.',
      calculation: 'Calculated as 4 proportional hours (Sha\'os Zmaniyos) after Sunrise.'
    },
    chatzos: {
      description: 'Halachic Midday. The exact midpoint of the day\'s daylight hours.',
      obligations: 'Earliest time to pray Mincha (specifically Mincha Gedolah). On fast days (like Tisha B\'Av), restrictions on sitting on low chairs or wearing leather shoes are relieved at this time.',
      calculation: 'Calculated as exactly 6 proportional hours after Sunrise, corresponding to when the sun reaches its highest point (Solar Noon).'
    },
    minchaGedolah: {
      description: 'The earliest time of the day when one is permitted to recite the afternoon prayer (Mincha).',
      obligations: 'Earliest allowable time to pray the Mincha Amidah. Reciting it before this time is invalid.',
      calculation: 'Calculated as 6.5 proportional hours after Sunrise (half a proportional hour after Chatzos) to ensure the sun\'s descent is clearly visible.'
    },
    minchaKetanah: {
      description: 'The preferred and ideal time window to pray the afternoon service (Mincha).',
      obligations: 'Highly recommended time to pray Mincha, corresponding to when the daily afternoon sacrifice (Tamid) was offered in the Holy Temple.',
      calculation: 'Calculated as 9.5 proportional hours after Sunrise.'
    },
    plagHamincha: {
      description: 'The transition point between late afternoon and evening.',
      obligations: 'Earliest time to light Shabbat and festival candles with a blessing under pressing circumstances, or to pray Maariv (evening service) early according to certain halachic opinions.',
      calculation: 'Calculated as 10.75 proportional hours after Sunrise (exactly 1.25 proportional hours before Sunset).'
    },
    shkia: {
      description: 'Sunset. The moment the sun disappears completely below the western horizon.',
      obligations: 'End of the halachic day. All daytime mitzvos (Mincha, Lulav, Shofar) must be completed before this time. Marks the start of twilight (Bein Hashmashos).',
      calculation: 'Calculated astronomically when the sun\'s upper limb sinks below the local sea-level horizon.'
    },
    tzeisHakochavim: {
      description: 'Nightfall. The appearance of three medium-sized stars in the night sky.',
      obligations: 'Start of the next halachic day. Earliest time to pray Maariv, recite evening Shema, count the Omer, and end Shabbat, festivals, and fast days.',
      calculation: 'Calculated astronomically when the sun is 8.5 degrees below the western horizon, or approximately 42 to 50 minutes after sunset.'
    }
  },
  he: {
    alosHashachar: {
      description: 'עלות השחר. תחילת היום כאשר קרני האור הראשונות של השמש מתחילות להאיר את האטמוספירה.',
      obligations: 'תעניות מתחילות ברגע זה. בשעת הדחק (כמו נסיעה), מותר להתפלל שחרית, לקרוא שמע של שחרית, או לקיים מצוות יום (ציצית, תפילין, לולב).',
      calculation: 'מחושב כאשר השמש נמצאת 16.1 מעלות מתחת לאופק המזרחי, או כ-72 דקות לפני הנץ החמה.'
    },
    netzHachamah: {
      description: 'הנץ החמה. הרגע שבו הקצה העליון של גלגל השמש מופיע לראשונה מעל האופק.',
      obligations: 'הזמן המועדף והאידיאלי להתחיל תפילת עמידה של שחרית (תפילת ותיקין). הזמן המוקדם ביותר לקיום מצוות היום לכתחילה (שופר, לולב, ברית מילה, מגילה).',
      calculation: 'מחושב אסטרונומית כאשר הקצה העליון של השמש עולה מעל האופק המקומי בגובה פני הים.'
    },
    shemaMA: {
      description: 'סוף זמן קריאת שמע לפי שיטת המגן אברהם (המחמירה יותר).',
      obligations: 'פג תוקפו של החיוב המקראי לקרוא שמע של שחרית. אם עבר הזמן, יש לקרוא עם ברכותיה עד שעה רביעית (סוף זמן תפילה), או בלי הברכות לאחר מכן.',
      calculation: 'מחושב כ-3 שעות זמניות לאחר עלות השחר, כאשר היום נמדד מעלות השחר ועד צאת הכוכבים.'
    },
    shemaGra: {
      description: 'סוף זמן קריאת שמע לפי שיטת הגר"א (הגאון מוילנא) והשולחן ערוך.',
      obligations: 'זמן אחרון לקיים את המצווה מן התורה של קריאת שמע של שחרית בזמנה.',
      calculation: 'מחושב כ-3 שעות זמניות לאחר הנץ החמה, כאשר היום נמדד מהנץ החמה ועד שקיעת החמה.'
    },
    tefillahGra: {
      description: 'סוף זמן תפילת שחרית (עמידה) לפי שיטת הגר"א.',
      obligations: 'זמן אחרון להתפלל שחרית ולקבל שכר תפילה בזמנה. בדיעבד ניתן להתפלל שחרית עד חצות היום, אך ללא שכר תפילה בזמנה.',
      calculation: 'מחושב כ-4 שעות זמניות לאחר הנץ החמה.'
    },
    chatzos: {
      description: 'חצות היום. נקודת האמצע המדויקת של שעות האור של היום.',
      obligations: 'הזמן המוקדם ביותר לתפילת מנחה (מנחה גדולה). בימי תענית (כמו תשעה באב), הקלות כמו ישיבה על כיסא רגיל או נעילת נעלי עור מתחילות בזמן זה.',
      calculation: 'מחושב כ-6 שעות זמניות בדיוק לאחר הנץ החמה, כאשר השמש מגיעה לנקודה הגבוהה ביותר שלה במסלולה.'
    },
    minchaGedolah: {
      description: 'הזמן המוקדם ביותר ביום שבו מותר להתחיל להתפלל תפילת מנחה.',
      obligations: 'הזמן המוקדם ביותר שבו תפילת מנחה כשרה. תפילה לפני זמן זה אינה תקפה.',
      calculation: 'מחושב כ-6.5 שעות זמניות לאחר הנץ החמה (חצי שעה זמנית לאחר חצות היום) כדי להבטיח שירידת השמש נראית בבירור.'
    },
    minchaKetanah: {
      description: 'זמן מנחה קטנה. חלון הזמן המועדף והאידיאלי לתפילת מנחה.',
      obligations: 'זמן מומלץ ביותר להתפלל מנחה, המקביל לזמן שבו הוקרב קורבן התמיד של בין הערביים בבית המקדש.',
      calculation: 'מחושב כ-9.5 שעות זמניות לאחר הנץ החמה.'
    },
    plagHamincha: {
      description: 'פלג המנחה. נקודת המעבר בין שעות אחר הצהריים המאוחרות לערב.',
      obligations: 'הזמן המוקדם ביותר להדלקת נרות שבת ויום טוב עם ברכה בשעת הדחק, או להתפלל ערבית מוקדם לפי דעות הלכתיות מסוימות.',
      calculation: 'מחושב כ-10.75 שעות זמניות לאחר הנץ החמה (בדיוק שעה ורבע זמניות לפני השקיעה).'
    },
    shkia: {
      description: 'שקיעת החמה. הרגע שבו השמש נעלמת לחלוטין מתחת לאופק המערבי.',
      obligations: 'סוף היום ההלכתי. יש להשלים את כל מצוות היום (מנחה, לולב, שופר) לפני זמן זה. מסמן את תחילת בין השמשות.',
      calculation: 'מחושב אסטרונומית כאשר הקצה העליון של גלגל השמש שוקע מתחת לאופק בגובה פני הים.'
    },
    tzeisHakochavim: {
      description: 'צאת הכוכבים. הופעתם של שלושה כוכבים בינוניים בשמי הלילה.',
      obligations: 'תחילת היום ההלכתי הבא. הזמן המוקדם ביותר לתפילת ערבית, קריאת שמע של ערבית, ספירת העומר, וסיום שבתות, חגים ותעניות.',
      calculation: 'מחושב אסטרונומית כאשר השמש נמצאת 8.5 מעלות מתחת לאופק המערבי, כ-42 עד 50 דקות לאחר השקיעה.'
    }
  },
  fr: {
    alosHashachar: {
      description: 'L\'Aube (Alos Hashachar). Le début de la lumière du jour lorsque les premiers rayons du soleil éclairent la haute atmosphère.',
      obligations: 'Les jours de jeûne commencent à ce moment. En cas d\'urgence (ex: voyage), on peut prier Shacharis, réciter le Chéma du matin ou accomplir les commandements de jour.',
      calculation: 'Calculé lorsque le soleil est à 16,1 degrés sous l\'horizon est, environ 72 minutes avant le lever du soleil.'
    },
    netzHachamah: {
      description: 'Lever du soleil (Netz Hachamah). Le moment où le bord supérieur du disque solaire apparaît au-dessus de l\'horizon.',
      obligations: 'Le moment idéal et préféré pour commencer la Amida du matin (Shacharis) pour prier "Vatikin". Heure idéale la plus précoce pour tous les commandements de jour.',
      calculation: 'Calculé astronomiquement lorsque le membre supérieur du soleil s\'élève au-dessus de l\'horizon local.'
    },
    shemaMA: {
      description: 'L\'heure limite pour le Chéma du matin selon l\'opinion plus stricte du Magen Avraham.',
      obligations: 'L\'obligation biblique de réciter le Chéma du matin expire. Si elle est manquée, on doit quand même le réciter avec ses bénédictions jusqu\'à la 4ème heure.',
      calculation: 'Calculé comme 3 heures proportionnelles (Cha\'os Zmaniyos) après Alos Hashachar.'
    },
    shemaGra: {
      description: 'L\'heure limite de consensus pour le Chéma du matin selon le Vilna Gaon (Gra) et le Choulhan Aroukh.',
      obligations: 'Dernier moment pour accomplir l\'obligation biblique de réciter le Chéma du matin en son temps.',
      calculation: 'Calculé comme 3 heures proportionnelles après le lever du soleil, où le jour est mesuré strictement du lever au coucher du soleil.'
    },
    tefillahGra: {
      description: 'L\'heure limite pour la prière du matin (Amida) selon le Vilna Gaon (Gra).',
      obligations: 'Dernier moment pour prier Shacharis (Amida) avec sa récompense principale.',
      calculation: 'Calculé comme 4 heures proportionnelles après le lever du soleil.'
    },
    chatzos: {
      description: 'Midi Halachique. Le point médian exact des heures de clarté de la journée.',
      obligations: 'Heure la plus précoce pour prier Minha (Minha Guedola). Les jours de jeûne (comme Tisha BeAv), certaines restrictions sont levées.',
      calculation: 'Calculé comme exactement 6 heures proportionnelles après le lever du soleil (midi solaire).'
    },
    minchaGedolah: {
      description: 'L\'heure la plus précoce de la journée à laquelle on est autorisé à réciter la prière de l\'après-midi (Minha).',
      obligations: 'Heure limite de début de la prière de Minha.',
      calculation: 'Calculé comme 6,5 heures proportionnelles après le lever du soleil.'
    },
    minchaKetanah: {
      description: 'Le créneau horaire préféré et idéal pour prier l\'office de l\'après-midi (Minha).',
      obligations: 'Heure fortement recommandée pour prier Minha, correspondant au sacrifice de l\'après-midi (Tamid) dans le Temple.',
      calculation: 'Calculé comme 9,5 heures proportionnelles après le lever du soleil.'
    },
    plagHamincha: {
      description: 'Le point de transition entre la fin d\'après-midi et le soir.',
      obligations: 'Heure la plus précoce pour allumer les bougies de Chabbat et des fêtes avec bénédiction en cas d\'urgence.',
      calculation: 'Calculé comme 10,75 heures proportionnelles après le lever du soleil.'
    },
    shkia: {
      description: 'Coucher du soleil. Le moment où le soleil disparaît complètement sous l\'horizon ouest.',
      obligations: 'Fin de la journée halachique. Tous les commandements de jour (Minha, Lulav) doivent être accomplis avant ce moment.',
      calculation: 'Calculé astronomiquement lorsque le limbe supérieur du soleil descend sous l\'horizon local.'
    },
    tzeisHakochavim: {
      description: 'La tombée de la nuit. L\'apparition de trois étoiles de taille moyenne dans le ciel nocturne.',
      obligations: 'Début de la journée halachique suivante. Heure la plus précoce pour prier Maariv, réciter le Chéma du soir, compter l\'Omer et terminer Chabbat.',
      calculation: 'Calculé lorsque le soleil est à 8,5 degrés sous l\'horizon ouest.'
    }
  },
  es: {
    alosHashachar: {
      description: 'El Alba (Alos Hashachar). El comienzo de la luz del día cuando los primeros rayos del sol comienzan a iluminar la atmósfera.',
      obligations: 'Los días de ayuno comienzan en este momento. Bajo circunstancias urgentes, se puede rezar Shajarit o realizar mitzvot diurnas.',
      calculation: 'Calculado cuando el sol está a 16.1 grados por debajo del horizonte oriental.'
    },
    netzHachamah: {
      description: 'Amanecer (Netz Hachamah). El momento en que el borde superior del disco solar aparece por primera vez sobre el horizonte.',
      obligations: 'El momento ideal para comenzar la Amidá de la mañana (Shajarit). El tiempo preferido más temprano para todas las mitzvot diurnas.',
      calculation: 'Calculado astronómicamente cuando el limbo superior del sol se eleva sobre el horizonte local.'
    },
    shemaMA: {
      description: 'El último plazo para el Shemá de la mañana según la opinión más estricta de Magen Avraham.',
      obligations: 'Expira la obligación bíblica de recitar el Shemá de la mañana.',
      calculation: 'Calculado como 3 horas proporcionales después de Alos Hashachar.'
    },
    shemaGra: {
      description: 'El último plazo de consenso para el Shemá de la mañana según el Gaón de Vilna (Gra) y el Shulján Aruj.',
      obligations: 'Último momento para cumplir con la obligación bíblica de recitar el Shemá matutino en su tiempo.',
      calculation: 'Calculado como 3 horas proporcionales después del amanecer.'
    },
    tefillahGra: {
      description: 'El último plazo para la oración de la mañana (Amidá) según el Gaón de Vilna (Gra).',
      obligations: 'Último momento para rezar Shajarit (Amidá) con su recompensa principal.',
      calculation: 'Calculado como 4 horas proporcionales después del amanecer.'
    },
    chatzos: {
      description: 'Mediodía Halájico. El punto medio exacto de las horas de luz del día.',
      obligations: 'Tiempo más temprano para rezar Minjá (Minjá Guedolá). En días de ayuno, se alivian ciertas restricciones.',
      calculation: 'Calculado como exactamente 6 horas proporcionales después del amanecer (cenit solar).'
    },
    minchaGedolah: {
      description: 'El momento más temprano del día en que se permite recitar la oración de la tarde (Minjá).',
      obligations: 'Tiempo mínimo de inicio permitido para rezar la Amidá de Minjá.',
      calculation: 'Calculado como 6.5 horas proporcionales después del amanecer.'
    },
    minchaKetanah: {
      description: 'El horario preferido e ideal para rezar el servicio de la tarde (Minjá).',
      obligations: 'Momento muy recomendado para rezar Minjá, correspondiente al sacrificio de la tarde en el Templo.',
      calculation: 'Calculado como 9.5 horas proporcionales después del amanecer.'
    },
    plagHamincha: {
      description: 'El punto de transición entre el final de la tarde y la noche.',
      obligations: 'Momento más temprano para encender las velas de Shabat y festividades con bendición bajo circunstancias apremiantes.',
      calculation: 'Calculado como 10.75 horas proporcionales después del amanecer.'
    },
    shkia: {
      description: 'Ocaso (Sunset). El momento en que el sol desaparece por completo debajo del horizonte occidental.',
      obligations: 'Fin del día halájico. Todas las mitzvot diurnas deben completarse antes de este momento.',
      calculation: 'Calculado astronómicamente cuando el limbo superior del sol se hunde bajo el horizonte local.'
    },
    tzeisHakochavim: {
      description: 'Anochecer. La aparición de tres estrellas de tamaño mediano en el cielo nocturno.',
      obligations: 'Inicio del siguiente día halájico. Momento más temprano para rezar Maariv, recitar Shemá nocturno y terminar Shabat.',
      calculation: 'Calculado cuando el sol está a 8.5 grados por debajo del horizonte occidental.'
    }
  },
  ru: {
    alosHashachar: {
      description: 'Алос Хашахар (Рассвет). Начало дневного света, когда первые лучи солнца начинают освещать верхние слои атмосферы.',
      obligations: 'В этот момент начинаются посты. В экстренных случаях можно молиться Шахарит, читать утреннее Шма или выполнять дневные заповеди.',
      calculation: 'Рассчитывается, когда солнце находится на 16.1 градуса ниже восточного горизонта.'
    },
    netzHachamah: {
      description: 'Нец Хахама (Восход). Момент, когда верхний край солнечного диска впервые появляется над горизонтом.',
      obligations: 'Идеальное время для начала утренней молитвы (Амида). Самое раннее предпочтительное время для всех дневных заповедей.',
      calculation: 'Рассчитывается астрономически, когда верхний край солнца поднимается над местным горизонтом.'
    },
    shemaMA: {
      description: 'Крайний срок для утреннего Шма согласно более строгому мнению Маген Авраама.',
      obligations: 'Истекает библейская обязанность читать утреннее Шма.',
      calculation: 'Рассчитывается как 3 пропорциональных часа после Алос Хашахар.'
    },
    shemaGra: {
      description: 'Крайний срок для утреннего Шма согласно Виленскому Гаону (Гра) и Шулхан Аруху.',
      obligations: 'Последнее время для выполнения библейской обязанности чтения утреннего Шма в надлежащее время.',
      calculation: 'Рассчитывается как 3 пропорциональных часа после восхода солнца.'
    },
    tefillahGra: {
      description: 'Крайний срок для утренней молитвы (Амида) согласно Виленскому Гаону (Гра).',
      obligations: 'Последнее время для молитвы Шахарит (Амида) с получением основной награды за молитву.',
      calculation: 'Рассчитывается как 4 пропорциональных часа после восхода солнца.'
    },
    chatzos: {
      description: 'Хацот (Полдень). Точная середина светового дня.',
      obligations: 'Самое раннее время для дневной молитвы Минха (Минха Гедола). В дни постов в это время ослабляются ограничения.',
      calculation: 'Рассчитывается ровно через 6 пропорциональных часов после восхода солнца.'
    },
    minchaGedolah: {
      description: 'Самое раннее время дня, когда разрешено читать дневную молитву (Минха).',
      obligations: 'Самое раннее допустимое время для молитвы Минха.',
      calculation: 'Рассчитывается через 6.5 пропорциональных часов после восхода солнца.'
    },
    minchaKetanah: {
      description: 'Предпочтительное и идеальное временное окно для дневной молитвы (Минха).',
      obligations: 'Настоятельно рекомендуемое время для Минхи, соответствующее ежедневному вечернему жертвоприношению в Храме.',
      calculation: 'Рассчитывается через 9.5 пропорциональных часов после восхода солнца.'
    },
    plagHamincha: {
      description: 'Плаг Аминха. Точка перехода между поздним вечером и ночью.',
      obligations: 'Самое раннее время для зажигания субботних и праздничных свечей с благословением при особых обстоятельствах.',
      calculation: 'Рассчитывается через 10.75 пропорциональных часов после восхода солнца.'
    },
    shkia: {
      description: 'Шкия (Заход Солнца). Момент, когда солнце полностью скрывается за западным горизонтом.',
      obligations: 'Конец галахического дня. Все дневные заповеди должны быть выполнены до этого времени.',
      calculation: 'Рассчитывается астрономически, когда верхний край солнца опускается ниже местного горизонта.'
    },
    tzeisHakochavim: {
      description: 'Цейс Акохавим (Выход Звезд). Появление трех звезд средней величины на ночном небе.',
      obligations: 'Начало следующего галахического дня. Самое раннее время для Маарива, вечернего Шма и исхода Шаббата.',
      calculation: 'Рассчитывается астрономически, когда солнце находится на 8.5 градусов ниже западного горизонта.'
    }
  }
};
