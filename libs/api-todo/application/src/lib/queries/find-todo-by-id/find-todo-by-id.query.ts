import { IQuery } from '@nestjs/cqrs';
import { TodoAuthorId, TodoId } from '@wjanaszek/api-todo/domain';

export class FindTodoByIdQuery implements IQuery {
  constructor(
    public readonly id: TodoId,
    public readonly authorId: TodoAuthorId
  ) {}
}
