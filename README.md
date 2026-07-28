# Boomtown Athletics — Website

Static marketing site for **boomtownathletics.com** (Denver/Aurora volleyball —
tournaments, women's/men's/co-ed leagues, training, and nightly drop-in).

_Site version: **v0.23.1** · 2026-07-28_

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
