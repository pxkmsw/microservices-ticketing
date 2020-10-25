import { DatabaseConnectionError, logger } from '@fullstackeng/common';
import mongoose from 'mongoose';

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    logger.info('Connected to MongoDB .....');
  } catch (err) {
    throw new DatabaseConnectionError();
  }
};
