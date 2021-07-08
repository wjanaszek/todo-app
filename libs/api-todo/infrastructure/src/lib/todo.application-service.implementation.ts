import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateTodoCommand,
  CreateTodoWriteModel,
  DeleteTodoCommand,
  FindAllTodoQuery,
  FindTodoByIdQuery,
  TodoApplicationService,
  TodoReadModel,
  UpdateTodoCommand,
  UpdateTodoWriteModel,
} from '@wjanaszek/api-todo/application';
import { TodoUid } from '@wjanaszek/api-todo/domain';

@Injectable()
export class TodoApplicationServiceImplementation
  implements TodoApplicationService
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  create(data: CreateTodoWriteModel): Promise<void> {
    return this.commandBus.execute(
      new CreateTodoCommand(data.uid, data.name, data.status)
    );
  }

  delete(id: TodoUid): Promise<void> {
    return this.commandBus.execute(new DeleteTodoCommand(id));
  }

  findAll(): Promise<TodoReadModel[]> {
    return this.queryBus.execute(new FindAllTodoQuery());
  }

  findById(id: TodoUid): Promise<TodoReadModel | null> {
    return this.queryBus.execute(new FindTodoByIdQuery(id));
  }

  update(id: TodoUid, data: UpdateTodoWriteModel): Promise<TodoReadModel> {
    return this.commandBus.execute(
      new UpdateTodoCommand(id, data.name, data.status)
    );
  }
}
