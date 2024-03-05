import { Schema, model } from 'mongoose';
import { IModalQuery } from '../types';

const QuerySchema = new Schema<IModalQuery>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
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

const Query = model<IModalQuery>('Query', QuerySchema);

export { Query as QueryModel };