import { eSubjects } from './eSubjects';
import { eOrderStatus } from './types/eOrderStatus';

export interface OrderCreatedEvent {
  subject: eSubjects.OrderCreated;
  data: {
    id: string;
    status: eOrderStatus;
    userId: string;
    expiresAt: string;
    ticket: {
      id: string;
      price: number;
    };
  };
}
