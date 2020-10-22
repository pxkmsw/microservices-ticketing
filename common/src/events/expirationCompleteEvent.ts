import { eSubjects } from './eSubjects';

export interface ExpirationCompleteEvent {
  subject: eSubjects.ExpirationComplete;
  data: {
    orderId: string;
  };
}
