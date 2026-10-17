let currentPrayerTimes = null;
let currentIslamicDate = null;
let currentGregorianDate = null;
let currentTimeZone = APP_CONFIG.DEFAULT_LOCATION.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;
let currentHadithIndex = 0;
let currentLanguage = "en";
let locationRequestId = 0;
const LOCATION_STORAGE_KEY = "selected-vaktija-location";

const i18n = {
  en: {
    appEyebrow: "English + Bosnian",
    heroTitle: "Prayer times with a calm daily rhythm.",
    heroText:
      "Search any city, including Berlin, and get today's salah times, Hijri date, important Islamic days, and daily reminders.",
    cityLabel: "City",
    cityPlaceholder: "Search city, e.g. Sydney, Australia",
    search: "Search",
    gps: "Use my location",
    today: "Today",
    hijriToday: "Hijri today",
    vaktijaEyebrow: "Today's Vaktija",
    prayerTitle: "Prayer Times",
    loading: "Loading prayer times...",
    hijriEyebrow: "Hijri Calendar",
    hijriTitle: "Islamic Date",
    moonNote: "Dates can differ by moon sighting and local authority.",
    daysEyebrow: "Important Days",
    daysTitle: "Islamic Calendar Highlights",
    reminderEyebrow: "Daily Reminder",
    reminderTitle: "Hadith and Quran",
    footerNote: "Prayer times are calculated by location. May Allah accept from us and from you.",
    next: "Next",
    nextPrayer: "Next prayer",
    enterFullscreen: "Enter full screen",
    exitFullscreen: "Exit full screen",
    nextIn: "Next in",
    approx: "Approx.",
    afterLoad: "After prayer times load",
    enterCity: "Please enter a city name, for example Berlin.",
    geoUnsupported: "Geolocation is not supported by this browser.",
    geoFailed: "Location permission was not available. Please search by city.",
    cityFailed: "City search failed.",
    notFound: "Location not found. Try another city name.",
    prayerFailed: "Prayer time service is not available.",
    invalidPrayer: "Invalid prayer time response.",
  },
  bs: {
    appEyebrow: "Engleski + Bosanski",
    heroTitle: "Vaktija s mirnim dnevnim ritmom.",
    heroText:
      "Pretra\u017ei bilo koji grad, uklju\u010duju\u0107i Berlin, i dobij dana\u0161nja vremena namaza, hid\u017eretski datum, va\u017ene islamske dane i dnevne podsjetnike.",
    cityLabel: "Grad",
    cityPlaceholder: "Berlin, Sarajevo, London...",
    search: "Pretra\u017ei",
    gps: "Koristi moju lokaciju",
    today: "Danas",
    hijriToday: "Hid\u017eretski danas",
    vaktijaEyebrow: "Dana\u0161nja vaktija",
    prayerTitle: "Vremena namaza",
    loading: "U\u010ditavam vremena namaza...",
    hijriEyebrow: "Hid\u017eretski kalendar",
    hijriTitle: "Islamski datum",
    moonNote: "Datumi se mogu razlikovati prema vi\u0111enju mla\u0111aka i lokalnoj zajednici.",
    daysEyebrow: "Va\u017eni dani",
    daysTitle: "Istaknuti dani islamskog kalendara",
    reminderEyebrow: "Dnevni podsjetnik",
    reminderTitle: "Hadis i Kur'an",
    footerNote: "Vremena namaza se ra\u010dunaju prema lokaciji. Neka Allah primi od nas i od vas.",
    next: "Sljede\u0107i",
    nextPrayer: "Sljede\u0107i namaz",
    enterFullscreen: "Uklju\u010di puni ekran",
    exitFullscreen: "Iza\u0111i iz punog ekrana",
    nextIn: "Sljede\u0107i za",
    approx: "Oko",
    afterLoad: "Nakon u\u010ditavanja vaktije",
    enterCity: "Unesi naziv grada, naprimjer Berlin.",
    geoUnsupported: "Geolokacija nije podr\u017eana u ovom browseru.",
    geoFailed: "Lokacija nije dostupna. Pretra\u017ei grad ru\u010dno.",
    cityFailed: "Pretraga grada nije uspjela.",
    notFound: "Lokacija nije prona\u0111ena. Poku\u0161aj drugi grad.",
    prayerFailed: "Servis za vremena namaza trenutno nije dostupan.",
    invalidPrayer: "Neispravan odgovor servisa za vaktiju.",
  },
};

const prayerItems = [
  { apiKey: "Fajr", en: "Fajr", bs: "Sabah", ar: "\u0627\u0644\u0641\u062c\u0631", icon: "fa-sun" },
  { apiKey: "Sunrise", en: "Sunrise", bs: "Izlazak sunca", ar: "\u0627\u0644\u0634\u0631\u0648\u0642", icon: "fa-cloud-sun" },
  { apiKey: "Dhuhr", en: "Dhuhr", bs: "Podne", ar: "\u0627\u0644\u0638\u0647\u0631", icon: "fa-sun" },
  { apiKey: "Asr", en: "Asr", bs: "Ikindija", ar: "\u0627\u0644\u0639\u0635\u0631", icon: "fa-cloud" },
  { apiKey: "Maghrib", en: "Maghrib", bs: "Ak\u0161am", ar: "\u0627\u0644\u0645\u063a\u0631\u0628", icon: "fa-moon" },
  { apiKey: "Isha", en: "Isha", bs: "Jacija", ar: "\u0627\u0644\u0639\u0634\u0627\u0621", icon: "fa-star" },
];

const islamicMonths = [
  { en: "Muharram", bs: "Muharrem", ar: "\u0645\u062d\u0631\u0645" },
  { en: "Safar", bs: "Safer", ar: "\u0635\u0641\u0631" },
  { en: "Rabi' al-Awwal", bs: "Rebiul-evvel", ar: "\u0631\u0628\u064a\u0639 \u0627\u0644\u0623\u0648\u0644" },
  { en: "Rabi' al-Thani", bs: "Rebiul-ahir", ar: "\u0631\u0628\u064a\u0639 \u0627\u0644\u0622\u062e\u0631" },
  { en: "Jumada al-Awwal", bs: "D\u017eumadel-ula", ar: "\u062c\u0645\u0627\u062f\u0649 \u0627\u0644\u0623\u0648\u0644\u0649" },
  { en: "Jumada al-Thani", bs: "D\u017eumadel-uhra", ar: "\u062c\u0645\u0627\u062f\u0649 \u0627\u0644\u0622\u062e\u0631\u0629" },
  { en: "Rajab", bs: "Red\u017eeb", ar: "\u0631\u062c\u0628" },
  { en: "Sha'ban", bs: "\u0160a'ban", ar: "\u0634\u0639\u0628\u0627\u0646" },
  { en: "Ramadan", bs: "Ramazan", ar: "\u0631\u0645\u0636\u0627\u0646" },
  { en: "Shawwal", bs: "\u0160evval", ar: "\u0634\u0648\u0627\u0644" },
  { en: "Dhu al-Qi'dah", bs: "Zul-ka'de", ar: "\u0630\u0648 \u0627\u0644\u0642\u0639\u062f\u0629" },
  { en: "Dhu al-Hijjah", bs: "Zul-Hid\u017ed\u017ee", ar: "\u0630\u0648 \u0627\u0644\u062d\u062c\u0629" },
];

const importantDays = [
  {
    month: 1,
    day: 1,
    en: "Islamic New Year",
    bs: "Hid\u017eretska nova godina",
    noteEn: "The first day of Muharram and the beginning of a new Hijri year.",
    noteBs: "Prvi dan Muharrema i po\u010detak nove hid\u017eretske godine.",
  },
  {
    month: 1,
    day: 10,
    en: "Ashura",
    bs: "A\u0161ura",
    noteEn: "The 10th of Muharram, a day connected with fasting and remembrance.",
    noteBs: "Deseti dan Muharrema, vezan za post i podsje\u0107anje.",
  },
  {
    month: 9,
    day: 1,
    en: "Ramadan Begins",
    bs: "Po\u010detak Ramazana",
    noteEn: "The blessed month of fasting, Quran, prayer, and charity.",
    noteBs: "Mubarek mjesec posta, Kur'ana, namaza i dobro\u010dinstva.",
  },
  {
    month: 10,
    day: 1,
    en: "Eid al-Fitr",
    bs: "Ramazanski bajram",
    noteEn: "The Eid after Ramadan.",
    noteBs: "Bajram nakon mjeseca Ramazana.",
  },
  {
    month: 12,
    day: 1,
    en: "Dhu al-Hijjah Begins",
    bs: "Po\u010detak Zul-Hid\u017ed\u017eeta",
    noteEn: "The first ten days of Dhu al-Hijjah are among the most blessed days.",
    noteBs: "Prvih deset dana Zul-Hid\u017ed\u017eeta spadaju me\u0111u najodabranije dane.",
  },
  {
    month: 12,
    day: 9,
    en: "Day of Arafah",
    bs: "Dan Arefata",
    noteEn: "The 9th of Dhu al-Hijjah, a major day of dua and worship.",
    noteBs: "Deveti dan Zul-Hid\u017ed\u017eeta, veliki dan dove i ibadeta.",
  },
  {
    month: 12,
    day: 10,
    en: "Eid al-Adha",
    bs: "Kurban-bajram",
    noteEn: "The Eid of sacrifice during the Hajj season.",
    noteBs: "Bajram kurbana u danima had\u017ea.",
  },
];

const knownLocations = {
  sydney: { name: "Sydney, Australia", latitude: -33.8688, longitude: 151.2093 },
  berlin: { name: "Berlin, Germany", latitude: 52.52, longitude: 13.405 },
  sarajevo: { name: "Sarajevo, Bosnia and Herzegovina", latitude: 43.9159, longitude: 18.4131 },
  london: { name: "London, United Kingdom", latitude: 51.5072, longitude: -0.1276 },
  vienna: { name: "Vienna, Austria", latitude: 48.2082, longitude: 16.3738 },
  wien: { name: "Vienna, Austria", latitude: 48.2082, longitude: 16.3738 },
  zagreb: { name: "Zagreb, Croatia", latitude: 45.815, longitude: 15.9819 },
};

document.addEventListener("DOMContentLoaded", () => {
  setupTheme();
  setupEvents();
  displayCurrentDate();
  displayHadithOfDay();
  displayImportantDays();
  applyLanguage(localStorage.getItem("language") || APP_CONFIG.DEFAULT_LANGUAGE || "en");

  const savedLocation = loadSavedLocation();
  if (savedLocation) {
    locationRequestId += 1;
    currentTimeZone = savedLocation.timeZone || currentTimeZone;
    setLocationName(savedLocation.name);
    fetchPrayerTimes(savedLocation.latitude, savedLocation.longitude);
  } else {
    initializeLocation();
  }

  setInterval(updatePrayerHighlight, 30000);
});

function setupTheme() {
  const darkBtn = document.getElementById("toggleDarkMode");
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const shouldUseDark = saved ? saved === "dark" : prefersDark;

  document.body.classList.toggle("dark-mode", shouldUseDark);
  updateThemeButton();

  darkBtn?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
    updateThemeButton();
  });
}

function updateThemeButton() {
  const darkBtn = document.getElementById("toggleDarkMode");
  if (!darkBtn) return;
  const isDark = document.body.classList.contains("dark-mode");
  darkBtn.innerHTML = `
    <span class="theme-track" aria-hidden="true">
      <span class="theme-thumb"><i class="fa-solid ${isDark ? "fa-sun" : "fa-moon"}"></i></span>
    </span>
    <span>${isDark ? "Light" : "Night"}</span>
  `;
  darkBtn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to night mode");
}

function setupEvents() {
  const verticalButton = document.getElementById("toggleVerticalMode");
  if (verticalButton) {
    setVerticalMode(localStorage.getItem("verticalMode") === "true", false);
    verticalButton.addEventListener("click", () => {
      setVerticalMode(!document.body.classList.contains("vertical-mode"));
    });
  }

  const fullscreenButton = document.getElementById("toggleFullscreen");
  if (fullscreenButton) {
    if (!document.fullscreenEnabled || !document.documentElement.requestFullscreen) {
      fullscreenButton.hidden = true;
    } else {
      fullscreenButton.addEventListener("click", async () => {
        try {
          if (document.fullscreenElement) await document.exitFullscreen();
          else await document.documentElement.requestFullscreen();
        } catch (error) {
          console.warn("Full screen mode is unavailable", error);
        }
      });
      document.addEventListener("fullscreenchange", () => {
        const fullscreen = Boolean(document.fullscreenElement);
        document.body.classList.toggle("fullscreen-mode", fullscreen);
        fullscreenButton.innerHTML = `<i class="fa-solid ${fullscreen ? "fa-compress" : "fa-expand"}" aria-hidden="true"></i>`;
        fullscreenButton.setAttribute("aria-label", t(fullscreen ? "exitFullscreen" : "enterFullscreen"));
        fullscreenButton.title = t(fullscreen ? "exitFullscreen" : "enterFullscreen");
      });
      fullscreenButton.setAttribute("aria-label", t("enterFullscreen"));
      fullscreenButton.title = t("enterFullscreen");
    }
  }

  document.getElementById("locationForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    handleLocationSearch();
  });
  document.getElementById("gpsBtn")?.addEventListener("click", handleGeolocation);
  document.getElementById("nextHadithBtn")?.addEventListener("click", nextHadith);
  document.getElementById("prevHadithBtn")?.addEventListener("click", previousHadith);
  document.getElementById("randomHadithBtn")?.addEventListener("click", randomHadith);
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.lang));
  });
}

function setVerticalMode(enabled, persist = true) {
  const verticalButton = document.getElementById("toggleVerticalMode");
  document.body.classList.toggle("vertical-mode", enabled);
  if (persist) localStorage.setItem("verticalMode", String(enabled));
  verticalButton?.setAttribute("aria-pressed", String(enabled));
  verticalButton?.classList.toggle("active", enabled);
  if (verticalButton) {
    verticalButton.innerHTML = `<i class="fa-solid ${enabled ? "fa-tv" : "fa-mobile-screen-button"}" aria-hidden="true"></i><span>${enabled ? "Horizontal" : "Vertical"}</span>`;
    verticalButton.setAttribute("aria-label", enabled ? "Switch to horizontal layout" : "Switch to vertical layout");
    verticalButton.title = enabled ? "Switch to horizontal layout" : "Switch to vertical layout";
  }
}

function loadSavedLocation() {
  try {
    const saved = JSON.parse(localStorage.getItem(LOCATION_STORAGE_KEY) || "null");
    if (!saved || typeof saved.name !== "string") return null;
    if (!Number.isFinite(Number(saved.latitude)) || !Number.isFinite(Number(saved.longitude))) return null;
    return { ...saved, latitude: Number(saved.latitude), longitude: Number(saved.longitude) };
  } catch {
    return null;
  }
}

function saveSelectedLocation(name, latitude, longitude) {
  const current = loadSavedLocation();
  const saved = {
    name: name || current?.name || "Current location",
    latitude: Number(latitude),
    longitude: Number(longitude),
    timeZone: current?.latitude === Number(latitude) && current?.longitude === Number(longitude)
      ? current.timeZone
      : null,
  };
  try {
    localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(saved));
  } catch {
    // The current selection still works for this session if storage is unavailable.
  }
}

function initializeLocation() {
  const fallback = APP_CONFIG.DEFAULT_LOCATION;
  const requestId = ++locationRequestId;
  const useFallback = () => {
    if (requestId !== locationRequestId) return;
    currentTimeZone = fallback.timeZone || currentTimeZone;
    setLocationName(`${fallback.name}, ${fallback.country}`);
    fetchPrayerTimes(fallback.latitude, fallback.longitude);
  };

  if (!APP_CONFIG.FEATURES.geolocation || !navigator.geolocation) {
    useFallback();
    return;
  }

  setLocationName("Finding your location...");
  navigator.geolocation.getCurrentPosition(
    (position) => {
      if (requestId !== locationRequestId) return;
      const { latitude, longitude } = position.coords;
      saveSelectedLocation("Current location", latitude, longitude);
      setLocationName("Current location");
      fetchPrayerTimes(latitude, longitude);
      reverseGeocode(latitude, longitude, requestId);
    },
    useFallback,
    { timeout: 9000, maximumAge: 24 * 60 * 60 * 1000, enableHighAccuracy: false },
  );
}

function applyLanguage(language) {
  currentLanguage = language === "bs" ? "bs" : "en";
  localStorage.setItem("language", currentLanguage);
  document.documentElement.lang = currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
  });
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === currentLanguage);
    button.setAttribute("aria-pressed", String(button.dataset.lang === currentLanguage));
  });
  const fullscreenButton = document.getElementById("toggleFullscreen");
  if (fullscreenButton && !fullscreenButton.hidden) {
    const fullscreenLabel = t(document.fullscreenElement ? "exitFullscreen" : "enterFullscreen");
    fullscreenButton.setAttribute("aria-label", fullscreenLabel);
    fullscreenButton.title = fullscreenLabel;
  }

  displayCurrentDate();
  if (currentIslamicDate) displayIslamicDate(currentIslamicDate, currentGregorianDate);
  if (currentPrayerTimes) displayPrayerTimes(currentPrayerTimes);
  displayImportantDays(currentIslamicDate);
}

function displayCurrentDate() {
  const today = new Date();
  const locale = currentLanguage === "bs" ? "bs-BA" : "en-GB";
  const dateText = new Intl.DateTimeFormat(locale, {
    timeZone: currentTimeZone,
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(today);

  document.getElementById("todayGregorian").textContent = dateText;
  document.getElementById("heroGregorianDate").textContent = dateText;
}

function handleLocationSearch() {
  const locationInput = document.getElementById("locationInput");
  const location = locationInput.value.trim();
  if (!location) {
    showError(t("enterCity"));
    return;
  }
  geocodeLocation(location);
}

function handleGeolocation() {
  if (!navigator.geolocation) {
    showError(t("geoUnsupported"));
    return;
  }

  const requestId = ++locationRequestId;
  showLoading(true);
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      saveSelectedLocation("Current location", latitude, longitude);
      setLocationName("Current location");
      fetchPrayerTimes(latitude, longitude);
      reverseGeocode(latitude, longitude, requestId);
    },
    () => {
      if (requestId !== locationRequestId) return;
      showLoading(false);
      showError(t("geoFailed"));
    },
    { timeout: 9000, enableHighAccuracy: false },
  );
}

function geocodeLocation(locationName) {
  const requestId = ++locationRequestId;
  const normalizedLocation = locationName.trim().toLowerCase();
  const known = knownLocations[normalizedLocation] || knownLocations[normalizedLocation.split(",")[0].trim()];
  if (known) {
    showLoading(true);
    saveSelectedLocation(known.name, known.latitude, known.longitude);
    setLocationName(known.name);
    document.getElementById("locationInput").value = "";
    fetchPrayerTimes(known.latitude, known.longitude);
    return;
  }

  showLoading(true);
  const url = `${APP_CONFIG.APIS.geocoding}?q=${encodeURIComponent(locationName)}&format=json&limit=1&addressdetails=1&accept-language=en`;

  fetch(url, { headers: { Accept: "application/json" } })
    .then((response) => {
      if (!response.ok) throw new Error(t("cityFailed"));
      return response.json();
    })
    .then((data) => {
      if (requestId !== locationRequestId) return;
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error(t("notFound"));
      }
      const result = data[0];
      const displayName = formatPlaceName(result);
      saveSelectedLocation(displayName, result.lat, result.lon);
      setLocationName(displayName);
      document.getElementById("locationInput").value = "";
      fetchPrayerTimes(result.lat, result.lon);
    })
    .catch((error) => {
      if (requestId !== locationRequestId) return;
      showLoading(false);
      showError(error.message);
    });
}

function reverseGeocode(lat, lon, requestId = locationRequestId) {
  const url = `${APP_CONFIG.APIS.reverseGeocoding}?format=json&lat=${lat}&lon=${lon}&addressdetails=1&accept-language=en`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (requestId !== locationRequestId) return;
      const displayName = formatPlaceName(data);
      saveSelectedLocation(displayName, lat, lon);
      setLocationName(displayName);
    })
    .catch(() => {
      if (requestId === locationRequestId) setLocationName("Current location");
    });
}

function fetchPrayerTimes(latitude, longitude, requestId = locationRequestId) {
  showLoading(true);
  const method = APP_CONFIG.PRAYER_METHOD;
  const school = APP_CONFIG.FIQH_METHOD;
  const params = new URLSearchParams({ latitude: String(latitude), longitude: String(longitude), school: String(school) });
  if (method !== null && method !== undefined) params.set("method", String(method));
  const url = `${APP_CONFIG.APIS.prayerTimes}?${params}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(t("prayerFailed"));
      return response.json();
    })
    .then((data) => {
      if (requestId !== locationRequestId) return;
      if (!data || data.code !== 200) throw new Error(t("invalidPrayer"));
      currentPrayerTimes = data.data.timings;
      currentIslamicDate = data.data.date.hijri;
      currentGregorianDate = data.data.date.gregorian;
      currentTimeZone = data.data.meta?.timezone || currentTimeZone;
      const selected = loadSavedLocation();
      if (selected?.latitude === Number(latitude) && selected?.longitude === Number(longitude)) {
        selected.timeZone = currentTimeZone;
        try {
          localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(selected));
        } catch {
          // Keep this session working if storage is unavailable.
        }
      }
      displayCurrentDate();
      displayPrayerTimes(currentPrayerTimes);
      displayIslamicDate(currentIslamicDate, currentGregorianDate);
      displayImportantDays(currentIslamicDate);
      showLoading(false);
    })
    .catch((error) => {
      if (requestId !== locationRequestId) return;
      showLoading(false);
      showError(error.message);
    });
}

function displayPrayerTimes(timings) {
  const container = document.getElementById("prayerTimesContainer");
  container.innerHTML = "";

  prayerItems.forEach((prayer) => {
    const time = cleanTime(timings[prayer.apiKey]);
    const card = document.createElement("article");
    card.className = "prayer-card";
    card.id = `prayer-${prayer.apiKey.toLowerCase()}`;
    card.innerHTML = `
      <div>
        <div class="prayer-name">
          <i class="fa-solid ${prayer.icon}"></i>
          ${currentLanguage === "bs" ? prayer.bs : prayer.en}
          <span class="prayer-bosnian">${currentLanguage === "bs" ? prayer.en : prayer.bs}</span>
        </div>
      </div>
      <div class="prayer-time">${time}</div>
      <div class="prayer-arabic">${prayer.ar}</div>
    `;
    container.appendChild(card);
  });

  updatePrayerHighlight();
}

function updatePrayerHighlight() {
  if (!currentPrayerTimes) return;

  document.querySelectorAll(".prayer-card").forEach((card) => {
    card.classList.remove("active");
    card.querySelector(".prayer-countdown")?.remove();
  });

  const now = new Date();
  const nextPrayer = prayerItems
    .filter((prayer) => prayer.apiKey !== "Sunrise")
    .map((prayer) => {
      const time = cleanTime(currentPrayerTimes[prayer.apiKey]);
      return { ...prayer, time, target: getPrayerTargetDate(time) };
    })
    .find((prayer) => prayer.target > now) || {
      ...prayerItems[0],
      time: cleanTime(currentPrayerTimes.Fajr),
      tomorrow: true,
      target: getPrayerTargetDate(cleanTime(currentPrayerTimes.Fajr), 1),
    };

  const card = document.getElementById(`prayer-${nextPrayer.apiKey.toLowerCase()}`);
  if (!card) return;
  const nextPrayerName = currentLanguage === "bs" ? nextPrayer.bs : nextPrayer.en;
  document.getElementById("tvNextPrayer").textContent = nextPrayerName;
  document.getElementById("tvNextCountdown").textContent = `${t("nextIn")} ${calculateCountdown(nextPrayer.time, nextPrayer.tomorrow)}`;
  card.classList.add("active");
  card.dataset.nextLabel = t("next");
  const countdown = document.createElement("div");
  countdown.className = "prayer-countdown";
  countdown.textContent = `${t("nextIn")} ${calculateCountdown(nextPrayer.time, nextPrayer.tomorrow)}`;
  card.appendChild(countdown);
}

function displayIslamicDate(hijriDate, gregorianDate) {
  const container = document.getElementById("islamicDateContainer");
  const month = islamicMonths[Number(hijriDate.month.number) - 1];
  const gregorian = gregorianDate?.date || new Intl.DateTimeFormat("en-GB").format(new Date());
  const hijriMain = currentLanguage === "bs"
    ? `${hijriDate.day}. ${month.bs} ${hijriDate.year}. h.g.`
    : `${hijriDate.day} ${month.en} ${hijriDate.year} AH`;

  document.getElementById("heroHijriDate").textContent = hijriMain;

  container.innerHTML = `
    <div class="date-column featured-date">
      <span>${currentLanguage === "bs" ? "Danas" : "Today"}</span>
      <strong>${hijriMain}</strong>
    </div>
    <div class="date-column">
      <span>English</span>
      <strong>${hijriDate.day} ${month.en} ${hijriDate.year} AH</strong>
    </div>
    <div class="date-column">
      <span>Bosanski</span>
      <strong>${hijriDate.day}. ${month.bs} ${hijriDate.year}. h.g.</strong>
    </div>
    <div class="date-column">
      <span>Arabic</span>
      <strong class="hijri-arabic">${hijriDate.day} ${month.ar} ${hijriDate.year} \u0647\u0640</strong>
    </div>
    <div class="date-column">
      <span>Gregorian</span>
      <strong>${gregorian}</strong>
    </div>
  `;
}

function displayImportantDays(hijriDate = currentIslamicDate) {
  const container = document.getElementById("importantDaysContainer");
  const cards = importantDays.map((day) => {
    const month = islamicMonths[day.month - 1];
    const estimate = hijriDate ? estimateGregorianDate(day, hijriDate) : t("afterLoad");
    return `
      <article class="day-card">
        <span>${day.day} ${currentLanguage === "bs" ? month.bs : month.en}</span>
        <strong>${currentLanguage === "bs" ? day.bs : day.en}</strong>
        <p>${currentLanguage === "bs" ? day.noteBs : day.noteEn}</p>
        <small>${currentLanguage === "bs" ? day.en : day.bs}</small>
        <div class="day-date">${estimate}</div>
      </article>
    `;
  });
  container.innerHTML = cards.join("");
}

function estimateGregorianDate(target, hijriDate) {
  const currentMonth = Number(hijriDate.month.number);
  const currentDay = Number(hijriDate.day);
  let delta = (target.month - currentMonth) * 29.53059 + (target.day - currentDay);
  if (delta < 0) delta += 354.367;
  const date = new Date();
  date.setDate(date.getDate() + Math.round(delta));
  const locale = currentLanguage === "bs" ? "bs-BA" : "en-GB";
  return `${t("approx")} ${new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date)}`;
}

function displayHadithOfDay() {
  displayHadith(getHadithOfDay());
}

function displayHadith(hadith) {
  document.getElementById("hadithEnglish").textContent = hadith.english;
  document.getElementById("hadithArabic").textContent = hadith.arabic;
  document.getElementById("hadithBosnian").textContent = hadith.bosnian;
  currentHadithIndex = hadithData.findIndex((item) => item.id === hadith.id);
}

function nextHadith() {
  currentHadithIndex = (currentHadithIndex + 1) % hadithData.length;
  displayHadith(hadithData[currentHadithIndex]);
}

function previousHadith() {
  currentHadithIndex = (currentHadithIndex - 1 + hadithData.length) % hadithData.length;
  displayHadith(hadithData[currentHadithIndex]);
}

function randomHadith() {
  currentHadithIndex = Math.floor(Math.random() * hadithData.length);
  displayHadith(hadithData[currentHadithIndex]);
}

function setLocationName(name) {
  document.getElementById("locationName").innerHTML = `<i class="fa-solid fa-location-dot"></i> ${escapeHtml(name)}`;
  document.getElementById("tvLocation").textContent = name;
}

function formatPlaceName(result) {
  const address = result.address || {};
  const city = address.city || address.town || address.village || address.municipality || result.name || "Selected location";
  const country = address.country || "";
  const place = country ? `${city}, ${country}` : city;
  return sanitizePlaceName(place);
}

function cleanTime(value) {
  return String(value || "--:--").split(" ")[0];
}

function getZonedDateParts(date, timeZone = currentTimeZone) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const parts = Object.fromEntries(formatter.formatToParts(date).map(({ type, value }) => [type, value]));
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute),
  };
}

function zonedDateTimeToDate(parts, timeZone = currentTimeZone) {
  const desiredUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute);
  let timestamp = desiredUtc;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const actual = getZonedDateParts(new Date(timestamp), timeZone);
    const actualUtc = Date.UTC(actual.year, actual.month - 1, actual.day, actual.hour, actual.minute);
    const adjustment = desiredUtc - actualUtc;
    timestamp += adjustment;
    if (adjustment === 0) break;
  }

  return new Date(timestamp);
}

function getPrayerTargetDate(timeString, dayOffset = 0) {
  const now = getZonedDateParts(new Date());
  const calendarDate = new Date(Date.UTC(now.year, now.month - 1, now.day + dayOffset));
  const [hour, minute] = timeString.split(":").map(Number);
  return zonedDateTimeToDate({
    year: calendarDate.getUTCFullYear(),
    month: calendarDate.getUTCMonth() + 1,
    day: calendarDate.getUTCDate(),
    hour,
    minute,
  });
}

function calculateCountdown(timeString, tomorrow = false) {
  const target = getPrayerTargetDate(timeString, tomorrow ? 1 : 0);
  if (!tomorrow && target < new Date()) return calculateCountdown(timeString, true);
  const diff = Math.max(0, target - new Date());
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

function showLoading(show) {
  const spinner = document.getElementById("loadingSpinner");
  spinner.style.display = show ? "block" : "none";
}

function showError(message) {
  const container = document.getElementById("prayerTimesContainer");
  container.querySelectorAll(".error").forEach((error) => error.remove());
  const error = document.createElement("div");
  error.className = "error";
  error.textContent = message;
  container.prepend(error);
}

function t(key) {
  return i18n[currentLanguage]?.[key] || i18n.en[key] || key;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function sanitizePlaceName(value) {
  const text = String(value || "Selected location").trim();
  const blocked = ["fuck", "nazi", "hitler", "shit", "bitch"];
  if (blocked.some((word) => text.toLowerCase().includes(word))) {
    return "Selected location";
  }
  return text;
}
