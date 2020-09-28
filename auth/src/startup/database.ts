import { DatabaseConnectionError, logger } from '@fullstackeng/common';
import mongoose from 'mongoose';

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
