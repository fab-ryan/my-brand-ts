import { Router } from 'express';
import {
  changeCommentStatus,
  createComment,
  deleteComment,
  getComments,
} from '../controllers';
import { validate, isAdmin, isAuthenticated } from '../middlewares';
import { commentValidation } from '../schemas';
import { requestType } from '../types';

const router = Router();

router.post(
  '/blogs/:slug/comment',
  validate(commentValidation, requestType['body']),
  createComment,
);
router.get('/blogs/:slug/comment',  isAuthenticated,isAdmin, getComments);
router.delete('/blogs/:slug/comment/:id',  isAuthenticated,isAdmin, deleteComment);
router.patch('/comment/:id', isAuthenticated, isAdmin, changeCommentStatus);

export default router;
