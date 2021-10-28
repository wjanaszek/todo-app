import { ICommand } from '@nestjs/cqrs';
import { TodoStatus, TodoUid } from '@wjanaszek/api-todo/domain';

export class UpdateTodoCommand implements ICommand {
  constructor(
    public readonly uid: TodoUid,
    public readonly name: string,
    public readonly status: TodoStatus
  ) {}
}
