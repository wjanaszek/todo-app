import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TodoAuthorId, TodoId } from '@wjanaszek/api-todo/domain';
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

  async create(data: CreateTodoWriteModel): Promise<void> {
    return this.commandBus.execute(
      new CreateTodoCommand(data.id, data.name, data.status, data.authorId)
    );
  }

  async delete(id: TodoId, authorId: TodoAuthorId): Promise<void> {
    return this.commandBus.execute(new DeleteTodoCommand(id, authorId));
  }

  async findAll(authorId: TodoAuthorId): Promise<TodoReadModel[]> {
    return this.queryBus.execute(new FindAllTodoQuery(authorId));
  }

  async findById(
    id: TodoId,
    authorId: TodoAuthorId
  ): Promise<TodoReadModel | null> {
    return this.queryBus.execute(new FindTodoByIdQuery(id, authorId));
  }

  async update(
    id: TodoId,
    authorId: TodoAuthorId,
    data: Partial<UpdateTodoWriteModel>
  ): Promise<TodoReadModel> {
    return this.commandBus.execute(
      new UpdateTodoCommand(
        id,
        data.name || null,
        data.status || null,
        authorId
      )
    );
  }
}
