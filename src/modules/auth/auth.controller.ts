import { Application, Request, Response, NextFunction } from 'express';
import { BaseCotroller } from '../baseApi';
import { AuthHelper } from './../../helpers/AuthHelper';

import { userRules } from './../user/user.rules';
import { UserService } from './../user/user.service';
import { IUser } from './../user/user.type';



export class AuthController extends BaseCotroller {
    constructor() {
        super();
        this.init();
    }

    public register(app: Application): void {
        app.use('/api/auth', this.router)
        app.use('/api/auth/*', function send(req, res) { res.json(res.locals.data); });
    }

    public init(): void {
        const authHelper: AuthHelper = new AuthHelper();
        this.router.post('/sign-up', userRules.forSignUser, authHelper.validation, this.signUp)
        this.router.post('/login', userRules.forSignIn, authHelper.validation, this.login)
    }

    public async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          const user: UserService = new UserService();
          const userData: IUser = req.body;
          const userResult: IUser = await user.saveUser(userData);
          res.locals.data = userResult;
          return next();
        } catch (err) {
          res.locals.data = err;
          return next();
        }
      }
    
    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user: UserService = new UserService();
            const { email, password } = req.body;
            const loggedInUser: any = await user.loginUserAndCreateToken(email,password);
            if(loggedInUser) {
                res.locals.data = loggedInUser;
                return next();
            } else {
                res.locals.data = {
                    message: 'Access Permitted'
                }
                return next();
            }
            
        } catch (err) {
            res.locals.data = err;
            return next();
        }
    }
}
