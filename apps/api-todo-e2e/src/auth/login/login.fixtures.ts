import { HttpStatus } from '@nestjs/common';
import { AuthUserRepository } from '@wjanaszek/api-auth/application';
import * as request from 'supertest';
import { Response } from 'supertest';
import { initApplication } from '../../utils/application-initializer';

const credentials = {
  email: 'login@test.pl',
  username: 'login',
  password: 'Qwe12345!',
};

export const getFixtures = async () => {
  const app = await initApplication();
  const repository = app.get(AuthUserRepository);

  return {
    cleanup: async (): Promise<void> => {
      await repository.removeByEmailOrUsername(credentials.email);
      await app.close();
    },
    GivenCreatedUser: async (): Promise<void> => {
      await repository.signUp(credentials);
    },
    WhenLoggingIn: async (): Promise<Response> => {
      return request(app.getHttpServer()).post('/api/auth/login').send({
        username: credentials.username,
        password: credentials.password,
      });
    },
    ThenUserIsLoggedIn: (response: Response): void => {
      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body.accessToken).toBeTruthy();
    },
  };
};
