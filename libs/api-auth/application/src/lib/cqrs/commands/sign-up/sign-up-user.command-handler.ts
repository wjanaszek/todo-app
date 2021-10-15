import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthUserValidationDomainService } from '@wjanaszek/api-auth/domain';
import { DomainError } from '@wjanaszek/shared/domain';
import { AuthUserRepository } from '../../../auth-user.repository';
import { AuthUserSignUpValidationException } from '../../../exceptions/auth-user-sign-up-validation.exception';
import { SignUpUserCommand } from './sign-up-user.command';

@CommandHandler(SignUpUserCommand)
export class SignUpUserCommandHandler
  implements ICommandHandler<SignUpUserCommand, void>
{
  constructor(
    private readonly authUserRepository: AuthUserRepository,
    private readonly authUserValidation: AuthUserValidationDomainService
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

    return this.authUserRepository.signUp(command);
  }
}
