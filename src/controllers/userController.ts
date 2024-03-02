import { UserModel } from '../models';
import { Request, Response } from 'express';
import { errorResponse, successResponse, encryptPassword } from '../utils';

interface IBodyRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
    role?: string;
  };
}

interface IParamsRequest extends Request {
  params: {
    id: string;
  };
}

class UserController {
  // getting all users
  public async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserModel.find();
      successResponse(res, users, 'Users fetched successfully', 200);
    } catch (error) {
      const errorMessage = (error as Error).message || 'Error getting users';
      errorResponse(res, null, errorMessage, 500);
    }
  }

  // creating a user
  public async createUser(req: IBodyRequest, res: Response): Promise<void> {
    try {
      req.body.password = await encryptPassword(req.body.password);

      const user = await UserModel.create(req.body);

      const { password, ...userWithoutPassword } = user.toObject();
      successResponse(
        res,
        userWithoutPassword,
        'User created successfully',
        201,
      );
    } catch (error) {
      const errorMessage = (error as Error).message || 'Error creating user';
      errorResponse(res, null, errorMessage, 500);
    }
  }

  // updating a user
  public async updateUser(req: IBodyRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const user = await UserModel.findOne({ _id: id });
      if (!user) {
        errorResponse(res, null, 'User not found', 404);
        return;
      }
      if (req.body.password) {
        req.body.password = await encryptPassword(req.body.password);
      }
      const updatedUser = await UserModel.findByIdAndUpdate(
        { _id: id },
        req.body,
      );
      const payload = {
        ...updatedUser?.toObject(),
        ...req.body,
        encryptPassword: undefined,
      };

      successResponse(res, payload, 'User updated successfully', 200);
    } catch (error) {
      const errorMessage = (error as Error).message || 'Error updating user';
      errorResponse(res, null, errorMessage, 500);
    }
  }

  // deleting a user
  public async deleteUser(req: IParamsRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await UserModel.findByIdAndDelete({ _id: id });
      successResponse(res, null, 'User deleted successfully', 200);
    } catch (error) {
      const errorMessage = (error as Error).message || 'Error deleting user';
      errorResponse(res, null, errorMessage, 500);
    }
  }

  // getting a user
  public async getUser(req: IParamsRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await UserModel.findOne({ _id: id });
      if (user) {
        successResponse(res, user, 'User fetched successfully', 200);
      } else {
        errorResponse(res, null, 'User not found', 404);
      }
    } catch (error) {
      const errorMessage = (error as Error).message || 'Error getting user';
      errorResponse(res, null, errorMessage, 500);
    }
  }
}

export { UserController };
