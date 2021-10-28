import { IQuery } from '@nestjs/cqrs';
import { TodoUid } from '@wjanaszek/api-todo/domain';

export class FindTodoByIdQuery implements IQuery {
  constructor(public readonly uid: TodoUid) {}
}
