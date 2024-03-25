import { Router, Response, Request, NextFunction } from 'express';
import { successResponse, errorResponse } from '../utils';
import BlogRouter from './blogRouter';
import UserRouter from './userRouter';
import AuthRouter from './authRouter';
import QueryRouter from './queryRouter';
import CommentRouter from './commentRouter';
import LikeRouter from './likesRouter';
import CategoryRouter from './categoryRouter';
import ProjectRouter from './projectRouter';
import EducationRouter from './educationRouter';
import SkillRouter from './skillsRouter';


const router = Router();

const routes: Router[] = [
  BlogRouter,
  UserRouter,
  AuthRouter,
  QueryRouter,
  CommentRouter,
  LikeRouter,
  CategoryRouter,
  ProjectRouter,
  EducationRouter,
  SkillRouter,
];

router.use('/api', routes);

router.get('/', (req: Request, res: Response) => {
  successResponse(res, 'Welcome to the API!👋🏽👋🏽');
});


router.use((req: Request, res: Response) => {
  errorResponse(res, null, 'Route not found', 404);
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  errorResponse(res, null, err.message, 500);
});

export default router;
