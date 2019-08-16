import { Schema, model, Model } from 'mongoose';
import { IVote } from './vote.type';

const voteSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  byUser: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  upVote: { type : Number },
  downVote: { type : Number },
  createdAt: { type : Date, default: Date.now }
})

export const voteModel: Model<IVote> = model<IVote>('Vote', voteSchema);