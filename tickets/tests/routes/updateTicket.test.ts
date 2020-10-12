import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../src/app';
import { natsWrapper } from '../../src/natsWrapper';

describe('update ticket', () => {
  it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app).put(`/api/tickets/${id}`).send().expect(401);
  });

  it('returns a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .put(`/api/tickets/${id}`)
      .set('Cookie', global.signup())
      .send({ title: 'abc', price: 120 })
      .expect(404);
  });
  it('returns a 401 if the user does not own the ticket', async () => {
    const response = await request(app)
      .post(`/api/tickets`)
      .set('Cookie', global.signup())
      .send({ title: 'abc', price: 120 });

    const id = response.body.id;
    await request(app)
      .put(`/api/tickets/${id}`)
      .set('Cookie', global.signup())
      .send({ title: 'abc', price: 120 })
      .expect(401);
  });
  it('returns a 400 if the user provides invalid title or price', async () => {
    const cookie = global.signup();
    const response = await request(app)
      .post(`/api/tickets`)
      .set('Cookie', cookie)
      .send({ title: 'abc', price: 120 });

    const id = response.body.id;
    await request(app)
      .put(`/api/tickets/${id}`)
      .set('Cookie', cookie)
      .send({ title: '' })
      .expect(400);

    await request(app)
      .put(`/api/tickets/${id}`)
      .set('Cookie', cookie)
      .send({ title: 'aaa', price: -10 })
      .expect(400);
  });

  it('updates the ticket if the user provides valid input', async () => {
    const cookie = global.signup();
    const response = await request(app)
      .post(`/api/tickets`)
      .set('Cookie', cookie)
      .send({ title: 'a', price: 1 });

    const id = response.body.id;
    await request(app)
      .put(`/api/tickets/${id}`)
      .set('Cookie', cookie)
      .send({ title: 'c', price: 2 })
      .expect(200);

    const updatedTicket = await request(app).get(`/api/tickets/${id}`).send().expect(200);

    expect(updatedTicket.body.title).toEqual('c');
    expect(updatedTicket.body.price).toEqual(2);
  });

  it('publishes an event', async () => {
    const cookie = global.signup();
    const response = await request(app)
      .post(`/api/tickets`)
      .set('Cookie', cookie)
      .send({ title: 'a', price: 1 });

    const id = response.body.id;
    await request(app)
      .put(`/api/tickets/${id}`)
      .set('Cookie', cookie)
      .send({ title: 'c', price: 2 })
      .expect(200);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
