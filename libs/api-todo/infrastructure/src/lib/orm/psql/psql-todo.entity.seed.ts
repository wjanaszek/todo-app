import { PsqlTodoEntity } from './psql-todo.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class PsqlTodoEntitySeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(PsqlTodoEntity)().createMany(10)
  }
}
