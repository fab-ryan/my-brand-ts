import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { errorResponse } from '../utils';

interface IUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: Error, user: IUser | boolean) => {
      if (err || !user) {
        return errorResponse(res, null, 'Unauthorized', 401);
      }
      req.user = user;
      return next();
    },
  )(req, res, next);
};

export const isRequireAuthOptional = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: Error, user: IUser | boolean) => {
      if (err || !user) {
        return next();
      }
      req.user = user;
      return next();
    },
  )(req, res, next);
};

export const isLoggedIn = (req: Request, res: Response) => {
  const user = req?.user as IUser;
  if (!user) {
    return false;
  }
  return true;
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as IUser;
  if (user?.role !== 'admin') {
    return errorResponse(res, null, 'Unauthorized', 401);
  }
  return next();
};
