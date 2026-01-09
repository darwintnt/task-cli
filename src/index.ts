import { db } from "./database.ts";
import "./commands/index.ts";

async function main() {
  await db();
}

main();
