import {
  AuthUserEntity,
  AuthUserId,
  AuthUserValidation,
} from '@wjanaszek/api-auth/domain';
import * as bcrypt from 'bcrypt';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('authUser')
export class PsqlAuthUserEntity extends BaseEntity implements AuthUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: AuthUserId;

  @Column({
    type: 'varchar',
    length: AuthUserValidation.email.maxLength,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: AuthUserValidation.username.maxLength,
    unique: true,
  })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @BeforeInsert()
  async hashPassword(password: string): Promise<void> {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
