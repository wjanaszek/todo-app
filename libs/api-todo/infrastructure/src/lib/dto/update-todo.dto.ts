import { TodoStatus } from '@wjanaszek/api-todo/domain';

export class UpdateTodoDto {
  name?: string;
  status?: TodoStatus;
}
