# Jayesh Portfolio — Full Audit

Date: 23 October 2026  
Project: `Jayesh-portfolio`  
Live site: https://jayeshbpatil.com  
Stack: Vite 6 + React 18 + Tailwind CSS 4, GSAP, Lenis, Framer Motion, Cloudflare Worker  
Method: static code review, asset inventory, SEO/security review of `index.html`, `src/index.js`, `public/robots.txt`, `public/sitemap.xml`, and built `dist/` sizes.

This document records what was audited, what is already strong, and every issue found. It does not claim rankings, traffic, or a Lighthouse score. Live Lighthouse, axe, and Reticle were not run in this pass. Semgrep and ESLint did not execute in this session (CLI unavailable / `npx` not found from the quality runner).

---

## 1. What was audited

| Area | What was checked |
| --- | --- |
| Architecture | App shell, sections, Worker, Vite config, dependencies |
| Responsiveness | Breakpoints, type scale, mobile vs desktop behavior, overflow |
| UI / motion | Hero, nav, works hover, sticky experience, marquees, cursor |
| Performance / lag | Image weight, fonts, JS chunks, animation cost, third-party loads |
| Accessibility | Headings, nav button, alt text, reduced motion, focus |
| SEO | Title, description, canonical, robots, sitemap, OG/Twitter, JSON-LD |
| Security / privacy | Headers, links, analytics, public data, dependency surface |
| Bugs / quality | Typos, dead files, unused deps, dates, git hygiene, copy |

---

## 2. Architecture (what the project is)

- Single-page React app. `App.jsx` renders Navbar, Hero, ServiceSummary, Services (experience), About, Works, Resume, ContactSummary, Contact.
- Sections are **not** code-split. Comment in `App.jsx` says lazy loading was removed so crawlers see text in the first render.
- Smooth scroll: `ReactLenis` wraps the page.
- Deploy: Cloudflare Worker in `src/index.js` serves `dist/` and falls back to `index.html` for unknown routes.
- Build splits `react`, `gsap`, and `framer-motion` into manual chunks (`vite.config.js`).
- Code graph (this session): 24 files parsed, 77 nodes, 501 edges.

---

## 3. Plus points (what is already good)

### Product and structure

- Clear portfolio story: hero, experience, about, works, resume, contact.
- Real project list with live URLs, not placeholder cards.
- Experience copy is specific (OneCapital, Divines Code, Digi Mirai) instead of generic “passionate developer” filler.
- Mobile is considered in several places: hero background deferred on small screens, etheral shadow paused on mobile, works hover preview disabled under 768px, custom cursor skipped on touch / narrow screens, magnet effect desktop-only.

### Performance choices already made

- Project and about images use `loading="lazy"`, `decoding="async"`, and width/height attributes.
- Hero WebGL/SVG effect is lazy-loaded and delayed (`requestIdleCallback` / timeout on mobile).
- `font-display: swap` on Amiamie `@font-face`.
- Font preload for Amiamie Regular.
- Google font preconnect for Spartan.
- Vendor / GSAP / Framer chunks are split in the Vite build.
- Built JS is modest next to images: `dist/assets/vendor` ~132 KB, main index chunk ~128 KB.

### Accessibility (partial)

- Burger button has `aria-label`, `aria-expanded`, and `aria-controls`.
- Decorative burger lines are `aria-hidden`.
- External links use `rel="noopener noreferrer"`.
- A `.sr-only` utility exists in `index.css`.
- Works links have `aria-label`.

### SEO foundations (strong for a Vite SPA)

- `lang="en"` and a real viewport meta tag.
- Unique title and meta description aimed at a person + role (Jayesh Patil, full stack / MERN).
- Canonical: `https://jayeshbpatil.com`.
- `robots`: `index, follow`.
- Open Graph and Twitter card tags, including image, locale `en_IN`, site name, and `@Jayeshpatil1553`.
- `public/robots.txt` allows crawl and points at the sitemap.
- `public/sitemap.xml` exists for the homepage.
- Large schema.org `@graph` in `index.html`: Person, Organization, WebSite, ProfilePage, BreadcrumbList, ProfessionalService, CreativeWork (resume), ItemList, and per-project WebApplication entries.
- Favicon set, apple touch icon, and web app manifest are present.
- Content is in the client bundle rather than hidden behind route-level suspense, which helps a JS-rendered one-page site.

### Security posture (for this kind of site)

- No auth, no database, no user-submitted forms in the app. Attack surface is a static SPA plus a thin asset Worker.
- Resume is fetched from a public Supabase URL on purpose.
- Social and project links are mostly HTTPS.
- Analytics ID is a public measurement ID, not a secret.

### Engineering hygiene (partial)

- ESLint config exists (`eslint.config.js`).
- `.gitignore` ignores `node_modules`, `dist`, and logs.
- Resume download has a blob fallback if fetch fails.
- GSAP effects in `sheryEffects.js` return cleanup functions.

---

## 4. Issues and problems

Severity: **P0** fix first, **P1** high, **P2** medium, **P3** cleanup.

### 4.1 Responsiveness and UI

| ID | Sev | Issue |
| --- | --- | --- |
| R1 | P0 | Mobile banner type is broken. `.banner-text-responsive` sets `font-size: 68px` and `line-height: 2.25rem` (36px). Text is taller than its line box, so titles clip or collide on phones. |
| R2 | P1 | Default `titleFontSize` is `text-[5rem] sm:text-[3rem] md:text-[10rem]`. From 640px the utility shrinks the title, then CSS media queries push `.banner-text-responsive` back up. Two systems fight. |
| R3 | P1 | Experience cards use `text-4xl` / `text-2xl` responsibilities inside `px-10` with no wrap strategy for long lines. Sticky desktop stack (`top: calc(10vh + index * 5em)`) can overflow short viewports. |
| R4 | P1 | Works mobile preview forces `h-[400px]` and loads both background and foreground images. On a phone that is a tall, heavy block per project. |
| R5 | P2 | `App` root uses `w-screen`, which includes scrollbar width and can cause a horizontal scroll flicker. `overflow-x-hidden` hides the symptom. |
| R6 | P2 | Burger hides on scroll-down via `clip-path: circle(0%)`. The control disappears while scrolling, which is awkward on mobile. |
| R7 | P2 | Nav drawer is full viewport, `text-5xl` links, `py-24`. On short phones the link list plus email/socials can overflow with no scroll region of its own. |
| R8 | P2 | About image class `w-md` is not a standard Tailwind width. The portrait may not size as intended. |
| R9 | P2 | Contact header copy: “Got a question, how, or project idea?” reads broken. Marquee repeats “just imagin, I code”. |
| R10 | P2 | Service summary word is misspelled: “Architucture”. |
| R11 | P3 | Works class typo: `transtion-all` (animation class never applies). |
| R12 | P3 | About image alt is `"man"`. It does not describe Jayesh Patil. |

### 4.2 Performance and lag

| ID | Sev | Issue |
| --- | --- | --- |
| P1 | P0 | Four project PNGs dominate the site. Measured sizes: `linknest.png` 2,940 KB, `veloraa-rougee.png` 2,492 KB, `Gravitate_Masala.png` 2,229 KB, `divines-code.png` 1,605 KB. Together about **9.3 MB**. Same files are copied into `dist/images/`. |
| P2 | P0 | Mobile Works renders those full PNGs inside a 400px box. No `srcset`, no WebP/AVIF, no smaller mobile file. |
| P3 | P1 | `public/favicon.svg` is **745 KB**. A favicon should be a few KB. |
| P4 | P1 | Amiamie ships both OTF and TTF, including Round cuts. Fonts under `public/fonts` total about **1.52 MB**. CSS lists both formats, so browsers may download more than one file per face. |
| P5 | P1 | Lenis smooth scroll is on, but GSAP ScrollTrigger is never told to use Lenis (`scrollerProxy` / Lenis `scroll` → `ScrollTrigger.update` is missing). Scrub, pin, and sticky sections can stutter or fire late. |
| P6 | P1 | Motion stack always runs: GSAP ScrollTrigger, Lenis, Framer Motion hue loop, custom cursor GSAP ticker (15 points, full-screen canvas clear every frame), SVG `feTurbulence` hero filter. No `prefers-reduced-motion` branch. |
| P7 | P1 | `ContactSummary` pins for `+=800` while Lenis is unsynced. Pin + smooth scroll is a common jank source. |
| P8 | P1 | `ServiceSummary` ScrollTrigger configs use `target:` instead of `trigger:`. Those horizontal tweens likely never attach to the right elements. |
| P9 | P2 | Hero masks and noise load from `framerusercontent.com`. If that CDN is slow or blocked, the hero background fails. Extra third-party requests on first paint. |
| P10 | P2 | Custom cursor sets `cursor: none` on a full-screen canvas. Body comment says the default cursor should stay visible. The canvas is `pointer-events: none`, so the CSS cursor on the canvas may not hide the real cursor — behavior is inconsistent. |
| P11 | P2 | `applyImageEffect(".portfolio-img")` runs once on mount. Mobile images mount immediately; the desktop preview image mounts later, so the hover scale often misses the floating preview. |
| P12 | P2 | Google Fonts CSS `@import` for Spartan in `index.css` plus `<link rel="preconnect">` in HTML. Render-blocking font CSS on top of self-hosted Amiamie. |
| P13 | P3 | `StrictMode` double-invokes effects in dev, which makes GSAP setup look worse locally than in production. Still worth guarding listeners. |
| P14 | P3 | Root screenshot PNGs (another ~9 MB: Veloraa, Gravitate, LinkNest, Divines Code captures) sit in the repo root and were staged. They are not site assets. `Profile (10).pdf`, `.json`, and `.content.txt` are also in the tree. |

### 4.3 SEO

Intent this page serves: someone searching for **Jayesh Patil** as a full-stack / MERN developer (navigational + professional profile). That intent is clear. Do not treat keyword count as a ranking lever.

| ID | Sev | Issue |
| --- | --- | --- |
| S1 | P0 | Every section header is an `<h1>` because `AnimatedHeaderSection` always renders `<h1>`. Home, Experience, About, Works, Resume, and Contact each add one. A page should have one clear H1. |
| S2 | P1 | FAQPage JSON-LD lists four questions, but no FAQ is visible on the page. Structured data must match visible content. |
| S3 | P1 | Meta keywords list is stuffed (dozens of phrases: MERN, Pune, GSAP, JWT, DigiMirai, Divines Code, and more). Search engines ignore the keywords meta tag; the list reads as stuffing. |
| S4 | P1 | Title is long and pipe-stacked: “Full Stack Developer India \| MERN Stack Expert \| React & Next.js Specialist”. Prefer one clear topic plus name. |
| S5 | P1 | `og:image` / Twitter image is `/images/jayesh-patil.jpg` with declared size 1200×630. The file is a portrait (~66 KB), not a 1200×630 social card. Platforms will crop it badly. |
| S6 | P1 | Sitemap `lastmod` is `2025-01-25` while the site content is newer (2026). Only the homepage URL is listed, which is correct for a single-page site, but the date is stale. |
| S7 | P2 | Canonical has no trailing slash (`https://jayeshbpatil.com`) while some schema IDs use the same host. Keep one canonical form everywhere (already mostly consistent). |
| S8 | P2 | BreadcrumbList points at hash URLs (`#about`, `#experience`). Those are in-page jumps, not separate indexable URLs. Harmless if treated as on-page structure; do not expect them to rank as their own pages. |
| S9 | P2 | ItemList `numberOfItems` is 14 and omits Gravitate and OneCapital from the list order in the schema sample reviewed, while `projects` in `constants` includes them. Schema and visible works can drift. |
| S10 | P2 | Several WebApplication descriptions claim precise metrics (“sub-100ms search”, “~25% faster”). Only keep numbers you can stand behind. |
| S11 | P3 | This app is Vite, not Next.js. `next-seo` / `generateMetadata` do not apply. Keep metadata in `index.html`. |
| S12 | P3 | SPA: important copy is in JavaScript. The HTML shell is metadata-rich, which helps, but body copy still depends on JS execution. That is an accepted tradeoff of this architecture, not a missing tag. |

**What SEO already does well:** one canonical, robots allow, sitemap URL, Person + WebSite + ProfilePage graph, social profiles in `sameAs`, descriptive title/description that name the person and stack, image alts on projects (weak on the portrait), internal section anchors.

### 4.4 Security and privacy

Overall level for this portfolio: **low application risk**, **medium header/privacy gaps**. There is no login, no API, and no form that stores data.

| ID | Sev | Issue |
| --- | --- | --- |
| C1 | P1 | `src/index.js` returns asset responses with no security headers: no `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, or `X-Frame-Options` / `frame-ancestors`. |
| C2 | P1 | Google Analytics `G-EE9XJYSY1Q` is injected on every visit with no consent banner. That is a privacy gap for visitors under GDPR-style or India DPDP expectations. |
| C3 | P2 | Analytics snippet is built with `innerHTML`. The string is static (not user input), so this is not XSS today. A CSP would still block inline script unless you allow it on purpose. |
| C4 | P2 | Phone `+91 9209389015` and `work@jayeshbpatil.com` are in HTML schema, the nav, and the contact section. That is normal for a portfolio and also public scraping surface. |
| C5 | P2 | Resume PDF is on a public Supabase URL and linked in schema. Anyone with the URL can download it. Cache-bust query `?t=timestamp` forces a fresh download every click. |
| C6 | P2 | `http://gravitatee.com` is plain HTTP. Other project links are HTTPS. |
| C7 | P2 | Hero depends on a third-party image host (`framerusercontent.com`) with no Subresource Integrity. |
| C8 | P3 | `pdf-parse` is a dependency and `parse_pdf.cjs` / `extract_pdf_env` exist for local resume parsing. They are not part of the site runtime. Do not ship `.env` or profile dumps with the Worker. |
| C9 | P3 | No secrets were found in client source during this pass. Measurement ID and public resume URL are not secrets. |

Worker behavior that is fine: unknown paths fall back to `index.html` with status 200 (SPA). That is correct for this app and means there is no real 404 page.

### 4.5 Bugs, content accuracy, and code quality

| ID | Sev | Issue |
| --- | --- | --- |
| B1 | P1 | `ServiceSummary` uses ScrollTrigger `target` instead of `trigger`. Horizontal text motion likely does not run. |
| B2 | P2 | File `src/sections/Services.jsx` exports an `Experience` component. The services data in `constants/index.js` is fully commented out. Naming will confuse the next edit. |
| B3 | P2 | `src/sections/FeaturedWorks.jsx` is empty (4 bytes) and unused. |
| B4 | P2 | `react-helmet-async` and `pdf-parse` are in `package.json` but not imported by the site. |
| B5 | P2 | Experience dates overlap: Freelance at Divines Code “Jun 2025 – Mar 2026” and full-time OneCapital “Dec 2025 – Present”. Confirm this is intentional. |
| B6 | P2 | `constants` still contains a large commented `servicesData` block, including claims such as pen testing and “Lighthouse 90+” that are not shown on the page. Dead copy can be mistaken for live claims later. |
| B7 | P3 | Navbar scroll listener calls `setShowBurger` on every scroll event. It updates React state continuously while scrolling. |
| B8 | P3 | Resume view link builds `?t=${new Date().getTime()}` during render, so the href changes every render and caching never helps. |
| B9 | P3 | `mb-42` on ServiceSummary may not exist in the Tailwind spacing scale unless a custom token defines it. |

### 4.6 Accessibility gaps

| ID | Sev | Issue |
| --- | --- | --- |
| A1 | P0 | Multiple H1s (same as S1). Screen-reader outline is a list of page titles, not one page with sections. |
| A2 | P1 | No `prefers-reduced-motion` handling for Lenis, GSAP, marquee, cursor trail, or hero filter. |
| A3 | P1 | Nav drawer does not trap focus, does not close on Escape, and does not lock body scroll while open. |
| A4 | P2 | Contact email and phone are plain text, not `mailto:` / `tel:` links. |
| A5 | P2 | Gold on light gray and white/60 on black need a contrast check at small sizes (marquee, meta labels). Not measured with a contrast tool in this pass. |
| A6 | P3 | Iconify icons in Works are decorative next to text; they should be `aria-hidden` if the link label already names the project. |

---

## 5. Asset inventory (performance evidence)

Largest shipped images:

| File | Size |
| --- | --- |
| `public/images/linknest.png` | 2,940 KB |
| `public/images/veloraa-rougee.png` | 2,492 KB |
| `public/images/Gravitate_Masala.png` | 2,229 KB |
| `public/images/divines-code.png` | 1,605 KB |
| `public/favicon.svg` | 745 KB |
| `public/images/One-Capital-Dashboard-1.png` | 347 KB |
| `public/android-chrome-512x512.png` | ~334 KB |
| `public/web-app-manifest-512x512.png` | ~247 KB |

Fonts: about 1.52 MB for Amiamie OTF + TTF (including Round).  
JS chunks: about 132 KB vendor + 128 KB app entry (gzip not measured here).  
Images, not JavaScript, are the main weight problem.

Duplicate root captures (not referenced by the app, staged in git):

- `beauty-products-online-Veloraa-Rougee-….png` (~2.43 MB)
- `Gravitate-Masala-….png` (~2.18 MB)
- `LinkNest-—-Visual-URL-Library-….png` (~2.87 MB)
- `Web-Development-Agency-in-India-Divine-s-Code-….png` (~1.57 MB)

---

## 6. Dependency notes

Runtime used by the UI: `react`, `react-dom`, `gsap`, `@gsap/react`, `lenis`, `framer-motion`, `react-responsive`, `react-intersection-observer`, `@iconify/react`, `clsx`, `tailwind-merge`, `tailwindcss`.

Present but not used by the running site:

- `react-helmet-async` (meta is hardcoded in `index.html`)
- `pdf-parse` (local script only)

`etheral-shadow.tsx` is a client component marked `'use client'` inside a Vite app. Vite ignores that directive; it still bundles. Framer Motion is pulled in mainly for this hero filter.

---

## 7. What was not measured (do this next)

- Lighthouse mobile and desktop (LCP, INP, CLS, TBT). No score is invented here.
- Real device pass at 320, 375, 768, 1024, and 1440 px.
- axe or keyboard-only pass in a browser.
- `npm audit` and Semgrep (scanner CLI was unavailable).
- Contrast ratios with a picker.
- Whether production Cloudflare already adds HSTS outside this repo. The Worker source itself does not set the headers.

---

## 8. Suggested fix order

1. Convert project screenshots to compressed WebP/AVIF and serve a small mobile size.
2. Fix `.banner-text-responsive` line-height and use one H1 for the page (section titles as H2).
3. Point ScrollTrigger at Lenis and fix `target` → `trigger` in ServiceSummary.
4. Remove FAQ JSON-LD until a real FAQ is on the page. Shorten title and description. Replace OG image with a real 1200×630 card.
5. Add security headers on the Worker and a consent step before Google Analytics.
6. Fix copy typos, About alt text, `w-md`, dead `FeaturedWorks`, unused dependencies, font subset, and stop committing root screenshot dumps.

---

## 9. Short verdict

The portfolio already has a real information architecture, credible experience copy, and an unusually complete SEO head (canonical, social cards, Person/WebSite schema, robots, sitemap). The things that make it feel worse than it is are mechanical: multi-megabyte PNGs, a broken mobile title line-height, too many H1s, and scroll/motion systems that are not coordinated. Security risk of the app code is low; the gaps are response headers and analytics consent, not an exploitable backend.
