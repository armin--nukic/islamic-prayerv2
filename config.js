const APP_CONFIG = {
  APP_NAME: "Islamic Prayer Times | Vaktija",
  APP_VERSION: "2.0",
  APP_AUTHOR: "Vaktija",
  DEFAULT_LANGUAGE: "en",

  DEFAULT_LOCATION: {
    name: "Sydney",
    latitude: -33.8688,
    longitude: 151.2093,
    country: "Australia",
    timeZone: "Australia/Sydney",
  },

  // Let AlAdhan choose the closest available authority for the coordinates.
  PRAYER_METHOD: null,
  FIQH_METHOD: 0,

  FEATURES: {
    geolocation: true,
    locationSearch: true,
    hadith: true,
    islamicCalendar: true,
    serviceWorker: true,
    darkMode: true,
  },

  APIS: {
    prayerTimes: "https://api.aladhan.com/v1/timings",
    geocoding: "https://nominatim.openstreetmap.org/search",
    reverseGeocoding: "https://nominatim.openstreetmap.org/reverse",
  },

  LANGUAGES: {
    en: { name: "English", nativeName: "English", dir: "ltr" },
    bs: { name: "Bosnian", nativeName: "Bosanski", dir: "ltr" },
    ar: { name: "Arabic", nativeName: "العربية", dir: "rtl" },
  },

  PRAYER_NAMES: {
    fajr: { en: "Fajr", ar: "الفجر", bs: "Sabah" },
    sunrise: { en: "Sunrise", ar: "الشروق", bs: "Izlazak sunca" },
    dhuhr: { en: "Dhuhr", ar: "الظهر", bs: "Podne" },
    asr: { en: "Asr", ar: "العصر", bs: "Ikindija" },
    maghrib: { en: "Maghrib", ar: "المغرب", bs: "Akšam" },
    isha: { en: "Isha", ar: "العشاء", bs: "Jacija" },
  },

  ISLAMIC_MONTHS: {
    1: { en: "Muharram", bs: "Muharrem", ar: "محرم" },
    2: { en: "Safar", bs: "Safer", ar: "صفر" },
    3: { en: "Rabi' al-Awwal", bs: "Rebiul-evvel", ar: "ربيع الأول" },
    4: { en: "Rabi' al-Thani", bs: "Rebiul-ahir", ar: "ربيع الآخر" },
    5: { en: "Jumada al-Awwal", bs: "Džumadel-ula", ar: "جمادى الأولى" },
    6: { en: "Jumada al-Thani", bs: "Džumadel-uhra", ar: "جمادى الآخرة" },
    7: { en: "Rajab", bs: "Redžeb", ar: "رجب" },
    8: { en: "Sha'ban", bs: "Ša'ban", ar: "شعبان" },
    9: { en: "Ramadan", bs: "Ramazan", ar: "رمضان" },
    10: { en: "Shawwal", bs: "Ševval", ar: "شوال" },
    11: { en: "Dhu al-Qi'dah", bs: "Zul-ka'de", ar: "ذو القعدة" },
    12: { en: "Dhu al-Hijjah", bs: "Zul-Hidždže", ar: "ذو الحجة" },
  },
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = APP_CONFIG;
}
