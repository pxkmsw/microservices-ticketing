import { eSubjects } from './eSubjects';

export interface OrderCancelledEvent {
  subject: eSubjects.OrderCancelled;
  data: {
    id: string;
    version: number;
    ticket: {
      id: string;
    };
  };
}
