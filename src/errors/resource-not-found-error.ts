export class ResourceNotFoundError extends Error {
  httpCode = 404;

  toJSON() {
    return { message: "Resource not found!", code: this.httpCode };
  }
}
