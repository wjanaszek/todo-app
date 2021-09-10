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

  execute(command: UpdateTodoCommand): Promise<TodoEntity> {
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

      resolve(this.todoRepository.update(command));
    });
  }
}
