import { NextFunction, Request, Response } from 'express';
import { Result, validationResult } from 'express-validator';
import * as jwt from 'jsonwebtoken';
import userDefinedError from '../exceptions/error.handler';

export class AuthHelper {
    public async validation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const errors: Result<{}> = validationResult(req);
            if(!errors.isEmpty()) {
              next(new userDefinedError(404, 'Invalid Input', errors))
            } else {
              return next()
            }
        } catch(err) {
            next(new userDefinedError(404, err.message, err))
        }
    }

    public async guard(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          const token: string = req.headers.authorization || req.query.token;
          if (token) {
            const auth: any =  await jwt.verify(token, 'f395ac4b864c6b095');
            if (auth) {
              req.body.loggedinUserId = auth.id;
              next();
            } else {
              next(new userDefinedError(404, 'Access Permitted'))
            }
          } else {
            next(new userDefinedError(404, 'Access Permitted'))
          }
        } catch (err) {
          next(new userDefinedError(404, err.message))
        }
      }
}
