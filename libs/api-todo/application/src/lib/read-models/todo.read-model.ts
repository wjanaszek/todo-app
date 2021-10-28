import { TodoStatus, TodoId } from '@wjanaszek/api-todo/domain';

export interface TodoReadModel {
  id: TodoId;
  name: string;
  status: TodoStatus;
}
