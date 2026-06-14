import { randomUUID } from "node:crypto";
import { describe } from "node:test";
import { afterEach, beforeEach, expect, vi } from "vitest";
import { it } from "../../test/setup";
import { ValidationError } from "../errors/validation-error";

describe("Complete task", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to complete a task", async ({ db }) => {
    vi.setSystemTime(new Date(2024, 1, 1, 13));

    const task = {
      id: randomUUID(),
      title: "Task 1",
      description: "This is a description",
      completed_at: null,
      created_at: new Date(),
      updated_at: new Date(),
    };

    db.tasks.tasks.push(task);

    if (!db.tasks.tasks[0]) throw new Error();

    vi.setSystemTime(new Date(2024, 1, 1, 15));

    db.complete(task.id);

    expect(db.tasks.tasks[0].completed_at).toBeInstanceOf(Date);
    // biome-ignore lint/style/noNonNullAssertion: <test assestion>
    expect(db.tasks.tasks[0].completed_at!.getTime()).greaterThan(
      db.tasks.tasks[0].created_at.getTime(),
    );
    expect(db.tasks.tasks[0].completed_at).not.toBe(null);
  });

  it("should not be able to complete task more than once", async ({ db }) => {
    const task = {
      id: randomUUID(),
      title: "Task 1",
      description: "This is a description",
      completed_at: new Date(2024, 1, 1, 15),
      created_at: new Date(2024, 1, 1, 13),
      updated_at: new Date(2024, 1, 1, 13),
    };

    db.tasks.tasks.push(task);

    await expect(() => db.complete(task.id)).rejects.toBeInstanceOf(
      ValidationError,
    );
    expect(db.tasks.tasks[0]?.completed_at?.getTime()).toEqual(
      task.completed_at.getTime(),
    );
  });
});
