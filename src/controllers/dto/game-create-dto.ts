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
  startLink!: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  companyBoardId!: string;
}
