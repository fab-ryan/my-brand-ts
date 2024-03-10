import { expect, it, describe, beforeEach } from '@jest/globals';
import { setupTesting, states, request } from './setup';
import { UserModel } from '../src/models';
import { IModalUser } from '../src/types';

setupTesting();

beforeEach(async () => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('User', () => {
  let user: IModalUser;

  it('should get all users', async () => {
    const res = await request
      .get('/api/users')
      .set('Authorization', `Bearer ${states.token}`)
      .set('Accept', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Users fetched successfully');
  });

  it('should get 500 error in getting all users', async () => {
    jest.spyOn(UserModel, 'find').mockRejectedValue(new Error());
    const res = await request
      .get('/api/users')
      .set('Authorization', `Bearer ${states.token}`)
      .set('Accept', 'application/json');
    expect(res.status).toBe(500);
  });
  const dataCreate = {
    name: 'test',
    email: 'user@test.com',
    password: 'password',
  };

  it('should create a user', async () => {
    const res = await request
      .post('/api/users')
      .send(dataCreate)
      .set('Accept', 'application/json');
    expect(res.status).toBe(201);
    user = res.body.data;
  });

  it('should get 500 error in creating a user', async () => {
    jest.spyOn(UserModel, 'create').mockRejectedValue(new Error());
    const res = await request
      .post('/api/users')
      .send(dataCreate)
      .set('Accept', 'application/json');
    expect(res.status).toBe(500);
  });
  it('should update a user', async () => {
    const res = await request
      .put(`/api/users/${user._id}`)
      .send(dataCreate)
      .set('Authorization', `Bearer ${states.token}`)
      .set('Accept', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('User updated successfully');
  });
  it('should get 500 error in updating a user', async () => {
    jest.spyOn(UserModel, 'findOne').mockRejectedValue(new Error());
    const res = await request
      .put(`/api/users/${user._id}`)
      .send(dataCreate)
      .set('Authorization', `Bearer ${states.token}`)
      .set('Accept', 'application/json');
    expect(res.status).toBe(500);
  });
  it('should get 404 error in updating a user', async () => {
    jest.spyOn(UserModel, 'findOne').mockResolvedValue(null);
    const res = await request
      .put(`/api/users/${states.dummyId}`)
      .send(dataCreate)
      .set('Authorization', `Bearer ${states.token}`)
      .set('Accept', 'application/json');
    expect(res.status).toBe(404);
  });

  it('should get a user', async () => {
    const res = await request
      .get(`/api/users/${user._id}`)
      .set('Authorization', `Bearer ${states.token}`)
      .set('Accept', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('User fetched successfully');
  });
  it('should get 404 error in getting a user', async () => {
    jest.spyOn(UserModel, 'findOne').mockResolvedValue(null);
    const res = await request
      .get(`/api/users/${states.dummyId}`)
      .set('Authorization', `Bearer ${states.token}`)
      .set('Accept', 'application/json');
    expect(res.status).toBe(404);
  });
  it('should get 500 error in getting a user', async () => {
    jest.spyOn(UserModel, 'findOne').mockRejectedValue(new Error());
    const res = await request
      .get(`/api/users/${user._id}`)
      .set('Authorization', `Bearer ${states.token}`)
      .set('Accept', 'application/json');
    expect(res.status).toBe(500);
  });

  it('should login with  invalid credentials', async () => {
    const res = await request
      .post('/api/login')
      .send({ email: 'testgmail@test.com', password: 'password' })
      .set('Accept', 'application/json');
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('User Not Found');
  });
  it('should login with valid credentials', async () => {
    const res = await request
      .post('/api/login')
      .send({
        email: dataCreate.email,
        password: dataCreate.password,
      })
      .set('Accept', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Login Successful');
  });
  it('should get 500 error in login', async () => {
    jest.spyOn(UserModel, 'findOne').mockRejectedValue(new Error());
    const res = await request
      .post('/api/login')
      .send({
        email: dataCreate.email,
        password: dataCreate.password,
      })
      .set('Accept', 'application/json');
    expect(res.status).toBe(500);
  });
  it('should get invalid token', async () => {
    const res = await request
      .post('/api/login')
      .send({
        email: dataCreate.email,
        password: 'passwordd',
      })
      .set('Accept', 'application/json');
    expect(res.status).toBe(400);
  });

  it('should delete a user', async () => {
    const res = await request
      .delete(`/api/users/${user._id}`)
      .set('Authorization', `Bearer ${states.token}`)
      .set('Accept', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('User deleted successfully');
  });
  it('should get 500 error in deleting a user', async () => {
    jest.spyOn(UserModel, 'findOne').mockRejectedValue(new Error());
    const res = await request
      .delete(`/api/users/${states.dummyId}`)
      .set('Authorization', `Bearer ${states.token}`)
      .set('Accept', 'application/json');
    expect(res.status).toBe(200);
  });
});
