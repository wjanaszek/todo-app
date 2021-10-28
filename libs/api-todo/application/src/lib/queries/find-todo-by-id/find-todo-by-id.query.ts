import { IQuery } from '@nestjs/cqrs';
import { TodoId } from '@wjanaszek/api-todo/domain';

export class FindTodoByIdQuery implements IQuery {
  constructor(public readonly uid: TodoId) {}
}
