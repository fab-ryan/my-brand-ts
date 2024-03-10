import { expect, it, describe, beforeEach } from '@jest/globals';
import { setupTesting, states, request } from './setup';
import { EducationModel } from '../src/models';
import { IModalEducation } from '../src/types';

setupTesting();

beforeEach(async () => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('Education', () => {
  let education: IModalEducation;
  const educationData = {
    institution: 'school',
    degree: 'degree',
    field: 'field',
    start: '2020',
    end: '2021',
    description: 'description',
  };

  it('should create a education', async () => {
    const res = await request
      .post('/api/educations')
      .send(educationData)
      .set('Authorization', `Bearer ${states.token}`)
      .set('Accept', 'application/json');
    console.log(res.body);
    expect(res.status).toBe(201);
    education = res.body.data;
  });

  it('should get 500 error in creating a education', async () => {
    jest.spyOn(EducationModel, 'create').mockRejectedValue(new Error());
    const res = await request
      .post('/api/educations')
      .send(educationData)
      .set('Authorization', `Bearer ${states.token}`)
      .set('Accept', 'application/json');
    expect(res.status).toBe(500);
  });

  it('should get all education', async () => {
    const res = await request
      .get('/api/educations')
      .set('Authorization', `Bearer ${states.token}`)
      .set('Accept', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Educations retrieved successfully');
  });

  it('should get all  education with 500 error', async () => {
    jest.spyOn(EducationModel, 'find').mockRejectedValue(new Error());
    const res = await request
      .get('/api/educations')
      .set('Authorization', `Bearer ${states.token}`)
      .set('Accept', 'application/json');
    expect(res.status).toBe(500);
  });

  it('should get a education', async () => {
    const res = await request
      .get(`/api/educations/${education._id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${states.token}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Education retrieved successfully');
  });

  it('should get a education with 500 error', async () => {
    jest.spyOn(EducationModel, 'findById').mockRejectedValue(new Error());
    const res = await request
      .get(`/api/educations/${education._id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${states.token}`);
    expect(res.status).toBe(500);
  });

  it('should update a education', async () => {
    const res = await request
      .patch(`/api/educations/${education._id}`)
      .send(educationData)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${states.token}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Education updated successfully');
  });

  it('should update a education with 500 error', async () => {
    jest.spyOn(EducationModel, 'findOne').mockRejectedValue(new Error());
    const res = await request
      .patch(`/api/educations/${education._id}`)
      .send(educationData)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${states.token}`);
    expect(res.status).toBe(500);
  });
  it('should get 404 error in updating a education', async () => {
    const res = await request
      .patch(`/api/educations/${states.dummyId}`)
      .send(educationData)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${states.token}`);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Education not found');
  });

  it('should delete a education', async () => {
    const res = await request
      .delete(`/api/educations/${education._id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${states.token}`);
    expect(res.status).toBe(200);
  });

  it('should delete a education with 500 error', async () => {
    jest.spyOn(EducationModel, 'findOne').mockRejectedValue(new Error());
    const res = await request
      .delete(`/api/educations/${education._id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${states.token}`);
    expect(res.status).toBe(500);
  });
  it('should get 404 error in deleting a education', async () => {
    const res = await request
      .delete(`/api/educations/${states.dummyId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${states.token}`);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Education not found');
  });
});
