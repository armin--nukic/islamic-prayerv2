# Islamic Prayer Times | Vaktija

A mobile-friendly Islamic prayer times web app in English and Bosnian. It shows today's salah times for any searched city, the current Hijri date, important Islamic calendar days, and daily hadith/Quran reminders.

## Features

- Search prayer times by city, for example `Berlin`, `Sarajevo`, or `London`
- Optional browser geolocation
- English and Bosnian prayer labels
- Hijri date with English, Bosnian, and Arabic month names
- Important Islamic days:
  - Islamic New Year / Hidžretska nova godina
  - Ashura / Ašura
  - Ramadan / Ramazan
  - Eid al-Fitr / Ramazanski bajram
  - Dhu al-Hijjah / Zul-Hidždže
  - Day of Arafah / Dan Arefata
  - Eid al-Adha / Kurban-bajram
- Daily hadith/Quran reminders in English, Arabic, and Bosnian
- Night mode with saved preference
- PWA manifest and service worker
- Static deployment, no build step required

## SEO and Domain Ideas

Recommended app name:

```text
Islamic Prayer Vaktija
```

Good domain ideas to check:

- `islamicprayervaktija.com`
- `myvaktija.com`
- `dailyvaktija.com`
- `salahtime.app`
- `vaktija.app`
- `prayer.ba`
- `namaztime.app`

SEO focus keywords:

- Islamic prayer times
- prayer times by city
- Hijri date today
- Islamic calendar
- daily hadith
- Bosnian vaktija
- Berlin prayer times

## Tech Stack

- HTML, CSS, and vanilla JavaScript
- Prayer times: [Aladhan API](https://aladhan.com/prayer-times-api)
- City search: [OpenStreetMap Nominatim](https://nominatim.org/)
- Fonts: Inter and Amiri

## Local Use

Open `index.html` directly in a browser, or run any static file server from the project directory:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Configuration

Edit `config.js` to change:

- default city
- prayer calculation method
- fiqh school
- feature toggles
- API endpoints

The default location is Sarajevo. Searching `Berlin` should update the page to Berlin prayer times and the current date.

## Notes

Hijri dates and important day estimates can vary by local moon sighting and official Islamic authority. The app displays estimated Gregorian dates based on the current Hijri date returned by the prayer time API.
