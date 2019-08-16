import { Application, Request, Response, NextFunction } from 'express';
import { BaseCotroller } from '../baseApi';
import { AuthHelper } from './../../helpers/AuthHelper';
import { userRules } from './../user/user.rules';
import { UserService } from './../user/user.service';
import { IUser } from './../user/user.type';
import  userDefinedError  from '../../exceptions/error.handler'
import AuthenticationService from './auth.service';
import * as bcrypt from 'bcrypt';

import { userModel } from '../user/user.model';
import UserDefinedError from '../../exceptions/error.handler';



export class AuthController extends BaseCotroller {

    constructor() {
        super();
        this.init();
        console.log(this)
    }

    public register(app: Application): void {
        app.use('/api/auth', this.router)
        app.use('/api/auth/*', function send(req, res) { res.json(res.locals.data); });
    }

    public init(): void {
        const authHelper: AuthHelper = new AuthHelper();
        
        this.router.post('/sign-up', userRules.forSignUser, authHelper.validation, this.signUp);
        this.router.post('/login', userRules.forSignIn, authHelper.validation, this.login);
        this.router.post('/2fa/authenticate', this.secondFactorAuthentication);
        
    }

    public async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user: UserService = new UserService();
            const userData: IUser = req.body;
            const userResult: IUser = await user.saveUser(userData);
            res.locals.data = userResult;
            return next();
        } catch (err) {
            next(new userDefinedError(404, 'err.message'))
        }
    }

    public async comparePassword(password: string,hash: string): Promise<boolean> {
        return bcrypt.compareSync(password, hash);
    }

    public generateTwoFactorAuthCode = async (email: string, res: Response) => {
        let userService: UserService = new UserService();
        let authService: AuthenticationService = new AuthenticationService();

        let user: IUser = await userService.getUserByEmail(email);
        let { otpauthUrl, base32 } = authService.getTwoFactorAuthenticationCode();
        userModel.findByIdAndUpdate(user._id, {twoFactorAuthenticationCode: base32});
        authService.respondWithQRCode(otpauthUrl, res);
    }
    
    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let userService: UserService = new UserService();
            let authService: AuthenticationService = new AuthenticationService();
            let authController: any = new AuthController()
            let { email, password } = req.body;
            let user: IUser = await userService.getUserByEmail(email);
            user = JSON.parse(JSON.stringify(user));

            if (user !== null) {
                const isValidPass: boolean = bcrypt.compareSync(password,user.password);
                delete user.password;
                if (isValidPass) {
                    if(user.isTwoFactorAuthenticationEnabled) {
                        // generateQrCode
                        res.locals.data = authController.generateTwoFactorAuthCode(user.email, res)
                    } else {
                        res.locals.data = authService.createToken(user)
                        return next();
                    }
                //   return { user, token };
                } else {
                    next(new userDefinedError(404, 'Invalid Credentials'))
                }
              } else {
                next(new userDefinedError(404, 'Invalid Credentials'))
              }
        } catch (err) {
            next(new userDefinedError(404, err.message))
        }
    }



    public secondFactorAuthentication = async (req: Request, res: Response, next: NextFunction) => {
        let userService: UserService = new UserService();
        let authService: AuthenticationService = new AuthenticationService();

        let authenticationCode = req.body.code;
        let user: IUser = await userService.getUserByEmail(req.body.email);
        let isCodeValid = await authService.verifyTwoFactorAuthenticationCode(authenticationCode, user);
        if (isCodeValid) {
        //   const tokenData = authService.createToken(user, true);
          delete user.password
          res.send({
            ...user.toObject(),
            twoFactorAuthenticationCode: undefined
          });
        } else {
          next(new UserDefinedError(404, 'Failed 2way authentication'));
        }
    }

}
