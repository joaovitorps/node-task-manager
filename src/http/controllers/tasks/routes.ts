import type { IncomingMessage, ServerResponse } from "node:http";
import type { Task } from "../../../model/task";
import { verifyUrl } from "../../../verify-url";
import { createTask } from "./create";
import { fetchTask } from "./fetch";
import { updateTask } from "./update";

const routes = [
  {
    url: verifyUrl("/tasks/:id"),
    method: "PUT",
    function: async (req: IncomingMessage, res: ServerResponse, task: Task) => {
      await updateTask(req, res, task);
    },
  },
  {
    url: verifyUrl("/tasks"),
    method: "GET",
    function: async (req: IncomingMessage, res: ServerResponse, task: Task) => {
      await fetchTask(req, res, task);
    },
  },
  {
    url: verifyUrl("/tasks"),
    method: "POST",
    function: async (req: IncomingMessage, res: ServerResponse, task: Task) => {
      await createTask(req, res, task);
    },
  },
];

export default routes;
