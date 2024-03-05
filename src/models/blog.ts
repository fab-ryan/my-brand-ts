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
  status: {
    type: Boolean,
    required: true,
    default: true,
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
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Likes',
    },
  ],
});

const Blog = model<IModalBlog>('Blog', BlogSchema);

export { Blog as BlogModel };
