import { BlogModel } from '../models';
import { Request, Response } from 'express';
import {
  errorResponse,
  successResponse,
  fileUpload,
  generateSlug,
  deleteFile,
} from '../utils';

interface IBodyRequest extends Request {
  body: {
    title: string;
    preview: string;
    content: string;
    image?: string;
  };
}

interface IParamsRequest extends Request {
  params: {
    slug: string;
  };
}

class BlogController {
  // getting all Blogs
  public async getBlogs(req: Request, res: Response): Promise<void> {
    try {
      const blogs = await BlogModel.find();
      successResponse(res, blogs, 'Blogs fetched successfully', 200);
    } catch (error) {
      const errorMessage = (error as Error).message;
     
      errorResponse(res, null, errorMessage, 500);
    }
  }

  // creating a Blog
  public async createBlog(req: IBodyRequest, res: Response): Promise<void> {
    try {
      if (req.file) {
        req.body.image = await fileUpload(req, 'blog');
      }
      const slug = await generateSlug(req.body.title, BlogModel);
      const blog = await BlogModel.create({
        ...req.body,
        slug,
        createdAt: new Date(),
      });
      successResponse(res, blog, 'Blog created successfully', 201);
    } catch (error) {
      const errorMessage =  (error as Error).message;
      errorResponse(res, null, errorMessage, 500);
    }
  }
  // change status of a blog
  public async changeStatus(req: IParamsRequest, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const blog = await BlogModel.findOne({ slug });
      if (blog) {
        blog.status = !blog.status;
        blog.save();
        successResponse(res, blog, 'Blog status updated successfully', 200);
      } else {
        errorResponse(res, null, 'Blog not found', 404);
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      errorResponse(res, null, errorMessage, 500);
    }
  }

  public async getBlog(req: IParamsRequest, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const blog = await BlogModel.findOne({ slug });
      if (blog) {
        successResponse(res, blog, 'Blog fetched successfully', 200);
      } else {
        errorResponse(res, null, 'Blog not found', 404);
      }
    } catch (error) {
      const errorMessage = 'Error getting blog';
      errorResponse(res, null, errorMessage, 500);
    }
  }
  public async updateBlog(req: IParamsRequest, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const blog = await BlogModel.findOne({ slug });
      
      if (blog) {
        if (req.file) {
          req.body.image = await fileUpload(req, 'blog');
          await deleteFile(blog.image);
        }
        const updatedBlog = await BlogModel.findOneAndUpdate(
          { slug },
          { ...req.body },
          { new: true },
        );
        successResponse(res, updatedBlog, 'Blog updated successfully', 200);
      } else {
        errorResponse(res, null, 'Blog not found', 404);
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      errorResponse(res, null, errorMessage, 500);
    }
  }

  public async deleteBlog(req: IParamsRequest, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const blog = await BlogModel.findOne({ slug });
      if (blog) {
        await BlogModel.findOneAndDelete({ slug });
        successResponse(res, null, 'Blog deleted successfully', 200);
      } else {
        errorResponse(res, null, 'Blog not found', 404);
      }
    } catch (error) {
      const errorMessage = 'Error deleting blog';
      errorResponse(res, null, errorMessage, 500);
    }
  }
  public async getActiveBlogs(req: Request, res: Response): Promise<void> {
    try {
      const blogs = await BlogModel.find();
      const activeBlogs = blogs.filter((blog) => blog.status);

      successResponse(res, activeBlogs, 'Blogs fetched successfully', 200);
    } catch (error) {
      const errorMessage = 'Error getting blogs';
      errorResponse(res, null, errorMessage, 500);
    }
  }
}

export { BlogController };
