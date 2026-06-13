import type { IncomingMessage } from "node:http";

export default class Middleware {
  constructor(request: IncomingMessage) {
    const myUrl = new URL(request.url ?? "", `https://${request.headers.host}`);

    request.query = myUrl.searchParams
      .entries()
      .reduce<Record<string, string>>((objParams, params) => {
        const [key, value] = params;
        objParams[key] = value;

        return objParams;
      }, {});
  }
}
