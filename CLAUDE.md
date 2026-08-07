<!-- CLAUDE.md · v0.28.0 · 2026-08-06 · Claude Code operating instructions for the btvb repo -->

# CLAUDE.md — Boomtown Athletics website (`btvb`)

**Version** v0.28.0 · **Created** 2026-08-06 · **Status** Active
**Supersedes** the chat-session `EXEC-PROMPT` workflow (v0.28.0 and earlier). Those documents
were written for a sandboxed chat with no repo access. You have the repo. Behave differently.

Claude Code loads this file automatically at the start of every session in this directory.
Read it fully before touching anything.

---

## 0. Operating stance

- Senior technical advisor. Accuracy over comfort. Lead with the answer, no preamble.
- The owner is not a coder. Every change needs a plain-English summary: what it does, what
  it touches (files, network, data). One or two clauses. Scale it to the change. That summary
  is how the change gets judged, so it is not optional. Keep the code production-grade
  regardless of how simple the explanation is.
- Label contestable claims `[FACT]` / `[INFERENCE]` / `[GUESS]`. Skip the label when something
  is plainly factual — tagging everything is noise. Flag any statistic with no source.
- Give a recommendation, not a menu. Add one line naming the strongest alternative and why it lost.

## 1. The one rule that matters most: verify, don't inherit

**Six releases running, a documented "fact" in this project has been wrong.**

| Release | Inherited claim | Reality |
|---|---|---|
| v0.24.0 | `spike.jpg` is a broken image | grep artifact; the file is fine (819×868) |
| v0.25.0 | IG images come from `hop.behold.pictures` | it is `behold.pictures` |
| v0.25.0 | "the IG feed will populate on its own" | the real defect was a CSS overlay |
| v0.26.0 | `naturalWidth > 0` proves the image is visible | it proves it decoded; a yellow panel covered 94% of every tile |
| v0.27.0 | "sheet data can't be verified outside a browser" | false — the Google Drive MCP reads it |
| v0.27.0 | ~14 logo hotlinks on 2 pages | 22 across 3 pages |
| v0.27.0 | the exec-prompt's own cleanup step | would have *caused* a regression |
| **v0.28.0** | "the `.ig-card .t`/`.pl` fix is on all 11 pages" | `.t` yes; **`.pl` is only on `index.html`** |
| **v0.28.0** | `womens-open-gym-group.jpg` is unplaced | it is placed, on `womens-league.html` |
| **v0.28.0** | `molten.png`/`team-evo-black.png` live on 3 pages | 2 real pages; the 3rd is the stale widget file |
| **v0.28.0** | the `boomtownvb.com` 301 is "deferred until transfer" | **already live** — verified `301` on 2026-08-06 |
| **v0.28.0** | "the v0.28.0 tooling was delivered" | authored, never committed — `main` sat at v0.27.0 until this commit |
| **v0.28.0** | "`validate.sh` passes 77/77" | true only where Python 3 is installed — 5 unguarded `python3` calls |

You are in a real checkout. **Check the file. Never restate a prior document's claim as fact
without re-running the check.** If you catch a new one, record it in the table above and in
the release handoff.

Corollary: **check the tooling before accepting a constraint.** "The sandbox can't read the
sheet" stood for three releases and was never true.

Corollary: **for visual symptoms, look at a screenshot before theorising.**

## 2. What this is

Static marketing site for Boomtown Athletics, a Denver/Aurora volleyball company —
tournaments, women's/men's/co-ed leagues, training, nightly drop-in. The job is converting
visitors into registrations and mailing-list signups, and ranking locally.

- **Plain HTML/CSS/JS. No framework. No build step. No package.json.** Open a `.html` file
  and it runs.
- **Each page inlines its own CSS and JS.** There is no shared stylesheet. Pages look alike
  because the CSS is *physically copy-pasted* into each one.
  **Consequence: a cascade fix must be applied to every copy, and a rule can sit inert on a
  page that lacks the matching markup.** Always `grep` before assuming a rule is or isn't present.
- **Host:** GitHub Pages, origin `10xequity.github.io/btvb`, `CNAME` → `www.boomtownathletics.com`,
  fronted by Cloudflare (DNS + CDN). `www` is canonical.
- **URLs include `.html`.** GitHub Pages does not rewrite extensionless URLs. Internal links,
  canonicals, OG tags and JSON-LD self-URLs all carry `.html`.
- **`box-sizing:border-box` is global.** Inherited padding can floor an element's box above its
  declared width/height — this is what distorted the IG reel badge in v0.26.0.

Pages: 11 indexable + `queens-club.html` (noindex, invite gate) + `library.html`
(noindex, unlinked, internal photo reference) + `404.html`.

## 3. Workflow

```bash
bash scripts/validate.sh     # 77 checks. Run before every commit. Exit 0 = safe.
```

**Requires `python3` and `node` on PATH.** `[FACT]` The script calls `python3` at five points
with **no `command -v` guard** (unlike its `node` calls, which skip gracefully). Where Python
is missing the affected checks report `FAIL` for an environmental reason, not a real one —
first run on the owner's Windows machine gave *40 passed, 37 failed*, all 37 spurious; with
Python 3.12.10 installed the same checkout gave **77/77**. If you see a wall of failures,
run `python3 --version` **before** believing any of them. Windows note: `python3` may resolve
to a Microsoft Store stub that precedes the real interpreter on PATH.

1. Work directly in the checkout on a branch. `git switch -c vX.Y.Z-<topic>`
2. Make the change **in every affected copy** of the CSS/JS (see §2).
3. Bump the line-1 version comment on **every** file you edited (§4).
4. `bash scripts/validate.sh` — must be 0 failures.
5. Commit with a message that says what was wrong, not just what changed.
6. **Do not push to `main` without the owner saying so in this session.** Open a PR or hand
   over the branch. Pushing is a one-way door on a live site.
7. Update `README.md` ("What's new") and prepend to `design.md` (append-only — never rewrite
   a historical entry; corrections go in the newest entry).

**No zip needed any more.** The old chat workflow shipped a zip because the sandbox couldn't
touch the repo. That constraint is gone. Commit real files.

## 4. Version header rule — read this before editing near the top of a file

Exactly **one** version comment per page, on **line 1**, immediately after `<!DOCTYPE html>`:

```html
<!DOCTYPE html><!-- v0.28.0 · 2026-08-06 · short summary of what changed -->
```

Bump it on every file you edit. Two traps, both of which have bitten:

- On 8 of 11 pages a comment historically shared its line with `<html lang="en">`.
  **Comment surgery must be comment-scoped, never line-based.** A line delete destroys the document.
- A comment body can contain `>` (e.g. `onerror -> local fallback`), so a `[^>]*` regex
  terminates early. Use a tempered `(?:(?!-->)[\s\S])*?`.

`[FACT]` Current state: the 11 indexable pages are at `v0.27.0 · 2026-07-28`.
`queens-club.html` is stale at `v0.19.0`, `404.html` at `v0.15.0`, and `library.html` has **no
version comment at all**. The "one comment per page" rule has only ever been enforced on the
11 indexable pages.

## 5. Frozen constants — do not change without asking

| Thing | Value |
|---|---|
| Meta Pixel ID | `120232615176120623` — on the 11 indexable pages only |
| Waiver URL | `https://forms.gle/vwEY2aC4SA9SrZPQA` |
| Sheet publish token | `https://docs.google.com/spreadsheets/d/e/2PACX-1vRH7LfAZ_IHxc3cntV3yGVJtFa5vlCADbHrcq_Mc-yKj-EEt4X2pXrlpWgPH18eZPvoLA19NvHwPpds/pub?gid=<GID>&single=true&output=csv` |
| Raw sheet ID (Drive MCP) | `1UFsYrtD1pf27f6D0m3O45oA3MUtfG2wiV9x1zyl-H4w` |
| GIDs (the only four in the repo) | Events `2097603747` · Partners `454802271` · WomensLeagues `1645496886` · MensLeagues `1824462476` |
| Behold feed | `feeds.behold.so/JgI7koDkWULorgLXnzkz` |
| Behold image host | **`behold.pictures`** — *not* `hop.behold.pictures` |
| CNAME | `www.boomtownathletics.com` |
| robots.txt exclusions | `/queens-club`, `/library` |

The sheet's `Leagues` and `Tournaments` tabs are **legacy — consumed by nothing.**

## 6. The three invariants that have caused live bugs

### 6a. Renderers are `textContent`-only
Every table cell is built with `document.createElement` + `textContent`. `innerHTML` appears
only as `MOUNT.innerHTML=""` (clearing) and one static skeleton `<span>`.
**Never build row data or feed data with `innerHTML`.** Register links are gated on
`/^https?:\/\//i`, so a `javascript:` URL pasted into the sheet cannot become an anchor.
`esc()` was removed as dead in v0.27.0 — **do not re-add it as "safety."** It wasn't doing anything.

### 6b. `.ig-card` children must set all four inset sides
`.ig-card span` sets `inset:auto 0 0 0` and `padding:24px 11px 10px`. Any higher-specificity
child rule that sets only `top`/`left` **inherits `right:0;bottom:0`** (and the padding) and
stretches across the tile. That is the v0.26.0 yellow-tile bug.
Known-good on `index.html`: `.t` → `inset:9px auto auto 9px`; `.pl` → `inset:9px 9px auto auto;padding:0`.
`[FACT]` The IG grid markup and Behold fetch exist on **`index.html` only.** The other pages
carry an inert partial copy of the CSS. `validate.sh` check 6 enforces the general rule.

### 6c. Never retype a `start_date` cell in the sheet
The parser is `/^\d{4}-\d{1,2}-\d{1,2}$/`, so **`2026-8-25` is already valid — do not
"normalise" it to `2026-08-25`.** The cells are text. Retyping invites Sheets to coerce them to
date values; the published CSV then emits `8/25/2026`, which fails the test, and the raw string
prints into the Date column. If a date genuinely must change, set the column to **Plain text first.**

| CSV value | passes `_isISO` | renders as |
|---|---|---|
| `2026-8-25` | yes | Tuesday, August 25, 2026 |
| `2026-08-25` | yes | Tuesday, August 25, 2026 |
| `8/25/2026` | **no** | `8/25/2026` (raw) |
| `2026-08-25T00:00:00` | **no** | raw string |

## 7. Data layer

League CSV schema — **do not alter**:
`type, title, division, format, day, start_date, end_date, time, location, registration_link, status, notes`

The renderer parses **by header name**, so column order doesn't matter. It renders
**League · Day · Format · Time · Date · Register**. Guards: the header must contain `title`
+ `start_date` or it falls back to sample rows; a stray leading `type`/`League`/`Tournament`/
`Event` value is dropped; a non-ISO `end_date` is ignored. No warning banner is shown in any
mode — only an invisible `console.warn` on fetch failure.

**Reading the sheet:** use the **Google Drive MCP** (`read_file_content` on the sheet ID). It
reads all 7 tabs and it is **read-only** — there is no cell-update tool, so sheet fixes are
always owner-side work. A plain HTTP fetch of `docs.google.com` is blocked by robots; that
limit applies to fetching, not to the MCP.
**What Drive cannot prove:** it reads the *source sheet*, not the *published-CSV cache* the
browser fetches. Publish latency stays browser-verifiable only.

## 8. Available tooling — check before declaring something impossible

- `git` — full checkout, real history.
- **Google Drive MCP** — reads the sheet (read-only).
- **Cloudflare MCP** — `workers_list`, `workers_get_worker_code`.
- **Chrome MCP** — live-site inspection: network codes, console, DOM geometry, injected-CSS trials.
  This is how you check a *visual* claim.
- `node` v22 — for `--check` and scratch scripts. There is no build step and no dependencies.

Known egress blocks: `clearbit.com`, `wixstatic.com`, Google, Behold. You cannot download the
partner logos or fetch the IG feed from a sandbox shell. Don't burn turns retrying them.

## 9. Out of scope — do not touch

- **`boomtown-api` Cloudflare Worker** — backend of a *separate* members-platform project
  (`10xequity/btplatform`, self-reports v0.32.0, 139 routes, D1 + Square + Brevo).
  **It is not a proxy.** Owner decision: out of scope.
- **`cobo-ig-feed` Worker** — a 20-line Behold proxy CORS-locked to a partner facility.
  Unrelated. Useful only as a template if a Behold proxy is ever needed here (it isn't).
- **`boomtownvb.com`** — owner-owned. `[FACT]` The 301 to `boomtownathletics.com` is **already
  live** — verified 2026-08-06: `https://www.boomtownvb.com` → `301` →
  `https://www.boomtownathletics.com/`. Prior docs called this "deferred until the domain
  transfers." It is done. Nothing to do; don't re-open it.

## 10. Companion docs

| File | What it is |
|---|---|
| `docs/DESIGN-SYSTEM_v0.28.0_2026-08-06.md` | Real extracted tokens — colours, type, spacing, components. Read before any visual change. |
| `docs/ASSET-LIBRARY_v0.28.0_2026-08-06.md` | Every image, its size, and which pages use it. Read before adding or deleting an image. |
| `docs/HANDOFF_v0.28.0_2026-08-06.md` | State of the world at the chat→Claude Code transfer, and the open work. |
| `docs/HANDOFF_ARCHIVE_pre-v0.28.0.md` | The old root `HANDOFF.md`, moved here in v0.28.0. **Historical — do not treat as current state.** |
| `design.md` | Append-only decision log + changelog. Current through 0.28.0. |
| `README.md` | Ships to the repo root; carries the "What's new" section. |
