import { IModalEducation } from '../types';

import { model, Schema } from 'mongoose';

const EducationSchema: Schema = new Schema<IModalEducation>(
  {
    institution: {
      type: String,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },

    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const education = model<IModalEducation>('Education', EducationSchema);

export { education as EducationModel };
