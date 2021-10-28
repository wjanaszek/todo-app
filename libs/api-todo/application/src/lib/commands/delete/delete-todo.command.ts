import { ICommand } from '@nestjs/cqrs';
import { TodoAuthorId, TodoId } from '@wjanaszek/api-todo/domain';

export class DeleteTodoCommand implements ICommand {
  constructor(
    public readonly id: TodoId,
    public readonly authorId: TodoAuthorId
  ) {}
}
