import { readFile } from "node:fs";
import { describe, it } from "node:test";
import Task from "./task.js";

describe("create task", () => {
  it("should create a task", async () => {
    const task = new Task();
    await task.insert("Test", "Desc.");
    const fileContentBuffered = await readFile("../../tasks.json");
    const tasks = JSON.parse(Buffer.from(fileContentBuffered).toString());
    console.log(tasks);
  });
});
