import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '@wjanaszek/api-auth/application';

@Controller('auth')
export class RestApiAuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: Request) {
    return (req as any).user;
  }
}
