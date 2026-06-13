import { existsSync } from "node:fs";
import { unlink } from "node:fs/promises";
import { it as baseIt } from "vitest";
import { Task } from "../src/model/task";

export const it = baseIt.extend("db", async ({}, { onCleanup }) => {
  const filePath = `./tasks-${Date.now()}.json`;

  const db = new Task(filePath);
  await db.init();

  onCleanup(async () => {
    if (existsSync(filePath)) {
      await unlink(filePath);
    }
  });

  return db;
});
