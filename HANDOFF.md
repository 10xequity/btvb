# Boomtown Athletics — Website Rebuild · HANDOFF
**Version: v0.16.0 · Prompt v2.0.0 · Updated: 2026-07-19**

Static site replacing the old Wix build for **Boomtown Athletics** (competitive volleyball,
Denver metro), hosted inside **Boomtown FieldhouseUSA, 14200 E Alameda Ave, Aurora, CO 80012**.
Contact admin@boomtownathletics.com · sponsorship admin@boomtownvb.com.
Socials: instagram.com/boomtownvb · facebook.com/groups/boomtownvb · boomtownathletics.com.

**This file supersedes:** HANDOFF v0.13.0, the empty `HANDOFF.md` on `main` (build-error stub),
and the data-layer sections of design v0.14.0 (now folded into design.md v0.15.0).
**Doc rule going forward:** every change bumps version + date in BOTH this file and design.md.

---

## ⚡ SESSION HISTORY — outline notes (owner refresher)
Reconstructed from the retrievable project chat (2026-06-28) + repo changelogs. Sessions
v0.1–v0.13 predate this project's searchable history; their outline is from the design.md log.

### Session block 1 — 2026-06-20/21 · site build (v0.1 → v0.13, from changelog)
- **v0.1–0.2:** brand tokens from 2026 BOOM/QC logos; all 10 pages built self-contained;
  two fonts locked (Anton display / Archivo body); drop-in featured site-wide.
- **v0.3–0.4:** "Play Everyday" motto; Leagues dropdown nav; /facility-rules page;
  tournaments Formats & Rules; partners tiered on Home only.
- **v0.6:** deploy-blocking bug fixed (root-absolute → relative paths); favicon from gold
  spiker mark; Emil motion system (custom eases, scroll-reveal, reduced-motion gated).
- **v0.7:** 17-item review pass — sanctioned band everywhere, Store link, back-to-top,
  women's qualifying rewrite (Aug–Oct half-price qualifier, 3-season commitment), Drop-In
  house rules, QC schedule line.
- **v0.8:** hi-res 2026 logo master; edge-to-edge hero collage; women's registry CTAs
  ("Player registration") pointed at interim form — **swap when the profile registry is live**.
- **v0.9:** 16:9 cine crops; local og-cover.jpg on all indexable pages; SportsActivityLocation
  JSON-LD actually added to Home (earlier claim was wrong); EXIF embedded in 28 JPGs.
- **v0.10–0.12:** dropdown hover-bridge bug fix; About rewrite (no "player-run"); all Wix-hosted
  images localized (no 404 risk on Wix exit); slim beneath-hero band; hero drop-shadows.
- **v0.13:** co-ed/women's photo de-dup; COBO club video moved to Training (watermark removed
  via ffmpeg); QC page filled (bg, carousel, schedule table); partner logo corrections;
  gold mailing-list CTA band on every page.

### Session block 2 — 2026-06-28 · live events data layer (retrieved chat)
- **Problem:** owner wants tournaments/leagues updated by editing a spreadsheet, live on the
  site, **no GitHub rebuild**, no embedded iframe.
- **Decisions made:** Google Sheet published-as-CSV, fetched client-side, rendered as native
  Boomtown tiles. **Rejected:** Supabase (not owner-friendly; free tier pauses after ~7 days
  idle) and GitHub-Action baking (owner declined GitHub-in-the-loop). **Accepted trade-off:**
  client-rendered rows won't earn Google Event rich-results; §7 of design.md is the escape hatch.
- **Built:** cleaned two-tab workbook (`Boomtown_Tournaments_Leagues_clean_v1`, 76 tournaments +
  26 leagues, ISO dates added, original wording kept in `date_display`); widget v2 with filter
  bar All·Tournaments·Leagues·Events·Partners; partners deliberately a separate tab (logos,
  not date cards).
- **Flagged for owner, still unresolved:** "Boomtown Showdown 2026" dated Sept 28 **2025**
  (year mismatch); two Social Den events + Speed Dating + Women's Mixer (keep on site?);
  invitational rows have no link by design; two date-TBD tournaments; leagues with past start
  dates read as "past" — consider an `active` yes/no column.
- **Left waiting on owner:** publish the two tabs → send the two CSV URLs; optional
  "Add an event" Google Form.

### Session block 3 — 2026-07-19 · audit + regeneration (this session)
- Repo reviewed via GitHub MCP: widget **not yet in repo**; `HANDOFF.md` on main is 0 bytes;
  design.md on main is still v0.13.0.
- **SEO audit findings:** sitemap namespace typo (sitemap.org → sitemaps.org) — fixed;
  extensionless canonicals vs `.html` files = **404s on GitHub Pages, fine on Cloudflare
  Pages** (host decision pending — the pivot of the cutover); no CNAME; facility-rules had
  zero OG/JSON-LD — fixed; meta descriptions 190–326 chars — all rewritten ≤160; no 404 page
  — added; FAQPage confirmed present on all 7 sub-pages (earlier scan error, corrected).
- **Behold verified (behold.so/pricing):** Free = 1,200 views/mo, 1 feed, **6 posts max**,
  daily refresh, logo. **Starter $10/mo** = 15k views, 3 feeds, 50 posts, hourly, no logo —
  covers BOTH sites; the forcing constraint is the 6-post cap vs our 3×3 grid, not site count.
  Pro ($30) unnecessary at this traffic. IG account must be Business/Creator type.
- **Widget v3:** JetBrains Mono removed — root cause of the "ugly font": site pages only load
  Anton+Archivo, so mono fell back to browser default. Now Anton (titles, day numeral) +
  Archivo (everything else).
- **Queens Club:** huge gold radial gradient wash removed; logo glow tightened to a subtle
  drop-shadow (crisp dark lift + faint 14px gold rim).
- **Meta Pixel:** connector approval didn't come through, so pages carry an **inactive
  commented Pixel snippet** with `YOUR_PIXEL_ID` — activate per the comment, or approve the
  Meta connector and the ID can be pulled and baked in.
- **Not done (blocked/gated):** nothing pushed to GitHub; no DNS/Cloudflare changes; widget
  placement undecided; CSV URLs still not provided; Wix image binaries can't be downloaded
  from this sandbox (network allowlist) — see WIX-IMAGE-MANIFEST.md for URLs + drafted captions.

---

## v0.16.0 addendum (same day)
schedule.html added (What's On board, widget v3 embedded, hash-filter deep links: #tournaments/#leagues/#events/#partners); tournament nav/CTAs → schedule.html#tournaments; stale placeholder schedule table + ALL raw Sheet links removed from pages; hero LCP fix (eager + fetchpriority=high). Widget-placement gate CLOSED (dedicated page). Remaining gates: host, www/apex, CSV URLs, Pixel ID, push approval.

## Stack / deploy
- **Code canon:** github.com/10xequity/btvb (`main`). **Deploy:** GitHub Pages
  → 10xequity.github.io/btvb. Relative paths; canonical/OG point at www.boomtownathletics.com.
- **⚠ HOST DECISION PENDING:** extensionless canonicals/sitemap only resolve on Cloudflare
  Pages (or after restructuring). Decide before DNS cutover. Also decide www vs apex + 301.

## Files (v0.15.0 delivery = boomtown-web_v0.15.0_2026-07-19.zip)
10 pages (all regenerated) + **404.html (new)** + robots.txt + sitemap.xml (fixed) +
**boomtown-events-widget_v3_2026-07-19.html (new, not yet embedded)** + README + this file +
design.md v0.15.0 + WIX-IMAGE-MANIFEST_2026-07-19.md. Assets unchanged (live in repo).

## Key URLs / data
Store: boomtownathletics.square.site · Sheet ID: 11gSs2akMUBsRrR-80HPU8n7HJz5v-oT6HfGmsnFkn-w
Women's form: forms.gle/1sfPSZhbVEifFrct6 · Drop-in waiver: forms.gle/vwEY2aC4SA9SrZPQA
Mailing list: forms.gle/PPFgrps7jkTrPr4DA · Behold: behold.so (Starter $10/mo recommended)

## OPEN FLAGS / TODO (priority order)
1. **Host decision** (Cloudflare Pages vs GitHub Pages) → unblocks canonical/URL strategy,
   CNAME, DNS cutover. 2. **Publish Events+Partners CSV tabs → send 2 URLs** → wire widget.
3. ~~Widget placement~~ DONE → schedule.html. 4. Behold Starter purchase + IG
   Business-account check → replace static 3×3 (or build the Worker→KV→R2 cache; Cloudflare
   MCP available). 5. Meta Pixel ID (approve connector or paste ID). 6. Push v0.15.0 to
   `main` (approval gate). 7. Women's player registry form (see suggestions in chat,
   2026-07-19). 8. Sheet owner-review rows (Showdown year, Social Den, TBD dates, league
   `active` column). 9. CAF transparent logo; self-host clearbit partner logos; verify
   JSON-LD geo; externalize shared CSS/JS.
