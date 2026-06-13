import { randomUUID } from "node:crypto";
import request from "supertest";
import { describe, expect } from "vitest";
import { it } from "../../../../test/setup";
import { app as createApp } from "../../../app";

describe("GET /tasks", () => {
  it("should return all tasks and 200 status code", async ({ db }) => {
    const app = createApp(db);

    db.tasks.tasks.push({
      id: randomUUID(),
      title: "Task 1",
      description: "This is a description",
      completed_at: null,
      created_at: new Date(),
      updated_at: new Date(),
    });

    const response = await request(app).get("/tasks");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      data: [
        expect.objectContaining({
          completed_at: null,
          description: "This is a description",
          title: "Task 1",
        }),
      ],
      status: 200,
    });
    expect(db.tasks.tasks).toHaveLength(1);
  });
});
