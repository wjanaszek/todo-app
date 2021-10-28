import { IQuery } from '@nestjs/cqrs';
import { TodoAuthorId } from '@wjanaszek/api-todo/domain';

export class FindAllTodoQuery implements IQuery {
  constructor(public readonly authorId: TodoAuthorId) {}
}
