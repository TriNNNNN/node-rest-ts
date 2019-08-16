import { Document } from 'mongoose';

export interface IVote extends Document {
  _id: string;
  postId?: string,
  byUser?: string,
  comment?: string;
  upVote?: number;
  downVote?: number;
  createdAt?: Date;
  voteId? : string;
}