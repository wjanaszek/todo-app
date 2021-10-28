import { EntityUid } from '@wjanaszek/shared/domain';

export type JwtRequest = {
  user: {
    id: EntityUid;
  };
};
