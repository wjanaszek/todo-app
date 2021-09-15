import { Module } from '@nestjs/common';
import { ApiAuthShellModule } from '@wjanaszek/api-auth/shell';
import { RestApiAuthController } from './rest-api-auth.controller';

@Module({
  imports: [ApiAuthShellModule],
  controllers: [RestApiAuthController],
})
export class ApiAuthUiModule {}
