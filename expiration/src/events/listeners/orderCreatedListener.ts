import { BaseListener, eSubjects, OrderCreatedEvent } from '@fullstackeng/common';
import { Message } from 'node-nats-streaming';
import { expirationQueue } from '../../queues/expirationQueue';
import { QueueGroupName } from './queueGroupName';

export class OrderCreatedListener extends BaseListener<OrderCreatedEvent> {
  subject: eSubjects.OrderCreated = eSubjects.OrderCreated;
  queueGroupName = QueueGroupName;
  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();

    await expirationQueue.add({ orderId: data.id }, { delay });

    msg.ack();
  }
}
