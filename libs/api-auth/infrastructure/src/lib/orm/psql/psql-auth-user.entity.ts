import {
  AuthUserEntity,
  AuthUserId,
  AuthUserValidation,
} from '@wjanaszek/api-auth/domain';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('authUser')
@Unique(['email', 'username'])
export class PsqlAuthUserEntity extends BaseEntity implements AuthUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: AuthUserId;

  @Column({ type: 'varchar', length: AuthUserValidation.email.maxLength })
  email: string;

  @Column({ type: 'varchar', length: AuthUserValidation.username.maxLength })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @BeforeInsert()
  async hashPassword(password: string): Promise<void> {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
