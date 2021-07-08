import { TodoStatus, TodoUid } from '@wjanaszek/api-todo/domain';

export class UpdateTodoCommand {
  constructor(
    public readonly uid: TodoUid,
    public readonly name: string,
    public readonly status: TodoStatus
  ) {}
}
