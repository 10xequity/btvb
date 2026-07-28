# Boomtown Athletics — Website

Static marketing site for **boomtownathletics.com** (Denver/Aurora volleyball —
tournaments, women's/men's/co-ed leagues, training, and nightly drop-in).

_Site version: **v0.23.0** · 2026-07-28_

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
Local images in `/assets/img/` (69 files, ~15.8 MB total — well under GitHub limits).
Partner logos in `/assets/img/partners/`. There is no external image CDN dependency;
all photos are committed to the repo.

## What's new in v0.23.0 (2026-07-28)
Owner content/media pass across 8 pages + the live women's schedule connection.
- **Home:** tournaments cinematic now uses the **USAV Nationals champions** photo (upscaled to 2400px, face-centered crop); carousel prev/next are now **bare glass triangles** (circle removed); FieldhouseUSA carousel **leads with the exterior sign** and adds the empty-courts shot (9 images).
- **Women's League:** hero shows ~30% more of the photo (taller crop, heads kept in frame, image upscaled); new title block — *Women's League / Queens Club / "Denver's Elite Women's League"*; **How to qualify moved above Our programs** with a top-cropped action photo and a **Schedule** button (`#schedule` anchor); Indoor/Grass program photos swapped and the two cards equalized; FAQ adds **"What are the rules?"** → `tournaments.html#gendered-4s`; **live WomensLeagues CSV connected** — the ⚠ SAMPLE flag (and its leftover space) is removed when live, and a schema guard falls back to samples if the published tab is wrong.
- **Men's League:** beach photo + "on the court and off" section removed; Men's 4s photo → `mens-4s-yam-time-champs.jpg` (**file pending upload** — falls back to the prior action shot until it lands); rules note + FAQ link to the gendered-4s rules.
- **Tournaments:** `id="gendered-4s"` anchor added to the Co-Ed & Gendered 4s rules block.
- **Co-Ed:** Match Point Social photo → `coed-4s-green-team-fun.jpg` (**pending upload**, falls back to the prior group shot).
- **Contact:** hero crop shifted to faces (`object-position:50% 30%`).
- **Training:** hero → `youth-camp.jpg`, cropped to the group (not the ceiling).
- **Library:** usage labels ground-truthed for **every** asset (grep across all pages), plus a 10-photo **pending-upload batch** listed with export/rename targets; missing thumbnails hide gracefully.
- **Changed binary asset:** `assets/img/library/womens-usav-nationals-champions.jpg` re-exported at 2400×1412 (Lanczos upscale + unsharp). Upscaling reduces visible pixelation but cannot add true detail — replace with a higher-res original when available.

> ⚠ **10 new photos are wired but not in the repo yet** (they arrived in chat, not as files). Export each `DSC_*.JPG` at 1800px wide (JPEG q≈82) to the exact paths listed on `/library.html` (the "PENDING" cards) — the two wired pages self-heal the moment the files land. Men's schedule still shows SAMPLE rows (no MensLeagues CSV URL supplied).

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
_Boomtown Athletics site · v0.22.1 · 2026-07-28_
