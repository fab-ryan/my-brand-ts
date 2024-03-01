import { z, ZodError, AnyZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';
import {errorResponse} from '../utils'

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parseAsync({
        ...req.body,
        ...req.params,
        ...req.query,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
       errorResponse(res,  error.errors,'Validation Error', 400);
      } else {
        next(error);
      }
    }
  };
