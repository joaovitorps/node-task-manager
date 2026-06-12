import jsonResponse from "../../../response-api.js";
import verifyUrl from "../../../verify-url.js";
import { createTask } from "./create.js";

const routes = [
  {
    url: verifyUrl("/tasks/:id"),
    method: "PUT",
    function: async (req, res, middleware, task) => {
      const { query, params } = req;

      console.log(params.id);

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
    function: async (req, res, _, task) => {
      await createTask(req, res, task);
    },
  },
];

export default routes;
