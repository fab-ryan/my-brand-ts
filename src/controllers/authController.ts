import { UserModel } from '../models';
import {
  decryptPassword,
  successResponse,
  errorResponse,
  generateToken,
} from '../utils';
import { Request, Response } from 'express';

interface ILoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export const loginController = async (req: ILoginRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return errorResponse(res, null, 'User Not Found', 400);
    }

    const isMatch = await decryptPassword(password, user.password);
    if (!isMatch) {
      return errorResponse(res, null, 'Invalid Credentials', 400);
    }

    const token = generateToken({ id: user._id, email: user.email ,role: user.role});
    const payload = {
      access_token: token,
      token_type: 'Bearer',
      role: user.role,
    };
    return successResponse(res, payload, 'Login Successful', 200);
  } catch (error) {
    const message = (error as Error).message;
    return errorResponse(res, null, message, 500);
  }
};
