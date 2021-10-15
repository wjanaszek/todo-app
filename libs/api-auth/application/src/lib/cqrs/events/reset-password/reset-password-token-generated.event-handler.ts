import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ResetPasswordTokenGeneratedEvent } from './reset-password-token-generated.event';

@EventsHandler(ResetPasswordTokenGeneratedEvent)
export class ResetPasswordTokenGeneratedEventHandler
  implements IEventHandler<ResetPasswordTokenGeneratedEvent>
{
  async handle(event: ResetPasswordTokenGeneratedEvent): Promise<void> {
    // @TODO send an email
  }
}
