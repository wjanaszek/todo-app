import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserRemovedEvent } from '@wjanaszek/api-auth/application';
import { TodoAuthorRepository } from '../todo-author.repository';

@EventsHandler(UserRemovedEvent)
export class UserRemovedEventHandler
  implements IEventHandler<UserRemovedEvent>
{
  constructor(private readonly authorRepository: TodoAuthorRepository) {}

  async handle(event: UserRemovedEvent): Promise<void> {
    return this.authorRepository.remove(event.userId);
  }
}
