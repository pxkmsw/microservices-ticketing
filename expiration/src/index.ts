import { natsConnect } from './startup/nats';
import { logger } from '@fullstackeng/common';

const server = () => {
  try {
    natsConnect();
  } catch (e: any) {
    for (let err of e.serializeErrors()) logger.error(`errorHandler ==> CustomError thrown: ${err.message}`);
  }
};

server();
