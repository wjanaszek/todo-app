import { TodoStatus } from './todo-status.enum';
import { TodoUid } from './todo.uid';

export interface TodoEntity {
  uid: TodoUid;
  name: string;
  status: TodoStatus;
}

export const TodoValidation = {
  maxLength: 100,
};
