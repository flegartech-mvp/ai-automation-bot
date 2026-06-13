import { rmSync } from "node:fs";

export default async function globalSetup() {
  rmSync(".tmp/smokebomb-data", { recursive: true, force: true });
}
