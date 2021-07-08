import { TodoStatus, TodoUid } from '@wjanaszek/api-todo/domain';

export interface CreateTodoDto {
  uid: TodoUid;
  name: string;
  status: TodoStatus;
}
