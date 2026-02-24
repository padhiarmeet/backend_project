import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class UpdateStatusDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'])
  status: string;
}
