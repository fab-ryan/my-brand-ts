import {IModalSkills} from '../types'
import {model, Schema} from 'mongoose'

const SkillSchema: Schema = new Schema<IModalSkills>(
  {
    name: {
      type: String,
      required: true,
    },
    percent: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const skill = model<IModalSkills>('Skill', SkillSchema);

export { skill as SkillModel };