import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { AuthSetPasswordTokenInvalidException } from '@wjanaszek/api-auth/application';
import { Response } from 'express';

@Catch(AuthSetPasswordTokenInvalidException)
export class AuthSetPasswordTokenInvalidExceptionHandler
  implements ExceptionFilter<AuthSetPasswordTokenInvalidException>
{
  catch(
    exception: AuthSetPasswordTokenInvalidException,
    host: ArgumentsHost
  ): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Token for new password invalid',
    });
  }
}
