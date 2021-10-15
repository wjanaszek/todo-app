import { DynamicModule, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AuthUserRepository,
  AuthUsersApplicationService,
} from '@wjanaszek/api-auth/application';
import { CredentialsAuthUsersApplicationService } from './credentials/credentials-auth-users.application-service';
import { AuthUserNotFoundExceptionHandler } from './exception-handlers/auth-user-not-found.exception-handler';
import { AuthUserSignUpValidationExceptionHandler } from './exception-handlers/auth-user-sign-up-validation.exception-handler';
import { AuthWrongPasswordExceptionHandler } from './exception-handlers/auth-wrong-password.exception-handler';
import { JwtAuthUsersApplicationService } from './jwt/application/jwt-auth-users.application-service';
import { PsqlAuthUserEntity } from './orm/psql/psql-auth-user.entity';
import { PsqlAuthUserRepository } from './orm/psql/psql-auth-user.repository';

@Module({
  providers: [
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
  ],
})
export class ApiAuthInfrastructureModule {
  static forCredentialsRoot(): DynamicModule {
    return {
      module: ApiAuthInfrastructureModule,
      providers: [
        {
          provide: AuthUsersApplicationService,
          useClass: CredentialsAuthUsersApplicationService,
        },
      ],
      exports: [AuthUsersApplicationService],
    };
  }

  static forJwtRoot(): DynamicModule {
    return {
      module: ApiAuthInfrastructureModule,
      imports: [TypeOrmModule.forFeature([PsqlAuthUserEntity])],
      providers: [
        {
          provide: AuthUsersApplicationService,
          useClass: JwtAuthUsersApplicationService,
        },
        {
          provide: AuthUserRepository,
          useClass: PsqlAuthUserRepository,
        },
      ],
      exports: [AuthUsersApplicationService, AuthUserRepository, TypeOrmModule],
    };
  }
}
