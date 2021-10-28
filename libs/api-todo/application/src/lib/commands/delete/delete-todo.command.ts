import { ICommand } from '@nestjs/cqrs';
import { TodoUid } from '@wjanaszek/api-todo/domain';

export class DeleteTodoCommand implements ICommand {
  constructor(public readonly uid: TodoUid) {}
}
