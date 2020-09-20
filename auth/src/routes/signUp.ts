import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/badRequestError';
import { RequestValidationError } from '../errors/requestValidationError';
import { User } from '../models/user';
import { logger } from '../startup/logger';

const router = express.Router();

router.post(
  '/',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    logger.info('signUp ==> New signup request recieved.');

    if (!errors.isEmpty()) throw new RequestValidationError(errors.array());

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new BadRequestError('invalid email or password');

    const user = User.build({ email, password });
    await user.save();
    logger.info('signUp ==> New user created: ' + email);

    res.status(201).send(user);
  }
);

export { router as signUp };
