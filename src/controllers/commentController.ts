import { CommentModel, BlogModel } from '../models';
import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../utils';

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

export const createComment = async (
  req: ICommentRequest,
  res: Response,
): Promise<void> => {
  try {
    const { name, email, comment } = req.body;
    const { slug } = req.params;

    const blog = await BlogModel.findOne({ slug });
    if (!blog) {
      throw errorResponse(res, null, 'Blog not found', 404);
    }

    const newComment = new CommentModel({
      blog: blog._id,
      name,
      email,
      comment,
    });

    await newComment.save();
    blog.comments.push(newComment._id);
    await blog.save();

    return successResponse(res, newComment, 'Comment created', 201);
  } catch (error) {
    return errorResponse(res, error, 'Error creating comment', 500);
  }
};

export const getComments = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const comments = await CommentModel.find()
      .populate('blog', 'title slug -_id')
      .sort('-createdAt');
    return successResponse(res, comments, 'Comments found', 200);
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
      throw errorResponse(res, null, 'Blog not found', 404);
    }

    const comment = await CommentModel.findByIdAndDelete(id);
    if (!comment) {
      throw errorResponse(res, null, 'Comment not found', 404);
    }

    blog.comments = blog.comments.filter((c) => c.toString() !== id);
    await blog.save();

    return successResponse(res, null, 'Comment deleted', 200);
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
      throw errorResponse(res, null, 'Comment not found', 404);
    }
    comment.status = !comment.status;
    await comment.save();
    return successResponse(res, null, 'Comment status changed', 200);
  } catch (error) {
    return errorResponse(res, error, 'Error changing comment status', 500);
  }
};
