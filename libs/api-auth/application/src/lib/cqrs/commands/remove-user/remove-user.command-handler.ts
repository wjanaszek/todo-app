import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UserRemovedEvent } from '../../events/remove-user/user-removed.event';
import { AuthUserRepository } from '../../../repositories/auth-user.repository';
import { AuthUserNotRemovedException } from '../../../exceptions/auth-user-not-removed.exception';
import { RemoveUserCommand } from './remove-user.command';

@CommandHandler(RemoveUserCommand)
export class RemoveUserCommandHandler
  implements ICommandHandler<RemoveUserCommand>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly userRepository: AuthUserRepository
  ) {}

  async execute(command: RemoveUserCommand): Promise<void> {
    const userToRemove = await this.userRepository.findByEmailOrUsername(
      command.usernameOrEmail
    );

    if (!userToRemove) {
      throw new AuthUserNotRemovedException();
    }

    await this.userRepository.removeByEmailOrUsername(command.usernameOrEmail);
    this.eventBus.publish(new UserRemovedEvent(userToRemove.id));
  }
}
