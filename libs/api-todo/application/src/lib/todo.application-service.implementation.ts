import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TodoUid } from '@wjanaszek/api-todo/domain';
import { CreateTodoCommand } from './commands/create/create-todo.command';
import { DeleteTodoCommand } from './commands/delete/delete-todo.command';
import { UpdateTodoCommand } from './commands/update/update-todo.command';
import { FindAllTodoQuery } from './queries/find-all-todo/find-all-todo.query';
import { FindTodoByIdQuery } from './queries/find-todo-by-id/find-todo-by-id.query';
import { TodoReadModel } from './read-models/todo.read-model';
import { TodoApplicationService } from './todo.application-service';
import { CreateTodoWriteModel } from './write-models/create-todo.write-model';
import { UpdateTodoWriteModel } from './write-models/update-todo.write-model';

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