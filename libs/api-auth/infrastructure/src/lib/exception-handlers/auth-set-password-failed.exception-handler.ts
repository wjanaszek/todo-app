import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { AuthSetPasswordFailedException } from '@wjanaszek/api-auth/application';
import { Response } from 'express';

@Catch(AuthSetPasswordFailedException)
export class AuthSetPasswordFailedExceptionHandler
  implements ExceptionFilter<AuthSetPasswordFailedException>
{
  catch(exception: AuthSetPasswordFailedException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Failed to set new password',
    });
  }
}
