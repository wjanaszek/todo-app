import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoRepository } from '../../todo.repository';
import { DeleteTodoCommand } from './delete-todo.command';

@CommandHandler(DeleteTodoCommand)
export class DeleteTodoCommandHandler
  implements ICommandHandler<DeleteTodoCommand, void>
{
  constructor(private readonly todoRepository: TodoRepository) {}

  execute(command: DeleteTodoCommand): Promise<void> {
    return this.todoRepository.delete(command.uid);
  }
}
