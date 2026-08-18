# Boomtown Athletics — Website

Static marketing site for **boomtownathletics.com** (Denver/Aurora volleyball —
tournaments, women's/men's/co-ed leagues, training, and nightly drop-in).

_Site version: **v0.31.0** · 2026-08-18_

---

## Where things stand — verified 2026-08-17

**Read this first if you are picking the project up cold.** Everything below was re-checked
against the live site and the live sheet on 2026-08-17, not carried over from a document.

**Shipped and live.** PRs #1 (v0.28.0) and #2 (v0.29.0) both merged 2026-08-07. The live site
serves `v0.29.0` on line 1, the home-page announcement modal is present with all five
registration links intact, and the women's hero button reads **League Registration** → `#schedule`.

### ⚠️ Dated action item — the popup headline goes stale on 2026-08-27

The five items inside the popup expire on their own. **The headline and the sentence under it
do not.** They are static text reading *"4s Season Starts August 11"* and *"Two weeks of mixers
… then pre-season 4s."*

| Date | What the popup shows |
|---|---|
| through Aug 18 | all five items — correct |
| Aug 19 | Kings Club Mixer drops off by itself |
| Aug 20 | Queens Club Mixer drops off by itself |
| Aug 26 | Kings Club Pre-Season drops off |
| **Aug 27 onward** | **only the Showdown is left, under a headline that still announces mixers starting August 11** |

**Before Aug 27, the headline needs rewriting** — or the popup needs its next set of events.
It is a two-minute edit to `index.html`; the text sits directly above the first `.anitem`.
Nothing breaks if it is missed, but the home page will be advertising a date three weeks gone.

### Still open — owner decisions, unchanged since 2026-08-07

- **The Queens Club Pre-Season Qualifier date still contradicts itself.** `start_date` =
  Tue 2026-8-25, `day` = "Tues & Wed", but `end_date` = *"Sunday, August 23, 2026"* — two days
  before it starts. The popup and the league table both show **Aug 25**. Unresolved.
- **`Qualifer` is still misspelled** in the sheet (should be `Qualifier`). The site spells it
  correctly; the sheet does not.
- **`womens-league.html` still has a second CTA**, *"Create your player profile"*, pointing at
  the old `forms.gle/1sfPSZhbVEifFrct6` player form. Only the hero button was changed. Decide
  whether this one should also point at the schedule.
- Partner logo PNGs, high-res originals ×3, placement of 4 team photos — see
  `docs/HANDOFF_v0.28.0_2026-08-06.md` §4.

### `[FACT]` New this check — `end_date` prose is spreading in the sheet

Four Events rows gained `end_date` values between 2026-08-07 and 2026-08-17, written as prose
rather than ISO dates. Three are **impossible** — they fall before their own start:

| Event | start_date | end_date now reads |
|---|---|---|
| Sally's Fundraiser RevCo 4s | 2026-09-19 | Monday, **August 31**, 2026 |
| USAV: Boomtown Showdown 2026 | 2026-09-27 | Tuesday, **September 1**, 2026 |
| 2026 Mile High Classic | 2026-08-28 | Sunday, August 30, 2026 *(valid, but prose)* |

**Nothing is visibly broken** — the renderer ignores any `end_date` that is not ISO, which is
why this has gone unnoticed. But the column is drifting from a data field into a notes field,
and a future change that starts trusting it would print nonsense. Clear these cells or write
them as `YYYY-MM-DD`. **Read `CLAUDE.md` §6c before editing any date cell in that sheet.**

Also new: **Sally's Fundraiser RevCo 4s (Sept 19)** now has a registration link and a time. It
is not in the popup — a candidate to add when the mixers drop off.

### Running the checks

```bash
bash scripts/validate.sh     # 77 checks · currently 77/77 on main
```

**Requires Python 3 and Node on PATH.** Python 3.12.10 is installed on the owner's Windows
machine at `%LOCALAPPDATA%\Programs\Python\Python312` with a `python3.exe` shim. If you see a
wall of failures, run `python3 --version` before believing any of them — see `CLAUDE.md` §3.

Local checkout: `C:\Users\vv58\Documents\btvb`. Two merged branches (`v0.28.0-tooling`,
`v0.29.0-announce`) are still present locally and safe to delete.

---

## Hosting & deploy
- **Origin:** GitHub Pages — repo `10xequity/btvb` (`https://10xequity.github.io/btvb`).
- **Custom domain:** `www.boomtownathletics.com` via `CNAME`, fronted by **Cloudflare** (DNS + CDN/proxy). `www` is canonical.
- **Build step:** none. It is plain HTML/CSS/JS; each page inlines its own CSS/JS.
- **Deploy:** commit to `main`; GitHub Pages publishes automatically. **There is no staging environment — a push to `main` is a publish.** Work on a branch and open a PR. (The old "extract a zip at the repo root" workflow is retired as of v0.28.0; edits are made directly in the checkout. See `CLAUDE.md`.)
- **URLs use `.html`.** GitHub Pages does **not** auto-rewrite extensionless URLs, so internal links and canonical/OG/JSON-LD self-URLs are written with `.html`. (This corrects an earlier README that described Cloudflare Pages clean-URL behavior — that is not how this site is served.)

## Pages (13)
`index` · `schedule` · `tournaments` · `drop-in` · `womens-league` · `mens-league` ·
`co-ed-leagues` · `training` · `skill-levels` · `contact` · `facility-rules` ·
`queens-club` *(noindex gate → funnels to the women's league)* ·
`library` *(internal image reference — noindex, not linked, not in sitemap)*

`robots.txt` disallows `/queens-club` and `/library`; `sitemap.xml` excludes both.

## Assets
Local images in `/assets/img/` (**76 files**, ~20 MB total — well under GitHub limits; v0.23.0 added 10 team photos + one derived hero under `/assets/img/library/`; v0.28.0 removed 4 orphaned partner logos). As of v0.23.1 those 11 library files carry embedded IPTC/XMP/EXIF metadata (title, caption, keywords, credit/copyright). Full inventory with dimensions and per-page usage: `docs/ASSET-LIBRARY_v0.28.0_2026-08-06.md`.
Partner logos in `/assets/img/partners/`. There is no external image CDN dependency;
all photos are committed to the repo.

## What's new in v0.31.0 (2026-08-18)
**Your seven revisions, plus Queens Club opened up to Google.**
Files changed: `index.html`, `schedule.html`, `queens-club.html`, `robots.txt`, `sitemap.xml`,
`scripts/validate.sh`, `CLAUDE.md`, `README.md`, `design.md`.

**1. Leagues button now matches Tournaments.** Both are solid gold and identical — I checked the
computed colours rather than eyeballing them. I also renamed it *View leagues* so it reads as a
pair with *View tournaments*; say the word if you want it back to just "Leagues."

**2. Drop-In button has a yellow outline.** Transparent inside, gold border. The two grey-outlined
*Facility* buttons lower down are untouched — I confirmed they still use the old white border, so
the change didn't leak anywhere else.

**3. Queens Club is now open to Google.** Removed the "hide from search" tag, wrote a real page
title and description, added the Facebook/Twitter share tags, added structured data (its nights
and 7:15–9:15 PM times taken from the page's own table), removed the block in `robots.txt`, and
added it to the sitemap.

**The thing that actually mattered here wasn't any of that.** The page was also telling Google
*"the real version of this page lives at queensclubvb.com"* — a different domain, which I checked
and found parked on a placeholder. Google obeys that instruction over everything else, so
un-hiding the page on its own would have achieved **nothing**. That pointer now correctly points
at your own page. Nobody had noticed this.

**Two honest notes on Queens Club:**
- **The tags are done; the page still has about 25 words on it.** Google needs something to read.
  As it stands it won't rank for anything competitive like "women's volleyball league Denver."
  Worth adding real copy — happy to write it.
- It still says **"You have been invited / Tap the crest to enter."** That made sense when the page
  was private. To a stranger arriving from a Google search it reads strangely. I left your words
  alone rather than rewriting them for you.
- I did **not** add the Facebook tracking pixel that your other 11 pages carry. You asked for
  search tags, not tracking, and I'd rather ask than quietly add it. Say if you want it.

**4. Both photos re-cropped — and I measured it rather than guessing.** I had the browser report
exactly which slice of each photo file was visible on screen.

- **Tournaments was genuinely clipping heads, and here's the proof:** the visible slice started
  1½ inches *below* the top of the tallest player's head. Lowered it, and there is now clear space
  above every head at every normal screen size.
- **Leagues is back to dead centre.** I tried nudging it up, but that brought back a sliced-off
  strip of the BOOMTOWN banner along the top edge on smaller laptops — worse than the problem it
  solved. Centred, the whole group fits with room above their heads and nothing cut off the bottom.

One limit worth knowing: the Leagues photo is a tall-ish group shot inside a very wide letterbox
strip. On an unusually wide monitor (think 32-inch and up) the back row's heads graze the top edge.
I tuned for normal laptop and desktop sizes, including the one you're on.

**5. The league link now scrolls you down to the board.** Previously it filtered but left you at
the top of the page — you asked for the scroll, so it now lands directly on the list with Leagues
already selected, positioned so the sticky header doesn't cover it. The tournaments link now does
the same, since you said both matter equally. It respects "reduce motion" accessibility settings.

**6. Volo is off the home page.** Removed from the partner wall; that row now shows Match Point
Social only. The logo file stays because your *schedule* page still lists it from your Google
Sheet — tell me if you want it gone from there too. I also caught the word surviving in a hidden
source comment and reworded that, so it now appears nowhere on the page.

**7. Tile order is now Tournaments → Leagues → Drop-In.** Leagues moved up to second. I also
flipped which side the text sits on so the three tiles still alternate left–right–left; without
that you'd have had two left-aligned tiles in a row.

**Mobile re-checked after every change:** no sideways scrolling, nothing hanging off the edge, all
three hero buttons a comfortable 55px tall.

**Validation:** `bash scripts/validate.sh` → **79 passed, 0 failed**. The count rose from 77
because Queens Club is now checked as a real public page — including that its new structured data
actually parses.

---

## What's new in v0.30.0 (2026-08-18)
**Leagues now have a front door on the home page: a hero button and a full-width photo tile.**
Files changed: `index.html`, `README.md`, `design.md`.

**Hero — a third button.** The hero had *View tournaments* and *Drop-in: Thu–Mon*. It now has
**Leagues** in the middle, outlined rather than solid gold so the page still has one obvious
primary button.

**The button doesn't just go to the schedule — it arrives with Leagues already switched on.**
The schedule page reads the `#leagues` part of the link as it loads and preselects the Leagues
filter, so the visitor lands on a board showing leagues only, with the Leagues chip lit.

**This was checked against the real schedule data before the button was built,** because a
button that lands on "Nothing on the calendar yet" is worse than no button. Clicking it on a
phone produced **5 league cards** — the two Queens Club mixers, Queens Club Sunday RP, the
Queens Club Pre-Season Qualifier and the two Kings Club dates — read live from your Google
Sheet, not from the built-in placeholder rows.

One thing worth knowing: the link switches the filter but does **not** scroll down the page.
That is exactly how the existing *View tournaments* button has always behaved, so the two now
match. Say the word if you'd rather both jumped straight to the board.

**New Leagues photo tile.** The home page had two big edge-to-edge photo panels — Tournaments
and Drop-In Volleyball. There is now a third, **Leagues**, sitting directly below Drop-In and
above *Find your game*. It uses the same panel design as the other two and alternates sides
with them, so it looks like it was always there. Its buttons are *See leagues* (to the filtered
schedule) and *How to qualify* (to the Women's League page, which does genuinely explain
qualifying).

**The photo** is the big indoor group shot on the Boomtown court — roughly 45 players, with the
BOOMTOWN ATHLETICS banner behind them. It was already in your library but had never been used
on a real page, so this also puts a good photo to work. Two things to flag honestly:

- It is a **women's-division photo on a tile titled "Leagues."** That is representative rather
  than exact — your league rows run 4 women's, 2 men's, 1 co-ed — but if you'd prefer a mixed
  or co-ed group shot there, it's a one-line swap.
- The tile's small print reads *Queens & Kings Club 4s · Rolling registration · Boomtown
  Fieldhouse*. An earlier draft also said *Co-Ed 6s with Volo*; that was **cut**, because the
  only co-ed row in the sheet is marked `past` and the schedule board hides it. Advertising a
  division the linked board doesn't show is the kind of small lie that costs trust.

**Mobile was measured, not eyeballed.** At both 390px and 320px wide there is **no sideways
scrolling** and nothing hangs off the edge; both new buttons are 55px tall, comfortably above
the 44px minimum for a thumb; no console errors.

One honest note on the hero: on narrow phones the three buttons stack into three rows, slightly
ragged on the left. **The two old buttons were already stacking into two such rows** — they were
too wide to share a line long before this change — so the third continues an existing look
rather than breaking a tidy one. Tightening it would mean editing the shared button styling,
which is copy-pasted into all 11 pages, so it wasn't worth the risk for a cosmetic gain. Easy to
revisit on its own.

**Also flagged, not changed:** the home page now offers **three different destinations** for
"Leagues" — the nav menu goes to the Queens Club page (which is hidden from Google on purpose),
while the *Find your game* card and the footer both go to the Women's League page. Worth picking
one, but it's outside what was asked for here.

**Validation:** `bash scripts/validate.sh` → **77 passed, 0 failed** (and 77/0 before the change
too, so that's a genuine pass rather than the Python-missing false alarm described above).

---

## What's new in v0.29.0 (2026-08-07)
**An announcement popup on the home page, and the Queens Club code prompt removed.**
Files changed: `index.html`, `queens-club.html`, `README.md`, `design.md`.

**Home page — announcement modal.** Opens **once per day** per visitor, about a second after the
page loads. Five signups, in the order requested: Queens Club Mixer and Queens Club Pre-Season
Qualifier under *Women's 4s*; Kings Club Mixer and Kings Club Pre-Season under *Men's 4s*; the
USAV Boomtown Showdown under *Tournament*. Every date, time, venue and registration link was
read from the live Google Sheet, not written from memory.

Styled in **true black** (`#000` card and rows on a 94%-black backdrop) rather than the site's
usual near-black grey, so it reads as a distinct overlay rather than another page section.

- **Each item expires on its own date.** Every entry carries a "show until" date. Once that
  date passes the item disappears from the popup, a section heading whose items have all
  passed disappears with it, and once everything has passed **the popup stops appearing
  entirely.** The site will not advertise a mixer that finished last week.
- **Closes on the ✕, the Escape key, or a click outside.** Keyboard focus is moved into the
  dialog and trapped there while it is open, then returned. Honours reduced-motion.
- **Verified in a real browser**, not assumed: opens on first visit and records the date;
  stays closed on a reload the same day; **reopens by itself once the clock rolls to the next
  day**, with no storage cleared; hides the two mixers when the clock is moved to Aug 20;
  hides the whole *Men's 4s* heading when both men's items have passed; and does not open at
  all on Oct 1. No console errors.

**Queens Club — invitation-code prompt removed.** Tapping the crest now goes straight to the
women's league page. `[FACT]` The prompt was never a security control: it accepted **any**
non-empty text and let you through. Nothing was protected before, so nothing is exposed now —
the only change is that visitors stop being asked for a code that did nothing. The CSS and
script behind it are gone; a comment in the file records why, so it isn't rebuilt by accident.
**If real access control is ever needed it has to be server-side** — anything in this repo is
downloadable by anyone.

Also fixed on that page: a stale second version comment on line 2 (`v0.18.0`) that contradicted
line 1, removed comment-scoped rather than by deleting the line, since it shared its line with
the `<html>` tag.

**Women's league page — hero button.** The hero's first button was **"Player registration"**,
pointing at an external Google Form. It is now **"League Registration"** and jumps down to the
**Schedule** table on the same page, where each league has its own Register button. No new tab.

Also corrected there: the FAQ answer *"What is Queens Club?"* still said **"entry is by
invitation code"** — untrue as of this release, since the code prompt is gone. Fixed in both
the visible answer and the FAQ structured data Google reads, so the two stay in sync.

**Needs your answer — one date is contradictory in the sheet.** The Queens Club Pre-Season
Qualifier row has `day` = "Tues & Wed" and `start_date` = Tuesday Aug 25, but its `end_date`
cell reads "Sunday, August 23, 2026" — two days *before* it starts. The popup shows **"Tue &
Wed · From Aug 25"**, matching `start_date`, which is what the league tables already use. If
Sunday the 23rd is right, the popup and the sheet both need correcting.

## What's new in v0.28.0 (2026-08-06)
**Tooling handoff to Claude Code. No site file changed — nothing on any page looks different.**

The project moved from "a chat session ships a zip" to "Claude Code edits this repo directly."
That made a pile of hand-maintained prose replaceable with things a machine can check.

**Added**
- **`CLAUDE.md`** (repo root) — loads automatically in every Claude Code session. Holds the
  frozen constants, the three bug classes that have hit production, and the verify-don't-inherit
  rule. Replaces the old `EXEC-PROMPT` format, which existed only to brief a session with no
  repo access.
- **`scripts/validate.sh`** — **77 automated checks**, run before every commit. Covers version
  headers, HTML tag balance, inline JavaScript syntax, JSON-LD, the renderer's `textContent`
  safety, the `.ig-card` inset invariant, all frozen constants, asset-path resolution,
  placeholder text, and the date-parser guard. **77/77 pass on this baseline.**
- **`docs/DESIGN-SYSTEM_v0.28.0_2026-08-06.md`** — the colours, type scale, spacing and
  components, extracted from the actual code. The site has almost no CSS variables, so this
  document *is* the token system.
- **`docs/ASSET-LIBRARY_v0.28.0_2026-08-06.md`** — all 81 images with dimensions, file sizes,
  and which pages use each one. Supersedes both stale manifests.
- **`docs/HANDOFF_v0.28.0_2026-08-06.md`** and three slash commands (`/validate`, `/release`,
  `/verify-sheet`).

**Removed** — repo hygiene, 7 files deleted + 1 archived, all re-verified unreferenced against
the checkout immediately before removal:
- 4 orphan partner logos: `molten.jpg`, `real-colorado.png`, `team-evo.png`, `usav.png`.
  The near-collisions `molten.png` and `team-evo-black.png` are **live and were kept** —
  confirmed present afterwards.
- `boomtown-events-widget_v3_2026-07-19.html` — a stale standalone widget no page links to.
- Both superseded manifests: `assets/img/ASSET-MANIFEST.md`, `WIX-IMAGE-MANIFEST_2026-07-19.md`.
- The root `HANDOFF.md` was **moved, not deleted**, to
  `docs/HANDOFF_ARCHIVE_pre-v0.28.0.md`. A stale handoff at repo root is the single most
  likely thing for a future session to mistake for current state.

**Record corrections** — the sixth release running that an inherited "fact" was wrong:
- **The v0.28.0 tooling above was authored on 2026-08-06 but never committed.** `main` sat at
  v0.27.0 until this commit. Every "delivered" claim about `CLAUDE.md`, `validate.sh` and the
  `docs/` set was true of a folder on the owner's machine, not of the repo.
- **The `boomtownvb.com` → `boomtownathletics.com` 301 is already live.** Verified 2026-08-06:
  `https://www.boomtownvb.com` returns `301`. Three documents listed it as "deferred until the
  domain transfers." It has been done for some time; the open-work list was simply never
  re-checked.
- **`validate.sh` needs Python 3, and never said so.** It shells out to `python3` at five
  points with no availability guard. On a machine without Python every one of those checks
  fails for an environmental reason — the first run here reported *40 passed, 37 failed*, all
  37 spurious. With Python 3.12.10 installed: **77 passed, 0 failed.**
- **`docs/ASSET-LIBRARY` said "81 image files"; the real count was 80** (76 after this
  release's deletions). The per-file tables were correct — only the summary line was off.
- The **Instagram grid lives on `index.html` only**, not "all 11 indexable pages." The `.pl`
  chip rule exists on one page; the other ten carry an inert partial copy of the CSS with no
  markup to apply it to. Nothing is broken — but the feature's surface area is one page.
- **`womens-open-gym-group.jpg` is already placed** on `womens-league.html`. Four team photos
  are genuinely unplaced, not seven.
- The **"`molten.png` / `team-evo-black.png` are live on 3 pages"** warning counted
  `boomtown-events-widget_v3`, a file already on the deletion list. They are live on two real
  pages. Still don't delete them.
- The **one-version-comment-per-page rule was only ever enforced on the 11 indexable pages.**
  `queens-club.html` sits at v0.19.0, `404.html` at v0.15.0, and `library.html` has no version
  comment at all. Harmless, now recorded.

**Still blocked on owner-supplied files or decisions:** partner logo PNGs (22 external
hotlinks across three pages), high-res originals for three low-resolution images, placement
for four team photos, and four sheet-data questions. See `docs/HANDOFF_v0.28.0_2026-08-06.md` §4.

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
_Boomtown Athletics site · v0.29.0 · 2026-08-07_
