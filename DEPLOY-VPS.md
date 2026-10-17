# Deploy `prayer-time.work.gd` to a VPS

This is a static site: Nginx serves the files directly; no Node.js process or build step is needed. The existing `prayer-times.work.gd` site can keep using its current Nginx site and document root.

Replace `YOUR_GITHUB_NAME`, `YOUR_VPS_IP`, and the SSH username below with your own values.

## 1. Create a separate GitHub repository

Create an empty repository on GitHub, for example `prayer-vaktija-tv`. Do not add a README, license, or `.gitignore` there. This workspace already has an `origin` remote for the existing repository, so add the new repository as `deploy` and leave `origin` alone:

```powershell
git add config.js index.html script.js style.css sw.js manifest.json DEPLOY-VPS.md
git commit -m "Polish TV layouts and VPS deployment"
git remote add deploy https://github.com/YOUR_GITHUB_NAME/prayer-vaktija-tv.git
git push -u deploy main
```

If Git says `deploy` already exists, update that remote instead:

```powershell
git remote set-url deploy https://github.com/YOUR_GITHUB_NAME/prayer-vaktija-tv.git
git push -u deploy main
```

Keep the repository public for a simple HTTPS clone from the VPS. For a private repository, configure a read-only SSH deploy key on GitHub first and use its SSH clone URL instead.

## 2. Point the new domain to the VPS

In the DNS control panel for `work.gd`, create this record:

| Type | Name | Value |
| --- | --- | --- |
| A | `prayer-time` | `YOUR_VPS_IP` |

Only add an AAAA record if the VPS has a working public IPv6 address. This will point the new hostname at the server; it does not change the old site's DNS record.

## 3. Clone the new repository on Ubuntu/Debian

SSH into the VPS, then run:

```bash
sudo apt update
sudo apt install -y nginx git
sudo install -d -o "$USER" -g "$USER" /var/www/prayer-time
git clone https://github.com/YOUR_GITHUB_NAME/prayer-vaktija-tv.git /var/www/prayer-time
```

If you use UFW, allow web traffic (and make sure the VPS provider firewall also allows ports 80 and 443):

```bash
sudo ufw allow 'Nginx Full'
```

## 4. Add an Nginx site for the new hostname

Create `/etc/nginx/sites-available/prayer-time.work.gd`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name prayer-time.work.gd;

    root /var/www/prayer-time;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    location = /index.html {
        add_header Cache-Control "no-cache";
    }

    location = /sw.js {
        add_header Cache-Control "no-cache";
    }

    location ~* \.(css|js|json|webmanifest|svg|png|jpg|jpeg|webp|ico)$ {
        expires 1h;
        add_header Cache-Control "public";
    }
}
```

Enable and load this site:

```bash
sudo ln -s /etc/nginx/sites-available/prayer-time.work.gd /etc/nginx/sites-enabled/prayer-time.work.gd
sudo nginx -t
sudo systemctl reload nginx
```

This site has its own `server_name` and document root, so requests to the existing `prayer-times.work.gd` site continue to use its existing Nginx configuration.

## 5. Enable HTTPS

Once DNS resolves to the VPS and the site opens over HTTP, install Certbot using its current instructions for your VPS operating system and Nginx, then run:

```bash
sudo certbot --nginx -d prayer-time.work.gd
sudo certbot renew --dry-run
```

## 6. Publish future changes

On this computer:

```powershell
git add .
git commit -m "Describe the update"
git push deploy main
```

On the VPS:

```bash
cd /var/www/prayer-time
git pull --ff-only origin main
```

Nginx serves the updated static files immediately; a Nginx reload is only needed after changing its configuration. The service-worker cache version is bumped for this UI release so browsers can pick up the new files.
