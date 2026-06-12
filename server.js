import http from "node:http";
import Middleware from "./src/middleware.js";
import jsonResponse from "./src/response-api.js";
import routes from "./src/routes.js";
import Task from "./src/task.js";

const task = new Task();
await task.init();

http
  .createServer(async (req, res) => {
    try {
      const { url, method } = req;

      const routeUrlFound = routes.filter((route) => {
        return route.url.test(url);
      });

      if (routeUrlFound.length === 0) {
        return jsonResponse(res, {}, 404);
      }

      const methodRouteUrl = routeUrlFound.find((route) => {
        return route.method === method;
      });

      if (!methodRouteUrl) {
        return jsonResponse(res, {}, 405);
      }

      const middleware = new Middleware(req, res);

      req.params = url.match(methodRouteUrl.url).groups;

      return methodRouteUrl.function(req, res, middleware, task);
    } catch (error) {
      console.error(error);
      return jsonResponse(res, {}, 500);
    }
  })
  .listen("8000");
