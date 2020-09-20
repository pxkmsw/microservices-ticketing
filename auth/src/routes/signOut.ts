import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  res.send('signout');
});

export { router as signOut };
