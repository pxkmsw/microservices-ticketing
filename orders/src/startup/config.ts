import configlib from 'config';
import { ConfigError } from '@fullstackeng/common';

export const config = function () {
  if (!configlib.get('jwtPrivateKey')) {
    throw new ConfigError('FATAL ERROR: jwtPrivateKey is not defined.');
  }

  if (!process.env.JWT_KEY) {
    throw new ConfigError('FATAL ERROR: JWT_KEY is not defined.');
  }

  if (!process.env.MONGO_URI) {
    throw new ConfigError('FATAL ERROR: MONGO_URI is not defined.');
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new ConfigError('FATAL ERROR: NATS_CLUSTER_ID is not defined.');
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new ConfigError('FATAL ERROR: NATS_CLIENT_ID is not defined.');
  }

  if (!process.env.NATS_URL) {
    throw new ConfigError('FATAL ERROR: NATS_URL is not defined.');
  }
};
