import { AuthResetPasswordTokenId } from './auth-reset-password-token-id';
import { AuthUserEntity } from './auth-user.entity';

export interface AuthResetPasswordTokenEntity {
  id: AuthResetPasswordTokenId;
  token: string;
  user: AuthUserEntity;
  expirationDate: Date;
}
