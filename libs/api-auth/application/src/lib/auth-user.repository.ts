import { SignUpUserCommand } from '../lib/cqrs/commands/sign-up/sign-up-user.command';

export abstract class AuthUserRepository {
  abstract signUp(data: SignUpUserCommand): Promise<void>;
}
