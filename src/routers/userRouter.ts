import { UserController } from '../controllers';
import { Router } from 'express';
import { userSchema } from '../schemas';
import { isAdmin, isAuthenticated, validate } from '../middlewares';
import { requestType } from '../types';

const router = Router();

router.get('/users', isAuthenticated, isAdmin, new UserController().getUsers);
router.post(
  '/users',
  validate(userSchema, requestType.body),
  new UserController().createUser,
);
router.put(
  '/users/:id',
  validate(userSchema, requestType.body),
  new UserController().updateUser,
);
router.delete('/users/:id', new UserController().deleteUser);
router.get('/users/:id', new UserController().getUser);

export default router;
