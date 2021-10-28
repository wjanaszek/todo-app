import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { AuthUserValidationDomainService } from '@wjanaszek/api-auth/domain';
import { DomainError } from '@wjanaszek/shared/domain';
import { AuthUserSignUpValidationException } from '../../../exceptions/auth-user-sign-up-validation.exception';
import { AuthUserRepository } from '../../../repositories/auth-user.repository';
import { UserSignedUpEvent } from '../../events/sign-up/user-signed-up.event';
import { SignUpUserCommand } from './sign-up-user.command';

@CommandHandler(SignUpUserCommand)
export class SignUpUserCommandHandler
  implements ICommandHandler<SignUpUserCommand, void>
{
  constructor(
    private readonly authUserRepository: AuthUserRepository,
    private readonly authUserValidation: AuthUserValidationDomainService,
    private readonly eventBus: EventBus
  ) {}

  async execute(command: SignUpUserCommand): Promise<void> {
    try {
      this.authUserValidation.validate({
        email: command.email,
        username: command.username,
      });
    } catch (e: DomainError | unknown) {
      if (e instanceof DomainError) {
        throw new AuthUserSignUpValidationException(e.message as string);
      } else {
        throw new Error('Unknown error for sign up user: ' + e);
      }
    }

    const user = await this.authUserRepository.signUp(command);
    this.eventBus.publish(new UserSignedUpEvent(user.id));
  }
}
