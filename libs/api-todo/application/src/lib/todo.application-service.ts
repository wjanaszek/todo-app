import { TodoId } from '@wjanaszek/api-todo/domain';
import { TodoReadModel } from './read-models/todo.read-model';
import { CreateTodoWriteModel } from './write-models/create-todo.write-model';
import { UpdateTodoWriteModel } from './write-models/update-todo.write-model';

export abstract class TodoApplicationService {
  abstract create(data: CreateTodoWriteModel): Promise<void>;

  abstract delete(id: TodoId): Promise<void>;

  abstract findAll(): Promise<TodoReadModel[]>;

  abstract findById(id: TodoId): Promise<TodoReadModel | null>;

  abstract update(
    id: TodoId,
    data: Partial<UpdateTodoWriteModel>
  ): Promise<TodoReadModel>;
}
