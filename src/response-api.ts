import type { ServerResponse } from "node:http";

export function jsonResponse<T>(
  response: ServerResponse,
  data: T,
  httpCode = 200,
  message = "",
) {
  response.setHeader("Content-type", "application/json");

  const obj: {
    status: number;
    message: string;
    data?: T;
  } = {
    status: httpCode,
    message: message || response.statusMessage,
  };

  if (data) {
    obj.data = data;
  }

  return response.writeHead(httpCode).end(JSON.stringify(obj));
}
