import request from 'supertest';
import { app } from '../../src/app';

const createTicket = () =>
  request(app).post('/api/tickets').set('Cookie', global.signup()).send({ title: 'concert', price: 120 }).expect(201);

describe('retrieves tickets', () => {
  it('returns the list of tickets', async () => {
    await createTicket();
    await createTicket();

    const ticketResponse = await request(app).get(`/api/tickets`).send().expect(200);

    expect(ticketResponse.body.length).toEqual(2);
  });
});
