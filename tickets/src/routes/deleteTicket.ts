import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from '@fullstackeng/common';
import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) throw new NotFoundError();

  if (ticket.userId !== req.currentUser!.id) throw new NotAuthorizedError();
  if (ticket.orderId) throw new BadRequestError('Can not delete a reserved ticket');

  // const updatedTicket = await Ticket.updateOne({ _id: ticket.id }, req.body);
  await ticket.remove();

  //publish en event

  return res.send(ticket);
});

export { router as deleteTicket };
