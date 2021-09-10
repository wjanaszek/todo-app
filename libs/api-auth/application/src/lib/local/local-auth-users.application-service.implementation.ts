import { Injectable } from '@nestjs/common';
import {
  AuthUsersApplicationService,
  User,
} from '../auth-users.application-service';

@Injectable()
export class LocalAuthUsersApplicationServiceImplementation
  implements AuthUsersApplicationService
{
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
