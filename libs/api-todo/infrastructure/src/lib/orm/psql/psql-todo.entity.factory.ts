import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { PsqlTodoEntity } from './psql-todo.entity';

define(PsqlTodoEntity, (faker: typeof Faker) => {
  const todo = new PsqlTodoEntity();
  todo.name = faker.random.word();
  todo.status = faker.random.number(2);
  return todo;
});
