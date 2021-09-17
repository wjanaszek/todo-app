import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import {
  AuthApplicationService,
  JwtAuthGuard,
  JwtAuthUser,
  JwtLoginAuthGuard,
  JwtTokenPayload,
} from '@wjanaszek/api-auth/application';
import { LoginRequest } from '@wjanaszek/api-auth/infrastructure';

@Controller('auth')
export class RestApiAuthController {
  constructor(
    private readonly authApplicationService: AuthApplicationService<
      JwtAuthUser,
      JwtTokenPayload
    >
  ) {}

  @UseGuards(JwtLoginAuthGuard)
  @Post('login/jwt')
  async loginJwt(@Request() req: LoginRequest): Promise<JwtTokenPayload> {
    return this.authApplicationService.getAuthPayload(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async test() {
    return { test: true };
  }
}
