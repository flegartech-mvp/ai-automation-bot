import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

// Regression coverage for the production admin-auth path: when ADMIN_TOKEN is
// set, /api/admin/* must reject requests without a valid token (Bearer header
// or ?token=) and accept those with it. The Playwright smoke suite runs in dev
// mode (no token), so this guards the production behavior specifically.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverPath = path.join(__dirname, "..", "server.js");
const port = 3211;
const base = `http://127.0.0.1:${port}`;
const TOKEN = "test-admin-token-0123456789";

let child;

async function waitForHealth(timeoutMs = 10000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`${base}/health`);
      if (res.ok) return;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 150));
  }
  throw new Error("Server did not become healthy in time.");
}

before(async () => {
  child = spawn(process.execPath, [serverPath], {
    env: {
      ...process.env,
      NODE_ENV: "production",
      PORT: String(port),
      HOST: "127.0.0.1",
      ADMIN_TOKEN: TOKEN,
      DATA_DIR: ".tmp/admin-auth-data",
      OPENAI_API_KEY: "",
    },
    stdio: "ignore",
  });
  await waitForHealth();
});

after(() => {
  child?.kill("SIGTERM");
});

test("admin summary is rejected without a token", async () => {
  const res = await fetch(`${base}/api/admin/summary`);
  assert.equal(res.status, 401);
});

test("admin summary is rejected with a wrong token", async () => {
  const res = await fetch(`${base}/api/admin/summary`, {
    headers: { Authorization: "Bearer wrong-token" },
  });
  assert.equal(res.status, 401);
});

test("admin summary is accepted with a Bearer token", async () => {
  const res = await fetch(`${base}/api/admin/summary`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.ok(body.stats, "summary should include stats");
});

test("admin summary is accepted with a ?token= query param", async () => {
  const res = await fetch(`${base}/api/admin/summary?token=${encodeURIComponent(TOKEN)}`);
  assert.equal(res.status, 200);
});

test("lead PATCH is rejected without a token", async () => {
  const res = await fetch(`${base}/api/admin/leads/does-not-exist`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "contacted" }),
  });
  assert.equal(res.status, 401);
});

test("non-admin public endpoints stay open", async () => {
  const res = await fetch(`${base}/api/health`);
  assert.equal(res.status, 200);
});
