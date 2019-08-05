import { NextFunction, Request, Response } from 'express';
import { Result, validationResult } from 'express-validator';
import * as jwt from 'jsonwebtoken';


export class AuthHelper {
    
    public async validation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const errors: Result<{}> = validationResult(req);
            if(!errors.isEmpty()) {
                res.locals.data = errors.array();
                return next();
            } else {
                return next();
            }
        } catch(err) {
            res.locals.data.message = err.message
            res.locals.details = err;
            res.locals.name = "ValidationError";
            return next();
        }
    }

    public async guard(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          const token: string = req.headers.authorization || req.query.token;
          if (token) {
            const auth: any = jwt.verify(token, 'f395ac4b864c6b095');
            if (auth) {
              req.body.loggedinUserId = auth.id;
              next();
            } else {
                throw new Error('Access Permitted');
            }
          } else {
              throw new Error('Access Permitted');
          }
        } catch (err) {
          throw new Error('Access Permitted');
        }
      }
    
}