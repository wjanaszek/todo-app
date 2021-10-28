import { TodoAuthorEntity, TodoAuthorId, TodoEntity } from '@wjanaszek/api-todo/domain';
import { PsqlTodoEntity } from './psql-todo.entity';
import { BaseEntity, Column, Entity, OneToMany } from 'typeorm';

@Entity('todoAuthor')
export class PsqlTodoAuthorEntity
  extends BaseEntity
  implements TodoAuthorEntity
{
  @Column({ type: 'varchar', unique: true, primary: true })
  id: TodoAuthorId;

  @OneToMany(() => PsqlTodoEntity, (todo: PsqlTodoEntity) => todo.author, {
    onDelete: 'CASCADE',
  })
  todos: TodoEntity[];
}
