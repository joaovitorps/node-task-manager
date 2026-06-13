import { describe, expect } from "vitest";
import { it } from "../../test/setup";

describe("Fetch task", () => {
  it("should be able to fetch a task", async ({ db }) => {
    await db.insert("Task 1", "desc.");
    await db.insert("Task 2", "desc.");

    const query = { title: "1" };
    const tasks = await db.fetch(query);

    expect(tasks).toEqual([expect.objectContaining({ title: "Task 1" })]);
    expect(tasks).toHaveLength(1);
  });

  it("should return all tasks", async ({ db }) => {
    await db.insert("Task 1", "desc.");
    await db.insert("Task 2", "desc.");
    await db.insert("Task 3", "desc.");

    const query = { title: "1" };
    const tasks = await db.fetch(query);

    expect(tasks).toEqual([expect.objectContaining({ title: "Task 1" })]);
  });
});
