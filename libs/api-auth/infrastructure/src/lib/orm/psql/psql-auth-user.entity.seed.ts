import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { PsqlAuthUserEntity } from './psql-auth-user.entity';

export default class PsqlAuthUserEntitySeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(PsqlAuthUserEntity)().createMany(10);
    await factory(PsqlAuthUserEntity)().create({
      id: '0bd8d8f2-2cc2-4486-ae11-2571d1f29176',
      username: 'test',
      password: 'test',
    });
  }
}
