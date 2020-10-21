import { Stan } from 'node-nats-streaming';
import { logger } from '../tools/logger';
import { eSubjects } from './eSubjects';

interface Event {
  subject: eSubjects;
  data: any;
}

export abstract class BasePublisher<T extends Event> {
  abstract readonly subject: T['subject'];
  constructor(protected client: Stan) {}

  publish(data: T['data']): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), err => {
        if (err) return reject(err);
        logger.info('Event published to subject:' + this.subject);
        resolve();
      });
    });
  }
}
