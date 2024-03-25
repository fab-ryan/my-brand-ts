import { Router, Request, Response, NextFunction } from 'express';
import {
  changeCommentStatus,
  createComment,
  deleteComment,
  getComments,
} from '../controllers';
import {
  validate,
  isAdmin,
  isAuthenticated,
  isRequireAuthOptional,
  isLoggedIn,
} from '../middlewares';
import { commentValidation } from '../schemas';
import { requestType } from '../types';

const router = Router();

router.post(
  '/blogs/:slug/comments',
  isRequireAuthOptional,
  validate(commentValidation, requestType['body'], true),
  createComment,
);
router.get('/blogs/:slug/comment', getComments);
router.delete(
  '/blogs/:slug/comment/:id',
  isAuthenticated,
  isAdmin,
  deleteComment,
);
router.patch('/comment/:id', isAuthenticated, isAdmin, changeCommentStatus);

export default router;
