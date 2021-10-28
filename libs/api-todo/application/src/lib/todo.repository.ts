import { TodoAuthorId, TodoEntity, TodoId } from '@wjanaszek/api-todo/domain';
import { CreateTodoCommand } from './commands/create/create-todo.command';
import { UpdateTodoCommand } from './commands/update/update-todo.command';

export abstract class TodoRepository {
  abstract create(data: CreateTodoCommand): Promise<TodoEntity>;

  abstract delete(id: TodoId, authorId: TodoAuthorId): Promise<void>;

  abstract findAll(authorId: TodoAuthorId): Promise<TodoEntity[]>;

  abstract findById(
    id: TodoId,
    authorId: TodoAuthorId
  ): Promise<TodoEntity | undefined>;

  abstract update(data: UpdateTodoCommand): Promise<TodoEntity>;
}
