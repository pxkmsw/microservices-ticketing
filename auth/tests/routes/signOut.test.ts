import request from 'supertest';
import { app } from '../../src/app';

it('clears the cookie after signing out', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'ts@ts.com', password: 'pass' })
    .expect(201);

  await request(app).post('/api/users/signout').send().expect(200);
});
