import { TicketCreatedPublisher } from './events/TicketCreatedPublisher';
import nats from 'node-nats-streaming';

console.clear();

const client = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

client.on('connect', async () => {
  console.log('Publisher connected to NATS');

  const publisher = new TicketCreatedPublisher(client);
  try {
    await publisher.publish({ id: '12345', title: 'concert', price: 12.99 });
  } catch (err) {
    console.error(err);
  }
});
