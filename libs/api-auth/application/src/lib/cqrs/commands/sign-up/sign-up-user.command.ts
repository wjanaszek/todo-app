import { AuthUserId } from '@wjanaszek/api-auth/domain';

export class SignUpUserCommand {
  constructor(
    public readonly id: AuthUserId,
    public readonly email: string,
    public readonly username: string,
    public readonly password: string
  ) {}
}
