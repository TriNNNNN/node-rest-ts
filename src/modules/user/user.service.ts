import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { userModel } from './user.model';
import { IUser } from './user.type';

export class UserService {

  public getAllUsers = async(): Promise<IUser[]> => {
    return userModel.find().select('-__v -password').populate('post', '_id title url');
  }

  public generateHash = async(password: string): Promise<string> => {
    return bcrypt.hashSync(password, 10);
  }

  public saveUser = async(userData: IUser): Promise<IUser> => {
    userData.password = await this.generateHash(userData.password);
    const userObj: IUser = new userModel(userData);

    return userObj.save();
  }

  public updateUser = async(userId: string, userData: IUser): Promise<any> => {
    const user: any = await userModel.findById(userId);
    user.set(userData);
    return user.save();
  }

  public getUserByEmail = async(email: string): Promise<any> => {
    return userModel.findOne({ email: email }, '+password  -__v');
  }

  public updateUserPost = async(user: IUser, postData: string): Promise<any> => {
    return userModel.findByIdAndUpdate(user._id,{ $push: { post: postData }}, { new: true, upsert: true });
  }

  public updateAuthenticationCode = async(user: any, base32: any ) => {
    return userModel.findByIdAndUpdate(user._id, {twoFactorAuthenticationCode: base32}, { new: true, upsert: true });
  }
}