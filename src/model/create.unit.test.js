import { describe } from "node:test";
import { expect } from "vitest";
import { it } from "../../test/setup";

describe("create task", () => {
  it("should create a task", async ({ db }) => {
    await db.insert("Test 1", "Some desc");
    await db.insert("Test 2", "Some other desc");

    expect(db.tasks.tasks).toEqual([
      expect.objectContaining({ title: "Test 1" }),
      expect.objectContaining({ title: "Test 2" }),
    ]);
    expect(db.tasks.tasks).toHaveLength(2);
  });
});
