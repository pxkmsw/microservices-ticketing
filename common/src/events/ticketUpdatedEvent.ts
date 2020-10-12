import { eSubjects } from './eSubjects';

export interface TicketUpdatedEvent {
  subject: eSubjects.TicketUpdated;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
  };
}
