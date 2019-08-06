import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { userModel } from './user.model';
import { IUser } from './user.type';

export class UserService {

  public async getAllUsers(): Promise<IUser[]> {
    return userModel.find().select('-__v -password').populate('post', 'title url -_id');
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



  // public async loginUserAndCreateToken(email: string,password: string): Promise<any> {
  //   let user: IUser = await this.getUserByEmail(email);
  //   user = JSON.parse(JSON.stringify(user));
  //   if (user !== null) {
  //     const isValidPass: boolean = await this.comparePassword(password,user.password);
  //     if (isValidPass) {
  //       let token: string;
  //       if (user.userRole === 'admin') {
  //         token = jwt.sign({ id: user._id, userRole: user.userRole }, 'f395ac4b864c6b095', {
  //           expiresIn: '15m',
  //         });
  //       } else {
  //         token = jwt.sign({ id: user._id, userRole: user.userRole }, 'f395ac4b864c6b095', {
  //           expiresIn: '15m',
  //         });
  //       }
  //       delete user.password;
  //       return { user, token };
  //     } else {
  //       return {};
  //     }
  //   } else {
  //     return {};
  //   }
  // }

  public async updateUserPost(user: IUser, postData: string): Promise<any> {
    return userModel.findByIdAndUpdate(user._id,{ $push: { post: postData }}, { new: true, upsert: true });
  }
}