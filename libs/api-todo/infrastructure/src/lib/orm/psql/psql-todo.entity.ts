import {
  TodoEntity,
  TodoStatus,
  TodoUid,
  TodoValidation,
} from '@wjanaszek/api-todo/domain';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PsqlTodoEntity extends BaseEntity implements TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  uid: TodoUid;

  @Column({ type: 'varchar', length: TodoValidation.maxLength })
  name: string;

  @Column('enum', { enum: TodoStatus })
  status: TodoStatus;
}
