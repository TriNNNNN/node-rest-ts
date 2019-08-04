import { Schema, model, Model } from 'mongoose';
import { IPost } from './post.type';

const postSchema = new Schema({
  title: { type : String, required: true},
  url: { type : String, required: true, unique: true, lowercase: true},
  content: { type : String, required: true},
  image:{ type : String },
  createdAt: { type : Date, default: Date.now },
  updatedAt: { type : Date, default: Date.now }
})

// export default model('Post', postSchema)

export const postModel: Model<IPost> = model<IPost>('Post', postSchema);