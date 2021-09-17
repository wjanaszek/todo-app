import { Factory, Seeder } from 'typeorm-seeding';
import { PsqlAuthUserEntity } from './psql-auth-user.entity';

export default class PsqlAuthUserEntitySeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(PsqlAuthUserEntity)().createMany(10);
    await factory(PsqlAuthUserEntity)().create({
      username: 'test',
      password: 'test',
    });
  }
}
