import { DynamicModule, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoApplicationService, TodoRepository } from '@wjanaszek/api-todo/application';
import { CreateTodoCommandHandler } from './command-handlers/create-todo.command-handler';
import { DeleteTodoCommandHandler } from './command-handlers/delete-todo.command-handler';
import { UpdateTodoCommandHandler } from './command-handlers/update-todo.command-handler';
import { PsqlTodoEntity } from './orm/psql/psql-todo.entity';
import { PsqlTodoRepository } from './orm/psql/psql-todo.repository';
import { FindAllTodoQueryHandler } from './query-handlers/find-all-todo.query-handler';
import { FindTodoByIdQueryHandler } from './query-handlers/find-todo-by-id.query-handler';
import { TodoApplicationServiceImplementation } from './todo.application-service.implementation';

const CommandHandlers = [
  CreateTodoCommandHandler,
  DeleteTodoCommandHandler,
  UpdateTodoCommandHandler,
];
const QueryHandlers = [FindAllTodoQueryHandler, FindTodoByIdQueryHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([PsqlTodoEntity]),
  ],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class ApiTodoInfrastructureModule {
  static forRoot(): DynamicModule {
    return {
      module: ApiTodoInfrastructureModule,
      providers: [
        {
          provide: TodoApplicationService,
          useClass: TodoApplicationServiceImplementation,
        },
        {
          provide: TodoRepository,
          useClass: PsqlTodoRepository,
        },
      ],
      exports: [TodoApplicationService]
    };
  }
}
