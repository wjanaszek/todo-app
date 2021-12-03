import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { AuthUserSignUpValidationException } from '@wjanaszek/api-auth/application';
import { Response } from 'express';

@Catch(AuthUserSignUpValidationException)
export class AuthUserSignUpValidationExceptionHandler
  implements ExceptionFilter<AuthUserSignUpValidationException>
{
  catch(
    exception: AuthUserSignUpValidationException,
    host: ArgumentsHost
  ): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: exception.payload,
    });
  }
}
