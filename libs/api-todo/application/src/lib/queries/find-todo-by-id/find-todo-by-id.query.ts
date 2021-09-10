import { TodoUid } from '@wjanaszek/api-todo/domain';

export class FindTodoByIdQuery {
  constructor(public readonly uid: TodoUid) {}
}
