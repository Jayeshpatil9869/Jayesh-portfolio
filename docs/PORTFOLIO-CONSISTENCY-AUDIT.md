# Portfolio Consistency Audit — Phase 1 (inspection only)

**Subject:** https://jayeshbpatil.com/  
**Repo:** `Jayesh-portfolio` (local workspace)  
**Audit date:** 29 October 2026  
**Mode:** Read-only inspection. **No substantial source edits and no deploy** in this phase.  
**Canonical LinkedIn (already decided):** https://www.linkedin.com/in/jayeshpatilfs/

---

## 1. Architecture and technology stack

| Layer | Current state |
| --- | --- |
| App type | Single-page React app (no React Router pages) |
| Runtime | React **18.3.1** + Vite **6** (not React 19, despite some project copy) |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Motion | GSAP + ScrollTrigger, Framer Motion, Lenis (`ReactLenis` + `LenisScrollSync`) |
| Icons | Offline Iconify bundle (`src/lib/icons.js`) |
| Content model | Hardcoded in `src/constants/index.js` (projects/socials) and `src/sections/Services.jsx` (experience) |
| SEO | Static `index.html` meta + large JSON-LD `@graph`; `public/robots.txt`; `public/sitemap.xml` (homepage only) |
| Hosting | Cloudflare Workers (`wrangler.toml` + `src/index.js` SPA fallback) + `public/_headers` (CSP/HSTS/cache) |
| Package manager | npm (`package-lock.json`) |
| Tests | **None** (no `*.test` / `*.spec` files; no test script beyond `lint`) |
| Env secrets | No `.env` in repo (resume PDF is a public Supabase URL) |

**Section order (`App.jsx`):** Navbar → Hero → ServiceSummary → Experience (`Services.jsx`) → About → Works → CaseStudy → Resume → ContactSummary → Contact.

**Routes:** Hash/section IDs only (`#home`, `#experience`, `#about`, `#work`, `#onecapital` / `#linknest` / `#gravitate`, `#case-studies`, `#resume`, `#contact`). No multi-page App Router.

**Dead / unused:** `src/sections/FeaturedWorks.jsx` is empty and not imported. Filename `Services.jsx` exports component `Experience` (naming mismatch).

---

## 2. Existing portfolio sections (live + local)

| Section | Present | Notes |
| --- | --- | --- |
| Hero | Yes | Subtitle “Full Stack **MERN** Developer”; stack line underplays TypeScript/Fastify/Postgres |
| Hero CTAs | Yes (live bundle) | “View work” / “Contact” |
| ServiceSummary | Yes | Decorative word rows |
| Experience | Yes | Four roles; **missing Divines Code internship** |
| About | Yes | OneCapital narrative; no education |
| Works | Yes | Featured vs `practice` clones |
| Case studies | Yes (live bundle) | OneCapital, LinkNest, Gravitate |
| Resume | Yes | Supabase PDF |
| Contact + socials | Yes | LinkedIn canonical OK; CodePen/Linktree issues below |
| Education | **No** | Not rendered anywhere in UI |
| Dedicated skills strip | **No** | Skills only implied in copy / schema `knowsAbout` |

Live JS bundle (`/static/index-Tdk5l9bg.js`) already contains Case studies, View work, practice grouping, and the **current** experience date strings below — so production is roughly aligned with this workspace for those features, but **not** with the intended corrected timeline.

---

## 3. Timeline and profile inconsistencies (critical)

### 3.1 Experience: site / live vs intended timeline

| Role | On site / live bundle today | Intended (your Phase 2 brief) | Status |
| --- | --- | --- | --- |
| Digi Mirai — Full Stack Intern | Jan 2025 – May 2025 | Jan 2025 – May 2025 | Match |
| Divines Code — Intern | **Missing** | Jun 2025 – Oct 2025 | **Gap** |
| Divines Code — Freelance | Jun 2025 – **Mar 2026** | Jun 2025 – **Jan 2026** | **Mismatch** |
| OneCapital — Intern | **Oct 2025 – Dec 2025** | **Feb 2026 – Jun 2026** | **Major mismatch** |
| OneCapital — Full-time | **Dec 2025 – Present** | **Jul 2026 – Present** | **Major mismatch** |

Source of current site dates: `src/sections/Services.jsx` (`experienceData`). LinkedIn PDF export in repo (`Profile (10).content.txt`) matches the **site** (OneCapital Oct–Dec 2025 / Dec–Present; Freelance through Mar 2026) and **also** includes Divines Code internship Jun–Oct 2025 — which the **website omits**.

**Flag (do not auto-resolve):** Historical LinkedIn narrative and the live portfolio claim OneCapital internship **Oct–Dec 2025**. Your new brief moves that internship to **Feb–Jun 2026** and full-time to **Jul 2026–Present**. That may be a correction of records, or a conflict. **Confirm with employment documents before publishing.**

**Overlap rule:** Divines Code Intern (Jun–Oct 2025) and Freelance (Jun 2025–Jan 2026) are concurrent for Jun–Oct 2025 if both are verified. Site currently shows only Freelance, so recruiters never see the internship title.

**Duration UI:** Periods are hardcoded strings (e.g. “Dec 2025 - Present”). No dynamic “Present” month calculation. LinkedIn export already shows stale “5 months” for Present roles.

### 3.2 Project date vs employment date

OneCapital **project** case study does not state Oct 2025 as a project start in UI copy, but employment intern dates on the site **do** start Oct 2025. Risk: readers equate project start with employment start. After timeline correction, keep project description **independent** of Feb 2026 employment start unless you confirm a public project start month.

### 3.3 Education

| Fact | Portfolio UI | LinkedIn export in repo | Your brief |
| --- | --- | --- | --- |
| BCA | Not shown | SPPU, May 2021 – Apr 2024 | Same — Completed |
| MCA | Not shown | “Pursuing MCA (Expected 2027)” in summary; **no MCA row** in Education section of export (only BCA + NareshIT) | SPPU May 2025 – Present; 2027 only if verified |
| NareshIT .NET course | Not shown | May 2024 – Jan 2025 | Not in Phase 2 brief — keep/omit? |
| College naming | N/A | Older GitHub README historically cited Dr. B.V. Hiray / M.S.G — **not** verified against this audit’s site | Confirm official college names under SPPU |

JSON-LD `alumniOf` currently points at **DigiMirai** (employer), which is incorrect for education semantics.

### 3.4 Identity / social URLs

| Profile | Canonical (your brief) | In `socials` / schema today | Check |
| --- | --- | --- | --- |
| Portfolio | jayeshbpatil.com | Yes | Live 200 |
| LinkedIn | `/in/jayeshpatilfs/` | Yes | Live blocked automation (999); treated as confirmed by you |
| GitHub | Jayeshpatil9869 | Yes | OK |
| DEV | dev.to/jayesh_patil | Yes | Live 200 |
| CodePen | **codepen.io/jayeshbpatil** | Site uses **codepen.io/jayeshpatil** | Both returned **403** to this auditor; **username mismatch** needs your confirmation which is real |
| Linktree | linktr.ee/jayeshpatil1553 | **Missing** from site socials | Live 200 |
| Instagram / YouTube / X | Present on site | Not in your canonical list | Keep as secondary or demote? |
| Old LinkedIn `/in/jayesh-patil01` | Retire | Removed from site schema/socials | Still may exist in old posts externally |

Schema `worksFor` → **Divines Code** while experience Present role is **OneCapital** — entity mismatch for SEO/trust.

### 3.5 Metrics and claim risk (do not invent replacements)

Hardcoded impact claims in experience/projects that need verification or softening:

- “eliminating **15+ hours/week** of manual work”
- “reducing page load times by **~25%**” / API “**~20%**”
- LinkNest “**sub-100ms** search”, Veloraa “**sub-100ms** API”, Enhancify “Lighthouse **95+**”
- “**5+** production-grade” / “**3+** MERN” counts

These are already published; Phase 2+ should **not** invent new numbers. Confirm keep, soften, or remove.

---

## 4. Broken links, outdated content, responsive, technical defects

### 4.1 Link check (29 Oct 2026, from this environment)

| URL | Result |
| --- | --- |
| https://jayeshbpatil.com/ | 200 |
| https://linknest.divinescode.com/ | 200 |
| https://veloraarougee.com/ | 200 |
| https://gravitatee.com/ and http://gravitatee.com | 200 (prefer HTTPS in constants/schema) |
| https://divinescode.com/ | 200 |
| https://tellstar.in/ | 200 |
| https://gaushala-management-system.jayeshbpatil.com/ | 200 |
| https://github.com/Jayeshpatil9869/LinkNest | 200 (public repo exists; **not linked** from project card — card points to live demo only) |
| https://www.riyanshamrit.com/ | TLS failure here; **http://** returned 200 — verify HTTPS / cert |
| https://www.yaseenglobalfoundation.in/ and apex | DNS resolve failure — **likely broken** |
| CodePen (both usernames) | 403 to bots — inconclusive |
| LinkedIn | 999 to bots — inconclusive |
| https://linktr.ee/jayeshpatil1553 | 200 |
| sitemap.xml / robots.txt | 200 |

### 4.2 Content / SEO / a11y / perf (inspection-level)

| ID | Severity | Finding |
| --- | --- | --- |
| T1 | Critical | Experience dates disagree with intended verified timeline; Divines internship missing |
| T2 | High | No Education section; MCA status invisible to recruiters |
| T3 | High | Hero “MERN” + MongoDB-first line understates current stack (Fastify, Postgres/Supabase, TS) |
| T4 | Medium | CodePen URL may be wrong (`jayeshpatil` vs `jayeshbpatil`); Linktree absent |
| T5 | Medium | Gravitate href `http://` in constants + JSON-LD |
| T6 | Medium | Yaseen Foundation URL appears dead (DNS) |
| T7 | Medium | Riyansh HTTPS uncertain; brand spelling “Riyansh” vs LinkedIn “RiyanShamrit” |
| T8 | Medium | Schema `worksFor` Divines Code vs Present OneCapital; `alumniOf` DigiMirai |
| T9 | Medium | Project cards omit LinkNest GitHub; TypeScript/Zustand not consistently listed where brief expects |
| T10 | Medium | Metrics in copy unverified; risk if challenged |
| T11 | Low | `FeaturedWorks.jsx` empty dead file; `Services.jsx` name ≠ `Experience` |
| T12 | Low | Sitemap only `/`; fine for SPA but `lastmod` 2026-10-23 stale relative to newer content |
| T13 | Low | No automated tests; QA is manual / build / lint only |
| T14 | Prior P0 | Nav Lenis fix, `_headers` CSP, offline icons — present in codebase; confirm Cloudflare Insights/Zaraz vs CSP after any future deploy |
| T15 | Design | Experience sticky stacking desktop-only; mobile uses relative stacking (generally OK). Full multi-width visual QA deferred to Phase 4 after content lock |
| T16 | Deploy delta | Live bundle already has case studies / CTAs / practice split; **timeline still old**. Local and live experience strings currently match each other — both wrong vs new brief |

**Responsive:** Not fully re-measured in this Phase 1 pass at 320–1600px (prior fluid-type work exists per ACS handoff). Plan: re-check after content updates, especially experience date lines on narrow screens.

**Performance:** No fresh Lighthouse run in this audit. Will measure before/after in Phase 5/7 if you approve — no score promises.

---

## 5. Files likely to require changes (after approval)

| File | Why |
| --- | --- |
| `src/sections/Services.jsx` | Experience source of truth today — dates, add Divines internship, overlap clarity |
| `src/constants/index.js` | Projects, socials (CodePen, Linktree), HTTPS Gravitate, optional GitHub links, tech name normalize |
| `src/sections/Hero.jsx` | Title/subtitle/stack line consistency |
| `src/sections/About.jsx` | Align narrative with verified roles; avoid unverified metrics |
| **New** `src/constants/experience.js` and/or `education.js` (recommended) | Single maintainable timeline for Experience + schema |
| New Education section or strip + `App.jsx` / `Navbar.jsx` | Show BCA/MCA |
| `index.html` | JSON-LD `worksFor`, `alumniOf`, sameAs (Linktree/CodePen), Gravitate HTTPS, project descriptions |
| `CaseStudy.jsx` / project caseStudy fields | Soften metrics if unconfirmed; keep project≠employment distinction |
| `README.md` | Mirror verified timeline once locked |
| `public/sitemap.xml` | Refresh `lastmod` when content ships |
| Resume PDF (external Supabase) | **You** must re-export/upload if LinkedIn/PDF still show Oct 2025 OneCapital dates |

**Do not touch:** DNS, Cloudflare account settings (except optional CSP/Zaraz note), unrelated repos, secrets.

---

## 6. Prioritized implementation plan (awaiting approval)

### P0 — Truth and identity (after your confirmations)

1. Lock employment + education answers from §7.  
2. Centralize `experienceData` (+ education) in `src/constants/`.  
3. Update Experience UI: five roles, concurrent Divines labels, month–year format, no double-counted “total years” badge.  
4. Add Education (BCA completed; MCA in progress — 2027 only if confirmed).  
5. Fix socials: CodePen username, add Linktree; keep LinkedIn `jayeshpatilfs`.  
6. Update Hero positioning to “Full Stack Developer” + accurate stack (no seniority claims).  
7. Fix schema `worksFor` / `alumniOf` / HTTPS Gravitate / sameAs.

### P1 — Projects and claims

8. Verify/fix project URLs (Yaseen, Riyansh HTTPS); add LinkNest GitHub where intended.  
9. Normalize tech tags; add TypeScript/Zustand only where true.  
10. Soften or confirm metrics; separate OneCapital **project** wording from employment dates.  
11. Optional: demote Instagram/YouTube in `sameAs` for recruiter SERP clarity.

### P2 — Design / a11y / SEO polish

12. Responsive pass on experience + education at 320–430 / 768 / 1024–1440 / 1600+.  
13. Focus states, alt text, heading hierarchy check.  
14. Sitemap `lastmod`; avoid promising Lighthouse numbers — measure instead.  
15. Remove or wire `FeaturedWorks.jsx`; rename `Services.jsx` → `Experience.jsx` if low-risk.

### P3 — Verify

16. `npm run lint`, `npm run build`, manual link + responsive checks, optional browser pass.  
17. **No auto-deploy** — wait for explicit deploy approval.  
18. Remind: update LinkedIn + resume PDF to the same timeline or the site will fight your profiles.

---

## 7. Facts requiring your confirmation before editing

Reply with answers (short form OK):

1. **OneCapital employment** — Confirm publish as **Intern Feb–Jun 2026** and **Full-time Jul 2026–Present**, knowing LinkedIn export + live site currently say **Oct–Dec 2025** / **Dec 2025–Present**? (Yes / No / different dates: ____)

2. **Divines Code Freelance end** — **January 2026** (brief) or **March 2026** (LinkedIn/site)?  

3. **Divines Code Internship Jun–Oct 2025** — Add as concurrent with freelance? (Yes / No)

4. **MCA** — Show “May 2025 – Present, Savitribai Phule Pune University”? Show **Expected 2027**? (Yes both / Present only / wait)

5. **BCA** — Show May 2021 – Apr 2024, SPPU, Completed? (Yes / No)

6. **NareshIT .NET course** — Show on site? (Yes / No)

7. **CodePen** — `jayeshpatil` or `jayeshbpatil`?

8. **Add Linktree** to contact/socials? (Yes / No)

9. **Metrics** (15+ hrs/week, ~25% / ~20%, sub-100ms, Lighthouse 95+) — Keep / Soften / Remove?

10. **Yaseen Foundation** — Keep card with broken URL, replace URL, or hide?

11. **OneCapital project start** — Any public month to show separately from employment (e.g. Oct 2025 project start)? (None / month: ____)

12. **Approve Phase 2–6 implementation** after you answer 1–11? (Approve / Approve with notes / Wait)

---

## 8. What this audit deliberately did not do

- No substantial code changes.  
- No production deploy.  
- No invented employment proofs.  
- No Lighthouse score claims.  
- No rewriting LinkedIn/GitHub/DEV profiles for you (checklist remains in `PROFILE-CHECKLIST.md`).

---

## 9. Bottom line

The portfolio is a solid Vite/React SPA with recent recruiter improvements (case studies, clone grouping, CTAs, LinkedIn canonical). The **blocking problem** is professional truth: **OneCapital dates on the live site match an older LinkedIn export, not your intended Feb/Jul 2026 sequence; Divines internship is missing; education is absent; CodePen/Linktree and a few project URLs are inconsistent or broken.**

**Next step:** answer §7. After confirmation, implement P0→P1 in controlled diffs, then verify — still no deploy until you say so.

---

## 10. Implementation status (29 Oct 2026)

User replied **yes** → treated as approval of Phase 2 intended timeline + canonical profile URLs.

**Applied locally (not deployed):**

- `src/constants/experience.js` — controlled experience + education SoT
- Experience UI dates: OneCapital Jul 2026–Present / Feb–Jun 2026; Divines freelance Jun 2025–Jan 2026 + intern Jun–Oct 2025 (overlap notes); Digi Mirai Jan–May 2025
- Education section + nav link
- Hero “Full Stack Developer” + accurate stack line
- Socials: CodePen `jayeshbpatil`, Linktree added; LinkedIn unchanged
- Yaseen hidden (DNS dead); Gravitate HTTPS; LinkNest GitHub on case study
- Schema `worksFor` → OneCapital; `alumniOf` → SPPU; metrics softened in project copy

**Still owner-side:** update LinkedIn + resume PDF to match; confirm CodePen username resolves in a browser; explicit deploy approval.
