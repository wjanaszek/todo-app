import { Module } from '@nestjs/common';
import { ApiAuthApplicationModule } from '@wjanaszek/api-auth/application';
import { RestApiAuthController } from './rest-api-auth.controller';

@Module({
  imports: [ApiAuthApplicationModule.withLocal()],
  controllers: [RestApiAuthController],
})
export class ApiAuthUiModule {}
