import { TodoUid } from '@wjanaszek/api-todo/domain';
import { TodoReadModel } from './read-models/todo.read-model';
import { CreateTodoWriteModel } from './write-models/create-todo.write-model';
import { UpdateTodoWriteModel } from './write-models/update-todo.write-model';

export abstract class TodoApplicationService {
  abstract create(data: CreateTodoWriteModel): Promise<void>;

  abstract delete(id: TodoUid): Promise<void>;

  abstract findAll(): Promise<TodoReadModel[]>;

  abstract findById(id: TodoUid): Promise<TodoReadModel | null>;

  abstract update(
    id: TodoUid,
    data: Partial<UpdateTodoWriteModel>
  ): Promise<TodoReadModel>;
}
