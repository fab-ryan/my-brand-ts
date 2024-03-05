import { EducationModel } from '../models';
import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../utils';

interface IEducationQuery extends Request {
  query: {
    status: string;
  };
}

interface IEducationBody extends Request {
  body: {
    institution: string;
    degree: string;
    field: string;
    start: string;
    end: string;
    description: string;
  };
}
class educationController {
  static async getEducations(
    req: IEducationQuery,
    res: Response,
  ): Promise<void> {
    try {
      const status = req.query.status;
      const educations = await EducationModel.find();
      console.log(status, educations);
      successResponse(res, educations, 'Educations retrieved successfully');
    } catch (error) {
      const errorMessages = (error as Error).message;
      errorResponse(res, null, errorMessages, 500);
    }
  }

  static async getEducation(req: Request, res: Response): Promise<void> {
    try {
      const education = await EducationModel.findById(req.params.id);
      successResponse(res, education, 'Education retrieved successfully', 200);
    } catch (error) {
      const errorMessages = (error as Error).message;
      errorResponse(res, null, errorMessages, 500);
    }
  }

  static async createEducation(
    req: IEducationBody,
    res: Response,
  ): Promise<void> {
    try {
      const education = await EducationModel.create(req.body);
      successResponse(res, education, 'Education created successfully', 201);
    } catch (error) {
      const errorMessages = (error as Error).message;
      errorResponse(res, null, errorMessages, 500);
    }
  }

  static async updateEducation(req: Request, res: Response): Promise<void> {
    try {
      const education = await EducationModel.findOne({ _id: req.params.id });
      if (education) {
        await education.updateOne(req.body);
        successResponse(res, education, 'Education updated successfully', 200);
      } else {
        errorResponse(res, null, 'Education not found', 404);
      }
    } catch (error) {
      const errorMessages = (error as Error).message;
      errorResponse(res, null, errorMessages, 500);
    }
  }

  static async deleteEducation(req: Request, res: Response): Promise<void> {
    try {
      const education = await EducationModel.findOne({ _id: req.params.id });
      if (education) {
        await education.deleteOne();
        successResponse(res, null, 'Education deleted successfully', 200);
      } else {
        errorResponse(res, null, 'Education not found', 404);
      }
    } catch (error) {
      const errorMessages = (error as Error).message;
      errorResponse(res, null, errorMessages, 500);
    }
  }
}

export { educationController };
