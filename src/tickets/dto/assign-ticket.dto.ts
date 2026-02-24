import { IsInt, IsNotEmpty } from 'class-validator';

export class AssignTicketDto {
  @IsNotEmpty()
  @IsInt()
  assigned_to: number;
}
