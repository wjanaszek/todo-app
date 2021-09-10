import { DynamicModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthUsersApplicationService } from './auth-users.application-service';
import { AuthApplicationService } from './auth.application-service';
import { LocalAuthUsersApplicationServiceImplementation } from './local/local-auth-users.application-service.implementation';
import { LocalAuthApplicationServiceImplementation } from './local/local-auth.application-service.implementation';
import { LocalAuthGuard } from './local/local-auth.guard';
import { LocalStrategy } from './local/local.strategy';

@Module({
  imports: [PassportModule]
})
export class ApiAuthApplicationModule {
  static withLocal(): DynamicModule {
    return {
      module: ApiAuthApplicationModule,
      providers: [
        LocalAuthGuard,
        LocalStrategy,
        {
          provide: AuthApplicationService,
          useClass: LocalAuthApplicationServiceImplementation,
        },
        {
          provide: AuthUsersApplicationService,
          useClass: LocalAuthUsersApplicationServiceImplementation,
        },
      ],
      exports: [AuthUsersApplicationService, LocalAuthGuard],
    };
  }
}
