import { TodoStatus, TodoId, TodoAuthorId } from '@wjanaszek/api-todo/domain';

export interface CreateTodoWriteModel {
  id: TodoId;
  name: string;
  status: TodoStatus;
  authorId: TodoAuthorId;
}
