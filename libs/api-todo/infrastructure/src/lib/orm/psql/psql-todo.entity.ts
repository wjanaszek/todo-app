import { TodoAuthorEntity, TodoEntity, TodoId, TodoStatus, TodoValidation } from '@wjanaszek/api-todo/domain';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PsqlTodoAuthorEntity } from './psql-todo-author.entity';

@Entity('todo')
export class PsqlTodoEntity extends BaseEntity implements TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: TodoId;

  @Column({ type: 'varchar', length: TodoValidation.maxLength })
  name: string;

  @Column('enum', { enum: TodoStatus })
  status: TodoStatus;

  @ManyToOne(
    () => PsqlTodoAuthorEntity,
    (author: PsqlTodoAuthorEntity) => author.todos,
    {
      nullable: false,
    }
  )
  author: TodoAuthorEntity;
}
