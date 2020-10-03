import request from 'supertest';
import { app } from '../../src/app';
import { Ticket } from '../../src/models/ticket';

describe('handles the creation of new tickets', () => {
  it('has a route handler at /api/tickets for post requests', async () => {
    const response = await request(app).post('/api/tickets').send({});
    expect(response.status).not.toEqual(404);
  });

  it('only signed in users have access for creating new tickets', async () => {
    await request(app).post('/api/tickets').send({}).expect(401);
  });

  it('ruturns a status other than 401 if the user is signed in', async () => {
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signup())
      .send({});
    expect(response.status).not.toEqual(401);
  });

  it('returns an error if an invalid title is provided', async () => {
    await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signup())
      .send({ title: '', price: 10 })
      .expect(400);

    await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signup())
      .send({ price: 10 })
      .expect(400);
  });

  it('returns an error if an invalid price is provided', async () => {
    await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signup())
      .send({ title: 'superbowl', price: -10 })
      .expect(400);

    await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signup())
      .send({ title: 'superbowl' })
      .expect(400);
  });

  it('creates a ticket if user is signed in and inputs are valid', async () => {
    const title = 'superbowl';
    const price = 10;

    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signup())
      .send({ title, price })
      .expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(price);
    expect(tickets[0].title).toEqual(title);
  });
});
