import {
  AuthResetPasswordTokenEntity,
  AuthResetPasswordTokenId,
} from '@wjanaszek/api-auth/domain';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PsqlAuthUserEntity } from './psql-auth-user.entity';

@Entity('authResetPassword')
export class PsqlAuthResetPasswordTokenEntity
  implements AuthResetPasswordTokenEntity
{
  @Column({ type: 'timestamp' })
  expirationDate: Date;

  @PrimaryGeneratedColumn('uuid')
  token: AuthResetPasswordTokenId;

  @OneToOne(() => PsqlAuthUserEntity)
  @JoinColumn()
  user: PsqlAuthUserEntity;
}
