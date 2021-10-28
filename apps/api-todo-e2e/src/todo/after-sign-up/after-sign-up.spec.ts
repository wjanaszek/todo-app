import { FixtureType } from '../../utils/fixture-type';
import { getFixtures } from './after-sign-up.fixtures';

describe('AfterSignUp', () => {
  let fixtures: FixtureType<typeof getFixtures>;

  beforeAll(async () => {
    fixtures = await getFixtures();
  });

  test('There should be a possibility to create a ToDo as a newly registered user', async () => {
    await fixtures.GivenUserIsCreatedAndLoggedIn();
    const request = fixtures.GivenCreateToDoRequest();

    const response = await fixtures.WhenCreatingToDo(request);

    fixtures.ThenToDoIsCreated(response);
    await fixtures.ThenToDoIsReturnedInTheList(request.id);
  });

  afterAll(async () => {
    await fixtures.cleanup();
  });
});
