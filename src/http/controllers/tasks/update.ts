import type { IncomingMessage, ServerResponse } from "node:http";
import { ValidationError } from "../../../errors/validation-error";
import type { Task, TaskUpdate } from "../../../model/task";
import { jsonResponse } from "../../../response-api";

export const updateTask = async (
  req: IncomingMessage,
  res: ServerResponse,
  task: Task,
) => {
  const params = req.params as { id: string };
  const body = req.body as TaskUpdate;

  if (!params.id) {
    throw new ValidationError(`Missing ":id"`);
  }

  await task.update(body, params.id);

  return jsonResponse(res, null, 204);
};
