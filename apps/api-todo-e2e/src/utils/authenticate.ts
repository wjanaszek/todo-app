import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AccessToken } from '../types/access-token.type';

export const Authenticate = async (
  app: INestApplication,
  credentials: { username: string; password: string }
): Promise<AccessToken> => {
  const response = await request(app.getHttpServer())
    .post('/api/auth/login')
    .send(credentials)
    .expect(HttpStatus.OK);

  return response.body.accessToken;
};
