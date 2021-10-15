import { AuthUserId } from '@wjanaszek/api-auth/domain';

export interface SignUpUserDto {
  id: AuthUserId;
  email: string;
  username: string;
  password: string;
}