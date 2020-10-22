import { eOrderStatus, ExpirationCompleteEvent } from '@fullstackeng/common';
import { natsWrapper } from '../../src/natsWrapper';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../src/models/ticket';
import { Order } from '../../src/models/order';
import { ExpirationCompleteListener } from '../../src/events/listeners/expirationCompleteListener';

describe('handles the creation of the new ticket and acknowledging of nats server', () => {
  const setup = async () => {
    // Create an instance of the listener
    const listener = new ExpirationCompleteListener(natsWrapper.client);

    const ticket = Ticket.build({ id: new mongoose.Types.ObjectId().toHexString(), title: 'concert', price: 20 });
    await ticket.save();

    const order = Order.build({ status: eOrderStatus.Created, userId: 'sdfafdadf', expiresAt: new Date(), ticket });
    await order.save();

    // Create a fake data event
    const data: ExpirationCompleteEvent['data'] = { orderId: order.id };

    // Create a fake message obj
    // @ts-ignore
    const msg: Message = { ack: jest.fn() };

    return { listener, order, ticket, data, msg };
  };

  it('updates the order status to cancelled', async () => {
    const { listener, data, msg, order, ticket } = await setup();
    // call the onMessage func with the data obj and msg obj
    await listener.onMessage(data, msg);

    const updatedOrder = await Order.findById(order.id);

    expect(updatedOrder!.status).toEqual(eOrderStatus.Cancelled);
  });

  it('emit an order cancelled event', async () => {
    const { listener, data, msg, order, ticket } = await setup();
    // call the onMessage func with the data obj and msg obj
    await listener.onMessage(data, msg);

    expect(natsWrapper.client.publish).toHaveBeenCalled();

    const eventData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[1][1]);
    expect(eventData.id).toEqual(data.orderId);
  });

  it('acknowledges the message', async () => {
    const { listener, data, msg } = await setup();
    // call the onMessage func with the data obj and msg obj
    await listener.onMessage(data, msg);
    // write assertions to make sure ack function is called
    expect(msg.ack).toHaveBeenCalled();
  });
});
