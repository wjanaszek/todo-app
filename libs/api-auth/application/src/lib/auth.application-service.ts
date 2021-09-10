export abstract class AuthApplicationService<User = unknown> {
  abstract validateUser(username: string, password: string): Promise<User>;
}
