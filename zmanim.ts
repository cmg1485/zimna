import SunCalc from 'suncalc';

// Register custom sun angles for Alos Hashachar and Tzeis Hakochavim
try {
  // Alos Hashachar is 16.1 degrees below the horizon (dawn)
  SunCalc.addTime(-16.1, 'alos161', 'tzeis161');
  // Tzeis Hakochavim is 8.5 degrees below the horizon (nightfall/three stars)
  SunCalc.addTime(-8.5, 'alos85', 'tzeis85');
} catch (error) {
  console.error("Failed to add custom SunCalc angles:", error);
}

export function calculateZmanim(date: Date, lat: number, lon: number) {
  const sunTimes = SunCalc.getTimes(date, lat, lon);

  const sunrise = sunTimes.sunrise;
  const sunset = sunTimes.sunset;

  // Alos Hashachar (16.1 degrees below horizon)
  // Fallback to 72 minutes before sunrise if SunCalc doesn't return a valid date
  let alosHashachar = (sunTimes as any).alos161;
  if (!(alosHashachar instanceof Date) || isNaN(alosHashachar.getTime())) {
    alosHashachar = new Date(sunrise.getTime() - 72 * 60 * 1000);
  }

  // Tzeis Hakochavim (8.5 degrees below horizon)
  // Fallback to 42 minutes after sunset
  let tzeisHakochavim = (sunTimes as any).tzeis85;
  if (!(tzeisHakochavim instanceof Date) || isNaN(tzeisHakochavim.getTime())) {
    tzeisHakochavim = new Date(sunset.getTime() + 42 * 60 * 1000);
  }

  // Gra Calculations (Sunrise to Sunset)
  const dayLengthGra = sunset.getTime() - sunrise.getTime();
  const shachahZmanisGra = dayLengthGra / 12;

  const shemaGra = new Date(sunrise.getTime() + 3 * shachahZmanisGra);
  const tefillahGra = new Date(sunrise.getTime() + 4 * shachahZmanisGra);
  const chatzos = new Date(sunrise.getTime() + 6 * shachahZmanisGra); // exactly Solar Noon
  const minchaGedolah = new Date(sunrise.getTime() + 6.5 * shachahZmanisGra);
  const minchaKetanah = new Date(sunrise.getTime() + 9.5 * shachahZmanisGra);
  const plagHamincha = new Date(sunrise.getTime() + 10.75 * shachahZmanisGra);

  // Magen Avraham Calculations (Alos Hashachar to Tzeis Hakochavim)
  const dayLengthMA = tzeisHakochavim.getTime() - alosHashachar.getTime();
  const shachahZmanisMA = dayLengthMA / 12;
  const shemaMA = new Date(alosHashachar.getTime() + 3 * shachahZmanisMA);

  return {
    alosHashachar,
    netzHachamah: sunrise,
    shemaMA,
    shemaGra,
    tefillahGra,
    chatzos,
    minchaGedolah,
    minchaKetanah,
    plagHamincha,
    shkia: sunset,
    tzeisHakochavim
  };
}
