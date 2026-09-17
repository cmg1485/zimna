
export type AstronomicalEventName =
  | 'alosHashachar'
  | 'netzHachamah'
  | 'shemaMA'
  | 'shemaGra'
  | 'tefillahGra'
  | 'chatzos'
  | 'minchaGedolah'
  | 'minchaKetanah'
  | 'plagHamincha'
  | 'shkia'
  | 'tzeisHakochavim';

export const ALARM_EVENT_NAMES: AstronomicalEventName[] = [
  'alosHashachar',
  'netzHachamah',
  'shemaMA',
  'shemaGra',
  'tefillahGra',
  'chatzos',
  'minchaGedolah',
  'minchaKetanah',
  'plagHamincha',
  'shkia',
  'tzeisHakochavim',
];

export interface AlarmSetting {
  enabled: boolean;
  advanceMinutes: number;
}

export type AlarmSettings = Record<AstronomicalEventName, AlarmSetting>;

export interface RingingAlarm {
  eventName: AstronomicalEventName;
  eventTime: Date;
}

export interface SnoozedAlarm extends RingingAlarm {
  snoozedUntil: Date;
}

export type SunCalcResult = Record<AstronomicalEventName, Date>;

export const EVENT_DISPLAY_NAMES: Record<AstronomicalEventName, string> = {
  alosHashachar: 'Alos Hashachar',
  netzHachamah: 'Netz Hachamah',
  shemaMA: 'Sof Zman Shema (M"A)',
  shemaGra: 'Sof Zman Shema (Gra)',
  tefillahGra: 'Sof Zman Tefillah (Gra)',
  chatzos: 'Chatzos (Midday)',
  minchaGedolah: 'Mincha Gedolah',
  minchaKetanah: 'Mincha Ketanah',
  plagHamincha: 'Plag Hamincha',
  shkia: 'Shkia (Sunset)',
  tzeisHakochavim: 'Tzeis Hakochavim',
};

export const EVENT_HEBREW_NAMES: Record<AstronomicalEventName, string> = {
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
};

export interface ZmanDetail {
  description: string;
  obligations: string;
  calculation: string;
}

export const EVENT_DETAILS: Record<AstronomicalEventName, ZmanDetail> = {
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
};

export const ADVANCE_MINUTES_OPTIONS = [0, 5, 10, 15, 20, 30, 45, 60];

export const DEFAULT_ALARM_SETTINGS: AlarmSettings = {
  alosHashachar: { enabled: false, advanceMinutes: 10 },
  netzHachamah: { enabled: false, advanceMinutes: 15 },
  shemaMA: { enabled: false, advanceMinutes: 15 },
  shemaGra: { enabled: false, advanceMinutes: 15 },
  tefillahGra: { enabled: false, advanceMinutes: 15 },
  chatzos: { enabled: false, advanceMinutes: 10 },
  minchaGedolah: { enabled: false, advanceMinutes: 5 },
  minchaKetanah: { enabled: false, advanceMinutes: 10 },
  plagHamincha: { enabled: false, advanceMinutes: 10 },
  shkia: { enabled: false, advanceMinutes: 15 },
  tzeisHakochavim: { enabled: false, advanceMinutes: 5 },
};


