import { HttpStatus } from '@nestjs/common';
import { AuthUserRepository } from '@wjanaszek/api-auth/application';
import { SignUpUserDto } from '@wjanaszek/api-auth/infrastructure';
import * as request from 'supertest';
import { Response } from 'supertest';
import { initApplication } from '../../utils/application-initializer';

const credentials = {
  email: 'signup@test.pl',
  username: 'signup',
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
    GivenUserSignUpRequest: (): SignUpUserDto => {
      return {
        email: credentials.email,
        username: credentials.username,
        password: credentials.password,
      };
    },
    WhenSigningUp: async (contract: SignUpUserDto): Promise<Response> => {
      return request(app.getHttpServer())
        .post('/api/auth/signUp')
        .send(contract);
    },
    ThenUserIsCreated: (response: Response): void => {
      expect(response.status).toBe(HttpStatus.CREATED);
    },
  };
};
