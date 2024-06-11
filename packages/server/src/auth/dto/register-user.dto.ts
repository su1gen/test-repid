import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Match } from '../../decorators/match.decorator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @Match('password')
  readonly password_confirmation: string;
}
