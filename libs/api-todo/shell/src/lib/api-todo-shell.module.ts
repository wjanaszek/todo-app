import { Module } from '@nestjs/common';
import { ApiTodoApplicationModule } from '@wjanaszek/api-todo/application';
import {
  ApiTodoInfrastructureModule,
  PsqlTodoEntity,
} from '@wjanaszek/api-todo/infrastructure';

export const ApiTodo = {
  entities: [PsqlTodoEntity],
};

@Module({
  imports: [
    ApiTodoApplicationModule.withInfrastructure([
      ApiTodoInfrastructureModule.forRoot(),
    ]),
  ],
  exports: [ApiTodoApplicationModule],
})
export class ApiTodoShellModule {}
