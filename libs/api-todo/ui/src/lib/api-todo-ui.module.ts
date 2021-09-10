import { Module } from '@nestjs/common';
import { ApiTodoShellModule } from '@wjanaszek/api-todo/shell';
import { RestApiTodoController } from './rest-api-todo.controller';

@Module({
  imports: [ApiTodoShellModule],
  controllers: [RestApiTodoController],
})
export class ApiTodoUiModule {}
