import {
  TodoAuthorEntity,
  TodoAuthorId,
  TodoId,
} from '@wjanaszek/api-todo/domain';

export abstract class TodoAuthorRepository {
  abstract create(author: TodoAuthorEntity): Promise<void>;

  abstract findById(id: TodoId): Promise<TodoAuthorEntity | undefined>;

  abstract remove(authorId: TodoAuthorId): Promise<void>;
}
