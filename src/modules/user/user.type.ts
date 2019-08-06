import { Document } from 'mongoose';

export interface IUser  extends Document {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  gender: string;
  userRole: string;
  twoFactorAuthenticationCode: string;
  isTwoFactorAuthenticationEnabled: boolean;
  createdAt: Date;
}
