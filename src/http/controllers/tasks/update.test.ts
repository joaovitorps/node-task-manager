import { randomUUID } from "node:crypto";
import request from "supertest";
import { describe, expect } from "vitest";
import { it } from "../../../../test/setup";
import { app as createApp } from "../../../app";

describe("PUT /tasks/:id", () => {
  it("should be able to update the requested task by id", async ({ db }) => {
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

    const updatedTask = {
      title: "Title updated",
      description: "Desc updated",
      completed_at: null,
    };

    const response = await request(app)
      .put(`/tasks/${db.tasks.tasks[0]?.id}`)
      .send(updatedTask)
      .expect(204);

    expect(response.body).toEqual("");
  });
  it("should return error if unexisting id sent", async ({ db }) => {});
});
