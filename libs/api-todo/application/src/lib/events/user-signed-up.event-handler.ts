import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserSignedUpEvent } from '@wjanaszek/api-auth/application';
import { TodoAuthorRepository } from '../todo-author.repository';

@EventsHandler(UserSignedUpEvent)
export class UserSignedUpEventHandler
  implements IEventHandler<UserSignedUpEvent>
{
  constructor(private readonly todoAuthorRepository: TodoAuthorRepository) {}

  async handle(event: UserSignedUpEvent): Promise<void> {
    await this.todoAuthorRepository.create({ id: event.userId, todos: [] });
  }
}
