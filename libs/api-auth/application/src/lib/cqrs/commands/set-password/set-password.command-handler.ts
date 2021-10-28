import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { AuthUserEntity } from '@wjanaszek/api-auth/domain';
import { AuthSetPasswordFailedException } from '../../../exceptions/auth-set-password-failed.exception';
import { AuthSetPasswordTokenInvalidException } from '../../../exceptions/auth-set-password-token-invalid.exception';
import { AuthResetPasswordTokenRepository } from '../../../repositories/auth-reset-password-token.repository';
import { AuthUserRepository } from '../../../repositories/auth-user.repository';
import { NewPasswordSetEvent } from '../../events/set-password/new-password-set.event';
import { SetPasswordCommand } from './set-password.command';

@CommandHandler(SetPasswordCommand)
export class SetPasswordCommandHandler
  implements ICommandHandler<SetPasswordCommand, void>
{
  constructor(
    private readonly authUserRepository: AuthUserRepository,
    private readonly authResetPasswordTokenRepository: AuthResetPasswordTokenRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(command: SetPasswordCommand): Promise<void> {
    const token = await this.authResetPasswordTokenRepository.findOne(
      command.token
    );

    if (!token || this.isTokenExpired(token.expirationDate)) {
      throw new AuthSetPasswordTokenInvalidException();
    }

    const user = token.user;

    if (await this.isUserNotAvailable(user)) {
      throw new AuthSetPasswordFailedException();
    }

    await this.authUserRepository.save({
      ...user,
      password: command.newPassword,
    });
    this.eventBus.publish(new NewPasswordSetEvent(command.token));
  }

  private isTokenExpired(expirationDate: Date): boolean {
    return new Date().getTime() > expirationDate.getTime();
  }

  private async isUserNotAvailable(user: AuthUserEntity): Promise<boolean> {
    const existingUser = await this.authUserRepository.findByEmail(user.email);

    return !!existingUser;
  }
}
