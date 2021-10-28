import { ICommand } from '@nestjs/cqrs';
import { TodoStatus, TodoId, TodoAuthorId } from '@wjanaszek/api-todo/domain';

export class UpdateTodoCommand implements ICommand {
  constructor(
    public readonly id: TodoId,
    public readonly name: string,
    public readonly status: TodoStatus,
    public readonly authorId: TodoAuthorId
  ) {}
}
