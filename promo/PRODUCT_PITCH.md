# AiAutomationBot — Product Pitch

## One-Sentence Pitch

Drop an AI-powered customer support chatbot into any e-commerce store in under 10 minutes — no database, no backend complexity, just configure a JSON file and go live.

## Product Description

AiAutomationBot is a self-contained AI chat widget built for small and mid-sized online stores. It connects to OpenAI's GPT-4.1-mini to answer customer questions about products, pricing, store hours, shipping policies, and order status — all driven by a single `business.json` config file you control. No database setup, no cloud infrastructure, no vendor lock-in. If you can run Node.js, you can run this.

The built-in admin dashboard gives store owners a real-time view of every conversation, collected leads, and engagement analytics. Leads land in a local `leads.json` file, protected behind token-based auth. When an API key isn't available, the bot falls back to demo mode so you can evaluate it before spending a dime on API credits.

## Top 5 Features

- **Zero-database setup** — conversations and leads persist as JSON files; no SQL, no MongoDB, no DevOps overhead
- **Fully configurable store persona** — set product catalog, prices, hours, return policy, and bot tone in one JSON file
- **Lead capture built in** — bot collects customer name/email during chat; leads auto-save and show in the admin panel
- **Admin dashboard** — live view of leads, full conversation history, and engagement analytics at `/admin`
- **Demo mode fallback** — works without an OpenAI key so you can test the full UI and flow instantly

## 30-Second Demo Flow

1. Open terminal, run `npm install && npm run dev`
2. Navigate to `http://localhost:3000` — chat widget appears on the storefront page
3. Type "What are your store hours?" — bot answers from `business.json` config
4. Type "I'd like to place an order" — bot prompts for name and email, saves lead
5. Navigate to `http://localhost:3000/admin` — enter the admin token, see the new lead and conversation appear in the dashboard

## Target Audience

- Independent e-commerce store owners who want AI customer support without hiring a developer
- Freelance web developers looking for a white-label chatbot to deploy for clients
- Agencies building Shopify or custom storefront add-ons
- Developers evaluating OpenAI API integration patterns for customer service use cases
