import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthResetPasswordTokenRepository } from '@wjanaszek/api-auth/application';
import { AuthUserEntity } from '@wjanaszek/api-auth/domain';
import { Repository } from 'typeorm';
import { PsqlAuthResetPasswordTokenEntity } from './psql-auth-reset-password-token.entity';

@Injectable()
export class PsqlAuthResetPasswordTokenRepository
  implements AuthResetPasswordTokenRepository
{
  constructor(
    @InjectRepository(PsqlAuthResetPasswordTokenEntity)
    private readonly authResetPasswordTokenRepository: Repository<PsqlAuthResetPasswordTokenEntity>
  ) {}

  async add(
    user: AuthUserEntity,
    expirationDate: Date
  ): Promise<PsqlAuthResetPasswordTokenEntity> {
    return this.authResetPasswordTokenRepository.save({
      user,
      expirationDate,
    });
  }
}
