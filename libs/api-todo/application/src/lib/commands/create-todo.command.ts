import { TodoStatus, TodoUid } from '@wjanaszek/api-todo/domain';

export class CreateTodoCommand {
  constructor(
    public readonly uid: TodoUid,
    public readonly name: string,
    public readonly status: TodoStatus
  ) {}
}
