import { Schema, model, Model } from 'mongoose';
import { IUser } from './user.type';

const userSchema = new Schema({
  firstname: { type : String, required: true },
  lastname: { type : String, required: true },
  email: { type : String, required: true, unique: true },
  password: { type : String, required: true },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  userRole: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer',
  },
  post: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  twoFactorAuthenticationCode: String,
  isTwoFactorAuthenticationEnabled: { type : Boolean, default: false },
  createdAt: { type : Date, default: Date.now }
})

export const userModel: Model<IUser> = model<IUser>('User', userSchema);