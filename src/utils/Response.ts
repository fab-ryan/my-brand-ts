import { Response } from 'express';

interface IResponse<T> {
  success: boolean;
  message: string;
  data: T;
  statusCode?: number;
}

export const successResponse = <T>(
  res: Response,
  data: T,
  message = 'Success',
  statusCode = 200,
): void => {
  const response: IResponse<T> = {
    success: true,
    message,
    data,
    statusCode,
  };
  res.status(statusCode).json(response);
};

export const errorResponse = (
  res: Response,
  message = 'Internal Server Error',
  statusCode = 500,
): void => {
  const response: IResponse<null> = {
    success: false,
    message,
    data: null,
    statusCode,
  };
  res.status(statusCode).json(response);
};
