import { Injectable } from '@nestjs/common';
import { AuthUsersApplicationService } from '../auth-users.application-service';
import { AuthApplicationService } from '../auth.application-service';
import { AuthUserNotFoundException } from '../exceptions/auth-user-not-found.exception';
import { AuthWrongPasswordException } from '../exceptions/auth-wrong-password.exception';
import { CredentialsAuthUser } from './credentials-auth-user.interface';
import { CredentialsAuthPayload } from './credentials-auth.payload';

@Injectable()
export class CredentialsAuthApplicationService
  implements
    AuthApplicationService<CredentialsAuthUser, CredentialsAuthPayload>
{
  constructor(
    private readonly authUsersApplicationService: AuthUsersApplicationService<CredentialsAuthUser>
  ) {}

  async getAuthPayload(): Promise<CredentialsAuthPayload> {
    return { loggedIn: true };
  }

  async validateUser(
    username: string,
    password: string
  ): Promise<CredentialsAuthUser> {
    const user = await this.authUsersApplicationService.findOne(username);

    if (!user) {
      throw new AuthUserNotFoundException();
    }

    // @TODO check hashes
    if (user.password !== password) {
      throw new AuthWrongPasswordException();
    }

    return user;
  }
}
