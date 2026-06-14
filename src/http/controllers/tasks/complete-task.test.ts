import { randomUUID } from "node:crypto";
import request from "supertest";
import { describe, expect } from "vitest";
import { it } from "../../../../test/setup";
import { app as createApp } from "../../../app";

describe("PATCH /tasks/:id/complete", () => {
  it("should be able to complete the requested task by id", async ({ db }) => {
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

    const response = await request(app)
      .patch(`/tasks/${db.tasks.tasks[0]?.id}/complete`)
      .expect(200);

    expect(response.body).toEqual({ message: "success", status: 200 });
  });
});
