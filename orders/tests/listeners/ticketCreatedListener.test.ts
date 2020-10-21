import { TicketCreatedEvent } from '@fullstackeng/common';
import { TicketCreatedListener } from '../../src/events/listeners/ticketCreatedListener';
import { natsWrapper } from '../../src/natsWrapper';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../src/models/ticket';

describe('handles the creation of the new ticket and acknowledging of nats server', () => {
  const setup = async () => {
    // Create an instance of the listener
    const listener = new TicketCreatedListener(natsWrapper.client);

    // Create a fake data event
    const id = new mongoose.Types.ObjectId().toHexString();
    const userId = new mongoose.Types.ObjectId().toHexString();
    const data: TicketCreatedEvent['data'] = {
      id,
      price: 10,
      title: 'concert',
      userId,
      version: 0,
    };

    // Create a fake message obj
    // @ts-ignore
    const msg: Message = { ack: jest.fn() };

    return { listener, data, msg };
  };

  it('creates and saves a ticket', async () => {
    const { listener, data, msg } = await setup();
    // call the onMessage func with the data obj and msg obj
    await listener.onMessage(data, msg);

    // write assertions to make sure a ticket was created
    const ticket = await Ticket.findById(data.id);
    expect(ticket).toBeDefined();
    expect(ticket!.title).toEqual(data.title);
    expect(ticket!.price).toEqual(data.price);
  });

  it('acknowledges the message', async () => {
    const { listener, data, msg } = await setup();
    // call the onMessage func with the data obj and msg obj
    await listener.onMessage(data, msg);
    // write assertions to make sure ack function is called
    expect(msg.ack).toHaveBeenCalled();
  });
});
