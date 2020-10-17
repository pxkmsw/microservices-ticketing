import { eOrderStatus } from '@fullstackeng/common';
import request from 'supertest';
import { app } from '../../src/app';
import { Order } from '../../src/models/order';
import { Ticket } from '../../src/models/ticket';
import { natsWrapper } from '../../src/natsWrapper';

const buildTicket = async () => {
  const ticket = await Ticket.build({ title: 'concert', price: 20 });
  await ticket.save();
  return ticket;
};

describe('Handles the cancelling one order of a particular user', () => {
  it('cancels one order for a user', async () => {
    const ticket = await buildTicket();
    const user = global.signup();

    const { body: order } = await request(app)
      .post('/api/orders')
      .set('Cookie', user)
      .send({ ticketId: ticket.id })
      .expect(201);

    await request(app).patch(`/api/orders/${order.id}`).set('Cookie', user).send().expect(204);
    const cancelledOrder = await Order.findById(order.id);
    expect(cancelledOrder!.status).toEqual(eOrderStatus.Cancelled);
  });

  it('should emit an order cancelled event', async () => {
    const ticket = await buildTicket();
    const user = global.signup();

    const { body: order } = await request(app)
      .post('/api/orders')
      .set('Cookie', user)
      .send({ ticketId: ticket.id })
      .expect(201);

    await request(app).patch(`/api/orders/${order.id}`).set('Cookie', user).send().expect(204);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
