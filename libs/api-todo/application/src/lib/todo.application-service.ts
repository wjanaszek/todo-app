import { TodoAuthorId, TodoId } from '@wjanaszek/api-todo/domain';
import { TodoReadModel } from './read-models/todo.read-model';
import { CreateTodoWriteModel } from './write-models/create-todo.write-model';
import { UpdateTodoWriteModel } from './write-models/update-todo.write-model';

export abstract class TodoApplicationService {
  abstract create(data: CreateTodoWriteModel): Promise<void>;

  abstract delete(id: TodoId, authorId: TodoAuthorId): Promise<void>;

  abstract findAll(authorId: TodoAuthorId): Promise<TodoReadModel[]>;

  abstract findById(id: TodoId, authorId: TodoAuthorId): Promise<TodoReadModel | null>;

  abstract update(
    id: TodoId,
    authorId: TodoAuthorId,
    data: Partial<UpdateTodoWriteModel>
  ): Promise<TodoReadModel>;
}
