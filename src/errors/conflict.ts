import { StatusCodes } from "http-status-codes";
import { CustomError } from "./custom-error";

export class ConflictError extends CustomError {
  statusCode = StatusCodes.CONFLICT;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, ConflictError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
