import { ProjectCategoryModel } from '../models';
import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../utils';

interface ICategoryQuery extends Request {
  query: {
    status: string;
  };
}

export const getCategories = async (
  req: ICategoryQuery,
  res: Response,
): Promise<void> => {
  try {
    const status = req.query.status;
    const categories = status
      ? await ProjectCategoryModel.find({ status })
      : await ProjectCategoryModel.find();
    successResponse(res, categories, 'Categories retrieved successfully');
  } catch (error) {
    const errorMessages = (error as Error).message;
    errorResponse(res, null, errorMessages, 500);
  }
};

export const getCategory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const category = await ProjectCategoryModel.findById(req.params.id);
    successResponse(res, category, 'Category retrieved successfully', 200);
  } catch (error) {
    const errorMessages = (error as Error).message;
    errorResponse(res, null, errorMessages, 500);
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const category = await ProjectCategoryModel.create(req.body);
    successResponse(res, category, 'Category created successfully', 201);
  } catch (error) {
    const errorMessages = (error as Error).message;
    errorResponse(res, null, errorMessages, 500);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const category = await ProjectCategoryModel.findOne({ _id: req.params.id });
    if (category) {
      await category.updateOne(req.body);
      successResponse(res, category, 'Category updated successfully', 201);
    } else {
      errorResponse(res, null, 'Category not found', 404);
    }
  } catch (error) {
    const errorMessages = (error as Error).message;
    errorResponse(res, null, errorMessages, 500);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const category = await ProjectCategoryModel.findOne({ _id: req.params.id });
    if (category) {
      await category.deleteOne();
      successResponse(res, null, 'Category deleted successfully');
    } else {
      errorResponse(res, null, 'Category not found', 404);
    }
  } catch (error) {
    const errorMessages = (error as Error).message;
    errorResponse(res, null, errorMessages, 500);
  }
};

export const changeCategoryStatus = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const category = await ProjectCategoryModel.findOne({ _id: req.params.id });
    if (category) {
      await category.updateOne({ status: !category.status });
      successResponse(res, 'Category status updated successfully');
    }
  } catch (error) {
    errorResponse(res, error);
  }
};
