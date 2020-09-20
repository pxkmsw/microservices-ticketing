import { CustomError } from './customError';

export class NotFoundError extends CustomError {
  statusCode = 404;
  constructor(private msg?: string) {
    super(msg ? msg : 'Not found');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serializeErrors = () => [{ message: 'Not found.' }];
}
