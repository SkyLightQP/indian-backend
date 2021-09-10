import { IsString } from 'class-validator';

export class AuthLoginDto {
  @IsString()
  id!: string;

  @IsString()
  password!: string;
}
