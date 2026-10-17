# Islamic Prayer Times App - Quick Start Guide

## 📋 Table of Contents

1. [Installation](#installation)
2. [Getting Started](#getting-started)
3. [Features](#features)
4. [Usage Examples](#usage-examples)
5. [Advanced Configuration](#advanced-configuration)
6. [Troubleshooting](#troubleshooting)

## ⚡ Installation

### Option 1: Direct Installation (Simplest)

1. Download all files to a folder
2. Open `index.html` in your web browser
3. Done! The app is ready to use

### Option 2: Local Web Server (Recommended)

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (npx)
npx http-server

# Using Live Server (VS Code extension)
# Install extension, then right-click index.html and select "Open with Live Server"
```

Then open your browser to `http://localhost:8000`

### Option 3: Upload to Web Hosting

1. Upload all files to your web hosting server
2. Ensure all files are in the same directory
3. Access via your website URL

## 🚀 Getting Started

### First Time Setup

1. **Allow Location Access**
   - When prompted, click "Allow" to share your location
   - This enables automatic prayer time detection
   - You can also manually enter a city name

2. **Select Location Method**
   - Click "Use My Location" for automatic detection
   - Or type a city name and click "Search"

3. **View Prayer Times**
   - Prayer times will automatically display
   - The next prayer is highlighted in green
   - Countdown shows time remaining

4. **Read Hadith**
   - Daily hadith automatically displays below prayer times
   - Available in English, Arabic, and Bosnian
   - Use navigation buttons to browse

## 📱 Features

### Prayer Times

- ✅ Accurate calculation for any location worldwide
- ✅ 6 prayer times daily (Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha)
- ✅ Automatic highlighting of current/next prayer
- ✅ Countdown timer to next prayer
- ✅ Prayer names in Arabic and English

### Hadith Quotes

- ✅ 30 authentic hadith from Islamic sources
- ✅ Translations in English, Arabic, and Bosnian
- ✅ Daily hadith updates at midnight
- ✅ Random hadith feature
- ✅ Navigation with Previous/Next buttons

### Islamic Calendar

- ✅ Hijri (Islamic) date display
- ✅ Islamic month names and numbers
- ✅ Dual language display (English/Arabic)

### User Experience

- ✅ Beautiful Islamic-inspired design
- ✅ Responsive for all devices (mobile, tablet, desktop)
- ✅ Fast loading and smooth animations
- ✅ Offline support (cached content)
- ✅ Progressive Web App (can be installed)

## 💡 Usage Examples

### Example 1: Check Prayer Times in London

```
1. Open the app
2. Type "London" in the location input
3. Click "Search"
4. Prayer times for London display
5. Next prayer is highlighted
6. Countdown shows time remaining
```

**Output Example:**

```
Fajr:    06:25
Sunrise: 08:10
Dhuhr:   12:45
Asr:     15:20
Maghrib: 17:15 ← NEXT PRAYER (15 minutes)
Isha:    18:50
```

### Example 2: View Daily Hadith

```
1. Open the app
2. Scroll to "Daily Hadith" section
3. Read English translation
4. Check Arabic and Bosnian versions
5. Click "Next" to see another hadith
6. Click "Random" for a random quote
```

### Example 3: Install as Mobile App

```
1. Open the app on your mobile browser
2. Look for "Install app" or "Add to home screen"
3. Click install/add
4. App appears on home screen
5. Can be used offline (for cached content)
```

## ⚙️ Advanced Configuration

### Custom Prayer Time Method

Edit `config.js` to change prayer calculation method:

```javascript
// Available methods:
// 1: Ummah Al-Qura University
// 2: Islamic Society of North America
// 3: Muslim World League
// 4: Umm al-Qura University (Default)
// 5: Egyptian General Authority of Survey
// 6: Institut Geografi Departemen Geografi
// 7: Union Organization of Islamic Centers
// 8: Al Shia (Jafari)

APP_CONFIG.PRAYER_METHOD = 2; // Change to method 2
```

### Custom Location

Set a default location in `config.js`:

```javascript
APP_CONFIG.DEFAULT_LOCATION = {
  name: "Istanbul",
  latitude: 41.0082,
  longitude: 28.9784,
  country: "Turkey",
};
```

### Time Format

Change between 24-hour and 12-hour format:

```javascript
APP_CONFIG.TIME_FORMAT = "12h"; // '24h' or '12h'
```

### Adjust Prayer Times

Add or subtract minutes from prayer times:

```javascript
APP_CONFIG.ADJUSTMENT_MINUTES = {
  fajr: -5, // 5 minutes earlier
  sunrise: 0,
  dhuhr: 0,
  asr: 0,
  maghrib: 0,
  isha: 5, // 5 minutes later
};
```

### Add Custom Hadith

Edit `hadith-data.js` to add new hadith:

```javascript
const hadithData = [
  // ... existing hadith ...
  {
    id: 31,
    english: "Your custom hadith in English",
    arabic: "Your custom hadith in Arabic",
    bosnian: "Your custom hadith in Bosnian",
  },
];
```

### Customize Colors

Edit `style.css`:

```css
:root {
  --primary-color: #1a7c5e; /* Main green */
  --secondary-color: #2d9d7a; /* Lighter green */
  --accent-color: #c4a747; /* Gold */
  --dark-bg: #0f3a2f; /* Dark background */
  --light-bg: #f5f5f5; /* Light background */
}
```

## 🆘 Troubleshooting

### Prayer Times Not Loading

**Problem:** "Error fetching prayer times"

**Solutions:**

1. Check internet connection
2. Verify JavaScript is enabled
3. Try a different location
4. Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
5. Try a different browser
6. Check browser console for detailed errors (F12)

```javascript
// Check console for errors:
// Press F12, go to Console tab
// Look for red error messages
```

### Location Not Found

**Problem:** "Location not found. Please try another search."

**Solutions:**

1. Check spelling of city name
2. Try alternate city names:
   - "New York" instead of "NYC"
   - "Cairo" instead of "Al-Qahira"
3. Include country name: "Cairo, Egypt"
4. Use GPS: Click "Use My Location" button
5. Verify location is recognized:
   - Try major cities first (London, Paris, Dubai)

### Geolocation Not Working

**Problem:** GPS/Location permission issues

**Solutions:**

1. Check browser permissions:
   - Chrome: Settings → Privacy → Site Settings → Location
   - Firefox: Preferences → Privacy → Permissions → Location
   - Safari: Preferences → Security → Allow location access

2. Ensure HTTPS (if on web):
   - GPS requires secure connection
   - Localhost (127.0.0.1) is treated as secure

3. Use manual search instead:
   - Type city name in input box
   - Click "Search" button

4. Try different browser

### Hadith Not Displaying

**Problem:** Hadith section is blank or shows errors

**Solutions:**

1. Enable JavaScript
2. Check if hadith-data.js file exists
3. Verify file is in same directory
4. Check browser console for errors
5. Try page refresh (F5 or Cmd+R)

### App Not Responsive (Mobile)

**Problem:** Buttons too small, text not readable

**Solutions:**

1. Zoom in/out appropriately
2. Rotate phone to landscape for better view
3. Update browser to latest version
4. Clear cache and refresh
5. Try a different browser

### Service Worker Issues

**Problem:** "Service Worker registration failed"

**Solutions:**

1. App still works, just no offline mode
2. Ensure site is HTTPS (or localhost)
3. Disable service workers in config:
   ```javascript
   APP_CONFIG.FEATURES.serviceWorker = false;
   ```
4. Check browser console for details

## 🔒 Privacy & Security

- ✅ All data is processed locally
- ✅ No data sent to server (except API calls)
- ✅ Location data only used for prayer times
- ✅ No tracking or analytics
- ✅ No advertisements

## 🌐 Supported Locations

The app supports prayers times for:

- ✅ All countries worldwide
- ✅ All major cities
- ✅ Small towns and villages
- ✅ Historical place names
- ✅ Multiple languages for same place

**Examples:**

- London, UK
- Istanbul, Turkey / İstanbul, Türkiye
- Cairo, Egypt / Al-Qahira, Misr
- Sarajevo, Bosnia / Sarajevo, Bosna i Hercegovina
- Jakarta, Indonesia / Jakarta, Republik Indonesia

## ⌨️ Keyboard Shortcuts

| Shortcut            | Action          |
| ------------------- | --------------- |
| **Right Arrow** (→) | Next Hadith     |
| **Left Arrow** (←)  | Previous Hadith |
| **Enter**           | Search Location |

## 📊 File Structure

```
vaktijaa/
├── index.html          # Main HTML file
├── style.css           # Styling (desktop & mobile)
├── script.js           # Main application logic
├── config.js           # Configuration settings
├── hadith-data.js      # Hadith database (30+ quotes)
├── sw.js              # Service Worker (offline support)
├── manifest.json      # PWA (Progressive Web App) manifest
├── README.md          # Full documentation
└── QUICKSTART.md      # This file
```

## 🎓 Learning Resources

### Islamic Prayer Times

- [Aladhan API Documentation](https://aladhan.com/prayer-times-api)
- [Prayer Time Calculation Methods](https://en.wikipedia.org/wiki/Salah#Prayer_times)

### Web Development

- [MDN Web Docs](https://developer.mozilla.org)
- [JavaScript Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

## 🤝 Support & Contributions

If you encounter issues:

1. Check this troubleshooting guide
2. Review the README.md
3. Check browser console (F12)
4. Try a different browser

## 📝 Version History

**v1.0** (February 2026)

- Initial release
- Prayer times for any location
- 30 hadith in 3 languages
- Islamic calendar
- Responsive design
- Offline support

## 🙏 Islamic References

Prayer times are based on Islamic jurisprudence:

- **Fajr:** Before sunrise
- **Dhuhr:** Midday (after sun passes zenith)
- **Asr:** Afternoon
- **Maghrib:** Just after sunset
- **Isha:** When twilight ends

All hadith sources are from authentic Islamic collections.

## ⚖️ License & Usage

- ✅ Free to use personally
- ✅ Can be modified
- ✅ Can be shared
- ✅ Cannot be sold commercially without permission

---

**Questions?** Review the full [README.md](README.md) documentation.

**Jazakallah Khair!** (May Allah reward you!)

اللَّهُ اكْبَرُ اللَّهُ اكْبَرُ
