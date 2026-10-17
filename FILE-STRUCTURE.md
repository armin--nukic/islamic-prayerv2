# Islamic Prayer Times App - File Structure & Documentation

## 📁 Complete Project Structure

```
vaktijaa/
│
├── index.html                 # Main HTML file - entry point of the application
├── style.css                  # Complete styling and responsive design
├── script.js                  # Main JavaScript application logic
├── config.js                  # Configuration settings
├── hadith-data.js            # Database of 30 hadith in 3 languages
├── sw.js                     # Service Worker for offline support
├── manifest.json             # PWA manifest for app installation
├── .htaccess                 # Apache server configuration
│
├── README.md                 # Complete documentation (comprehensive)
├── QUICKSTART.md             # Quick start and usage guide
├── DEPLOYMENT.md             # Deployment instructions for various platforms
├── API-DOCS.md              # API documentation and examples
│
└── FILE-STRUCTURE.md        # This file - overview of all files

```

## 📄 File Descriptions

### Core Application Files

#### **index.html** (HTML Entry Point)

- **Purpose:** Main HTML structure
- **Size:** ~4 KB
- **Contains:**
  - Document structure and semantics
  - Form inputs for location search
  - Containers for prayer times
  - Hadith display sections
  - Islamic calendar section
  - Script and dependency references
- **Key Elements:**
  - Header with app title
  - Location input section
  - Prayer times grid
  - Hadith cards (3 languages)
  - Islamic calendar display
  - Footer
- **Dependencies:** style.css, script.js, hadith-data.js, config.js

#### **style.css** (Styling)

- **Purpose:** All CSS styling and responsive design
- **Size:** ~15 KB
- **Contains:**
  - CSS variables for colors
  - Responsive grid layouts
  - Animations and transitions
  - Mobile-first design
  - Prayer card styling
  - Hadith card styling
  - Dark/Light theme colors
- **Key Features:**
  - Flexbox and CSS Grid
  - Media queries for mobile (480px, 768px)
  - Animation keyframes
  - Islamic color scheme (green/gold)
  - Smooth hover effects
- **Breakpoints:**
  - Desktop: 1200px and above
  - Tablet: 768px - 1199px
  - Mobile: Below 768px
  - Small Mobile: Below 480px

#### **script.js** (Main Logic)

- **Purpose:** Core application functionality
- **Size:** ~12 KB
- **Contains:**
  - Location handling (search, GPS)
  - Prayer times fetching and display
  - Hadith management
  - Islamic date calculation
  - Event listeners
  - API error handling
  - Countdown timer logic
- **Main Functions:**
  - `initializeApp()` - Startup initialization
  - `handleLocationSearch()` - Search location by name
  - `handleGeolocation()` - Get location via GPS
  - `fetchPrayerTimes()` - Fetch from Aladhan API
  - `displayPrayerTimes()` - Show prayer times UI
  - `updatePrayerHighlight()` - Highlight next prayer
  - `displayHadith()` - Show hadith quotes
  - `nextHadith()`, `previousHadith()`, `randomHadith()` - Hadith navigation

#### **config.js** (Configuration)

- **Purpose:** Centralized configuration
- **Size:** ~4 KB
- **Contains:**
  - API settings
  - Prayer calculation method
  - Default location
  - Display preferences
  - Color scheme
  - Prayer names in multiple languages
  - Islamic month names
- **Customizable:**
  - Prayer calculation method (1-8)
  - Time format (24h or 12h)
  - Default location
  - Colors
  - Feature toggles
- **Usage:** Referenced by script.js via `APP_CONFIG` object

#### **hadith-data.js** (Hadith Database)

- **Purpose:** Store all hadith quotes
- **Size:** ~8 KB
- **Contains:**
  - 30 authentic hadith in object format
  - English translations
  - Arabic original text (عربي)
  - Bosnian translations (Bosanski)
  - Prayer names in 3 languages
  - Islamic month names
- **Structure:**
  ```javascript
  hadithData = [
    {
      id: 1,
      english: "...",
      arabic: "...",
      bosnian: "...",
    },
    // ... 29 more hadith
  ];
  ```
- **Functions:**
  - `getHadithByIndex()` - Get hadith by index
  - `getRandomHadith()` - Get random hadith
  - `getHadithOfDay()` - Get today's hadith
- **Expandable:** Easy to add more hadith quotes

#### **sw.js** (Service Worker)

- **Purpose:** Offline support and caching
- **Size:** ~2 KB
- **Contains:**
  - Cache management
  - Offline fallback
  - Static asset caching
  - Network-first strategy
- **Features:**
  - Cache HTML, CSS, JS files
  - Background sync capability
  - Message handling
  - Cache version control
- **Implementation:** Called from index.html if enabled in config

#### **manifest.json** (PWA Manifest)

- **Purpose:** Progressive Web App configuration
- **Size:** ~3 KB
- **Contains:**
  - App metadata
  - App icons
  - Display mode
  - Shortcuts
  - Colors
  - Screenshots
- **Enables:**
  - "Add to Home Screen" on mobile
  - Standalone app mode
  - Custom app icon
  - App name and description
- **Features:**
  - Maskable icons for custom shapes
  - Multiple display sizes
  - App shortcuts
  - Social sharing configuration

#### **.htaccess** (Apache Configuration)

- **Purpose:** Server-side configuration for Apache
- **Size:** ~2 KB
- **Contains:**
  - Cache headers
  - Compression settings
  - Security headers
  - MIME types
  - Rewrite rules
- **Provides:**
  - Browser caching for performance
  - GZIP compression
  - XSS protection
  - CSRF protection
  - Proper content types
- **Requirements:** Apache with mod_expires, mod_deflate, mod_rewrite

### Documentation Files

#### **README.md** (Main Documentation)

- **Purpose:** Comprehensive project documentation
- **Size:** ~20 KB
- **Contains:**
  - Feature overview
  - Installation instructions
  - Usage guide
  - Customization options
  - Troubleshooting
  - Islamic prayer information
  - Privacy & security notes
  - Keyboard shortcuts
  - Version history
  - Credits and attribution
- **Best For:** Non-technical users and reference

#### **QUICKSTART.md** (Quick Start Guide)

- **Purpose:** Fast setup and usage guide
- **Size:** ~15 KB
- **Contains:**
  - Installation (3 methods)
  - Getting started steps
  - Usage examples
  - Advanced configuration
  - Troubleshooting
  - File structure
  - Learning resources
- **Best For:** Users who want to get started quickly

#### **DEPLOYMENT.md** (Deployment Instructions)

- **Purpose:** Guide for deploying to production
- **Size:** ~18 KB
- **Contains:**
  - Local development setup
  - GitHub Pages deployment
  - Netlify deployment
  - Vercel deployment
  - Traditional web hosting
  - Docker containerization
  - SSL/HTTPS setup
  - Performance optimization
  - Monitoring and maintenance
  - Troubleshooting
- **Best For:** Developers and hosting administrators
- **Covers:**
  - 7+ deployment platforms
  - Docker and containerization
  - Performance optimization
  - SSL certificates
  - CDN setup
  - Monitoring tools

#### **API-DOCS.md** (API Documentation)

- **Purpose:** Document external APIs used
- **Size:** ~16 KB
- **Contains:**
  - Aladhan Prayer Times API reference
  - OpenStreetMap Nominatim API reference
  - Request/response examples
  - JavaScript implementation examples
  - Error handling patterns
  - Rate limiting information
  - Privacy considerations
- **Best For:** Developers customizing the app
- **Covers:**
  - Prayer calculation methods (8 types)
  - Forward and reverse geocoding
  - Complete API reference
  - Error codes
  - Code examples with fetch API

#### **FILE-STRUCTURE.md** (This File)

- **Purpose:** Overview of all files and their purposes
- **Size:** ~8 KB
- **Contains:**
  - Complete project structure
  - File descriptions
  - Default locations
  - Useful resources

## 🔄 Dependencies & External Services

### JavaScript Libraries (via CDN)

- **Font Awesome** (Icons)
  - URL: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`
  - Used for: Icons throughout the app
  - Size: ~50 KB (cached)

### External APIs (Free, No API Key Required)

#### **Aladhan Prayer Times API**

- **Endpoint:** `https://api.aladhan.com/v1/timings`
- **Purpose:** Calculate and fetch prayer times
- **Supported Methods:** 8 different calculation methods
- **Rate Limit:** No strict limit
- **Caching:** Results cached locally

#### **OpenStreetMap Nominatim**

- **Endpoint:**
  - Forward: `https://nominatim.openstreetmap.org/search`
  - Reverse: `https://nominatim.openstreetmap.org/reverse`
- **Purpose:** Geocoding (location name ↔ coordinates)
- **Rate Limit:** 1 request per second per IP
- **Storage:** Results cached

## 🎯 Default Configuration

### Default Location

- **City:** Sarajevo, Bosnia and Herzegovina
- **Latitude:** 43.9159
- **Longitude:** 18.4131
- **Used:** Fallback when geolocation fails

### Prayer Calculation Method

- **Method:** 4 (Umm al-Qura University)
- **Suitable For:** General use worldwide
- **Customizable:** Change in config.js

### Time Format

- **Default:** 24-hour format
- **Options:** 24h or 12h
- **Change:** In config.js

### Languages

1. **English** - Interface language
2. **Arabic** - Prayer names and hadith translation
3. **Bosnian** - Hadith translation

## 💾 File Sizes Summary

| File           | Size       | Type         | Purpose           |
| -------------- | ---------- | ------------ | ----------------- |
| index.html     | ~4 KB      | HTML         | Main structure    |
| style.css      | ~15 KB     | CSS          | Styling           |
| script.js      | ~12 KB     | JS           | Application logic |
| config.js      | ~4 KB      | JS           | Configuration     |
| hadith-data.js | ~8 KB      | JS           | Hadith database   |
| sw.js          | ~2 KB      | JS           | Service Worker    |
| manifest.json  | ~3 KB      | JSON         | PWA config        |
| .htaccess      | ~2 KB      | Config       | Server config     |
| **Total**      | **~50 KB** | **Combined** | **Uncompressed**  |

**Gzipped Size:** ~15-18 KB (65-70% compression)

## 🚀 Startup Flow

```
1. Browser loads index.html
   ↓
2. HTML loads style.css (styling)
   ↓
3. HTML loads hadith-data.js (hadith database)
   ↓
4. HTML loads config.js (configuration)
   ↓
5. HTML loads script.js (main logic)
   ↓
6. script.js calls initializeApp()
   ↓
7. Service Worker registered (if enabled)
   ↓
8. Event listeners setup
   ↓
9. Load hadith of the day
   ↓
10. Attempt auto-geolocation or use default location
    ↓
11. Fetch prayer times from Aladhan API
    ↓
12. Display prayer times and UI ready
```

## 📱 Responsive Design Breakpoints

| Breakpoint | Size       | Device                | Layout          |
| ---------- | ---------- | --------------------- | --------------- |
| Small      | < 480px    | iPhone SE, old phones | 2-column grid   |
| Mobile     | 480-767px  | Modern phones         | Single column   |
| Tablet     | 768-1199px | iPad, tablets         | 2-3 column grid |
| Desktop    | ≥ 1200px   | Computers             | Full layout     |

## 🔒 Security Features

- ✅ No sensitive data stored locally
- ✅ HTTPS recommended (enforced for geolocation)
- ✅ X-Frame-Options header (anti-clickjacking)
- ✅ X-Content-Type-Options header (MIME sniffing prevention)
- ✅ X-XSS-Protection header
- ✅ Content Security Policy compatible
- ✅ No third-party analytics or tracking

## ⚡ Performance Features

- ✅ Lightweight (~50 KB uncompressed)
- ✅ Gzip compression supported
- ✅ Browser caching with .htaccess
- ✅ Service Worker offline support
- ✅ Lazy loading ready
- ✅ Minification capable
- ✅ CDN compatible
- ✅ No build process required

## 📚 Browser Compatibility

| Browser | Version | Support    |
| ------- | ------- | ---------- |
| Chrome  | 50+     | ✅ Full    |
| Firefox | 45+     | ✅ Full    |
| Safari  | 10+     | ✅ Full    |
| Edge    | 15+     | ✅ Full    |
| Opera   | 37+     | ✅ Full    |
| IE 11   | 11.0    | ⚠️ Partial |

## 🔗 Quick Links

### Getting Started

- [Installation](QUICKSTART.md#installation)
- [Quick Start](QUICKSTART.md#getting-started)
- [Usage Examples](QUICKSTART.md#usage-examples)

### Customization

- [Configuration Guide](QUICKSTART.md#advanced-configuration)
- [Add Hadith](QUICKSTART.md#add-custom-hadith)
- [Change Colors](QUICKSTART.md#customize-colors)

### Deployment

- [Local Development](DEPLOYMENT.md#local-development)
- [GitHub Pages](DEPLOYMENT.md#github-pages)
- [Netlify](DEPLOYMENT.md#netlify)
- [Vercel](DEPLOYMENT.md#vercel)
- [Docker](DEPLOYMENT.md#docker)

### Development

- [API Reference](API-DOCS.md)
- [Aladhan API](API-DOCS.md#aladhan-prayer-times-api)
- [Nominatim API](API-DOCS.md#openstreetmap-nominatim)
- [Code Examples](API-DOCS.md#implementation-examples)

## 🛠️ Useful Development Commands

```bash
# Start local server (Python)
python -m http.server 8000

# Start local server (Node)
npx http-server

# Validate HTML
html5validator index.html

# Check CSS
stylelint style.css

# Minify CSS
cssnano style.css

# Minify JS
terser script.js -o script.min.js

# Check performance
lighthouse index.html

# Deploy to GitHub Pages
git push origin main
```

## 📊 Statistics

- **Lines of Code:** ~1,500
- **Functions:** 20+
- **Hadith Quotes:** 30
- **Languages:** 3 (English, Arabic, Bosnian)
- **API Integrations:** 2 (Aladhan, Nominatim)
- **Responsive Breakpoints:** 4
- **CSS Variables:** 10+

## 🌟 Key Features

- ✨ Real-time prayer times for any location
- ✨ Automatic location detection
- ✨ Daily hadith quotes in 3 languages
- ✨ Islamic calendar display
- ✨ Offline support via Service Worker
- ✨ Progressive Web App ready
- ✨ Mobile responsive design
- ✨ No build process needed
- ✨ Zero tracking/analytics
- ✨ Free and open design

## 📞 Support & Resources

- **Prayer Times Info:** [Aladhan.com](https://aladhan.com)
- **Islamic Info:** [IslamicFinder.org](https://www.islamicfinder.org)
- **Web Dev Help:** [MDN Web Docs](https://developer.mozilla.org)
- **Font Awesome Icons:** [FontAwesome.com](https://fontawesome.com)

---

## Summary

The Islamic Prayer Times App is a complete, production-ready web application consisting of:

- **7 core application files** (HTML, CSS, JS, config, data, service worker, manifest)
- **1 server configuration file** (.htaccess for Apache)
- **4 comprehensive documentation files** (README, QUICKSTART, DEPLOYMENT, API-DOCS)
- **No external dependencies** (uses CDN for icons only)
- **Free external APIs** (Aladhan and Nominatim)
- **Full offline support** with Service Workers
- **Progressive Web App** ready for installation
- **Responsive design** for all devices
- **30 Islamic hadith** in 3 languages

All files are self-contained and can be deployed to any web server without additional setup or build process.

---

**Created:** February 2026
**Version:** 1.0
**License:** Free to use and modify

For questions or support, refer to the appropriate documentation file based on your needs.
