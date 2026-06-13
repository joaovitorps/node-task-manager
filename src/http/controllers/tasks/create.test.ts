import request from "supertest";
import { describe, expect } from "vitest";
import { it } from "../../../../test/setup";
import { app as createApp } from "../../../app";

describe("POST /tasks", () => {
  it("should return 400 when no body sent", async ({ db }) => {
    const app = createApp(db);
    const response = await request(app).post("/tasks");

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      message: 'Missing "title" or "description"',
      status: 400,
    });
    expect(db.tasks.tasks).toHaveLength(0);
  });

  it("should return 201 info is sent correctly", async ({ db }) => {
    const app = createApp(db);
    const response = await request(app)
      .post("/tasks")
      .send({ title: "Task 1", description: "This is a description" });

    expect(response.status).toEqual(201);
    expect(response.body).toEqual({
      message: "Task Created Successfully",
      status: 201,
    });
    expect(db.tasks.tasks).toHaveLength(1);
  });
});
