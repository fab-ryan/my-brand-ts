import { IModalLikes } from '../types';
import { model, Schema } from 'mongoose';

const LikesSchema: Schema = new Schema(
  {
    blog: {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
    },
    os: {
      type: String,
      required: false,
      default: 'Unknown',
    },
    browser: {
      type: String,
      required: false,
      default: 'Unknown',
    },
  },
  {
    timestamps: true,
  },
);

const likes = model<IModalLikes>('Likes', LikesSchema);

export { likes as LikesModel };
