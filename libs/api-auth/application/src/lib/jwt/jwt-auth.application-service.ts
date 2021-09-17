import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthUsersApplicationService } from '../auth-users.application-service';
import { AuthApplicationService } from '../auth.application-service';
import { AuthUserNotFoundException } from '../exceptions/auth-user-not-found.exception';
import { AuthWrongPasswordException } from '../exceptions/auth-wrong-password.exception';
import { JwtAuthUser } from './jwt-auth-user.interface';
import { JwtTokenPayload } from './jwt-token.payload';

@Injectable()
export class JwtAuthApplicationService
  implements AuthApplicationService<JwtAuthUser, JwtTokenPayload>
{
  constructor(
    private readonly authUsersApplicationService: AuthUsersApplicationService<JwtAuthUser>,
    private readonly jwtService: JwtService
  ) {}

  async getAuthPayload(user: JwtAuthUser): Promise<JwtTokenPayload> {
    return {
      accessToken: this.jwtService.sign({ sub: user.id }),
    };
  }

  async validateUser(username: string, password: string): Promise<JwtAuthUser> {
    const user = await this.authUsersApplicationService.findOne(username);

    if (!user) {
      throw new AuthUserNotFoundException();
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new AuthWrongPasswordException();
    }

    return user;
  }
}
