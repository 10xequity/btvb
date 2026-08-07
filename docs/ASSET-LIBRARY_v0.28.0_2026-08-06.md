# Boomtown Athletics — Asset Library

**Version** v0.28.0 · **Created** 2026-08-06 · **Updated** 2026-08-06 · **Status** Active
**Supersedes** `assets/img/ASSET-MANIFEST.md` and `WIX-IMAGE-MANIFEST_2026-07-19.md` — both
**deleted in v0.28.0**. **Source** generated from `main` at v0.27.0 — every dimension
and usage row was read off the actual files.

76 image files + 1 video, ~20 MB, all committed under `assets/`. There is no image CDN for
photos. The 11 v0.23.x library photos carry embedded IPTC/XMP/EXIF metadata.

`[FACT]` **This header read "81 image files" as delivered.** Measured against the checkout,
the inventory was **80** before v0.28.0 removed the four partner orphans. The tables below
were correct; the count above them was not.

---

## 1. Read this before deleting anything

`library.html` is an internal, noindex, unlinked reference page that displays **every** photo.
So *"is this image used?"* has two different answers:

- **Used on a real page** — appears on something a visitor can reach.
- **library-only** (🗂) — the only reference is `library.html`. It is a candidate for placement
  or deletion, **but deleting it will break `library.html`.** Remove both, or neither.
- **orphan** (⚠️) — referenced by *nothing at all*, including `library.html`. Safe to delete.

A bare `grep -c` over `*.html` gives a misleading count because `library.html` inflates it.
Use the table below. (The other inflater, `boomtown-events-widget_v3_2026-07-19.html`, was
deleted in v0.28.0, so the usage columns below no longer list it.)

**Correction, v0.28.0.** Prior docs said `molten.png` and `team-evo-black.png` were "live on
3 pages each — do not delete." `[FACT]` They are live on **two** real pages (`index`,
`schedule`); the third hit was `boomtown-events-widget_v3_2026-07-19.html`, deleted in
v0.28.0. The advice stands — don't delete them — but the number was wrong.

**Correction, v0.28.0.** Prior docs listed `womens-open-gym-group.jpg` among the unplaced
library photos. `[FACT]` It is placed, on `womens-league.html`.

---

## 2. Naming convention

`<subject>-<context>-<qualifier>.jpg`, all lowercase, hyphens only. Grouped by folder:

| Folder | Contents |
|---|---|
| `assets/img/` | Site chrome — logo, favicons, OG cover, hero collage |
| `assets/img/action/` | On-court action shots |
| `assets/img/community/` | Group and banner photography |
| `assets/img/venue/` | FieldhouseUSA interiors and exterior |
| `assets/img/partners/` | Partner logos (light backgrounds — `.pbox` is white) |
| `assets/img/library/` | The v0.23.x owner media drop; mostly unplaced |
| `assets/video/` | One video asset |

Keep the convention. A new action shot goes in `action/`, not the root.

---

## 3. Full inventory

Legend: ⚠️ **orphan** = referenced nowhere · 🗂 library-only = only `library.html` ·
⚠️ low-res = longest edge under 900px · `_(+library)_` = also shown on the library page.
"Used on" excludes `library.html` and the stale widget file.

### assets/img

| File | Dimensions | Size | Used on |
|---|---|---|---|
| `about-team.jpg` | 1400×935 | 187 KB | — _(+library)_ 🗂 library-only |

### assets/img/action

| File | Dimensions | Size | Used on |
|---|---|---|---|
| `action-block1.jpg` | 1800×1202 | 193 KB | facility-rules, index _(+library)_ |
| `action-block2.jpg` | 1800×1202 | 201 KB | drop-in, index _(+library)_ |
| `action-hit1.jpg` | 1800×1202 | 255 KB | drop-in, index _(+library)_ |
| `action-hit2.jpg` | 1800×1202 | 267 KB | index, mens-league _(+library)_ |
| `action-podium.jpg` | 843×1123 | 141 KB | — _(+library)_ 🗂 library-only |
| `action-set.jpg` | 1800×1202 | 244 KB | index _(+library)_ |
| `action-spike.jpg` | 1800×1202 | 250 KB | index, schedule, tournaments _(+library)_ |
| `coed-four.jpg` | 1800×811 | 289 KB | co-ed-leagues, index, skill-levels _(+library)_ |
| `dropin-play-wide.jpg` | 1800×1012 | 222 KB | index _(+library)_ |
| `dropin-team-wide.jpg` | 1800×1012 | 300 KB | — _(+library)_ 🗂 library-only |
| `grass-women.jpg` | 1800×811 | 559 KB | index _(+library)_ |
| `tournament-celebration.jpg` | 640×512 | 58 KB | — _(+library)_ 🗂 library-only |
| `tournaments-spike-wide.jpg` | 1800×1012 | 202 KB | — _(+library)_ 🗂 library-only |
| `youth-camp.jpg` | 1800×811 | 231 KB | training _(+library)_ |

### assets/img

| File | Dimensions | Size | Used on |
|---|---|---|---|
| `apple-touch-icon.png` | 180×180 | 13 KB | co-ed-leagues, contact, drop-in, facility-rules, index, mens-league, queens-club, schedule, skill-levels, tournaments, training, womens-league _(+library)_ ⚠️ low-res |
| `boom-logo.png` | 1053×502 | 459 KB | 404, co-ed-leagues, contact, drop-in, facility-rules, index, mens-league, schedule, skill-levels, tournaments, training, womens-league _(+library)_ |
| `boom-sm.png` | 360×172 | 72 KB | — _(+library)_ 🗂 library-only |

### assets/img/community

| File | Dimensions | Size | Used on |
|---|---|---|---|
| `four-banner.jpg` | 1800×811 | 319 KB | index _(+library)_ |
| `group-banner1.jpg` | 1800×811 | 358 KB | contact, index _(+library)_ |
| `group-banner2.jpg` | 1800×811 | 381 KB | womens-league _(+library)_ |
| `group-court.jpg` | 1800×811 | 369 KB | index _(+library)_ |
| `group-home.jpg` | 1800×811 | 391 KB | — _(+library)_ 🗂 library-only |
| `group-net.jpg` | 1800×811 | 337 KB | index _(+library)_ |
| `womens-team-boom.jpg` | 1800×1350 | 388 KB | index _(+library)_ |

### assets/img

| File | Dimensions | Size | Used on |
|---|---|---|---|
| `favicon.png` | 256×256 | 21 KB | 404, co-ed-leagues, contact, drop-in, facility-rules, index, mens-league, queens-club, schedule, skill-levels, tournaments, training, womens-league _(+library)_ ⚠️ low-res |
| `header-collage.jpg` | 2000×1120 | 481 KB | index _(+library)_ |

### assets/img/library

| File | Dimensions | Size | Used on |
|---|---|---|---|
| `coed-team-bmtown.jpg` | 1800×1200 | 313 KB | — _(+library)_ 🗂 library-only |
| `coed-team-carry-water.jpg` | 1800×1200 | 255 KB | — _(+library)_ 🗂 library-only |
| `coed-team-mines.jpg` | 1800×1200 | 276 KB | — _(+library)_ 🗂 library-only |
| `coed-team-pyramid.jpg` | 1800×1200 | 230 KB | co-ed-leagues _(+library)_ |
| `coed-team-the-island.jpg` | 1800×1200 | 250 KB | — _(+library)_ 🗂 library-only |
| `fieldhouse-courts-empty.jpg` | 1800×811 | 310 KB | index _(+library)_ |
| `fieldhouse-exterior-sign.jpg` | 1800×1013 | 216 KB | index _(+library)_ |
| `fieldhouse-interior-courts.jpg` | 1800×811 | 347 KB | index _(+library)_ |
| `fieldhouse-interior-wide.jpg` | 1800×811 | 330 KB | index _(+library)_ |
| `fieldhouse-tournament-crowd.jpg` | 768×1024 | 165 KB | index _(+library)_ |
| `mens-boomtown-beach.jpg` | 1350×1800 | 377 KB | — _(+library)_ 🗂 library-only |
| `mens-league-observatory.jpg` | 811×1800 | 436 KB | — _(+library)_ 🗂 library-only |
| `mens-team-yamtime.jpg` | 1800×1200 | 322 KB | mens-league _(+library)_ |
| `showdown-winners-big-diggs.jpg` | 1800×811 | 459 KB | womens-league _(+library)_ |
| `showdown-winners-rmac-squad.jpg` | 1800×811 | 453 KB | womens-league _(+library)_ |
| `tournament-spike-block-action.jpg` | 1800×1202 | 179 KB | tournaments, womens-league _(+library)_ |
| `usav-tournament-podium-wide.jpg` | 843×474 | 50 KB | — _(+library)_ 🗂 library-only |
| `usav-tournament-podium.jpg` | 843×1123 | 137 KB | — _(+library)_ 🗂 library-only |
| `volo-coed-group.jpg` | 1616×1080 | 239 KB | co-ed-leagues _(+library)_ |
| `volo-coed-player.jpg` | 868×1800 | 217 KB | — _(+library)_ 🗂 library-only |
| `womens-grass-observatory.jpg` | 811×1800 | 495 KB | womens-league _(+library)_ |
| `womens-league-full-group.jpg` | 1800×1200 | 442 KB | — _(+library)_ 🗂 library-only |
| `womens-league-group.jpg` | 1800×1350 | 798 KB | womens-league _(+library)_ |
| `womens-league-hero.jpg` | 2400×1412 | 513 KB | womens-league _(+library)_ |
| `womens-league-team-net.jpg` | 480×640 | 56 KB | — _(+library)_ 🗂 library-only |
| `womens-open-gym-group.jpg` | 1800×811 | 339 KB | womens-league _(+library)_ |
| `womens-team-hawkeyes-gannon.jpg` | 1800×1200 | 335 KB | — _(+library)_ 🗂 library-only |
| `womens-team-knights-fhsu.jpg` | 1800×1200 | 273 KB | — _(+library)_ 🗂 library-only |
| `womens-team-net-number-one.jpg` | 1800×1200 | 282 KB | — _(+library)_ 🗂 library-only |
| `womens-usav-nationals-champions.jpg` | 2400×1412 | 517 KB | index _(+library)_ |

### assets/img

| File | Dimensions | Size | Used on |
|---|---|---|---|
| `og-cover.jpg` | 1200×630 | 161 KB | co-ed-leagues, contact, drop-in, facility-rules, index, mens-league, schedule, skill-levels, tournaments, training, womens-league _(+library)_ |

### assets/img/partners

| File | Dimensions | Size | Used on |
|---|---|---|---|
| `adidas.png` | 225×152 | 6 KB | index, schedule ⚠️ low-res |
| `caf.png` | 600×339 | 160 KB | index ⚠️ low-res |
| `cobo-poster.jpg` | 960×540 | 35 KB | training |
| `cobo.jpg` | 700×546 | 65 KB | index, schedule ⚠️ low-res |
| `lululemon.png` | 270×270 | 7 KB | index, schedule ⚠️ low-res |
| `molten.png` | 1020×246 | 193 KB | index, schedule |
| `nuggets.png` | 420×420 | 110 KB | index, schedule ⚠️ low-res |
| `shoot360.png` | 758×356 | 21 KB | index ⚠️ low-res |
| `special-olympics-co.png` | 600×739 | 85 KB | index, schedule ⚠️ low-res |
| `team-evo-black.png` | 300×211 | 72 KB | index, schedule ⚠️ low-res |
| `volo.png` | 373×135 | 10 KB | index, schedule ⚠️ low-res |

### assets/img

| File | Dimensions | Size | Used on |
|---|---|---|---|
| `qc-shine.png` | 553×782 | 18 KB | queens-club _(+library)_ ⚠️ low-res |
| `spike.jpg` | 819×868 | 86 KB | index, schedule, tournaments _(+library)_ ⚠️ low-res |
| `team.jpg` | 1300×868 | 122 KB | — _(+library)_ 🗂 library-only |

### assets/img/venue

| File | Dimensions | Size | Used on |
|---|---|---|---|
| `fieldhouse-bar.jpg` | 1600×1000 | 179 KB | index _(+library)_ |
| `fieldhouse-court.jpg` | 1800×1013 | 144 KB | index _(+library)_ |
| `fieldhouse-exterior-front.jpg` | 1600×1961 | 397 KB | index _(+library)_ |
| `fieldhouse-lounge.jpg` | 1800×1013 | 185 KB | index _(+library)_ |

### assets/video

| File | Dimensions | Size | Used on |
|---|---|---|---|
| `cobo-club.mp4` | — | 773 KB | training |

---

## 4. Action items derived from this table

### 4a. ✅ DONE in v0.28.0 — 4 true orphans deleted `[FACT]`
`assets/img/partners/molten.jpg`, `real-colorado.png`, `team-evo.png`, `usav.png`.
Zero references in any `.html`, including `library.html` — re-verified by exact-basename scan
against the checkout immediately before removal, not inherited from this list.

**The near-collisions were checked and survived.** `molten.jpg` was the dupe; **`molten.png`
is live and remains.** `team-evo.png` was the dupe; **`team-evo-black.png` is live and
remains.** Both confirmed present after the deletion. Always delete by full path, never by
a partial name match.

### 4b. Low-resolution assets still in use
| File | Actual | Where | Note |
|---|---|---|---|
| `library/usav-tournament-podium-wide.jpg` | 843×474 | library only | needs a high-res original |
| `library/womens-league-team-net.jpg` | 480×640 | library only | needs a high-res original |
| `action/tournament-celebration.jpg` | 640×512 | library only | needs a high-res original |

All three are currently **library-only**, so they are not degrading a visitor-facing page
today. They still block any future placement. **Do not upscale** — that adds bytes and no
detail. Needs owner-supplied originals; re-export at ≥2400px long edge to the same paths.

`[FACT]` `womens-usav-nationals-champions.jpg` and `womens-league-hero.jpg` are both 2400×1412
but are upscales from an 1800px source — the pixel count is real, the detail is not. Leave
them; a re-export from true originals would improve them but nothing is visibly broken.

### 4c. Unplaced team photos — owner decision
`[FACT]` These four are the genuine library-only team shots from the v0.23.x drop:

- `library/womens-league-full-group.jpg` (1800×1200)
- `library/coed-team-mines.jpg` (1800×1200)
- `library/coed-team-carry-water.jpg` (1800×1200)
- `library/coed-team-the-island.jpg` (1800×1200)

Each needs either a page placement or an explicit "keep in library". A further 18 files are
library-only but are duplicates, alternates, or site chrome — see the ⚠️/🗂 flags above.

### 4d. Partner logos — 22 external hotlinks `[FACT]`
Not an asset-folder problem, but it belongs here. 18 × `logo.clearbit.com` + 4 ×
`static.wixstatic.com`, across **three** pages:

| Page | clearbit | wixstatic | total |
|---|---|---|---|
| `index.html` | 14 | 2 | 16 |
| `schedule.html` | 2 | 1 | 3 |
| `tournaments.html` | 2 | 1 | 3 |
| **total** | **18** | **4** | **22** |

`schedule.html` was absent from every list before v0.27.0 — a self-host pass driven by the old
note would have silently missed it. Each tile has an `onerror` text fallback, so nothing looks
broken today. Self-hosting is **deferred by owner decision**; it needs source PNGs, and sandbox
egress blocks both hosts, so the files must be supplied.

When they arrive: drop them in `assets/img/partners/`, follow the existing naming, rewrite all
22 refs to `/assets/img/partners/<name>.png`, **keep the `onerror` fallbacks**, then confirm
`grep -c 'clearbit\|wixstatic' *.html` returns 0 on all three pages.

### 4e. ✅ DONE in v0.28.0 — stale manifests removed
`assets/img/ASSET-MANIFEST.md` and `WIX-IMAGE-MANIFEST_2026-07-19.md` were superseded by this
document and are **deleted**. A stale manifest at a predictable path is exactly what a future
session mistakes for current state. Deleted alongside them:
`boomtown-events-widget_v3_2026-07-19.html` (referenced by no page) and the root
`HANDOFF.md`, which was **moved**, not deleted, to `docs/HANDOFF_ARCHIVE_pre-v0.28.0.md`.

---

## 5. Adding a new image — checklist

- [ ] Correct folder (§2), lowercase-hyphen name, descriptive not sequential
- [ ] ≥2400px on the long edge for anything full-width; ≥1800px otherwise
- [ ] Compressed — nothing in this repo exceeds 800 KB; stay under it
- [ ] `<img>` carries explicit `width` and `height` (prevents layout shift)
- [ ] Meaningful `alt`, or `alt=""` if purely decorative
- [ ] Added to `library.html` so it stays discoverable
- [ ] `bash scripts/validate.sh` → check 8 confirms the path resolves
