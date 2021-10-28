import { DynamicModule, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AuthResetPasswordTokenRepository,
  AuthUserRepository,
  AuthUsersApplicationService,
} from '@wjanaszek/api-auth/application';
import { CredentialsAuthUsersApplicationService } from './credentials/credentials-auth-users.application-service';
import { AuthResetUserPasswordNotFoundExceptionHandler } from './exception-handlers/auth-reset-user-password-not-found.exception-handler';
import { AuthUserNotFoundExceptionHandler } from './exception-handlers/auth-user-not-found.exception-handler';
import { AuthUserSignUpValidationExceptionHandler } from './exception-handlers/auth-user-sign-up-validation.exception-handler';
import { AuthWrongPasswordExceptionHandler } from './exception-handlers/auth-wrong-password.exception-handler';
import { JwtAuthUsersApplicationService } from './jwt/application/jwt-auth-users.application-service';
import { PsqlAuthResetPasswordTokenEntity } from './orm/psql/psql-auth-reset-password-token.entity';
import { PsqlAuthResetPasswordTokenRepository } from './orm/psql/psql-auth-reset-password-token.repository';
import { PsqlAuthUserEntity } from './orm/psql/psql-auth-user.entity';
import { PsqlAuthUserRepository } from './orm/psql/psql-auth-user.repository';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: AuthResetUserPasswordNotFoundExceptionHandler,
    },
    {
      provide: APP_FILTER,
      useClass: AuthUserNotFoundExceptionHandler,
    },
    {
      provide: APP_FILTER,
      useClass: AuthUserSignUpValidationExceptionHandler,
    },
    {
      provide: APP_FILTER,
      useClass: AuthWrongPasswordExceptionHandler,
    },
    PsqlAuthUserRepository,
    PsqlAuthResetPasswordTokenRepository,
  ],
})
export class ApiAuthInfrastructureModule {
  static forCredentialsRoot(): DynamicModule {
    return {
      module: ApiAuthInfrastructureModule,
      imports: [
        TypeOrmModule.forFeature([
          PsqlAuthUserEntity,
          PsqlAuthResetPasswordTokenEntity,
        ]),
      ],
      providers: [
        {
          provide: AuthUsersApplicationService,
          useClass: CredentialsAuthUsersApplicationService,
        },
        {
          provide: AuthUserRepository,
          useExisting: PsqlAuthUserRepository,
        },
        {
          provide: AuthResetPasswordTokenRepository,
          useExisting: PsqlAuthResetPasswordTokenRepository,
        },
      ],
      exports: [AuthUsersApplicationService],
    };
  }

  static forJwtRoot(): DynamicModule {
    return {
      module: ApiAuthInfrastructureModule,
      imports: [
        TypeOrmModule.forFeature([
          PsqlAuthUserEntity,
          PsqlAuthResetPasswordTokenEntity,
        ]),
      ],
      providers: [
        {
          provide: AuthUsersApplicationService,
          useClass: JwtAuthUsersApplicationService,
        },
        {
          provide: AuthUserRepository,
          useExisting: PsqlAuthUserRepository,
        },
        {
          provide: AuthResetPasswordTokenRepository,
          useExisting: PsqlAuthResetPasswordTokenRepository,
        },
      ],
      exports: [
        AuthUsersApplicationService,
        AuthUserRepository,
        AuthResetPasswordTokenRepository,
        TypeOrmModule,
      ],
    };
  }
}
