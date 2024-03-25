import { Router } from 'express';
import { BlogController } from '../controllers';
import {
  validate,
  multerUploads,
  isAuthenticated,
  isAdmin,
} from '../middlewares';
import { blogSchema } from '../schemas';
import { requestType } from '../types';

const router = Router();

router.get('/blogs', new BlogController().getActiveBlogs);

router.post(
  '/blogs',
  isAuthenticated,
  isAdmin,
  multerUploads.single('image'),
  validate(blogSchema, requestType.body),
  new BlogController().createBlog,
);

router.put('/blogs/:slug', new BlogController().changeStatus);

router.delete('/blogs/:slug', new BlogController().deleteBlog);

router.get('/blogs/:slug', new BlogController().getBlog);

router.patch(
  '/blogs/:slug',
  isAuthenticated,
  isAdmin,
  multerUploads.single('image'),
  validate(blogSchema, requestType.body),
  new BlogController().updateBlog,
);

router.get(
  '/admin/blogs/',
  isAuthenticated,
  isAdmin,
  new BlogController().getBlogs,
);

router.get('/blogs/:slug/relates', new BlogController().getRelatedBlogs);
export default router;
