import { ICommand } from '@nestjs/cqrs';
import { TodoId } from '@wjanaszek/api-todo/domain';

export class DeleteTodoCommand implements ICommand {
  constructor(public readonly uid: TodoId) {}
}
