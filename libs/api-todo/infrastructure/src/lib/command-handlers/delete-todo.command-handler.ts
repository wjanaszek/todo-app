import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  DeleteTodoCommand,
  TodoRepository,
} from '@wjanaszek/api-todo/application';

@CommandHandler(DeleteTodoCommand)
export class DeleteTodoCommandHandler
  implements ICommandHandler<DeleteTodoCommand, void>
{
  constructor(private readonly todoRepository: TodoRepository) {}

  execute(command: DeleteTodoCommand): Promise<void> {
    return this.todoRepository.delete(command.uid);
  }
}
