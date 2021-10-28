import { TodoStatus } from './todo-status.enum';
import { TodoId } from './todo.id';

export interface TodoEntity {
  id: TodoId;
  name: string;
  status: TodoStatus;
}

export const TodoValidation = {
  maxLength: 100,
};
