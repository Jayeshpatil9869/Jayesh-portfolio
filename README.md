# Jayesh Patil — Personal Portfolio

**Live site:** [jayeshbpatil.com](https://jayeshbpatil.com)

This is my personal portfolio — a single-page site I built to show who I am as a full stack developer, the work I’ve shipped, and how to reach me. It’s meant for recruiters and collaborators who want substance first: real projects, clear experience, and enough motion to feel considered without getting in the way.

I’m based in Pune and work across React, Next.js, Node, Fastify, Supabase, and TypeScript. A lot of my recent work sits in fintech dashboards, e-commerce, and product UIs where performance and clarity matter more than decoration.

---

## What’s on the site

| Section | Purpose |
| --- | --- |
| **Hero** | Name, positioning, and quick paths into work or contact |
| **Experience** | Digi Mirai → Divines Code (intern + freelance overlap) → OneCapital intern → full-time |
| **Education** | BCA completed (SPPU); MCA in progress (SPPU) |
| **About** | Short story of how I build — systems, not just screens |
| **Works** | Production projects first; practice/clones grouped separately |
| **Case studies** | Problem → solution → impact for selected work (OneCapital, LinkNest, Gravitate) |
| **Resume** | View / download PDF |
| **Contact** | Email, phone, WhatsApp, and socials |

Content and project data live in `src/constants/index.js`, so updating copy or links doesn’t mean hunting through every section file.

---

## Stack

| Layer | Choice |
| --- | --- |
| UI | React 18 + Vite 6 |
| Styling | Tailwind CSS 4 |
| Motion | GSAP + ScrollTrigger; Framer Motion where it fits |
| Scroll | Lenis (synced with ScrollTrigger) |
| Icons | Iconify (bundled offline for CSP) |
| Hosting | Cloudflare Workers + static assets (`wrangler.toml`) |
| SEO | Meta tags, Open Graph, Twitter cards, and JSON-LD in `index.html` |

Security and caching headers (CSP, HSTS, immutable `/static` assets) are defined in `public/_headers`.

---

## Project structure

```text
src/                      # React app + Worker entry (src/index.js)
public/                   # Served static: images, fonts, _headers, SEO files
assets/screenshots/       # Source live captures (not served)
docs/                     # Audits, strategy, profile export notes
scripts/                  # Image sync / optimize helpers
```

Full map: [`docs/PROJECT-STRUCTURE.md`](docs/PROJECT-STRUCTURE.md).

Build output goes to `dist/` (gitignored), with hashed bundles under `/static`.

Refresh Works hover previews from screenshots:

```bash
npm run sync:previews
```

---

## Getting started

```bash
git clone https://github.com/Jayeshpatil9869/Jayesh-portfolio.git
cd Jayesh-portfolio
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

| Script | What it does |
| --- | --- |
| `npm run dev` | Local Vite server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | ESLint |
| `npm run sync:previews` | Crop/optimize `assets/screenshots` → `public/images` |

To ship on Cloudflare Workers (after a successful build), use your usual Wrangler deploy flow against this repo’s `wrangler.toml`.

---

## Customizing for yourself

1. Edit projects, social links, and resume URL in `src/constants/index.js`.
2. Update person/meta/schema copy in `index.html`.
3. Swap images under `public/images/` (WebP variants are preferred where they exist).
4. Tweak type and color tokens in `src/index.css`.

If you fork this, please keep attribution if you reuse large parts of the interaction design — and rewrite the personal story so it’s honestly yours.

---

## Design notes (short)

- Motion respects `prefers-reduced-motion` in the places that matter.
- Heavy hero visuals are deferred, especially on smaller screens.
- Section copy is rendered up front (not lazy-chunked away) so crawlers and humans see the same text.
- Practice clones are labeled as such so they don’t look like client deliverables.

---

## Contact

- **Email:** [work@jayeshbpatil.com](mailto:work@jayeshbpatil.com)
- **LinkedIn:** [linkedin.com/in/jayeshpatilfs](https://www.linkedin.com/in/jayeshpatilfs/)
- **GitHub:** [github.com/Jayeshpatil9869](https://github.com/Jayeshpatil9869)
- **DEV:** [dev.to/jayesh_patil](https://dev.to/jayesh_patil)

Open to full-time roles, freelance product work, and thoughtful collaborations.

---

*Built and maintained by Jayesh Patil.*
