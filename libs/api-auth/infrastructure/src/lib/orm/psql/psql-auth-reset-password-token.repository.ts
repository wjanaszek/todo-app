import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthResetPasswordTokenRepository } from '@wjanaszek/api-auth/application';
import {
  AuthResetPasswordTokenEntity,
  AuthResetPasswordTokenId,
  AuthUserEntity,
} from '@wjanaszek/api-auth/domain';
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
  ): Promise<AuthResetPasswordTokenEntity> {
    return this.authResetPasswordTokenRepository.save({
      user,
      expirationDate,
    });
  }

  async findOne(
    id: AuthResetPasswordTokenId
  ): Promise<AuthResetPasswordTokenEntity | undefined> {
    return this.authResetPasswordTokenRepository.findOne(id);
  }

  async remove(id: AuthResetPasswordTokenId): Promise<void> {
    await this.authResetPasswordTokenRepository.delete(id);
  }
}
