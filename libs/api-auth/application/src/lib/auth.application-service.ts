export abstract class AuthApplicationService {
  abstract validateUser(username: string, password: string): Promise<any>;
}
