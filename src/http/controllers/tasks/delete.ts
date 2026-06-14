import type { IncomingMessage, ServerResponse } from "node:http";
import { ValidationError } from "../../../errors/validation-error";
import type { Task } from "../../../model/task";
import { jsonResponse } from "../../../response-api";

export const deleteTask = async (
  req: IncomingMessage,
  res: ServerResponse,
  task: Task,
) => {
  const params = req.params as { id: string };

  if (!params.id) {
    throw new ValidationError();
  }

  await task.delete(params.id);

  return jsonResponse(res, null, 204);
};
