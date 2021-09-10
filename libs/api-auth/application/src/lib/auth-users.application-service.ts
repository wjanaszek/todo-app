// @TODO This should be a real class/interface representing a user entity
export type User = any;

export abstract class AuthUsersApplicationService {
  abstract findOne(username: string): Promise<User | undefined>;
}
