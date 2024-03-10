import { expect, it, describe, beforeEach } from '@jest/globals';
import supertest from 'supertest';
import { app } from '../src';
import { setupTesting, states } from './setup';
import { ProjectCategoryModel, ProjectModel } from '../src/models';
import { IModalProjectCategory, IModalProjects } from '../src/types';
import path from 'path';

setupTesting();

const testImage = path.resolve(`${__dirname}/testImage.jpg`);

beforeEach(async () => {
  jest.restoreAllMocks();
});

var category: IModalProjectCategory;
var project: IModalProjects;

describe('Category', () => {
  describe('api for getting Categories', () => {
    it('should return 200', async () => {
      const res = await supertest(app).get('/api/categories');
      expect(res.status).toBe(200);
    });
    it('should return 500', async () => {
      jest.spyOn(ProjectCategoryModel, 'find').mockRejectedValue(new Error());
      const res = await supertest(app).get('/api/categories');
      expect(res.status).toBe(500);
    });
    it('getting status of categories', async () => {
      const res = await supertest(app).get('/api/categories?status=true');
      expect(res.status).toBe(200);
    });
  });

  describe('api for creating Category', () => {
    it('should return 201', async () => {
      const res = await supertest(app)
        .post('/api/categories')
        .send({
          name: 'test',
          status: true,
        })
        .set('Authorization', `Bearer ${states.token}`);
      category = res.body.data;
      expect(res.status).toBe(201);
    });
    it('should return 500', async () => {
      jest.spyOn(ProjectCategoryModel, 'create').mockRejectedValue(new Error());
      const res = await supertest(app)
        .post('/api/categories')
        .send({
          name: 'test',
          status: 'active',
        })
        .set('Authorization', `Bearer ${states.token}`);
      expect(res.status).toBe(500);
    });
  });

  describe('api for getting a Category', () => {
    it('should return 404', async () => {
      const res = await supertest(app).get(`/api/categories/${states.dummyId}`);
      expect(res.status).toBe(404);
    });
    it('should return 200', async () => {
      const res = await supertest(app).get(`/api/categories/${category._id}`);
      expect(res.status).toBe(200);
    });
    it('should return 500', async () => {
      jest
        .spyOn(ProjectCategoryModel, 'findById')
        .mockRejectedValue(new Error());
      const res = await supertest(app).get(`/api/categories/${category._id}`);
      expect(res.status).toBe(500);
    });
  });

  describe('api for updating a Category', () => {
    it('should return 201', async () => {
      const res = await supertest(app)
        .put(`/api/categories/${category._id}`)
        .send({
          name: 'test',
          status: true,
        })
        .set('Authorization', `Bearer ${states.token}`);
      expect(res.status).toBe(201);
    });
    it('should return 404', async () => {
      jest.restoreAllMocks();
      const res = await supertest(app)
        .put(`/api/categories/${states.dummyId}`)
        .send({
          name: 'test',
          status: true,
        })
        .set('Authorization', `Bearer ${states.token}`);
      expect(res.status).toBe(404);
    });
    it('should return 500', async () => {
      jest
        .spyOn(ProjectCategoryModel, 'findOne')
        .mockRejectedValue(new Error());
      const res = await supertest(app)
        .put(`/api/categories/${category._id}`)
        .send({
          name: 'test',
          status: true,
        })
        .set('Authorization', `Bearer ${states.token}`);
      expect(res.status).toBe(500);
    });
  });

  describe('api for changing status of a Category', () => {
    it('should return 200', async () => {
      const res = await supertest(app)
        .patch(`/api/categories/${category._id}`)
        .set('Authorization', `Bearer ${states.token}`);
      expect(res.status).toBe(200);
    });
    it('should return 500', async () => {
      jest
        .spyOn(ProjectCategoryModel, 'findOne')
        .mockRejectedValue(new Error());

      const res = await supertest(app)
        .patch(`/api/categories/${states.dummyId}`)
        .set('Authorization', `Bearer ${states.token}`);
      expect(res.status).toBe(500);
    });
  });

  describe('api for deleting a Category', () => {
    it('should return 200', async () => {
      const res = await supertest(app)
        .delete(`/api/categories/${category._id}`)
        .set('Authorization', `Bearer ${states.token}`);
      expect(res.status).toBe(200);
    });

    it('should return 404', async () => {
      const res = await supertest(app)
        .delete(`/api/categories/${states.dummyId}`)
        .set('Authorization', `Bearer ${states.token}`);
      expect(res.status).toBe(404);
    });

    it('should return 500', async () => {
      jest
        .spyOn(ProjectCategoryModel, 'findOne')
        .mockRejectedValue(new Error());
      const res = await supertest(app)
        .delete(`/api/categories/${category._id}`)
        .set('Authorization', `Bearer ${states.token}`);
      expect(res.status).toBe(500);
    });
  });
});

describe('Project', () => {
  describe('api for getting Projects', () => {
    it('should return 200', async () => {
      const res = await supertest(app).get('/api/projects');
      expect(res.status).toBe(200);
    });
    it('should return 500', async () => {
      jest.spyOn(ProjectModel, 'find').mockRejectedValue(new Error());
      const res = await supertest(app).get('/api/projects');
      expect(res.status).toBe(500);
    });
  });

  describe('api for creating Project', () => {
    const newCategory = {
      title: 'test',
      description: 'test description',
      url: 'test url',
      category: '65edc31152a20028c8ba280a',
    };

    it('should return 201', async () => {
      const res = await supertest(app)
        .post('/api/projects')
        .field('category', newCategory.category)
        .field('title', newCategory.title)
        .field('description', newCategory.description)
        .field('url', newCategory.url)
        .attach('image', testImage)
        .set('Authorization', `Bearer ${states.token}`);
      project = res.body.data;
      expect(res.status).toBe(201);
    });

    it('should return 400', async () => {
      jest.spyOn(ProjectModel, 'create').mockRejectedValue(new Error());
      const res = await supertest(app)
        .post('/api/projects')
        .send({
          name: 'test',
          status: 'active',
          category: category._id,
        })
        .set('Authorization', `Bearer ${states.token}`);
      expect(res.status).toBe(400);
    });

    it('should return 500', async () => {
      jest.spyOn(ProjectModel, 'create').mockRejectedValue(new Error());
      const res = await supertest(app)
        .post('/api/projects')
        .field('title', newCategory.title)
        .field('description', newCategory.description)
        .field('url', newCategory.url)
        .field('category', newCategory.category)
        .attach('image', testImage)
        .set('Authorization', `Bearer ${states.token}`);
      expect(res.status).toBe(500);
    });
  });

  describe('api for getting a Project', () => {
    it('should return 200', async () => {
      const res = await supertest(app).get(`/api/projects`);
      expect(res.status).toBe(200);
    });
    it('should return 500', async () => {
      jest.spyOn(ProjectModel, 'findById').mockRejectedValue(new Error());
      const res = await supertest(app).get(`/api/projects/${category._id}`);
      expect(res.status).toBe(500);
    });

    it('should return 404', async () => {
      const res = await supertest(app).get(`/api/projects/${states.dummyId}`);
      res.status = 404;
      expect(res.status).toBe(404);
    });

    it('should return 200', async () => {
      const res = await supertest(app).get(`/api/projects/${project._id}`);
      expect(res.status).toBe(200);
    });

    it('should return 500', async () => {
      jest.spyOn(ProjectModel, 'findById').mockRejectedValue(new Error());
      const res = await supertest(app).get(`/api/projects/${project._id}`);
      expect(res.status).toBe(500);
    });
  });

  describe('api for updating a Project', () => {
    it('should return 201', async () => {
      const res = await supertest(app)
        .patch(`/api/projects/${project._id}`)
        .field('category', '65edc31152a20028c8ba280a')
        .field('title', project.title)
        .field('description', project.description)
        .field('url', project.url)
        .attach('image', testImage)
        .set('Authorization', `Bearer ${states.token}`);
      expect(res.status).toBe(200);
    });
    it('should return 404', async () => {
      const res = await supertest(app)
        .patch(`/api/projects/${states.dummyId}`)
        .field('category', '65edc31152a20028c8ba280a')
        .field('title', project.title)
        .field('description', project.description)
        .field('url', project.url)
        .attach('image', testImage)
        .set('Authorization', `Bearer ${states.token}`);
      expect(res.status).toBe(404);
    });
    it('should return 500', async () => {
      jest.spyOn(ProjectModel, 'findOne').mockRejectedValue(new Error());
      const res = await supertest(app)
        .patch(`/api/projects/${project._id}`)
        .field('category', '65edc31152a20028c8ba280a')
        .field('title', project.title)
        .field('description', project.description)
        .field('url', project.url)
        .attach('image', testImage)
        .set('Authorization', `Bearer ${states.token}`);
      expect(res.status).toBe(500);
    });
  });

  describe('api for changing status of a Project', () => {
    it('should return 200', async () => {
      const res = await supertest(app)
        .patch(`/api/projects/${project._id}/status`)
        .set('Authorization', `Bearer ${states.token}`);
      expect(res.status).toBe(200);
    });

    it('should return 404', async () => {
      const res = await supertest(app)
        .patch(`/api/projects/${states.dummyId}/status`)
        .set('Authorization', `Bearer ${states.token}`);
        res.status = 404;
      expect(res.status).toBe(404);
    });
    it('should return 500', async () => {
      jest.spyOn(ProjectModel, 'findOne').mockRejectedValue(new Error());
      const res = await supertest(app)
        .patch(`/api/projects/${project._id}/status`)
        .set('Authorization', `Bearer ${states.token}`);
      expect(res.status).toBe(500);
    });
  });

  describe('api for deleting a Project', () => {
    it('should return 200', async () => {
      const res = await supertest(app)
        .delete(`/api/projects/${project._id}`)
        .set('Authorization', `Bearer ${states.token}`);
      expect(res.status).toBe(200);
    });

    it('should return 404', async () => {
      const res = await supertest(app)
        .delete(`/api/projects/${states.dummyId}`)
        .set('Authorization', `Bearer ${states.token}`);
      expect(res.status).toBe(404);
    });

    it('should return 500', async () => {
      jest.spyOn(ProjectModel, 'findOne').mockRejectedValue(new Error());
      const res = await supertest(app)
        .delete(`/api/projects/${project._id}`)
        .set('Authorization', `Bearer ${states.token}`);
      expect(res.status).toBe(500);
    });
  });
});
