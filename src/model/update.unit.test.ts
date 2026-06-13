import { randomUUID } from "node:crypto";
import { describe, expect } from "vitest";
import { it } from "../../test/setup";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

describe("Update task", () => {
  it("should be able to update a task", async ({ db }) => {
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

    expect(db.tasks.tasks[0]?.title).toEqual(newTask.title);
    expect(db.tasks.tasks[0]?.description).toEqual(newTask.description);
    expect(db.tasks.tasks[0]?.updated_at).toEqual(
      db.tasks.tasks[0]?.created_at,
    );

    const updatedTask = {
      title: "new Title",
      description: "new desc",
      completed_at: null,
    };

    await db.update(updatedTask, newTask.id);

    expect(db.tasks.tasks[0]?.title).toEqual(updatedTask.title);
    expect(db.tasks.tasks[0]?.description).toEqual(updatedTask.description);
    expect(db.tasks.tasks[0]?.created_at).toEqual(initialTimestamp);
    expect(db.tasks.tasks[0]?.updated_at.getTime()).toBeGreaterThan(
      initialTimestamp.getTime(),
    );
  });

  it("should fail with ResourceNotFoundError", async ({ db }) => {
    await expect(() =>
      db.update(
        { title: "new Title", description: "new desc", completed_at: null },
        "non-existing-id",
      ),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
    expect(db.tasks.tasks).toHaveLength(0);
  });
});
