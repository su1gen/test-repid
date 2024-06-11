import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TelegramStrategy } from '../strategies/telegram.strategy';

@Injectable()
export class TelegramAuthGuard extends AuthGuard(TelegramStrategy.key) {}
