# API Documentation

This document explains the external APIs used by the Islamic Prayer Times app.

## Table of Contents

1. [Aladhan Prayer Times API](#aladhan-prayer-times-api)
2. [OpenStreetMap Nominatim](#openstreetmap-nominatim)
3. [Implementation Examples](#implementation-examples)
4. [Error Handling](#error-handling)

---

## Aladhan Prayer Times API

### Overview

The Aladhan API provides accurate prayer times for any location worldwide. It supports multiple calculation methods used by different Islamic institutions.

**API Base URL:** `https://api.aladhan.com/v1`

### Endpoints

#### Get Prayer Times by Coordinates

```
GET /timings?latitude=LATITUDE&longitude=LONGITUDE&method=METHOD&school=SCHOOL
```

**Parameters:**

- `latitude` (required): Latitude of the location (-90 to 90)
- `longitude` (required): Longitude of the location (-180 to 180)
- `method` (optional, default: 2): Prayer calculation method (1-8)
- `school` (optional, default: 0): Fiqh method (0=Shafi, 1=Hanafi)
- `timezonestring` (optional): Timezone (e.g., "Europe/London")
- `latitudeAdjustmentMethod` (optional): Adjustment for high latitudes

**Example Request:**

```javascript
fetch(
  "https://api.aladhan.com/v1/timings?latitude=43.9159&longitude=18.4131&method=4",
)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

**Example Response:**

```json
{
  "code": 200,
  "status": "OK",
  "data": {
    "timings": {
      "Fajr": "06:25",
      "Sunrise": "08:10",
      "Dhuhr": "12:45",
      "Asr": "15:20",
      "Sunset": "17:15",
      "Maghrib": "17:15",
      "Isha": "18:50",
      "Imsak": "06:15",
      "Midnight": "00:42",
      "Firstthird": "21:53",
      "Lastthird": "03:31"
    },
    "date": {
      "readable": "11 Feb 2026",
      "timestamp": "1739299200",
      "gregorian": {
        "date": "11/02/2026",
        "format": "DD/MM/YYYY",
        "day": "11",
        "weekday": {
          "en": "Tuesday"
        },
        "month": {
          "number": 2,
          "en": "February"
        },
        "year": "2026"
      },
      "hijri": {
        "date": "24/06/1447",
        "format": "DD/MM/YYYY",
        "day": "24",
        "weekday": {
          "en": "Tuesday",
          "ar": "الثلاثاء"
        },
        "month": {
          "number": 6,
          "en": "Jumada al-Thani",
          "ar": "جمادى الثانية"
        },
        "year": "1447"
      }
    },
    "metaData": {
      "latitude": 43.9159,
      "longitude": 18.4131,
      "timezone": "Europe/Sarajevo",
      "method": {
        "id": 4,
        "name": "University of Islamic Sciences, Karachi"
      },
      "school": "Shafi",
      "offset": {
        "Imsak": 0,
        "Fajr": 0,
        "Sunrise": 0,
        "Dhuhr": 0,
        "Asr": 0,
        "Sunset": 0,
        "Maghrib": 0,
        "Isha": 0,
        "Midnight": 0
      }
    }
  }
}
```

### Prayer Calculation Methods

| ID  | Name                               | Description                             |
| --- | ---------------------------------- | --------------------------------------- |
| 1   | Ummah Al-Qura University           | Used in Saudi Arabia and Gulf countries |
| 2   | Islamic Society of North America   | Popular in North America                |
| 3   | Muslim World League                | Widely used internationally             |
| 4   | Umm al-Qura University             | Standard calculation method             |
| 5   | Egyptian General Authority         | Used in Egypt and Arab countries        |
| 6   | Institut Geografi                  | Used in Indonesia                       |
| 7   | Union Organization Islamic Centers | Used in Europe                          |
| 8   | Al Shia (Jafari)                   | Used by Shia Muslims                    |

### Using in JavaScript

```javascript
// Fetch prayer times
async function getPrayerTimes(latitude, longitude, method = 4) {
  try {
    const response = await fetch(
      `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=${method}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.code !== 200) {
      throw new Error(data.data || "Unknown error");
    }

    return {
      timings: data.data.timings,
      islamicDate: data.data.date.hijri,
      metadata: data.data.metaData,
    };
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    throw error;
  }
}

// Usage
getPrayerTimes(43.9159, 18.4131, 4)
  .then((result) => {
    console.log("Prayer times:", result.timings);
    console.log("Islamic date:", result.islamicDate);
  })
  .catch((error) => console.error(error));
```

---

## OpenStreetMap Nominatim

### Overview

Nominatim is a free geocoding service provided by OpenStreetMap for converting place names to coordinates and vice versa.

**API Base URL:** `https://nominatim.openstreetmap.org`

### Forward Geocoding (Name to Coordinates)

```
GET /search?q=QUERY&format=json
```

**Parameters:**

- `q` (required): Search query (e.g., "London", "Cairo, Egypt")
- `format` (required): "json" for JSON response
- `limit` (optional, default: 10): Maximum number of results
- `country` (optional): ISO country code (e.g., "gb" for UK)
- `addressdetails` (optional): Include detailed address (1 or 0)
- `zoom` (optional): Zoom level for bias (3-18)
- `viewbox` (optional): Bounding box for search limiting

**Example Request:**

```javascript
fetch("https://nominatim.openstreetmap.org/search?q=London&format=json&limit=1")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

**Example Response:**

```json
[
  {
    "place_id": 12345678,
    "licence": "Data © OpenStreetMap contributors, ODbL 1.0",
    "osm_type": "relation",
    "osm_id": 62422,
    "boundingbox": ["51.2867601", "51.6918741", "-0.5103751", "0.3340155"],
    "lat": "51.5073509",
    "lon": "-0.1277583",
    "display_name": "London, England, United Kingdom",
    "class": "place",
    "type": "city",
    "importance": 0.9454269293131207
  }
]
```

### Reverse Geocoding (Coordinates to Name)

```
GET /reverse?lat=LATITUDE&lon=LONGITUDE&format=json
```

**Parameters:**

- `lat` (required): Latitude
- `lon` (required): Longitude
- `format` (required): "json" for JSON response
- `zoom` (optional): Zoom level detail (3-18)
- `addressdetails` (optional): Include detailed address (1 or 0)

**Example Request:**

```javascript
fetch(
  "https://nominatim.openstreetmap.org/reverse?format=json&lat=51.5073509&lon=-0.1277583",
)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

**Example Response:**

```json
{
  "place_id": 12345678,
  "licence": "Data © OpenStreetMap contributors, ODbL 1.0",
  "osm_type": "relation",
  "osm_id": 62422,
  "lat": "51.5073509",
  "lon": "-0.1277583",
  "display_name": "London, England, United Kingdom",
  "address": {
    "city": "London",
    "country": "United Kingdom",
    "country_code": "gb"
  }
}
```

### Using in JavaScript

```javascript
// Forward geocoding - name to coordinates
async function nameToCoordinates(locationName) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=1`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      throw new Error("Location not found");
    }

    return {
      name: data[0].display_name,
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon),
    };
  } catch (error) {
    console.error("Geocoding error:", error);
    throw error;
  }
}

// Reverse geocoding - coordinates to name
async function coordinatesToName(latitude, longitude) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      name: data.display_name,
      address: data.address,
    };
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    throw error;
  }
}

// Usage examples
nameToCoordinates("Cairo").then((result) => {
  console.log(`${result.name}: ${result.latitude}, ${result.longitude}`);
});

coordinatesToName(43.9159, 18.4131).then((result) => {
  console.log(`City: ${result.name}`);
});
```

### Usage Policy

- ✅ Free to use
- ✅ For non-commercial and commercial use
- ✅ No API key required
- ✅ Generous rate limits (1 request per second per IP)

**Rules:**

- Include attribution to OpenStreetMap
- Don't overload the service
- Cache results when possible
- Use appropriate timeouts
- Respect robots.txt

---

## Implementation Examples

### Complete Prayer Times Workflow

```javascript
async function getPrayerTimesForCity(cityName) {
  try {
    // Step 1: Geocode city name to coordinates
    const locationData = await nameToCoordinates(cityName);
    console.log(`Found: ${locationData.name}`);

    // Step 2: Get prayer times using coordinates
    const prayerData = await getPrayerTimes(
      locationData.latitude,
      locationData.longitude,
      4, // method
    );

    // Step 3: Display results
    console.log("Prayer Times:");
    console.log(`Fajr:    ${prayerData.timings.Fajr}`);
    console.log(`Dhuhr:   ${prayerData.timings.Dhuhr}`);
    console.log(`Asr:     ${prayerData.timings.Asr}`);
    console.log(`Maghrib: ${prayerData.timings.Maghrib}`);
    console.log(`Isha:    ${prayerData.timings.Isha}`);

    console.log(
      "Islamic Date:",
      `${prayerData.islamicDate.day} ${prayerData.islamicDate.month.en} ${prayerData.islamicDate.year}`,
    );

    return prayerData;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Usage
getPrayerTimesForCity("Istanbul");
```

### Using with Browser Geolocation

```javascript
async function getPrayerTimesForCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          // Get prayer times
          const prayerData = await getPrayerTimes(latitude, longitude);

          // Get city name
          const nameData = await coordinatesToName(latitude, longitude);

          console.log(`City: ${nameData.name}`);
          console.log("Prayer times:", prayerData.timings);

          resolve({ location: nameData, prayers: prayerData });
        } catch (error) {
          reject(error);
        }
      },
      (error) => {
        reject(`Geolocation error: ${error.message}`);
      },
    );
  });
}

// Usage
getPrayerTimesForCurrentLocation()
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

---

## Error Handling

### Prayer Times API Error Handling

```javascript
async function getPrayerTimesWithErrorHandling(lat, lon) {
  try {
    const response = await fetch(
      `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=4`,
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.code !== 200) {
      throw new Error(`API Error: ${data.code} - ${data.data}`);
    }

    // Validate required fields
    if (!data.data || !data.data.timings) {
      throw new Error("Invalid response structure");
    }

    return data.data;
  } catch (error) {
    if (error instanceof TypeError) {
      console.error("Network error:", error.message);
    } else {
      console.error("API error:", error.message);
    }
    throw error;
  }
}
```

### Geocoding Error Handling

```javascript
async function nameToCoordinatesWithErrorHandling(locationName) {
  if (!locationName || locationName.trim().length === 0) {
    throw new Error("Location name is required");
  }

  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=1`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error(`No results found for "${locationName}"`);
    }

    const result = data[0];

    // Validate latitude and longitude
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);

    if (isNaN(lat) || isNaN(lon)) {
      throw new Error("Invalid coordinates received");
    }

    return {
      name: result.display_name,
      latitude: lat,
      longitude: lon,
    };
  } catch (error) {
    if (error instanceof TypeError) {
      console.error("Network error:", error.message);
    } else {
      console.error("Geocoding error:", error.message);
    }
    throw error;
  }
}
```

### Common Status Codes

**Aladhan API:**

- `200`: Success
- `400`: Invalid parameters
- `500`: Server error

**Nominatim:**

- `200`: Success
- `400`: Bad request
- `404`: Not found
- `429`: Rate limited
- `500`: Server error

### Timeout Handling

```javascript
async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error("Request timeout");
    }
    throw error;
  }
}

// Usage
fetchWithTimeout(
  "https://api.aladhan.com/v1/timings?latitude=0&longitude=0&method=4",
  5000,
)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Timeout or error:", error.message));
```

---

## Rate Limiting

### Aladhan API

- No strict rate limit
- Reasonable use expected
- Caching recommended

### Nominatim

- 1 request per second per IP
- Burst requests allowed: max 10 per second
- Implement delays between requests

---

## Privacy Considerations

- Prayer times are calculated server-side
- Location data is sent to both APIs
- No tracking or logging by app
- Cache results locally when possible
- Comply with API terms of service

---

## Additional Resources

- [Aladhan API Documentation](https://aladhan.com/prayer-times-api)
- [Nominatim Documentation](https://nominatim.org/release-docs/latest/api/Overview/)
- [OpenStreetMap License](https://www.openstreetmap.org/copyright)
- [Prayer Time Calculations](https://en.wikipedia.org/wiki/Salah#Prayer_times)

---

**Last Updated:** February 2026
**API Compatibility:** December 2024+ versions
