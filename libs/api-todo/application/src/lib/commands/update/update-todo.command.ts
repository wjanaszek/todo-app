import { ICommand } from '@nestjs/cqrs';
import { TodoStatus, TodoId, TodoAuthorId } from '@wjanaszek/api-todo/domain';

export class UpdateTodoCommand implements ICommand {
  constructor(
    public readonly id: TodoId,
    public readonly name: string | null,
    public readonly status: TodoStatus | null,
    public readonly authorId: TodoAuthorId
  ) {}
}
