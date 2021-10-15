import { AuthUserId } from '@wjanaszek/api-auth/domain';

export interface SignUpUserWriteModel {
  id: AuthUserId;
  email: string;
  username: string;
  password: string;
}
