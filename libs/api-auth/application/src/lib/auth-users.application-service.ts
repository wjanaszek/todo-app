export abstract class AuthUsersApplicationService<User = unknown> {
  abstract findOne(username: string): Promise<User | undefined>;
}
