import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import configuration from '../../../../../config/configuration';
import { AuthApplicationService } from './auth.application-service';
import { CredentialsAuthApplicationService } from './credentials/credentials-auth.application-service';
import { CredentialsAuthGuard } from './credentials/credentials-auth.guard';
import { CredentialsStrategy } from './credentials/credentials.strategy';
import { JwtAuthApplicationService } from './jwt/jwt-auth.application-service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { JwtLoginAuthGuard } from './jwt/jwt-login-auth.guard';
import { JwtLoginStrategy } from './jwt/jwt-login.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';

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
      exports: [CredentialsAuthGuard, AuthApplicationService],
    };
  }

  static withJwtInfrastructure(
    infrastructureModules: DynamicModule[]
  ): DynamicModule {
    return {
      module: ApiAuthApplicationModule,
      imports: [
        ...infrastructureModules,
        JwtModule.register({
          secret: configuration().jwt.secret,
          signOptions: { expiresIn: configuration().jwt.expiresIn },
        }),
      ],
      providers: [
        JwtAuthGuard,
        JwtStrategy,
        JwtLoginAuthGuard,
        JwtLoginStrategy,
        {
          provide: AuthApplicationService,
          useClass: JwtAuthApplicationService,
        },
      ],
      exports: [JwtAuthGuard, JwtLoginAuthGuard, AuthApplicationService],
    };
  }
}
