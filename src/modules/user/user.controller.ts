import { Request, Response, Application, NextFunction } from "express";
import { BaseCotroller } from '../baseApi';

import { UserService } from './user.service'
import { IUser } from './user.type';


export class User extends BaseCotroller{

  constructor() {
        super();
        this.init();
    }

    public register(express: Application): void {
        express.use('/api/user', this.router);
        express.use('/api/user/*', function send(req, res) { res.json(res.locals.data); });
    }

    public init(): void {
        this.router.get('/', this.listUsers);
        this.router.post('/update/:id', this.updateUser);
    }

    public async listUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
        const userService: UserService = new UserService();
        const users: IUser[] = await userService.getAllUsers();
        res.locals.data = users;
        return next();
        } catch (err) {
        res.locals.data = err;
        return next();
        }
    }

    public async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          const userId: string = req.params && req.params.id;
          const userData: IUser = req.body;
          delete userData.password;
          const user: UserService = new UserService();
          const updatedUser: IUser = await user.updateUser(userId, userData);
          res.locals.data = updatedUser;
          return next();
        } catch (err) {
          res.locals.data = err;
          return next();
        }
      }
}