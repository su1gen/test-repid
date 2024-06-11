import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  static key = 'google';

  constructor(private authService: AuthService) {
    super();
  }

  async validate(request: Request) {
    const { token } = request.body;
    if (!token) {
      throw new UnauthorizedException('Something wrong with google token');
    }

    return await this.authService.handleGoogleLoginRequest(token);
  }
}
