require('express-async-errors');
import express from 'express';
import { config } from './startup/config';
import { routing } from './startup/routes';
import { CustomError } from './errors/customError';
import { logger } from './startup/logger';

const app = express();

try {
  routing(app);
  config();
} catch (e: any) {
  if (e instanceof CustomError) {
    for (let err of e.serializeErrors())
      logger.error(`errorHandler ==> CustomError thrown: ${err.message}`);
  } else logger.error(`errorHandler ==> Unknown error thrown: ${e.message}`);
}

export { app };
