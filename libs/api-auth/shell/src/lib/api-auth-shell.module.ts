import { Module } from '@nestjs/common';
import { ApiAuthApplicationModule } from '@wjanaszek/api-auth/application';
import { ApiAuthInfrastructureModule } from '@wjanaszek/api-auth/infrastructure';

@Module({
  imports: [
    ApiAuthApplicationModule.withCredentialsInfrastructure([
      ApiAuthInfrastructureModule.forCredentialsRoot(),
    ]),
  ],
  exports: [ApiAuthApplicationModule],
})
export class ApiAuthShellModule {}
