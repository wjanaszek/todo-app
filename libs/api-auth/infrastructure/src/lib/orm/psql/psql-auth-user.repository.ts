import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AuthUserRepository,
  AuthUserSignUpValidationException,
  SignUpUserCommand,
} from '@wjanaszek/api-auth/application';
import { AuthUserEntity } from '@wjanaszek/api-auth/domain';
import { PsqlErrorCode } from '@wjanaszek/shared/infrastructure';
import { QueryFailedError, Repository } from 'typeorm';
import { PsqlAuthUserEntity } from './psql-auth-user.entity';

@Injectable()
export class PsqlAuthUserRepository implements AuthUserRepository {
  constructor(
    @InjectRepository(PsqlAuthUserEntity)
    private readonly authUserRepository: Repository<PsqlAuthUserEntity>
  ) {}

  async findByEmail(email: string): Promise<AuthUserEntity | undefined> {
    return this.authUserRepository.findOne({ where: { email } });
  }

  async save(data: AuthUserEntity): Promise<AuthUserEntity> {
    return this.authUserRepository.save(data);
  }

  async signUp(data: SignUpUserCommand): Promise<void> {
    try {
      await this.authUserRepository.save(this.authUserRepository.create(data));
    } catch (e: QueryFailedError | unknown) {
      if (
        e instanceof QueryFailedError &&
        (e as any).code === PsqlErrorCode.UNIQUE_CONSTRAINT_VIOLATION
      ) {
        throw new AuthUserSignUpValidationException(
          'User with given payload already exists'
        );
      } else {
        throw new Error(e as any);
      }
    }
  }
}
