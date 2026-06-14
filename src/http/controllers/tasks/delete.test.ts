import { randomUUID } from "node:crypto";
import request from "supertest";
import { describe, expect } from "vitest";
import { it } from "../../../../test/setup";
import { app as createApp } from "../../../app";

describe("DELETE /tasks/:id", () => {
  it("should be able to delete the requested task by id", async ({ db }) => {
    const app = createApp(db);

    const task = {
      id: randomUUID(),
      title: "Task 1",
      description: "This is a description",
      completed_at: null,
      created_at: new Date(),
      updated_at: new Date(),
    };

    db.tasks.tasks.push(task);

    expect(db.tasks.tasks).toHaveLength(1);

    const response = await request(app)
      .delete(`/tasks/${db.tasks.tasks[0]?.id}`)
      .expect(204);

    expect(response.body).toEqual("");
    expect(db.tasks.tasks).toHaveLength(0);
  });
});
