import { TodoStatus, TodoId } from '@wjanaszek/api-todo/domain';

export class CreateTodoDto {
  id: TodoId;
  name: string;
  status: TodoStatus;
}
