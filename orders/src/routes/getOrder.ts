import { NotAuthorizedError, NotFoundError, requireAuth } from '@fullstackeng/common';
import express, { Request, Response } from 'express';
import { Order } from '../models/order';
const router = express.Router();

router.get('/:id', requireAuth, async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id).populate('ticket');
  if (!order) throw new NotFoundError('No order was found.');
  if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();

  res.send(order);
});

export { router as getOrder };
