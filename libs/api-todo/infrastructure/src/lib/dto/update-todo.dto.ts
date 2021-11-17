import { TodoStatus } from '@wjanaszek/api-todo/domain';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  status?: TodoStatus;
}
