import { AuthUserId } from '@wjanaszek/api-auth/domain';

export class SignUpUserDto {
  id: AuthUserId;
  email: string;
  username: string;
  password: string;
}
