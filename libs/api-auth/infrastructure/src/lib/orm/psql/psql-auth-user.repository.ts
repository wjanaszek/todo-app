import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AuthUserRepository,
  AuthUserSignUpValidationException,
  SignUpUserCommand,
} from '@wjanaszek/api-auth/application';
import { AuthUserEntity } from '@wjanaszek/api-auth/domain';
import { PsqlErrorCode } from '@wjanaszek/shared/infrastructure';
import { Repository } from 'typeorm';
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

  async remove(usernameOrEmail: string): Promise<void> {
    const toDelete = await this.authUserRepository.findOne({
      where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!toDelete) {
      throw new Error(`Username ${usernameOrEmail} not found!`);
    }

    await this.authUserRepository.remove([toDelete]);
  }

  async save(data: AuthUserEntity): Promise<AuthUserEntity> {
    return this.authUserRepository.save(data);
  }

  async signUp(data: SignUpUserCommand): Promise<AuthUserEntity> {
    const result = await this.authUserRepository
      .save(this.authUserRepository.create(data))
      .catch((err: any) => {
        if (err.code === PsqlErrorCode.UNIQUE_CONSTRAINT_VIOLATION) {
          throw new AuthUserSignUpValidationException(
            'User with given payload already exists'
          );
        } else throw new Error(err);
      });

    return result as AuthUserEntity;
  }
}
