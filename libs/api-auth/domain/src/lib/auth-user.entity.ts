import { AuthUserId } from './auth-user.id';

export interface AuthUserEntity {
  id: AuthUserId;
  email: string;
  username: string;
  password: string;
}

export const AuthUserValidation = {
  username: {
    minLength: 2,
    maxLength: 100,
  },
  email: {
    minLength: 3,
    maxLength: 100,
  },
};
