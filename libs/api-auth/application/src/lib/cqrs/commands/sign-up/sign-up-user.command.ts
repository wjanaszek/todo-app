export class SignUpUserCommand {
  constructor(
    public readonly email: string,
    public readonly username: string,
    public readonly password: string
  ) {}
}
