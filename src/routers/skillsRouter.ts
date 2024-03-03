import { skillController } from '../controllers';
import { Router } from 'express';

import { validate, isAuthenticated, isAdmin } from '../middlewares';
import { skillSchema } from '../schemas';
import { requestType } from '../types';

const skillRouter = Router();

skillRouter.get('/skills', skillController.getSkills);
skillRouter.get(
  '/skills/:id',
  isAuthenticated,
  isAdmin,
  skillController.getSkill,
);
skillRouter.post(
  '/skills',
  isAuthenticated,
  isAdmin,
  validate(skillSchema, requestType.body),
  skillController.createSkill,
);
skillRouter.patch(
  '/skills/:id',
  isAuthenticated,
  isAdmin,
  validate(skillSchema, requestType.body),
  skillController.updateSkill,
);
skillRouter.delete(
  '/skills/:id',
  isAuthenticated,
  isAdmin,
  skillController.deleteSkill,
);

export default skillRouter;
