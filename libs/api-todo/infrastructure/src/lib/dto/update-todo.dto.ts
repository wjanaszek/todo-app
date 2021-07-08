import { TodoStatus } from '@wjanaszek/api-todo/domain';

export interface UpdateTodoDto {
  name: string;
  status: TodoStatus;
}
