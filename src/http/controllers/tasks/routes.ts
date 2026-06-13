import type {
  IncomingMessage,
  RequestOptions,
  ServerResponse,
} from "node:http";
import type Middleware from "../../../middleware";
import type { Task } from "../../../model/task";
import { jsonResponse } from "../../../response-api";
import { verifyUrl } from "../../../verify-url";
import { createTask } from "./create";

const routes = [
  {
    url: verifyUrl("/tasks/:id"),
    method: "PUT",
    function: async (req: RequestOptions, res: ServerResponse, task: Task) => {
      const { query, params } = req;

      return jsonResponse(
        res,
        await task.fetch(Object.keys(query).length !== 0 ? query : null),
      );
    },
  },
  {
    url: verifyUrl("/tasks"),
    method: "GET",
    function: async (req, res, middleware, task) => {
      const { query } = req;

      return jsonResponse(
        res,
        await task.fetch(Object.keys(query).length !== 0 ? query : null),
      );
    },
  },
  {
    url: verifyUrl("/tasks"),
    method: "POST",
    function: async (
      req: IncomingMessage,
      res: ServerResponse,
      _: Middleware,
      task: Task,
    ) => {
      await createTask(req, res, task);
    },
  },
];

export default routes;
