import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { AuthUserNotRemovedException } from '@wjanaszek/api-auth/application';
import { Response } from 'express';

@Catch(AuthUserNotRemovedException)
export class AuthUserNotRemovedExceptionHandler
  implements ExceptionFilter<AuthUserNotRemovedException>
{
  catch(exception: AuthUserNotRemovedException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Unknown error occurred and user has not been removed',
    });
  }
}
