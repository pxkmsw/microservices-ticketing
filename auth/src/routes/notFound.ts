import express from 'express';
import { NotFoundError } from '../errors/notFoundError';

const router = express.Router();

router.all('/', () => {
  throw new NotFoundError();
});

export { router as notFound };
