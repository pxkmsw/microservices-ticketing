import { BasePublisher, eSubjects, OrderCancelledEvent } from '@fullstackeng/common';

export class OrderCancelledPublisher extends BasePublisher<OrderCancelledEvent> {
  subject: eSubjects.OrderCancelled = eSubjects.OrderCancelled;
}
