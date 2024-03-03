import { SkillModel } from '../models';
import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../utils';

interface ISkillQuery extends Request {
  query: {
    status: string;
  };
}

interface ISkillBody extends Request {
  body: {
    name: string;
    percentage: number;
  };
}

class skillController {
  static async getSkills(req: ISkillQuery, res: Response): Promise<void> {
    try {
      const status = req.query.status;
      const skills = status
        ? await SkillModel.find({ status })
        : await SkillModel.find();
      successResponse(res, skills, 'Skills retrieved successfully');
    } catch (error) {
      const errorMessages = (error as Error).message;
      errorResponse(res, null, errorMessages, 500);
    }
  }

  static async getSkill(req: Request, res: Response): Promise<void> {
    try {
      const skill = await SkillModel.findById(req.params.id);
      successResponse(res, skill, 'Skill retrieved successfully', 200);
    } catch (error) {
      const errorMessages = (error as Error).message;
      errorResponse(res, null, errorMessages, 500);
    }
  }

  static async createSkill(req: ISkillBody, res: Response): Promise<void> {
    try {
      const skill = await SkillModel.create(req.body);
      successResponse(res, skill, 'Skill created successfully', 201);
    } catch (error) {
      const errorMessages = (error as Error).message;
      errorResponse(res, null, errorMessages, 500);
    }
  }

  static async updateSkill(req: Request, res: Response): Promise<void> {
    try {
      const skill = await SkillModel.findOne({ _id: req.params.id });
      if (skill) {
        await skill.updateOne(req.body);
        successResponse(res, skill, 'Skill updated successfully', 200);
      } else {
        errorResponse(res, null, 'Skill not found', 404);
      }
    } catch (error) {
      const errorMessages = (error as Error).message;
      errorResponse(res, null, errorMessages, 500);
    }
  }

  static async deleteSkill(req: Request, res: Response): Promise<void> {
    try {
      const skill = await SkillModel.findOne({ _id: req.params.id });
      if (skill) {
        await skill.deleteOne();
        successResponse(res, null, 'Skill deleted successfully', 200);
      } else {
        errorResponse(res, null, 'Skill not found', 404);
      }
    } catch (error) {
      const errorMessages = (error as Error).message;
      errorResponse(res, null, errorMessages, 500);
    }
  }

  static async changeSkillStatus(req: Request, res: Response): Promise<void> {
    try {
      const skill = await SkillModel.findOne({ _id: req.params.id });
      if (skill) {
        await skill.updateOne({ status: !skill.status });
        successResponse(res, null, 'Skill status changed successfully', 200);
      } else {
        errorResponse(res, null, 'Skill not found', 404);
      }
    } catch (error) {
      const errorMessages = (error as Error).message;
      errorResponse(res, null, errorMessages, 500);
    }
  }
}

export { skillController };
