import { TodoAuthorId } from './todo-author.id';
import { TodoEntity } from './todo.entity';

export interface TodoAuthorEntity {
  id: TodoAuthorId;
  todos: TodoEntity[];
}
