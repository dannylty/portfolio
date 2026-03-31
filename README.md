# dannylty.com — Personal Portfolio

Personal portfolio and homelab showcase site built with [Jekyll](https://jekyllrb.com/), deployed at [dannylty.com](https://www.dannylty.com).

## Stack

- **Jekyll** 4.2.0 — static site generator
- **SCSS** — custom theming
- **GNU Make** — build and deploy automation
- **rsync** — deployment to production server

## Project Structure

```
.
├── _layouts/        # Page layout templates
├── _includes/       # Reusable HTML components (header, footer, sidebar)
├── _sass/           # SCSS stylesheets
├── posts/
│   ├── apps/        # Self-hosted app write-ups
│   └── projects/    # Technical project write-ups
├── assets/          # Static assets (CSS, JS, images)
├── _config.yml      # Jekyll configuration
├── Makefile         # Build/deploy targets
├── index.md         # Homepage
├── about.md         # About page
└── apps.md          # Apps showcase
```

## Development

Install dependencies:

```bash
bundle install
```

Serve locally with live reload:

```bash
bundle exec jekyll serve
```

## Build & Deploy

```bash
make all      # pull + build + deploy
make pull     # git pull from main
make build    # compile Jekyll site (production)
make deploy   # rsync output to /var/www/html
make clean    # clear cache and build artifacts
```

## Content

- **About** — bio, work experience (ByteDance, Shopee, Autodesk), teaching and research roles at NUS
- **Projects** — homelab cluster setup, holoscrape YouTube scraper
- **Apps** — self-hosted services: Stable Diffusion, Jellyfin, Nextcloud
