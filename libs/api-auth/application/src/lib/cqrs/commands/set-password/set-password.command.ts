import { ICommand } from '@nestjs/cqrs';
import { AuthResetPasswordTokenId } from '@wjanaszek/api-auth/domain';

export class SetPasswordCommand implements ICommand {
  constructor(
    public readonly token: AuthResetPasswordTokenId,
    public readonly newPassword: string
  ) {}
}
