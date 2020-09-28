import { CustomError } from './customError';

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = 'Error connecting to database';

  constructor(private msg?: string) {
    super(msg ? msg : 'Error connecting to db');
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors = () => [{ message: this.reason }];
}
