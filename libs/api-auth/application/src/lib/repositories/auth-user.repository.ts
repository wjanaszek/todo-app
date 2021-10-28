import { AuthUserEntity } from '@wjanaszek/api-auth/domain';
import { SignUpUserCommand } from '../cqrs/commands/sign-up/sign-up-user.command';

export abstract class AuthUserRepository {
  abstract findByEmail(email: string): Promise<AuthUserEntity | undefined>;

  abstract remove(usernameOrEmail: string): Promise<void>;

  abstract save(data: AuthUserEntity): Promise<AuthUserEntity>;

  abstract signUp(data: SignUpUserCommand): Promise<AuthUserEntity>;
}
