import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { AuthWrongPasswordException } from '@wjanaszek/api-auth/application';
import { Response } from 'express';

@Catch(AuthWrongPasswordException)
export class AuthWrongPasswordExceptionHandler implements ExceptionFilter {
  catch(exception: AuthWrongPasswordException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.UNAUTHORIZED).json({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Wrong username or password',
    });
  }
}
