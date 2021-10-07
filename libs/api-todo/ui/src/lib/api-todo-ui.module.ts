import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApiTodoShellModule } from '@wjanaszek/api-todo/shell';
import {
  RestLoggingMiddleware,
  RestLoggingMiddlewareModule,
} from '@wjanaszek/shared/infrastructure';
import { RestApiTodoController } from './rest-api-todo.controller';

@Module({
  imports: [ApiTodoShellModule, RestLoggingMiddlewareModule.forRoot()],
  controllers: [RestApiTodoController],
})
export class ApiTodoUiModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RestLoggingMiddleware).forRoutes(RestApiTodoController.URI);
  }
}
