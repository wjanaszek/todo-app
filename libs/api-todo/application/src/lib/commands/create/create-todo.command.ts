import { ICommand } from '@nestjs/cqrs';
import { TodoStatus, TodoId } from '@wjanaszek/api-todo/domain';

export class CreateTodoCommand implements ICommand {
  constructor(
    public readonly uid: TodoId,
    public readonly name: string,
    public readonly status: TodoStatus
  ) {}
}
