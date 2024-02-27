import { Router, Response, Request } from 'express';
import { successResponse, errorResponse } from '../utils';

const router = Router();




router.get('/', (req: Request, res: Response) => {
  successResponse(res, 'Welcome to the API!👋🏽👋🏽');
});
router.use((req: Request, res: Response) => {
  errorResponse(res, 'Route not found', 404);
});

export default router;