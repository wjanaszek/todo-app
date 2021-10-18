import { AuthResetPasswordTokenId } from './auth-reset-password-token-id';
import { AuthUserEntity } from './auth-user.entity';

export interface AuthResetPasswordTokenEntity {
  token: AuthResetPasswordTokenId;
  user: AuthUserEntity;
  expirationDate: Date;
}
