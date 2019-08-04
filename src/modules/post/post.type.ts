import { Document } from 'mongoose';

export interface IPost extends Document {
  _id: string;
  url: string;
  content: string;
  image?: string;
  createdAt?: Date
  updatedAt?: Date
}