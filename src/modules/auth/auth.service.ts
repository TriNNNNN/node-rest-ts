import { Response } from 'express';
import * as QRCode from 'qrcode';
import * as speakeasy from 'speakeasy';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../../modules/user/user.service'
import { IUser } from '../../modules/user/user.type';


class AuthenticationService {

  public getTwoFactorAuthenticationCode() {
    const secretCode = speakeasy.generateSecret({
      name: 'SOMESECCODE',
    });
    return {
      otpauthUrl : secretCode.otpauth_url,
      base32: secretCode.base32,
    };
  }

  public verifyTwoFactorAuthenticationCode(twoFactorAuthenticationCode: string, user: any) {
    return speakeasy.totp.verify({
      secret: user.twoFactorAuthenticationCode,
      encoding: 'base32',
      token: twoFactorAuthenticationCode,
    });
  }

  public async respondWithQRCode(data: any, response: any) {
    QRCode.toFileStream(response, data);
  }

  public createToken(user: any) {
    return {
      user,
      token: jwt.sign({ _id: user._id, userRole: user.userRole, },
      'f395ac4b864c6b095', { expiresIn: '15m' }),
    };
  }
}

export default AuthenticationService;