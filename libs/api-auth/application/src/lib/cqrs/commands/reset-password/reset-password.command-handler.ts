import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import configuration from '../../../../../../../../config/configuration';
import { AuthResetUserPasswordNotFoundException } from '../../../exceptions/auth-reset-user-password-not-found.exception';
import { AuthResetPasswordTokenRepository } from '../../../repositories/auth-reset-password-token.repository';
import { AuthUserRepository } from '../../../repositories/auth-user.repository';
import { ResetPasswordTokenGeneratedEvent } from '../../events/reset-password/reset-password-token-generated.event';
import { ResetPasswordCommand } from './reset-password.command';

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordCommandHandler
  implements ICommandHandler<ResetPasswordCommand, void>
{
  private readonly expirationDate = configuration().resetPassword.expiresIn;

  constructor(
    private readonly authUserRepository: AuthUserRepository,
    private readonly authResetPasswordTokenRepository: AuthResetPasswordTokenRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(command: ResetPasswordCommand): Promise<void> {
    const user = await this.authUserRepository.findByEmail(command.userEmail);

    if (!user) {
      // this is just to stop processing this command
      throw new AuthResetUserPasswordNotFoundException();
    }

    const token = await this.authResetPasswordTokenRepository.add(
      user,
      new Date(new Date().getTime() + this.expirationDate)
    );

    this.eventBus.publish(new ResetPasswordTokenGeneratedEvent(token));
  }
}
