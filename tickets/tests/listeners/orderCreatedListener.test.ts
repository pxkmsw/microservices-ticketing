import { eOrderStatus, OrderCreatedEvent } from '@fullstackeng/common';
import { OrderCreatedListener } from '../../src/events/listeners/orderCreatedListener';
import { Ticket } from '../../src/models/ticket';
import { natsWrapper } from '../../src/natsWrapper';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);
  const ticket = await Ticket.build({ title: 'concert', price: 20, userId: 'sadlsdfaf' });
  await ticket.save();

  const orderId = mongoose.Types.ObjectId().toHexString();
  const data: OrderCreatedEvent['data'] = {
    id: orderId,
    version: 0,
    status: eOrderStatus.Created,
    userId: 'sdfsfsadfsaf',
    expiresAt: 'sdfadsfsf',
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};

describe('handles the incoming created order events and locking the ordered ticket', () => {
  it('sets the orderId field of the ordered ticket', async () => {
    const { listener, ticket, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket?.orderId).toEqual(data.id);
  });

  it('it acknowledges the message', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
  });

  it('it publishes a ticket updated event', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
