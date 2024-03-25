import { getLikes, createLike } from '../controllers';
import { Router } from 'express';
import { validate, isAuthenticated, isAdmin } from '../middlewares';

const router = Router();

router.post('/blogs/:slug/like', createLike);
router.get('/blogs/:slug/like', getLikes);

export default router;