import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { PsqlAuthUserEntity } from './psql-auth-user.entity';

define(PsqlAuthUserEntity, (faker: typeof Faker) => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  const user = new PsqlAuthUserEntity();
  user.username = `${firstName} ${lastName}`;
  user.email = faker.internet.email(firstName, lastName);
  user.password = 'somePassword';
  return user;
});
