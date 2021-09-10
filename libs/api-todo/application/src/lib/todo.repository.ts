import { TodoEntity, TodoUid } from '@wjanaszek/api-todo/domain';
import { CreateTodoCommand } from './commands/create/create-todo.command';
import { UpdateTodoCommand } from './commands/update/update-todo.command';

export abstract class TodoRepository {
  abstract create(data: CreateTodoCommand): Promise<TodoEntity>;

  abstract delete(id: TodoUid): Promise<void>;

  abstract findAll(): Promise<TodoEntity[]>;

  abstract findById(id: TodoUid): Promise<TodoEntity | undefined>;

  abstract update(data: UpdateTodoCommand): Promise<TodoEntity>;
}
