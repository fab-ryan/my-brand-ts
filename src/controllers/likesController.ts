import { LikesModel, BlogModel } from '../models/';
import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../utils';

interface ILikeRequest extends Request {
  body: {
    likes: number;
    os?: string;
    browser?: string;
  };
  params: {
    slug: string;
  };
}

export const createLike = async (
  req: ILikeRequest,
  res: Response,
): Promise<void> => {
  try {
    const { slug } = req.params;
    const blog = await BlogModel.findOne({ slug });
    if (!blog) {
     return  errorResponse(res, null, 'Blog not found', 404);
    }
    const userAgent = req.headers['user-agent'];
    const os = userAgent?.split(/[()]/)[1];
    const browser = userAgent?.split(/[()]/)[3];

    console.log(os, browser, userAgent);
    const newLike = new LikesModel({
      blog: blog._id,
      os,
      browser,
    });
    await newLike.save();
    blog.likes?.push(newLike._id);

    await blog.save();

    return successResponse(res, newLike, 'Like created', 201);
  } catch (error) {
    const errorMessage = (error as Error).message;
    return errorResponse(res, error, errorMessage, 500);
  }
};

export const getLikes = async (req: Request, res: Response): Promise<void> => {
  try {
    const likes = await LikesModel.find().sort('-createdAt');
    return successResponse(res, likes, 'Likes found', 200);
  } catch (error) {
    return errorResponse(res, error, 'Error getting likes', 500);
  }
};
