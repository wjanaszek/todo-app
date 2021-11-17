import { FixtureType } from '../../utils/fixture-type';
import { getFixtures } from './update-todo.fixtures';

describe('UpdateToDo', () => {
  let fixtures: FixtureType<typeof getFixtures>;

  beforeAll(async () => {
    fixtures = await getFixtures();
  });

  test('There should be a possibility to update a ToDo', async () => {
    await fixtures.GivenUserIsLoggedIn();
    await fixtures.GivenExistingToDo();
    const request = fixtures.GivenUpdateToDoRequest();

    const response = await fixtures.WhenUpdatingToDo(request);

    fixtures.ThenToDoIsUpdated(response);
  });

  test('There should be no possibility to update a ToDo when payload is invalid', async () => {
    await fixtures.GivenUserIsLoggedIn();
    await fixtures.GivenExistingToDo();
    const request = fixtures.GivenInvalidUpdateToDoRequest();

    const response = await fixtures.WhenUpdatingToDo(request);

    fixtures.ThenValidationErrorIsReturned(response);
  });

  afterAll(async () => {
    await fixtures.cleanup();
  });
});
