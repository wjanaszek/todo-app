import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoRepository } from '@wjanaszek/api-todo/application';
import { PsqlTodoEntity } from './orm/psql/psql-todo.entity';
import { PsqlTodoRepository } from './orm/psql/psql-todo.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PsqlTodoEntity])],
})
export class ApiTodoInfrastructureModule {
  static forRoot(): DynamicModule {
    return {
      module: ApiTodoInfrastructureModule,
      providers: [
        {
          provide: TodoRepository,
          useClass: PsqlTodoRepository,
        },
      ],
      exports: [TodoRepository],
    };
  }
}
