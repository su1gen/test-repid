import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from '../../config/auth';
import { JwtStrategy } from './strategies/jwt.strategy';
import { EmailModule } from '../email/email.module';
import { GoogleStrategy } from './strategies/google.strategy';
import { ConfigModule } from '@nestjs/config';
import { TelegramStrategy } from './strategies/telegram.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordResets } from './entities/password-resets.entity';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    EmailModule,
    ConfigModule,
    TypeOrmModule.forFeature([PasswordResets]),
    // PassportModule.register({ session: true }),
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '30s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy, TelegramStrategy /*SessionSerializer*/],
})
export class AuthModule {}
