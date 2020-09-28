import cookieSession from 'cookie-session';
import { json } from 'body-parser';
import { currentUser } from '../routes/currentUser';
import { signIn } from '../routes/signIn';
import { signUp } from '../routes/signUp';
import { signOut } from '../routes/signOut';
import { errorHandler } from '@fullstackeng/common';
import { notFound } from '../routes/notFound';

const routing = (app: any) => {
  app.set('trust proxy', true);
  app.use(json());
  app.use(cookieSession({ signed: false, secure: process.env.NODE_ENV != 'test' }));

  app.use('/api/users/currentuser', currentUser);
  app.use('/api/users/signout', signOut);
  app.use('/api/users/signin', signIn);
  app.use('/api/users/signup', signUp);

  app.use('*', notFound);
  app.use(errorHandler);
};

export { routing };
