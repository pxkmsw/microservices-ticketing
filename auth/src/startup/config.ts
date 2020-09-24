import configlib from 'config';
import { ConfigError } from '../errors/configError';

export const config = function () {
  if (!configlib.get('jwtPrivateKey')) {
    throw new ConfigError('FATAL ERROR: jwtPrivateKey is not defined.');
  }

  if (!process.env.JWT_KEY) {
    throw new ConfigError('FATAL ERROR: JWT_KEY is not defined.');
  }
};
