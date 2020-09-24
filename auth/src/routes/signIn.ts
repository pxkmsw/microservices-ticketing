import express, { Request, Response } from 'express';
import { validateRequest } from '../middlewares/validateRequest';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { User } from '../models/user';
import { BadRequestError } from '../errors/badRequestError';
import { Password } from '../tools/password';

const router = express.Router();

router.post(
  '/',
  [
    body('email').isEmail().withMessage('Email must be valid.'),
    body('password').trim().notEmpty().withMessage('You must supply a password.'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) throw new BadRequestError('Invalid credentials');

    const passwordMatch = await Password.compare(existingUser.password, password);
    if (!passwordMatch) throw new BadRequestError('Invalid credentials');

    const userJwt = jwt.sign({ id: existingUser.id, email }, process.env.JWT_KEY!);
    req.session = { jwt: userJwt };

    res.status(201).send(existingUser);
  }
);

export { router as signIn };
