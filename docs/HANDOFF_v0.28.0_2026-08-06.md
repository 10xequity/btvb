# Boomtown Athletics — HANDOFF

**Version** v0.28.0 · **Created** 2026-08-06 · **Status** Active
**Supersedes** `HANDOFF_v0.27.0_2026-07-28.md` and `EXEC-PROMPT_v0.28.0_2026-07-28.md`.
The exec-prompt format is **retired** — it existed to brief a chat session with no repo access.
Claude Code has the repo. `CLAUDE.md` replaces it and loads automatically.

**Repo** github.com/10xequity/btvb (`main`) · **Live** https://www.boomtownathletics.com
**Baseline** v0.27.0, verified present on `main` — **no indexable page was edited**, so no
page had its line-1 version comment bumped and nothing a visitor can see changed. The release
does delete 7 unreferenced files (§4c) and archive one.

---

## 1. What this release is

A **tooling and documentation handoff**, not a code release. It moves the project from
"chat session ships a zip" to "Claude Code edits the repo directly," and it replaces three
years of accumulated prose with things a machine can check.

The delivery is the six items below plus a hygiene pass (§4c), none of which change a single
rendered pixel:

| File | Goes to | What it is |
|---|---|---|
| `CLAUDE.md` | repo root | Auto-loaded by Claude Code every session. The invariants, the constants, the workflow, the traps. |
| `scripts/validate.sh` | `scripts/` | **77 automated checks.** Run before every commit. |
| `docs/DESIGN-SYSTEM_v0.28.0_2026-08-06.md` | `docs/` | The colours, type, spacing and components, extracted from the code. |
| `docs/ASSET-LIBRARY_v0.28.0_2026-08-06.md` | `docs/` | Every image, its dimensions, and which pages use it. |
| `docs/HANDOFF_v0.28.0_2026-08-06.md` | `docs/` | This file. |
| `.claude/commands/*.md` | `.claude/commands/` | Three slash commands: `/validate`, `/release`, `/verify-sheet`. |

**The validator is the important one.** Every check in it corresponds to something that has
actually broken this site. It passes 77/77 against clean `main` today, so any failure you see
later is a change you made.

---

## 2. Corrections found this session

Fifth release running. The pattern is now the project's defining risk, which is why
`CLAUDE.md` opens with it.

### 2a. `[CORRECTION]` The IG grid is on **one** page, not eleven

Every prior brief says the v0.26.0 fix — `.ig-card .t` = `inset:9px auto auto 9px` and
`.ig-card .pl` = `inset:9px 9px auto auto` + `padding:0` — is present "on all 11 indexable
pages."

Measured on `main`:

| Rule | Pages carrying it |
|---|---|
| `.ig-card .t` | 11 |
| `.ig-card .pl` | **1 — `index.html` only** |
| `.ig-card` grid markup | **1 — `index.html`** |
| `feeds.behold.so` fetch | **1 — `index.html`** |

The other 10 pages carry an **inert partial copy** of the IG CSS: `.t` but no `.pl`, and no
markup for either to apply to. Nothing is visually wrong — the brief already warns that
duplicated CSS can sit "present-but-inert." But the surface area of the IG feature is one
page, not eleven, and anyone reading the old note would go looking for a bug on ten pages that
have no Instagram grid on them.

**What changed as a result:** the validator no longer asserts `.pl` on all 11 pages. It
enforces the *general* invariant instead — any `position:absolute` child of `.ig-card` must
resolve all four inset sides — plus the two exact rules on `index.html`. That catches the
class of bug rather than one instance of it.

### 2b. `[CORRECTION]` `womens-open-gym-group.jpg` is already placed

`EXEC-PROMPT §3` lists it among the "7 library-only team photos" awaiting placement. It is
referenced by `womens-league.html`. The genuine unplaced set is **four** files, listed in
`ASSET-LIBRARY §4c`.

### 2c. `[CORRECTION]` The "live on 3 pages" logo warning counts a file being deleted

`molten.png` and `team-evo-black.png` are flagged in prior docs as live on 3 pages each. Two of
those pages are real (`index`, `schedule`); the third is
`boomtown-events-widget_v3_2026-07-19.html`, which is itself on the deletion list. The warning
is still correct — do not delete these two — but the count is inflated.

### 2d. `[FACT]` The version-header rule was never enforced site-wide

`CLAUDE.md` and every prior brief state "exactly one version comment per page, on line 1."
That is true of the 11 indexable pages. It is not true of the repo:

| Page | Line 1 |
|---|---|
| 11 indexable pages | `v0.27.0 · 2026-07-28` ✅ |
| `queens-club.html` | `v0.19.0 · 2026-07-27` — 8 releases stale |
| `404.html` | `v0.15.0 · 2026-07-19` — 12 releases stale |
| `library.html` | **no version comment at all** |

Harmless — all three are noindex or an error page, and none has changed. But it is exactly the
trap v0.27.0 was cut to eliminate: a stale header that makes an auditor conclude the repo is
behind. The validator checks the 11 indexable pages; the other three are called out here so
the gap is recorded rather than rediscovered.

### 2e. `[CORRECTION]` The `boomtownvb.com` 301 is already live

Three documents (`CLAUDE.md` §9, this file §4d, `README.md`) list the redirect as **deferred
until the domain transfers**. Measured 2026-08-06:

```
https://www.boomtownvb.com  →  301 Moved Permanently  →  https://www.boomtownathletics.com/
```

It works today. The item is closed, not pending. Sixth release running that an inherited
claim was wrong — and the first one where the inherited claim was *pessimistic* rather than
optimistic. The failure mode cuts both ways: this one cost nothing in bugs, but it kept a
finished job on the open-work list across four handoffs.

### 2f. `[FACT]` `validate.sh` has an undeclared Python 3 dependency

The script shells out to `python3` at **five** points (tag balance, script extraction,
JSON-LD, the `.ig-card` inset check, and the link/asset resolver). Unlike `node` — which it
probes with `command -v` and skips gracefully — the `python3` calls are **unguarded**.

On a Windows machine with no Python, every one of those checks fails *silently for the wrong
reason*: Windows answers `python3` with a Microsoft Store stub, the heredoc gets no
interpreter, and the check reports `FAIL`. First run on the owner's machine produced
**40 passed, 37 failed** — every failure environmental, none real. After installing Python
3.12.10 the same checkout returned **77 passed, 0 failed.**

This matters more than it looks: a validator that fails for environmental reasons trains the
person running it to ignore red output. That is worse than having no validator.

**Fix applied this release:** none to the script — it ships byte-identical to what was
reviewed, and Python 3.12.10 is now installed on the owner's machine with a `python3` shim.
**Recommended next:** port the five Python blocks to `node`, which the script already
requires and which was already present. That removes the dependency instead of documenting
it. Until then, `/validate` only works where Python 3 is installed.

---

## 3. Verified correct on `main` — do not redo

Re-checked this session against a fresh clone, not inherited:

- **v0.27.0 is genuinely live.** All 11 indexable pages read `v0.27.0 · 2026-07-28` on line 1,
  with no second version comment on lines 2–6.
- **`esc()` is gone.** Zero occurrences anywhere in the repo.
- **Renderers are `textContent`-only.** `innerHTML` count is 3 on each league page —
  two clears plus the static skeleton span. `index.html` has one, the carousel's static SVG
  icon constant, not feed data.
- **22 logo hotlinks across 3 pages** — index 16, schedule 3, tournaments 3. Confirms v0.27.0.
- **Exactly 4 gids in the repo**, matching the documented set.
- **Meta Pixel on exactly 11 pages** — indexable only, correctly absent from `queens-club`
  and `library`.
- **`spike.jpg` exists** (819×868) and is used on 4 pages. The v0.24.0 "broken image" was a
  grep artifact, as v0.25.0 said.
- **CNAME, Behold feed URL, waiver URL, `_isISO` regex** — all unchanged.
- **No `hop.behold.pictures` anywhere.**
- **Every local asset path resolves; no extensionless internal links.**

---

## 4. What is actually left to do

Unchanged from v0.27.0. **Everything on this list is blocked on the owner.** There is no code
work available that doesn't depend on a file or a decision below — do not invent filler.

### 4a. Needs owner-supplied files
| Item | Detail |
|---|---|
| Partner logo PNGs | To self-host the 22 external refs. Sandbox egress blocks clearbit and wixstatic, so these must be handed over. |
| High-res originals ×3 | `usav-tournament-podium-wide.jpg` (843×474), `womens-league-team-net.jpg` (480×640), `tournament-celebration.jpg` (640×512). Re-export at ≥2400px. **No upscaling.** |

### 4b. Needs an owner decision
| Question | Why it matters |
|---|---|
| The four `Queens Club Sunday RP` rows — two run Tuesday and Wednesday. Real names? | A league called "Sunday RP" showing a Wednesday date reads as a site error. |
| Pre-Season Qualifier: `day` = "Tues & Wed" but `start_date` is a single Tuesday. Which is right? | The page shows one of them. One is wrong. |
| Placement for the 4 unplaced team photos, or "keep in library" | `ASSET-LIBRARY §4c` |
| ~~Root `HANDOFF.md` — remove or archive?~~ **DECIDED, DONE.** | Owner chose archive. Moved to `docs/HANDOFF_ARCHIVE_pre-v0.28.0.md` — same benefit as deletion, and reversible. |

### 4c. Owner-side, mechanical
- **Sheet cleanup** per `SHEET-CLEANUP_v0.27.0_2026-07-28.md`: `Qualifer` → `Qualifier`,
  clear 12 stale `end_date` prose cells, move `Invitiational` out of the `registration_link`
  column, rename `Leagues`/`Tournaments` tabs to `*_LEGACY_do-not-edit`, fix the sheet README's
  stale "publish only Events and Partners" line.
  **Read the date-coercion warning in `CLAUDE.md` §6c before touching any date cell.**
  The Drive MCP is read-only — no assistant can make these edits.
- ~~**Repo hygiene**~~ — ✅ **DONE in v0.28.0, no script needed.** The
  `repo-hygiene_v0.27.0_2026-07-28.sh` file does not exist on the owner's machine or in the
  repo, so the deletion list was **re-derived from the checkout** rather than inherited: an
  exact-basename scan of all 83 tracked assets against every `.html`/`.js`/`.css`/`.xml`
  found exactly 4 orphans, matching the documented set. Removed: the 4 partner orphans,
  `boomtown-events-widget_v3_2026-07-19.html`, and both stale manifests — 7 files. The near-
  collision trap held: `molten.png` and `team-evo-black.png` confirmed present afterwards.
  **Still open:** `assets/js/main.js` is a 3-line tombstone left by an automated revert
  ("the original JavaScript was removed from the default branch"), referenced by no page.
  It was left in place — it was not on the approved list. Recommend deleting it next pass.
- **Confirm the Meta Pixel fires** in Events Manager.

### 4d. Deferred by decision
`btplatform` / `boomtown-api` Worker (separate project, out of scope) · partner-logo
self-hosting (waiting on files).

**Removed from this list:** the `boomtownvb.com` 301. `[FACT]` It is already live —
verified 2026-08-06, `https://www.boomtownvb.com` returns `301` to
`https://www.boomtownathletics.com/`. See §2e.

---

## 5. What changes about how you work now

| Old (chat sessions) | New (Claude Code) |
|---|---|
| Deliver a zip, owner extracts manually | Commit real files on a branch |
| Paste a 200-line exec-prompt to start | `CLAUDE.md` loads automatically |
| "The sandbox can't verify that" | `bash scripts/validate.sh` — 77 checks |
| Facts re-typed from the last handoff | Facts re-derived from the checkout |
| Version bump tracked by hand | Validator fails the commit if line 1 is wrong |

**Still true, still important:** do not push to `main` without the owner saying so in that
session. The site is live and GitHub Pages deploys on push. There is no staging environment.

### 4e. One deliberate inconsistency, flagged

`README.md` now reads *"Site version: v0.28.0"* but the 11 page headers still read
**`v0.27.0 · 2026-07-28`**. That is correct, not an oversight: house style says bump the header
on **every edited page**, and this release edited no page. Bumping 11 headers to advertise a
change that doesn't exist in them would reintroduce exactly the misleading-version problem
v0.27.0 was cut to fix. The next release that touches a page bumps that page.

---

## 6. Suggested commit message

```
v0.28.0 — tooling handoff to Claude Code. No site file changed; no rendered
output differs.

Adds CLAUDE.md (auto-loaded operating instructions: invariants, frozen
constants, the three bug classes that have hit production, the verify-don't-
inherit rule), scripts/validate.sh (77 checks covering version headers, tag
balance, inline JS syntax, JSON-LD, renderer textContent-safety, the .ig-card
inset invariant, frozen constants, asset-path resolution, placeholders and the
_isISO date guard — 77/77 pass on this baseline), docs/DESIGN-SYSTEM (tokens
extracted from the code, since the site has no CSS variables), docs/ASSET-
LIBRARY (81 images with dimensions and per-page usage), and three slash
commands.

Three record corrections, the fifth release running that an inherited claim
was wrong: the .ig-card .pl rule and the Instagram grid exist on index.html
ONLY, not "all 11 indexable pages" — the other ten carry an inert partial copy
of the CSS with no markup to apply it to; womens-open-gym-group.jpg was listed
as unplaced but is live on womens-league.html, leaving four genuinely unplaced
team photos, not seven; and the "molten.png / team-evo-black.png are live on 3
pages" warning counts boomtown-events-widget_v3, a file already on the deletion
list — they are live on two real pages. Also recorded: the one-version-comment-
per-page rule was only ever enforced on the 11 indexable pages; queens-club
(v0.19.0), 404 (v0.15.0) and library (no comment at all) were never in scope.

Retires the EXEC-PROMPT format, which existed to brief a chat session with no
repo access.
```

---

## Bottom line

Nothing on the website changed. What changed is that the things this project keeps getting
wrong are now checked by a script instead of remembered in a document — and the script found
three more wrong things on its first run. The remaining work is all waiting on you: the logo
files, the photo originals, and four questions about the sheet.
