import {
  TodoAuthorEntity,
  TodoAuthorId,
  TodoEntity,
} from '@wjanaszek/api-todo/domain';
import { BaseEntity, Column, Entity, OneToMany } from 'typeorm';
import { PsqlTodoEntity } from './psql-todo.entity';

@Entity('todoAuthor')
export class PsqlTodoAuthorEntity
  extends BaseEntity
  implements TodoAuthorEntity
{
  @Column({ type: 'varchar', unique: true, primary: true })
  id!: TodoAuthorId;

  @OneToMany(() => PsqlTodoEntity, (todo: PsqlTodoEntity) => todo.author)
  todos!: TodoEntity[];
}
