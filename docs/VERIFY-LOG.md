# btvb — Verify Log: inherited claims that were wrong

**Version** 1 · **Date** 2026-11-27 · **Status** Active · **Supersedes** the table in CLAUDE.md §1 (v0.28.0–v0.50.2)

Moved out of `CLAUDE.md` on 2026-11-27 to keep the always-loaded file short. The rule stays in
`CLAUDE.md` §1: check the file, never restate a prior document's claim without re-running the check.
Append a row when you catch a new one.

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
| **v0.31.0** | `queens-club.html` is "just noindex + an invite gate" | its `<link rel=canonical>` also pointed **off-domain** at `https://www.queensclubvb.com/`, which 302s to a parked `l.ink` placeholder — removing `noindex` alone would have indexed nothing |
| **v0.28.0** | "`validate.sh` passes 77/77" | true only where Python 3 is installed — 5 unguarded `python3` calls |
| **v0.35.0** | "Waiver URL = `forms.gle/vwEY…`" (frozen constant since v0.28.0) | that form is the **Drop-In Digital Sign-In** (title verified by fetch); the liability waiver is `forms.gle/4vAw…`, which only `facility-rules.html` used — 5 "sign the waiver" links on 4 pages opened the sign-in |
