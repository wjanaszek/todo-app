import { TodoStatus, TodoId } from '@wjanaszek/api-todo/domain';

export interface CreateTodoWriteModel {
  id: TodoId;
  name: string;
  status: TodoStatus;
}
