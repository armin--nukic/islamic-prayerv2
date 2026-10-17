# Deploy to GitHub Pages - Quick Guide

## Step 1: Create GitHub Repository

1. Go to **github.com** (login/signup if needed)
2. Click **"+"** (top-right) → **"New repository"**
3. Repository name: **`vaktijaa`** (or any name)
4. Description: "Islamic Prayer Times & Daily Hadith"
5. Choose **Public** (for free Pages)
6. **Don't** add README/license (we'll push existing files)
7. Click **"Create repository"**

## Step 2: Copy Your Repository URL

On the new GitHub page, you'll see:

```
https://github.com/YOUR_USERNAME/vaktijaa.git
```

Example:

```
https://github.com/armincode/vaktijaa.git
```

## Step 3: Connect Local Repository

Open Terminal/PowerShell in your project folder:

```powershell
cd "c:\Users\WCodeArminN\Desktop\armin stvari\vaktijaa"

# Add remote (replace with YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/vaktijaa.git

# Push to GitHub
git branch -M main
git push -u origin main
```

When prompted:

- **Username**: Your GitHub username
- **Password**: Your GitHub personal access token (or password)

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll left to **Pages** (in sidebar)
4. Under "Build and deployment":
   - **Source**: Select **Deploy from a branch**
   - **Branch**: Select **main** → **/ (root)**
5. Click **Save**

## Step 5: Done! Your Site is Live!

Wait 1-2 minutes, then visit:

```
https://YOUR_USERNAME.github.io/vaktijaa
```

Example:

```
https://armincode.github.io/vaktijaa
```

---

## Troubleshooting

### If pages don't appear:

1. Check **Settings → Pages** shows "Your site is published at..."
2. Wait a few more minutes (sometimes takes 2-3 min)
3. Try refreshing browser (Ctrl+Shift+Delete for hard refresh)

### If styles/scripts don't load:

- Make sure all references are **relative paths** (which they are!)
- No `/vaktijaa/` prefix needed in paths

### Test locally first:

```powershell
# Keep running
python -m http.server 8000

# Open browser to
http://localhost:8000
```

---

## Video Alternative (If Text Confusing)

Search on YouTube: "GitHub Pages deployment 2024" for visual steps

---

## Summary Commands

```powershell
# 1. Add remote
git remote add origin https://github.com/YOUR_USERNAME/vaktijaa.git

# 2. First push
git branch -M main
git push -u origin main

# 3. Future updates (after making changes)
git add .
git commit -m "Update prayer times"
git push origin main

# 4. Auto deploy:
# GitHub automatically deploys when you push!
```

**That's it! Your app is now LIVE on GitHub Pages!** 🚀

Go ahead and share the link:

- https://YOUR_USERNAME.github.io/vaktijaa

---

## What Makes It Work Everywhere:

✅ All CSS/JS use **relative paths**
✅ APIs (Aladhan, Nominatim) are **CORS-enabled**
✅ No build process needed
✅ No API keys required
✅ Works on HTTP and HTTPS
✅ Mobile responsive
✅ Offline support (Service Worker cached)

**Your app is production-ready!** 🕌
