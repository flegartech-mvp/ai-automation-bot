# Deployment — AI Automation Bot

Express 5 server with a browser chat UI and an admin dashboard. Persists chat
history and leads to **local JSON files** (`data/messages.json`, `data/leads.json`).

> ⚠️ **Not serverless-compatible.** Because it writes to the local filesystem and
> keeps an in-memory rate-limit map, this is a **long-running process** and must
> **not** be deployed as Vercel/Netlify serverless functions. Use a persistent
> container/VM with a mounted disk.

## Recommended hosting
| Priority | Platform | Why |
|----------|----------|-----|
| **Primary** | **Railway** or **Render** (web service + persistent disk) | Dead-simple Node deploy, attach a volume mounted at `/data`, set `DATA_DIR=/data`. Built-in health checks → `/health`. |
| Fallback | **Fly.io** (with a Fly Volume) or a **VPS** running the Docker image | Full control; mount a volume at `/data`. |

## Build / run
| Command | Purpose |
|---------|---------|
| `npm ci` | Install |
| `npm start` | Start production server (`node server.js`) |
| `npm test` | Playwright smoke (auto-starts server; needs `npx playwright install chromium`) |
| `docker build -t ai-automation-bot .` | Build production image |

Binds to `HOST` (default `0.0.0.0`) and `PORT` (default 3000). Health check: `GET /health`.

## Docker
```bash
docker build -t ai-automation-bot .
docker run -d -p 3000:3000 \
  -e NODE_ENV=production \
  -e ADMIN_TOKEN=$(openssl rand -hex 24) \
  -e OPENAI_API_KEY=sk-... \
  -v ai-bot-data:/data \
  ai-automation-bot
```
The image runs as non-root (`node`), has a `HEALTHCHECK` on `/health`, and stores data in the `/data` volume. Verified locally: build OK, container reports `healthy`, admin routes 401 without token / 200 with token.

## Environment variables (server-only)
See `.env.example`. Key points:
- `ADMIN_TOKEN` — **required in production** (≥16 chars). The server refuses to start without it because `/api/admin/*` exposes customer PII. Verified.
- `OPENAI_API_KEY` — optional; absent → local-demo mode (scripted replies).
- `ALLOWED_ORIGINS` — CORS allowlist; empty = same-origin only.
- `RATE_LIMIT_*` / `CHAT_RATE_LIMIT_MAX` — per-IP rate limiting (chat limit controls OpenAI spend).
- `DATA_DIR` — point at the mounted volume (`/data`) so data survives restarts.

## Hardening applied
- `/health` + `/healthz` liveness probes; existing `/api/health` status.
- Per-IP rate limiting (all `/api` + stricter `/api/chat`), in-memory.
- Security headers (nosniff, frame SAMEORIGIN, no-referrer).
- Optional CORS allowlist (same-origin by default).
- Startup env validation (production requires a strong `ADMIN_TOKEN`).
- Graceful shutdown on SIGTERM/SIGINT; `unhandledRejection` logging.
- `trust proxy` enabled in production for correct client IPs.

## Known limitations
- JSON-file storage and the in-memory limiter are **single-instance**. For horizontal scaling, move storage to a database and the limiter to a shared store/proxy.
