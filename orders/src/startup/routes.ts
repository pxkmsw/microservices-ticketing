import cookieSession from 'cookie-session';
import { json } from 'body-parser';
import { currentUser, errorHandler } from '@fullstackeng/common';
import { notFound } from '../routes/notFound';
import { newOrder } from '../routes/newOrder';
import { getOrder } from '../routes/getOrder';
import { getOrders } from '../routes/getOrders';
import { cancelOrder } from '../routes/cancelOrder';

const routing = (app: any) => {
  app.set('trust proxy', true);
  app.use(json());
  app.use(cookieSession({ signed: false, secure: process.env.NODE_ENV != 'test' }));
  app.use(currentUser);

  app.use('/api/orders', getOrder);
  app.use('/api/orders', getOrders);
  app.use('/api/orders', newOrder);
  app.use('/api/orders', cancelOrder);

  app.use('*', notFound);
  app.use(errorHandler);
};

export { routing };
