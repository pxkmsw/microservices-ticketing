import { BasePublisher, eSubjects, TicketCreatedEvent } from '@fullstackeng/common';

export class TicketCreatedPublisher extends BasePublisher<TicketCreatedEvent> {
  subject: eSubjects.TicketCreated = eSubjects.TicketCreated;
}
