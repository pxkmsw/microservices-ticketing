import { BasePublisher } from './BasePublisher';
import { TicketCreatedEvent } from './TicketCreatedEvent';
import { eSubjects } from './eSubjects';

export class TicketCreatedPublisher extends BasePublisher<TicketCreatedEvent> {
  subject: eSubjects.TicketCreated = eSubjects.TicketCreated;
}
