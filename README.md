# Boomtown Athletics — Website

Static site for **boomtownathletics.com**.

## Deploy (Cloudflare Pages)
Connect this repo to Cloudflare Pages:
- **Build command:** none
- **Build output directory:** `/` (root)

Pages serves clean URLs automatically (`/tournaments` → `tournaments.html`).

## Pages
index · tournaments · drop-in · womens-league · mens-league · co-ed-leagues · training · contact · facility-rules · queens-club

`queens-club.html` is `noindex` and disallowed in `robots.txt` (landing for **queensclubvb.com** → funnels to the women's league).

## Assets
Local images in `/assets/img/`. Team/venue photos and partner logos load from Wix/partner URLs.
`robots.txt` disallows `/queens-club`; `sitemap.xml` excludes it.

---
_Boomtown Athletics site · v0.6.0 · 2026-06-20_
