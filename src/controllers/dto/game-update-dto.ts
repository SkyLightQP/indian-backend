import { IsOptional, IsString } from 'class-validator';

export class GameUpdateDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  tags?: string;

  @IsString()
  @IsOptional()
  startLink?: string;

  @IsString()
  @IsOptional()
  image?: string;
}
