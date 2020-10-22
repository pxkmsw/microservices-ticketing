import { BaseListener, eOrderStatus, eSubjects, ExpirationCompleteEvent, NotFoundError } from '@fullstackeng/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/order';
import { OrderCancelledPublisher } from '../publishers/orderCancelledPublisher';
import { queueGroupName } from './queueGroupName';

export class ExpirationCompleteListener extends BaseListener<ExpirationCompleteEvent> {
  subject: eSubjects.ExpirationComplete = eSubjects.ExpirationComplete;
  queueGroupName = queueGroupName;
  async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
    const { orderId } = data;
    const order = await Order.findById(orderId).populate('ticket');
    if (!order) throw new NotFoundError('Order not found.');
    if (order.status == eOrderStatus.Complete) return msg.ack();

    order.set({ status: eOrderStatus.Cancelled });
    await order.save();

    const { id, version, ticket } = order;
    new OrderCancelledPublisher(this.client).publish({ id, version, ticket: { id: ticket.id } });

    msg.ack();
  }
}
