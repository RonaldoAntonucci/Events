/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';

import { factory, truncate } from '../utils';

describe('Session Store', () => {
  afterEach(async () => {
    await truncate();
  });

  it('Should be authenticate with valid credentials', async () => {
    const user = await factory.create('User', { password: 123456 });

    const res = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: '123456' });

    expect(res.status).toBe(200);
    expect(res.body.user).toHaveProperty('name');
    expect(res.body.user).toHaveProperty('email');
    expect(res.body).toHaveProperty('token');
  });

  it('should not be able to authenticate without valid data', async () => {
    const email = 'invalid';
    const password = true;

    const response = await request(app)
      .post('/sessions')
      .send({ email, password });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Validation fails');
  });

  it('should not be able to authenticate without valid email', async () => {
    const email = 'invalid@invalid.com';
    const password = '123456';

    const response = await request(app)
      .post('/sessions')
      .send({ email, password });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('User not found.');
  });
});
