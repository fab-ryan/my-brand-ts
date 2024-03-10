import { expect, it, test } from '@jest/globals';
import supertest, { Request, Response } from 'supertest';
import dbConnection, { close, truncate } from '../src/database';
import { app } from '../src';
import { UserModel } from '../src/models';
import mongoose from 'mongoose';

export const states = {
  token: '',
  blogId: '',
  blogSlug: '',
  dummyId: new mongoose.Types.ObjectId(),
};

const request = supertest(app);
export const setupTesting = () => {
  beforeAll(async () => {
    await dbConnection();

    await request
      .post('/api/users')
      .send({
        email: 'test@test.com',
        password: 'password',
        name: 'test',
        role: 'admin',
      })
      .set('Accept', 'application/json');

    const res = await request
      .post('/api/login')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .set('Accept', 'application/json');
    states.token = res.body.data.access_token;
  }, 120000);

  afterAll(async () => {
    await UserModel.deleteOne({
      email: 'test@test.com',
    });

    await truncate();
    await close();
  }, 3000);
};

it('api/*', async () => {
  const res = await request.get('/api/*');
  expect(res.status).toBe(404);
});

it('should get welcome message', async () => {
  const res = await request.get('/');
  expect(res.status).toBe(200);
  expect(res.body.message).toBe('Success');
});

it("sshould get 500 error if hitting an unknown route", async () => {
  const res = await request.get('/unknown');
  expect(res.status).toBe(404);
})

export { request };
