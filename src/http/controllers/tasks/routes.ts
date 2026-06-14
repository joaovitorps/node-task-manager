import type { IncomingMessage, ServerResponse } from "node:http";
import type { Task } from "../../../model/task";
import { verifyUrl } from "../../../verify-url";
import { completeTask } from "./complete-task";
import { createTask } from "./create";
import { deleteTask } from "./delete";
import { fetchTask } from "./fetch";
import { updateTask } from "./update";

const routes = [
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
  {
    url: verifyUrl("/tasks/:id"),
    method: "PUT",
    function: async (req: IncomingMessage, res: ServerResponse, task: Task) => {
      await updateTask(req, res, task);
    },
  },
  {
    url: verifyUrl("/tasks/:id/complete"),
    method: "PATCH",
    function: async (req: IncomingMessage, res: ServerResponse, task: Task) => {
      await completeTask(req, res, task);
    },
  },
  {
    url: verifyUrl("/tasks/:id"),
    method: "DELETE",
    function: async (req: IncomingMessage, res: ServerResponse, task: Task) => {
      await deleteTask(req, res, task);
    },
  },
];

export default routes;
