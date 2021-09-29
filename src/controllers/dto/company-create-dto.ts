import { IsOptional, IsString } from 'class-validator';

export class CompanyCreateDto {
  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  tags?: string;

  @IsString()
  link!: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  writerUuid?: string;
}
