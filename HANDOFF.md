# Boomtown Athletics — Website Rebuild · HANDOFF
**Version: v0.9.0 · Prompt v2.0.0 · Updated: 2026-06-21**

Static site replacing the old Wix build for **Boomtown Athletics** (player-run competitive
volleyball, Denver metro), hosted inside **Boomtown FieldhouseUSA, 14200 E Alameda Ave,
Aurora, CO 80012**. Contact admin@boomtownathletics.com · sponsorship admin@boomtownvb.com.
Socials: instagram.com/boomtownvb · facebook.com/groups/boomtownvb · boomtownathletics.com.

---

## ♻️ REMOVE / SUPERSEDED — clean these out of project knowledge & repo
Replace the old project-knowledge files with the v0.8.0 docs in this delivery:
| Remove | Replace with / reason |
|---|---|
| `HANDOFF.md` (v0.5.0, dated 2026-06-20) | **this file (v0.8.0)** |
| `design.md` (v0.5.0) | **design.md (v0.8.0)** in this delivery |
| `BT Web` notes doc | folded in here (socials line above) |
| `boomtown-web-v0.6.0.zip`, `boomtown-web-v0.7.0.zip` | superseded by **boomtown-web-v0.8.0.zip** |
| any `boomtown-site.zip` | never existed in this repo — ignore old references |

**Stale claims in the old v0.5.0 docs (now corrected below):** deploy was listed as
Cloudflare Pages (it's **GitHub Pages**); file list referenced `layout-options.html`,
`queens-club-onyx.html`, `assets/css/theme.css`, `assets/js/feed.js`, `HANDOFF.md` —
**none of those exist in the repo.**

**Orphan asset to delete from repo** (unreferenced, superseded):
`assets/img/boom-sm.png` (replaced by `boom-logo.png`).
**Unused-but-intentional spares** (keep — staged for future placement): `about-team.jpg`,
`action/action-podium.jpg`, `action/youth-camp.jpg`, `community/group-home.jpg`,
`community/group-net.jpg`, `community/four-banner.jpg`.

---

## How to continue in a new chat
1. Upload **boomtown-web-v0.8.0.zip** + this **HANDOFF.md** (+ **design.md** if changing design).
2. Say: "Continue the Boomtown rebuild — here's the current site + handoff."
3. All pages are **self-contained HTML** (inline CSS/JS per page). Images are real files under
   `assets/img/`. Edits are done with Python/bash; output is verified structurally (no browser).

## Stack / deploy (locked)
- **Code canon:** GitHub repo `github.com/10xequity/btvb` (branch `main`).
- **Design canon:** `design.md`.
- **Deploy:** **GitHub Pages** → `https://10xequity.github.io/btvb/` (you push the zip contents
  to the repo; Pages auto-serves). Paths are **relative** so it also works on a future apex
  `boomtownathletics.com`.
- **Future data layer (not built yet):** one Google Sheet, tabs published as CSV, fetched
  client-side for Leagues/Tournaments/Partners. Instagram via a Worker→KV→R2 cache.

## Files in repo (current, accurate)
- **Pages (13):** index, tournaments, drop-in, womens-league, mens-league, co-ed-leagues,
  training, contact, facility-rules, queens-club (standalone noindex gate) + README.md,
  robots.txt (disallows /queens-club), sitemap.xml (QC excluded).
- **Docs:** design.md, HANDOFF.md.
- **assets/img/**: boom-logo.png (nav/hero/footer), favicon.png + apple-touch-icon.png (gold
  spiker), header-collage.jpg (hero grid), qc-shine.png, spike.jpg, team.jpg,
  partners/ (lululemon, shoot360, team-evo, nuggets, caf),
  action/ (spike, set, hit1, hit2, block1, block2, podium, coed-four, grass-women, youth-camp),
  community/ (group-court, group-home, group-net, group-banner1, group-banner2, four-banner).

## Done — current state (through v0.8.0)
- **Global:** sanctioned band on every page beneath the hero; nav = Tournaments · Drop-In ·
  Training▾(Adult/Youth) · Leagues▾(Women's/Men's/Co-Ed) · Store↗ · Contact; Store →
  boomtownathletics.square.site; clean transparent BOOM logo (from 2026 master); gold-spiker
  favicon (aspect-correct); motion system + back-to-top on all pages; every <img> has alt.
- **Home:** hero shows the full PLAY-EVERYDAY grid edge-to-edge (matched aspect-ratio, white
  bottom cropped); cinematic Tournaments/Drop-In blocks; About = community BOOMTOWN-banner
  group photo; animated Fieldhouse carousel (play + community frames); partners (USAV RMR, AVP,
  AAU, MPS, Volo, Rhone/adidas/lululemon, CAF, Aurora Public Schools, Special Olympics CO,
  Chance Sports, My Spark, Nuggets); IG 3×3.
- **Sub-pages:** action-photo heroes throughout (Co-Ed → co-ed foursome; Contact → community
  group); Women's qualifying fully written (Aug–Oct half-price pre-season; 4s AA Wed / A&BB Tue
  qualify; Sun A/BB rotating no-qual; 3-season commit Oct–April; Aug mixers; Showdown bid) +
  registration CTAs ("Player registration" / "Create your player profile"); Drop-In House Rules
  block; Training Adult/Youth anchors; facility-rules full rules; Queens Club photo + de-looped
  Enter (→ womens #qualify) + schedule line (7:15–9:15 PM · 6 games/night).

## Key URLs / data
- Store: https://boomtownathletics.square.site/
- Tournaments Sheet: docs.google.com/spreadsheets/d/11gSs2akMUBsRrR-80HPU8n7HJz5v-oT6HfGmsnFkn-w
- Women's form: forms.gle/1sfPSZhbVEifFrct6 · Drop-in waiver: forms.gle/vwEY2aC4SA9SrZPQA
  · Mailing list: forms.gle/PPFgrps7jkTrPr4DA
- FieldhouseUSA: aurorafieldhouseusa.com

## OPEN FLAGS / TODO
1. **Tournament & league rows are placeholders** — wire the Google Sheet (publish each tab as
   CSV; send the CSV URLs). Highest-value functional item.
2. **Women's player-profile registry (#4)** — when your Google Form (→ Excel → DB) is live, send
   the URL; swap it into the women's "Player registration / Create your player profile" CTAs.
3. **Instagram feed is static** — stand up the Worker→KV→R2 cache for a live feed.
4. **CAF logo** is light-on-navy (sits on a dark tile); supply a transparent/dark-text file to
   match the white partner tiles.
5. **Hero geometry caveat:** the home grid is matched-aspect so it's edge-to-edge on normal
   widths but shaves a sliver on ultra-wide/ultra-narrow. Switch to `object-fit:contain` if you
   prefer never-crop (thin black bars that blend into the page).
6. Externalize shared CSS/JS (currently inline per page); optional custom volleyball cursor; QC
   vector logo; og:image still points at a wixstatic URL.

## Next build steps (after sign-off)
Wire 3 Sheet CSV tabs → Leagues/Tournaments/Partners renderers; stand up IG Worker+KV+R2;
add a "how to update the Sheet" staff note; externalize shared CSS/JS; confirm Pages deploy.
Bump design.md + HANDOFF version + date each change.
