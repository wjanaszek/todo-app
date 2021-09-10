import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthApplicationService } from '../auth.application-service';
import { CredentialsAuthUser } from './credentials-auth-user.interface';

@Injectable()
export class CredentialsStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authApplicationService: AuthApplicationService<CredentialsAuthUser>
  ) {
    super();
  }

  async validate(
    username: string,
    password: string
  ): Promise<CredentialsAuthUser> {
    return this.authApplicationService.validateUser(username, password);
  }
}
