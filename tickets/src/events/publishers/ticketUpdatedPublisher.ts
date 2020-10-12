import { BasePublisher, eSubjects, TicketUpdatedEvent } from '@fullstackeng/common';

export class TicketUpdatedPublisher extends BasePublisher<TicketUpdatedEvent> {
  subject: eSubjects.TicketUpdated = eSubjects.TicketUpdated;
}
