import { Injectable } from '@nestjs/common';
import {
  AuthUsersApplicationService,
  CredentialsAuthUser,
} from '@wjanaszek/api-auth/application';

@Injectable()
export class CredentialsAuthUsersApplicationService
  implements AuthUsersApplicationService<CredentialsAuthUser<number>>
{
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'ta',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(
    username: string
  ): Promise<CredentialsAuthUser<number> | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
