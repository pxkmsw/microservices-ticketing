import { Message } from 'node-nats-streaming';
import { BaseListener } from './baseListener';
import { eSubjects } from './eSubjects';
import { TicketCreatedEvent } from './TicketCreatedEvent';

export class TicketCreatedListener extends BaseListener<TicketCreatedEvent> {
  readonly subject: eSubjects.TicketCreated = eSubjects.TicketCreated;
  queueGroupName: string = 'payments-service';
  onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
    console.log('Message received from:', msg.getSubject());
    console.log('Message number:', msg.getSequence());
    console.log('data:', msg.getData());
    msg.ack();
  }
}
