# Portfolio

Chase Bianchi's personal portfolio site — www.chasebianchi.com

## Structure

Static multi-page site bundled by Vite. No framework.

```
index.html             # Homepage
work/*/index.html      # Four case studies
resume/index.html      # HTML resume; source of the PDF
src/run.js             # Homepage hero: simulated delivery run with two visitor approval gates
src/lab.js             # Homepage decision lab: one poker spot per situation, call/fold, 1,000-hand simulation and chart
src/poker.js           # Hand evaluator (globalThis.Poker), shared by lab, tests, and generator
src/lab-data.js        # Generated scenarios; regenerate with node scripts/generate-lab-scenarios.mjs
src/site.js            # Nav toggle, scroll reveals, contact draft/copy, case-study walkthrough
src/styles/site.css    # Design system (light/dark: system setting by default, header toggle overrides)
src/styles/resume.css  # Resume sheet and print rules
public/assets/         # Self-hosted fonts, favicon, resume PDF
scripts/build-resume-pdf.mjs
tests/unit/site.test.js, tests/e2e/portfolio.spec.ts
```

New pages must be added to `build.rollupOptions.input` in `vite.config.ts`.

## Commands

```
npm run dev               # Dev server (port 3000)
npm run build             # vite build (output: build/)
npm run preview           # Preview production build (port 4173)
npm test                  # Vitest (jsdom) content, link, and interaction checks
npm run test:e2e          # Playwright (Chromium + Mobile Chrome), builds and previews first
npm run build:resume-pdf  # Build, then print /resume/ to public/assets/chase-bianchi-resume.pdf
```

## Conventions

- The header, footer, and contact block are duplicated across all six HTML files. Change them everywhere; the unit tests check nav and footer consistency.
- After editing `resume/index.html`, regenerate and commit the PDF. It must be two Letter pages or fewer (the script fails otherwise).
- Colors come from the custom properties at the top of `site.css`; define both light and dark values. The theme follows `prefers-color-scheme` until the visitor uses the header toggle, which sets `data-theme` on `<html>` and stores it in `localStorage`. The inline script in each page's `<head>` applies it before first paint; keep it in all six pages. The resume sheet is always black on white.
- Fonts are self-hosted and the CSP in `vercel.json` allows only same-origin fonts and styles. Do not add external font or script hosts without updating it.
- The homepage header and hero sit in `.dark`, which is dark in both themes; everything below follows the system theme.
- The header sits in a sticky `[data-topbar]` wrapper on every page. `site.js` hides it while scrolling down, shows it on the way up, and sets `aria-current` on the nav link for the section in view. A new homepage section needs a nav link with `href="/#id"` to be tracked.
- The interactive pieces are simulations and are labelled as such on the page. Do not word them as live agents or model calls.
- Each script is a self-contained IIFE so the unit tests can run it against the parsed HTML with fake timers. Guard browser-only APIs (canvas, `matchMedia`, `IntersectionObserver`, SVG path geometry) because jsdom lacks them.
- Content must work without JavaScript: hero tickets are plain links until `run.js` takes over. The contact form opens an email draft; nothing is sent or stored.
- Case studies omit client names and private repository links.
- Keep the two GitHub links labeled "Personal" and "Slalom work".

## Git Notes

- Use personal GitHub account only (ChaseBianchi). Do NOT use ChaseBianchiSlalom credentials.
- Remote: origin -> github.com:ChaseBianchi/portfolio2022.git
- Deployed on Vercel from `master`.
