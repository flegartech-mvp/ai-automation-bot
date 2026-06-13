# AiAutomationBot — Safe Public Claims

## SAFE TO CLAIM

- Runs on Node.js/Express with no database — all data persisted to local JSON files
- Uses OpenAI GPT-4.1-mini to generate responses based on your store's `business.json` config
- Captures customer name and email during chat and saves them as leads automatically
- Admin dashboard at `/admin` shows leads, full conversation history, and engagement analytics
- Supports demo mode without an OpenAI API key — full UI and chat flow works out of the box for evaluation
- Bot persona, product catalog, pricing, store hours, and policies are fully customizable via a single config file
- Admin routes are protected by token-based authentication (`ADMIN_TOKEN` env variable)
- Playwright end-to-end tests are included

## DO NOT CLAIM

- Do not claim this is "production-ready" for high-traffic stores without addressing JSON file storage limits under concurrent load
- Do not claim it integrates with specific e-commerce platforms (Shopify, WooCommerce, etc.) — it's a standalone widget, not a plugin
- Do not claim the AI responses are always accurate — they depend on OpenAI API output and the quality of the config data you provide
- Do not claim enterprise-grade security — the JSON file storage is not suitable for handling sensitive customer data at scale without additional hardening
- Do not claim specific uptime, SLA, or performance benchmarks — none have been formally tested or published
