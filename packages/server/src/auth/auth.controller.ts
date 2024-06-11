import { Controller, Post, UseGuards, Body, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request } from 'express';
import { SessionAuthGuard } from './guards/session-auth.guard';
import { UsersService } from '../users/users.service';
import { LoginResponse } from '../types';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { OAuth2Client } from 'google-auth-library';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { TelegramAuthGuard } from './guards/telegram-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login-credentials')
  @UseGuards(LocalAuthGuard)
  loginCredentials(@Req() req: Request) {
    return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login-google')
  @UseGuards(GoogleAuthGuard)
  loginGoogle(@Req() req: Request) {
    return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login-telegram')
  @UseGuards(TelegramAuthGuard)
  loginTelegram(@Req() req: Request) {
    return req.user;
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.authService.createUser(registerUserDto);
  }
  // async register(@Body() registrationData: RegisterUserDto) {
  //   return this.authService.register(registrationData);
  // }

  // @HttpCode(200)
  // @UseGuards(SessionAuthGuard)
  // @Get()
  // async authenticate(@Req() request: Request) {
  //   return request.user;
  // }


  @Get('status')
  @UseGuards(JwtAuthGuard)
  async status(@Req() req: Request) {
    return req.user;
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: Request) {
    return await this.authService.logoutUser(req.user as LoginResponse);
  }

  @Get('session')
  // @UseGuards(SessionAuthGuard)
  async session(@Req() req: Request) {
    console.log(11111, req.user);
    return req.user;
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return await this.authService.sendForgotPasswordEmail(forgotPasswordDto);
  }
}
