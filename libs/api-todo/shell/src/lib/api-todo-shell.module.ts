import { Module } from '@nestjs/common';
import { ApiTodoInfrastructureModule, PsqlTodoEntity } from '@wjanaszek/api-todo/infrastructure';

export const ApiTodo = {
  entities: [PsqlTodoEntity],
};

@Module({
  imports: [ApiTodoInfrastructureModule],
  exports: []
})
export class ApiTodoShellModule {}
