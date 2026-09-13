# Chase Bianchi

Personal portfolio for [www.chasebianchi.com](https://www.chasebianchi.com), using the selected Atlas design: a connected project map, four detailed case studies, professional background, and contact.

## Development

```bash
npm ci
npm run dev      # Vite development server, port 3000
npm run build    # TypeScript check and multi-page production build in build/
npm run preview  # Serve the production build, port 4173
npm test         # Vitest component, interaction, and route checks
npm run test:e2e # Playwright desktop/mobile journeys
```

The Atlas homepage and case studies are static HTML entry points. Vite bundles their CSS and small JavaScript interactions; the main portfolio content remains available without JavaScript. The existing React/TypeScript printable resume is preserved at `/resume` with its own entry point. Vercel serves the resulting multi-page build.

## Editing the site

- `index.html`: Atlas homepage, About timeline, and embedded project data used by the map inspector.
- `work/*/index.html`: four complete case studies, each with its own title, description, and canonical URL.
- `src/atlas.js`: project-map selection, mobile navigation, email drafting/copying, and the illustrative delivery walkthrough.
- `src/styles/atlas-base.css` and `src/styles/atlas.css`: shared and Atlas styles, including mobile and reduced-motion rules.
- `public/assets/`: locally hosted fonts, favicon, and the current PDF resume.
- `resume/index.html`, `src/App.tsx`, and `src/data/siteContent.ts`: the existing printable React resume and its content.

The footer distinguishes [personal GitHub](https://github.com/ChaseBianchi) from [Slalom GitHub](https://github.com/ChaseBianchiSlalom). Use personal GitHub credentials for this repository.

The contact form opens a draft in the visitor's email application. It does not send or store messages and requires no service credentials. Project-map and walkthrough interactions run locally; they do not call agents or models.

The AI Engineering transfer and Senior promotion are described as **in progress**, as provided in September 2026. Update that wording when the status changes. Case studies omit client-identifying information and private repository links.

The five-direction comparison preview remains separate; comparison controls and its `noindex` metadata are omitted from this selected portfolio.

Contact: cbianchi@protonmail.com
