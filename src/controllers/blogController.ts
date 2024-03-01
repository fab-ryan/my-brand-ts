import { BlogModel } from '../models';
import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../utils';

interface IBodyRequest extends Request {
  body: {
    title: string;
    preview: string;
    content: string;
  };
}

class BlogController {
  // getting all Blogs
  public async getBlogs(req: Request, res: Response): Promise<void> {
    try {
      const blogs = await BlogModel.find();
      successResponse(res, blogs, 'Blogs fetched successfully', 200);
    } catch (error) {
      const errorMessage = 'Error getting blogs';
      errorResponse(res, null, errorMessage, 500);
    }
  }

  // creating a Blog
  public async createBlog(req: IBodyRequest, res: Response): Promise<void> {
    try {
      const blog = await BlogModel.create(req.body);
      successResponse(res, blog, 'Blog created successfully', 201);
    } catch (error) {
      const errorMessage = 'Error creating blog';
      errorResponse(res, null, errorMessage, 500);
    }
  }
}

export { BlogController };
