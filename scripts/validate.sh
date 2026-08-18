#!/usr/bin/env bash
# Boomtown Athletics — pre-commit validator
# v0.28.0 · 2026-08-06
#
# Run from repo root:  bash scripts/validate.sh
# Exit 0 = safe to commit. Exit 1 = something is broken; DO NOT commit.
#
# Checks every invariant that has actually broken this site before.
# Read-only. Touches nothing.

set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

FAIL=0
PASS=0
note()  { printf '  \033[2m%s\033[0m\n' "$*"; }
ok()    { PASS=$((PASS+1)); printf '  \033[32mPASS\033[0m  %s\n' "$*"; }
bad()   { FAIL=$((FAIL+1)); printf '  \033[31mFAIL\033[0m  %s\n' "$*"; }
head_() { printf '\n\033[1m%s\033[0m\n' "$*"; }

INDEXABLE="index schedule tournaments drop-in womens-league mens-league co-ed-leagues training skill-levels contact facility-rules queens-club"
ALLPAGES="$INDEXABLE library 404"

# ---------------------------------------------------------------- 1. version headers
head_ "1. Version header (exactly one comment, on line 1)"
for f in $INDEXABLE; do
  L1=$(head -c 400 "$f.html" | head -1)
  if [[ "$L1" != "<!DOCTYPE html><!-- v"* ]]; then
    bad "$f.html — line 1 does not start with <!DOCTYPE html><!-- vX.Y.Z"
  else
    ok "$f.html line 1 versioned"
  fi
  # a second version comment anywhere on lines 2-6 is the v0.27.0 trap
  if sed -n '2,6p' "$f.html" | grep -qE '<!--[^>]*v[0-9]+\.[0-9]+\.[0-9]+'; then
    bad "$f.html — stale second version comment on lines 2-6"
  fi
done

# ---------------------------------------------------------------- 2. tag balance
head_ "2. Tag balance"
for f in $ALLPAGES; do
  python3 - "$f.html" <<'PY'
import re,sys
p=sys.argv[1]; s=open(p,encoding='utf-8',errors='replace').read()
# strip script/style bodies and comments — markup inside JS strings is not document markup
s=re.sub(r'<script[^>]*>[\s\S]*?</script>','',s,flags=re.I)
s=re.sub(r'<style[^>]*>[\s\S]*?</style>','',s,flags=re.I)
s=re.sub(r'<!--[\s\S]*?-->','',s)
void={'area','base','br','col','embed','hr','img','input','link','meta','source','track','wbr'}
stack=[];bad=[]
for m in re.finditer(r'<(/?)([a-zA-Z][a-zA-Z0-9]*)([^>]*?)(/?)>',s):
    close,tag,attrs,selfc=m.group(1),m.group(2).lower(),m.group(3),m.group(4)
    if tag in void or selfc=='/': continue
    if tag in ('script','style'):
        pass
    if not close: stack.append(tag)
    else:
        if stack and stack[-1]==tag: stack.pop()
        elif tag in stack:
            while stack and stack.pop()!=tag: pass
        else: bad.append(tag)
if stack or bad:
    print(f'UNBALANCED {p}: unclosed={stack[-6:]} stray={bad[:6]}')
    sys.exit(1)
PY
  if [ $? -eq 0 ]; then ok "$f.html tags balanced"; else bad "$f.html tag imbalance"; fi
done

# ---------------------------------------------------------------- 3. inline JS syntax
head_ "3. Inline <script> syntax (node --check)"
command -v node >/dev/null || note "node not installed — SKIPPING (install node to enable)"
if command -v node >/dev/null; then
  TMP=$(mktemp -d)
  for f in $ALLPAGES; do
    python3 - "$f.html" "$TMP/$f" <<'PY'
import re,sys,os
src,out=sys.argv[1],sys.argv[2]
s=open(src,encoding='utf-8',errors='replace').read()
n=0
for m in re.finditer(r'<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)</script>',s,re.I):
    body=m.group(1)
    if not body.strip(): continue
    if 'application/ld+json' in m.group(0): continue
    n+=1; open(f'{out}.{n}.js','w',encoding='utf-8').write(body)
print(n)
PY
    BADJS=0
    for js in "$TMP/$f".*.js; do
      [ -e "$js" ] || continue
      node --check "$js" 2>/dev/null || { bad "$f.html — JS syntax error in $(basename "$js")"; BADJS=1; }
    done
    [ $BADJS -eq 0 ] && ok "$f.html inline JS parses"
  done
  rm -rf "$TMP"
fi

# ---------------------------------------------------------------- 4. JSON-LD
head_ "4. JSON-LD parses"
for f in $INDEXABLE; do
  python3 - "$f.html" <<'PY'
import re,sys,json
s=open(sys.argv[1],encoding='utf-8',errors='replace').read()
blocks=re.findall(r'<script[^>]*application/ld\+json[^>]*>([\s\S]*?)</script>',s,re.I)
for b in blocks:
    json.loads(b)
sys.exit(0)
PY
  if [ $? -eq 0 ]; then ok "$f.html JSON-LD valid"; else bad "$f.html JSON-LD does not parse"; fi
done

# ---------------------------------------------------------------- 5. renderer safety
head_ "5. Renderer safety invariants"
if grep -nE '\.innerHTML\s*=' index.html | grep -viE 'innerHTML\s*=\s*""' | grep -qiE 'caption|prunedCaption|mediaUrl|item\.|feed'; then
  bad "index.html — innerHTML assigned feed data in the IG card builder"
else ok "index.html card() free of innerHTML feed data"; fi

for f in womens-league mens-league; do
  N=$(grep -o 'innerHTML' "$f.html" | wc -l | tr -d ' ')
  # expected: MOUNT.innerHTML="" (clearing) x2 + one static skeleton span = 3
  if [ "$N" -gt 3 ]; then bad "$f.html — $N innerHTML uses (expected <=3: clearing + static skeleton)"
  else ok "$f.html innerHTML count = $N (clearing/skeleton only)"; fi
done

if grep -q 'function esc(' $ALLPAGES 2>/dev/null; then
  bad "esc() reintroduced — it was removed as dead in v0.27.0; renderers use textContent"
else ok "no esc() present"; fi

# ---------------------------------------------------------------- 6. IG CSS inset invariant
head_ "6. IG card CSS invariant (the v0.26.0 yellow-tile bug)"
note "Only index.html carries the IG grid markup + Behold feed. The other pages hold an"
note "inert partial copy of the CSS (.t but no .pl) — expected, not a bug."
for f in $INDEXABLE; do
  grep -q 'ig-card' "$f.html" || continue
  python3 - "$f.html" <<'IGPY'
import re,sys
p=sys.argv[1]; s=open(p,encoding='utf-8',errors='replace').read()
# Invariant: `.ig-card span` sets inset:auto 0 0 0 plus padding. ANY higher-specificity
# child rule that positions itself must restate all four inset sides, or it inherits
# right:0;bottom:0 and stretches across the tile (the v0.26.0 yellow-panel bug).
bad=[]
for m in re.finditer(r'(\.ig-card\s+\.[a-zA-Z0-9_-]+)\s*\{([^}]*)\}', s):
    sel, body = m.group(1), m.group(2)
    b = body.replace(' ','')
    if 'position:absolute' not in b: continue
    ins = re.search(r'inset:([^;]+)', body)
    if ins:
        if not ins.group(1).split(): bad.append(sel+' has an empty inset value')
        continue
    sides = [k for k in ('top:','right:','bottom:','left:') if k in b]
    if sides and len(sides) < 4:
        bad.append(sel+' sets only '+','.join(x.rstrip(':') for x in sides)+' — must set all four sides, or use the inset shorthand')
if bad:
    for x in bad: print(p+': '+x)
    sys.exit(1)
IGPY
  if [ $? -eq 0 ]; then ok "$f.html .ig-card child rules fully inset"; else bad "$f.html .ig-card inset invariant violated (above)"; fi
done
grep -q 'ig-card .t{position:absolute;inset:9px auto auto 9px' index.html \
  && ok "index.html .ig-card .t == inset:9px auto auto 9px" \
  || bad "index.html .ig-card .t changed from the v0.26.0 fix"
grep -q 'ig-card .pl{position:absolute;inset:9px 9px auto auto;padding:0' index.html \
  && ok "index.html .ig-card .pl == inset:9px 9px auto auto;padding:0" \
  || bad "index.html .ig-card .pl changed from the v0.26.0 fix"
IGPAGES=$(grep -l 'feeds.behold.so' *.html | wc -l | tr -d ' ')
[ "$IGPAGES" = "1" ] && ok "Behold feed wired on exactly 1 page (index.html)" || bad "Behold feed on $IGPAGES pages (expected 1)"

# ---------------------------------------------------------------- 7. constants
head_ "7. Frozen constants"
PIX=$(grep -l '120232615176120623' *.html 2>/dev/null | wc -l | tr -d ' ')
[ "$PIX" = "11" ] && ok "Meta Pixel on exactly 11 pages (queens-club indexable since v0.31.0 but deliberately untracked)" || bad "Meta Pixel on $PIX pages (expected 11 — the indexable pages except queens-club, which carries no tracker by decision)"

GIDS=$(grep -ohE 'gid=[0-9]+' *.html | sort -u | tr '\n' ' ')
EXPECT="gid=1645496886 gid=1824462476 gid=2097603747 gid=454802271 "
[ "$GIDS" = "$EXPECT" ] && ok "exactly the 4 known gids present" || bad "gid set changed: [$GIDS]"

grep -q 'feeds.behold.so/JgI7koDkWULorgLXnzkz' index.html && ok "Behold feed URL unchanged" || bad "Behold feed URL changed"
grep -rq 'hop.behold.pictures' *.html && bad "hop.behold.pictures is WRONG — host is behold.pictures" || ok "no hop.behold.pictures"
grep -q 'forms.gle/vwEY2aC4SA9SrZPQA' index.html && ok "waiver URL present on index" || note "waiver URL not on index — check if expected"
[ "$(cat CNAME 2>/dev/null | tr -d '[:space:]')" = "www.boomtownathletics.com" ] && ok "CNAME correct" || bad "CNAME is not www.boomtownathletics.com"

# ---------------------------------------------------------------- 8. links & images
head_ "8. Internal links and image paths"
python3 - <<'PY'
import re,glob,os,sys
pages=[p for p in glob.glob('*.html')]
missing=[];extless=[]
for p in pages:
    s=open(p,encoding='utf-8',errors='replace').read()
    for m in re.finditer(r'(?:src|href)="(?!https?:|//|#|mailto:|tel:|data:)([^"?#]+)',s):
        t=m.group(1)
        if t.startswith('/'): t=t[1:]
        if t.startswith('assets/') and not os.path.exists(t): missing.append((p,t))
        if re.match(r'^[a-z0-9\-]+$',t) and t not in ('','.'): extless.append((p,t))
if missing:
    print('MISSING ASSETS:'); [print('  ',a,'->',b) for a,b in sorted(set(missing))]; sys.exit(1)
if extless:
    print('EXTENSIONLESS INTERNAL LINKS (GitHub Pages needs .html):')
    [print('  ',a,'->',b) for a,b in sorted(set(extless))]; sys.exit(1)
PY
[ $? -eq 0 ] && ok "all local asset paths resolve; no extensionless internal links" || bad "broken asset path or extensionless link"

# ---------------------------------------------------------------- 9. placeholders
head_ "9. Placeholder scan"
if grep -nE 'TODO|FIXME|LOREM|PASTE_|YOUR_PIXEL_ID|XXXX|<<<|>>>' $ALLPAGES 2>/dev/null | grep -v 'paste WomensLeagues\|paste MensLeagues\|paste published'; then
  bad "placeholder text found (see above)"
else ok "no placeholders"; fi

# ---------------------------------------------------------------- 10. date-cell regression guard
head_ "10. Date parser guard"
grep -q '\\d{4}-\\d{1,2}-\\d{1,2}' womens-league.html && ok "_isISO regex intact (accepts 2026-8-25)" || bad "_isISO regex changed — 2026-8-25 style dates will break"

# ---------------------------------------------------------------- summary
printf '\n\033[1mResult: %d passed, %d failed\033[0m\n' "$PASS" "$FAIL"
[ "$FAIL" -eq 0 ] || { printf '\033[31mDO NOT COMMIT.\033[0m\n'; exit 1; }
printf '\033[32mSafe to commit.\033[0m\n'
