import express from 'express';
import { currentUser } from '@fullstackeng/common';

const router = express.Router();

router.get('/', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUser };
