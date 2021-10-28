import { TodoAuthorEntity } from './todo-author.entity';
import { TodoStatus } from './todo-status.enum';
import { TodoId } from './todo.id';

export interface TodoEntity {
  id: TodoId;
  name: string;
  status: TodoStatus;
  author: TodoAuthorEntity;
}

export const TodoValidation = {
  maxLength: 100,
};
