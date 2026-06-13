import http from "node:http";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { ValidationError } from "./errors/validation-error";
import routes from "./http/controllers/tasks/routes";
import Middleware from "./middleware";
import { Task } from "./model/task";
import { jsonResponse } from "./response-api";

const task = new Task();
await task.init();

declare module "http" {
  interface IncomingMessage {
    params?:
      | {
          [key: string]: string;
        }
      | undefined;
    query?: Record<string, string>;
    body?: unknown;
  }
}

export const app = (task: Task) =>
  http.createServer(async (req, res) => {
    try {
      const { method } = req;

      const mid = new Middleware(req);

      const routeUrlFound = routes.filter((route) => {
        return route.url.test(mid.urlRequested.pathname);
      });

      if (routeUrlFound.length === 0) {
        return jsonResponse(res, null, 404);
      }

      const methodRouteUrl = routeUrlFound.find((route) => {
        return route.method === method;
      });

      if (!methodRouteUrl) {
        return jsonResponse(res, {}, 405);
      }

      const matchedUrl = mid.urlRequested.pathname.match(methodRouteUrl.url);

      if (!matchedUrl) {
        return jsonResponse(res, {}, 500);
      }

      req.params = matchedUrl.groups;

      const getBody = new Promise((resolve, reject) => {
        let body = "";

        req.on("data", (chunk) => {
          body += chunk;
        });

        req.on("end", () => {
          if (!body) {
            return resolve({});
          }

          return resolve(JSON.parse(body));
        });

        req.on("error", (err) => {
          return reject(err);
        });
      });

      try {
        req.body = await getBody;
      } catch (_) {
        return jsonResponse(res, {}, 400, "Invalid JSON");
      }

      return await methodRouteUrl.function(req, res, task);
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof ResourceNotFoundError
      ) {
        return jsonResponse(res, null, error.httpCode, error.message);
      }

      console.error(error);
      return jsonResponse(res, {}, 500);
    }
  });
