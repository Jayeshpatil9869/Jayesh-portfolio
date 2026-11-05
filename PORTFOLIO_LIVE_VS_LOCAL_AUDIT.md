# Portfolio Live vs Local Audit

**Audit date:** 5 November 2026 (21:55 IST window)  
**Live:** https://jayeshbpatil.com/ and https://www.jayeshbpatil.com/  
**Local:** workspace `Jayesh-portfolio` @ `main` / `dd52e7c`  
**Mode:** Inspection + report only. **No code edits. No deploy.**

**Confirmed timeline (source of truth — user instruction 5 Nov 2026):**

| Item | Confirmed dates |
| --- | --- |
| BCA — SPPU | May 2021 – April 2024 |
| NareshIT — .NET Full Stack Developer Training | June 2024 – February 2025 |
| Digi Mirai — Full Stack Developer Intern | February 2025 – June 2025 |
| MCA — SPPU | May 2025 – Present |
| Divines Code — Freelance Full Stack Developer | August 2025 – Present |
| OneCapital — Full Stack Developer Intern | September 2025 – February 2026 |
| OneCapital — Software Developer (Full Stack), Full-time | March 2026 – Present |
| Divines Code internship | **Do not show** (freelance only) |

Prior Oct 2026 docs (`docs/PORTFOLIO-CONSISTENCY-AUDIT.md`, LinkedIn `docs/Profile (10).*`) use **older / conflicting** dates. They are **not** the timeline SoT for this audit.

---

## Executive verdict

| Question | Answer |
| --- | --- |
| Is local ahead of live? | **No.** Live Production deploy `dd52e7c` (2026-11-05T16:04:32Z) matches local `HEAD`. |
| Do live JS assets match local build? | **Yes.** Apex, www, and local `dist` all serve / emit `index-D9regOIJ.js` (SHA256 `5C04826C…CFF5`). |
| Is the confirmed timeline already in source + live bundle? | **Yes** for Experience / Education dates and OneCapital intern→FT / Divines freelance-only. |
| Why can the site still “feel” outdated? | Residual **MERN** Digi Mirai copy, **agency ContactSummary quote**, **LinkedIn / resume PDF** not updated, **sticky Experience UX**, stale **docs/** audits, and **www without 301→apex** (duplicate host + cache perception). |
| Apex vs www different apps? | **No.** Same hashed assets; HTML byte difference is Cloudflare challenge injection only. |

---

## 1. Live ↔ local comparison

### 1.1 Deploy / git parity

| Signal | Evidence |
| --- | --- |
| Local branch | `main` clean, `dd52e7c` = `origin/main` |
| GitHub Production deploy | `sha=dd52e7ce8ba3e38fbc2074c834566332336f9b33` at 2026-11-05T16:04:32Z |
| Live script tag | `/static/index-D9regOIJ.js` (+ same gsap/framer/vendor/css hashes) |
| Local `npm run build` | Emits the same `index-D9regOIJ.js` hash |

**Conclusion:** Push and Cloudflare Production deploy for this commit completed successfully. Local is not holding unpublished timeline code for Experience dates.

### 1.2 Content strings in live JS (apex = www)

| String / fact | In live bundle? |
| --- | --- |
| `September 2025` / `February 2026` / `March 2026` (OneCapital) | Yes |
| `August 2025 – Present` (Divines freelance) | Yes |
| `February 2025 – June 2025` (Digi Mirai) | Yes |
| `NareshIT` + `June 2024 – February 2025` | Yes |
| `December 2025` / `October 2025` (old LinkedIn-era dates) | **No** |
| Separate Divines internship role | **No** |
| `Education` / `skills` / case-studies nav | Yes |
| `Full Stack MERN` hero subtitle | **No** (Hero is “Full Stack Developer”) |
| Digi Mirai body still says `MERN` | **Yes** (2 hits) |
| ContactSummary “memorable … together” | **Yes** |
| Marquee “contact us” | **No** (replaced with “get in touch”) |

### 1.3 Section presence (local = live App tree)

Order: Navbar → Hero → ServiceSummary → Experience → About → **Skills** → **Education** → Works → CaseStudy → Resume → ContactSummary → Contact → footer.

Nav targets: `home`, `experience`, `about`, `skills`, `education`, `work`, `case-studies`, `resume`, `contact`.

---

## 2. Implementation plan status

Plan artifacts `PORTFOLIO_IMPLEMENTATION_PLAN.md` / `PORTFOLIO_CHANGELOG.md` / `PORTFOLIO_AUDIT.md` were removed from the working tree before the last push (gitignored). Status below is reconstructed from those docs (session extract) + current source/live.

### 2.1 Implemented (local + live)

| Plan item | Status | Notes |
| --- | --- | --- |
| A0 Confirmed timeline in `experience.js` | Done | Matches table above |
| Remove Divines Code internship | Done | Only `divines-freelance` |
| OneCapital two cards + progression note | Done | Intern Sep 2025–Feb 2026 → FT Mar 2026–Present |
| Education: BCA + MCA + NareshIT training | Done | `Education.jsx` + nav |
| Hero “Full Stack Developer” + modern stack line | Done | No MERN in subtitle |
| Skills section | Done | `Skills.jsx` + `PhysicsTagPile` |
| About narrative with OneCapital transition | Done | Sep 2025 → Mar 2026 wording |
| Works practice demotion + summary lines | Done (partial polish OK) | Featured vs practice |
| Case studies LinkNest / OneCapital / Gravitate | Done | Present on live |
| Contact first-person intro | Done | “Have a role, collaboration…” |
| ContactSummary marquee “contact us” → “get in touch” | Done | Quote still agency (see missing) |
| Schema `worksFor` → OneCapital; alumni SPPU | Done | `index.html` |
| Skip link + footer | Done | `App.jsx` |
| Sitemap `lastmod` 2026-11-05 | Done | Live sitemap matches |
| Reduced-motion Lenis skip path | Done | `App.jsx` (implementation quirk: `SiteContent()` call) |
| Production deploy of `dd52e7c` | Done | Despite older changelog saying “Not deployed” |

### 2.2 Missing or incomplete vs plan / this request

| Item | Status | Severity |
| --- | --- | --- |
| Digi Mirai copy still MERN-framed | Open | Medium (positioning) |
| ContactSummary center quote still agency (“Let’s build a memorable…”) | Open | Medium (voice) |
| Cloudflare **www → apex 301** | Open (dashboard) | Medium (duplicate host / cache confusion) |
| Cloudflare **HSTS** still `max-age=0` | Open (dashboard) | Medium |
| Untrack `docs/Profile (10).*` from git index | Open | High (privacy; ignore alone insufficient) |
| Owner update **LinkedIn + resume PDF** to Confirmed timeline | Open | Critical for external consistency |
| Stale `docs/PORTFOLIO-CONSISTENCY-AUDIT.md` still documents Oct “intended” Jul 2026 dates | Open | Low (confuses future agents) |
| Optional: LinkNest metric / disclosure polish, Riyansh TLS recheck, dead `FeaturedWorks.jsx`, unused deps | Open | Low |
| Plan Group 3–4 perf / CI / soft-404 | Mostly open | Low |

### 2.3 Incorrect or outdated content still visible

**On the live site (same as local):**

1. **Digi Mirai** description/responsibilities still say “MERN-stack” — conflicts with “replace outdated MERN-only positioning.”
2. **ContactSummary** still shows agency co-build quote; Contact marquee “just imagine, I code” is brand-personal but not recruiter-tight.
3. **Experience sticky stacking** can hide company titles while peeks show only employment type + date bands — easy to misread during a fast scroll review.
4. **Resume PDF** (Supabase) and **LinkedIn** are out of repo control; LinkedIn export in `docs/Profile (10).*` still lists Oct–Dec 2025 / Dec 2025–Present OneCapital and a Divines **internship** — if reviewers open those, they will report “outdated dates” even when the SPA is correct.

**Not on live SPA (already fixed):**

- OneCapital Dec 2025 / Oct 2025 dates  
- Divines Code internship card  
- Hero “Full Stack MERN Developer”  
- Missing Education / Skills / NareshIT  

---

## 3. Apex vs www investigation

### 3.1 Findings

| Check | Apex `jayeshbpatil.com` | WWW `www.jayeshbpatil.com` |
| --- | --- | --- |
| HTTPS status | 200 | 200 (**no 301 to apex**) |
| Canonical / og:url | `https://jayeshbpatil.com` | same (points to apex) |
| JS/CSS asset hashes | `index-D9regOIJ.js` … | **identical** |
| App bundle SHA256 | `5C04826C…` | **identical** |
| Raw HTML SHA256 | Different | Different |
| HTML after stripping CF bot script | **Equal** | **Equal** |
| `CF-Cache-Status` (sample) | MISS / varies | HIT / varies |

HTTP→HTTPS: both hosts 301 to their own HTTPS host (not cross-host).

### 3.2 Why they can *appear* different

1. **No www→apex redirect** — two origins serve the same Worker assets. Browsers/CDNs cache each host separately (`HIT` vs `MISS` observed). After a deploy, one hostname can briefly look “old” if a tab still holds a previous HTML document that pointed at an older `/static/index-*.js` hash.
2. **Cloudflare challenge scripts** inject different ray IDs into HTML → raw HTML hashes differ even when the app is identical (confirmed by strip-and-compare).
3. **Client-only content** — crawlers/`curl` without JS see mostly shell + meta; reviewers who partially load, hard-refresh one host only, or compare to LinkedIn see conflicting “sources of truth.”
4. Historical audit (27 Oct) already flagged S5: www should 301 to apex — **still not done**.

**Recommended edge fix (no code deploy required):** Cloudflare Redirect Rule or Bulk Redirect: `www.jayeshbpatil.com/*` → `https://jayeshbpatil.com/$1` (301), plus real HSTS max-age. Do this only with your explicit Cloudflare approval.

---

## 4. Homepage / case studies / projects / nav / contact verification

| Area | Result |
| --- | --- |
| Homepage hero | “Full Stack Developer”; stack line includes TypeScript / Fastify / PostgreSQL / Supabase |
| Experience | Four roles; dates match Confirmed table; Digi Mirai MERN wording remains |
| About | Matches OneCapital Sep→Mar transition + Divines freelance + MCA |
| Skills | Present (`#skills`) |
| Education | MCA / NareshIT / BCA with confirmed periods |
| Works | Featured + practice; LinkNest / Divines / Gravitate / Tellstar live links **200** |
| Case studies | Present; OneCapital marked internal (no public demo) |
| Nav | Includes skills, education, case-studies |
| Contact | Email `work@jayeshbpatil.com`; phone; socials LinkedIn / GitHub / DEV / CodePen / WhatsApp |
| Resume | Supabase PDF **200** |
| LinkNest GitHub | **200** |
| LinkedIn HEAD | **999** (bot block — inconclusive) |
| CodePen HEAD | **403** (bot block — inconclusive; URL matches confirmed `jayeshbpatil`) |

---

## 5. Recommended fixes (priority order — **not applied**)

### P0 — Truth consistency outside the SPA

1. Update **LinkedIn** + **resume PDF** to the Confirmed timeline (remove Divines internship; OneCapital Sep 2025–Feb 2026 → Mar 2026–Present).  
2. `git rm --cached` the tracked `docs/Profile (10).*` files (gitignore already lists them).  
3. Cloudflare: **301 www → apex** + real **HSTS** (dashboard).

### P1 — Remaining on-page copy (local code, then deploy when approved)

4. Rewrite Digi Mirai bullets to drop MERN-only framing (keep factual React/Node/Mongo where true).  
5. Replace ContactSummary agency quote with first-person professional CTA aligned with Contact.jsx.  
6. Optionally soft-update `docs/PORTFOLIO-CONSISTENCY-AUDIT.md` banner: “timeline superseded 5 Nov 2026.”

### P2 — UX / hygiene

7. Experience sticky: ensure company name remains visible in peek state (or add compact sticky meta).  
8. Fix `App.jsx` reduced-motion path to render `<SiteContent />` not `SiteContent()`.  
9. Dead code / unused deps cleanup (`FeaturedWorks.jsx`, `react-helmet-async`, runtime `pdf-parse`).  
10. Hard-refresh QA matrix on **both** hosts after next deploy until www redirect exists.

---

## 6. Files that need modification (when you authorize code work)

| File | Why |
| --- | --- |
| `src/constants/experience.js` | Digi Mirai MERN wording; optional copy polish only (dates already correct) |
| `src/sections/ContactSummary.jsx` | Replace agency quote / tighten voice |
| `src/sections/Contact.jsx` | Optional marquee / subtitle polish |
| `src/App.jsx` | `SiteContent()` → `<SiteContent />` |
| `src/sections/Services.jsx` | Optional sticky peek / company visibility |
| `docs/Profile (10).*` | Untrack from git (not rewrite content) |
| `.gitignore` | Already covers Profile exports — keep |
| `docs/PORTFOLIO-CONSISTENCY-AUDIT.md` | Supersession note (optional) |
| Cloudflare dashboard | www→apex, HSTS |
| External: LinkedIn + Supabase resume PDF | Must match Confirmed timeline |

**Do not need timeline date edits** (already correct in source + live): Experience periods, Education periods, About OneCapital transition sentence, Divines freelance-only presence.

---

## 7. Answers to your numbered questions

1. **Compare local vs live** — Parity on commit `dd52e7c` and asset hash `index-D9regOIJ.js`.  
2. **What from the plan is implemented** — Timeline A0, Education, Skills, Hero repositioning, most Phase B recruiter UX; see §2.1 / §2.2.  
3. **Apex vs www** — Same app; no redirect; CF script + per-host cache explain perceived differences (§3).  
4–7. **Timeline / Divines / OneCapital / NareshIT** — Already encoded correctly in local + live; remaining risk is LinkedIn/resume/docs and Digi Mirai MERN copy.  
8. **MERN / agency wording** — Hero fixed; Digi Mirai + ContactSummary quote **still open**.  
9. **Homepage / case studies / projects / nav / contact** — Structurally present; key project links 200; social HEAD blocked for LinkedIn/CodePen from this environment.

---

## 8. Explicit non-actions this session

- No redesign  
- No source edits beyond this report file  
- No deploy  
- No Cloudflare dashboard changes  

**Next step when you approve:** implement P1 copy fixes locally, then a separate explicit deploy + Cloudflare redirect/HSTS pass.
