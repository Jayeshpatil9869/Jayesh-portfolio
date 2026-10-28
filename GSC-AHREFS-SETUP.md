# Google Search Console + Ahrefs Webmaster Tools Setup

**Site:** https://jayeshbpatil.com/  
**Goal:** Measure real queries, links, and referring domains. No invented SEO metrics until exports exist.  
**Time:** ~45–90 minutes for both tools (plus wait for first data).

---

## A. Google Search Console (free)

### 1. Create / open property

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add property → choose **Domain** (preferred): `jayeshbpatil.com`  
   - Covers `www` and apex. Needs DNS TXT.  
   - Or **URL prefix**: `https://jayeshbpatil.com` (HTML file / meta / Cloudflare).

### 2. Verify on Cloudflare (Domain property)

1. GSC shows a TXT record like `google-site-verification=...`.
2. Cloudflare → DNS → Add record: **TXT**, Name `@`, Content = the verification string.
3. Wait for DNS, click **Verify** in GSC.

**URL-prefix alternative:** upload the HTML file to `public/` and deploy, or use Cloudflare’s Search Console integration if already connected.

### 3. After verification

1. **Sitemaps** → submit `https://jayeshbpatil.com/sitemap.xml` (if that file is live).
2. Confirm **Settings → Users and permissions** (only you unless sharing).
3. Optional: add Bing Webmaster Tools later with the same sitemap.

### 4. Exports to save (after ~3–14 days of data)

| Report | Path | Action |
| --- | --- | --- |
| Links | Links → Top linking sites / text / pages | Download |
| Performance | Performance → Search results | Last 3 months + Compare; Download CSV |
| Indexing | Pages → Why pages aren’t indexed | Screenshot or note |

Put CSVs in a private folder (do **not** commit secrets). Share exports here for a quantitative Phase 2 update.

### 5. What you will use the data for

- Branded vs non-branded queries  
- Pages that actually get impressions (today mostly `/`)  
- Referring sites GSC knows about (incomplete vs Ahrefs)

**Do not** expect same-day backlink totals. GSC Links is delayed and partial.

---

## B. Ahrefs Webmaster Tools (free for verified sites)

1. Open [Ahrefs Webmaster Tools](https://ahrefs.com/webmaster-tools).
2. Add `jayeshbpatil.com` and verify (DNS or meta — follow their wizard).
3. After crawl/sync:
   - **Backlinks** → export CSV  
   - **Referring domains** → export CSV  
   - Note broken links and lost links if shown
4. Compare with GSC. Counts will differ — normal. Prefer quality of domains over raw count.

---

## C. Sanity checks (no login required)

| Check | How | Limitation |
| --- | --- | --- |
| Indexing signal | Google: `site:jayeshbpatil.com` | Not a backlink list |
| Brand SERP | Search `Jayesh Patil` / `Jayesh B Patil developer` | Manual |
| Own links | GitHub / DEV / LinkedIn already link out | Confirmed in strategy doc |

---

## D. Done when

- [ ] GSC property verified  
- [ ] Sitemap submitted  
- [ ] Ahrefs WT verified  
- [ ] First Performance + Links (or Ahrefs backlinks) CSV saved  
- [ ] Shared for Phase 2 numbers (optional)

**Canonical LinkedIn (for bios while you wait):** https://www.linkedin.com/in/jayeshpatilfs  

Next: complete `PROFILE-CHECKLIST.md`, then use live case-study anchors on the site once deployed.
