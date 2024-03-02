import { Router } from 'express';
import { loginController } from '../controllers';
import { validate } from '../middlewares';
import { loginSchema } from '../schemas';
import { requestType } from '../types';
const router = Router();

router.post('/login', validate(loginSchema, requestType.body), loginController);

export default router;
