# Toolkit-pro.in

Static site for [www.toolkit-pro.in](https://www.toolkit-pro.in) — 160 browser-based
tools for text, images, PDFs, calculators, converters, security and developers.
Everything runs locally in the visitor's browser; nothing is uploaded to a server.

Served from this repository by GitHub Pages (custom domain in `CNAME`).

## Layout

| Path | Contents |
| --- | --- |
| `index.html` | The app itself. Every tool runs here; CSS and tool code are inlined. |
| `tools/tool-<slug>.html` | One SEO landing page per tool, linking into the app at `../index.html#tool=<id>`. |
| `favicon/` | Icons and favicons referenced by the pages and by `manifest.json`. |
| `about.html`, `contact.html`, `privacy.html`, `terms.html`, `disclaimer.html` | Static content pages. |
| `404.html` | Not-found page. Also redirects the pre-reorganization `/tool-<slug>.html` addresses to `/tools/`. |
| `pdf-lib.min.js`, `pdf.min.mjs`, `pdf.worker.min.mjs` | Vendored PDF libraries, loaded on demand by the PDF tools. |
| `sw.js`, `manifest.json` | Service worker and web-app manifest, so the site installs and works offline. |
| `sitemap.xml`, `robots.txt`, `ads.txt` | Crawler and ad-network metadata. |
| `render.js`, `og-template.html`, `icon-template.html`, `og-master.png`, `icon-master.png` | Source assets used to regenerate `og-image.png` and the icons. Not part of the deployed page graph. |

The tool registry lives in `index.html` as `TOOL_SLUGS`, which maps each tool id
to its landing-page slug. Adding a tool means adding it there, adding the
matching `tools/tool-<slug>.html`, and adding its URL to `sitemap.xml`.

## Licenses

Vendored dependencies keep their own licenses: `LICENSE-pdf-lib.md` and `LICENSE-pdfjs.txt`.
