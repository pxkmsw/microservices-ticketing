import { CustomError } from './customError';

export class NATSConnectionError extends CustomError {
  statusCode = 500;
  reason = 'Error connecting to NATS streaming server';

  constructor(private msg?: string) {
    super(msg ? msg : 'Error connecting to NATS streaming server');
    Object.setPrototypeOf(this, NATSConnectionError.prototype);
  }

  serializeErrors = () => [{ message: this.reason }];
}
