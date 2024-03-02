import { Router, Response, Request, NextFunction } from 'express';
import { successResponse, errorResponse } from '../utils';
import BlogRouter from './blogRouter';
import UserRouter from './userRouter';
import AuthRouter from './authRouter';

const router = Router();

const routes: Router[] = [BlogRouter, UserRouter, AuthRouter];

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
