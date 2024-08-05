export class AppError extends Error {
  public isOperational: boolean;
  public status: string;
  constructor(public statusCode: number, public message: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.status = `${this.statusCode}`.startsWith("4") ? "fail" : "error";

    Error.captureStackTrace(this, this.constructor);
  }
}
