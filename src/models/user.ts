import { IModalUser } from '../types';
import { Schema, model } from 'mongoose';


const UserSchema = new Schema<IModalUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: false,
    default: Date.now,
  },
});
type Payload = {
  id: string;
  email: string;
};



const User = model<IModalUser>('User', UserSchema);

export { User as UserModel };
