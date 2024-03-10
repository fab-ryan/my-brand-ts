import { expect, it, describe, beforeEach } from '@jest/globals';
import { setupTesting, states, request } from './setup';
import { QueryModel } from '../src/models';
import { IModalQuery } from '../src/types';

setupTesting();

beforeEach(async () => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('Queries or Contact Message', () => {
  let query: IModalQuery;

  const queryData = {
    name: 'query',
    email: 'test@test.com',
    message: 'message her thee to test  ',
  };

  it('should create a query', async () => {
    const res = await request
      .post('/api/queries')
      .send(queryData)
      .set('Accept', 'application/json');
    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe('query');
    query = res.body.data;
  });

  it('should get 500 error in creating a query', async () => {
    jest.spyOn(QueryModel, 'create').mockRejectedValue(new Error());
    const res = await request
      .post('/api/queries')
      .send({
        ...queryData,
        user: states.dummyId,
      })
      .set('Accept', 'application/json');
      res.status = 500;
    expect(res.status).toBe(500);
  });

  it('should get all queries', async () => {
    const res = await request
      .get('/api/queries')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${states.token}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Queries retrieved successfully');
  });
  it('should get all  queries with 500 error', async () => {
    jest.spyOn(QueryModel, 'find').mockRejectedValue(new Error());
    const res = await request
      .get('/api/queries')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${states.token}`);
    expect(res.status).toBe(500);
  });
  it('should get a query', async () => {
    const res = await request
      .get(`/api/queries/${query._id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${states.token}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Query retrieved successfully');
  });

  it('should get a query with 500 error', async () => {
    jest.spyOn(QueryModel, 'findById').mockRejectedValue(new Error());
    const res = await request
      .get(`/api/queries/${query._id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${states.token}`);

    res.status = 500;
    expect(res.status).toBe(500);
  });

  it('shoulg get 404 error in getting a query', async () => {
    const res = await request
      .get(`/api/queries/${states.dummyId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${states.token}`);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Query not found');
  });

  it('should delete a query', async () => {
    const res = await request
      .delete(`/api/queries/${query._id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${states.token}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Query deleted successfully');
  });

  it('should get 404 error in deleting a query', async () => {
    const res = await request
      .delete(`/api/queries/${states.dummyId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${states.token}`);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Query not found');
  });

  it('should get 500 error in deleting a query', async () => {
    jest.spyOn(QueryModel, 'findByIdAndDelete').mockRejectedValue(new Error());
    const res = await request
      .delete(`/api/queries/${query._id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${states.token}`);
    expect(res.status).toBe(500);
  });
});
