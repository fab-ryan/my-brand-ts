import { z, ZodError, AnyZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils';
import { requestType } from '../types';



export const validate =
  (schema: AnyZodObject, type:requestType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[type]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        errorResponse(
          res,
          error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),

          'Validation Error',
          400,
        );
      } else {
        next(error);
      }
    }
  };
