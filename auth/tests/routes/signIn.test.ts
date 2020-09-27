import request from 'supertest';
import { app } from '../../src/app';

it('response with a cookie with valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'ts@ts.com', password: 'pass' })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({ email: 'ts@ts.com', password: 'pass' })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});

it('fails when trying to signin with non-existing email', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({ email: 'ts@ts.com', password: 'pass' })
    .expect(400);
});

it('fails when trying to signin with incorrect password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'ts@ts.com', password: 'pass' })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({ email: 'ts@ts.com', password: '1234' })
    .expect(400);
});
