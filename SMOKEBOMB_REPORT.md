# Smokebomb Report

Date: 2026-05-27

## Project Type

- Node.js / Express 5 backend
- Static HTML/CSS/JavaScript frontend
- Local JSON persistence in `data/messages.json` and `data/leads.json`
- OpenAI integration is optional; tested in local-demo mode without real secrets
- Package manager: npm

## Commands Run

- `npm install`
- `node --check server.js`
- `npm pkg get scripts`
- `npm test`
- `npm run dev`
- `Invoke-RestMethod http://localhost:3000/api/health`
- `Invoke-RestMethod http://localhost:3000/api/config`
- `Invoke-RestMethod http://localhost:3000/api/admin/summary`
- `Invoke-RestMethod POST http://localhost:3000/api/chat`
- `npx playwright screenshot ...`

No build, lint, or typecheck scripts existed in the original project.

## Pages Tested

- `/`
- `/admin`
- `/definitely-not-here`
- `/api/health`
- `/api/config`
- `/api/messages`
- `/api/chat`
- `/api/admin/summary`
- `/api/admin/leads/:id`
- missing `/api/*` route behavior

## Flows Tested

- Home page load
- Admin page load
- Chat input validation
- Chat message send
- Quick action buttons
- Lead capture
- Saved chat reload/refresh
- New chat session
- Admin dashboard refresh
- Admin lead status update
- API validation error for empty chat messages
- Invalid route / 404 page
- LocalStorage session persistence
- Console/page error detection
- Desktop, laptop, tablet, and mobile viewport coverage

Not applicable in this app: login/register/logout, search/filter/sort, import/export/backup, settings save.

## Screenshots Taken

- `output/playwright/home-desktop-initial.png`
- `output/playwright/home-mobile-initial.png`
- `output/playwright/admin-desktop-initial.png`
- `output/playwright/home-desktop-final.png`
- `output/playwright/home-laptop-final.png`
- `output/playwright/admin-tablet-final.png`
- `output/playwright/home-mobile-final.png`
- Playwright smoke screenshots by project in `output/playwright/*-home.png`, `*-admin.png`, and `*-404.png`

## Bugs Found

- Admin summary crashed when conversations existed without matching leads.
- Chat controls allowed duplicate/phantom local messages if the user submitted while a send was in progress.
- Empty chat submit had no visible validation error.
- Admin dashboard had no visible load error state.
- Missing routes used default Express output instead of an app-owned 404.
- `.env.example` used a placeholder API key value that could be treated as real if copied directly.
- `npm run dev` watched too broadly and restarted when local data changed.
- No repeatable smoke tests existed.

## Bugs Fixed

- Hardened `getContactFromLead` against `null` leads.
- Added send-state locking for textarea, send/new buttons, and quick actions.
- Added visible composer validation errors.
- Added admin alert rendering for dashboard load failures.
- Added JSON API 404s, HTML 404 page, and centralized error JSON responses.
- Ignored placeholder OpenAI keys and made `.env.example` blank by default.
- Changed `dev` to watch only `server.js`.
- Added isolated test data support via `DATA_DIR`.

## UI Issues Fixed

- Added focus-visible states for buttons and links.
- Added disabled states for quick action buttons and textarea.
- Added inline form error styling.
- Added a styled 404 view.
- Added a styled admin error alert.

## Tests Added

- `playwright.config.js`
- `tests/global-setup.js`
- `tests/smoke.spec.js`

The smoke suite runs 8 tests total across:

- 1440x900 desktop
- 1280x720 laptop
- 768x1024 tablet
- 390x844 mobile

Final result: `8 passed (23.0s)`.

## Files Changed

- `.env.example`
- `.gitignore`
- `package.json`
- `package-lock.json`
- `server.js`
- `public/index.html`
- `public/app.js`
- `public/admin.html`
- `public/admin.js`
- `public/styles.css`
- `playwright.config.js`
- `tests/global-setup.js`
- `tests/smoke.spec.js`
- `SMOKEBOMB_REPORT.md`

## Final Verification Result

- Build: not available
- Tests: PASS
- Browser smoke: PASS
- Mobile: PASS
- Console errors: PASS; the test suite ignores only the expected browser 404 message from the intentional 404 route check
- Dev server: PASS at `http://localhost:3000`
- Dependency audit from `npm install`: PASS, 0 vulnerabilities

## Remaining Issues

- No lint or typecheck scripts exist.
- No production authentication protects `/admin`.
- OpenAI live mode was not tested because no real API key was present.
- UI depends on external Unsplash images; offline use would lose those visuals.
