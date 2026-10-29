# Portfolio Audit Report — jayeshbpatil.com

Audit date: 27 Oct 2026  
Scope: repo at commit `7b8879f` (identical to the live deploy: same hashed JS/CSS filenames on production) plus live-site testing.  
Mode: **read-only.** No source file was changed. The only file written is this report. Existing `AUDIT.md` (dated 23 Oct) is **stale** — it describes code from before the WebP, Lenis-sync, CSP and H1 fixes — and was left untouched.

## How to read this report

- **Confirmed** = reproduced on the live site, measured by a tool, or read directly in source.
- **Risk** = code reading suggests a problem; not reproduced.
- **Unverified** = could not be tested in this session. Nothing here is an invented result.

Tests actually run: `vite build`, `eslint .` (exit 0, no findings), `npm audit`, `npm outdated`, Lighthouse 12 (mobile + desktop, one run each, headless Chrome on my machine), Playwright on the live site (console, network, nav, keyboard, reduced motion, 5 viewports, resume download, long-task sampling), `curl` header and link checks, JSON-LD validator script.

---

## 1. Scorecard (measured)

| Metric | Mobile (Lighthouse) | Desktop (Lighthouse) |
| --- | --- | --- |
| Performance | **70** | **81** |
| Accessibility | 93 | 93 |
| Best Practices | 82 | 81 |
| SEO | 100 | 100 |
| FCP / LCP | 2.4 s / 2.8 s | 1.7 s / 2.0 s |
| TBT / CLS | 620 ms / 0.003 | 20 ms / 0.002 |
| Speed Index | 6.9 s | 2.0 s |
| Page weight / requests | 529 KiB / 26 | 530 KiB / 26 |
| DOM nodes | 1,390 | 1,399 |

Caveat: Lighthouse printed "page loaded too slowly to finish" on both runs, and these are single lab runs. Treat as indicative. No field data (CrUX / INP) was available.

Other measured facts: 0 console errors, 0 page errors, 0 failed requests, 0 long tasks and ~11 MB JS heap during a full scroll in headless desktop Chrome. `eslint` clean. Build OK (JS 133 KB app + 135 KB vendor + 78 KB gsap + 61 KB framer + 2 KB hero chunk; gzip 48 / 43 / 31 / 22 KB).

---

## 2. What is already good (verified)

- Page renders and scrolls with no console errors. Resume download works (`Jayesh_Patil_Resume.pdf`). Deep link `/#work` lands correctly.
- One `<h1>` (Hero). Previously 6.
- Project images now ship as WebP via `<picture>` (LinkNest 3 MB PNG → 23 KB WebP). Mobile Works is no longer 9 MB.
- Lenis and ScrollTrigger are synced (`LenisScrollSync.jsx`). ServiceSummary uses `trigger:` correctly.
- Nav drawer: Escape closes, focus is trapped and restored, drawer scrolls on short phones (scrollHeight 920 vs 667 viewport), closed-drawer links are `visibility:hidden` so not tabbable. Keyboard focus ring is visible.
- GSAP, cursor trail and hero filter respect `prefers-reduced-motion` (with one exception, see U3).
- FAQ JSON-LD and keyword stuffing are gone. Title, description, canonical, OG/Twitter, robots.txt, sitemap, HTTP→HTTPS 301 all present. OG card is a real 1200×630.
- Analytics/GA removed from code. No secrets in tracked files (checked tracked-file list, no `.env`).
- No horizontal scroll at 320 / 375 / 768 / 1024 / 1920 (only a 15 px scrollbar-width artefact, see U9).

---

## 3. Confirmed issues

Severity: **Critical** (core function broken) · **High** · **Medium** · **Low**.

### 3.1 Bugs and functionality

| ID | Sev | Issue | Evidence | Root cause | Fix | Impact |
| --- | --- | --- | --- | --- | --- | --- |
| F1 | **Critical** | **Navigation drawer links do not scroll the page.** Clicking Home/Experience/About/Work/Resume/Contact closes the drawer and nothing moves. The burger is the only nav, so section jumping is broken for everyone. | Live, Playwright 1440×900: wheel scroll works (scrollY 1500). After opening drawer and clicking "about", `scrollY` sampled every 500 ms for 5 s = `0,0,0,…`; `#about` top stayed 5303. Same for "work". | `Navbar.jsx` calls `lenis.stop()` while the drawer is open and `scrollToSection` runs `lenis.scrollTo()` before the effect cleanup calls `lenis.start()`. Lenis ignores `scrollTo` when stopped: `lenis.mjs:805 if ((this.isStopped \|\| this.isLocked) && !force) return`. | Close drawer, start Lenis, then scroll (or pass `{ force: true }`). | Restores primary navigation. |
| F2 | Medium | Works hover preview sticks at the top-left corner for reduced-motion users on desktop. | Live with `reducedMotion: reduce`: preview rect `x:0,y:0` while cursor at (320,580). Normal mode follows cursor (344,604). | `Works.jsx` returns before creating `quickTo` setters when reduced-motion; mouse handler then bails, but hover still sets opacity 1. | Skip the preview entirely or position it statically when reduced-motion. | Visible glitch for a11y users. |
| F3 | Medium | OneCapital project link is a **404**. | `curl` → `https://github.com/Mahendra111111/onecapital` = 404 (also in JSON-LD). Points to another person's repo, likely private. | Link to a private employer repo. | Link to a case-study section/page, a public demo, or remove the link. | Broken link on the most credible project. |
| F4 | Low | Works reveal is slow: 16 items, stagger 0.3 s + 0.5 s delay. 0 items visible at 0.3 s, 8 at 2.5 s, all 16 at ~6 s after trigger. | Live opacity sampling. | `gsap.from(".project-item", { delay:.5, stagger:.3 })` triggered once off the first item. | Per-item ScrollTriggers, stagger ≤ 0.08. | Fast scrollers see blank rows. |
| F5 | Low | Contact summary marquee says "contact us" (agency voice) on a solo-developer page. Marquee words "Innovation / Precision / Trust / Collaboration / Excellence" are generic. | Source `ContactSummary.jsx`. | Copy. | Rewrite to first person / specifics. | Brand voice. |

### 3.2 Security and production readiness

| ID | Sev | Issue | Evidence | Root cause | Fix | Impact |
| --- | --- | --- | --- | --- | --- | --- |
| S1 | **High** | **Security headers from `src/index.js` are not applied to the homepage or any static file.** CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy are only on the SPA-fallback response (unknown paths). | `curl -D -`: `/` , `/robots.txt`, `/images/*.webp` return **no** CSP / XFO / Referrer-Policy / Permissions-Policy. `/nonexistent-page` returns all of them. | `wrangler.toml` `[assets]` serves matching files directly; the Worker never runs for them. | `run_worker_first = true` under `[assets]` (or a `public/_headers` file). Must be paired with S2. | Clickjacking and policy hardening are currently not in effect where it matters. |
| S2 | **High** (becomes live when S1 is fixed) | The CSP as written would **break production** once enforced on `/`. | Live page makes requests to `api.iconify.design` (3 calls: lucide, mdi, material-symbols-light) — not in `connect-src`. Cloudflare injects `static.cloudflareinsights.com/beacon.min.js`, `/cdn-cgi/zaraz/s.js`, and an inline bot-detection `<script>` + `/cdn-cgi/challenge-platform/.../main.js` — blocked by `script-src 'self'`. | Runtime icon fetching and Cloudflare-injected scripts were not accounted for. | Bundle the 3 icons offline (`addIcon` / inline SVG), then drop iconify API need; decide on Cloudflare Insights/Zaraz/bot-fight (disable or allow-list). | Prevents blank icons / console errors after hardening. |
| S3 | Medium | HSTS is effectively **disabled** and header is wrong: `Strict-Transport-Security: max-age=0; includeSubDomains; preload`. | `curl` on every route. | Set by Cloudflare zone setting (not in repo); `max-age=0` overrides the Worker's 15552000. | Set real max-age (≥ 6 months) in Cloudflare; remove `preload` unless submitting. | No HTTPS pinning. |
| S4 | Medium | No long-term caching. All assets, including hashed `/assets/*.js\|css` and fonts, are `Cache-Control: public, max-age=0, must-revalidate`. | `curl` headers; Lighthouse `uses-long-cache-ttl` / `cache-insight`. | Default Workers-assets headers. | `_headers`: `/assets/*` → `public, max-age=31536000, immutable`; fonts/images long cache. | Faster repeat visits, fewer revalidations. |
| S5 | Medium | `www.jayeshbpatil.com` serves the full site (200) instead of redirecting to apex. | `curl` → 200. Canonical points to apex so risk is limited. | No redirect rule. | 301 www → apex in Cloudflare. | Avoids duplicate-host signals. |
| S6 | Medium | Third-party scripts injected by Cloudflare (Zaraz, Web Analytics beacon, bot challenge) load with **no consent UI** and add 3 Lighthouse "deprecated API" warnings (Best Practices 81–82). | Network list; Lighthouse `deprecations` sources are `/cdn-cgi/challenge-platform/.../main.js`. | Cloudflare dashboard settings, outside repo. | Review settings; disable what is unused; add a short privacy note if analytics stay. | Privacy and Best-Practices score. |
| S7 | Medium | **Public GitHub repo contains personal/working files:** `Profile (10).pdf`, `.json`, `.content.txt` (LinkedIn export), `parse_pdf.cjs`, `extract_pdf_env/`, four ~2 MB root screenshots, duplicate `favicon/` dir, `AUDIT.md`. `.git` is ~328 MB. | `gh repo view` → `PUBLIC`; `git ls-files`. | Working files committed. | Remove from tracking, add to `.gitignore`; history purge is optional and needs your decision. | Privacy and repo hygiene. |
| S8 | Low | `npm audit`: 4 high advisories in `vite ≤6.4.3`, `postcss`, `source-map-js`, `launch-editor`. These are **dev-server / build-time**; they are not shipped to visitors. | `npm audit --omit=dev`. | Outdated deps (Vite 6.4.2; patch 6.4.5 available). | `npm audit fix` then rebuild and re-verify. | Dev-machine safety. |
| S9 | Low | Worker edge case: when an unknown path request carries conditional headers (`If-None-Match`), a 304 from `index.html` would be re-wrapped as `200` with empty body. | Code read, not reproduced. | `index.js` forces `status: 200` regardless. | Strip conditional headers on the fallback request. | Rare blank page. |
| S10 | Low | No real 404: every unknown URL returns 200 + the homepage (soft-404). | `/nonexistent-page` → 200. | SPA fallback. | Return 404 status with a real not-found page, or set Workers `not_found_handling`. | Crawl hygiene. |
| S11 | Low | `http://gravitatee.com` project link is plain HTTP (redirects to HTTPS, ~8.6 s load from here). | `curl`. | Hard-coded URL. | Use `https://`. | Minor. |

### 3.3 Performance

| ID | Sev | Issue | Evidence | Fix | Impact |
| --- | --- | --- | --- | --- | --- |
| P1 | High | Mobile: TBT 620 ms, main-thread 22 s (4× throttle), bootup 7.8 s, Speed Index 6.9 s; LCP 2.8 s. Everything is JS-rendered (`<div id="root">` only), and the LCP element is animated header/hero text that starts offset by GSAP (`y: 50vh`/`200`). | Lighthouse mobile. | Reduce first-load JS work, don't hide LCP text behind intro tween, defer non-critical animation setup, consider prerendering. | Mobile score 70 → target 85+. |
| P2 | Medium | 681 single-character `<span>` + `will-change: color` in About (`ScrollFillText`); DOM 1,390–1,399 nodes (Lighthouse `dom-size` flagged). | Playwright `.scroll-fill-char` count; Lighthouse. | Split by word, or animate via gradient/clip mask; drop `will-change`. | Less style/layout cost. |
| P3 | Medium | Hero SVG filter (`feTurbulence` + 2× `feDisplacementMap` + blur on an oversized layer) runs on desktop continuously while hero in view. | Source `etheral-shadow.tsx`. Desktop long-tasks were 0 in my run. | Pause earlier, cap size, or swap for a static/CSS gradient on low-power devices. | GPU/CPU savings. Cross-browser cost **unverified** (Safari/Firefox). |
| P4 | Low | `hero-mask.png` (156 KB) and `hero-noise.png` (82 KB) still PNG; `jayesh-patil.jpg` used in About though WebP exists. Lighthouse: 148 KiB image delivery savings. | Lighthouse `modern-image-formats`. | Convert + `<picture>`. | −150 KB. |
| P5 | Low | Render-blocking CSS (6.5 KB, 231 ms est.). | Lighthouse. | Inline critical CSS or accept. | Small FCP gain. |
| P6 | Low | Only Regular/Light/Italic Amiamie faces are used in code; 10 OTF + 10 TTF files (~1.5 MB) ship, plus dual `format()` lists. Unused: Black, BlackItalic, all Round. | `grep` for `font-bold/black/Round` → none. | Ship WOFF2 for used weights only. | Smaller deploy; no runtime cost today. |
| P7 | Low | Dead deploy weight: `favicon.svg` 745 KB (unreferenced), legacy `.png` originals (10.6 MB in `dist`), `android-chrome-*`, `favicon-16x16`, `_routes.json` (Pages-only). | `dist` listing; `index.html` refs. | Delete unreferenced files; keep PNG only if needed as fallback. | `dist` 14 MB → ~3 MB. |
| P8 | Low | Marquee creates a GSAP `Observer` per instance and only kills the timeline on unmount (`Marquee.jsx`); `Contact` passes a fresh `items` array each render. | Code read. | `observer.kill()` in cleanup. | Leak in StrictMode/dev. |
| P9 | Low | `gsap/all` imported in 3 files; `gsap.registerPlugin(ScrollTrigger)` repeated in 7 files. | Code read. | Import only needed plugins; register once. | Tidier, possibly smaller. |
| P10 | Low | Hero uses `h-screen`/`w-screen` / `min-h-screen` (100vh); `document.scrollWidth` exceeds `clientWidth` by the scrollbar width at all 5 viewports. | Playwright. | Use `dvh`/`inset-0` instead of `w-screen`. | Mobile browser-bar jump; hidden by `overflow-x:hidden`. |

### 3.4 SEO

| ID | Sev | Issue | Evidence | Fix |
| --- | --- | --- | --- | --- |
| O1 | Medium | `Person.worksFor` = Divines Code, but the page says OneCapital (Dec 2025 – present) and Divines Code freelance ended Mar 2026. JSON-LD must match visible content. | `index.html` L90 vs `Services.jsx`. | Point `worksFor` to OneCapital or remove. |
| O2 | Medium | `ProfessionalService` schema claims services, but the page has no services section (ServiceSummary is decorative words). | Source. | Remove or add a real services block. |
| O3 | Medium | Project JSON-LD `image` still points to the 2–3 MB PNGs; OneCapital `url` is the 404 GitHub link; Gravitate is `http://`. | `index.html`. | Use WebP/OG-size URLs, fix links. |
| O4 | Low | Sitemap `lastmod` is hard-coded (2026-10-23); `loc` has trailing slash while canonical/og:url do not. `changefreq`/`priority` are ignored by Google. | `public/sitemap.xml`. | Align slash form; update lastmod on deploy. |
| O5 | Low | Whole body is client-rendered. Googlebot renders JS; link-preview/LinkedIn/Bing-lite crawlers see only `<head>` metadata (no `<noscript>`, no static H1/text). | `curl` body = `<div id="root"></div>`. | Prerender the home page or add a `<noscript>` summary. |
| O6 | Low | Hero says "Full Stack **MERN** Developer" + meta uses React/Next/Node, but recent work is Fastify/Supabase/PostgreSQL/TypeScript. Positioning is inconsistent. | Source. | Pick one positioning line and use it everywhere. |
| O7 | Low | OG card has a stray white strip on the right edge and uses generic Arial. | Viewed `og-card.jpg`. | Regenerate with brand font and full-width background. |
| O8 | Info | Next.js `next-seo` / `generateMetadata` do not apply (Vite SPA). Metadata lives in `index.html`. | — | — |

### 3.5 Accessibility

| ID | Sev | Issue | Evidence | Fix |
| --- | --- | --- | --- | --- |
| A1 | Medium | Colour contrast fail: 15 experience index numerals `text-white/30` on black = **2.44:1** (needs 4.5:1). | Lighthouse `color-contrast`. | Raise to ≥ `white/60` or mark `aria-hidden`. |
| A2 | Medium | Heading structure: Lighthouse `heading-order` fails on first Experience `<h3>`. Project names (16) and Contact labels (E-mail / Phone / Social Media) are `<h2>` though they sit under the Works / Contact `<h2>`. | Lighthouse; Playwright heading dump. | Make project names and contact labels `h3`. Root cause of the Lighthouse flag specifically is not fully explained — recheck after fix. |
| A3 | Medium | Lenis smooth scroll stays on with `prefers-reduced-motion: reduce` (`html.lenis` present). | Playwright. | Don't mount Lenis (or set `lerp:1`) when reduced-motion. |
| A4 | Low | Marquees (`contact us` ×5, `just imagine, I code` ×5, five values) are read by screen readers repeatedly. | Source (`Marquee.jsx` has no `aria-hidden`). *Risk, not screen-reader tested.* | `aria-hidden="true"` on decorative marquee, keep one visible text. |
| A5 | Low | Drawer `[ VIEW ] [ DOWNLOAD ]` are ~14 px, `white/50`, no padding — small touch targets. | Screenshot at 375 px. | ≥ 44 px hit area. |
| A6 | Low | No skip link; drawer `<nav>` has no `aria-label`; `<nav>` and the cursor `<canvas>` sit inside `<main>`; no `<footer>`. | Playwright landmark count (main 1, nav 1, footer 0). | Move nav outside main; add label; add footer. |
| A7 | Low | Computed (not tool-measured): "View Resume" hover = gold `#cfa355` text on white ≈ 2.2:1. | Calculation. | Use dark text on hover. |
| A8 | Low | Burger is black on black over the Experience section, so only its two lines read. | Screenshot. | Add a light ring or invert over dark sections. |
| A9 | Risk | `ScrollFillText` splits text into letter spans; some screen readers may announce letters. Not tested with NVDA/VoiceOver. | Source. | `aria-label` on paragraph + `aria-hidden` on spans. |

### 3.6 UI/UX and content

| ID | Sev | Issue | Evidence | Fix |
| --- | --- | --- | --- | --- |
| C1 | High | **No call to action above the fold.** Hero has name + tagline but no "View work / Download resume / Email me". The only nav is a burger. | Screenshots 1440 / 375. | Add 2 CTAs + visible top links on desktop. |
| C2 | High | **Project descriptions are never shown.** `constants/index.js` holds "Problem / Solution / Impact" text, `Works.jsx` renders only name + tech tags (descriptions and `bgImage` are dead data). Hiring managers cannot see role, outcome, or links to case studies. | `grep` (`.description` only used in Experience). | Surface 1–2 line impact per featured project; add role + year. |
| C3 | Medium | 5 of 16 projects are explicit clones (Rejouice, Lazarev, Outpost, Rethink, Sundown). Listed with equal weight to client/production work. | `constants`. | Group under "Practice / UI studies", or drop. |
| C4 | Medium | Metrics are strong but unsourced (15+ h/week saved, ~25% load, ~20% API, sub-100 ms API, Lighthouse 95+, "zero floating-point errors", "near-zero latency"). The LinkedIn export in the repo lists **20% page-load / 25% API** — the site has these two numbers the other way round (text extraction was column-jumbled, so *possible* swap, please confirm). | Source; `Profile (10).content.txt`. | Verify each claim; keep only defensible ones. |
| C5 | Medium | No skills/tech summary, education (LinkedIn export says MCA 2027 + certifications) or testimonials on the page. | Source. | Add compact skills + education strip. |
| C6 | Medium | Experience dates overlap: Freelance Divines Code Jun 2025–Mar 2026 vs OneCapital Intern Oct 2025 / Full-time Dec 2025. Probably legitimate but unexplained. | `Services.jsx`. | Label "Freelance (part-time)" or adjust dates. |
| C7 | Low | Hero background is **flat grey on mobile** (effect disabled ≤853 px) — mobile looks emptier than desktop. | 375 px screenshot. | Light static texture on mobile. |
| C8 | Low | Noise overlay at full opacity reduces legibility of Light-weight hero text on desktop. | 1440 screenshot. | Lower noise or bump weight. |
| C9 | Low | Contact is the last block; no footer (copyright, back-to-top, email). Phone number is public in HTML + JSON-LD (scraping risk, your call). | Source. | Add footer; consider email/WhatsApp only. |

### 3.7 Code quality and architecture

| ID | Sev | Issue | Evidence | Fix |
| --- | --- | --- | --- | --- |
| Q1 | Medium | Unused deps: `react-helmet-async`, `pdf-parse` (no import in `src/`). `@iconify/react` is in `devDependencies` but needed at runtime. `ts-node`, `@types/node` unused. React 18 installed but `@types/react` is 19. | `package.json`, `grep`. | Remove/move; align types to React 18 or upgrade. |
| Q2 | Low | Dead code: `FeaturedWorks.jsx` (empty), `sheryEffects.js` (`applyImageEffect`, `cleanupSheryEffects` unused), 80 commented lines of `servicesData`, `bgImage` field, `lib/utils.ts` (`cn` unused). | `grep`. | Delete. |
| Q3 | Low | `Services.jsx` exports `Experience`; Works imports Iconify from `@iconify/react/dist/iconify.js` while Marquee imports `@iconify/react`. | Source. | Rename; unify import. |
| Q4 | Low | README is stale/wrong (says React 19, placeholder clone URL, "Direct Contact" etc.). | README. | Rewrite. |
| Q5 | Low | No tests, no CI, no `engines`, no `browserslist`. ESLint only covers `.js/.jsx` (not `.tsx/.ts`). | Repo, `eslint.config.js`. | Add CI (`build` + `lint`) and a basic e2e smoke test (nav, resume). |
| Q6 | Low | Navbar duplicates the resume download logic in `Resume.jsx`; a code comment says "timestamp" but none exists. Resume exists in two places that differ: Supabase PDF (248 KB, linked) vs `public/assets/Cv/Jayesh_Resume.pdf` (75 KB, also publicly served). | `curl` Content-Length vs local file. | One source of truth; delete the other. |
| Q7 | Low | Stale `AUDIT.md` contradicts the code. | Compared. | Replace with this report. |

### 3.8 Browser compatibility

| ID | Sev | Issue | Evidence |
| --- | --- | --- | --- |
| B1 | Low | Tailwind v4 output uses `@property`, `color-mix()`, `@layer`. Needs Chrome 111+/Safari 16.4+/Firefox 128+; older browsers will render unstyled. No `browserslist` declared. | Built CSS inspection. Acceptable for a portfolio, but decide explicitly. |
| B2 | Unverified | **Safari/iOS, Firefox, Edge, Android devices were not tested.** Only Chromium (Playwright + Lighthouse). SVG-filter hero, `clip-path` animation, `text-wrap: balance/pretty` and `mask-image` are the first places to check. | — |

---

## 4. Not tested / limits

- Real phones/tablets, touch gestures, iOS Safari, Firefox, WebKit (only viewport emulation in Chromium).
- Field Core Web Vitals / INP (no CrUX), Search Console indexing state, Rich Results Test, social-card previews.
- Screen-reader walk-through (NVDA/VoiceOver) and a full axe run beyond Lighthouse's accessibility audit.
- `riyanshamrit.com` and `yaseenglobalfoundation.in` returned no HTTP response from my machine on one probe; I did not retry, so their status is **unknown**. LinkedIn (999) and CodePen (403) block bots; status unknown. Other project and social links returned 200.
- Cloudflare dashboard (Zaraz, Insights, bot fight, HSTS, redirects) — inferred from responses only.
- Semgrep not run. Secret scanning not run (tracked-file list shows no `.env`).
- Branding/visual taste items (C7, C8, A8) are my judgment from screenshots.

---

## 5. Prioritised improvement plan (awaiting your approval)

Nothing below has been started.

### P0 — broken core functionality and security

| # | Task | Files | Why | Depends on | Verify |
| --- | --- | --- | --- | --- | --- |
| 0.1 | Fix nav drawer scrolling (close drawer → `lenis.start()` → `scrollTo`, or `force:true`) | `src/sections/Navbar.jsx` | F1: primary nav is dead | — | Playwright: click each link, assert target `top ≈ 0`; mobile + desktop; focus returns to burger |
| 0.2 | Apply security headers to all responses and fix CSP | `wrangler.toml` (`run_worker_first` or `public/_headers`), `src/index.js` | S1 | 0.3 | `curl -I /` shows CSP/XFO/RP/PP; browser console has zero CSP violations |
| 0.3 | Remove runtime Iconify API dependency (inline the 3 icons) and decide on Cloudflare Zaraz/Insights/bot-fight | `Works.jsx`, `Marquee.jsx`, (Cloudflare dashboard) | S2/S6: CSP would break icons/scripts | — | Network tab: no `api.iconify.design`; icons render; no blocked-script errors |
| 0.4 | Fix or remove OneCapital 404 link (also in JSON-LD) | `constants/index.js`, `index.html` | F3 | Your decision on what to link | `curl` = 200 or no link |
| 0.5 | Set real HSTS + long cache for hashed assets + www→apex redirect | Cloudflare dashboard, `_headers` | S3/S4/S5 | Dashboard access | `curl -I` values |

### P1 — major UX, content and performance

| # | Task | Files | Why | Verify |
| --- | --- | --- | --- | --- |
| 1.1 | Hero CTAs ("View work", "Download resume", "Email") + visible top nav on desktop | `Hero.jsx`, `Navbar.jsx` | C1 | Click-through test; Lighthouse a11y still ≥ 93 |
| 1.2 | Show project impact line + role + year on Works rows (use existing `description`); group clones separately | `Works.jsx`, `constants/index.js` | C2/C3 | Visual review at 375/768/1440; no layout shift |
| 1.3 | Verify and correct metrics; resolve overlapping dates | `Services.jsx`, `About.jsx`, `constants` | C4/C6 | You confirm each number |
| 1.4 | Cut mobile main-thread work: word-level `ScrollFillText`, don't hide LCP text, defer non-critical GSAP/filters, fix Works stagger | `ScrollFillText.jsx`, `AnimatedHeaderSection.jsx`, `Works.jsx`, `Hero.jsx` | P1/P2/F4 | Lighthouse mobile ≥ 85, TBT < 300 ms (same method, 3 runs) |
| 1.5 | Convert remaining PNG/JPG (hero mask/noise, About) to WebP/AVIF | `etheral-shadow.tsx`, `About.jsx` | P4 | Lighthouse image-delivery audit clear |
| 1.6 | Reduced-motion: static Works preview, no Lenis | `Works.jsx`, `App.jsx` | F2/A3 | Playwright `reducedMotion: reduce` |

### P2 — SEO, accessibility, code quality

| # | Task | Files | Verify |
| --- | --- | --- | --- |
| 2.1 | JSON-LD accuracy: `worksFor`, drop `ProfessionalService` (or add services), WebP images, https links | `index.html` | `validate-jsonld.mjs` + Rich Results Test |
| 2.2 | Prerender or `<noscript>` content for non-JS crawlers; sitemap lastmod automation; one positioning line (MERN vs actual stack) | `index.html`, `vite.config.js`, `Hero.jsx` | `curl` shows H1/text; social debuggers |
| 2.3 | Heading levels (project names/contact labels → h3), contrast on numerals, marquee `aria-hidden`, landmarks, skip link, touch targets | `Works.jsx`, `Contact.jsx`, `Services.jsx`, `Marquee.jsx`, `App.jsx`, `Navbar.jsx` | Lighthouse a11y 100, axe clean, keyboard walk-through |
| 2.4 | Dependency and dead-code cleanup, `npm audit fix`, README rewrite, add CI | `package.json`, `FeaturedWorks.jsx`, `sheryEffects.js`, `README.md`, `.github/workflows` | `npm run build && npm run lint` green, `npm audit --omit=dev` 0 |
| 2.5 | Repo hygiene: untrack LinkedIn export, screenshots, `favicon/`, `extract_pdf_env/`; single resume source | `.gitignore`, repo root | `git ls-files` review (history purge only if you want it) |
| 2.6 | Marquee Observer cleanup, plugin registration once, `gsap/all` → targeted imports | `Marquee.jsx`, `main.jsx` and others | No duplicate listeners (DevTools), bundle size ≤ current |

### P3 — polish and optional

| # | Task | Notes |
| --- | --- | --- |
| 3.1 | Proper 404 page and status | Needs Worker/asset config |
| 3.2 | Mobile hero texture; hero noise tuning; OG card redesign with brand font | Design judgment — your taste call |
| 3.3 | Slim fonts to used faces as WOFF2; remove dead assets | −1.5 MB deploy |
| 3.4 | Footer, back-to-top, testimonials/skills/education strip | Content you must supply |
| 3.5 | Cross-browser pass (Safari/Firefox/Android) and real-device test | Needs devices |
| 3.6 | Playwright smoke test in CI | Prevents F1 regressions |

### P0 implementation status (approved scope: P0 only; done, not committed or deployed)

| Task | Status | Evidence (local `wrangler dev` build, Chromium) |
| --- | --- | --- |
| 0.1 Nav drawer scroll | Done — `Navbar.jsx` calls `lenis.start()` before `scrollTo` | about / work / contact / home / resume all land at `top: 0` (before fix: `scrollY` stayed 0). Same at 375 px. Wheel scroll still works afterwards. |
| 0.2 Headers on all responses | Done — new `public/_headers`; Worker no longer duplicates CSP | `curl -I` on `/`, a JS file, a font, a WebP and an unknown path all return CSP, XFO, nosniff, Referrer-Policy, Permissions-Policy, HSTS. Zero console/CSP errors on load and during nav. |
| 0.3 Iconify offline | Done — `src/lib/icons.js` bundles the 3 icons | 0 requests to `api.iconify.design`; icons render in Works and marquees. App chunk 133 → 126 KB. |
| 0.4 OneCapital 404 link | Done — row now opens an on-page case study (`CaseStudy.jsx`, `#onecapital`); JSON-LD url updated | Click scrolls to the section; uses only the Problem/Solution/Impact text already in `constants`; states there is no public demo/source. |
| 0.5 Cache | Partly done — `_headers` gives `/static/*` immutable and `/fonts/*` 30 days; Vite `assetsDir: "static"` | Verified locally. **Not doable in repo:** HSTS `max-age=0`, www→apex redirect, Zaraz/Insights/bot-fight (Cloudflare dashboard). |

Checks: `vite build` OK, `eslint .` exit 0, `validate-jsonld.mjs` OK.  
Caveats: (1) production behaviour of `_headers` through the Worker was verified locally only; confirm `curl -I https://jayeshbpatil.com/` after deploy. (2) Cloudflare's injected inline bot-detection / Zaraz init scripts will be blocked by the CSP, and Cloudflare Web Analytics is allow-listed; if you see CSP errors after deploy, disable those Cloudflare features or relax the CSP. (3) `.wrangler` added to `.gitignore`.

### Decisions I need from you

1. Do you want the CSP/headers enforced site-wide (needs 0.3 first), or keep current behaviour?
2. What should the OneCapital project link point to?
3. Keep or demote the 5 clone projects?
4. Which metrics on the page can you stand behind?
5. Remove `Profile (10).*` and screenshots from the public repo (and optionally purge git history)?
6. Do you have Cloudflare dashboard access for HSTS, cache, redirect, Zaraz/Insights changes?

---

## 6. Status of the old `AUDIT.md` claims

Fixed since it was written (do not re-do): banner type clamp (R1/R2), WebP project images (P1/P2), Lenis↔ScrollTrigger sync (P5), reduced-motion branches (P6, partly), ServiceSummary `target→trigger` (P8/B1), single H1 (S1/A1), FAQ JSON-LD removal (S2), keyword meta removal (S3), real OG card (S5), GA removal (C2), drawer focus trap/Escape/scroll (A3, R7), `mailto:`/`tel:` links (A4), typo fixes (R9–R12).  
Still open from it: dead files, unused deps, unused project data fields, `http://gravitatee.com`, root screenshot dumps, security headers (now present in code but **not effective**, see S1).
