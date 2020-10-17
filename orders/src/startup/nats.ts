import { NATSConnectionError, logger } from '@fullstackeng/common';
import { natsWrapper } from '../natsWrapper';

export const natsConnect = async () => {
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID!,
      process.env.NATS_CLIENT_ID!,
      process.env.NATS_URL!
    );
    logger.info('Connected to NATS ...');

    natsWrapper.client.on('close', () => {
      logger.info('NATS connecton closed!');
      process.exit();
    });

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
  } catch (err) {
    throw new NATSConnectionError();
  }
};
