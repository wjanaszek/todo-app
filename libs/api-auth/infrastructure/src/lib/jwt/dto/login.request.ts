import { JwtAuthUser } from '@wjanaszek/api-auth/application';
import { Request } from '@nestjs/common';

export type LoginRequest = Request & {
  user: JwtAuthUser;
};
