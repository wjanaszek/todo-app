import { AuthUserId } from './auth-user-id';

export interface AuthUserEntity {
  id: AuthUserId;
  email: string;
  username: string;
  password: string;
}

export const AuthUserValidation = {
  username: {
    maxLength: 100,
  },
  email: {
    maxLength: 100,
  },
};
