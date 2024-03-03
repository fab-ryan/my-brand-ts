import { IModalProjectCategory } from '../types';

import { model, Schema } from 'mongoose';

const ProjectCategorySchema: Schema = new Schema<IModalProjectCategory>(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const projectCategory = model<IModalProjectCategory>(
  'ProjectCategory',
  ProjectCategorySchema,
);

export { projectCategory as ProjectCategoryModel };
