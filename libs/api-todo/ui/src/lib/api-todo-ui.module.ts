import { Module } from '@nestjs/common';
import { ApiTodoInfrastructureModule } from '@wjanaszek/api-todo/infrastructure';
import { RestApiTodoController } from './rest-api-todo.controller';

@Module({
  imports: [ApiTodoInfrastructureModule.forRoot()],
  controllers: [RestApiTodoController],
})
export class ApiTodoUiModule {}
