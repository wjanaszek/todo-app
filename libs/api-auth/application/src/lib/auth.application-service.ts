export abstract class AuthApplicationService<User = unknown, LoginResponse = unknown> {
  abstract getAuthPayload(user: User): Promise<LoginResponse>;

  abstract validateUser(username: string, password: string): Promise<User>;
}
