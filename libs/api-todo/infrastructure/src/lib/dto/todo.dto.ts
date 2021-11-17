import { TodoStatus, TodoId } from '@wjanaszek/api-todo/domain';

export class TodoDto {
  id!: TodoId;
  name!: string;
  status!: TodoStatus;
}
