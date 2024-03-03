import { educationController } from '../controllers';
import { Router } from 'express';
import { validate, isAuthenticated, isAdmin } from '../middlewares';
import { educationSchema } from '../schemas';
import { requestType } from '../types';

const educationRouter = Router();

educationRouter.get('/educations', educationController.getEducation);
educationRouter.get('/educations', educationController.getEducations);
educationRouter.post(
  '/educations',
  isAuthenticated,
  isAdmin,
  validate(educationSchema, requestType.body),
  educationController.createEducation,
);
educationRouter.patch(
  '/educations/:id',
  isAuthenticated,
  isAdmin,
  validate(educationSchema, requestType.body),
  educationController.updateEducation,
);
educationRouter.delete(
  '/educations/:id',
  isAuthenticated,
  isAdmin,
  educationController.deleteEducation,
);

export default educationRouter;
