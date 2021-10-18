import { IEvent } from '@nestjs/cqrs';
import { AuthResetPasswordTokenId } from '@wjanaszek/api-auth/domain';

export class NewPasswordSetEvent implements IEvent {
  constructor(public readonly token: AuthResetPasswordTokenId) {}
}
