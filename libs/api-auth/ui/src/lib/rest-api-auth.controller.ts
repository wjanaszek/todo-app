import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  AuthApplicationService,
  JwtAuthGuard,
  JwtAuthUser,
  JwtLoginAuthGuard,
  JwtTokenPayload,
  ResetPasswordCommand,
  SetPasswordCommand,
  SignUpUserCommand,
} from '@wjanaszek/api-auth/application';
import {
  LoginRequest,
  ResetPasswordDto,
  SetPasswordDto,
  SignUpUserDto,
} from '@wjanaszek/api-auth/infrastructure';

@Controller(RestApiAuthController.URI)
export class RestApiAuthController {
  static readonly URI = 'auth';

  constructor(
    private readonly authApplicationService: AuthApplicationService<
      JwtAuthUser,
      JwtTokenPayload
    >,
    private readonly commandBus: CommandBus
  ) {}

  @UseGuards(JwtLoginAuthGuard)
  @Post('login')
  async login(@Request() req: LoginRequest): Promise<JwtTokenPayload> {
    return this.authApplicationService.getAuthPayload(req.user);
  }

  @Post('signUp')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() dto: SignUpUserDto): Promise<void> {
    return this.commandBus.execute(
      new SignUpUserCommand(dto.id, dto.email, dto.username, dto.password)
    );
  }

  @Post('resetPassword')
  async resetPassword(@Body() dto: ResetPasswordDto): Promise<void> {
    return this.commandBus.execute(new ResetPasswordCommand(dto.email));
  }

  @Post('setPassword')
  async setPassword(@Body() dto: SetPasswordDto): Promise<void> {
    return this.commandBus.execute(
      new SetPasswordCommand(dto.token, dto.newPassword)
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async test() {
    return { test: true };
  }
}
