# Toolkit-pro.in

Static site for [www.toolkit-pro.in](https://www.toolkit-pro.in) — 218 browser-based
tools for text, images, PDFs, calculators, converters, security and developers.
Everything runs locally in the visitor's browser; nothing is uploaded to a server.

Served from this repository by GitHub Pages (custom domain in `CNAME`).

## Layout

| Path | Contents |
| --- | --- |
| `index.html` | The app itself. Every tool runs here; CSS and tool code are inlined. |
| `tools/tool-<slug>.html` | One SEO landing page per tool, linking into the app at `../index.html#tool=<id>`. |
| `favicon/` | Icons referenced by the pages and by `manifest.json`. |
| `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` | Root copies of the same icons, for clients that request them at the root by convention. |
| `manifest.json`, `site.webmanifest` | Web-app manifest. The two files are identical; pages link both. |
| `about.html`, `contact.html`, `privacy.html`, `terms.html`, `disclaimer.html` | Static content pages. |
| `tool-<slug>.html` | 138 redirect stubs standing in for 301s, one per tool that was live at the site root before the move. Not in the sitemap. |
| `404.html` | Not-found page. Also carries a JavaScript fallback redirect from `/tool-<slug>.html` to `/tools/`. |
| `pdf-lib.min.js`, `pdf.min.mjs`, `pdf.worker.min.mjs` | Vendored PDF libraries, loaded on demand by the PDF tools. |
| `sw.js` | Service worker, so the site installs and works offline. |
| `sitemap.xml`, `robots.txt`, `ads.txt` | Crawler and ad-network metadata. |
| `render.js`, `og-template.html`, `icon-template.html`, `og-master.png`, `icon-master.png` | Source assets used to regenerate `og-image.png` and the icons. Not part of the deployed page graph. |

The tool registry lives in `index.html` as `TOOL_SLUGS`, which maps each tool id
to its landing-page slug. Adding a tool means adding it there, adding the
matching `tools/tool-<slug>.html`, and adding its URL to `sitemap.xml`.

## The root-level redirect stubs

138 tool pages were live and indexed at `/tool-<slug>.html` before they moved
into `tools/`. GitHub Pages cannot serve a real 301, and a JavaScript redirect
inside `404.html` is not enough on its own: Pages still answers **404**, so
Google reported all 138 as "Not found (404)".

Each of those addresses therefore has a small stub at the repository root that
answers **200** and carries a canonical link plus a zero-delay meta refresh to
its `tools/` location — the closest thing to a 301 available here. The stubs
are deliberately absent from `sitemap.xml`.

Keep them until the `tools/` URLs have settled in Google's index (check
Search Console), then they can be deleted.

Neither the stubs nor the `404.html` fallback redirect is part of the generated
build. If either is regenerated and overwritten, restore them, or the old URLs
start returning the not-found page again.

## Licenses

Vendored dependencies keep their own licenses: `LICENSE-pdf-lib.md` and `LICENSE-pdfjs.txt`.
