import { DynamicModule, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateTodoCommandHandler } from './commands/create/create-todo.command-handler';
import { DeleteTodoCommandHandler } from './commands/delete/delete-todo.command-handler';
import { UpdateTodoCommandHandler } from './commands/update/update-todo.command-handler';
import { UserRemovedEventHandler } from './events/user-removed.event-handler';
import { UserSignedUpEventHandler } from './events/user-signed-up.event-handler';
import { FindAllTodoQueryHandler } from './queries/find-all-todo/find-all-todo.query-handler';
import { FindTodoByIdQueryHandler } from './queries/find-todo-by-id/find-todo-by-id.query-handler';
import { TodoApplicationService } from './todo.application-service';
import { TodoApplicationServiceImplementation } from './todo.application-service.implementation';

const CommandHandlers = [
  CreateTodoCommandHandler,
  DeleteTodoCommandHandler,
  UpdateTodoCommandHandler,
];
const EventHandlers = [UserRemovedEventHandler, UserSignedUpEventHandler];
const QueryHandlers = [FindAllTodoQueryHandler, FindTodoByIdQueryHandler];

@Module({
  imports: [CqrsModule],
})
export class ApiTodoApplicationModule {
  static withInfrastructure(
    infrastructureModules: DynamicModule[]
  ): DynamicModule {
    return {
      module: ApiTodoApplicationModule,
      imports: infrastructureModules,
      providers: [
        {
          provide: TodoApplicationService,
          useClass: TodoApplicationServiceImplementation,
        },
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers,
      ],
      exports: [TodoApplicationService],
    };
  }
}
