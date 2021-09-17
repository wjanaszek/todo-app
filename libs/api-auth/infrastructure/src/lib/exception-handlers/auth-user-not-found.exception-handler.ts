import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { AuthUserNotFoundException } from '@wjanaszek/api-auth/application';
import { Response } from 'express';

@Catch(AuthUserNotFoundException)
export class AuthUserNotFoundExceptionHandler implements ExceptionFilter {
  catch(exception: AuthUserNotFoundException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.UNAUTHORIZED).json({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Wrong username or password',
    });
  }
}
