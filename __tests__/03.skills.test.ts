import { expect, it, describe, beforeEach } from '@jest/globals';
import { setupTesting, states, request } from './setup';
import { SkillModel } from '../src/models';
import { IModalSkills } from '../src/types';

setupTesting();

beforeEach(async () => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('Skills', () => {
  let skill: IModalSkills;

  it('should create a skill', async () => {
    const res = await request
      .post('/api/skills')
      .send({
        name: 'skill',
        percentage: 90,
        status: true,
      })
      .set('Authorization', `Bearer ${states.token}`)
      .set('Accept', 'application/json');
    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe('skill');
    skill = res.body.data;
  });

  it('should get 500 error in creating a skill', async () => {
    jest.spyOn(SkillModel, 'create').mockRejectedValue(new Error());
    const res = await request
      .post('/api/skills')
      .send({
        name: 'skill',
        percentage: 90,
        status: true,
      })
      .set('Authorization', `Bearer ${states.token}`)
      .set('Accept', 'application/json');
    expect(res.status).toBe(500);
  });

  it('should get all skills', async () => {
    const res = await request
      .get('/api/skills')
      .set('Authorization', `Bearer ${states.token}`)
      .set('Accept', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Skills retrieved successfully');
  });

  it('should get all  skill with 500 error', async () => {
    jest.spyOn(SkillModel, 'find').mockRejectedValue(new Error());
    const res = await request
      .get('/api/skills')
      .set('Authorization', `Bearer ${states.token}`)
      .set('Accept', 'application/json');
    expect(res.status).toBe(500);
  });

  it('should get a skill with 500 error', async () => {
    jest.spyOn(SkillModel, 'findById').mockRejectedValue(new Error());
    const res = await request
      .get(`/api/skills/${skill._id}`)
      .set('Authorization', `Bearer ${states.token}`)
      .set('Accept', 'application/json');
    expect(res.status).toBe(500);
  });

  it('should get a skill', async () => {
    const res = await request
      .get(`/api/skills/${skill._id}`)
      .set('Authorization', `Bearer ${states.token}`)
      .set('Accept', 'application/json');
    expect(res.status).toBe(200);
  });

  it('should update a skill', async () => {
    const res = await request
      .patch(`/api/skills/${skill._id}`)
      .send({
        name: 'skill updated',
        percentage: 90,
        status: true,
      })
      .set('Authorization', `Bearer ${states.token}`)
      .set('Accept', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe('skill');
  });

  it('should update a skill with 500 error', async () => {
    jest.spyOn(SkillModel, 'findOne').mockRejectedValue(new Error());
    const res = await request
      .patch(`/api/skills/${skill._id}`)
      .send({
        name: 'skill',
        percentage: 90,
        status: true,
      })
      .set('Authorization', `Bearer ${states.token}`)
      .set('Accept', 'application/json');
    expect(res.status).toBe(500);
  });

  it('should upte a skill with 404 error', async () => {
    jest.spyOn(SkillModel, 'findOne').mockResolvedValue(null);
    const res = await request
      .patch(`/api/skills/${skill._id}`)
      .send({
        name: 'skill',
        percentage: 90,
        status: true,
      })
      .set('Authorization', `Bearer ${states.token}`)
      .set('Accept', 'application/json');
    expect(res.status).toBe(404);
  });

  it('should change skill status', async () => {
    const res = await request
      .patch(`/api/skills/${skill._id}/status`)
      .set('Authorization', `Bearer ${states.token}`)
      .set('Accept', 'application/json');
    expect(res.status).toBe(200);
  });

  it('should change skill status with 500 error', async () => {
    jest.spyOn(SkillModel, 'findOne').mockRejectedValue(new Error());
    const res = await request
      .patch(`/api/skills/${skill._id}/status`)
      .set('Authorization', `Bearer ${states.token}`)
      .set('Accept', 'application/json');
    expect(res.status).toBe(500);
  });

  it('should change skill status with 404 error', async () => {
    jest.spyOn(SkillModel, 'findOne').mockResolvedValue(null);
    const res = await request
      .patch(`/api/skills/${skill._id}/status`)
      .set('Authorization', `Bearer ${states.token}`)
      .set('Accept', 'application/json');
    expect(res.status).toBe(404);
  });

  it('should delete a skill', async () => {
    const res = await request
      .delete(`/api/skills/${skill._id}`)
      .set('Authorization', `Bearer ${states.token}`)
      .set('Accept', 'application/json');
    expect(res.status).toBe(200);
  });

  it('should delete a skill with 500 error', async () => {
    jest.spyOn(SkillModel, 'findOne').mockRejectedValue(new Error());
    const res = await request
      .delete(`/api/skills/${skill._id}`)
      .set('Authorization', `Bearer ${states.token}`)
      .set('Accept', 'application/json');
    expect(res.status).toBe(500);
  });

  it('should delete a skill with 404 error', async () => {
    jest.spyOn(SkillModel, 'findOne').mockResolvedValue(null);
    const res = await request
      .delete(`/api/skills/${skill._id}`)
      .set('Authorization', `Bearer ${states.token}`)
      .set('Accept', 'application/json');
    expect(res.status).toBe(404);
  });
});
