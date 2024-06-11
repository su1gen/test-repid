import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../src/users/entities/user.entity';
import { PasswordResets } from '../src/auth/entities/password-resets.entity';

@Injectable()
export class OrmConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const { type, host, port, username, password, database } = this.configService.get('database');

    return {
      type,
      host,
      port,
      username,
      password,
      database,
      entities: [User, PasswordResets],
      synchronize: true,
      logging: true,
    };
  }
}
