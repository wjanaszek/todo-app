import { TodoStatus, TodoUid } from '@wjanaszek/api-todo/domain';

export class TodoDto {
  uid: TodoUid;
  name: string;
  status: TodoStatus;
}
