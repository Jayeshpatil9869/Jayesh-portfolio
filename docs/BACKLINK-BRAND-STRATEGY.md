# Backlink Audit, Personal Branding & Recruiter Visibility Strategy

**Subject:** Jayesh B. Patil — https://jayeshbpatil.com/  
**Report date:** 27 October 2026  
**Phase:** Research and planning only. No website, source, SEO metadata, or configuration was changed for this report.  
**Method:** Live site and repo inspection, public web search, profile fetches, and prior technical audit findings. **Google Search Console, Ahrefs, and Semrush were not connected and no exports were provided.**

---

## 1. Executive summary

Your public presence is already coherent enough for a recruiter who already knows your name: the portfolio, GitHub, DEV Community, and LinkedIn activity all point at the same person and stack. The weak spots are **identity consistency**, **thin linkable assets**, and **missing measurement**.

**Confirmed today (public evidence only):**

- The portfolio is a single-page Vite/React site with experience, works, about, resume, and contact. Canonical, robots, sitemap, OG/Twitter, and a large Person/project JSON-LD graph exist in `index.html`.
- Public profiles that already link to https://jayeshbpatil.com include [GitHub](https://github.com/Jayeshpatil9869), [DEV Community](https://dev.to/jayesh_patil), and LinkedIn posts (for example [this portfolio update post](https://www.linkedin.com/posts/jayeshpatilfs_webdevelopment-frontenddevelopment-uiux-activity-7423373380369702912-s0vy)).
- You have published at least four DEV posts, including a portfolio build write-up that links to the site ([DEV article](https://dev.to/jayesh_patil/how-i-built-my-developer-portfolio-with-react-gsap-and-performance-in-mind-4f8g)).
- A serious brand risk: **two LinkedIn URLs are in active circulation** — `linkedin.com/in/jayesh-patil01/` (site schema + socials) and `linkedin.com/in/jayeshpatilfs` (resume PDF + many posts). Both appear to belong to you based on public posts; that splits recruiter discovery and entity signals.
- Recruiter usefulness of the portfolio is limited by missing project case-study pages (except local uncommitted OneCapital work from a prior session), clone projects listed with equal weight to client work, and no clear above-the-fold CTA.

**What this report cannot claim:**

- Total backlinks, referring domains, domain rating, anchor-text distribution, lost links, or GSC clicks/impressions — **those numbers are unknown without tool access.** Do not treat any invented figure as a baseline.

**Strategic direction (impact × feasibility):**

1. Unify name, title, LinkedIn URL, and website link everywhere (P0).  
2. Make 2–3 projects link-worthy case studies recruiters and writers can cite (P1 assets).  
3. Publish genuine technical posts (DEV/Hashnode) with canonical links to those case studies (P1–P2).  
4. Claim Peerlist / Wellfound / Google Business-style professional surfaces only where they match your goals (P0–P1).  
5. Measure with free GSC + Ahrefs Webmaster Tools before chasing volume (Phase 2 unblocker).

---

## 2. Phase 1 — Website and brand baseline

### 2.1 Structure (observed)

| Area | Observation |
| --- | --- |
| Structure | SPA: Hero, ServiceSummary, Experience, About, Works, Resume, Contact |
| Positioning | Hero: “Full Stack MERN Developer”; About/experience emphasize React, Next.js, Fastify, Supabase, TypeScript, fintech dashboards |
| Contact | Email `work@jayeshbpatil.com`, phone, WhatsApp, socials in nav/contact |
| SEO head | Title, description, canonical `https://jayeshbpatil.com`, robots index/follow, OG/Twitter, sitemap, robots.txt |
| Schema | Person, Organization, WebSite, ProfilePage, ProfessionalService, ItemList, per-project entries |
| Link-worthy pages | **Weak.** Almost everything lives on `/`. No indexed multi-page case studies. Project rows expose name + tech tags, not Problem/Solution/Impact (those strings exist in `constants` but are not shown) |
| Demos / repos | Mix of live client URLs, GitHub clones, and private/internal work (OneCapital) |

### 2.2 Public profiles linked from the site (`sameAs` / `socials`)

| Profile | URL on site | Status check (27 Oct 2026) | Notes |
| --- | --- | --- | --- |
| LinkedIn | https://www.linkedin.com/in/jayesh-patil01/ | HTTP 429 from automation | Posts also exist under `/in/jayeshpatilfs` |
| GitHub | https://github.com/Jayeshpatil9869 | 200 | Bio and blog field point to jayeshbpatil.com; ~42 public repos; ~2 followers (public GitHub data via search snippet) |
| DEV | https://dev.to/jayesh_patil | 200 | Website field set; 4 posts; joined Jan 22, 2026 |
| CodePen | https://codepen.io/jayeshpatil | 403 to bots | Linked from site; content not verified in this pass |
| X | https://x.com/Jayeshpatil1553 | 200 | Present |
| Instagram | destination_diaries_15 | 200 | Travel branding; weak recruiter signal |
| YouTube | @Rjarts9869 | 200 | Creative branding; weak recruiter signal |
| Resume host | Supabase public PDF | Indexed in search | Resume LinkedIn = `jayeshpatilfs` |

Sources: [jayeshbpatil.com](https://jayeshbpatil.com/), [GitHub profile](https://github.com/Jayeshpatil9869), [DEV profile](https://dev.to/jayesh_patil), [resume PDF](https://wrcoiavqijnltexejxob.supabase.co/storage/v1/object/public/resume/Jayesh%20Patil.pdf).

### 2.3 Identity inconsistencies (confirmed)

| Topic | Variant A | Variant B | Risk |
| --- | --- | --- | --- |
| LinkedIn | `/in/jayesh-patil01/` on site + some posts | `/in/jayeshpatilfs` on resume + many posts and search results | Recruiters and search engines see two primary URLs |
| Title | “Full Stack MERN Developer” (hero) | “Full Stack Developer \| React…TypeScript” (resume/GitHub) | MERN label underplays Fastify/Postgres/TypeScript work |
| Employer schema | JSON-LD `worksFor` → Divines Code | Page experience → OneCapital present | Schema/content mismatch (technical SEO, not a backlink) |
| Metrics | Site: ~25% page load, ~20% API | LinkedIn-export text in repo previously showed reversed pairing | Credibility risk if challenged |
| Education | GitHub README: MCA Dr. B.V. Hiray College; BCA M.S.G College; Naresh IT | Portfolio site: education not shown | Missed alumni/college link opportunities |
| Collaborator | Mahendra Nagpure credited on LinkedIn/DEV-adjacent posts | Not linked from portfolio | Mutual mention opportunity unused |

**Assumption (labeled):** Both LinkedIn URLs may be yours (vanity redirect or dual profiles). You must confirm which is canonical and redirect or retire the other.

### 2.4 Recruiter readiness (judgment from evidence)

**Strengths:** Real employers named; specific fintech/ops outcomes; live client sites; DEV writing; GitHub activity.

**Gaps for hiring managers:** No featured case-study URLs to paste into LinkedIn Easy Apply; impact copy buried; clones compete with production work; Instagram/YouTube dilute “open to work” professional SERP mix; no skills/education strip on the site.

---

## 3. Phase 2 — Existing backlink profile

### 3.1 Data limitations (critical)

| Data source | Status | What is missing |
| --- | --- | --- |
| Google Search Console | **Not provided / not connected to this workspace** | Links report, top linking sites, referring domains, indexed pages, queries, clicks |
| Ahrefs Webmaster Tools | **Not provided** | Backlinks, referring domains, anchors, broken links |
| Semrush | **Not provided** | Same |
| Repo exports | **None found** (no GSC/Ahrefs CSV in the project) | — |

**Therefore:** this report does **not** state total backlinks, domain rating, spam score, or lost-link counts.

### 3.2 Confirmed referring surfaces (public discovery only)

These are pages observed via search/fetch that **mention or link** to you or the portfolio. This is **not** a complete backlink inventory.

| Source | URL | Relationship | Verification |
| --- | --- | --- | --- |
| Own portfolio | https://jayeshbpatil.com/ | Destination | Live |
| GitHub profile | https://github.com/Jayeshpatil9869 | Blog/website → portfolio | Public profile |
| GitHub portfolio repo | https://github.com/Jayeshpatil9869/Jayesh-portfolio | Homepage field → portfolio | Public |
| GitHub profile README repo | https://github.com/Jayeshpatil9869/Jayeshpatil9869 | Links to portfolio/LinkedIn/DEV | Public |
| DEV profile | https://dev.to/jayesh_patil | Website → portfolio | Fetched |
| DEV posts | e.g. https://dev.to/jayesh_patil/how-i-built-my-developer-portfolio-with-react-gsap-and-performance-in-mind-4f8g | In-article link → portfolio | Fetched |
| DEV Gravitate post | https://dev.to/jayesh_patil/building-a-modern-d2c-e-commerce-platform-with-nextjs-supabase-express-29e2 | Links project live site (gravitatee.com), builds topical authority | Search |
| Resume PDF | Supabase public URL | Links portfolio + LinkedIn `jayeshpatilfs` | Search |
| LinkedIn posts | e.g. jayeshpatilfs activity posts | Link portfolio / client sites | Search snippets |
| Client / project sites | divinescode.com, gravitatee.com, veloraarougee.com, linknest.divinescode.com, etc. | Evidence of shipped work; **not verified as linking back** to jayeshbpatil.com | Live project URLs from portfolio constants |

**Not found in this pass:** educational domains, news sites, or unrelated directories linking to jayeshbpatil.com. Absence in web search ≠ zero links; GSC/Ahrefs may show more.

### 3.3 How to export the missing data (do this before numerical targets)

**Google Search Console (free)**

1. Verify https://jayeshbpatil.com (DNS TXT or HTML file via Cloudflare).  
2. Wait for data (often days after verification).  
3. Export: **Links → Top linking sites / Top linking text / Top linked pages** (Download).  
4. Export: **Performance → Search results** last 3 months + previous period (Download CSV).  
5. Check **Pages → Why pages aren’t indexed**.

**Ahrefs Webmaster Tools (free for verified sites)**

1. Verify the same domain.  
2. Open **Backlinks** and **Referring domains**; export CSV.  
3. Compare with GSC (GSC is incomplete; Ahrefs samples differently — expect mismatches).

**Optional free checks (manual, incomplete):** Bing Webmaster Tools; Google `site:jayeshbpatil.com` (indexing signal only, not backlinks).

Please share those CSVs for a quantitative Phase 2 update.

### 3.4 Disavow stance

**No disavow recommended.** No evidence of a negative SEO campaign or toxic link network was collected. Low-authority links alone are not a reason to disavow.

---

## 4. Phase 3 — Search performance

**No GSC numbers available.** Do not invent clicks, impressions, CTR, or query lists.

**Qualitative signals (observed):**

- Brand navigational queries for your name resolve to the portfolio and profile pages in general web search.  
- A `site:jayeshbpatil.com` probe in this session returned no useful indexed-URL list from the search tool (tool limitation — not proof of non-indexing). The homepage itself appears in branded search results.  
- Content SEO (titles, schema, SPA crawlability) was covered in `PORTFOLIO-AUDIT-REPORT.md`; those factors are **not** backlinks.

**Baseline to set after GSC connects:**

| Metric | Baseline | Later target style |
| --- | --- | --- |
| Branded clicks (name variants) | TBD | Track MoM; expect growth from LinkedIn/DEV, not guaranteed |
| Non-brand impressions | TBD | Prefer project/skill queries over vanity keywords |
| Top linked page | TBD | Prefer `/` today; later case-study URLs |
| Referring domains | TBD | Quality > count |

---

## 5. Phase 4 — Competitors and opportunity research

### 5.1 Comparable public profiles (not celebrity sites)

Chosen for India / early–mid full-stack positioning, not influencer DA.

| Person | Site | Why comparable | Public discovery pattern (observed) |
| --- | --- | --- | --- |
| Shreyansh Kumar Singh | https://www.shreyanshkumarsingh.com/ | Pune; case-study-heavy portfolio | Deep project write-ups on own domain |
| Prathmesh Vhatkar | https://psv2522.com/ | Pune/remote; React/Next/TS | Clear hiring CTA + production project URLs |
| Dinesh Choudhary | https://dineshchoudhary.com/ | Pune full-stack | Project pages with live demos |
| Khushal Agarwal | GitHub portfolio README / linked site | Pune full-stack | Strong GitHub README as hub |
| Your DEV peers (category) | DEV Community | Same channel you already use | Articles + profile website field |

**Limitation:** Without Ahrefs, their referring-domain lists were **not** measured. Pattern observation only: strong peers put **case studies on their own domain** and use GitHub/DEV/LinkedIn as distribution, not as the only asset.

### 5.2 Prospect database (verified platforms / realistic channels)

Status legend: **Verified** = platform exists and is appropriate; **Eligibility** = you appear eligible based on public info; **Will link** = never guaranteed.

| Prospect | URL | Relevance | Why they might link / cite | Eligibility / requirements | Effort | Free? | Contact | Promote | Priority | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Own LinkedIn (canonical) | Confirm `jayeshpatilfs` vs `jayesh-patil01` | Recruiter primary | Featured link + About + Featured section | You own both? | Low | Yes | Self | Homepage + case studies | P0 | Confirmed dual URLs in public |
| GitHub profile + README | github.com/Jayeshpatil9869 | Engineers | Website field already set; README can deepen | Done partially | Low | Yes | Self | Portfolio + pinned repos | P0 | Verified live |
| DEV Community | https://dev.to/jayesh_patil | Developers | Profile + posts already link | Account exists; keep writing | Med | Yes | Self | Case study URLs | P1 | Verified; 4 posts |
| Hashnode | https://hashnode.com | Developers | Blog + possible custom domain later | Create account; real posts only | Med | Yes | Self | Same articles / deeper series | P1 | Platform verified; **you not confirmed on Hashnode** |
| Peerlist | https://peerlist.io/ | Builders / India tech | Profile + Launchpad for projects | Claim username; showcase PoW | Med | Yes | Self | LinkNest / Gravitate / portfolio | P1 | Platform verified ([Peerlist](https://peerlist.io/)) |
| Wellfound (AngelList Talent) | wellfound.com | Startup recruiters | Candidate profile website | Create/complete profile | Low | Free tier | Self | Homepage | P0 | Platform known; **your profile not verified** |
| Collaborator Mahendra Nagpure | LinkedIn / GitHub Mahendra111111 | Mutual credit | Reciprocal portfolio or README credit | Existing collab (public posts) | Low | Yes | Existing relationship | Portfolio | P1 | Relationship publicly mentioned |
| Divines Code | https://divinescode.com/ | Employer/client | Team / case-study credit page | Business approval | Med | Yes | Agency contact | Portfolio or project | P1 | Site exists; backlink **not verified** |
| Gravitate | http://gravitatee.com / https | Client | “Built by” footer | Client approval | Med | Yes | Client | Portfolio case study | P1 | Live site; backlink **not verified** |
| College / MCA program | Dr. B.V. Hiray College (per GitHub README) | Alumni | Student showcase if they run one | Enrollment proof; ask placement cell | Med–High | Usually | Placement office | Portfolio | P3 | Education claimed on GitHub README — **confirm official pages before outreach** |
| Naresh IT alumni | Training claim on GitHub README | Alumni | Occasional student features | Confirm alumni policy | Med | Usually | Institute | Portfolio | P3 | Unverified opportunity |
| Open-source maintainers | Relevant MERN/Next repos you use | Engineering | Meaningful PRs → contributor credit | Real contributions only | High | Yes | Maintainers | GitHub + portfolio | P1–P2 | No specific PR list verified here |
| Product Hunt / Peerlist Launchpad | peerlist.io/launchpad | Launch audience | Launch LinkNest or a tool | Ready product + launch day | High | Free launch | Platform | Project URL + portfolio | P2 | Launchpad exists ([example week page](https://peerlist.io/launchpad/2025/week/10)) |

**Do not use:** paid link farms, PBNs, mass Web 2.0 spam lists marketed as “45 high-DA submissions.” Profile directories only help when the profile is complete and honest; many profile links are nofollow and mainly serve brand SERP coverage.

---

## 6. Phase 5 — Prioritized strategy

### P0 — Immediate professional profile improvements

| Action | Why | Effort | Benefit | Limitation | Next action |
| --- | --- | --- | --- | --- | --- |
| Pick **one** LinkedIn URL; put it on resume, site, GitHub, DEV, schema | Fixes split identity | 1–2 h | Recruiter clarity; cleaner entity | Needs your decision | Confirm canonical; update resume PDF + all bios |
| Featured section on LinkedIn: portfolio, resume, best DEV post, best live project | Recruiters click Featured | 1 h | Traffic + soft signal | LinkedIn links often nofollow | Add 3–4 featured items |
| Align headline across LinkedIn/GitHub/DEV/site (recommend: Full Stack Developer · React/Next.js · Node · TypeScript · Fintech dashboards) | Consistency | 1 h | Better matching in search/recruiting tools | Don’t keyword-stuff | Rewrite once, reuse |
| Pin 3–6 GitHub repos (portfolio, LinkNest/masala if public, best client-safe repos); polish READMEs with portfolio link | Engineers review GitHub | 2–4 h | Referral + credibility | Stars are low today (~1 on several repos) — OK | Pin + README template |
| Wellfound + Peerlist profiles with website | Extra recruiter surfaces | 2–3 h | Discovery | Incomplete profiles hurt more than help | Create complete profiles or skip |
| Soften Instagram/YouTube in schema if they dilute professional SERP | Focus entity graph | 30 m | Cleaner professional association | Optional | Keep on site footer if personal brand matters |

### P1 — High-value project and community opportunities

| Action | Why | Effort | Benefit | Limitation |
| --- | --- | --- | --- | --- |
| Ask Divines Code / Gravitate / Veloraa for a “Built by Jayesh Patil” credit linking to portfolio | Highest relevance links | 2–4 h outreach | Real commercial association | Requires permission; may refuse |
| Mutual credit with Mahendra Nagpure | Already public collab | 1 h | Easy genuine link/mention | Not a high-authority domain by default |
| Continue DEV + start Hashnode series from real builds (Gravitate post is a strong model) | You already proved this channel | 4–8 h/article | Indexed articles + links | DEV profile links are often nofollow; value is traffic + branded search |
| Peerlist Launchpad for LinkNest or a safe demo | Builder audience | 1 day prep | Mentions + feedback | Competitive launch week |
| Meaningful OSS PRs in tools you already use | Engineer credibility | Ongoing | Contributor graphs, possible credits | Don’t open junk PRs |

### P2 — Content-driven backlinks

Write only from verified experience:

1. **Excel → dashboard ingestion pipeline** (OneCapital-safe abstraction; no private data).  
2. **WhatsApp checkout for D2C** (Gravitate — already started on DEV).  
3. **SPA portfolio performance** (update the Jan DEV post with measured Lighthouse after fixes — no fake scores).  
4. **Fastify + Supabase auth patterns** you actually shipped.

Each article should link to: portfolio home + one case-study URL (once those exist).

### P3 — Relationship-based

Guest posts, college showcases, interviews, newsletters — only after P0–P1 assets exist. Cold outreach without a case study URL underperforms.

---

## 7. Phase 6 — Link-worthy portfolio assets

Improve existing assets before inventing new pages.

| Asset | Current state | Recommendation | Audience |
| --- | --- | --- | --- |
| Homepage | Strong visual SPA | Keep as hub; add recruiter CTA | All |
| Works list | Titles + tags only | Show 1–2 line impact; group clones under “UI studies” | Recruiters |
| OneCapital | Private | On-page case study (no secret code) | Recruiters |
| LinkNest / Veloraa / Gravitate | Live demos | Dedicated case-study sections or routes with architecture, stack, outcomes, links | Developers + recruiters |
| DEV articles | 4 posts | Expand; add canonical/cross-post to Hashnode carefully | Community |
| Resume PDF | Indexed | Match LinkedIn URL; host consistently | Recruiters |
| GitHub READMEs | Thin on many repos | Problem → solution → demo → portfolio | Engineers |
| Bio | Split across platforms | One 80-word + one 300-word master bio | All |

**Do not build:** doorway pages, fake blog spam, or thin “services” pages only for links.

---

## 8. Phase 7 — Outreach templates

Use only after you have a live case-study URL. Do not automate. Do not offer payment for ranking links.

### 8.1 College / student showcase

Subject: Alumni / student project showcase — Jayesh Patil (MCA)

Hello [Name],  
I’m Jayesh Patil, currently pursuing MCA at [confirm college]. I build production web apps (React, Next.js, Node) and maintain a portfolio at https://jayeshbpatil.com.  
If the department or placement cell features student work, I’d be glad to share a short case study of [Project] for your showcase. No payment requested — happy to supply screenshots and a write-up.  
Thank you,  
Jayesh Patil · work@jayeshbpatil.com

### 8.2 Hackathon / event organizer

Subject: Speaker/project listing update — Jayesh Patil

Hello [Name],  
I participated in / followed [Event]. I shipped [Project + one-line outcome]. Portfolio: https://jayeshbpatil.com/[case-study].  
If you maintain a projects or alumni gallery, please consider adding this link. I can provide a 100-word blurb and image.  
Thanks, Jayesh

### 8.3 Open-source maintainer

Subject: PR follow-up / docs credit

Hello [Maintainer],  
I opened PR #[n] on [repo] to [specific fix]. If you keep a Contributors or Ecosystem page, my portfolio is https://jayeshbpatil.com — only if that fits your norms.  
Thanks for maintaining [project].

### 8.4 Technical publication editor

Subject: Pitch: [specific technical lesson]

Hello [Editor],  
Pitch: [title]. Angle: [one problem → what I built → measured result]. Audience: [React/Node developers].  
Draft outline attached / linked. Canonical examples: my DEV post [URL] and case study [URL].  
Happy to revise to your guidelines.  
Jayesh Patil

### 8.5 Unlinked mention

Subject: Quick link request for [page]

Hello [Name],  
Thanks for mentioning [project/me] on [URL]. Could you add https://jayeshbpatil.com/[path] so readers can see the live work? Happy to provide a corrected description if useful.  
Thanks, Jayesh

### 8.6 Project showcase platform

Subject: Project submission — [Project name]

Hello,  
Submitting [Project]: [1 sentence]. Live: [URL]. Write-up: [case study]. Builder site: https://jayeshbpatil.com.  
I can provide assets (logo, 1270×760 image, short demo video) per your guidelines.

---

## 9. Phase 8 — 90-day roadmap

Realistic goals: **profiles unified**, **2 case studies live**, **3 substantive posts**, **5–15 quality outreach attempts**, **measure baselines**.  
**Not goals:** “+50 DR” or “page 1 for full stack developer India.”

### Days 1–14 (P0)

| Task | Priority | Outcome | Time | Resources | Depends | Target | Success metric | Verify |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Connect GSC + Ahrefs WT; export blanks | P0 | Measurement | 2–3 h | Cloudflare DNS | Domain access | Search Console | Property verified | Screenshots/CSV |
| Canonical LinkedIn decision | P0 | One URL everywhere | 2 h | Resume + site (later) | Your choice | LinkedIn | All bios match | Manual checklist |
| LinkedIn Featured + headline | P0 | Recruiter path | 2 h | LinkedIn | Canonical URL | LinkedIn | Featured has portfolio | Visual |
| GitHub pins + README links | P0 | Eng path | 3 h | GitHub | — | GitHub | 4+ pins | Profile view |
| Peerlist + Wellfound shells | P0 | Extra surfaces | 3 h | Accounts | Consistent bio | peerlist.io / Wellfound | Profiles complete | Live URLs |
| Master bio doc (80/300 words) | P0 | Consistency | 1 h | Docs | — | Internal | Used on 4+ platforms | Diff check |

### Days 15–45 (P1 assets + content)

| Task | Priority | Outcome | Time | Success metric |
| --- | --- | --- | --- | --- |
| Case study: Gravitate or LinkNest on portfolio (after you approve site work) | P1 | Linkable URL | 8–16 h | Shareable URL with outcomes |
| Case study: OneCapital (public-safe) | P1 | Recruiter story | 6–10 h | Same |
| Group clones under UI studies | P1 | Credibility | 2 h | Visual hierarchy |
| DEV/Hashnode: 1 architecture post | P1 | Indexed article | 6–8 h | Published + links to case study |
| Ask 2 clients for credit links | P1 | Relevant backlinks | 3 h | Responses logged (yes/no) |
| Peerlist Launchpad prep | P1 | Launch | 4 h | Submitted on a Monday |

### Days 46–90 (P2–P3)

| Task | Priority | Outcome | Time | Success metric |
| --- | --- | --- | --- | --- |
| 2 more technical posts | P2 | Topical presence | 12–16 h | Published |
| 1 OSS PR meaningful | P1–P2 | Proof of collaboration | Ongoing | Merged or serious review |
| College placement outreach (if eligible) | P3 | Alumni mention | 2–4 h | Reply logged |
| Monthly GSC/Ahrefs review | — | Learning | 1 h/mo | CSV archived |

---

## 10. Phase 9 — Tracking

### Spreadsheet columns

`Date identified | Prospect | Website URL | Target portfolio URL | Opportunity type | Relevance (High/Med/Low) | Priority (P0–P3) | Outreach status | Publication status | Verified backlink (Y/N/URL) | Anchor text | Follow-up date | Notes`

### Monthly report (after baselines exist)

- New / lost referring domains (from Ahrefs WT or GSC Links)  
- Verified links earned (manual confirm)  
- Branded clicks & impressions (GSC)  
- Portfolio sessions (Cloudflare Analytics or GSC)  
- Case-study engagement (scroll/CTA — if analytics added later)  
- Recruiter inquiries (email/LinkedIn count you log manually)

Set numerical targets **only after month-1 baseline**.

---

## 11. Risks and ethics

- Do not buy links or use PBNs.  
- Do not fabricate metrics, employers, or “featured in” claims.  
- Client credit links need permission (NDAs, brand guidelines).  
- Instagram/YouTube are fine personally; over-weighting them in `sameAs` can confuse professional entity signals.  
- Mass directory submission looks spammy and wastes time.  
- Dual LinkedIn URLs are a higher near-term risk than missing directory links.

---

## 12. Final recommendations (impact × feasibility)

| Rank | Recommendation | Impact | Feasibility | Needs your approval to implement on site? |
| --- | --- | --- | --- | --- |
| 1 | Canonical LinkedIn + unify bios/resume | High | High | Resume/site later |
| 2 | Connect GSC + Ahrefs WT; share exports | High | High | No code |
| 3 | LinkedIn Featured + GitHub pins | High | High | No code |
| 4 | Ship 2 public case-study URLs on the portfolio | High | Med | **Yes** |
| 5 | Continue DEV + Hashnode with links to those URLs | High | Med | No code for posts |
| 6 | Request client “built by” credits | Med–High | Med | No code |
| 7 | Peerlist / Wellfound / Launchpad | Med | High | No code |
| 8 | College + college showcases | Med | Low–Med | No code |
| 9 | Directory blasts / paid links | Low / Harmful | — | Do not do |

---

## 13. Approval gate — what I need from you

1. **Canonical LinkedIn URL:** Confirmed `jayeshpatilfs` (site socials + schema updated).  
2. **GSC / Ahrefs:** Steps in `GSC-AHREFS-SETUP.md`. Profile actions in `PROFILE-CHECKLIST.md`.  
3. **Site assets:** Case studies (OneCapital, LinkNest, Gravitate), clone grouping, hero CTAs — local; deploy when ready.  
4. **Public case studies shipped on-page:** Gravitate + LinkNest (+ OneCapital internal).  
5. **Client outreach:** Still optional — draft only when you ask; you send.

---

## Sources (access date 27 Oct 2026 unless noted)

- [Jayesh Patil | Full Stack Developer](https://jayeshbpatil.com/)
- [GitHub — Jayeshpatil9869](https://github.com/Jayeshpatil9869)
- [GitHub — Jayesh-portfolio](https://github.com/Jayeshpatil9869/Jayesh-portfolio)
- [GitHub profile README repo](https://github.com/Jayeshpatil9869/Jayeshpatil9869)
- [DEV — Jayesh Patil](https://dev.to/jayesh_patil)
- [DEV — Portfolio build article](https://dev.to/jayesh_patil/how-i-built-my-developer-portfolio-with-react-gsap-and-performance-in-mind-4f8g)
- [DEV — Gravitate / D2C article](https://dev.to/jayesh_patil/building-a-modern-d2c-e-commerce-platform-with-nextjs-supabase-express-29e2)
- [Resume PDF (Supabase)](https://wrcoiavqijnltexejxob.supabase.co/storage/v1/object/public/resume/Jayesh%20Patil.pdf)
- [LinkedIn profile jayeshpatilfs (search/snippet)](https://linkedin.com/in/jayeshpatilfs)
- [LinkedIn post — portfolio link](https://www.linkedin.com/posts/jayeshpatilfs_webdevelopment-frontenddevelopment-uiux-activity-7423373380369702912-s0vy)
- [LinkedIn post — Gravitate](https://www.linkedin.com/posts/jayeshpatilfs_nextjs-webdevelopment-fullstackdeveloper-activity-7437458513875873792-vxYE)
- [LinkedIn post on jayesh-patil01 — Image Enhancer](https://www.linkedin.com/posts/jayesh-patil01_ai-imageenhancer-reactjs-activity-7414912623101681665-1Awu)
- [Peerlist](https://peerlist.io/)
- [Peerlist Launchpad example](https://peerlist.io/launchpad/2025/week/10)
- [Shreyansh Kumar Singh portfolio](https://www.shreyanshkumarsingh.com/)
- [Prathmesh Vhatkar portfolio](https://psv2522.com/)
- [Dinesh Choudhary portfolio](https://dineshchoudhary.com/)
- [Divines_Code_Website README (portfolio link)](https://github.com/Jayeshpatil9869/Divines_Code_Website)

**Estimate vs observation:** Competitor backlink volume and all GSC/Ahrefs metrics are **unknown**. Strategy priorities above are recommendations based on observed brand gaps and standard recruiter discovery paths, not on measured referring-domain counts.
