import { FixtureType } from '../../utils/fixture-type';
import { getFixtures } from './sign-up.fixtures';

describe('SignUp', () => {
  let fixtures: FixtureType<typeof getFixtures>;

  beforeAll(async () => {
    fixtures = await getFixtures();
  });

  test('There should be a possibility to register a new user', async () => {
    const request = fixtures.GivenUserSignUpRequest();

    const response = await fixtures.WhenSigningUp(request);

    fixtures.ThenUserIsCreated(response);
  });

  afterAll(async () => {
    await fixtures.cleanup();
  });
});
