import { CustomError } from './customError';

export class BadRequestError extends CustomError {
  statusCode = 400;
  constructor(private msg: string) {
    super(msg ? msg : 'Bad request');
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors = () => [{ message: this.msg ? this.msg : 'Bad request' }];
}
