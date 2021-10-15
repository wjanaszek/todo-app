import {
  AuthResetPasswordTokenEntity,
  AuthResetPasswordTokenId,
} from '@wjanaszek/api-auth/domain';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PsqlAuthUserEntity } from './psql-auth-user.entity';

@Entity('authResetPassword')
export class PsqlAuthResetPasswordTokenEntity
  implements AuthResetPasswordTokenEntity
{
  @PrimaryGeneratedColumn('uuid')
  id: AuthResetPasswordTokenId;

  @Column({ type: 'timestamp' })
  expirationDate: Date;

  @Generated('uuid')
  token: string;

  @OneToOne(() => PsqlAuthUserEntity)
  @JoinColumn()
  user: PsqlAuthUserEntity;
}
