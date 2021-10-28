import { IEvent } from '@nestjs/cqrs';
import { AuthUserId } from '@wjanaszek/api-auth/domain';

export class UserSignedUpEvent implements IEvent {
  constructor(public readonly userId: AuthUserId) {}
}
