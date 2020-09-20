import { DatabaseConnectionError } from '../errors/databaseConnectionError';
import mongoose from 'mongoose';
import { logger } from './logger';

export const dbConnect = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    logger.info('Connected to MongoDB ...');
  } catch (err) {
    throw new DatabaseConnectionError();
  }
};
