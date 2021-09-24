import { IsOptional, IsString } from 'class-validator';

export class GameCreateDto {
  @IsString()
  title!: string;

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

  @IsString()
  companyId!: string;

  @IsString()
  @IsOptional()
  writerId?: string;
}
