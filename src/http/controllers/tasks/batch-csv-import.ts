import type { IncomingMessage, ServerResponse } from "node:http";
import { ValidationError } from "../../../errors/validation-error";
import type { Task } from "../../../model/task";
import { jsonResponse } from "../../../response-api";

export const batchCSVImport = async (
  req: IncomingMessage,
  res: ServerResponse,
  task: Task,
) => {
  if (!req.headers["content-type"]?.includes("multipart/form-data")) {
    throw new ValidationError("A CSV file is required for import.");
  }

  await task.batchCSVImport();

  return jsonResponse(res, null, 200, "success");
};
