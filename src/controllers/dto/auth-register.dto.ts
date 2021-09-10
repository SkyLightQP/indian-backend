import { IsEmail, IsString } from 'class-validator';

export class AuthRegisterDto {
  @IsString()
  id!: string;

  @IsString()
  password!: string;

  @IsEmail()
  email!: string;

  @IsString()
  nickname!: string;
}
