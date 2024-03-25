import { CommentModel, BlogModel } from '../models';
import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../utils';
import { validate } from '../middlewares';
import { commentValidation } from '../schemas';
import { requestType } from '../types';

interface ICommentRequest extends Request {
  body: {
    name: string;
    email: string;
    comment: string;
  };
  params: {
    slug: string;
  };
}

interface IUser {
  name: string;
  email: string;
}

export const createComment = async (
  req: ICommentRequest,
  res: Response,
): Promise<void> => {
  try {
    const UserInfor = {
      name: '',
      email: '',
    };
    if (!req.user) {
      const { name, email } = req.body;
      UserInfor.name = name;
      UserInfor.email = email;
    } else {
      const user = req.user as IUser;
      UserInfor.name = user.name;
      UserInfor.email = user.email;
    }

    const { comment } = req.body;
    const { slug } = req.params;

    const blog = await BlogModel.findOne({ slug });
    if (!blog) {
    return  errorResponse(res, null, 'Blog not found', 404);
    } else {
      const newComment = new CommentModel({
        blog: blog._id,
        name: UserInfor.name,
        email: UserInfor.email,
        comment,
      });
      await newComment.save();
      blog.comments.push(newComment._id);
      await blog.save();
     return successResponse(res, newComment, 'Comment created', 201);
    }
  } catch (error) {
    const message = (error as Error).message;
    console.log('error', error, message);
    throw errorResponse(res, null, message, 500);
  }
};

export const getComments = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { slug } = req.params;
    const blog = await BlogModel.findOne({ slug });
    if (!blog) {
      errorResponse(res, null, 'Blog not found', 404);
    } else {
      const comments = await CommentModel.find({ blog: blog._id })
        .populate('blog', 'title slug -_id')
        .sort('-createdAt');
      successResponse(res, comments, 'Comments found', 200);
    }
  } catch (error) {
    return errorResponse(res, error, 'Error getting comments', 500);
  }
};

export const deleteComment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { slug, id } = req.params;
    const blog = await BlogModel.findOne({ slug });
    if (!blog) {
      errorResponse(res, null, 'Blog not found', 404);
    } else {
      const comment = await CommentModel.findByIdAndDelete(id);
      if (!comment) {
        errorResponse(res, null, 'Comment not found', 404);
      } else {
        blog.comments = blog.comments.filter((c) => c.toString() !== id);
        await blog.save();
        successResponse(res, null, 'Comment deleted', 200);
      }
    }
  } catch (error) {
    return errorResponse(res, error, 'Error deleting comment', 500);
  }
};

export const changeCommentStatus = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const comment = await CommentModel.findByIdAndUpdate(id);

    if (!comment) {
      errorResponse(res, null, 'Comment not found', 404);
    } else {
      comment.status = !comment.status;
      await comment.save();
      successResponse(res, null, 'Comment status changed', 200);
    }
  } catch (error) {
    return errorResponse(res, error, 'Error changing comment status', 500);
  }
};
