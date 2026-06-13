export class ValidationError extends Error {
  httpCode = 400;

  toJSON() {
    return { message: this.message, code: this.httpCode };
  }
}
