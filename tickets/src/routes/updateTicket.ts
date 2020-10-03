import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@fullstackeng/common';
import { body } from 'express-validator';
import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.put(
  '/:id',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) throw new NotFoundError();

    if (ticket.userId !== req.currentUser!.id) throw new NotAuthorizedError();

    // const updatedTicket = await Ticket.updateOne({ _id: ticket.id }, req.body);
    ticket.set({ title: req.body.title, price: req.body.price });
    await ticket.save();

    return res.send(ticket);
  }
);

export { router as updateTicket };
