#!/usr/bin/env node

import { config } from "dotenv";
import { db } from "./database.ts";
import "./commands/index.ts";

config();

async function main() {
  await db();
}

main();
