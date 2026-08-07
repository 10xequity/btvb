# Boomtown Athletics — Design System

**Version** v0.28.0 · **Created** 2026-08-06 · **Updated** 2026-08-06 · **Status** Active
**Supersedes** nothing — this is the first written design reference for `btvb`.
**Source** Extracted from `main` at v0.27.0 by frequency-analysing all 11 indexable pages.
Every value below was read out of the actual files, not designed here.

---

## 0. The thing to understand first

**There are almost no CSS custom properties.** The only `:root` variables in the whole site are
two easing curves:

```css
:root{--ease-out:cubic-bezier(.23,1,.32,1);--ease-io:cubic-bezier(.77,0,.175,1)}
```

Everything else — every colour, every size — is a **hardcoded literal, copy-pasted into all 11
pages.** This document *is* the token system, because the code doesn't have one.

**Practical consequence:** changing the brand yellow means a find-and-replace across 11 files
(365 occurrences of `#F8C400` alone). Do not change a colour in one page and call it done.
`bash scripts/validate.sh` will not catch a colour drift — only your own grep will.

`[INFERENCE]` Introducing real CSS variables would be the single highest-leverage refactor
available, but it touches all 11 pages at once and is a visual-regression risk with no test
coverage. It is not urgent. Don't do it as a side effect of another task.

---

## 1. Colour

Counts are total occurrences across the 11 indexable pages. A count of exactly 11 means the
value appears once per page — i.e. it lives in the shared duplicated block.

### Brand
| Swatch | Hex | Uses | Role |
|---|---|---|---|
| ⬛🟡 | `#F8C400` | 365 | **The brand yellow.** Headings, buttons, borders, accents. The site's single dominant colour. |
| 🟡 | `#e6a92b` | 101 | Muted gold. Eyebrow text (`.ey`), table headers, `.detail` emphasis. Always paired with a soft glow: `text-shadow:0 0 12–14px rgba(230,169,43,.4)`. |
| 🟡 | `#ffe27a` | 33 | Light gold — gradient start, `.topbar` and `.sband` only. |
| 🟠 | `#e0a312` | 33 | Deep gold — gradient end, same two components. |
| 🟡 | `#ffd633` | 22 | Hover/brighten variant. |
| 🟡 | `#f6c733`, `#eec51d` | 4, 1 | One-off variants. `[INFERENCE]` drift, not intent — prefer `#F8C400`. |

### Surfaces (dark, near-black, layered)
| Hex | Uses | Role |
|---|---|---|
| `#0a0a0b` | 59 | **Page background** (`body`). |
| `#060607` | 11 | Footer — the darkest surface. |
| `#08080a`, `#0e0e10` | 11 each | Deep section bands. |
| `#121214` | 66 | **Card and band background.** The workhorse raised surface. |
| `#141417`, `#1b1b1e`, `#1d1d20` | 17, 22 | Slightly raised variants. |
| `#1b1b1f` → `#26262c` | 4, 2 | Skeleton-loader shimmer gradient only. |
| `#2a2a2e` | 11 | Highest raised surface / hover. |

### Text
| Hex | Uses | Role |
|---|---|---|
| `#fff` | 287 | Body and heading text on dark. |
| `#111` | 100 | Text on yellow (buttons, `.topbar`, the `.t` chip). |
| `#cfcdc7` | 11 | Secondary body text. |
| `#9a988f` | 3 | Muted / "Coming soon" (`.mut`, via `var(--mut,#9a988f)`). |
| `#000` | 22 | Shadows and overlays, not text. |

### Semantic
| Hex | Role |
|---|---|
| `#7fe07f` on `#1d3b1d` | Success / open status |
| `#F8C400` on `#3a3206` / `#1c1808` | Warning / highlighted status |

### Borders and overlays
Never a solid hex — always translucent white so it works on any surface:
- Hairline: `1px solid rgba(255,255,255,.12)` — the default everywhere
- Emphasis: `rgba(255,255,255,.2)` (table header underline)
- Row divider: `rgba(255,255,255,.1)`
- Gold border: `1px solid rgba(230,169,43,.5)` (`.chip`)
- Sticky header: `rgba(10,10,11,.92)` + `backdrop-filter:blur(10px)`

**Accessibility.** `#fff` on `#0a0a0b` is ~19:1 — comfortably AAA. `#111` on `#F8C400` is
~11:1 — AAA. `#e6a92b` on `#0a0a0b` is ~8:1 — AAA for body, fine for the small-caps eyebrow.
`#9a988f` on `#121214` is ~7:1. `[FACT]` No current pairing fails WCAG AA. Keep it that way:
if you introduce a colour, check it before shipping.

---

## 2. Type

Two families, loaded from Google Fonts in one request:

```html
fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;600;700;800&display=swap
```

**Anton** — display only. `font-weight:400` (it has one weight), `text-transform:uppercase`,
`line-height:.97`, `letter-spacing:.5px`. Used on `h1`–`h3` and `.sband b`. Headings are yellow.

**Archivo** — everything else. `font-family:"Archivo",system-ui,sans-serif`. Weights 400–800.

**Monospace** — `ui-monospace,SFMono-Regular,Menlo,monospace`, used twice, incidental.

### Scale — all fluid, all `clamp()`
| Element | Size |
|---|---|
| `body` | `clamp(16px,1.05vw,17px)` · `line-height:1.65` |
| `h1` | `clamp(46px,9.5vw,108px)` |
| `h2` | `clamp(32px,5vw,56px)` |
| `.lead` | `clamp(17px,1.4vw,20px)` · `max-width:62ch` |
| `.sub` | `clamp(17px,1.5vw,21px)` · `font-weight:700` · `max-width:60ch` |
| `.ey` (eyebrow) | `12px` · `700` · `letter-spacing:.16em` · uppercase · `#e6a92b` |
| `.chip` | `13px` · `700` · `letter-spacing:.03em` · uppercase |
| `th` | `12px` · `700` · `letter-spacing:.1em` · uppercase · `#e6a92b` |
| `.btn` label | `14px` · `700` · `letter-spacing:.04em` · uppercase |
| `.topbar` | `12.5px` · `700` · `letter-spacing:.05em` · uppercase |
| `.mut`, `.pcap`, `.lr-note` | `12.5px` |

**Rule of thumb:** uppercase + heavy weight + wide letter-spacing = a label. Sentence case +
400/600 + `1.65` leading = prose. Don't mix them.

**Measure is capped** — `60ch`/`62ch` on `.sub` and `.lead`. Keep that when adding body copy.

---

## 3. Layout and spacing

```css
.wrap    { max-width:1140px; margin:0 auto; padding-inline:clamp(20px,5vw,40px) }
.section { padding-block:clamp(54px,8vw,96px) }
```

Every page is `.wrap` inside `.section`. There is no grid framework — layouts are
`display:flex` / `display:grid` declared per component.

**Spacing values in use:** 8, 9, 10, 12, 14, 18, 24, 52 px. Effectively a loose scale of
`~8px` steps with `9px` and `14px` as recurring odd exceptions. There is no spacing token.

**Radii:** `3px` (`.btn`) · `4px` (`.chip`, `.t`) · `6px` (`.card`, `.ig-card`, `.sk`) ·
`7px` (`.btn-sm`) · `8px` (`.pbox`, photos) · `50%` (circles). `[INFERENCE]` The `3`/`7` pair
is drift; `6px` and `8px` are the intended defaults.

### Breakpoints — max-width, and inconsistent
`900px`, `880px`, `840px`, `820px`, `760px`, `620px`, `560px`, `480px`, plus one
`min-width:901px` for the desktop dropdown menus.

`[FACT]` Eight different mobile breakpoints. `[INFERENCE]` These accreted per-component
rather than being designed. **Do not add a ninth.** When you need a mobile rule, reuse the
nearest existing value — `900px` for layout, `560px` for typography.

Also honoured: `prefers-reduced-motion` (8 blocks), `hover:hover and pointer:fine`.

---

## 4. Components

### Buttons
```css
.btn-ghost { display:inline-flex; align-items:center; gap:.5em; font-weight:700;
             font-size:14px; letter-spacing:.04em; text-transform:uppercase;
             padding:14px 24px; border-radius:3px; cursor:pointer;
             transition:.18s; white-space:nowrap }
.btn       { background:#F8C400; color:#111; border:2px solid #F8C400 }   /* primary */
.btn-sm    { padding:6px 12px; font-size:12px; border-radius:7px }        /* in tables */
```
`.btn-ghost` is the *base*; `.btn` is the filled variant layered on top. Both press with
`transform:scale(.97)` on `:active`.

### Card
```css
.card { display:flex; flex-direction:column; gap:8px; padding:24px;
        background:#121214; border:1px solid rgba(255,255,255,.12);
        border-radius:6px; transition:.18s; min-height:188px }
```

### Header / nav
`.head` is sticky, `z-index:60`, `rgba(10,10,11,.92)` + `blur(10px)`. Desktop dropdowns
(`.has-sub` → `.submenu`) appear above `901px`; below that a `.burger` toggles `#m` with
`aria-expanded` kept in sync. Nav: Tournaments ▾ · Drop-In ▾ · Training ▾ · Leagues ▾ ·
Store ↗ · Contact.

`.topbar` sits above the header — a gold gradient announcement strip
(`linear-gradient(135deg,#ffe27a,#F8C400 40%,#e0a312)`), `#111` text, uppercase.

### Hero
```css
.hero { aspect-ratio:2000/1120; min-height:360px; max-height:720px;
        display:flex; flex-direction:column; align-items:center;
        justify-content:center; text-align:center; isolation:isolate }
```
Text over photography always carries `text-shadow:0 2px 16px rgba(0,0,0,.85),0 1px 4px rgba(0,0,0,.9)`.
**Keep that shadow** — without it the yellow `h1` is unreadable on light photos.

### Schedule table (`table.sched`)
Header cells gold, uppercase, `.1em` tracking. Rows divided by `rgba(255,255,255,.1)`.
While loading, three `.skel` rows show a shimmering `.sk` bar. Empty register cells render a
`.mut` "Coming soon" span rather than a dead link.

### Partner tiles
```css
.plogos { display:flex; flex-wrap:wrap; gap:18px 14px; justify-content:center }
.ptile  { display:flex; flex-direction:column; align-items:center; gap:9px; width:150px }
.pbox   { height:84px; width:100%; background:#fff; border-radius:8px;
          display:grid; place-items:center; padding:12px }
```
`.pbox` is **white on purpose** — partner logos are supplied for light backgrounds. Grouped
into `.ptier` bands (sport / leagues / facility / community / gear). Every logo `<img>` carries
an `onerror` that swaps in a text fallback, which is why the 22 external hotlinks degrade
gracefully rather than showing broken images.

### Instagram grid — `index.html` only
```css
.ig-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px }
.ig-card { position:relative; aspect-ratio:1; border-radius:6px; overflow:hidden;
           border:1px solid rgba(255,255,255,.12) }
```
See `CLAUDE.md` §6b before touching any `.ig-card` child rule. **The inset invariant is not
optional and it has already caused one production incident.**

---

## 5. Motion

```css
--ease-out: cubic-bezier(.23,1,.32,1)     /* the default; a strong decelerate */
--ease-io:  cubic-bezier(.77,0,.175,1)    /* symmetric in-out */
```

| Duration | Where |
|---|---|
| `.12s` | press feedback (`transform`) |
| `.18s` | the default hover/state transition |
| `.25s` | back-to-top fade |
| `.5s` | scroll reveal |

**Scroll reveal:** an `IntersectionObserver` at `threshold:.1`, `rootMargin:0px 0px -8% 0px`
adds `.in` to `.section`/`.cine`, animating `opacity 0→1` and `translateY(16px)→0`, then
unobserves. It **returns early if `prefers-reduced-motion` matches**, so the class is never
added and content is never hidden from users who opt out. Preserve that early return —
without it, reduced-motion users get invisible sections.

**Back-to-top** (`#toTop`): 46px gold-bordered circle, appears past `scrollY>520`, respects
reduced motion by switching `scrollTo` to `behavior:"auto"`.

**Shine sweep** (`.topbar`, `.sband`): a 5.5s infinite diagonal gradient translate. Decorative,
`pointer-events:none`.

---

## 6. Accessibility baseline — maintain this

- Keyboard-navigable controls; visible focus rings.
- ARIA: `aria-expanded` on the burger and dropdowns, `aria-label` on icon-only controls
  (`#toTop` is `aria-label="Back to top"`).
- `prefers-reduced-motion` honoured in 8 places — every animation has an opt-out.
- `<img>` carries explicit `width`/`height` to avoid layout shift.
- Partner logos have `onerror` text fallbacks.
- All current colour pairings clear WCAG AA. Check any new one.

---

## 7. If you are adding a page

Copy the nearest existing page and strip its body. That is the intended workflow — there is no
template and no include mechanism. Then verify:

- [ ] Line 1 version comment (`CLAUDE.md` §4)
- [ ] Meta description, canonical, Open Graph, JSON-LD — all self-URLs end in `.html`
- [ ] Meta Pixel `120232615176120623` **if the page is indexable**, omitted if not
- [ ] Added to `sitemap.xml`, or excluded in `robots.txt`
- [ ] `bash scripts/validate.sh` → 0 failures
