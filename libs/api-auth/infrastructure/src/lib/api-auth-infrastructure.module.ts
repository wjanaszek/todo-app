import { DynamicModule, Module } from '@nestjs/common';
import { AuthUsersApplicationService } from '@wjanaszek/api-auth/application';
import { CredentialsAuthUsersApplicationService } from './credentials/credentials-auth-users.application-service';

@Module({})
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
}
