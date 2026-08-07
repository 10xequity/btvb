---
description: Run the full pre-commit validator (77 checks)
---
Run `bash scripts/validate.sh` from the repo root.

Report the result in plain English — the owner is not a coder:
- If it passes, say so in one line with the pass count.
- If anything fails, name each failure, explain in one sentence what would visibly break
  on the live site, and propose the fix. Do not commit.

Do not summarise the passing checks individually. Nobody needs 77 lines of green.
