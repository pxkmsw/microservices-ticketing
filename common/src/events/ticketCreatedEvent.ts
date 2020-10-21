import { eSubjects } from './eSubjects';

export interface TicketCreatedEvent {
  subject: eSubjects.TicketCreated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
  };
}
