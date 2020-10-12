import { eSubjects } from './eSubjects';

export interface TicketCreatedEvent {
  subject: eSubjects.TicketCreated;
  data: {
    id: string;
    title: string;
    price: number;
  };
}
