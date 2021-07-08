import { TodoStatus, TodoUid } from '@wjanaszek/api-todo/domain';

export interface CreateTodoWriteModel {
  uid: TodoUid;
  name: string;
  status: TodoStatus;
}
