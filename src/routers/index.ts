import { Router, Response, Request } from 'express';
import { successResponse, errorResponse } from '../utils';
import BlogRouter from './blogRouter';

const router = Router();
const routes: Router[] = [BlogRouter];

router.use('/api', routes);

router.get('/', (req: Request, res: Response) => {
  successResponse(res, 'Welcome to the API!👋🏽👋🏽');
});
router.use((req: Request, res: Response) => {
  errorResponse(res, 'Route not found', 404);
});

export default router;
