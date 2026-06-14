import request from "supertest";
import { describe, expect } from "vitest";
import { it } from "../../../../test/setup";
import { app as createApp } from "../../../app";

describe("Import from CSV /tasks/batch-csv-import", () => {
  it("should fail if no csv received", async ({ db }) => {
    const app = createApp(db);

    const response = await request(app)
      .post(`/tasks/batch-csv-import`)
      .expect(400);

    expect(response.body).toEqual({
      message: "A CSV file is required for import.",
      status: 400,
    });
  });

  it("should be able to receive a csv", async ({ db }) => {
    const app = createApp(db);

    const response = await request(app)
      .post(`/tasks/batch-csv-import`)
      .field("title", "Task import")
      .field("description", "CSV file with tasks")
      .attach("file", "test/fixtures/tasks.csv")
      .expect(200);

    expect(response.body).toEqual({
      message: "success",
      status: 200,
    });
  });
});
