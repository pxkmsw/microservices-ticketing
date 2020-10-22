import { BasePublisher, eSubjects, ExpirationCompleteEvent } from '@fullstackeng/common';

export class ExpirationCompletePublisher extends BasePublisher<ExpirationCompleteEvent> {
  subject: eSubjects.ExpirationComplete = eSubjects.ExpirationComplete;
}
