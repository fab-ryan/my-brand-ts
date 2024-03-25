import { model, Schema } from 'mongoose';
import { IModalResume } from '../types';

const resumeSchema: Schema = new Schema<IModalResume>(
  {
    browser: {
      type: String,
      required: true,
    },
    os: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const resumes = model<IModalResume>('Resume', resumeSchema);

export { resumes as ResumeModel };
