import { app } from './app';
import { dbConnect } from './startup/database';
import { logger } from './startup/logger';

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  try {
    dbConnect();
  } catch (e: any) {
    for (let err of e.serializeErrors())
      logger.error(`errorHandler ==> CustomError thrown: ${err.message}`);
  }
  logger.info(`Listening on port ${port} ....`);
});

export default server;
