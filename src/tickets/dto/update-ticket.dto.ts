import { IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateTicketDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  priority?: string;

  @IsOptional()
  @IsInt()
  assigned_to?: number;
}
