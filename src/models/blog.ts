import { Schema, model } from 'mongoose';

import { IModalBlog } from '../types';

const BlogSchema = new Schema<IModalBlog>({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  preview: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
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

const Blog = model<IModalBlog>('Blog', BlogSchema);

export { Blog as BlogModel };
