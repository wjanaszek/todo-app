import {
  AuthResetPasswordTokenEntity,
  AuthResetPasswordTokenId,
  AuthUserEntity,
} from '@wjanaszek/api-auth/domain';

export abstract class AuthResetPasswordTokenRepository {
  abstract add(
    user: AuthUserEntity,
    expirationDate: Date
  ): Promise<AuthResetPasswordTokenEntity>;

  abstract findOne(
    id: AuthResetPasswordTokenId
  ): Promise<AuthResetPasswordTokenEntity | undefined>;

  abstract remove(id: AuthResetPasswordTokenId): Promise<void>;
}
