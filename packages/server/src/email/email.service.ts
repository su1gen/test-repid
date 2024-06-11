import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Address } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendEmail(recipientEmail: string, resetToken: string) {
    try {
      const sender: Address = {
        name: this.configService.get('mail.fromName'),
        address: this.configService.get('mail.fromAddress'),
      };
      const resetPasswordUrl = this.configService.get('next.resetPasswordUrl');
      const resetLink = `${resetPasswordUrl}/${resetToken}?email=${recipientEmail}`;
      await this.mailerService.sendMail({
        from: sender,
        to: recipientEmail,
        subject: 'Test mail',
        template: `./forgot-password`,
        context: {
          headerName: 'TEST PROJECT',
          resetLink: resetLink,
          year: new Date().getFullYear(),
        },
      });
      return true;
    } catch (e) {
      throw new HttpException('Error with sending email\n' + e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
