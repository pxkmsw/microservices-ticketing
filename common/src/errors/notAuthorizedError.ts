import { CustomError } from './customError';

export class NotAuthorizedError extends CustomError {
  statusCode = 401;
  constructor(private msg?: string) {
    super(msg ? msg : 'Not Authorized');
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
  serializeErrors = () => [{ message: 'Not Authorized' }];
}
