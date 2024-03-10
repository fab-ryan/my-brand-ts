import { QueryModel } from '../models';
import { Request, Response } from 'express';
import { successResponse, errorResponse } from '../utils';

interface QueryRequest extends Request {
  body: {
    name: string;
    email: string;
    message: string;
  };
}
interface QueryPamarsRequest extends Request {
  params: {
    id: string;
  };
}
class QueryController {
  public async getQueries(req: Request, res: Response): Promise<void> {
    try {
      const queries = await QueryModel.find();
      successResponse(res, queries, 'Queries retrieved successfully');
    } catch (error) {
      const errorMessage = (error as Error).message;
      errorResponse(res, null, errorMessage, 500);
    }
  }
  public async getQuery(req: QueryPamarsRequest, res: Response): Promise<void> {
    try {
      const query = await QueryModel.findById(req.params.id);
      if (!query) {
        errorResponse(res, null, 'Query not found', 404);
      }else{

        successResponse(res, query, 'Query retrieved successfully');
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      errorResponse(res, null, errorMessage, 500);
    }
  }

  public async createQuery(req: QueryRequest, res: Response): Promise<void> {
    try {
      const query = new QueryModel(req.body);
      await query.save();
      successResponse(res, query, 'Query created successfully', 201);
    } catch (error) {
      const errorMessage = (error as Error).message;
      errorResponse(res, null, errorMessage, 500);
    }
  }
  public async deleteQuery(
    req: QueryPamarsRequest,
    res: Response,
  ): Promise<void> {
    try {
      const query = await QueryModel.findByIdAndDelete(req.params.id);
      if (!query) {
        errorResponse(res, null, 'Query not found', 404);
      } else {
        successResponse(res, null, 'Query deleted successfully');
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      errorResponse(res, null, errorMessage, 500);
    }
  }
}

export { QueryController };
