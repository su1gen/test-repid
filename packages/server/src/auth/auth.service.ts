import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { PASSWORD_SALT } from '../../config/auth';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginResponse } from '../types';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { EmailService } from '../email/email.service';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { TelegramLoginDto } from './dto/telegram-login.dto';
import * as crypto from 'node:crypto';
import { PasswordResets } from './entities/password-resets.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(PasswordResets)
    private passwordResetRepository: Repository<PasswordResets>,
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
    private configService: ConfigService,
  ) {}

  // for session
  // public async register(registrationData: RegisterUserDto) {
  //   const hashedPassword = await bcrypt.hash(registrationData.password, 10);
  //   try {
  //     return this.usersService.create({
  //       ...registrationData,
  //       password: hashedPassword,
  //     });
  //   } catch (error) {
  //     throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }
  //
  // public async getAuthenticatedUser(email: string, plainTextPassword: string) {
  //   try {
  //     const user = await this.usersService.findByEmail(email);
  //     await this.verifyPassword(plainTextPassword, user.password);
  //     return user;
  //   } catch (error) {
  //     throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
  //   }
  // }
  //
  // private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
  //   const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);
  //   if (!isPasswordMatching) {
  //     throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
  //   }
  // }
  // end for session



  async validateUser(loginUserDto: LoginUserDto): Promise<LoginResponse> {
    const userFromDB = await this.usersService.getUserSpecificFieldsByEmail(loginUserDto.email, {
      id: true,
      password: true,
      name: true,
    });
    if (!userFromDB || !bcrypt.compareSync(loginUserDto.password, userFromDB.password)) {
      return null;
    }

    userFromDB.is_logged_in = true;
    await this.userRepository.save(userFromDB);

    return this.getLoginResponseData(userFromDB.id, userFromDB.name);
  }

  async createUser(registerUserDto: RegisterUserDto): Promise<LoginResponse> {
    const newUser = this.userRepository.create({
      name: registerUserDto.name,
      email: registerUserDto.email,
      is_logged_in: true,
      password: bcrypt.hashSync(registerUserDto.password, PASSWORD_SALT),
    });

    await this.userRepository.save(newUser);
    return this.getLoginResponseData(newUser.id, newUser.name);
  }

  async logoutUser(userData: LoginResponse) {
    return await this.userRepository.update(userData.id, { is_logged_in: false });
  }

  async validateUserIsLoggedIn(userId: number) {
    const userFromDB = await this.usersService.findById(userId);
    if (!userFromDB) {
      return false;
    }
    return userFromDB.is_logged_in;
  }

  async sendForgotPasswordEmail(forgotPasswordDto: ForgotPasswordDto) {
    const userFromDB = await this.usersService.findByEmail(forgotPasswordDto.email);
    if (!userFromDB) {
      throw new HttpException('There is no user with this email', HttpStatus.BAD_REQUEST);
    }

    const token = await this.generateUniqueResetPasswordToken(forgotPasswordDto.email);

    return await this.emailService.sendEmail(forgotPasswordDto.email, token);
  }

  async handleGoogleLoginRequest(token: string) {
    const { clientId, clientSecret } = this.configService.get('google');
    const googleClient = new OAuth2Client(clientId, clientSecret);

    const ticket = await googleClient.verifyIdToken({
      idToken: token,
    });

    const { email, name, sub: googleId } = ticket.getPayload();
    if (!email || !name) {
      throw new UnauthorizedException('Something wrong with received google data');
    }

    let userFromDB = await this.usersService.findByGoogleId(googleId);
    if (userFromDB) {
      userFromDB.is_logged_in = true;
      await this.userRepository.save(userFromDB);

      return this.getLoginResponseData(userFromDB.id, userFromDB.name);
    }

    userFromDB = await this.usersService.findByEmail(email);
    if (userFromDB) {
      userFromDB.google_id = googleId;
      userFromDB.is_logged_in = true;
      await this.userRepository.save(userFromDB);

      return this.getLoginResponseData(userFromDB.id, userFromDB.name);
    }

    const newUser = this.userRepository.create({
      name,
      email,
      is_logged_in: true,
      google_id: googleId,
    });

    await this.userRepository.save(newUser);
    return this.getLoginResponseData(newUser.id, newUser.name);
  }

  async handleTelegramLoginRequest(telegramLoginDto: TelegramLoginDto) {
    const { id: telegramId, name } = telegramLoginDto;
    const userFromDB = await this.usersService.findByTelegramId(telegramId);
    if (userFromDB) {
      userFromDB.is_logged_in = true;
      await this.userRepository.save(userFromDB);

      return this.getLoginResponseData(userFromDB.id, userFromDB.name);
    }

    const newUser = this.userRepository.create({
      name,
      is_logged_in: true,
      telegram_id: telegramId,
    });

    await this.userRepository.save(newUser);
    return this.getLoginResponseData(newUser.id, newUser.name);
  }

  getLoginResponseData(userId: number, userName: string) {
    return {
      id: userId,
      name: userName,
      accessToken: this.jwtService.sign({ id: userId }),
    };
  }

  async generateUniqueResetPasswordToken(email: string): Promise<string> {
    let passwordResetFromDB = null;
    let token = null;
    do {
      token = crypto.randomUUID().replaceAll('-', '');
      passwordResetFromDB = await this.passwordResetRepository.findOne({ where: { token } });
    } while (passwordResetFromDB);

    // await this.passwordResetRepository.delete({ email });

    const newPasswordResetRecord = this.passwordResetRepository.create({
      email,
      token,
    });

    await this.passwordResetRepository.save(newPasswordResetRecord);

    return token;
  }
}
