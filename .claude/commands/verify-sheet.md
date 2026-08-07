---
description: Read the live Google Sheet via the Drive MCP and check data hygiene
---
Read the source sheet with the Google Drive MCP — `read_file_content` on sheet ID
`1UFsYrtD1pf27f6D0m3O45oA3MUtfG2wiV9x1zyl-H4w`. It returns all tabs. It is **read-only**;
you cannot fix anything, only report.

Check and report:
- `Qualifer` → should be `Qualifier` (WomensLeagues B2, Events B2)
- Any `end_date` cell holding prose instead of an ISO date or a blank — single-day rows must be blank
- `Invitiational` sitting in the `registration_link` column (WomensLeagues J6) — belongs in notes
- Duplicate league titles, especially the four `Queens Club Sunday RP` rows
- Any `day` value that contradicts its `start_date` weekday
- **Any date cell coerced to `M/D/YYYY`** — this is the critical one. `2026-8-25` is VALID;
  `8/25/2026` breaks the Date column. See CLAUDE.md §6c. Never advise "normalising" a date.
- The `Leagues` and `Tournaments` tabs are legacy and consumed by nothing — flag if anything
  in the repo starts referencing them.

**What this cannot prove:** Drive reads the source sheet, not the published-CSV cache the
browser fetches. If the site shows stale data but the sheet is right, that is publish latency
and it can only be confirmed in a browser.

Report findings as a cell-level fix list the owner can work through. Do not report a clean
result as "the site is correct" — say the source data is correct.
