import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  res.send('signin');
});

export { router as signIn };
