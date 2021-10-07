import { TodoStatus, TodoUid } from '@wjanaszek/api-todo/domain';

export class CreateTodoDto {
  uid: TodoUid;
  name: string;
  status: TodoStatus;
}
