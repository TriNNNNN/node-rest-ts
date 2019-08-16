import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { userModel } from './user.model';
import { IUser } from './user.type';

export class UserService {

  public async getAllUsers(): Promise<IUser[]> {
    return userModel.find().select('-__v -password').populate('post', '_id title url');
  }

  public async generateHash(password: string): Promise<string> {
    return bcrypt.hashSync(password, 10);
  }

  public async saveUser(userData: IUser): Promise<IUser> {
    userData.password = await this.generateHash(userData.password);
    const userObj: IUser = new userModel(userData);

    return userObj.save();
  }

  public async updateUser(userId: string, userData: IUser): Promise<any> {
    const user: any = await userModel.findById(userId);
    user.set(userData);
    return user.save();
  }

  public async getUserByEmail(email: string): Promise<any> {
    return userModel.findOne({ email: email }, '+password  -__v');
  }

  public async updateUserPost(user: IUser, postData: string): Promise<any> {
    return userModel.findByIdAndUpdate(user._id,{ $push: { post: postData }}, { new: true, upsert: true });
  }
}