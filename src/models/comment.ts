import { IModalComment } from '../types';
import { model, Schema } from 'mongoose';

const CommentSchema: Schema = new Schema(
  {
    blog: {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const comment = model<IModalComment>('Comment', CommentSchema);

export { comment as CommentModel };
