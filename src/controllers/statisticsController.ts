import { BlogModel, CommentModel, LikesModel, UserModel } from '../models';
import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../utils';

export const getStatistics = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const blogs = await BlogModel.countDocuments();
    const comments = await CommentModel.countDocuments();
    const likes = await LikesModel.countDocuments();
    const users = await UserModel.countDocuments();
    return successResponse(
      res,
      { blogs, comments, likes, users },
      'Statistics found',
      200,
    );
  } catch (error) {
    return errorResponse(res, error, 'Error getting statistics', 500);
  }
};
