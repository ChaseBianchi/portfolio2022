# Chase Bianchi

Personal portfolio website. Live at [www.chasebianchi.com](https://www.chasebianchi.com)

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** SCSS (component-scoped)
- **Testing:** Vitest + React Testing Library (unit/integration), Playwright (E2E)
- **Email:** EmailJS
- **Deployment:** Vercel

## Development

```bash
npm install       # Install dependencies
npm run dev       # Start dev server (port 3000)
npm run build     # TypeScript check + production build
npm run preview   # Preview production build
```

## Testing

```bash
npm test          # Run unit + integration tests (Vitest)
npm run test:watch # Run tests in watch mode
npm run test:e2e   # Run E2E tests (Playwright)
```

## Environment Variables

Create a `.env` file with:

```
VITE_serviceId=your_emailjs_service_id
VITE_templateId=your_emailjs_template_id
VITE_userId=your_emailjs_user_id
```

## Project Structure

```
src/
  Components/     # React components (.tsx)
  data/           # Structured data files
  styles/         # Component-scoped SCSS files
  test/           # Test setup and integration tests
tests/
  e2e/            # Playwright E2E tests
```

## Contact

cbianchi@protonmail.com
