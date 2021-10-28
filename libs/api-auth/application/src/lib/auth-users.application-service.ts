export abstract class AuthUsersApplicationService<User = unknown> {
  abstract findOne(usernameOrEmail: string): Promise<User | undefined>;
}
