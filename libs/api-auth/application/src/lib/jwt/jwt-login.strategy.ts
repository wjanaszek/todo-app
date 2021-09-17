import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtAuthUser } from './jwt-auth-user.interface';
import { Strategy } from 'passport-local';
import { AuthApplicationService } from '../auth.application-service';

@Injectable()
export class JwtLoginStrategy extends PassportStrategy(Strategy, 'jwt-login') {
  constructor(
    private readonly authApplicationService: AuthApplicationService<JwtAuthUser>
  ) {
    super();
  }

  async validate(
    username: string,
    password: string
  ): Promise<JwtAuthUser> {
    return this.authApplicationService.validateUser(username, password);
  }
}
