import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateCommentDto {
  @IsNotEmpty()
  @IsString()
  comment: string;
}
