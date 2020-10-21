import { BaseListener, eSubjects, NotFoundError, OrderCreatedEvent } from '@fullstackeng/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publishers/ticketUpdatedPublisher';
import { QueueGroupName } from './queueGroupName';

export class OrderCreatedListener extends BaseListener<OrderCreatedEvent> {
  subject: eSubjects.OrderCreated = eSubjects.OrderCreated;
  queueGroupName: string = QueueGroupName;
  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const { ticket, id: orderId } = data;
    const fetchedTicket = await Ticket.findById(ticket.id);
    if (!fetchedTicket) throw new NotFoundError('Ticket not found');

    fetchedTicket.set({ orderId });
    await fetchedTicket.save();

    const { id, title, price, version, userId } = fetchedTicket;
    await new TicketUpdatedPublisher(this.client).publish({ id, title, price, orderId, version, userId });

    msg.ack();
  }
}
