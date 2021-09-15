import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthUsersApplicationService } from '../auth-users.application-service';
import { AuthApplicationService } from '../auth.application-service';
import { CredentialsAuthUser } from './credentials-auth-user.interface';

@Injectable()
export class CredentialsAuthApplicationService
  implements AuthApplicationService
{
  constructor(
    private readonly authUsersApplicationService: AuthUsersApplicationService<CredentialsAuthUser>
  ) {}

  async validateUser(
    username: string,
    password: string
  ): Promise<CredentialsAuthUser> {
    const user = await this.authUsersApplicationService.findOne(username);

    if (!user) {
      throw new NotFoundException();
    }

    // @TODO check hashes
    if (user.password !== password) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
