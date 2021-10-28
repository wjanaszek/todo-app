import { IEvent } from '@nestjs/cqrs';
import { AuthResetPasswordTokenEntity } from '@wjanaszek/api-auth/domain';

export class ResetPasswordTokenGeneratedEvent implements IEvent {
  constructor(public readonly token: AuthResetPasswordTokenEntity) {}
}
