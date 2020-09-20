import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('currentUser');
});

export { router as currentUser };
