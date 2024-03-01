import { Router } from 'express';
import { BlogController } from '../controllers';

const router = Router();

router.get('/blogs', new BlogController().getBlogs);

export default router;