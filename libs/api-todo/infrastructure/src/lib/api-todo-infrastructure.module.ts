import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  TodoAuthorRepository,
  TodoRepository,
} from '@wjanaszek/api-todo/application';
import { PsqlTodoAuthorEntity } from './orm/psql/psql-todo-author.entity';
import { PsqlTodoAuthorRepository } from './orm/psql/psql-todo-author.repository';
import { PsqlTodoEntity } from './orm/psql/psql-todo.entity';
import { PsqlTodoRepository } from './orm/psql/psql-todo.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PsqlTodoEntity, PsqlTodoAuthorEntity])],
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
        {
          provide: TodoAuthorRepository,
          useClass: PsqlTodoAuthorRepository,
        },
      ],
      exports: [TodoRepository, TodoAuthorRepository],
    };
  }
}
