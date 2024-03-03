import { IModalSubscribers } from '../types';
import { model, Schema } from 'mongoose';

const SubscribersSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const subscribers = model<IModalSubscribers>('Subscribers', SubscribersSchema);

export { subscribers as SubscribersModel };
