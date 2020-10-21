import { eSubjects } from './eSubjects';

export interface TicketUpdatedEvent {
  subject: eSubjects.TicketUpdated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
    orderId?: string;
  };
}
