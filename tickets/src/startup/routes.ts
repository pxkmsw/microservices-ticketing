import cookieSession from 'cookie-session';
import { json } from 'body-parser';
import { currentUser, errorHandler } from '@fullstackeng/common';
import { notFound } from '../routes/notFound';
import { newTicket } from '../routes/newTicket';
import { updateTicket } from '../routes/updateTicket';
import { getTicket } from '../routes/getTicket';
import { getTickets } from '../routes/getTickets';

const routing = (app: any) => {
  app.set('trust proxy', true);
  app.use(json());
  app.use(cookieSession({ signed: false, secure: process.env.NODE_ENV != 'test' }));
  app.use(currentUser);

  app.use('/api/tickets', getTicket);
  app.use('/api/tickets', getTickets);
  app.use('/api/tickets', newTicket);
  app.use('/api/tickets', updateTicket);

  app.use('*', notFound);
  app.use(errorHandler);
};

export { routing };
