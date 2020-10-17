import request from 'supertest';
import { app } from '../../src/app';
import { Ticket } from '../../src/models/ticket';

const buildTicket = async () => {
  const ticket = await Ticket.build({ title: 'concert', price: 20 });
  await ticket.save();
  return ticket;
};

describe('Handles the fetching one order of a particular user', () => {
  it('fetches one order for a user', async () => {
    const ticket = await buildTicket();
    const user = global.signup();

    const { body: order } = await request(app)
      .post('/api/orders')
      .set('Cookie', user)
      .send({ ticketId: ticket.id })
      .expect(201);

    const { body: fetchedOrder } = await request(app)
      .get(`/api/orders/${order.id}`)
      .set('Cookie', user)
      .expect(200);

    expect(fetchedOrder.id).toEqual(order.id);
  });

  it('returns an error if the user tries to access another users order', async () => {
    const ticket = await buildTicket();
    const user = global.signup();

    const { body: order } = await request(app)
      .post('/api/orders')
      .set('Cookie', user)
      .send({ ticketId: ticket.id })
      .expect(201);

    await request(app).get(`/api/orders/${order.id}`).set('Cookie', global.signup()).expect(401);
  });
});
