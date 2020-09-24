import { CustomError } from './customError';

export class ConfigError extends CustomError {
  statusCode = 404;
  constructor(private msg?: string) {
    super(msg ? msg : 'Config not found');
    Object.setPrototypeOf(this, ConfigError.prototype);
  }
  serializeErrors = () => [{ message: 'Config not found.' }];
}
