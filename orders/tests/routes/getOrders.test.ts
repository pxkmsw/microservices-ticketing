import request from 'supertest';
import { app } from '../../src/app';
import { Ticket } from '../../src/models/ticket';

const buildTicket = async () => {
  const ticket = await Ticket.build({ title: 'concert', price: 20 });
  await ticket.save();
  return ticket;
};

describe('Handles the fetching orders of a particular user', () => {
  it('fetches orders from a particular user', async () => {
    // Create 3 tickets
    const ticket1 = await buildTicket();
    const ticket2 = await buildTicket();
    const ticket3 = await buildTicket();

    // Create 2 users
    const user1 = global.signup();
    const user2 = global.signup();

    // Create one order for user #1
    await request(app)
      .post('/api/orders')
      .set('Cookie', user1)
      .send({ ticketId: ticket1.id })
      .expect(201);

    // Create two orders for user #2
    const { body: order1 } = await request(app)
      .post('/api/orders')
      .set('Cookie', user2)
      .send({ ticketId: ticket2.id })
      .expect(201);

    const { body: order2 } = await request(app)
      .post('/api/orders')
      .set('Cookie', user2)
      .send({ ticketId: ticket3.id })
      .expect(201);

    // Get orders for user #2
    const response = await request(app).get('/api/orders').set('Cookie', user2).expect(200);

    // Make sure that we only got the orders for user #2
    expect(response.body.length).toEqual(2);
    expect(response.body[0].id).toEqual(order1.id);
    expect(response.body[1].id).toEqual(order2.id);
    expect(response.body[0].ticket.id).toEqual(ticket2.id);
    expect(response.body[1].ticket.id).toEqual(ticket3.id);
  });
});
