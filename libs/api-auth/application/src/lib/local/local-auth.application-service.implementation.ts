import { Injectable } from '@nestjs/common';
import { AuthUsersApplicationService } from '../auth-users.application-service';
import { AuthApplicationService } from '../auth.application-service';

@Injectable()
export class LocalAuthApplicationServiceImplementation
  implements AuthApplicationService
{
  constructor(
    private readonly authUsersApplicationService: AuthUsersApplicationService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.authUsersApplicationService.findOne(username);
    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
