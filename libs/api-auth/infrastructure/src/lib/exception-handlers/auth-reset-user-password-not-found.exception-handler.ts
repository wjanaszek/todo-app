import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import {
  AuthResetUserPasswordNotFoundException,
  ResetPasswordResult,
} from '@wjanaszek/api-auth/application';
import { Response } from 'express';

@Catch(AuthResetUserPasswordNotFoundException)
export class AuthResetUserPasswordNotFoundExceptionHandler
  implements ExceptionFilter<AuthResetUserPasswordNotFoundException>
{
  catch(
    exception: AuthResetUserPasswordNotFoundException,
    host: ArgumentsHost
  ): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: ResetPasswordResult.FAIL_OR_SUCCESS,
    });
  }
}
