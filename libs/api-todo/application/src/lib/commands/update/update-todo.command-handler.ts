import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoEntity, TodoValidation } from '@wjanaszek/api-todo/domain';
import {
  ApplicationError,
  ApplicationErrorType,
} from '@wjanaszek/shared/application';
import { TodoRepository } from '../../todo.repository';
import { UpdateTodoCommand } from './update-todo.command';

@CommandHandler(UpdateTodoCommand)
export class UpdateTodoCommandHandler
  implements ICommandHandler<UpdateTodoCommand, TodoEntity>
{
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(command: UpdateTodoCommand): Promise<TodoEntity> {
    if (command.name && command.name?.length > TodoValidation.maxLength) {
      throw new ApplicationError()
        .withType(ApplicationErrorType.VALIDATION)
        .withMessage(
          `Max length for name field is ${TodoValidation.maxLength}`
        );
    }

    return this.todoRepository.update(command);
  }
}
