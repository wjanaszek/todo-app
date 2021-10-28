import { TodoAuthorEntity, TodoId } from '@wjanaszek/api-todo/domain';

export abstract class TodoAuthorRepository {
  abstract create(author: TodoAuthorEntity): Promise<void>;

  abstract findById(id: TodoId): Promise<TodoAuthorEntity | undefined>;
}
