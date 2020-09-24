import express, { Request, Response } from 'express';
import { BadRequestError } from '../errors/badRequestError';
import { validateRequest } from '../middlewares/validateRequest';
import { UserEntity } from '../models/entities/userEntity';
import { body } from 'express-validator';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
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
  validateRequest,
  async (req: Request, res: Response) => {
    logger.info('signUp ==> New signup request recieved.');

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new BadRequestError('invalid email or password');

    const userEntity = new UserEntity({ email, password });
    const user = User.build(userEntity.getUserInfo());
    await user.save();
    logger.info('signUp ==> New user created: ' + email);

    const userJwt = jwt.sign({ id: user.id, email }, process.env.JWT_KEY!);
    req.session = { jwt: userJwt };

    res.status(201).send(user);
  }
);

export { router as signUp };
