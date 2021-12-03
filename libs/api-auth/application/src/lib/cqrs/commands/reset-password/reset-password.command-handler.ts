import { ConfigService } from '@nestjs/config';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { AuthResetUserPasswordNotFoundException } from '../../../exceptions/auth-reset-user-password-not-found.exception';
import { AuthResetPasswordTokenRepository } from '../../../repositories/auth-reset-password-token.repository';
import { AuthUserRepository } from '../../../repositories/auth-user.repository';
import { ResetPasswordTokenGeneratedEvent } from '../../events/reset-password/reset-password-token-generated.event';
import { ResetPasswordCommand } from './reset-password.command';
import { ResetPasswordResult } from './reset-password.result';

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordCommandHandler
  implements ICommandHandler<ResetPasswordCommand, ResetPasswordResult>
{
  private readonly expirationDate = this.configService.get<number>(
    'resetPassword.expiresIn'
  ) as number;

  constructor(
    private readonly authUserRepository: AuthUserRepository,
    private readonly authResetPasswordTokenRepository: AuthResetPasswordTokenRepository,
    private readonly configService: ConfigService,
    private readonly eventBus: EventBus
  ) {}

  async execute(command: ResetPasswordCommand): Promise<ResetPasswordResult> {
    const user = await this.authUserRepository.findByEmailOrUsername(command.userEmail);

    if (!user) {
      // this is just to stop processing this command
      throw new AuthResetUserPasswordNotFoundException();
    }

    const token = await this.authResetPasswordTokenRepository.add(
      user,
      new Date(new Date().getTime() + this.expirationDate)
    );

    this.eventBus.publish(new ResetPasswordTokenGeneratedEvent(token));
    return ResetPasswordResult.FAIL_OR_SUCCESS;
  }
}
