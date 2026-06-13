import type { IncomingMessage, ServerResponse } from "node:http";
import { ValidationError } from "../../../errors/validation-error";
import type { Task } from "../../../model/task";
import { jsonResponse } from "../../../response-api";

export const createTask = async (
  req: IncomingMessage,
  res: ServerResponse,
  task: Task,
) => {
  const { title, description } = req.body as {
    title: string;
    description?: string;
  };

  if (!title || !description) {
    throw new ValidationError(`Missing "title" or "description"`);
  }

  await task.insert(title, description);

  return jsonResponse(res, null, 201, "Task Created Successfully");
};
