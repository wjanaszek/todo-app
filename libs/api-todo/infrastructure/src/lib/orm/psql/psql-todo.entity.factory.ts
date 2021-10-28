import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { PsqlTodoAuthorEntity } from './psql-todo-author.entity';
import { PsqlTodoEntity } from './psql-todo.entity';

define(PsqlTodoEntity, (faker: typeof Faker) => {
  const author = new PsqlTodoAuthorEntity();
  author.id = '0bd8d8f2-2cc2-4486-ae11-2571d1f29176';

  const todo = new PsqlTodoEntity();
  todo.name = faker.random.word();
  todo.status = faker.random.number(2);
  todo.author = author;
  return todo;
});
