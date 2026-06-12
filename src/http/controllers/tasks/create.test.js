import assert from "node:assert";
import { describe, it } from "node:test";
import request from "supertest";
import { app } from "../../../app.js";

describe("POST /tasks", () => {
  it("should return 400 when no body sent", async () => {
    const response = await request(app).post("/tasks");

    assert.deepEqual(response.status, 400);
    assert.deepEqual(response.body, {
      message: 'Missing "title" or "description"',
      status: 400,
    });
  });

  it("should return 201 info is sent correctly", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({ title: "Task 1", description: "This is a description" });

    assert.deepEqual(response.status, 201);
    assert.deepEqual(response.body, {
      message: "Task Created Successfully",
      status: 201,
    });
  });
});
