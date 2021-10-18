import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuthResetPasswordTokenRepository } from '../../../repositories/auth-reset-password-token.repository';
import { NewPasswordSetEvent } from './new-password-set.event';

@EventsHandler(NewPasswordSetEvent)
export class NewPasswordSetEventHandler
  implements IEventHandler<NewPasswordSetEvent>
{
  constructor(
    private readonly authResetPasswordTokenRepository: AuthResetPasswordTokenRepository
  ) {}

  async handle(event: NewPasswordSetEvent): Promise<void> {
    await this.authResetPasswordTokenRepository.remove(event.token);
  }
}
