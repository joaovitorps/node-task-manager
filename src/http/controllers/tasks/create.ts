import type { IncomingMessage, ServerResponse } from "node:http";
import { ValidationError } from "../../../errors/validation-error";
import type { Task } from "../../../model/task";
import { jsonResponse } from "../../../response-api";

export const createTask = async (
  req: IncomingMessage,
  res: ServerResponse,
  task: Task,
) => {
  try {
    const { title, description } = req.body as {
      title: string;
      description?: string;
    };

    if (!title || !description) {
      throw new ValidationError(`Missing "title" or "description"`);
    }

    await task.insert(title, description);
  } catch (error) {
    if (error instanceof ValidationError) {
      return jsonResponse(res, null, error.httpCode, error.message);
    }

    console.error(error);
    return jsonResponse(res, null, 500);
  }

  return jsonResponse(res, null, 201, "Task Created Successfully");
};
