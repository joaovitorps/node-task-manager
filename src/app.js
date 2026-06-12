import http from "node:http";
import routes from "./http/controllers/tasks/routes.js";
import Middleware from "./middleware.js";
import Task from "./model/task.js";
import jsonResponse from "./response-api.js";

const task = new Task();
await task.init();

export const app = http.createServer(async (req, res) => {
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

    await req.on("data", async (chunk) => {
      req.body = JSON.parse(Buffer.from(chunk).toString());
    });

    if (!req.body) {
      req.body = {};
    }

    return await methodRouteUrl.function(req, res, middleware, task);
  } catch (error) {
    console.error(error);
    return jsonResponse(res, {}, 500);
  }
});
