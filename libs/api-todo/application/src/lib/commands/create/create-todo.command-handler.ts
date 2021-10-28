import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoEntity, TodoValidation } from '@wjanaszek/api-todo/domain';
import {
  ApplicationError,
  ApplicationErrorType,
} from '@wjanaszek/shared/application';
import { TodoRepository } from '../../todo.repository';
import { CreateTodoCommand } from './create-todo.command';

@CommandHandler(CreateTodoCommand)
export class CreateTodoCommandHandler
  implements ICommandHandler<CreateTodoCommand, TodoEntity>
{
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(command: CreateTodoCommand): Promise<TodoEntity> {
    return new Promise((resolve, reject) => {
      if (command.name.length > TodoValidation.maxLength) {
        reject(
          new ApplicationError()
            .withType(ApplicationErrorType.VALIDATION)
            .withMessage(
              `Max length for name field is ${TodoValidation.maxLength}`
            )
        );
      }

      resolve(this.todoRepository.create(command));
    });
  }
}
