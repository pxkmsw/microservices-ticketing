import request from 'supertest';
import { app } from '../../src/app';

it('responds with details about the current user', async () => {
  const cookie = await global.signup();

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('ts@ts.com');
});

it('responds with null if user is not authenticated', async () => {
  const response = await request(app).get('/api/users/currentuser').send().expect(200);

  expect(response.body.currentUser).toEqual(null);
});
