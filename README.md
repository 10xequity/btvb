# Boomtown Athletics — Website

Static marketing site for **boomtownathletics.com** (Denver/Aurora volleyball —
tournaments, women's/men's/co-ed leagues, training, and nightly drop-in).

_Site version: **v0.27.0** · 2026-07-28_

## Hosting & deploy
- **Origin:** GitHub Pages — repo `10xequity/btvb` (`https://10xequity.github.io/btvb`).
- **Custom domain:** `www.boomtownathletics.com` via `CNAME`, fronted by **Cloudflare** (DNS + CDN/proxy). `www` is canonical.
- **Build step:** none. It is plain HTML/CSS/JS; each page inlines its own CSS/JS.
- **Deploy:** commit to `main`; GitHub Pages publishes automatically. To ship a zip like this one, extract it at the repo root (overwriting the listed files) and commit.
- **URLs use `.html`.** GitHub Pages does **not** auto-rewrite extensionless URLs, so internal links and canonical/OG/JSON-LD self-URLs are written with `.html`. (This corrects an earlier README that described Cloudflare Pages clean-URL behavior — that is not how this site is served.)

## Pages (13)
`index` · `schedule` · `tournaments` · `drop-in` · `womens-league` · `mens-league` ·
`co-ed-leagues` · `training` · `skill-levels` · `contact` · `facility-rules` ·
`queens-club` *(noindex gate → funnels to the women's league)* ·
`library` *(internal image reference — noindex, not linked, not in sitemap)*

`robots.txt` disallows `/queens-club` and `/library`; `sitemap.xml` excludes both.

## Assets
Local images in `/assets/img/` (~80 files, ~19 MB total — well under GitHub limits; v0.23.0 added 10 team photos + one derived hero under `/assets/img/library/`). As of v0.23.1 those 11 files carry embedded IPTC/XMP/EXIF metadata (title, caption, keywords, credit/copyright).
Partner logos in `/assets/img/partners/`. There is no external image CDN dependency;
all photos are committed to the repo.

## What's new in v0.27.0 (2026-07-28)
**Housekeeping release — no visible change to any page.** Every edited file was verified against the
live repo and the live Google Sheet rather than trusted from the previous handoff, and that turned up
three documented "facts" that were wrong. Files changed: all 11 indexable pages, `README.md`, `design.md`.

- **Removed 18 stale duplicate version comments** across the 11 indexable pages. Line 1 (`<!DOCTYPE html><!-- vX.Y.Z ... -->`) is the single canonical version header, but lines 2–4 still carried leftover `v0.18.0`/`v0.19.0` comments from older releases — up to three per page on `womens-league`, `mens-league` and `co-ed-leagues`. They flatly contradicted line 1, and they cost real time: a session reading line 2 concludes `main` is six releases stale. Removal was comment-scoped, not line-based, because on most pages the last stale comment shared its line with `<html lang="en">`.
- **Removed 3 dead `esc()` functions** (`index.html`, `womens-league.html`, `mens-league.html`). The one in `index.html` was the leftover HTML escaper orphaned when v0.26.0 rebuilt `card()` with DOM properties; the two league pages held empty `function esc(){}` stubs. Each was verified uncalled before removal, and the league renderers were confirmed to build every cell with `textContent` — so no escaping behaviour was lost.
- **Corrected: the sheet *can* be read from a tooling environment.** Since v0.25.0 the docs have stated that CSV data is "browser-verified, not sandbox-verified" because `docs.google.com` blocks automated fetchers. That is true of a plain HTTP fetch but not of the **Google Drive MCP**, which reads the file through the Drive API. All 7 tabs were read directly this release. (Caveat: that reads the *source sheet*, not the published-CSV cache the browser sees, so publish latency is still unobservable.)
- **Corrected: the external partner-logo count.** The brief said "~14 hotlinks on index + tournaments". Actual: **22** — `logo.clearbit.com` ×18 and `static.wixstatic.com` ×4 — across **three** pages: `index.html` (16), `schedule.html` (3), `tournaments.html` (3). `schedule.html` was missing from every prior list.
- **Documented the Cloudflare Worker.** `boomtown-api.vvisuth.workers.dev`, unexplained since v0.26.0, was read via the Cloudflare MCP: it is the backend of a **separate members-platform project** (`10xequity/btplatform`), self-reporting `v0.32.0`, with 139 API routes, a D1 database, Square payments and Brevo email. It is **not** a proxy for this site and has no bearing on the CSV or Behold constraints. Out of scope for this repo by owner decision.
- **Verified and closed:** `main` really is at v0.26.0 (IG `inset` fix present on all 11 pages, both league gids wired, `card()` free of `innerHTML`, Meta Pixel on all 11). The one remaining `innerHTML` in `index.html` is the carousel's own static SVG icon constant, not feed data.

**Owner actions shipped alongside (not repo files):** `SHEET-CLEANUP_v0.27.0_2026-07-28.md` (exact cell-level edit list) and `repo-hygiene_v0.27.0_2026-07-28.sh` (verified `git rm` script with a read-only pre-flight).

**Still open (owner-deferred or pending):** partner-logo self-host (deferred — 22 external hotlinks retain `onerror` text fallbacks); placement of the 7 library-only team photos; high-res re-exports of the 3 low-res images; sheet data hygiene; the `git rm` list; `boomtownvb.com` → 301 redirect when the domain transfers.

## What's new in v0.26.0 (2026-07-28)
**The Instagram grid actually shows the photos now.** The feed and the images were never the problem — a CSS cascade bug was painting a solid yellow panel over every tile. Files changed: all 11 indexable pages, `README.md`, `design.md`.

- **Fixed the yellow tiles (the real bug).** `.ig-card span` (the caption) sets `inset:auto 0 0 0`, and `.ig-card .t` (the yellow `@boomtownvb` chip) overrode only `top`/`left` — never `right`/`bottom`. Those leaked through, so the chip anchored at (9,9) and stretched to the bottom-right corner: **measured 336×336 inside a 347×347 tile, covering 94% of every card.** Now `inset:9px auto auto 9px` → the chip renders at 96×21 (1.7% of the tile) and the photo is visible.
- **Fixed the reel badge.** Same leak, second victim: `.ig-card .pl` also inherited `padding:24px 11px 10px`, and because the site is `box-sizing:border-box` that padding (34px) exceeded `height:26px`, flooring the badge at **26×34** — an oval with an off-centre ▶. Now `inset:9px 9px auto auto;padding:0` → a true 26px circle.
- **Applied on all 11 indexable pages.** The IG card CSS is duplicated across every page (each page inlines its own CSS), though only `index.html` carries the grid markup. The other 10 rules are inert today; they were fixed anyway so the bug can't resurface if a page is ever copied as a template.
- **Hardened each tile against image failure.** IG cards previously had no `onerror` path — only a whole-feed fallback — so a single blocked or failed image left a permanently empty tile. Each `<img>` now falls back once to a committed local photo (guarded by a `data-fb` flag so it can't loop).
- **Removed a feed-data injection vector.** `card()` built its markup with `innerHTML` and interpolated the feed's image URL straight into a `src="..."` attribute unescaped. It now builds the card with DOM properties (`createElement`/`textContent`), so nothing from the feed is ever parsed as HTML.
- **Confirmed: side-out is the tournament scoring default.** Open since v0.22.0. No code change was needed — `tournaments.html` already stated it correctly; the decision is simply recorded now.
- **Corrected the record:** the IG images are served from **`behold.pictures`**, not `hop.behold.pictures` as earlier docs claimed.

**Still open (owner-deferred or pending):** partner-logo self-host (deferred — external hotlinks + `onerror` fallbacks retained); placement of the 7 library-only team photos (deferred); high-res re-exports of the 3 low-res images (deferred); sheet data hygiene; the `git rm` list in the handoff.

## What's new in v0.25.0 (2026-07-28)
**League schedules are live.** Both tables now pull real rows from the Google Sheet instead of the built-in samples. Files changed: `womens-league.html`, `mens-league.html`, `README.md`, `design.md`.
- **Wired both published-CSV feeds** into `window.__LEAGUE_CSV__`, using the site's existing entire-document publish token with each tab's `gid` (WomensLeagues `1645496886`, MensLeagues `1824462476`) — the same token already driving the Events board on `schedule.html`. No renderer changes: the v0.24.0 header schema guard still confirms the CSV has `title`+`start_date` before rendering, and falls back to samples on a wrong tab.
- **Verified** against the live tab contents: WomensLeagues renders 6 rows, MensLeagues 2 rows; dates format timezone-safe ("Tuesday, August 25, 2026"), and rows whose registration cell is `TBD`/`Invitiational` show "Coming soon".
- **Instagram feed:** no code change. The home grid already targets the correct Behold feed; the feed now populates because the owner added the site to Behold's domain allowlist. (Behold is fetched browser-side, so no Cloudflare change was needed.)

**Still open (owner-deferred or pending):** self-hosting the externally-hotlinked partner logos (deferred — hotlinks + `onerror` fallbacks retained); placing the 7 library-only team photos (kept in the library for future use); high-res re-exports of the 3 low-res images; scoring-default confirmation. The `git rm` hygiene list is in the handoff.

## What's new in v0.24.0 (2026-07-28)
League-schedule + tournaments-photo release. Files changed: `womens-league.html`, `mens-league.html`, `tournaments.html`, `design.md`, `README.md`.
- **League pages — removed the "⚠ SAMPLE ROWS" flag text.** Both schedule tables now render rows with no warning banner in either sample or live mode. The only remaining sample-vs-live signal is an invisible `console.warn` on fetch failure (developer-facing, not shown to visitors).
- **League pages — added a header schema guard.** After fetching a CSV, if the header row lacks `title`/`start_date` the renderer silently falls back to the built-in sample rows instead of painting `undefined` cells. This matters because the women's URL supplied earlier (gid `454802271`) actually resolves to the **Partners** tab — without the guard it would fill the table with blank rows. The renderer was tested against the live sheet's WomensLeagues (6 rows) and MensLeagues (2 rows) content: dates format timezone-safe (`2026-8-25` → "Tuesday, August 25, 2026"), stale prose in `end_date` is ignored, and non-URL registration cells show "Coming soon".
- **Tournaments (#15b) — decorative schedule photo.** A tournament action photo now sits beside the Schedule section in the existing `.split` 2-col grid (collapses to a single column at ≤840px; `width`/`height` set to avoid layout shift).
- **`design.md` changelog caught up.** The 0.20.0 → 0.24.0 entries are now pasted in (it previously stopped at 0.19.0).

**Not done this release (blocked — needs owner input):** self-hosting the ~14 externally-hotlinked partner logos (the sandbox cannot reach `clearbit.com`/`wixstatic.com` — send the source PNGs); the MensLeagues + WomensLeagues published-CSV URLs (the tables stay on samples until pasted into `window.__LEAGUE_CSV__`); the Instagram feed fix; high-res originals for the 3 low-res images; and confirmation of the scoring default. A `git rm` list for 4 unreferenced/duplicate partner files is in the handoff.

## What's new in v0.23.1 (2026-07-28)
Photo-library metadata + tagging patch. No page layout, data-layer, or renderer-logic changes beyond `library.html`.
- **Embedded metadata** written into the 10 uploaded team photos + the derived `womens-league-hero.jpg` (11 files under `/assets/img/library/`): IPTC (title, caption/abstract, keywords, by-line, credit, source, copyright, location) + EXIF (ImageDescription, Artist, Copyright, Software, Windows XP title/keywords/comment/subject). Writes touched only the metadata segments — pixels, dimensions (1800×1200; hero 2400×1412), and JPEG quality are unchanged.
- **No personal names embedded** — keywords use publicly visible jersey/team text (YAM TIME, The Island, Mines, Carry Water, Knights, Fort Hays State, etc.) and category terms only.
- **`library.html`** DATA schema gained an optional 6th element, a `tags` array; cards now render tag **chips** and the search box matches tags. Backward-compatible: untagged entries render exactly as before.
- Filenames unchanged (they were already descriptive and two are wired into live pages via `onerror` fallbacks), so no page references break.

## What's new in v0.23.0 (2026-07-28)
Photo/content pass across the home, training, women's, men's, co-ed, contact, tournaments, and library pages. No data-layer or renderer changes.
- **Home — Tournaments band** now uses `womens-usav-nationals-champions.jpg`, framed on the players' faces.
- **Home — carousel controls** simplified to a bare translucent glass triangle (the circular button background/blur is gone). Full 46px tap target and focus ring retained.
- **Home — FieldhouseUSA carousel** now **leads with** `fieldhouse-exterior-sign.jpg` and adds `fieldhouse-courts-empty.jpg` to the rotation (9 slides; JS carousel handles the count).
- **Training hero** → `youth-camp.jpg`, framed on the group (off the ceiling).
- **Women's League** — hero rebranded to **Queens Club / "Denver's Elite Women's League"** (with a "Women's League" eyebrow); the old "…plus the elite Queens Club" lead line removed; hero image is an **upscaled** (2400px) crop of the champions photo, reframed so no heads are cut. Program photos swapped (**Indoor** → `womens-open-gym-group.jpg`, **Grass** → `womens-league-group.jpg`) and the photo aspect widened 16:7 → 16:10 so group heads aren't cropped. **How to qualify** moved **above** Our Programs and given a side action photo (`tournament-spike-block-action.jpg`) plus a **Schedule** button anchored to the table. Program boxes now equal height. New FAQ **"What are the rules?"** links to the tournaments **gendered-4s** rules.
- **Men's League** — removed the beach "on the court and off" photo section; the Men's 4s block now shows the men's team photo `mens-team-yamtime.jpg`; added a **gendered-4s rules** link and a matching FAQ.
- **Co-Ed** — Match Point Social photo → `coed-team-pyramid.jpg`.
- **Contact hero** re-centered on the group's faces (was cropping to legs).
- **Tournaments** — added an `#gendered-4s` anchor on the *Co-Ed & Gendered 4s* rule so the women's/men's pages can deep-link to it. **No rule or scoring wording was changed** (side-out default still unconfirmed — owner decision pending).
- **Library (internal)** — usage labels refreshed to reflect **actual** placements (what's live vs. safe to delete), and **10 new team photos + the derived hero** added and documented.

> **Not done this release:** the "remove the flag + dead space / Live Link" item — no element named/behaving as a "flag" exists in any page's source, and the provided link resolves to the sheet's **Partners** tab. Needs one clarification (which page + what the "flag" is) before it's safe to touch. See HANDOFF §Open.

## What's new in v0.22.1 (2026-07-28)
Patch release — league schedule renderer updated to the sheet's **new column schema**. No content or design changes elsewhere.
- **New schema support.** The WomensLeagues / MensLeagues tabs were re-standardized to `title, division, format, day, start_date, end_date, time, location, registration_link, status, notes` (the sheet still carries a leading `type` column, which the renderer ignores). Both renderers now read the **`day`** field (was `Night`) and derive the date from **`start_date`/`end_date`** (the old `date_display` column is gone).
- **Dates are now formatted in the browser.** You type a plain ISO date in the sheet (`2026-08-25`) and the site prints the full form (**"Tuesday, August 25, 2026"**). A real ISO `end_date` renders a range (e.g. "Aug 28–30, 2026"); a blank or non-ISO `end_date` is ignored. Parsing is timezone-safe (no Denver off-by-one).
- **Schedule column header** relabeled **Night → Day** on both league tables.
- **Removed dead code:** a leftover inline `var L=[…]` script that briefly wrote a mismatched 4-column table into the schedule before the real renderer overwrote it.
- **Sample rows refreshed** to mirror the current sheet under the new field names, so both pages read correctly even before the live CSV is connected.

> Still shows **SAMPLE rows** until you paste the published CSV URLs — see below and the HANDOFF. Going live is a sheet/paste step, not a code change.

## What's new in v0.22.0 (2026-07-28)
- **Meta Pixel is live** (ID `120232615176120623`) on all 11 indexable pages (`queens-club` and `library` excluded).
- **Home carousels** (`About` and `FieldhouseUSA`) converted from CSS-only crossfades to accessible **JS carousels** with glass prev/next controls, keyboard focus, auto-advance that pauses on interaction, and reduced-motion support. Degrades gracefully to the CSS crossfade if JS fails.
- **Tournaments — Formats & Rules** moved above the schedule (with **How to Enter**); scoring rewritten to state **match/side-out scoring as the default**; added two 1-minute time-outs per set, the forfeit rule, the **waiver** requirement, and corrected **Reverse Co-Ed / Co-Ed 4s** rules (10-foot-line jump/attack, below-net-height, hand-set faults).
- **Men's League page overhaul:** removed the "How to qualify" section, added a Men's 4s explainer, a **live schedule table** (Google-Sheet CSV renderer), and a 7-question FAQ with FAQ schema.
- **Women's League:** schedule table now driven by the same **CSV renderer** (6 columns: League · Day · Format · Time · Date · Register).
- **Library page:** added an image **deletion queue** (tick images → copy the generated `git rm` commands) plus likely-duplicate grouping. Persists in the browser via `localStorage`.
- Small moves: **drop-in** House Rules above the FAQ; **skill-levels** "How to choose" above the ladder; removed the **training** Colorado Boom Club placeholder line.
- Sanctioning wording standardized to "Boomtown is sanctioned by USAV, AVP, and AAU."

### Still owner-dependent (deferred)
- The two league schedule renderers ship with **clearly-labeled SAMPLE rows** until the published **WomensLeagues / MensLeagues** CSV URLs are pasted into each page's `window.__LEAGUE_CSV__` (see HANDOFF).
- Instagram feed embed, self-hosted partner logos, and confirmed men's-page photos are unchanged this release.

---
_Boomtown Athletics site · v0.23.0 · 2026-07-28_
