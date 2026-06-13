# AiAutomationBot — Screenshot List

## Screenshot 1

- **Filename:** `01-chat-widget-storefront.png`
- **URL/State:** `http://localhost:3000` — chat widget open, mid-conversation
- **What to show:** Customer has asked about a product; the bot has replied with price and description from the config. Chat bubble is visible in the bottom-right corner over a clean store page.
- **Why it matters:** First impression. Shows the product working in its natural context — embedded on a storefront.

---

## Screenshot 2

- **Filename:** `02-lead-capture-flow.png`
- **URL/State:** `http://localhost:3000` — chat widget, bot asking for name and email
- **What to show:** The bot's lead-capture prompt mid-flow: "What's your name?" followed by the customer's response, then "What's your email?" — showing the conversational lead collection.
- **Why it matters:** Lead capture is a core value prop. This screenshot makes it concrete without needing a video.

---

## Screenshot 3

- **Filename:** `03-admin-dashboard-leads.png`
- **URL/State:** `http://localhost:3000/admin` — Leads tab active
- **What to show:** Table of captured leads with name, email, timestamp, and source columns. At least 3–4 rows visible to show it's functional, not empty.
- **Why it matters:** Proves the admin panel exists and is useful. Key differentiator from simple chatbot widgets.

---

## Screenshot 4

- **Filename:** `04-admin-conversation-history.png`
- **URL/State:** `http://localhost:3000/admin` — Conversations tab active, one conversation expanded
- **What to show:** Full conversation thread in the admin view — customer messages on one side, bot responses on the other, with timestamp.
- **Why it matters:** Shows depth of the admin tooling. Differentiates from basic "lead form" solutions.

---

## Screenshot 5

- **Filename:** `05-business-config-file.png`
- **URL/State:** VS Code (or any editor) with `config/business.json` open
- **What to show:** The JSON config with visible fields: store name, products array with names/prices/descriptions, hours, return policy, bot tone setting.
- **Why it matters:** Shows how simple the setup is. The entire bot's knowledge lives in this one file — developers and non-technical store owners both get it immediately.
