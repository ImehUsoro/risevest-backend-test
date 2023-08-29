import { StatusCodes } from "http-status-codes";
import { CustomError } from "./custom-error";

export class UnauthorizedError extends CustomError {
  statusCode = StatusCodes.UNAUTHORIZED;

  constructor(message?: string) {
    super(message || "Not authorized");

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
