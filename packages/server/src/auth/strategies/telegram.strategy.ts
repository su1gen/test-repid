import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class TelegramStrategy extends PassportStrategy(Strategy, 'telegram') {
  static key = 'telegram';

  constructor(private authService: AuthService) {
    super();
  }

  async validate(request: Request) {
    const { id, name } = request.body;
    console.log()
    if (!id || !name) {
      throw new UnauthorizedException('Something wrong with google token');
    }

    return await this.authService.handleTelegramLoginRequest({ id, name });
  }
}
