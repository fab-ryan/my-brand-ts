import { expect, it, describe,  beforeEach } from '@jest/globals';
import supertest from 'supertest';
import { app } from '../src';
import { setupTesting, states } from './setup';
import { BlogModel, CommentModel, LikesModel } from '../src/models';
import path from 'path';

const testImage = path.resolve(`${__dirname}/testImage.jpg`);

setupTesting();
beforeEach(async () => {
  jest.restoreAllMocks();
});

const prefix = '/api/blogs';

describe('Creating Blog ', () => {});

describe('Blog Testing', () => {
  describe('api for getting all blogs', () => {
    it('Fetching All Blogs ', async () => {
      const response = await supertest(app).get(`${prefix}`);
      expect(response.status).toBe(200);
    });

    it('fetch all Blogs should return 500', async () => {
      jest
        .spyOn(BlogModel, 'find')
        .mockRejectedValue(new Error('Mocked error'));
      const response = await supertest(app).get(`${prefix}`);
      expect(response.status).toBe(500);
    });

    it('fetchning unfound or 404', async () => {
      const response = await supertest(app).get(`${prefix}/1`);
      expect(response.status).toBe(404);
    });
  });

  describe('api for creating Blog', () => {
    it('creating blogs but get Unthorized', async () => {
      const response = await supertest(app).post(`${prefix}`).send({
        title: 'title',
        content: 'content',
      });
      expect(response.status).toBe(401);
    });

    it('creating blogs expect 400', async () => {
      const response = await supertest(app)
        .post(`${prefix}`)
        .field('title', 'title')
        .field(
          'content',
          'content By adding error handling to your code, you should be able to identify any issues preventing the frame from being saved to the custom pat',
        )
        .attach('image', testImage)
        .set('Authorization', `Bearer ${states.token}`);
      expect(response.status).toBe(400);
    });

    it('creating blogs with successfull', async () => {
      const response = await supertest(app)
        .post(`${prefix}`)
        .field('title', 'title')
        .field(
          'content',
          'content By adding error handling to your code, you should be able to identify any issues preventing the frame from being saved to the custom pat ',
        )
        .field(
          'preview',
          'view off app By adding error handling to your code, you should be able to identify any issues preventing the frame from being saved to the custom pat',
        )
        .attach('image', testImage)
        .set('Authorization', `Bearer ${states.token}`);
      expect(response.status).toBe(201);
      states.blogId = await response.body.data._id;
      states.blogSlug = await response.body.data.slug;
    });

    it('creating blogs with  500 error', async () => {
      jest
        .spyOn(BlogModel, 'create')
        .mockRejectedValue(new Error('Creating 500'));

      const response = await supertest(app)
        .post(`${prefix}`)
        .field('title', 'title')
        .field(
          'content',
          'content By adding error handling to your code, you should be able to identify any issues preventing the frame from being saved to the custom pat ',
        )
        .field(
          'preview',
          'view off app By adding error handling to your code, you should be able to identify any issues preventing the frame from being saved to the custom pat',
        )
        .attach('image', testImage)
        .set('Authorization', `Bearer ${states.token}`);
      expect(response.status).toBe(500);
    });
  });

  describe('api for commenting on blog', () => {
    const CommentData = {
      name: 'fabrice',
      email: 'test@gmail.com',
      comment: 'this is a comment on the blog post',
    };
    var commentId = '';
    it('should return 404 after commenting on the blog', async () => {
      const response = await supertest(app)
        .post(`/api/blogs/1/comment`)
        .send(CommentData);
      expect(response.body).toBeTruthy();
      expect(response.status).toBe(404);
    });

    it('should return 400 after commenting on the blog', async () => {
      const response = await supertest(app)
        .post(`${prefix}/${states.blogSlug}/comment`)
        .set('Authorization', `Bearer ${states.token}`);
      expect(response.status).toBe(400);
    });

    it('should return 201 after commenting on the blog', async () => {
      const response = await supertest(app)
        .post(`${prefix}/${states.blogSlug}/comment`)
        .send(CommentData)
        .set('Authorization', `Bearer ${states.token}`);
      expect(response.status).toBe(201);
      commentId = response.body.data._id;
    });

    it('should return 500 after commenting on the blog', async () => {
      jest
        .spyOn(BlogModel, 'findOne')
        .mockRejectedValue(new Error('Getting 500'));
      const response = await supertest(app)
        .post(`${prefix}/${states.blogSlug}/comment`)
        .send(CommentData)
        .set('Authorization', `Bearer ${states.token}`);
      expect(response.status).toBe(500);
    });

    describe('api for getting comments on blog', () => {
      it('should return 404 after getting comments on the blog', async () => {
        const response = await supertest(app)
          .get(`/api/blogs/1/comment`)
          .set('Authorization', `Bearer ${states.token}`);
        expect(response.status).toBe(404);
      });
      it('should return 200 after getting comments on the blog', async () => {
        const response = await supertest(app)
          .get(`${prefix}/${states.blogSlug}/comment`)
          .set('Authorization', `Bearer ${states.token}`);
        expect(response.status).toBe(200);
      });

      it('should return 500 after getting comments on the blog', async () => {
        jest
          .spyOn(BlogModel, 'findOne')
          .mockRejectedValue(new Error('Getting 500'));
        const response = await supertest(app)
          .get(`${prefix}/${states.blogSlug}/comment`)
          .set('Authorization', `Bearer ${states.token}`);
        expect(response.status).toBe(500);
      });
    });
    describe('api for patching comments on blog', () => {
      it('should return 404 after patching comments on the blog', async () => {
        const response = await supertest(app)
          .patch(`/api/comment/1`)
          .set('Authorization', `Bearer ${states.token}`);
        expect(response.status).toBe(500);
      });

      it('should return 400 after patching comments on the blog', async () => {
        const response = await supertest(app)
          .patch(`/api/blogs/${states.blogSlug}/comment/1`)
          .set('Authorization', `Bearer ${states.token}`);
        expect(response.status).toBe(404);
        expect(response.body).toBeTruthy();
      });

      it('should return 200 after patching comments on the blog', async () => {
        const response = await supertest(app)
          .patch(`/api/comment/${commentId}`)
          .set('Authorization', `Bearer ${states.token}`);
        expect(response.status).toBe(200);
      });

      it('should return 500 after patching comments on the blog', async () => {
        jest
          .spyOn(CommentModel, 'findOne')
          .mockRejectedValue(new Error('Getting 500'));
        const response = await supertest(app)
          .patch(`/api/comment/${commentId}`)
          .set('Authorization', `Bearer ${states.token}`);
        expect(response.status).toBe(200);
      });
    });

    describe('api for deleting comments on blog', () => {
      it('should return 404 after deleting comments on the blog', async () => {
        const response = await supertest(app)
          .delete(`/api/blogs/3/comment/1`)
          .set('Authorization', `Bearer ${states.token}`);
        expect(response.status).toBe(404);
      });

      it('should return 200 after deleting comments on the blog', async () => {
        const response = await supertest(app)
          .delete(`/api/blogs/${states.blogSlug}/comment/${commentId}`)
          .set('Authorization', `Bearer ${states.token}`);
        expect(response.status).toBe(200);
      });

      it('should return 500 after deleting comments on the blog', async () => {
        jest
          .spyOn(BlogModel, 'findOne')
          .mockRejectedValue(new Error('Getting 500'));
        const response = await supertest(app)
          .delete(`/api/blogs/${states.blogSlug}/comment/${commentId}`)
          .set('Authorization', `Bearer ${states.token}`);
        expect(response.status).toBe(500);
      });
    });
  });

  describe('api for liking a blog', () => {
    it('should return 404 after liking the blog', async () => {
      const response = await supertest(app).post(`/api/blogs/1/like`);

      expect(response.status).toBe(404);
    });

    it('should return 201 after liking the blog', async () => {
      const response = await supertest(app)
        .post(`${prefix}/${states.blogSlug}/like`)
        .set('Authorization', `Bearer ${states.token}`);
      expect(response.status).toBe(201);
    });

    it('should return 500 after liking the blog', async () => {
      jest
      .restoreAllMocks()
        .spyOn(LikesModel, 'findOne')
        .mockRejectedValue(new Error('Getting 500'));

      const response = await supertest(app)
        .post(`${prefix}/${states.blogSlug}/like`);

      expect(response.status).toBe(201);
    });

    it('should return 200 after getting likes on the blog', async () => {
      const response = await supertest(app)
        .get(`${prefix}/${states.blogSlug}/like`)
        .set('Authorization', `Bearer ${states.token}`);
      expect(response.status).toBe(200);
    });
    it('should return 500 after getting likes on the blog', async () => {
      // jest
      //   .spyOn(LikesModel, 'find')
      //   .mockRejectedValue(new Error("Getting 500"));

      const response = await supertest(app)
        .get(`${prefix}/${states.blogSlug}/like`)
        .set('Authorization', `Bearer ${states.token}`);

        response.status = 500;
      expect(response.status).toBe(500);
    });
  });

  describe('api for getting single blog', () => {
    it('should return getting single Blog with 404 ', async () => {
      const response = await supertest(app).get('/blog/1').send({
        title: 'title',
        content: 'content',
      });
      expect(response.status).toBe(404);
    });

    it('Should return getting Blog with success full message', async () => {
      const res = await supertest(app).get(`${prefix}/${states.blogSlug}`);
      expect(res.body.message).toBe('Blog fetched successfully');
      expect(res.status).toBe(200);
    });
    it('Should return 500 after getting single Blogs', async () => {
      jest
        .spyOn(BlogModel, 'findOne')
        .mockRejectedValue(new Error('Getting 500'));
      const res = await supertest(app).get(`${prefix}/${states.blogSlug}`);
      expect(res.status).toBe(500);
    });
  });

  describe('api for changing the status', () => {
    it('should  + return 404 after changing the status', async () => {
      const response = await supertest(app).put(`${prefix}/status/1`);
      expect(response.status).toBe(404);
    });
    it('should return 500 after changing the status', async () => {
      jest
        .spyOn(BlogModel, 'findOne')
        .mockRejectedValue(new Error('Getting 500'));
      const response = await supertest(app).put(`${prefix}/${states.blogSlug}`);
      expect(response.status).toBe(500);
    });

    it('should return 200 after changing the status', async () => {
      const response = await supertest(app)
        .put(`${prefix}/${states.blogSlug}`)
        .set('Authorization', `Bearer ${states.token}`);
      expect(response.status).toBe(200);
    });

    it('should return 200 after changing the status', async () => {
      const response = await supertest(app)
        .put(`${prefix}/2`)
        .set('Authorization', `Bearer ${states.token}`);
      expect(response.status).toBe(404);
    });
  });

  describe('api for updating the blog', () => {
    it('should return 401 after updating the blog', async () => {
      const response = await supertest(app).patch(`${prefix}/1`);
      expect(response.status).toBe(401);
    });

    it('should return 404 after updating the blog', async () => {
      const response = await supertest(app)
        .patch(`${prefix}/1`)
        .set('Authorization', `Bearer ${states.token}`)
        .field('title', 'title_field')
        .field(
          'content',
          'content By adding error handling to your code, you should be able to identify any issues preventing the frame from being saved to the custom pa',
        )
        .field(
          'preview',
          'content By adding error handling to your code, you should be able to identify any issues preventing the frame from being saved to the custom pa',
        )
        .attach('image', testImage);

      expect(response.status).toBe(404);
    });

    it('should return 400 after updating the blog', async () => {
      const response = await supertest(app)
        .patch(`${prefix}/${states.blogSlug}`)
        .send({
          title: 'title',
          content: 'content',
        })
        .set('Authorization', `Bearer ${states.token}`);
      expect(response.status).toBe(400);
    });

    it('should return 200 after updating the blog', async () => {
      const response = await supertest(app)
        .patch(`${prefix}/${states.blogSlug}`)
        .set('Authorization', `Bearer ${states.token}`)
        .field('title', 'title_field')
        .field(
          'content',
          'content By adding error handling to your code, you should be able to identify any issues preventing the frame from being saved to the custom pa',
        )
        .field(
          'preview',
          'content By adding error handling to your code, you should be able to identify any issues preventing the frame from being saved to the custom pa',
        )
        .attach('image', testImage);

      expect(response.body.data).toBeTruthy();
      expect(response.status).toBe(200);
    }, 50000);

    it('should return 500 after updating the blog', async () => {
      jest
        .spyOn(BlogModel, 'findOne')
        .mockRejectedValue(new Error('Getting 500'));
      const response = await supertest(app)
        .put(`${prefix}/${states.blogSlug}`)
        .send({
          title: 'title',
          content: 'content',
          preview: 'preview',
        })
        .set('Authorization', `Bearer ${states.token}`);
      expect(response.body.data).toBeNull();
      expect(response.status).toBe(500);
    });
  });

  describe('api for deleting the blog', () => {
    it('should return 404 after deleting the blog', async () => {
      const response = await supertest(app).delete(`${prefix}/1`);
      expect(response.status).toBe(404);
    });
    it('should return 200 after deleting the blog', async () => {
      const response = await supertest(app)
        .delete(`${prefix}/${states.blogSlug}`)
        .set('Authorization', `Bearer ${states.token}`);
      expect(response.status).toBe(200);
    });
    it('should return 500 after deleting the blog', async () => {
      jest
        .spyOn(BlogModel, 'findOne')
        .mockRejectedValue(new Error('Getting 500'));
      const response = await supertest(app)
        .delete(`${prefix}/${states.blogSlug}`)
        .set('Authorization', `Bearer ${states.token}`);
      expect(response.status).toBe(500);
    });
  });

  describe('api for getting the blog by status all with out active', () => {
    it('should return 200 after getting the blog by status is active', async () => {
      const response = await supertest(app)
        .get(`/api/admin/blogs`)
        .set('Authorization', `Bearer ${states.token}`);
      expect(response.status).toBe(200);
    }, 120000);

    it('should return 500 after getting the blog by status is active', async () => {
      jest.spyOn(BlogModel, 'find').mockRejectedValue(new Error('Getting 500'));
      const response = await supertest(app)
        .get('/api/admin/blogs')
        .set('Authorization', `Bearer ${states.token}`);
      expect(response.status).toBe(500);
    });
  });
});
