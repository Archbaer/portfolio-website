# Portfolio

Personal portfolio — matrix aesthetic, fully static SvelteKit site.

## Develop

    npm install
    npm run dev

## Build

    npm run build   # outputs static site to build/

## Deploy

Push to GitHub and import the repo in Vercel (zero config — it detects
SvelteKit; build `npm run build`, output `build`).

## Content

- Projects: `src/lib/data/projects.json` (`npm run sync-projects` reports
  drift from GitHub)
- Bio/links: `src/lib/data/site.config.js`
