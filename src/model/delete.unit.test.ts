import { randomUUID } from "node:crypto";
import { describe, expect } from "vitest";
import { it } from "../../test/setup";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

describe("Delete task", () => {
  it("should be able to delete a task", async ({ db }) => {
    const initialTimestamp = new Date("2024-01-01T00:00:00.000Z");
    const newTask = {
      id: randomUUID(),
      title: "Task 1",
      description: "desc.",
      completed_at: null,
      created_at: initialTimestamp,
      updated_at: initialTimestamp,
    };

    db.tasks.tasks.push(newTask);

    expect(db.tasks.tasks).toHaveLength(1);

    await db.delete(newTask.id);

    expect(db.tasks.tasks).toHaveLength(0);
  });

  it("should fail with ResourceNotFoundError", async ({ db }) => {
    await expect(() => db.delete("non-existing-id")).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    );
    expect(db.tasks.tasks).toHaveLength(0);
  });
});
