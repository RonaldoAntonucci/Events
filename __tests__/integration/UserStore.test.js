/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';

import { factory, truncate } from '../utils';

describe('User Store', () => {
  afterEach(async () => {
    await truncate();
  });

  it('Should be able to store an User', async () => {
    const user = await factory.attrs('User');
    const { status, body } = await request(app)
      .post('/users')
      .send(user);

    expect(status).toBe(200);
    expect(body).toHaveProperty('name', user.name);
    expect(body).toHaveProperty('email', user.email);
    expect(body).not.toHaveProperty('password');
  });

  it('Should be not able to store an User with existent email', async () => {
    const user = await factory.create('User');
    const { status, body } = await request(app)
      .post('/users')
      .send(user);

    expect(status).toBe(400);
    expect(body).toHaveProperty('message');
  });
});
