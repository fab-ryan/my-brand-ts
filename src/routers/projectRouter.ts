import { projectController } from '../controllers';
import { Router } from 'express';
import {
  validate,
  multerUploads,
  isAuthenticated,
  isAdmin,
} from '../middlewares';
import { projectSchema } from '../schemas';
import { requestType } from '../types';

const projectRouter = Router();

projectRouter.get('/projects', projectController.getProjects);
projectRouter.get('/projects/:id', projectController.getProject);
projectRouter.post(
  '/projects',
  isAuthenticated,
  isAdmin,
  multerUploads.single('image'),
  validate(projectSchema, requestType.body),
  projectController.createProject,
);
projectRouter.patch(
  '/projects/:id',
  isAuthenticated,
  isAdmin,
  multerUploads.single('image'),
  validate(projectSchema, requestType.body),
  projectController.updateProject,
);
projectRouter.patch(
  '/projects/:id/status',
  isAuthenticated,
  isAdmin,
  projectController.changeProjectStatus,
);

projectRouter.delete(
  '/projects/:id',
  isAuthenticated,
  isAdmin,
  projectController.deleteProject,
);

export default projectRouter;
