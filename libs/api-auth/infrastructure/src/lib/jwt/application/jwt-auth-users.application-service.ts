import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUsersApplicationService, JwtAuthUser } from '@wjanaszek/api-auth/application';
import { Repository } from 'typeorm';
import { PsqlAuthUserEntity } from '../../orm/psql/psql-auth-user.entity';

@Injectable()
export class JwtAuthUsersApplicationService
  implements AuthUsersApplicationService<JwtAuthUser>
{
  // @TODO consider creating it with CQRS, to add event sourcing (i.e. counting failed logins for user)
  constructor(
    @InjectRepository(PsqlAuthUserEntity)
    private readonly userEntityRepository: Repository<PsqlAuthUserEntity>
  ) {}

  async findOne(usernameOrEmail: string): Promise<JwtAuthUser | undefined> {
    return this.userEntityRepository.findOne({
      select: ['id', 'password'],
      where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
  }
}
