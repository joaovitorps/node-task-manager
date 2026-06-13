import type { IncomingMessage, ServerResponse } from "node:http";
import type { Task } from "../../../model/task";
import { jsonResponse } from "../../../response-api";

export const fetchTask = async (
  req: IncomingMessage,
  res: ServerResponse,
  task: Task,
) => {
  const { query } = req;

  const validateQuery = query && Object.keys(query).length !== 0 ? query : null;

  return jsonResponse(res, await task.fetch(validateQuery));
};
