# Boomtown Athletics — Design System &amp; Decisions

**Last updated:** 2026-07-19
**Version:** 0.19.0
**Prompt version:** 2.0.0

## Source of truth
`design.md` is canonical for **design** decisions. The **GitHub repo** is canonical for **code**.
On context doubt: re-read this file, re-ground, then proceed.

## HTML Preview
- Local: `site/index.html`, `site/queens-club.html`
- Deployed (Cloudflare Pages): _TBD on first push_

## Brand tokens (derived from 2026 logos)
| Token | Hex | Use |
|---|---|---|
| `--ink` | `#0a0a0b` | Page surface |
| `--ink-2` | `#141417` | Raised panels |
| `--gold` | `#eec51d` | Boomtown gold (primary accent) |
| `--gold-2` | `#f6c733` | Hover / Queens Club gold |
| `--navy` | `#07085b` | Queens Club only |
| `--bone` | `#f4f2ec` | Body text on dark |

**Type:** Display = **Anton** (condensed, tournament-poster). Body = **Archivo**. Utility/data = **JetBrains Mono** ("scoreboard" times, eyebrows, buttons).
**Signature:** gold "serve-line" rules + mono scoreboard type for hours/times. Nocturnal gym tone (open 5–11PM).
**Logos:** `assets/img/boom-logo.png` (transparent, 2026 primary "BOOM"), `assets/img/qc-logo.png` (transparent Queens Club).

## Pages
Nav: **Home · Women's · Men's · Co-Ed · Training · Tournaments · Drop-In · Contact**. Partners = Home section. Queens Club hidden.

| Page | Status | Schema | Data |
|---|---|---|---|
| Home `/` | ✅ built | SportsActivityLocation | IG feed (KV) |
| Women's League `/womens-league` ⭐ | pending | FAQPage + Event | Sheet: Leagues |
| Men's League `/mens-league` | pending | FAQPage + Event | Sheet: Leagues |
| Co-Ed Leagues `/co-ed-leagues` | pending | FAQPage | MPS (featured) + Volo (rec) |
| Training `/training` | pending | FAQPage | static (adult + youth) |
| Tournaments `/tournaments` | pending | FAQPage + Event | Sheet: Tournaments |
| Drop-In `/drop-in` | pending | FAQPage | static |
| Contact `/contact` | pending | — | static |
| Queens Club `/queens-club` | ✅ built | none · `noindex` · robots-disallow · sitemap-excluded | → Women's League |

## Data layer (Google Sheet → published CSV per tab)
- **Leagues:** `title, division(womens|mens), format(2s|4s|6s|indoor), date, time, location, link, status`
- **Tournaments:** `title, date, location, link, status`
- **Partners:** `name, logo_url, website, tier(sport|league|gear|community)`
- Women's `2s`/`4s` rows may carry a Queens Club `link` (hidden until QC goes live).

## Partners (Home, tiered)
Sport/governing: USAV RMR, AVP · Leagues: Match Point Social, Volo · Gear: lululemon, Rhone, adidas · Community: Colorado Athletics Foundation, Aurora Public Schools, Special Olympics CO, Texas Roadhouse.
Removed (→ future FieldhouseUSA site): Meet.Play.Chill, Hoop Dream Nation, REAL Futsal, Zara Gymnastics, Rise Up.
_Logos: currently rendered as wordmark chips; official logo files to be dropped into `assets/img/partners/` or the Partners tab `logo_url`._

## Instagram (locked)
Behold free JSON → Cloudflare **Worker on Cron (every 12h)** → write to **KV** (+ R2 media re-host for the free >6-post workaround) → site reads `/api/ig`. Origin ≈ 60 hits/mo vs Behold's 1,200 free cap. Use Behold-hosted (`behold.pictures`) / R2 URLs, never raw IG CDN (expires). **v2 path documented separately** (Instagram API w/ Instagram Login, `instagram_business_basic`, 60-day token refresh, token in Worker Secrets).

## Hours (JSON-LD)
Mon–Fri 17:00–23:00 · Sat 19:00–23:00 · Sun 16:00–23:00.

## SEO
No Google Business Profile (deliberate — avoids reviews/griefing). Funnel = Instagram + word of mouth + competitive-intent search. `address` = Aurora; `areaServed` = Denver metro. Per page: unique title/meta/H1, OG, FAQPage; Event JSON-LD for leagues/tournaments from the Sheet.

## DATA LAYER (merged from design v0.14.0 — canonical here as of v0.15.0)

## 3. THE DATA LAYER (new — build this)

### 3.1 One spreadsheet, two tabs
Google Sheet ID currently in use: `11gSs2akMUBsRrR-80HPU8n7HJz5v-oT6HfGmsnFkn-w`
(the existing sheet is human-formatted and mixed; a cleaned two-tab version was produced this
session — see `Boomtown_Tournaments_Leagues_clean_v1_2026-06-28.xlsx`).

**Tab A — `Events`** (drives the tournaments/leagues/events board). Columns (header row exact,
lowercase):
```
type | start_date | end_date | title | time | location | registration_link | division | format | status | notes
```
- `type` ∈ `tournament` | `league` | `event`  ← the filter column
- `start_date`,`end_date` = **YYYY-MM-DD** (machine-readable; end blank for single-day)
- `status` ∈ `upcoming` | `past` | `open (rolling)` | `open (recurring)` | `date TBD`
- `division` (womens/mens/coed/junior/open), `format` (2s/4s/6s/doubles/grass/sand/short court/indoor)
- `registration_link` = full https URL (or blank; "Invitational" → leave blank, note it)

**Tab B — `Partners`** (logos, not dated events — deliberately separate):
```
name | tier | website | logo_url
```
- `tier` ∈ `sport` | `leagues` | `facility` | `community` | `gear`
  → rendered labels: Sport & governing · Co-Ed league partners · Facility partners · Community · Gear
- `logo_url` = hosted image (prefer `assets/img/partners/*` on the repo); blank → wordmark tile.

> Partners are a separate tab (not a `type` in Events) because they are not date-based and need a
> logo layout, not a schedule card. Both tabs live in the **same spreadsheet** and are surfaced by
> the **same filter bar**.

### 3.2 Publish to web (owner, one time)
Sheet → **File → Publish to the web → select the tab → Comma-separated values (.csv) → Publish.**
Do it for **Events** and **Partners**. Gives two CSV URLs the site fetches. (Verified current path,
2026.) Only publish these two tabs; keep anything private off them (published = publicly readable).

### 3.3 The widget (built this session — reference implementation)
File: `boomtown-events-widget_v2_2026-06-28.html` (self-contained; previews from built-in sample
data until the two URLs are pasted in). Behavior:

- **Filter bar:** `All · Tournaments · Leagues · Events · Partners` (segmented pills). `All` = all
  Events tab rows (date-sorted). `Partners` switches to tier-grouped logo tiles.
- **Auto-append:** renderer loops every CSV row → one tile per row. Add a row → a tile appears; no
  code change. Remove/finish a row → tile disappears.
- **Sorting:** Events sorted by `start_date` ascending (ISO strings sort chronologically). Undated
  rows collect under a "Dates to be announced" subhead at the bottom. Past events auto-hidden
  (`lastDate < today`), except league rows whose `status` contains `open` (always shown).
- **Register button:** rendered only when a valid `https` link exists; else "Invite only"
  (if status/notes say invitational) or "Details soon".
- **States:** loading skeleton; fetch failure → falls back to last-known/sample list with a quiet
  "updating, refresh shortly" note; empty → on-brand "Nothing on the calendar yet — check back soon."
- **Security:** all sheet text inserted via `textContent` (no `innerHTML` on data) → XSS-safe;
  links validated `^https?://` (blocks `javascript:`).
- **Motion (Emil):** custom `--ease-out: cubic-bezier(.23,1,.32,1)`; cards/tiles enter opacity
  0→1 + translateY(8→0) at 260ms, **staggered 40ms** via transitions (interruptible, not keyframes);
  buttons `:active { scale(.97) }`; hover gated behind `(hover:hover) and (pointer:fine)`;
  `prefers-reduced-motion` keeps the opacity fade, drops movement.
- **A11y:** real focusable `<a>` buttons with aria-labels; `aria-pressed` on filters;
  `aria-live="polite"` list region; gold/ink contrast AA.

### 3.4 Where it goes
Paste the `<style>`, the `.btw` section, and the `<script>` into the relevant page(s). Options:
(a) one combined "What's On" board (home or a `/schedule` page), or (b) drop the same block on
`tournaments.html` / league pages with the filter defaulted/limited to that type. Fonts already
load site-wide, so omit the font `<link>` when pasting.

---

## 4. Cutover checklist
1. Owner publishes Events + Partners tabs → sends two CSV URLs.
2. Paste URLs into `EVENTS_CSV_URL` / `PARTNERS_CSV_URL`.
3. Confirm live column headers match §3.1 exactly (lowercase).
4. Paste widget block into the target page(s); remove duplicate font links.
5. Verify: add a test row → appears after cache window (~a few min); bad/blank link → no button;
   past date → hidden; Partners tab → logo tiles by tier.
6. Commit once. Done — future edits are sheet-only.

## 5. Optional next builds
- **"Add an event" Google Form** → appends to the Events tab (friendliest entry incl. link field).
- **Per-page default filter** (e.g., tournaments page loads with `Tournaments` active).
- Migrate the cleaned xlsx into the live Google Sheet as the two canonical tabs.

## 6. Open flags (carried + new)
- Cache delay on published CSV is a few minutes (Google doesn't publish an exact TTL) — not instant.
- Some `location` values are "BTFH" vs "Boomtown Fieldhouse"; normalize in-sheet or in-render
  (widget already maps BTFH → "Boomtown Fieldhouse (Aurora)" in the cleaned data).
- Rows flagged for owner review in the cleaned file: "Boomtown Showdown 2026" dated 2025
  (title/year mismatch); two "Social Den" social events (keep on site?); date-TBD rows.
- Leagues with a past `start_date` but ongoing play: consider an explicit "active yes/no" instead of
  date-based past/upcoming.

## 7. If SEO Event rich-results become a priority later
Keep the exact same sheet. Add a scheduled GitHub Action that pulls the CSV and bakes rows +
`Event` JSON-LD into static HTML on a cron. This reintroduces a build step (which the owner
currently declined) but is the reliable path to indexed events. Design already supports it —
the sheet schema in §3.1 is sufficient to emit `Event` structured data.


## Change Log
- **0.19.0 (2026-07-19)** — Instagram feed wired live + mobile/SEO pass. **IG feed:** home grid now fetches the Behold feed (feeds.behold.so/JgI7koDkWULorgLXnzkz) client-side, rendering up to 9 posts from the Behold-hosted (hop.behold.pictures) square crops — stable URLs, never raw IG CDN. Loading skeleton while fetching; **graceful fallback** to the local static image set (+ quiet) on any fetch error or empty feed; video/Reel posts get a ▶ badge; captions from prunedCaption, alt text trimmed for a11y; width/height on tiles to avoid CLS; “Load more” pages 9 at a time then flips to “View all on Instagram.” **Architecture note:** direct client fetch chosen over the design.md §IG Worker→KV cache — matches the no-build philosophy and stays under Behold’s free 1,200-views/mo cap at current traffic; the Worker path remains the documented scale option (same feed URL drops in). **Mobile:** IG grid 3-col → 2-col under 560px; the two new nav dropdowns (Tournaments/Drop-In) inherit the existing static-submenu mobile pattern in the hamburger. **SEO:** skill-levels.html given BreadcrumbList JSON-LD (Home › Tournaments › Skill Levels) alongside its FAQPage; IG tiles are JS-injected (social proof, intentionally non-indexed) so no LCP/crawl impact. **Verify in browser:** live feed parse + QC shine mask.
- **0.18.0 (2026-07-19)** — Content + nav + gate pass. **Nav (site-wide, 11 pages):** Tournaments is now a dropdown (Live Schedule · Format &amp; Rules · Skill Levels); Drop-In is now a dropdown (Drop-In Nights · FAQ → drop-in.html#faq); Leagues→Women’s now routes to **queens-club.html** (the gate) instead of womens-league directly. **Tournaments Formats &amp; Rules populated** from the live facility rule sets (USAV 2025–27 base + Boomtown mods: Revco 4s women’s-net/men restrictions, Co-Ed &amp; Gendered 4s with per-division hand-set standards, Co-Ed/Gendered 6s no-girl-rule, 2s, and shared match/scoring). Rulebook links + Facility Rules chip moved to the **top** of the page (hero chips + section intro) rather than the bottom. USAV link updated 2023–25→2025–27 edition. **New page skill-levels.html** (canonical /skill-levels, in sitemap + footer): Open→Rec ladder + “how to choose” guide, owner-authored copy (mirrors the MPS partner Skill Levels page, grammar-corrected, org refs → Boomtown), FAQPage JSON-LD, unique title/meta/OG. Linked under the Tournaments dropdown. **Queens Club rebuilt** as the Women’s landing gate: pure-black elite treatment, all photos/carousel/bg removed, gold logo with an animated shine sweep (mask-clipped to the crest, reduced-motion gated), tap-crest → accessible code modal (focus-trap, ESC/backdrop close, any code passes) → womens-league.html#qualify; Exit ✗ button (top-right) → home. womens-league remains directly indexable/crawlable and in the sitemap — the gate only intercepts human nav clicks. **Women’s League:** second photo added to the Indoor program card to balance the previously hanging text (was only Grass carried an image). **Home:** removed the black seam between the mailing-list CTA band and the first cine (margin-block 12px→0 on .cine); tournaments cine focal point raised (object-position 50% 28%). **Molten:** existing baked-in gray/checkerboard keyed out, cropped to wordmark, 2× upscaled (stopgap in delivery; owner replacing with official asset).
- **0.18.0 (2026-07-19)** — Content + nav + gate session. **Nav (all 10 pages):** Tournaments and Drop-In converted to dropdowns — Tournaments ▾ (Live Schedule · Format & Rules · Skill Levels), Drop-In ▾ (Drop-In Nights · FAQ→drop-in.html#faq). Leagues ▾ trigger + "Women's" item now route to **queens-club.html** (the gate), not womens-league directly. **Tournaments Formats & Rules:** populated with real USAV 2025–27-based rule copy adapted from the facility rule set — Match/Scoring, Reverse Co-Ed 4s, Co-Ed & Gendered 4s (incl. hand-set standard by division), Co-Ed & Gendered 6s (no "girl rule"), Short-Court 2s. Rules links (USAV rulebook PDF, USAV interpretations, AVP, Boomtown facility rules) moved to the **top** of the section; Facility Rules chip added to the tournaments hero. **New page skill-levels.html** (canonical /skill-levels, in sitemap): Open/AA/A/BB/B/Rec ladder + "how to choose" — content copied verbatim from the Match Point Social skill-levels page per owner (owner-authored), grammar-corrected, org references reframed to Boomtown; FAQPage JSON-LD added; linked under Tournaments ▾. **Queens Club → Women's gate:** rebuilt black/elite — carousel + faded bg photo removed, pure #000, logo crest with animated gold shine sweep (mask-based, reduced-motion gated); code entry now a focus-trapped modal (any non-empty code passes) → womens-league.html#qualify; Exit ✕ button top-right → home. Women's nav path is now Women's → Queens Club → tap crest → (code) → womens-league. womens-league.html stays directly crawlable + in sitemap so search entry is unaffected. **Women's League:** second photo (womens-team-boom) added to the Indoor program card to balance the previously text-only left column. **Home:** black gap between mailing-list CTA band and first tournaments cine removed (main .cine margin-block 12px→0); tournaments cine focal point raised (object-position 50% 28%). **Molten:** existing molten.png cleaned (baked checkerboard/halo keyed out, cropped to wordmark, 2× upscaled) as a stopgap on the white tile; official asset to be dropped in by owner. **Fix:** missing </main> restored on 7 pages (tournaments, drop-in, training, womens-league, mens-league, co-ed-leagues, schedule) — pre-existing invalid markup. **Pending gates:** host (GH Pages vs Cloudflare Pages), www/apex + 301, Meta Pixel ID.
- **0.17.0 (2026-07-19)** — LIVE DATA WIRED. Owner published Events (gid 2097603747) + Partners (gid 454802271) CSVs; both URLs baked into schedule.html and the standalone widget file. Added gid-order auto-detect (if the Events feed arrives with `tier` instead of `type` columns, feeds swap automatically) — removes tab-order ambiguity since the CSVs could not be fetched for verification from the build sandbox (robots + egress allowlist). Widget still falls back to sample data + quiet note on fetch failure. Verification of live parse must happen in a browser (open schedule.html). Sheet file: Drive ID 1UFsYrtD1pf27f6D0m3O45oA3MUtfG2wiV9x1zyl-H4w (rebuilt 2026-07-19, 102 rows). Remaining gates: host decision, www/apex, Pixel ID, push to main, DNS.
- **0.16.0 (2026-07-19)** — What's On page shipped. New **schedule.html** (canonical /schedule, added to sitemap): tournaments.html shell + embedded widget v3 (anchored extraction; widget body rule stripped so host styles win; no font link). **Hash filters:** schedule.html#tournaments|#leagues|#events|#partners preselects the filter and syncs the buttons. **Link rewiring site-wide:** nav "Tournaments", home "View tournaments"/"Schedule →" and every tournaments.html#schedule CTA → schedule.html#tournaments. tournaments.html keeps Formats/Qualifier/Enter; stale hardcoded placeholder schedule table (fake Mar–May 2026 rows) + its dead JS removed → CTA to the live board. **All raw Google-Sheet links removed** from user-facing pages (v0.14.0 decision: never show the spreadsheet). **Perf fix:** v0.15.0 lazy pass had lazied 9 hero images — reverted to eager + fetchpriority="high" (LCP). CSV URLs pending — widget renders sample data until pasted into EVENTS_CSV_URL/PARTNERS_CSV_URL in schedule.html.
- **0.15.0 (2026-07-19)** — Audit + regeneration session. **SEO:** sitemap namespace typo fixed (sitemaps.org); lastmod added; all meta descriptions rewritten <=160 chars; og:image:width/height/alt on every indexable page; facility-rules given full OG + WebPage/BreadcrumbList JSON-LD; branded 404.html added; inactive Meta Pixel placeholder (YOUR_PIXEL_ID) on indexable pages. **Perf:** loading="lazy" + decoding="async" on below-the-fold images site-wide (nav logo + hero kept eager). **Widget v3:** JetBrains Mono removed entirely (site never loads it -> browser-default mono fallback caused the bad look); Anton for titles/day numeral, Archivo for all UI text. **Queens Club:** body::after gold radial wash removed; logo glow tightened to drop-shadow(0 3px 8px black) + drop-shadow(0 0 14px gold .16) — subtle rim, no bloom. **Data layer sections of v0.14.0 merged into this file (below); v0.14.0 doc retired.** **Verified:** Behold pricing (Starter $10/mo = 3 feeds/50 posts/hourly — covers both sites; free tier's 6-post cap is the real blocker for the 3x3 grid). **Pending gates:** host (GH Pages vs Cloudflare Pages) drives canonical strategy; CSV URLs; widget placement; Pixel ID; push to main.
- **0.13.0 (2026-06-21)** — Banner sizing, photo de-dup, video, QC, partner logos. **Banner (#1):** beneath-hero band switched from the large .sband to the slim .topbar sizing on all 9 pages (co-ed now matches siblings). **Photos (#2,#3):** co-ed MPS now a group photo (was a duplicate of the hero); women’s league swapped off the over-used team photo to a unique group shot; alignment object-position added. **Fieldhouse (#4):** facade re-cropped higher so the "Fieldhouse USA" sign is no longer clipped. **COBO (#5):** club block removed from home and embedded on the Training page (its rightful youth/club home); video processed with ffmpeg — Gemini watermark removed via delogo, downscaled 960x540, faststart, dark-bg poster, clean dark container (no white box). **Partner logos (#6):** USAV RMR reverted to the prior RMR mark on a white tile (no black bg); Team Evo recolored to black text; Molten white background removed (transparent PNG). **QC (#7):** added a faded women’s-group background, a 3-photo carousel, and a compact schedule table to fill dead space and add engagement. **CTA (#9):** gold mailing-list band added to the bottom of every sister page. **Mobile (#8):** reviewed — grids/breakpoints/stacking intact, video + QC additions responsive. **Limitation:** Texas Roadhouse / Town Center / Chance Sports / My Spark Denver still use runtime logo sources (clearbit) with text fallback — third-party logo files can’t be downloaded into the repo from the build sandbox; drop official PNGs into assets/img/partners/ to host locally.
- **0.12.0 (2026-06-21)** — Banner mirror + hero legibility. Removed the top gold banner on every page; the single band beneath each hero now carries the full "Denver, Colorado’s Official Volleyball Company · Sanctioned by USAV · AVP · AAU" copy (the redundant "OFFICIALLY SANCTIONED BY" band retired). Strengthened hero drop-shadow (h1/sub/eyebrow/p) site-wide so text reads cleanly over photos.
- **0.11.0 (2026-06-21)** — Dead-zone + motion pass. **Blank-area fixes:** replaced all in-body Wix-hosted content photos (co-ed x2, drop-in, training, womens) and the 9 Instagram thumbnails with local assets so nothing 404s when leaving Wix (these had no onerror fallback = hard blanks). **Animations (reduced-motion gated):** Fieldhouse spec numbers count up on scroll; hero serve-line draws in; partner tiles stagger-fade per tier on reveal; IG-card + spec hover states. **Audit:** section padding/grids/breakpoints reviewed — no margin or empty-container defects found; clearbit logos already degrade to wordmark text via onerror. JS syntax-validated.
- **0.10.0 (2026-06-21)** — Subpage + content pass. **Menu bug (#7):** dropdowns vanished crossing the 8px gap between trigger and panel — added an invisible hover-bridge (`.has-sub::after`) and snapped `.submenu` to `top:100%` on desktop; applied to all 9 pages. **About (#1,#10):** removed "player-run club" framing; rewrote from the original site copy (premier Denver-metro volleyball home at FieldhouseUSA); single photo → rotating carousel of group photos (closer crops, less dead space). **Drop-In (#2):** cine now uses a live-play action shot (dropin-play-wide) instead of the posed team. **Tournaments (#3):** spike crop shifted up (top-bias .30→.08) for more action/less floor. **Hero (#4):** subhead left-justified; drop-shadow added to hero h1/sub + cine headings across all pages for contrast. **Fieldhouse (#5):** background re-cropped to the building facade and overlay gradient cut ~50%. **Partners (#6,#11,#12):** reverted the serve-line background; Gear tier moved beneath Community; swapped to owner-supplied official logos (Molten/Volo/COBO on white tiles; USAV/adidas/Special Olympics CO on dark tiles for contrast); added Colorado Boom Volleyball Club video block denoted "Competitive Club Pathway · Our Partner" (autoplay/muted/loop, poster fallback). **Co-Ed (#9):** removed the top gold banner; moved its fuller copy ("Denver, Colorado’s Official Volleyball Company · Sanctioned by USAV·AVP·AAU") into the band beneath the hero. **SEO/mobile (#8, global):** menu/shadow fixes + contact JSON-LD added; OG already local from v0.9.0. **Removed:** low-res tournament-celebration.jpg. **Flags:** USAV tile uses the national USA Volleyball mark on the "USAV RMR" label; Real Colorado logo saved as asset but not placed (was a deliberately-removed partner).
- **0.9.0 (2026-06-21)** — Home image/SEO pass. **Cine fix (#1,#3):** Tournaments + Drop-In cinematic blocks were using near-square images (spike.jpg 819x868, team.jpg) under object-fit:cover → heavy zoom/crop; replaced with purpose-built 16:9 crops (tournaments-spike-wide, dropin-team-wide) and lowered .cine min-height to clamp(400,54vh,520). **CTAs (#2):** Tournaments cine now "Register now" → tournaments.html#schedule and "Formats" → #formats (was "See the schedule"/"How to enter#enter"). **About (#3):** swapped side-cropped banner for womens-team-boom.jpg (native 4:3, no one cropped). **Fieldhouse (#4,#5):** carousel rebuilt from real venue interior shots (court/lounge/bar) + one action frame, centered; section gets faded exterior-front photo as background (.fh-bg opacity .16 + heavy dark/gold gradient, text remains AA-contrast). **Partners (#6):** flat #121214 → #0e0e10 with gold radial glow + diagonal "serve-line" repeating stripes + tile gradient/gold hover ring (3 alt ideas documented for owner). **Assets (#7):** owner uploads renamed kebab-case into assets/img/venue + community/action; EXIF ImageDescription/Artist/Copyright embedded across 28 JPGs; ASSET-MANIFEST.md added. **SEO/mobile (#8):** added SportsActivityLocation JSON-LD to Home (was missing despite prior claim); repointed og:image from wixstatic → local og-cover.jpg (1200x630) on all 8 indexable pages; added twitter:image, og:url/type, theme-color; width/height on hero/cine imgs to cut CLS; mobile cine/carousel ratios. **Flag:** JSON-LD geo lat/long is approximate — verify. design.md previously claimed Home shipped SportsActivityLocation; it did not until now.
- **0.8.0 (2026-06-21)** — Logo/hero/photo refinement. **Tab icon (#1):** favicon + apple-touch regenerated from the hi-res 2026 master (`Boom_Logo_2026.jpg`); spiker isolated to gold only (no grey 'M' ghost), aspect-preserved square so it no longer looks smooshed; nav/hero/footer logo upgraded to the 1053px clean master. **Hero edge-to-edge (#3):** collage re-cropped to remove the bottom white band (2000x1120); home hero now uses a matched `aspect-ratio:2000/1120` (min 360 / max 720px) so `object-fit:cover` shows the whole grid edge-to-edge without zoom-crop on typical screens; bg opacity raised .55->.62 so the grid reads. **Photos (#2):** 9 new shots downscaled (1800w) into assets/img/action (grass-women, coed-four, youth-camp) and assets/img/community (group-court/home/net/banner1/banner2, four-banner); About photo -> community BOOMTOWN-banner group shot; Fieldhouse carousel now mixes play + community-in-venue frames; women's Grass card gets the outdoor grass-women photo. **Aligned heroes (#5):** Co-Ed -> co-ed doubles foursome; Contact -> community banner group. **Women's registry (#4):** CTAs relabeled to "Player registration" / "Create your player profile", pointed at the current women's form (forms.gle/1sfPSZhbVEifFrct6) — swap this URL for the new Google Form when the player-profile registry is built. **Note:** on ultra-wide/very-narrow screens the fixed-ratio hero still crops a little (min/max-height caps); a fixed-ratio image can't be full-width AND fully uncropped at every width.
- **0.7.0 (2026-06-21)** — 17-item review pass. **Global:** sanctioned band ("OFFICIALLY SANCTIONED BY · USAV · AVP · AAU") now on every page beneath the hero; favicon wired to gold spiker mark (was still boom-sm); nav/hero/footer logo swapped to clean transparent `boom-logo.png` (black bg + halo removed); nav reordered to Tournaments · Drop-In · Training▾(Adult/Youth) · Leagues▾ · Store · Contact, added Team Store (boomtownathletics.square.site) + Training dropdown; back-to-top button site-wide; motion system propagated to all sub-pages; descriptive alt on all hero/photo images. **Home:** hero now full action-collage matrix (only white bottom trimmed) centered (less zoom); cinematic Tournaments/Drop-In given vertical breathing room + taller; About photo → real team photo; FieldhouseUSA single image → animated crossfade carousel of interior action shots. **Sub-pages:** action-photo heroes throughout (8 new 24MP shots downscaled); Women's qualifying fully rewritten (pre-season Aug–Oct half-price qualifier, 4s AA Wed / A&BB Tue qualify, Sunday A/BB rotating pairs no-qual, 3-season commitment Oct–April, August mixers, Boomtown Showdown bid) + FAQ/JSON-LD updated; Drop-In House Rules block added (KotC men's-height court, 2-on/2-off, women's net nightly, replay protests, games to 25, stamping/entry, ball-theft ban, bag search, no outside food, under-14 w/ parent, spectators pay); Training hero shares Co-Ed photo + #adult/#youth anchors; Queens Club gets a photo beside the gate, Enter de-looped to women's #qualify, and a schedule line (7:15–9:15 PM · 6 games/night · no late games). **Flag:** hero uses object-fit:cover+center; switch to contain for the entire matrix (black-blended bars) on request.
- **0.6.0 (2026-06-20)** — Home + global pass. **Fixed deploy-blocking bug:** all internal links/assets converted from root-absolute to **relative** paths across all 10 pages (pages now load on the project sub-path / locally; was 404ing every nav + image). Favicon added site-wide = gold spiker mark (cut from 2026 BOOM logo, bg removed); `boom-logo.png` transparent canonical asset added. Home hero bg → new cropped action collage (bottom row removed, top-anchored). Cinematic Tournaments: removed eyebrow + "One-day brackets" + "USAV·AVP·AAU sanctioned"; now **No Membership Fees to Play · More Games, Better Prizes** (gold/white). Cinematic Drop-In: 1-line title, subhead **New? Come Play!**, hours moved to white body line; pills → $10 +fees · Ages 14+ · All levels welcomed. `spike.jpg` reframed to drop the "Colorado Boom" overlay box. Sanctioned band → **OFFICIALLY SANCTIONED BY**. Partner logos hosted locally (lululemon, Shoot360, Team Evo, Nuggets, CAF[dark tile]); added Community: Chance Sports, My Spark Denver, Denver Nuggets. **Motion system (emil-reviewed):** custom ease curves, hero stagger-rise, scroll-reveal (IntersectionObserver, opt-in so reduced-motion/no-JS = full content), button :active press, CTA shine sweep; all gated by prefers-reduced-motion + hover media queries.
- **0.4.0 (2026-06-20)** — Nav: Leagues dropdown (Women's/Men's/Co-Ed), removed Play-tonight button, Training label. Home: shiny gold-gradient CTA (black/white text), tournaments "Denver Metro's" + spike photo + no "open divisions", drop-in listed as text (no pills), "Want to play everyday?" subhead, card headers-over-subheaders with glowing differentiated gold, fuller mission + About anchor + team photo, "Follow us @boomtownvb / don't miss out", partners intro reworded + logos with names + centered + Home-venue tier removed, new Boomtown FieldhouseUSA section, mailing copy = monthly events (no "alerts"), city SEO. New /facility-rules page (summarized from BT events page). Tournaments → "Volleyball Tournaments" H1, anchor chips, Formats & Rules (Revco 4s, gendered 6s, 4s, short-court doubles) + USAV/AVP links, USAV Qualifier section. Women's: Indoor/Grass programs + indoor qualifying. SEO refreshed across pages.
- **0.3.0 (2026-06-20)** — Top banner ("Official Volleyball Company · Sanctioned by USAV·AVP·AAU"); hero motto "Play Everyday" (Everyday white) + official-company subhead; subheads moved under titles, white/bold, site-wide. Partners only on Home with new tiers (added AAU, Co-Ed League Partners label, expanded Gear, Facility partners, Town Center community, Boomtown FieldhouseUSA). Tournaments page: traditional venue block, Sanctioned-by strip only, Day column added, Island/sand removed. Drop-In FAQ imported from BT facility FAQ. Training renamed "Volleyball Training", sand removed, Colorado Boom club section (placeholder). Contact: Lost&Found first. IG now 3×3 + Load more. Queens Club: shine-gradient gold logo, centered stacked code gate, embossed "Boomtown Athletics", links to queensclubvb.com→womens-league. Hero images on every page (~20% black gradient).
- **0.2.0 (2026-06-20)** — Full multi-page demo: all 7 nav pages built (Tournaments, Drop-In, Women's, Men's, Co-Ed, Training, Contact) + Home + Queens Club. Simplified to two fonts (Anton/Archivo); palette locked to yellow titles / gold details / white body, no gray, no mono. Real copy + photos pulled from boomtownvb.com; drop-in (Thu–Mon, 7–11PM, $10+fees) featured site-wide; Tournaments prioritized first. Partner wall with logos incl. Boomtown FieldhouseUSA. IG scroller. Facility hours removed (vary by programming).
- **0.1.0 (2026-06-20)** — Initialized. Brand tokens from 2026 BOOM + Queens Club logos; theme.css; Home page; Queens Club QR landing; IG feed component (placeholder); robots/sitemap with QC excluded. Remaining pages, Sheet wiring, IG Worker deploy, and official partner logos pending.
