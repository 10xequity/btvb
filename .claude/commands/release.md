---
description: Cut a release — bump versions, validate, prepare the commit
argument-hint: [version] e.g. 0.29.0
---
Cut release v$1.

1. `git status` — abort if the tree is dirty with anything unrelated.
2. List the files changed since the last release. For **each edited page**, bump the line-1
   version comment to `<!-- v$1 · <today's date> · <one-line summary> -->`.
   **Comment-scoped edits only** — never line-based. See CLAUDE.md §4 for why: on 8 of 11
   pages a comment shares its line with `<html lang="en">`, and comment bodies can contain `>`.
3. `bash scripts/validate.sh` — must be 0 failures. Fix and re-run until clean.
4. Update `README.md` with a "What's new in v$1" section.
5. Prepend a v$1 entry to `design.md`. **Append-only** — never rewrite a historical entry.
   Corrections go in the new entry.
6. Write `docs/HANDOFF_v$1_<date>.md` following the structure of the previous handoff:
   what changed, corrections found, what was verified, what's still blocked, commit message.
7. Stage everything and show the owner the diff summary plus a plain-English description of
   what visibly changes on the site. **Do not push.** Wait for an explicit go.
