import { AuthUserEntity } from '@wjanaszek/api-auth/domain';
import { SignUpUserCommand } from '../cqrs/commands/sign-up/sign-up-user.command';

export abstract class AuthUserRepository {
  abstract findByEmailOrUsername(
    emailOrUsername: string
  ): Promise<AuthUserEntity | undefined>;

  abstract removeByEmailOrUsername(usernameOrEmail: string): Promise<void>;

  abstract save(data: AuthUserEntity): Promise<AuthUserEntity>;

  abstract signUp(data: SignUpUserCommand): Promise<AuthUserEntity>;
}
