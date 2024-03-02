import { Types } from 'mongoose';

export interface IModalBlog {
  slug: string;
  title: string;
  status: boolean;
  preview: string;
  content: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IModalUser {
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

enum Role {
  admin = 'admin',
  user = 'user',
}
