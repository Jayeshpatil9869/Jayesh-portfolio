# Project structure

Keep **source** and **served assets** separate. Do not put screenshots or audit docs in `public/` unless they must be live on the site.

```text
Jayesh-portfolio/
├── index.html                 # SEO meta + JSON-LD entry shell
├── package.json
├── vite.config.js
├── wrangler.toml              # Cloudflare Workers deploy
├── README.md
│
├── src/                       # Application source (do not break imports)
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.js               # Worker SPA fallback
│   ├── index.css
│   ├── constants/             # projects, socials, experience, education
│   ├── sections/              # page sections
│   ├── components/            # shared UI / motion
│   ├── lib/                   # icons, utils
│   └── utils/
│
├── public/                    # Copied to dist as-is (served)
│   ├── _headers / _routes.json
│   ├── images/                # Works hover previews (jpg/png + webp)
│   ├── fonts/ / assets/
│   └── favicons, robots, sitemap, webmanifest
│
├── assets/
│   └── screenshots/           # Source live captures (*-live.png). Not served.
│
├── docs/                      # Audits, strategy, LinkedIn export notes
├── scripts/                   # Image/optimize/pdf helpers
├── dist/                      # Build output (gitignored)
└── .wrangler/                 # Local Wrangler state (gitignored)
```

## Updating Works previews

1. Save a full-page desktop capture into `assets/screenshots/<name>-live.png`.
2. Register it in `scripts/sync-project-previews.mjs` if new.
3. Run:

```bash
node scripts/sync-project-previews.mjs
```

That writes cropped/optimized files into `public/images/` with the filenames already referenced by `src/constants/index.js`.

## Do not

- Edit files under `dist/` by hand — rebuild with `npm run build`.
- Move `src/` section files without updating `App.jsx` imports.
- Commit secrets or private credentials (resume stays on Supabase public URL by design).
