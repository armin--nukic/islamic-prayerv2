# Skill: Islamic Prayer Times Vaktija

Use this project skill when maintaining or extending this static Islamic prayer times app.

## Project Shape

- `index.html` contains the app structure.
- `style.css` contains the full responsive design and night mode.
- `script.js` handles search, prayer times, Hijri date, important days, and hadith controls.
- `hadith-data.js` stores English, Arabic, and Bosnian reminders.
- `config.js` stores app settings, default location, APIs, and calculation method.
- `assets/logo.svg` is the app logo.

## Design Rules

- Keep the app bilingual in English and Bosnian.
- Keep mobile layout first-class.
- Preserve night mode.
- Keep city search working for common searches such as `Berlin`.
- Use readable Islamic calendar labels:
  - Dhu al-Hijjah in English
  - Zul-Hidždže in Bosnian
  - Ashura / Ašura
  - Eid al-Fitr / Ramazanski bajram
  - Eid al-Adha / Kurban-bajram

## Testing Checklist

After changes, verify:

- The page loads without console errors.
- Prayer cards render for the default city.
- Searching `Berlin` updates the location and prayer times.
- Night mode toggles and persists.
- Important Islamic days render.
- The page remains usable below 390px wide.

## Deployment

This is a static app. There is no build step. See `DEPLOY.md` for static hosting and `DEPLOY-VPS.md` for VPS hosting.
