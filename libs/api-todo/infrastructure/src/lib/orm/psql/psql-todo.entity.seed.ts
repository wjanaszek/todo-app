import { PsqlTodoAuthorEntity } from './psql-todo-author.entity';
import { PsqlTodoEntity } from './psql-todo.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class PsqlTodoEntitySeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(PsqlTodoAuthorEntity)
      .values([{
        id: '0bd8d8f2-2cc2-4486-ae11-2571d1f29176',
        todos: [],
      }])
      .execute();

    await factory(PsqlTodoEntity)().createMany(10);
  }
}
