import { TodoStatus } from '@wjanaszek/api-todo/domain';

export interface UpdateTodoWriteModel {
  name: string;
  status: TodoStatus;
}
