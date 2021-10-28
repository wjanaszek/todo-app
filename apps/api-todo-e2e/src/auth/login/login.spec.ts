import { FixtureType } from '../../utils/fixture-type';
import { getFixtures } from './login.fixtures';

describe('Login', () => {
  let fixtures: FixtureType<typeof getFixtures>;

  beforeAll(async () => {
    fixtures = await getFixtures();
  });

  test('There should be a possibility to login as a newly registered user', async () => {
    await fixtures.GivenCreatedUser();

    const response = await fixtures.WhenLoggingIn();

    fixtures.ThenUserIsLoggedIn(response);
  });

  afterAll(async () => {
    await fixtures.cleanup();
  });
});
