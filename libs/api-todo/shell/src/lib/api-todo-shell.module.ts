import { Module } from '@nestjs/common';
import { ApiTodoApplicationModule } from '@wjanaszek/api-todo/application';
import { ApiTodoInfrastructureModule } from '@wjanaszek/api-todo/infrastructure';

@Module({
  imports: [
    ApiTodoApplicationModule.withInfrastructure([
      ApiTodoInfrastructureModule.forRoot(),
    ]),
  ],
  exports: [ApiTodoApplicationModule],
})
export class ApiTodoShellModule {}
