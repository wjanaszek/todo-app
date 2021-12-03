import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
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
  RemoveUserCommand,
  ResetPasswordCommand,
  ResetPasswordResult,
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
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: LoginRequest): Promise<JwtTokenPayload> {
    return this.authApplicationService.getAuthPayload(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('user/:usernameOrEmail')
  @HttpCode(HttpStatus.OK)
  async removeUser(
    @Param('usernameOrEmail') usernameOrEmail: string
  ): Promise<void> {
    return this.commandBus.execute(new RemoveUserCommand(usernameOrEmail));
  }

  @Post('resetPassword')
  async resetPassword(
    @Body() dto: ResetPasswordDto
  ): Promise<ResetPasswordResult> {
    return this.commandBus.execute(new ResetPasswordCommand(dto.email));
  }

  @Post('setPassword')
  async setPassword(@Body() dto: SetPasswordDto): Promise<void> {
    return this.commandBus.execute(
      new SetPasswordCommand(dto.token, dto.newPassword)
    );
  }

  @Post('signUp')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() dto: SignUpUserDto): Promise<void> {
    return this.commandBus.execute(
      new SignUpUserCommand(dto.email, dto.username, dto.password)
    );
  }
}
