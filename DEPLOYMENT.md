# Deployment Guide

Complete guide for deploying the Islamic Prayer Times app to various platforms.

## Table of Contents

1. [Local Development](#local-development)
2. [GitHub Pages](#github-pages)
3. [Netlify](#netlify)
4. [Vercel](#vercel)
5. [Traditional Web Hosting](#traditional-web-hosting)
6. [Docker](#docker)
7. [Troubleshooting](#troubleshooting)

---

## Local Development

### Prerequisites

- Web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Sublime Text, Notepad++)
- Internet connection

### Step 1: Get the Files

```bash
# Download/clone the project
git clone <repository-url>
cd vaktijaa
```

### Step 2: Start a Local Server

**Option A: Python (Recommended)**

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Option B: Node.js**

```bash
# Using http-server
npx http-server

# Using node
node -e "require('http').createServer((req,res)=>require('fs').createReadStream('.'+req.url).pipe(res)).listen(8000)"
```

**Option C: PHP**

```bash
php -S localhost:8000
```

**Option D: VS Code Live Server Extension**

1. Install "Live Server" extension
2. Right-click on index.html
3. Select "Open with Live Server"

### Step 3: Access the App

Open browser and go to: `http://localhost:8000`

### Step 4: Development Tips

- Use browser DevTools (F12) for debugging
- Check Console tab for JavaScript errors
- Use Network tab to monitor API calls
- Edit files and refresh browser to see changes

---

## GitHub Pages

### Prerequisites

- GitHub account
- Git installed locally
- Repository created

### Deployment Steps

**Step 1: Prepare Repository**

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Islamic Prayer Times App"
```

**Step 2: Push to GitHub**

```bash
# Create new repository on GitHub.com
# Then run:
git remote add origin https://github.com/YOUR_USERNAME/vaktijaa.git
git branch -M main
git push -u origin main
```

**Step 3: Enable GitHub Pages**

1. Go to Repository Settings
2. Scroll to "GitHub Pages" section
3. Select branch: `main`
4. Select folder: `/ (root)`
5. Click Save

**Step 4: Access Your Site**

- URL: `https://YOUR_USERNAME.github.io/vaktijaa/`
- Wait 1-2 minutes for deployment

### Custom Domain

1. In Settings → GitHub Pages
2. Add custom domain (e.g., prayers.example.com)
3. Update DNS records with GitHub's IP addresses
4. Verify domain

### GitHub Pages Configuration (.github/workflows/deploy.yml)

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

---

## Netlify

### Prerequisites

- Netlify account (free)
- GitHub repository OR local files

### Method 1: Drag & Drop

1. Go to [Netlify.com](https://netlify.com)
2. Sign up/login
3. Drag and drop project folder
4. Site goes live immediately with auto-generated URL

### Method 2: Git Integration

**Step 1: Connect Repository**

1. Go to Netlify Dashboard
2. Click "New site from Git"
3. Choose GitHub/GitLab/Bitbucket
4. Authorize Netlify
5. Select your repository

**Step 2: Configure Build**

- Build Command: (leave empty for static site)
- Publish Directory: `./`
- Click "Deploy site"

**Step 3: Access Your Site**

- Netlify generates URL: `https://random-name.netlify.app`

### Custom Domain

1. Go to Site Settings
2. Domain Management
3. Add custom domain
4. Update DNS records

### Netlify Configuration (netlify.toml)

```toml
[build]
  command = "echo 'No build needed'"
  publish = "."

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"

[[headers]]
  for = "/(js|css|fonts)/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=3600"
```

---

## Vercel

### Prerequisites

- Vercel account (free)
- GitHub/GitLab account

### Deployment Steps

**Step 1: Import Project**

1. Go to [Vercel.com](https://vercel.com)
2. Sign up/login
3. Click "New Project"
4. Select your GitHub repository
5. Click Import

**Step 2: Configure**

- Framework: "Other"
- Build Command: (leave empty)
- Output Directory: ./
- Install Command: (not needed)

**Step 3: Deploy**

1. Click Deploy
2. Wait for deployment
3. Get auto-generated URL

### Vercel Configuration (vercel.json)

```json
{
  "buildCommand": "echo 'No build needed'",
  "outputDirectory": "./",
  "env": {},
  "envPrefix": "VITE_",
  "devCommand": "python -m http.server 3000",
  "installCommand": "echo 'No dependencies to install'",
  "framework": null,
  "cleanUrls": true,
  "trailingSlash": false,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=86400"
        }
      ]
    }
  ]
}
```

---

## Traditional Web Hosting

### Shared Hosting (cPanel, Plesk)

**Step 1: Prepare Files**

- Zip all project files
- Keep file structure intact

**Step 2: Upload via FTP**

```bash
# Using FTP client (FileZilla, WinSCP)
1. Connect to server with FTP credentials
2. Navigate to public_html or www directory
3. Upload all files
4. Set proper permissions (644 for files, 755 for directories)
```

**Step 3: Upload via cPanel File Manager**

1. Login to cPanel
2. Open File Manager
3. Navigate to public_html
4. Upload files
5. Extract if zipped

**Step 4: Verify Installation**

- Open website URL
- Check file permissions if not loading
- Review error logs in cPanel

### Apache Server (.htaccess)

The `.htaccess` file is already included for proper configuration:

- Caching headers
- Compression
- Rewrite rules
- Security headers

**Check if mod_rewrite is enabled:**

```bash
# SSH access (if available)
apache2ctl -M | grep rewrite

# Or contact hosting provider to enable it
```

### Nginx Server

If using Nginx, create `/etc/nginx/sites-available/prayer-times.conf`:

```nginx
server {
    listen 80;
    server_name prayers.example.com;
    root /var/www/vaktijaa;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_types text/html text/plain text/css text/javascript application/javascript application/json;
    gzip_min_length 1000;

    # Browser caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|otf)$ {
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    # HTML files - no cache
    location ~* \.html$ {
        expires 1h;
        add_header Cache-Control "public, must-revalidate";
    }

    # SPA rewrite
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

**Enable and restart:**

```bash
sudo ln -s /etc/nginx/sites-available/prayer-times.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## Docker

### Dockerfile

Create `Dockerfile` in project root:

```dockerfile
# Use official nginx image
FROM nginx:latest

# Copy app files to nginx
COPY . /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: "3.8"

services:
  app:
    image: prayer-times:latest
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    volumes:
      - ./:/usr/share/nginx/html

  # Optional: Let's Encrypt SSL
  certbot:
    image: certbot/certbot
    volumes:
      - ./certbot:/etc/letsencrypt
    command: certonly --standalone -d prayers.example.com
```

### Build and Run

```bash
# Build image
docker build -t prayer-times:latest .

# Run container
docker run -p 80:80 prayer-times:latest

# Or use Docker Compose
docker-compose up -d

# Stop container
docker stop $(docker ps -q --filter ancestor=prayer-times:latest)
```

### Push to Docker Hub

```bash
# Login
docker login

# Tag image
docker tag prayer-times:latest YOUR_USERNAME/prayer-times:latest

# Push
docker push YOUR_USERNAME/prayer-times:latest
```

---

## SSL/HTTPS Setup

### Free SSL with Let's Encrypt

**Option 1: Auto (Recommended)**

- Netlify: Automatic
- Vercel: Automatic
- GitHub Pages: Automatic

**Option 2: Manual (Nginx/Apache)**

```bash
# Install certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --nginx -d prayers.example.com

# Auto-renew
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

**Option 3: Docker with Let's Encrypt**

```dockerfile
FROM nginx:latest
RUN apt-get update && apt-get install -y certbot python3-certbot-nginx

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./app /usr/share/nginx/html

EXPOSE 80 443

CMD ["sh", "-c", "certbot certonly --nginx -d prayers.example.com || true && nginx -g 'daemon off;'"]
```

---

## Performance Optimization

### Content Delivery Network (CDN)

**Cloudflare (Free)**

1. Sign up at cloudflare.com
2. Add your domain
3. Update nameservers
4. Enable "Auto Minify" for CSS/JS
5. Set cache level to "Cache Everything"

### Minification

```bash
# Minify CSS
npm install -g cssnano-cli
cssnano style.css > style.min.css

# Minify JS
npm install -g terser
terser script.js -o script.min.js

# Update HTML to use minified files
# Change: <link rel="stylesheet" href="style.css">
# To:     <link rel="stylesheet" href="style.min.css">
```

### Image Optimization

```bash
# Convert to WebP
cwebp -q 80 image.png -o image.webp

# Use in HTML with fallback
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.png" alt="Prayer Times">
</picture>
```

---

## Monitoring & Maintenance

### Check Server Status

```bash
# Check if app is running
curl https://prayers.example.com

# Check HTTP headers
curl -I https://prayers.example.com

# Check SSL certificate
openssl s_client -connect prayers.example.com:443
```

### Monitor Performance

- Use Lighthouse (in Chrome DevTools)
- Use PageSpeed Insights
- Monitor with Uptime Robot (free)

### Update Files

```bash
# For Git-based deployment
git pull
git commit -am "Update files"
git push

# For FTP upload
# Re-upload modified files via FTP client
```

### Backup

```bash
# Backup project
tar -czf backup-$(date +%Y%m%d).tar.gz .

# Upload backup to cloud storage
# AWS S3, Google Drive, Dropbox, etc.
```

---

## Troubleshooting

### Common Issues

**Issue: Files not found (404 errors)**

- Ensure all files uploaded correctly
- Check file names (case-sensitive on Linux)
- Verify .htaccess is present and enabled
- Check Nginx rewrite rules

**Issue: CORS errors**

- APIs are CORS-enabled and free
- Check browser console for details
- Ensure HTTPS if required
- Clear browser cache

**Issue: Geolocation not working**

- Requires HTTPS (except localhost)
- Check browser permissions
- Try different browser
- Use manual location input

**Issue: Slow loading**

- Check internet connection
- Enable caching headers
- Minify CSS/JS files
- Use CDN
- Check API response times

**Issue: Service Worker errors**

- Clear browser cache
- Update sw.js file
- Check browser console
- Disable if not needed

### Debug Mode

Add to script.js:

```javascript
// Enable debug logging
const DEBUG = true;

function log(...args) {
  if (DEBUG) {
    console.log("[Prayer Times App]", ...args);
  }
}
```

---

## Rollback

If deployment has issues:

```bash
# Git rollback
git revert HEAD
git push

# Or checkout previous version
git checkout <previous-commit-hash>
git push -f

# For Netlify
# Go to Deploys section and select previous deploy
```

---

## Performance Checklist

- [ ] All files uploaded correctly
- [ ] index.html accessible
- [ ] CSS loads without errors
- [ ] JavaScript files load
- [ ] Icons/fonts load
- [ ] APIs responding (Aladhan, Nominatim)
- [ ] Geolocation works (HTTPS)
- [ ] Cache headers configured
- [ ] HTTPS certificate valid
- [ ] Mobile responsive tested
- [ ] Different browsers tested
- [ ] Service Worker registered
- [ ] Offline mode works

---

## Support

For deployment issues:

1. Check error messages in browser console (F12)
2. Check server error logs
3. Review deployment platform documentation
4. Test APIs independently
5. Clear cache and retry

---

**Quick Reference:**

- **Local:** `python -m http.server 8000`
- **GitHub Pages:** Free, automatic
- **Netlify:** Free tier available
- **Vercel:** Free tier available
- **Shared Hosting:** Via cPanel/FTP
- **Docker:** Container deployment

---

**Last Updated:** February 2026
