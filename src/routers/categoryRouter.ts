import { Router } from 'express';
import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  changeCategoryStatus,
} from '../controllers';
import { isAuthenticated, isAdmin, validate } from '../middlewares';
import { categoryQuerySchema, categorySchema } from '../schemas';
import { requestType } from '../types';

const categoryRouter = Router();

categoryRouter.get(
  '/categories',
  validate(categoryQuerySchema, requestType['query']),
  getCategories,
);
categoryRouter.get('/categories/:id', getCategory);
categoryRouter.post(
  '/categories',
  isAuthenticated,
  isAdmin,
  validate(categorySchema, requestType['body']),
  createCategory,
);
categoryRouter.put(
  '/categories/:id',
  isAuthenticated,
  isAdmin,
  validate(categorySchema, requestType['body']),
  updateCategory,
);
categoryRouter.patch(
  '/categories/:id',
  isAuthenticated,
  isAdmin,
  changeCategoryStatus,
);

export default categoryRouter;
