import { DynamicModule, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUsersApplicationService } from '@wjanaszek/api-auth/application';
import { CredentialsAuthUsersApplicationService } from './credentials/credentials-auth-users.application-service';
import { AuthUserNotFoundExceptionHandler } from './exception-handlers/auth-user-not-found.exception-handler';
import { AuthWrongPasswordExceptionHandler } from './exception-handlers/auth-wrong-password.exception-handler';
import { JwtAuthUsersApplicationService } from './jwt/application/jwt-auth-users.application-service';
import { PsqlAuthUserEntity } from './orm/psql/psql-auth-user.entity';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: AuthUserNotFoundExceptionHandler
    },
    {
      provide: APP_FILTER,
      useClass: AuthWrongPasswordExceptionHandler
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
      ],
      exports: [AuthUsersApplicationService, TypeOrmModule],
    };
  }
}
