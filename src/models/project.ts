import { IModalProjects } from '../types';

import { model, Schema } from 'mongoose';

const ProjectSchema: Schema = new Schema<IModalProjects>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'ProjectCategory',
    },
    image: {
      type: String,
      required: true,
    },
    url: {
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

const project = model<IModalProjects>('Project', ProjectSchema);

export { project as ProjectModel };
