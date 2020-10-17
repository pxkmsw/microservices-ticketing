import { BasePublisher, eSubjects, OrderCreatedEvent } from '@fullstackeng/common';

export class OrderCreatedPublisher extends BasePublisher<OrderCreatedEvent> {
  subject: eSubjects.OrderCreated = eSubjects.OrderCreated;
}
