import { MailerService } from '@nestjs-modules/mailer';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ResetPasswordTokenGeneratedEvent } from './reset-password-token-generated.event';

@EventsHandler(ResetPasswordTokenGeneratedEvent)
export class ResetPasswordTokenGeneratedEventHandler
  implements IEventHandler<ResetPasswordTokenGeneratedEvent>
{
  constructor(private readonly mailerService: MailerService) {}

  async handle(event: ResetPasswordTokenGeneratedEvent): Promise<void> {
    const { user, token } = event.token;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Reset password link',
      text: `Token to set new password: ${token}`,
    });
  }
}
