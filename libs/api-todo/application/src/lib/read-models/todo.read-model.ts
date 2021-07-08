import { TodoUid } from '@wjanaszek/api-todo/domain';

export interface TodoReadModel {
  uid: TodoUid;
  name: string;
}
