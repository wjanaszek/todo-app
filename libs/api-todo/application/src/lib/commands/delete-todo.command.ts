import { TodoUid } from '@wjanaszek/api-todo/domain';

export class DeleteTodoCommand {
  constructor(public readonly uid: TodoUid) {}
}
