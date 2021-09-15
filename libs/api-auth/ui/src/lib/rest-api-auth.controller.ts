import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CredentialsAuthGuard } from '@wjanaszek/api-auth/application';

@Controller('auth')
export class RestApiAuthController {
  @UseGuards(CredentialsAuthGuard)
  @Post('login')
  async login(@Request() req: Request) {
    return (req as any).user;
  }
}
