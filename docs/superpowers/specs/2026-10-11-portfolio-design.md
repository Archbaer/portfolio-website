# Portfolio Website — Design Spec

Date: 2026-10-11
Status: Approved (design), pending spec review

## Intent

Personal portfolio for Archbaer (software engineer). Matrix/cyberpunk green
aesthetic per provided mockup: near-black background, matrix-rain, neon green
(`#00ff41`) glow typography, thin 1px borders, letter-spaced uppercase headings,
monospace font. Projects showcased are the 6 pinned repos on
github.com/Archbaer. Very light frontend — fully static, no server, no runtime
data fetching.

## Stack

- **SvelteKit** with `@sveltejs/adapter-static`, all pages prerendered.
  Routing needed for per-project pages; SvelteKit gives it with zero runtime
  cost.
- Vite (comes with SvelteKit). No state library. No UI framework.
- Font: JetBrains Mono via Google Fonts `<link>`.
- No image assets — all visuals are CSS/canvas/SVG.

## Routes

| Route | Content |
|-------|---------|
| `/` | Single scroll page: Hero → Work grid → About → Contact → Footer |
| `/projects/[slug]` | One prerendered page per project (6 total) |
| `*` | 404 |

`src/routes/projects/[slug]/+page.js` exports `entries()` listing the 6 slugs
so every page prerenders; unknown slugs 404 at build time.

### `/` sections

1. **Nav bar** — fixed top, thin border, "PORTFOLIO" left, anchor links
   WORK / ABOUT / CONTACT right.
2. **Hero** — full-viewport. Background: matrix-rain canvas (low opacity) +
   CSS/SVG cityscape silhouette with vertical light beam. Foreground: giant
   "PORTFOLIO" in glowing green, letter-spaced; short rule line under it.
3. **Work** — section heading with rule, prev/next chevrons (decorative in
   v1; grid shows all 6). Grid of 6 project cards, 3 per row on desktop,
   1 per row on mobile. Each card: CSS-drawn visual accent (gradient + scan
   lines/glow, unique per card via CSS variant class), index number (`01`),
   name, one-liner, arrow link to `/projects/<slug>`.
4. **About** — placeholder bio text from `site.config.js`.
5. **Contact** — placeholder links (GitHub, LinkedIn, email) from
   `site.config.js`.
6. **Footer** — WORK | ABOUT | CONTACT links left; square/circle/triangle
   glyphs right (per mockup).

### `/projects/[slug]`

- Back arrow → `/` (work section anchor `#work`).
- Index number, name in glow style, one-liner.
- Long description paragraph(s) distilled from the repo README.
- Tag chips (stack).
- "View on GitHub" link.
- Same matrix aesthetic, dimmer background rain.

## Data

`src/lib/data/projects.json` — committed snapshot, no runtime fetch:

```json
{
  "slug": "dodeploy",
  "index": "03",
  "name": "DoDeploy",
  "tagline": "CLI turning docker-compose into reviewable Terraform for AWS/GCP/Azure",
  "description": "...2-4 sentences from README...",
  "tags": ["TypeScript", "Terraform", "Zod"],
  "repo": "https://github.com/Archbaer/DoDeploy",
  "language": "TypeScript"
}
```

Entries (order = display order):

| # | slug | name | tagline | tags |
|---|------|------|---------|------|
| 01 | cupcake-mononoke | cupcake_mononoke | Production ETL for multi-asset market data — Airflow-orchestrated, PostgreSQL, hash-keyed normalization | Python · Airflow · PostgreSQL |
| 02 | financehub | FinanceHub-proj | Trading dashboard — stocks/crypto, portfolio tracking, RSI/MACD/Bollinger analytics | Python · Streamlit · Flask |
| 03 | dodeploy | DoDeploy | CLI turning docker-compose into reviewable Terraform for AWS/GCP/Azure | TypeScript · Terraform · Zod |
| 04 | nn-experiments | nn_experiments | Deep learning breadth — PyTorch/Keras, CNN/LSTM, autoencoders, LangChain + RAG | Python · PyTorch · LangChain |
| 05 | credit-risk-pipeline | credit_risk_pipepline | Credit default prediction — Random Forest, MLflow tracking, FastAPI inference | Python · MLflow · FastAPI |
| 06 | caring-iggy | Caring-Iggy | Animal shelter platform — Next.js front, Kong gateway, 5 Spring Boot services, per-service PostgreSQL | TypeScript · Spring · Kong |

`src/lib/data/site.config.js` — user-editable: name, tagline, bio paragraphs,
contact links (GitHub/LinkedIn/email placeholders).

`scripts/sync-projects.mjs` (`npm run sync-projects`) — refetches the 6 repos'
metadata via GitHub API and rewrites `projects.json` (preserving hand-edited
description/tag fields where the repo still exists). Optional convenience;
site builds fine without ever running it.

## Components (`src/lib/components/`)

- `MatrixRain.svelte` — canvas katakana/digit rain. Props: `opacity`.
  `requestAnimationFrame` loop, pauses when tab hidden, disabled under
  `prefers-reduced-motion`. Canvas sized to element, resized on
  `ResizeObserver`.
- `Cityscape.svelte` — inline SVG skyline silhouette + beam, absolutely
  positioned in hero.
- `Nav.svelte`, `Hero.svelte`, `SectionHeading.svelte`, `ProjectCard.svelte`,
  `WorkGrid.svelte`, `About.svelte`, `Contact.svelte`, `Footer.svelte`.

Each component small and single-purpose; data flows in via props/`load`, no
shared state.

## Design tokens (`src/app.css`)

```
--bg: #020604;           /* near black, green tint */
--bg-panel: #041008;
--green: #00ff41;        /* matrix green */
--green-dim: #0a3d1a;
--green-glow: 0 0 8px, 0 0 24px rgba(0,255,65,.35);
--text: #c8ffd8;         /* pale green-white */
--text-dim: #5e8a6a;
--border: 1px solid #0f2f1a;
```

- Headings: uppercase, `letter-spacing: .3–.5em`, glow text-shadow.
- Body: JetBrains Mono, 14–15px.
- Cards: `--bg-panel` fill, `--border`, corner notch (clip-path) per mockup,
  hover: border brightens + glow.
- `prefers-reduced-motion`: rain disabled, glows static.

## Error handling

- Unknown project slug → SvelteKit 404 page (styled minimal, link home).
- `projects.json` malformed → build fails loudly (import-time parse). No
  runtime recovery needed; static site.
- Canvas API unavailable → hero renders without rain (progressive
  enhancement, no error UI).

## Testing

- `npm run build` succeeds; confirm 7 HTML pages in `build/` output
  (`index.html` + 6 project pages + 404).
- `npm run check` (svelte-check) clean.
- Optional Playwright smoke: home renders 6 cards, nav anchors work, one
  project page renders name + GitHub link, canvas element present. Include
  only if user asks.

## Out of scope (v1)

- Real image assets, project screenshots.
- Carousel behavior on the work grid (chevrons decorative).
- CMS, blog, analytics, contact form backend.
- Deployment setup (static `build/` works on Netlify/Vercel/GitHub Pages).

## File layout

```
src/
  app.css
  app.html
  lib/
    components/  (9 files above)
    data/projects.json
    data/site.config.js
  routes/
    +layout.svelte
    +page.svelte
    +error.svelte
    projects/[slug]/+page.svelte
    projects/[slug]/+page.js
scripts/sync-projects.mjs
svelte.config.js  (adapter-static, prerender)
```
