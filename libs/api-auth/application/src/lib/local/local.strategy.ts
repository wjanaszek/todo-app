import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthApplicationService } from '../auth.application-service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authApplicationService: AuthApplicationService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authApplicationService.validateUser(
      username,
      password
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
