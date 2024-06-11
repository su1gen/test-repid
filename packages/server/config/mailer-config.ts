import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'node:path';

@Injectable()
export class MailerConfig implements MailerOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMailerOptions(): Promise<MailerOptions> | MailerOptions {
    const { host, port, username, password, fromAddress } = this.configService.get('mail');

    return {
      transport: {
        host,
        port,
        secure: false,
        auth: {
          user: username,
          pass: password,
        },
      },
      defaults: {
        from: fromAddress,
      },
      template: {
        dir: path.join(__dirname, '..', 'assets', 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    };
  }
}
