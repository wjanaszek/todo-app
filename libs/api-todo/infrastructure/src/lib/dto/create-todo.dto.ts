import { TodoStatus, TodoId } from '@wjanaszek/api-todo/domain';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  id!: TodoId;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  @IsNotEmpty()
  status!: TodoStatus;
}
