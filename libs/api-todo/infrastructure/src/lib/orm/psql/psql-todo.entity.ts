import {
  TodoEntity,
  TodoStatus,
  TodoId,
  TodoValidation,
} from '@wjanaszek/api-todo/domain';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todo')
export class PsqlTodoEntity extends BaseEntity implements TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: TodoId;

  @Column({ type: 'varchar', length: TodoValidation.maxLength })
  name: string;

  @Column('enum', { enum: TodoStatus })
  status: TodoStatus;
}
