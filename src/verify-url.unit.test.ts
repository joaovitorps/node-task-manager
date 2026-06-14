import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { verifyUrl } from "./verify-url";

describe("Verify URL", () => {
  it("should be able to match a giver URL via regex", () => {
    const resut = verifyUrl("/tasks");
    expect(resut.test(`/tasks/${randomUUID()}/complete`)).toBe(false);
  });
});
