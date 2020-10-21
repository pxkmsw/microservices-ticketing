import { BaseListener, eSubjects, TicketCreatedEvent } from '@fullstackeng/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queueGroupName';

export class TicketCreatedListener extends BaseListener<TicketCreatedEvent> {
  subject: eSubjects.TicketCreated = eSubjects.TicketCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data;
    const ticket = Ticket.build({ id, title, price });
    await ticket.save();

    msg.ack();
  }
}
