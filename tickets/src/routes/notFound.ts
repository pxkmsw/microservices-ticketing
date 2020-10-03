import express from 'express';
import { NotFoundError } from '@fullstackeng/common';

const router = express.Router();

router.all('/', () => {
  throw new NotFoundError();
});

export { router as notFound };
