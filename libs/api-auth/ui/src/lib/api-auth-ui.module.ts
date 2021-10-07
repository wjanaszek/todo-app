import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApiAuthShellModule } from '@wjanaszek/api-auth/shell';
import {
  RestLoggingMiddleware,
  RestLoggingMiddlewareModule,
} from '@wjanaszek/shared/infrastructure';
import { RestApiAuthController } from './rest-api-auth.controller';

@Module({
  imports: [ApiAuthShellModule, RestLoggingMiddlewareModule.forRoot()],
  controllers: [RestApiAuthController],
})
export class ApiAuthUiModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RestLoggingMiddleware).forRoutes(RestApiAuthController.URI);
  }
}
