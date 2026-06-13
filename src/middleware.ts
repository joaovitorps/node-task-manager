import type { IncomingMessage } from "node:http";

export default class Middleware {
  urlRequested: URL;

  constructor(request: IncomingMessage) {
    this.urlRequested = new URL(
      request.url!,
      `https://${request.headers.host}`,
    );

    request.query = this.urlRequested.searchParams
      .entries()
      .reduce<Record<string, string>>((objParams, params) => {
        const [key, value] = params;
        objParams[key] = value;

        return objParams;
      }, {});
  }
}
