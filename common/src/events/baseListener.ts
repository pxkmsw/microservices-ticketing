import { Message, Stan, SubscriptionOptions } from 'node-nats-streaming';
import { logger } from '../tools/logger';
import { eSubjects } from './eSubjects';

interface Event {
  subject: eSubjects;
  data: any;
}

export abstract class BaseListener<T extends Event> {
  abstract readonly subject: T['subject'];
  abstract queueGroupName: string;
  protected ackWait = 5 * 1000;

  constructor(private client: Stan) {}
  abstract onMessage(data: T['data'], msg: Message): void;

  subscriptionOptions(): SubscriptionOptions {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  listen(): void {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on('message', (msg: Message) => {
      logger.info(`Message received: ${this.subject} / ${this.queueGroupName}`);
      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message): object {
    const data = msg.getData();
    return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf8'));
  }
}
