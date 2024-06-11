import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class TelegramLoginDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
