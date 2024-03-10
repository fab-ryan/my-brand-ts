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
  comments: Types.ObjectId[];
  likes: Types.ObjectId[];
}

export interface IModalUser {
  _id?: Types.ObjectId;
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

export interface IModalQuery {
  _id: Types.ObjectId;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IModalComment {
  _id: Types.ObjectId;
  blog: Types.ObjectId;
  name: string;
  email: string;
  comment: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IModalLikes {
  _id: Types.ObjectId;
  blog: Types.ObjectId;
  likes: number;
  os: string;
  browser: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IModalSubscribers {
  _id: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IModalSkills {
  _id: Types.ObjectId;
  name: string;
  percent: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IModalProjectCategory {
  _id: Types.ObjectId;
  name: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IModalProjects {
  _id: Types.ObjectId;
  title: string;
  description: string;
  category: Types.ObjectId;
  image: string;
  url: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IModalEducation {
  _id: Types.ObjectId;
  institution: string;
  field: string;
  degree: string;
  start: Date;
  end: Date;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
