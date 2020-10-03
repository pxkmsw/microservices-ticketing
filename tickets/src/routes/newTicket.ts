import { requireAuth, validateRequest } from '@fullstackeng/common';
import { body } from 'express-validator';
import express, { Request, Response } from 'express';
import { TicketEntity } from '../models/entities/ticketEntity';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.post(
  '/',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const ticketEntity = new TicketEntity({ price, title, userId: req.currentUser!.id });
    const ticket = Ticket.build(ticketEntity.getTicketInfo());
    await ticket.save();

    res.status(201).send(ticket);
  }
);

export { router as newTicket };
