import { QueryController } from '../controllers';
import { Router } from 'express';
import { validate, isAdmin, isAuthenticated } from '../middlewares';
import { QuerySchema, QueryParamsSchema } from '../schemas';
import { requestType } from '../types';

const router = Router();

router.get('/queries', isAuthenticated, isAdmin, new QueryController().getQueries);
router.get(
  '/queries/:id',
  isAuthenticated,
  isAdmin,
  validate(QueryParamsSchema, requestType.params),
  new QueryController().getQuery,
);
router.post(
  '/queries/',
  validate(QuerySchema, requestType.body),
  new QueryController().createQuery,
);
router.delete(
  '/queries/:id',
  isAuthenticated,
  isAdmin,
  validate(QueryParamsSchema, requestType.params),
  new QueryController().deleteQuery,
);

export default router;