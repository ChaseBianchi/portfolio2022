# Portfolio2022

Chase Bianchi's personal portfolio site — www.chasebianchi.com

## Atlas entry points

The selected Atlas portfolio uses static Vite HTML entry points at `index.html`
and `work/*/index.html`, with `src/atlas.js` and `src/styles/atlas*.css`.
Edit those files for the homepage, project map, About timeline, shared navigation,
and case studies. Fonts and the current PDF are self-hosted in `public/assets/`.
The existing React implementation below is retained for the printable `/resume`
entry point at `resume/index.html`; it no longer renders the public homepage.
The Atlas contact form opens an email draft and does not use EmailJS.
Keep both GitHub profile links clearly labeled Personal and Work. Linking the
work profile does not change the personal-account Git credential rule below.

## Tech Stack

- **React 18** + **TypeScript** (strict mode)
- **Vite** (build tool, dev server on port 3000)
- **SCSS** with component-scoped files in `src/styles/`
- **Vitest** + **React Testing Library** for unit/integration tests (86 tests)
- **Playwright** for E2E tests (Chromium + Mobile Chrome)
- **EmailJS** for contact form (`@emailjs/browser`)
- **react-vertical-timeline-component** for Experience section
- **Inter** + **JetBrains Mono** fonts via Google Fonts
- Deployed on **Vercel**

## Commands

```
npm run dev          # Dev server (port 3000)
npm run build        # tsc + vite build (output: build/)
npm run preview      # Preview production build (port 4173)
npm test             # Unit + integration tests (Vitest)
npm run test:watch   # Tests in watch mode
npm run test:e2e     # E2E tests (Playwright, requires build)
```

## Project Structure

```
src/
  Components/         # React components (.tsx)
  Components/__tests__/ # Vitest component tests
  data/               # Structured data (projects, experience, profile, socialLinks)
  styles/             # Component-scoped SCSS + _variables.scss, _globals.scss
  test/               # Test setup + integration tests
tests/e2e/            # Playwright E2E specs
```

## Key Conventions

- **Data-driven components**: Content lives in `src/data/*.ts`, not hardcoded in JSX
- **SocialLinks**: Shared component replaces triplicated social link markup (Landing, NavDesktop, Footer)
- **Environment variables**: Use `VITE_*` prefix (not `REACT_APP_*`). Access via `import.meta.env.VITE_*`
- **SCSS**: `App.scss` imports all component SCSS files via `@use`. Variables/breakpoints in `_variables.scss`
- **Design system**: Modern dark theme with blue (#60a5fa) / violet (#a78bfa) accent gradient. Glass morphism effects. Inter font.
- **Accessibility**: Semantic HTML (header/section/footer/nav/main), aria-labels, keyboard nav on carousel, skip-to-content link, focus-visible styles
- **Resume page**: `/resume` route renders printable HTML resume (Resume.tsx). PDF at `/media/resume.pdf` for download.
- **No routing library**: Single-page with hash anchors (#projects, #experience, etc.) + pathname check for /resume

## Environment Variables

Required in `.env` for contact form:
```
VITE_serviceId=...
VITE_templateId=...
VITE_userId=...
```

## Testing Notes

- Vitest setup mocks `IntersectionObserver` (needed by react-vertical-timeline-component)
- Playwright tests exclude visual regression by default; run `--update-snapshots` to regenerate baselines
- E2E tests use `vite build && vite preview` as web server (port 4173)
- EmailJS mock pattern: `vi.mock('@emailjs/browser', () => ({ default: { sendForm: vi.fn() } }))`

## Git Notes

- Use personal GitHub account only (ChaseBianchi). Do NOT use ChaseBianchiSlalom work credentials.
- Remote: origin -> github.com:ChaseBianchi/portfolio2022.git
