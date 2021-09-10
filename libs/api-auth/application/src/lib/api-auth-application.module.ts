import { DynamicModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthApplicationService } from './auth.application-service';
import { CredentialsAuthApplicationService } from './credentials/credentials-auth.application-service';
import { CredentialsAuthGuard } from './credentials/credentials-auth.guard';
import { CredentialsStrategy } from './credentials/credentials.strategy';

@Module({
  imports: [PassportModule],
})
export class ApiAuthApplicationModule {
  static withCredentialsInfrastructure(
    infrastructureModules: DynamicModule[]
  ): DynamicModule {
    return {
      module: ApiAuthApplicationModule,
      imports: infrastructureModules,
      providers: [
        CredentialsAuthGuard,
        CredentialsStrategy,
        {
          provide: AuthApplicationService,
          useClass: CredentialsAuthApplicationService,
        },
      ],
      exports: [CredentialsAuthGuard],
    };
  }
}
