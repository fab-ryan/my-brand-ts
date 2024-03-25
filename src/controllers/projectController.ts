import { ProjectModel } from '../models';
import { Request, Response } from 'express';
import {
  errorResponse,
  successResponse,
  fileUpload,
  deleteFile,
} from '../utils';
interface IBodyRequest extends Request {
  body: {
    title: string;
    description: string;
    category: string;
    image?: string;
    url: string;
  };
}

class projectController {
  static async getProjects(req: Request, res: Response): Promise<void> {
    try {
      const { category, status } = req.query;

      const options = {
        ...(status !== undefined ? { status } : {}),
        ...(category && category !== 'all' ? { category: category } : {}),
      };
      const projects = await ProjectModel.find(options)
        .sort({ createdAt: -1 })
        .exec();

      successResponse(res, projects, 'Projects retrieved successfully');
    } catch (error) {
      const errorMessages = (error as Error).message;
      errorResponse(res, null, errorMessages, 500);
    }
  }

  static async getProject(req: Request, res: Response): Promise<void> {
    try {
      const project = await ProjectModel.findById(req.params.id);
      if (!project) {
        errorResponse(res, null, 'Project not found', 404);
      } else {
        successResponse(res, project, 'Project retrieved successfully', 200);
      }
    } catch (error) {
      const errorMessages = (error as Error).message;
      errorResponse(res, null, errorMessages, 500);
    }
  }

  static async createProject(req: IBodyRequest, res: Response): Promise<void> {
    try {
      if (req.file) {
        req.body.image = await fileUpload(req, 'project');
      }

      const project = await ProjectModel.create(req.body);
      successResponse(res, project, 'Project created successfully', 201);
    } catch (error) {
      const errorMessages = (error as Error).message;
      errorResponse(res, null, errorMessages, 500);
    }
  }

  static async updateProject(req: Request, res: Response): Promise<void> {
    try {
      if (req.file) {
        req.body.image = await fileUpload(req, 'project');
      }

      const project = await ProjectModel.findOne({ _id: req.params.id });
      if (project) {
        if (req.file) {
          if (project.image) {
            await deleteFile(project.image);
          }
        }

        await project.updateOne(req.body);
        successResponse(res, project, 'Project updated successfully', 200);
      } else {
        errorResponse(res, null, 'Project not found', 404);
      }
    } catch (error) {
      const errorMessages = (error as Error).message;
      errorResponse(res, null, errorMessages, 500);
    }
  }

  static async changeProjectStatus(req: Request, res: Response): Promise<void> {
    try {
      const project = await ProjectModel.findOne({ _id: req.params.id });
      if (project) {
        const status = project.status ? false : true;
        await project.updateOne({ status });
        successResponse(
          res,
          project,
          'Project status changed successfully',
          200,
        );
      } else {
        errorResponse(res, null, 'Project not found', 404);
      }
    } catch (error) {
      const errorMessages = (error as Error).message;
      errorResponse(res, null, errorMessages, 500);
    }
  }

  static async deleteProject(req: Request, res: Response): Promise<void> {
    try {
      const project = await ProjectModel.findOne({ _id: req.params.id });
      if (project) {
        if (project.image) {
          await deleteFile(project.image);
        }
        await project.deleteOne();
        successResponse(res, null, 'Project deleted successfully', 200);
      } else {
        errorResponse(res, null, 'Project not found', 404);
      }
    } catch (error) {
      const errorMessages = (error as Error).message;
      errorResponse(res, null, errorMessages, 500);
    }
  }
}

export { projectController };
