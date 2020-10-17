import { eOrderStatus, NotAuthorizedError, NotFoundError, requireAuth } from '@fullstackeng/common';
import express, { Request, Response } from 'express';
import { OrderCancelledPublisher } from '../events/publishers/orderCancelledPublisher';
import { Order } from '../models/order';
import { natsWrapper } from '../natsWrapper';
const router = express.Router();

router.patch('/:id', requireAuth, async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id).populate('ticket');
  if (!order) throw new NotFoundError('No order was found');
  if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();

  order.status = eOrderStatus.Cancelled;
  await order.save();

  new OrderCancelledPublisher(natsWrapper.client).publish({
    id: order.id,
    ticket: { id: order.ticket.id! },
  });

  res.status(204).send(order);
});

export { router as cancelOrder };
