import { TicketUpdatedEvent } from '@fullstackeng/common';
import { natsWrapper } from '../../src/natsWrapper';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../src/models/ticket';
import { TicketUpdatedListener } from '../../src/events/listeners/ticketUpdatedListener';

describe('handles the creation of the new ticket and acknowledging of nats server', () => {
  const setup = async () => {
    // Create an instance of the listener
    const listener = new TicketUpdatedListener(natsWrapper.client);

    // Create a and save a ticket
    const id = new mongoose.Types.ObjectId().toHexString();
    const ticket = Ticket.build({ id, title: 'concert', price: 20 });
    await ticket.save();

    // Create a fake data obj
    const data: TicketUpdatedEvent['data'] = {
      id,
      version: ticket.version + 1,
      title: 'new concert',
      price: 24,
      userId: 'adfasfsdf',
    };

    // Create a fake message obj
    // @ts-ignore
    const msg: Message = { ack: jest.fn() };

    return { listener, data, msg, ticket };
  };

  it('finds, updates, and saves a ticket', async () => {
    const { listener, data, msg, ticket } = await setup();
    // call the onMessage func with the data obj and msg obj
    await listener.onMessage(data, msg);

    // write assertions to make sure a ticket was created
    const fetchedTicket = await Ticket.findById(ticket.id);

    expect(fetchedTicket!.title).toEqual(data.title);
    expect(fetchedTicket!.price).toEqual(data.price);
    expect(fetchedTicket!.version).toEqual(data.version);
  });

  it('acknowledges the message', async () => {
    const { listener, data, msg } = await setup();
    // call the onMessage func with the data obj and msg obj
    await listener.onMessage(data, msg);
    // write assertions to make sure ack function is called
    expect(msg.ack).toHaveBeenCalled();
  });

  it('does not call ack if the ticket is out of order', async () => {
    const { msg, data, listener, ticket } = await setup();

    data.version = 10;

    try {
      await listener.onMessage(data, msg);
    } catch (err) {}

    expect(msg.ack).not.toHaveBeenCalled();
  });
});
