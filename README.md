# AI E-commerce Automation Messages Bot

A configurable AI support bot for online stores. It answers product and order questions, collects customer order leads, saves conversations locally, and gives the store owner an admin dashboard.

## Run The Project

```bash
npm install
npm run dev
```

Open:

- Chat UI: `http://localhost:3000`
- Admin dashboard: `http://localhost:3000/admin`

## Admin Dashboard Access

The admin dashboard and its API (`/api/admin/*`) expose customer PII (names,
emails, phones). In production the server **requires** an `ADMIN_TOKEN` and the
routes return `401` without it. Open the dashboard with the token in the URL:

```text
http://localhost:3000/admin?token=YOUR_ADMIN_TOKEN
```

The token is captured into `sessionStorage` and stripped from the URL, so it is
not left in browser history. If you open `/admin` without it, the page prompts
for the token. In local dev (no `ADMIN_TOKEN`) the dashboard is open.

## Add Your OpenAI API Key

Create a `.env` file:

```env
OPENAI_API_KEY=your_real_key_here
OPENAI_MODEL=gpt-4.1-mini
PORT=3000
```

Restart the server after editing `.env`.

Without an API key, the app runs in local demo mode so chat, lead saving, and the admin dashboard can still be tested.

## Edit The Store Config

Change `config/business.json` to customize:

- business name and description
- products and prices
- opening hours
- contact info
- location
- tone of voice
- policies and FAQs

The backend reads this config when requests come in, and the AI system prompt is built from it.

## Lead Collection

When a customer shows buying or order intent, the bot saves a lead in `data/leads.json`.

Captured fields include:

- customer name
- email or phone
- product/order need
- order number when mentioned
- preferred date/time when mentioned
- notes
- status

Statuses can be changed in `/admin`:

- `new`
- `contacted`
- `completed`
- `cancelled`

## Customize For Different Niches

For another e-commerce store, edit `config/business.json` with the new catalog, policies, and tone.

For a different small business, replace `products` with services, update the policies/FAQs, and change the tone. The same lead capture and admin dashboard still work.

## Scripts

| Command                | Purpose                                                    |
| ---------------------- | ---------------------------------------------------------- |
| `npm run dev`          | Start with auto-reload on `server.js` changes              |
| `npm start`            | Start the production server                                |
| `npm run lint`         | ESLint over server, client, and tests                      |
| `npm run format`       | Auto-format with Prettier                                  |
| `npm run format:check` | Verify formatting (used in CI)                             |
| `npm run test:auth`    | Node-test suite for production admin-token auth            |
| `npm test`             | Playwright smoke tests across desktop/laptop/tablet/mobile |

> If the bundled Playwright Chromium cannot be installed on your OS, run the
> smoke tests against an installed Google Chrome with `PW_CHANNEL=chrome npm test`.

## Useful API Routes

- `GET /api/health`
- `GET /api/config`
- `POST /api/chat`
- `GET /api/messages`
- `GET /api/admin/summary`
- `PATCH /api/admin/leads/:id`

---

Made by FlegarTech. If this project helped you, you can [support development](https://paypal.me/TiniFlegar).
