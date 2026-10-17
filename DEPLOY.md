# Deploy Guide

This app is fully static. You can deploy it to GitHub Pages, Netlify, Vercel, Cloudflare Pages, or any ordinary web server.

## GitHub Pages

1. Push the repository to GitHub.
2. Open the repository settings.
3. Go to **Pages**.
4. Choose the branch you want to publish, usually `main`.
5. Choose `/root` as the folder.
6. Save and wait for GitHub Pages to publish the site.

The app uses relative paths, so it works when hosted at:

```text
https://username.github.io/repository-name/
```

## Netlify

1. Create a new Netlify site from the Git repository.
2. Leave the build command empty.
3. Set the publish directory to:

```text
.
```

4. Deploy.

## Vercel

1. Import the Git repository.
2. Select **Other** as the framework.
3. Leave the build command empty.
4. Use `.` as the output directory.
5. Deploy.

## After Deploy

Test these flows:

- Open the homepage on desktop and mobile.
- Search `Berlin`.
- Toggle night mode.
- Open the Hijri calendar and important days sections.
- Refresh the page and confirm styling still loads.
