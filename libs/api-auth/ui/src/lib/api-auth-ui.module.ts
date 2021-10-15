import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApiAuthShellModule } from '@wjanaszek/api-auth/shell';
import {
  RestLoggingMiddleware,
  RestLoggingMiddlewareModule,
} from '@wjanaszek/shared/infrastructure';
import { RestApiAuthController } from './rest-api-auth.controller';

@Module({
  imports: [ApiAuthShellModule, CqrsModule, RestLoggingMiddlewareModule.forRoot()],
  controllers: [RestApiAuthController],
})
export class ApiAuthUiModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RestLoggingMiddleware).forRoutes(RestApiAuthController.URI);
  }
}
